import { Resend } from "resend";
import { createContactEmail } from "@/lib/contact-email";
import { contactSchema } from "@/lib/contact-schema";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) return Response.json({ error: "Expected JSON." }, { status: 415 });

    const body: unknown = await request.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) return Response.json({ error: "Please check the highlighted fields.", fields: parsed.error.flatten().fieldErrors }, { status: 400 });

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.CONTACT_FROM_EMAIL;
    const to = process.env.CONTACT_TO_EMAIL;

    // Local mock mode is explicit: it validates the request but never claims an email was sent.
    if (!apiKey || !from || !to) {
      if (process.env.NODE_ENV === "development") return Response.json({ received: true, emailSent: false, message: "Validated locally. Configure Resend variables to send email." });
      return Response.json({ error: "Contact delivery is not configured." }, { status: 503 });
    }

    const { email } = parsed.data;
    const emailContent = createContactEmail(parsed.data);
    const resend = new Resend(apiKey); // Install/configure Resend here; the package is server-only.
    const result = await resend.emails.send({
      from, // CONTACT_FROM_EMAIL: verified sender/domain in Resend.
      to, // CONTACT_TO_EMAIL: recipient inbox.
      replyTo: email,
      subject: emailContent.subject,
      text: emailContent.text,
      html: emailContent.html,
      // Add a separate resend.emails.send call here later for an optional auto-reply.
    });
    if (result.error) return Response.json({ error: "Email delivery failed. Please try again." }, { status: 502 });
    return Response.json({ emailSent: true, message: "Thanks — your message is on its way." });
  } catch {
    return Response.json({ error: "We could not process that request." }, { status: 400 });
  }
}
