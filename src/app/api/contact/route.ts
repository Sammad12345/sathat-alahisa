import { normalizeContact, validateContact } from "@/lib/contact";
import { isMailerConfigured, sendServiceRequest } from "@/lib/mailer";

// Best-effort, per-instance limit: 5 requests per IP per 10 minutes.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const json = (body: unknown, status: number) => Response.json(body, { status });

export async function POST(request: Request) {
  // Only accept submissions from this site's own pages.
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) return json({ error: "forbidden" }, 403);

  let raw: Record<string, unknown>;
  try {
    raw = await request.json();
  } catch {
    return json({ error: "invalid" }, 400);
  }

  // Honeypot: real visitors never see or fill this field. Pretend success so bots move on.
  if (typeof raw.company === "string" && raw.company.length > 0) return json({ ok: true }, 200);

  const input = normalizeContact(raw);
  const errors = validateContact(input);
  if (Object.keys(errors).length > 0) return json({ error: "invalid", fields: errors }, 422);

  if (!isMailerConfigured()) return json({ error: "not_configured" }, 503);

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return json({ error: "rate_limited" }, 429);

  const locale = raw.locale === "en" ? "en" : "ar";
  try {
    await sendServiceRequest(input, locale);
    return json({ ok: true }, 200);
  } catch (error) {
    console.error("[contact] email delivery failed:", error instanceof Error ? error.message : error);
    return json({ error: "send_failed" }, 502);
  }
}
