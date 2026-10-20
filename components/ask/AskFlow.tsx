"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import type { Dictionary } from "@/dictionaries/en";
import type { Channel } from "@/lib/request-schema";
import { whatsappLink } from "@/lib/whatsapp";
import { requestExamples } from "@/data/request-examples";
import { CyclingPlaceholder } from "./CyclingPlaceholder";
import type { AskSource } from "./AskContext";

export type AskLabels = Dictionary["ask"];

type Step = "compose" | "channel" | "details" | "sent";

type Props = {
  labels: AskLabels;
  locale: string;
  initialMessage?: string;
  startAt?: "compose" | "channel";
  source?: AskSource;
  refId?: string;
  /** Called once the request has been sent, e.g. to let a dialog know. */
  onSent?: () => void;
  /** Id of the element that titles this flow, for the dialog. */
  titleId?: string;
  /** Focus the request field on mount (inside the dialog). */
  autoFocus?: boolean;
};

type FieldErrors = Partial<Record<"message" | "phone" | "email", string>>;

async function sendRequest(body: Record<string, unknown>, keepalive = false) {
  const res = await fetch("/api/requests", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
    keepalive,
  });
  const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fieldErrors?: Record<string, string> };
  return { ok: res.ok && data.ok === true, fieldErrors: data.fieldErrors ?? {}, error: res.status === 429 ? data.error : undefined };
}

