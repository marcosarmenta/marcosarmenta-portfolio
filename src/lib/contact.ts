export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
}

export interface ContactRequestBody extends ContactSubmission {
  website?: string; // honeypot — real users never fill this in
  turnstileToken: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseContactBody(body: unknown): ContactRequestBody | null {
  if (typeof body !== "object" || body === null) return null;
  const b = body as Record<string, unknown>;

  if (typeof b.name !== "string" || b.name.trim().length === 0) return null;
  if (typeof b.email !== "string" || !EMAIL_RE.test(b.email)) return null;
  if (typeof b.message !== "string" || b.message.trim().length === 0) return null;
  if (typeof b.turnstileToken !== "string" || b.turnstileToken.length === 0) return null;
  if (b.website !== undefined && typeof b.website !== "string") return null;

  return {
    name: b.name.trim(),
    email: b.email.trim(),
    message: b.message.trim(),
    website: b.website,
    turnstileToken: b.turnstileToken,
  };
}
