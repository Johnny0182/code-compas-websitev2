import type { ContactInput } from "@/lib/contact-schema";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function createContactEmail({ name, email, company, projectType, message }: ContactInput) {
  const subject = `New project inquiry from ${name}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || "—"}`,
    `Project type: ${projectType || "—"}`,
    "",
    message,
  ].join("\n");

  const fields = [
    ["Name", name],
    ["Email", email],
    ["Company", company || "—"],
    ["Project type", projectType || "—"],
  ];

  const html = `<!doctype html>
<html lang="en">
  <body style="margin:0;background:#f4f0e8;color:#101218;font-family:Arial,sans-serif;">
    <div style="max-width:640px;margin:0 auto;padding:40px 24px;">
      <p style="margin:0 0 12px;color:#3157ff;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;">Code Compas contact form</p>
      <h1 style="margin:0 0 32px;font-size:30px;line-height:1.15;">New project inquiry</h1>
      <table role="presentation" style="width:100%;border-collapse:collapse;">
        <tbody>
          ${fields.map(([label, value]) => `<tr><td style="width:120px;padding:12px 16px 12px 0;border-top:1px solid #cfc9be;color:#696a70;font-size:13px;text-transform:uppercase;vertical-align:top;">${label}</td><td style="padding:12px 0;border-top:1px solid #cfc9be;font-size:16px;vertical-align:top;">${escapeHtml(value)}</td></tr>`).join("")}
        </tbody>
      </table>
      <div style="margin-top:32px;padding:24px;background:#ebe5da;border-radius:12px;">
        <p style="margin:0 0 10px;color:#696a70;font-size:13px;text-transform:uppercase;">Project details</p>
        <p style="margin:0;font-size:16px;line-height:1.65;white-space:pre-wrap;">${escapeHtml(message)}</p>
      </div>
      <p style="margin:24px 0 0;color:#696a70;font-size:13px;line-height:1.5;">Reply to this email to respond directly to ${escapeHtml(name)}.</p>
    </div>
  </body>
</html>`;

  return { subject, text, html };
}