/** The whole Ask Aravia journey: compose, choose a channel, add details, sent. */
export function AskFlow({ labels, locale, initialMessage = "", startAt = "compose", source = "page", refId, onSent, titleId, autoFocus = false }: Props) {
  const reduce = useReducedMotion();
  const uid = useId();
  const [step, setStep] = useState<Step>(initialMessage.trim() && startAt === "channel" ? "channel" : "compose");
  const [message, setMessage] = useState(initialMessage);
  const [channel, setChannel] = useState<Channel | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [preferredTime, setPreferredTime] = useState<string>(labels.times[0]);
  const [timezone, setTimezone] = useState<string | undefined>();
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const stepHeading = useRef<HTMLHeadingElement>(null);
  const messageField = useRef<HTMLTextAreaElement>(null);

  useEffect(() => setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone), []);

  // Move focus to the new step's heading so keyboard and screen-reader users follow along.
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      // The flow mounts after the dialog has opened, so move focus here explicitly.
      if (autoFocus) (step === "compose" ? messageField.current : stepHeading.current)?.focus();
      return;
    }
    if (step === "compose") messageField.current?.focus();
    else stepHeading.current?.focus();
  }, [step]);

  const base = { message, source, ref: refId, locale, timezone };

  function submitMessage(e: FormEvent) {
    e.preventDefault();
    if (message.trim().length < 3) {
      setErrors({ message: "Please tell us a little about what you would like arranged." });
      return;
    }
    setErrors({});
    setStep("channel");
  }

  function chooseWhatsApp() {
    // The link itself opens WhatsApp; this records the request without delaying it.
    setChannel("whatsapp");
    void sendRequest({ ...base, channel: "whatsapp" }, true);
    setStep("sent");
    onSent?.();
  }

  async function submitDetails(e: FormEvent) {
    e.preventDefault();
    if (!channel) return;
    // Check the obvious locally first; the server validates again.
    if (channel === "callback" && phone.replace(/\D/g, "").length < 6) {
      setErrors({ phone: "Please add a number we can call, with the country code." });
      return;
    }
    if (channel === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrors({ email: "Please check the email address." });
      return;
    }
    setErrors({});
    setPending(true);
    setFormError(null);
    try {
      const { ok, fieldErrors, error } = await sendRequest({
        ...base,
        channel,
        name,
        phone: channel === "callback" ? phone : undefined,
        email: channel === "email" ? email : undefined,
        preferredTime: channel === "callback" ? preferredTime : undefined,
      });
      if (ok) {
        setStep("sent");
        onSent?.();
      } else if (Object.keys(fieldErrors).length) {
        setErrors(fieldErrors as FieldErrors);
      } else {
        setFormError(error ?? labels.error);
      }
    } catch {
      setFormError(labels.error);
    } finally {
      setPending(false);
    }
  }

  function reset() {
    setMessage("");
    setChannel(null);
    setErrors({});
    setFormError(null);
    setStep("compose");
  }

  const fade = {
    initial: reduce ? false : { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: reduce ? undefined : { opacity: 0, y: -6 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  };

  const headingClass = "text-display-sm outline-none";

  return (
    <div aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        {step === "compose" && (
          <motion.form key="compose" {...fade} onSubmit={submitMessage} noValidate>
            <h2 id={titleId} className={headingClass}>
              {labels.label}
            </h2>
            <label htmlFor={`${uid}-message`} className="sr-only">
              {labels.label}
            </label>
            <div className="relative mt-8">
              <textarea
                ref={messageField}
                autoFocus={autoFocus}
                id={`${uid}-message`}
                name="message"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (errors.message) setErrors({});
                }}
                rows={3}
                maxLength={2000}
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={errors.message ? `${uid}-message-error` : undefined}
                className="peer relative z-10 block w-full resize-none border-0 border-b border-line-strong bg-transparent px-0 py-3 font-display text-[1.75rem] leading-snug text-ink focus:border-ink focus:outline-none"
              />
              <CyclingPlaceholder
                examples={requestExamples}
                visible={message.length === 0}
                className="!items-start py-3 font-display text-2xl leading-snug text-ink-3"
              />
            </div>
            {errors.message && (
              <p id={`${uid}-message-error`} className="mt-3 text-sm text-rose-600">
                {errors.message}
              </p>
            )}
            <div className="mt-8 flex flex-col-reverse items-stretch gap-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-ink-3">{labels.privacy}</p>
              <button type="submit" className="btn-primary shrink-0">
                {labels.submit}
              </button>
            </div>
          </motion.form>
        )}

        {step === "channel" && (
          <motion.div key="channel" {...fade}>
            <RequestQuote labels={labels} message={message} onEdit={() => setStep("compose")} />
            <h2 id={titleId} ref={stepHeading} tabIndex={-1} className={`mt-8 ${headingClass}`}>
              {labels.chooseTitle}
            </h2>
            <p className="mt-3 text-ink-2">{labels.chooseIntro}</p>
            <ul className="mt-8 grid gap-3">
              <li>
                <ChannelOption
                  as="a"
                  href={whatsappLink(message)}
                  onClick={chooseWhatsApp}
                  title={labels.whatsapp.title}
                  body={labels.whatsapp.body}
                  icon={<WhatsAppGlyph />}
                />
              </li>
              <li>
                <ChannelOption
                  onClick={() => {
                    setChannel("callback");
                    setStep("details");
                  }}
                  title={labels.callback.title}
                  body={labels.callback.body}
                  icon={<PhoneGlyph />}
                />
              </li>
              <li>
                <ChannelOption
                  onClick={() => {
                    setChannel("email");
                    setStep("details");
                  }}
                  title={labels.email.title}
                  body={labels.email.body}
                  icon={<MailGlyph />}
                />
              </li>
            </ul>
          </motion.div>
        )}

        {step === "details" && channel && (
          <motion.form key="details" {...fade} onSubmit={submitDetails} noValidate>
            <RequestQuote labels={labels} message={message} onEdit={() => setStep("compose")} />
            <h2 id={titleId} ref={stepHeading} tabIndex={-1} className={`mt-8 ${headingClass}`}>
              {channel === "callback" ? labels.callback.title : labels.email.title}
            </h2>
            <div className="mt-8 grid gap-7">
              <Field id={`${uid}-name`} label={labels.name} hint={labels.nameHint}>
                <input id={`${uid}-name`} name="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} maxLength={120} className="field" />
              </Field>
              {channel === "callback" ? (
                <>
                  <Field id={`${uid}-phone`} label={labels.phone} error={errors.phone}>
                    <input
                      id={`${uid}-phone`}
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      required
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors({});
                      }}
                      maxLength={40}
                      placeholder="+44 …"
                      aria-invalid={errors.phone ? true : undefined}
                      aria-describedby={errors.phone ? `${uid}-phone-error` : undefined}
                      className="field"
                    />
                  </Field>
                  <fieldset>
                    <legend className="field-label">{labels.preferredTime}</legend>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {labels.times.map((t) => (
                        <label key={t} className="chip">
                          <input type="radio" name="preferredTime" value={t} checked={preferredTime === t} onChange={() => setPreferredTime(t)} className="sr-only" />
                          {t}
                        </label>
                      ))}
                    </div>
                    {timezone && (
                      <p className="mt-3 text-xs text-ink-3">
                        {labels.timezoneNote}: {timezone.replace(/_/g, " ")}
                      </p>
                    )}
                  </fieldset>
                </>
              ) : (
                <Field id={`${uid}-email`} label={labels.email_} error={errors.email}>
                  <input
                    id={`${uid}-email`}
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({});
                    }}
                    maxLength={200}
                    aria-invalid={errors.email ? true : undefined}
                    aria-describedby={errors.email ? `${uid}-email-error` : undefined}
                    className="field"
                  />
                </Field>
              )}
            </div>
            {formError && (
              <p role="alert" className="mt-6 text-sm text-rose-600">
                {formError}
              </p>
            )}
            <div className="mt-10 flex flex-col-reverse items-stretch gap-6 sm:flex-row sm:items-center sm:justify-between">
              <button type="button" onClick={() => setStep("channel")} className="link-quiet text-xs tracking-[0.16em] font-medium uppercase">
                {labels.back}
              </button>
              <button type="submit" className="btn-primary whitespace-nowrap" disabled={pending} aria-busy={pending}>
                {pending ? labels.sending : labels.send}
              </button>
            </div>
          </motion.form>
        )}

        {step === "sent" && channel && (
          <motion.div key="sent" {...fade}>
            <h2 id={titleId} ref={stepHeading} tabIndex={-1} className={headingClass}>
              {labels.sentTitle}
            </h2>
            <p className="mt-4 max-w-md text-ink-2">{labels.sent[channel]}</p>
            <div className="mt-10 flex flex-wrap items-center gap-8">
              {channel === "whatsapp" && (
                <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  {labels.whatsappAgain}
                </a>
              )}
              <button type="button" onClick={reset} className="link-quiet text-xs tracking-[0.16em] font-medium uppercase">
                {labels.another}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function RequestQuote({ labels, message, onEdit }: { labels: AskLabels; message: string; onEdit: () => void }) {
  return (
    <div className="border-s border-ink/40 ps-5">
      <p className="eyebrow !text-[0.625rem]">{labels.yourRequest}</p>
      <p className="mt-2 font-display text-xl leading-snug text-ink">{message}</p>
      <button type="button" onClick={onEdit} className="link-quiet mt-2 text-xs text-ink-3">
        {labels.edit}
      </button>
    </div>
  );
}

function Field({ id, label, hint, error, children }: { id: string; label: string; hint?: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-2 text-xs text-ink-3">{hint}</p>}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-rose-600">
          {error}
        </p>
      )}
    </div>
  );
}

