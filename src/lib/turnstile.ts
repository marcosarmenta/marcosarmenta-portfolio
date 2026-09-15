const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

function getAllowedHostnames(): Set<string> {
  return new Set(
    (process.env.TURNSTILE_HOSTNAMES ?? "")
      .split(",")
      .map((h) => h.trim())
      .filter(Boolean)
  );
}

// expectedAction must match the widget's data-action attribute on the form
// that minted the token — stops a token from one form being replayed on another.
export async function verifyTurnstileToken(
  token: string,
  ip: string,
  expectedAction: string
): Promise<boolean> {
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
      data.action === expectedAction &&
      !!data.hostname &&
      allowedHostnames.has(data.hostname)
    );
  } catch {
    return false;
  }
}
