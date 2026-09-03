"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [notice, setNotice] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const payload = Object.fromEntries(new FormData(form));
    setStatus("loading"); setNotice("");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Something went wrong.");
      setStatus("success"); setNotice(data.message); form.reset();
    } catch (error) {
      setStatus("error"); setNotice(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row"><Field name="name" label="Your name" required autoComplete="name" /><Field name="email" label="Email address" type="email" required autoComplete="email" /></div>
      <div className="form-row"><Field name="company" label="Company (optional)" autoComplete="organization" /><label className="field"><span>Project type (optional)</span><select name="projectType" defaultValue=""><option value="">Choose one</option><option>Website</option><option>Web app</option><option>Automation</option><option>Custom solution</option></select></label></div>
      <label className="field"><span>Tell us about the project</span><textarea name="message" rows={5} required placeholder="What are you hoping to build or improve?" /></label>
      <label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <div className="form-submit"><button type="submit" disabled={status === "loading"}>{status === "loading" ? "Sending…" : "Send inquiry"}<span aria-hidden="true">↗</span></button><p className={`form-notice form-notice--${status}`} role="status" aria-live="polite">{notice}</p></div>
    </form>
  );
}

function Field({ name, label, ...props }: { name: string; label: string; type?: string; required?: boolean; autoComplete?: string }) {
  return <label className="field"><span>{label}</span><input name={name} {...props} /></label>;
}
