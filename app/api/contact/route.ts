import { Resend } from "resend";
import { createContactEmail } from "@/lib/contact-email";
import { contactSchema } from "@/lib/contact-schema";

export const runtime = "nodejs";

const MAX_REQUEST_BYTES = 10_000;

function errorResponse(error: string, status: number) {
  return Response.json(
    { error },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return errorResponse("Expected a JSON request.", 415);
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return errorResponse("That message is too large.", 413);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse("The request body is not valid JSON.", 400);
  }

  // Silently accept honeypot submissions so bots do not learn how to bypass it.
  if (
    typeof body === "object" &&
    body !== null &&
    "website" in body &&
    typeof body.website === "string" &&
    body.website.length > 0
  ) {
    return Response.json(
      { emailSent: true, message: "Thanks — your message is on its way." },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      {
        error: "Please check the highlighted fields.",
        fields: parsed.error.flatten().fieldErrors,
      },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();

  // Local mock mode validates the full request without claiming an email was sent.
  if (!apiKey || !from || !to) {
    if (process.env.NODE_ENV === "development") {
      return Response.json(
        {
          received: true,
          emailSent: false,
          message: "Validated locally. Add the Resend variables to send email.",
        },
        { headers: { "Cache-Control": "no-store" } },
      );
    }
    console.error("Contact delivery is missing required environment variables.");
    return errorResponse("Contact delivery is temporarily unavailable.", 503);
  }

  try {
    const { email, submissionId } = parsed.data;
    const emailContent = createContactEmail(parsed.data);
    const resend = new Resend(apiKey);
    const result = await resend.emails.send(
      {
        from,
        to,
        replyTo: email,
        subject: emailContent.subject,
        text: emailContent.text,
        html: emailContent.html,
      },
      { idempotencyKey: `contact-form/${submissionId}` },
    );

    if (result.error) {
      console.error("Resend rejected a contact email.", {
        code: result.error.name,
        message: result.error.message,
      });
      return errorResponse("Email delivery failed. Please try again.", 502);
    }

    return Response.json(
      { emailSent: true, message: "Thanks — your message is on its way." },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Contact email delivery threw an unexpected error.", error);
    return errorResponse("Email delivery failed. Please try again.", 502);
  }
}
