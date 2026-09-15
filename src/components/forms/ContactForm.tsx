"use client";

import Script from "next/script";
import { useRef, useState } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type Status = "idle" | "submitting" | "success" | "error";

const labelClass = "font-mono text-[11px] uppercase tracking-wide text-text-secondary";
const inputClass =
  "w-full rounded-lg border border-border-subtle bg-bg-canvas px-4 py-3 text-[14px] text-text-primary placeholder:text-text-secondary transition-colors focus:border-accent focus:outline-none";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (status === "submitting") return;
    if (!formRef.current) return;

    const data = new FormData(formRef.current);
    const turnstileToken = (data.get("cf-turnstile-response") as string) || "";

    if (!turnstileToken) {
      setStatus("error");
      setErrorMessage("Verification is still loading — give it a second and try again.");
      return;
    }

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          website: data.get("website") || undefined,
          turnstileToken,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setStatus("error");
        setErrorMessage(body?.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-2 py-6">
        <h2 className="text-h2 text-text-primary">Got it — thanks!</h2>
        <p className="text-body text-text-secondary">
          I&apos;ll get back to you within a day or two. Check your inbox for a confirmation.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-5">
      {TURNSTILE_SITE_KEY && (
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
      )}

      {/* Honeypot — visually hidden off-screen, not display:none, so it still
          catches bots that skip fields with no rendered layout box. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input type="text" id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-name" className={labelClass}>
            Name
          </label>
          <input id="contact-name" name="name" type="text" required className={inputClass} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-email" className={labelClass}>
            Email
          </label>
          <input id="contact-email" name="email" type="email" required className={inputClass} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea id="contact-message" name="message" required rows={5} className={inputClass} />
      </div>

      {TURNSTILE_SITE_KEY ? (
        <div className="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY} data-action="contact" />
      ) : (
        <p className="text-small text-text-secondary">
          Verification is coming soon. In the meantime, reach out directly.
        </p>
      )}

      {status === "error" && errorMessage && (
        <p role="alert" className="text-small text-accent">
          {errorMessage}
        </p>
      )}

      <MagneticButton
        onClick={handleSubmit}
        variant="primary"
        className={status === "submitting" ? "pointer-events-none opacity-60" : ""}
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </MagneticButton>
    </form>
  );
}
