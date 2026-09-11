const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

// Set on the widget's data-action attribute once the /start-a-project page
// ships; checked here so a token minted for a different form can't be replayed.
const EXPECTED_ACTION = "inquiry";

function getAllowedHostnames(): Set<string> {
  return new Set(
    (process.env.TURNSTILE_HOSTNAMES ?? "")
      .split(",")
      .map((h) => h.trim())
      .filter(Boolean)
  );
}

export async function verifyTurnstileToken(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) throw new Error("TURNSTILE_SECRET_KEY is not set");

  const allowedHostnames = getAllowedHostnames();
  if (!token || token.length > 2048 || allowedHostnames.size === 0) return false;

  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      signal: AbortSignal.timeout(10_000),
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    });

    if (!res.ok) return false;

    const data = (await res.json()) as {
      success: boolean;
      action?: string;
      hostname?: string;
    };

    return (
      data.success === true &&
      data.action === EXPECTED_ACTION &&
      !!data.hostname &&
      allowedHostnames.has(data.hostname)
    );
  } catch {
    return false;
  }
}
