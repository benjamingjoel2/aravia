import { NextResponse } from "next/server";
import { conciergeRequestSchema } from "@/lib/request-schema";
import { defaultLocale, isLocale } from "@/config/i18n";

/**
 * Receives every Ask Aravia request.
 * Accepts JSON (from the site's Ask Aravia dialog) or form data (the no-JavaScript fallback on /ask).
 */

// Simple per-instance rate limit. Serverless instances do not share memory, so this only blunts bursts;
// replace with a shared store (e.g. Upstash, Vercel KV) if abuse appears.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 8;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  const isForm = contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data");

  let raw: Record<string, unknown>;
  try {
    raw = isForm ? Object.fromEntries((await request.formData()).entries()) : await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Unreadable request." }, { status: 400 });
  }

  const locale = typeof raw.locale === "string" && isLocale(raw.locale) ? raw.locale : defaultLocale;
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return isForm
      ? NextResponse.redirect(new URL(`/${locale}/ask?error=busy`, request.url), 303)
      : NextResponse.json({ ok: false, error: "Too many requests. Please write to us by email." }, { status: 429 });
  }

  const parsed = conciergeRequestSchema.safeParse(raw);
  if (!parsed.success) {
    // A filled honeypot is a bot: answer as if all is well, and keep nothing.
    if (typeof raw.website === "string" && raw.website.length > 0) {
      return isForm
        ? NextResponse.redirect(new URL(`/${locale}/ask/received`, request.url), 303)
        : NextResponse.json({ ok: true, id: crypto.randomUUID() });
    }
    const fieldErrors = Object.fromEntries(parsed.error.issues.map((i) => [i.path.join("."), i.message]));
    return isForm
      ? NextResponse.redirect(new URL(`/${locale}/ask?error=invalid`, request.url), 303)
      : NextResponse.json({ ok: false, error: "Please check the highlighted details.", fieldErrors }, { status: 422 });
  }

  const { website: _honeypot, ...data } = parsed.data;
  const record = { id: crypto.randomUUID(), receivedAt: new Date().toISOString(), ...data };

  // The log contains personal details. It is the only copy until the CRM is connected; keep log retention short.
  console.info("[aravia:request]", JSON.stringify(record));

  // TODO(CRM): forward `record` to the CRM, assigning it to the client's concierge.
  // TODO(Email): send an acknowledgement when channel is "email", from the concierge's own address.

  return isForm
    ? NextResponse.redirect(new URL(`/${locale}/ask/received?channel=${data.channel}`, request.url), 303)
    : NextResponse.json({ ok: true, id: record.id });
}
