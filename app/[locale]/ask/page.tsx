import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/config/i18n";
import { brand } from "@/config/brand";
import { getDictionary } from "@/lib/i18n";
import { whatsappLink } from "@/lib/whatsapp";
import { AskFlow } from "@/components/ask/AskFlow";
import { LatticeRule, StarMark } from "@/components/motif";

export const metadata: Metadata = {
  title: "Ask Aravia",
  description: "Tell your concierge what you would like arranged, anywhere in the Arab world. Continue by WhatsApp, a call back or email.",
};

const errors: Record<string, string> = {
  invalid: "Please check your request and the contact details, then try again.",
  busy: "We have received several requests from you in a short time. Please write to us on WhatsApp or by email.",
};

export default async function AskPage({ params, searchParams }: PageProps<"/[locale]/ask">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q.slice(0, 2000) : "";
  const error = typeof sp.error === "string" ? errors[sp.error] : undefined;

  return (
    <section className="container-page grid gap-16 pt-40 pb-32 sm:pt-48 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <p className="eyebrow">Ask Aravia</p>
        <h1 className="mt-6 text-display-lg">{brand.promise}</h1>
        <p className="mt-8 max-w-md text-ivory-300">
          Tell us what you have in mind, in as many or as few words as you like. Your concierge will take it from there, by WhatsApp, a
          call back or email.
        </p>
        <LatticeRule className="mt-12 max-w-xs" />
        <p className="mt-10 text-sm text-ivory-300">
          Or write directly:{" "}
          <a href={whatsappLink()} className="link-quiet text-sand-300">
            WhatsApp
          </a>{" "}
          ·{" "}
          <a href={`mailto:${brand.contact.email}`} className="link-quiet text-sand-300">
            {brand.contact.emailDisplay}
          </a>
        </p>
      </div>

      <div className="lg:col-span-7">
        <div className="border border-midnight-700 bg-midnight-900/60 p-7 sm:p-12">
          <StarMark className="mb-6 h-6 w-6 text-brass-400" />
          {error && (
            <p role="alert" className="mb-8 border-s border-rose-400 ps-4 text-sm text-rose-400">
              {error}
            </p>
          )}
          <AskFlow labels={dict.ask} locale={locale} initialMessage={q} startAt={q ? "channel" : "compose"} source="page" />

          {/* Without JavaScript, a plain form posts straight to the API. */}
          <noscript>
            <form action="/api/requests" method="post" className="grid gap-6">
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="source" value="page" />
              <div aria-hidden className="hidden">
                <label>
                  Leave empty <input name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>
              <label className="field-label" htmlFor="ns-message">
                {dict.ask.label}
              </label>
              <textarea id="ns-message" name="message" required rows={4} defaultValue={q} className="field" />
              <fieldset>
                <legend className="field-label">{dict.ask.chooseTitle}</legend>
                <label className="mt-3 me-6 inline-flex gap-2">
                  <input type="radio" name="channel" value="email" defaultChecked /> {dict.ask.email.title}
                </label>
                <label className="me-6 inline-flex gap-2">
                  <input type="radio" name="channel" value="callback" /> {dict.ask.callback.title}
                </label>
              </fieldset>
              <label className="field-label" htmlFor="ns-name">
                {dict.ask.name}
              </label>
              <input id="ns-name" name="name" autoComplete="name" className="field" />
              <label className="field-label" htmlFor="ns-email">
                {dict.ask.email_}
              </label>
              <input id="ns-email" name="email" type="email" autoComplete="email" className="field" />
              <label className="field-label" htmlFor="ns-phone">
                {dict.ask.phone}
              </label>
              <input id="ns-phone" name="phone" type="tel" autoComplete="tel" className="field" />
              <button type="submit" className="btn-brass justify-self-end">
                {dict.ask.send}
              </button>
            </form>
          </noscript>
        </div>
      </div>
    </section>
  );
}
