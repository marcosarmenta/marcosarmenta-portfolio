"use client";

import Script from "next/script";
import { useRef, useState } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import {
  BUDGET_RANGE_OPTIONS,
  PROJECT_TYPE_OPTIONS,
  TIMELINE_OPTIONS,
} from "@/lib/inquiry";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const CAL_URL = process.env.NEXT_PUBLIC_CAL_URL;

type Status = "idle" | "submitting" | "success" | "error";

const labelClass = "font-mono text-[11px] uppercase tracking-wide text-text-secondary";
const inputClass =
  "w-full rounded-lg border border-border-subtle bg-bg-canvas px-4 py-3 text-[14px] text-text-primary placeholder:text-text-secondary transition-colors focus:border-accent focus:outline-none";

function PillGroup({
  options,
  selected,
  onToggle,
}: {
  options: readonly string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isSelected = selected.includes(option);
        return (
          <button
            key={option}
            type="button"
            onClick={() => onToggle(option)}
            aria-pressed={isSelected}
            className={`rounded-full border px-3 py-1.5 font-mono text-[12px] uppercase tracking-wide transition-colors ${
              isSelected
                ? "border-text-primary bg-text-primary text-white"
                : "border-border-subtle text-text-secondary hover:border-accent hover:text-accent"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export function InquiryForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [projectType, setProjectType] = useState<string[]>([]);
  const [budgetRange, setBudgetRange] = useState<string | null>(null);
  const [timeline, setTimeline] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const toggleProjectType = (value: string) => {
    setProjectType((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleSubmit = async () => {
    if (status === "submitting") return;
    if (!formRef.current) return;

    if (projectType.length === 0 || !budgetRange || !timeline) {
      setStatus("error");
      setErrorMessage("Please select a project type, budget range, and timeline.");
      return;
    }

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
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          projectType,
          budgetRange,
          timeline,
          description: data.get("description"),
          referenceLink: data.get("referenceLink") || undefined,
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
      <div className="flex flex-col items-start gap-4 py-6">
        <h2 className="text-h2 text-text-primary">Got it — thanks!</h2>
        <p className="text-body text-text-secondary">
          I read every inquiry myself and usually reply within a day or two. Check your inbox for
          a confirmation.
        </p>
        {CAL_URL && (
          <MagneticButton href={CAL_URL} variant="secondary">
            Book a time instead
          </MagneticButton>
        )}
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col gap-5"
    >
      {TURNSTILE_SITE_KEY && (
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
      )}

      {/* Honeypot — visually hidden off-screen, not display:none, so it still
          catches bots that skip fields with no rendered layout box. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input id="name" name="name" type="text" required className={inputClass} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input id="email" name="email" type="email" required className={inputClass} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className={labelClass}>Project type</span>
        <PillGroup
          options={PROJECT_TYPE_OPTIONS}
          selected={projectType}
          onToggle={toggleProjectType}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className={labelClass}>Budget range</span>
        <PillGroup
          options={BUDGET_RANGE_OPTIONS}
          selected={budgetRange ? [budgetRange] : []}
          onToggle={(value) => setBudgetRange(value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className={labelClass}>Timeline</span>
        <PillGroup
          options={TIMELINE_OPTIONS}
          selected={timeline ? [timeline] : []}
          onToggle={(value) => setTimeline(value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="description" className={labelClass}>
          Tell me about your project
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={5}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="referenceLink" className={labelClass}>
          Reference link <span className="normal-case text-text-secondary/70">(optional)</span>
        </label>
        <input
          id="referenceLink"
          name="referenceLink"
          type="url"
          placeholder="https://"
          className={inputClass}
        />
      </div>

      {TURNSTILE_SITE_KEY ? (
        <div className="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY} data-action="inquiry" />
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
        {status === "submitting" ? "Sending…" : "Send inquiry"}
      </MagneticButton>
    </form>
  );
}
