"use client";

import { FormEvent, useState } from "react";
import { contactSchema } from "@/lib/contact-schema";

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [notice, setNotice] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));
    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const fields = parsed.error.flatten().fieldErrors;
      setErrors({ name: fields.name?.[0], email: fields.email?.[0], message: fields.message?.[0] });
      setStatus("error"); setNotice("Please check the highlighted fields."); return;
    }
    setErrors({}); setStatus("loading"); setNotice("");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Something went wrong.");
      setStatus("success"); setNotice(data.message); form.reset();
    } catch (error) {
      setStatus("error"); setNotice(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      {/* FORM FIELDS: names are validated in lib/contact-schema.ts and sent by app/api/contact/route.ts. */}
      <div className="form-row"><Field name="name" label="Your name" required autoComplete="name" error={errors.name} /><Field name="email" label="Email address" type="email" required autoComplete="email" error={errors.email} /></div>
      <div className="form-row"><Field name="company" label="Company (optional)" autoComplete="organization" /><label className="field"><span>Project type (optional)</span><select name="projectType" defaultValue=""><option value="">Choose one</option><option>Website</option><option>Web app</option><option>Automation</option><option>Custom solution</option></select></label></div>
      <label className="field"><span>Tell us about the project</span><textarea name="message" rows={5} required aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} placeholder="What are you hoping to build or improve?" />{errors.message && <small id="message-error">{errors.message}</small>}</label>
      <label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <div className="form-submit"><button type="submit" disabled={status === "loading"}>{status === "loading" ? "Sending…" : "Send inquiry"}<span aria-hidden="true">↗</span></button><p className={`form-notice form-notice--${status}`} role="status" aria-live="polite">{notice}</p></div>
    </form>
  );
}

function Field({ name, label, error, ...props }: { name: string; label: string; error?: string; type?: string; required?: boolean; autoComplete?: string }) {
  const errorId = `${name}-error`;
  return <label className="field"><span>{label}</span><input name={name} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} {...props} />{error && <small id={errorId}>{error}</small>}</label>;
}
