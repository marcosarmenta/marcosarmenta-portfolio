import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { parseContactBody } from "@/lib/contact";
import { isRateLimited } from "@/lib/rate-limit";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { ContactNotificationEmail } from "@/emails/ContactNotificationEmail";
import { ContactConfirmationEmail } from "@/emails/ContactConfirmationEmail";

const NOTIFICATION_TO = "hi@marcosarmenta.com";

function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || "unknown";
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many submissions. Try again later." }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const body = parseContactBody(json);
  if (!body) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  // Honeypot tripped — pretend everything is fine, do nothing else.
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const tokenValid = await verifyTurnstileToken(body.turnstileToken, ip, "contact");
  if (!tokenValid) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const submission = { name: body.name, email: body.email, message: body.message };

  const resend = new Resend(process.env.RESEND_API_KEY);
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  if (!fromEmail) throw new Error("RESEND_FROM_EMAIL is not set");

  await Promise.all([
    resend.emails.send({
      from: fromEmail,
      to: NOTIFICATION_TO,
      subject: `New message from ${submission.name}`,
      react: ContactNotificationEmail(submission),
    }),
    resend.emails.send({
      from: fromEmail,
      to: submission.email,
      subject: "Got your message",
      react: ContactConfirmationEmail({ name: submission.name }),
    }),
  ]);

  return NextResponse.json({ ok: true });
}
