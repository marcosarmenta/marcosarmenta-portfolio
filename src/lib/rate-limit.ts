const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 3;

// In-memory — resets on redeploy/cold start, and isn't shared across
// serverless instances. Fine as an initial guard against casual abuse; swap
// for a durable store (Edge Config, Upstash, etc.) if this route needs to
// withstand a real attack.
const hits = new Map<string, number[]>();

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_PER_WINDOW) {
    hits.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  hits.set(ip, timestamps);
  return false;
}