type OptionProps = { title: string; body: string; icon: ReactNode; onClick: () => void } & ({ as: "a"; href: string } | { as?: "button" });

function ChannelOption(props: OptionProps) {
  const { title, body, icon, onClick } = props;
  const inner = (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-line-strong text-ink transition-colors duration-500 group-hover:border-ink">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block font-display text-xl text-ink">{title}</span>
        <span className="mt-0.5 block text-sm text-ink-2">{body}</span>
      </span>
      <span aria-hidden className="ms-auto text-ink-3 transition-transform duration-700 group-hover:translate-x-1 rtl:rotate-180">
        →
      </span>
    </>
  );
  const cls =
    "group flex w-full items-center gap-5 border border-line bg-paper-2/60 p-4 text-start transition-colors duration-500 hover:border-ink hover:bg-paper-2 sm:p-5";
  if (props.as === "a") {
    return (
      <a href={props.href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

const glyph = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1, className: "h-5 w-5", "aria-hidden": true } as const;

function WhatsAppGlyph() {
  return (
    <svg {...glyph}>
      <path d="M4 20l1.2-4A8 8 0 1 1 8.4 19z" />
      <path d="M9 9.5c.3 2 1.8 3.8 4 4.5l1.2-1.1 1.8.9-.5 1.6c-3.5 0-6.5-3-6.5-6.5l1.6-.5.9 1.8z" />
    </svg>
  );
}
function PhoneGlyph() {
  return (
    <svg {...glyph}>
      <path d="M6 3h3l1.5 4.5-2 1.5a11 11 0 0 0 6.5 6.5l1.5-2L21 15v3a3 3 0 0 1-3 3A15 15 0 0 1 3 6a3 3 0 0 1 3-3z" />
    </svg>
  );
}
function MailGlyph() {
  return (
    <svg {...glyph}>
      <path d="M3 6h18v12H3z" />
      <path d="M3 6l9 7 9-7" />
    </svg>
  );
}
