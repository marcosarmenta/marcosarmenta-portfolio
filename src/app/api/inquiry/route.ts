import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { parseInquiryBody } from "@/lib/inquiry";
import { isRateLimited } from "@/lib/rate-limit";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { InquiryNotificationEmail } from "@/emails/InquiryNotificationEmail";
import { InquiryConfirmationEmail } from "@/emails/InquiryConfirmationEmail";

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

  const body = parseInquiryBody(json);
  if (!body) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  // Honeypot tripped — pretend everything is fine, do nothing else.
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const tokenValid = await verifyTurnstileToken(body.turnstileToken, ip);
  if (!tokenValid) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const submission = {
    name: body.name,
    email: body.email,
    projectType: body.projectType,
    budgetRange: body.budgetRange,
    timeline: body.timeline,
    description: body.description,
    referenceLink: body.referenceLink,
  };

  const resend = new Resend(process.env.RESEND_API_KEY);
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const calUrl = process.env.NEXT_PUBLIC_CAL_URL;

  if (!fromEmail) throw new Error("RESEND_FROM_EMAIL is not set");
  if (!calUrl) throw new Error("NEXT_PUBLIC_CAL_URL is not set");

  await Promise.all([
    resend.emails.send({
      from: fromEmail,
      to: NOTIFICATION_TO,
      subject: `New project inquiry from ${submission.name}`,
      react: InquiryNotificationEmail(submission),
    }),
    resend.emails.send({
      from: fromEmail,
      to: submission.email,
      subject: "Got your project details",
      react: InquiryConfirmationEmail({ name: submission.name, calUrl }),
    }),
  ]);

  return NextResponse.json({ ok: true });
}
