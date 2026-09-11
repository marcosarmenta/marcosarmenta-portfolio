export interface InquirySubmission {
  name: string;
  email: string;
  projectType: string[];
  budgetRange: string;
  timeline: string;
  description: string;
  referenceLink?: string;
}

export interface InquiryRequestBody extends InquirySubmission {
  website?: string; // honeypot — real users never fill this in
  turnstileToken: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseInquiryBody(body: unknown): InquiryRequestBody | null {
  if (typeof body !== "object" || body === null) return null;
  const b = body as Record<string, unknown>;

  if (typeof b.name !== "string" || b.name.trim().length === 0) return null;
  if (typeof b.email !== "string" || !EMAIL_RE.test(b.email)) return null;
  if (!Array.isArray(b.projectType) || b.projectType.some((p) => typeof p !== "string")) {
    return null;
  }
  if (b.projectType.length === 0) return null;
  if (typeof b.budgetRange !== "string" || b.budgetRange.trim().length === 0) return null;
  if (typeof b.timeline !== "string" || b.timeline.trim().length === 0) return null;
  if (typeof b.description !== "string" || b.description.trim().length === 0) return null;
  if (b.referenceLink !== undefined && typeof b.referenceLink !== "string") return null;
  if (typeof b.turnstileToken !== "string" || b.turnstileToken.length === 0) return null;
  if (b.website !== undefined && typeof b.website !== "string") return null;

  return {
    name: b.name.trim(),
    email: b.email.trim(),
    projectType: b.projectType as string[],
    budgetRange: b.budgetRange,
    timeline: b.timeline,
    description: b.description.trim(),
    referenceLink: b.referenceLink || undefined,
    website: b.website,
    turnstileToken: b.turnstileToken,
  };
}
