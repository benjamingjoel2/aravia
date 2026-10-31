"use client";

import { useId, useState } from "react";
import type { Channel } from "@/lib/request-schema";

type Labels = {
  name: string;
  phone: string;
  email: string;
  request: string;
  privacy: string;
  /** The footer offers both channels: a call back or email. */
  channels: Partial<Record<Channel, string>>;
  replyBy: string;
  submit: string;
  sent: string;
};

/**
 * The request form in the footer, after Sylver's "Contatta il commerciale".
 * Posts JSON when JavaScript runs; without it, the browser posts the same fields to /api/requests.
 */
export function FooterForm({ labels, locale }: { labels: Labels; locale: string }) {
  const uid = useId();
  const [channel, setChannel] = useState<Channel>("callback");
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState<string>();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setError(undefined);
    const body = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/requests", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fieldErrors?: Record<string, string> };
      if (res.ok && data.ok) return setState("sent");
      setErrors(data.fieldErrors ?? {});
      setError(data.error ?? "Please try again, or write to us by email.");
    } catch {
      setError("Please try again, or write to us by email.");
    }
    setState("idle");
  }

  if (state === "sent") {
    return (
      <p role="status" className="max-w-md text-lg">
        {labels.sent}
      </p>
    );
  }

  const field = (name: string) => ({
    id: `${uid}-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${uid}-${name}-error` : undefined,
    className: "field",
  });
  const fieldError = (name: string) =>
    errors[name] && (
      <p id={`${uid}-${name}-error`} className="mt-2 text-sm">
        {errors[name]}
      </p>
    );

  return (
    <form action="/api/requests" method="post" onSubmit={onSubmit} className="grid gap-x-10 gap-y-8 sm:grid-cols-2" noValidate>
      <input type="hidden" name="source" value="contact" />
      <input type="hidden" name="locale" value={locale} />
      <div aria-hidden className="hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label htmlFor={`${uid}-name`} className="field-label">
          {labels.name}
        </label>
        <input {...field("name")} autoComplete="name" maxLength={120} />
      </div>
      <div>
        <label htmlFor={`${uid}-channel`} className="field-label">
          {labels.replyBy}
        </label>
        <select {...field("channel")} value={channel} onChange={(e) => setChannel(e.target.value as Channel)}>
          {(Object.keys(labels.channels) as Channel[]).map((c) => (
            <option key={c} value={c} className="text-ink">
              {labels.channels[c]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={`${uid}-phone`} className="field-label">
          {labels.phone}
        </label>
        <input {...field("phone")} type="tel" autoComplete="tel" maxLength={40} required={channel === "callback"} />
        {fieldError("phone")}
      </div>
      <div>
        <label htmlFor={`${uid}-email`} className="field-label">
          {labels.email}
        </label>
        <input {...field("email")} type="email" autoComplete="email" maxLength={200} required={channel === "email"} />
        {fieldError("email")}
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={`${uid}-message`} className="field-label">
          {labels.request}
        </label>
        <textarea {...field("message")} rows={3} required minLength={3} maxLength={2000} className="field resize-none" />
        {fieldError("message")}
      </div>

      <div className="flex flex-col gap-5 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm">{labels.privacy}</p>
        <button type="submit" disabled={state === "sending"} className="link-mark self-start text-[0.9375rem] tracking-[0.16em] uppercase disabled:opacity-60">
          {labels.submit} <span aria-hidden className="arrow">→</span>
        </button>
      </div>
      {error && (
        <p role="alert" className="text-sm sm:col-span-2">
          {error}
        </p>
      )}
    </form>
  );
}
