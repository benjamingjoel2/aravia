import type { Metadata } from "next";
import { alternates } from "@/lib/seo";
import { notFound } from "next/navigation";
import { isLocale } from "@/config/i18n";
import { brand } from "@/config/brand";
import { getDictionary } from "@/lib/i18n";
import { AskFlow } from "@/components/ask/AskFlow";
import { LatticeRule, StarMark } from "@/components/motif";

export const metadata: Metadata = {
  alternates: alternates("/contact"),
  title: "Contact",
  description: "Reach your Aravia concierge by email or ask for a call back. At any hour.",
};

export default async function Contact({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <section className="container-page grid gap-16 pt-40 pb-32 sm:pt-48 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <p className="eyebrow">Contact</p>
        <h1 className="mt-6 text-display-lg">
          Your concierge is one message away. <em className="text-accent">At any hour.</em>
        </h1>
        <LatticeRule className="my-12 max-w-xs" />
        <dl className="space-y-8">
          <div>
            <dt className="field-label">Email</dt>
            <dd className="mt-2">
              <a href={`mailto:${brand.contact.email}`} className="link-quiet font-display text-2xl">
                {brand.contact.emailDisplay}
              </a>
            </dd>
          </div>
          <div>
            <dt className="field-label">Office</dt>
            <dd className="mt-2 text-ink-2">
              <address className="not-italic">
                {brand.address.lines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
            </dd>
          </div>
          <div>
            <dt className="field-label">Press and partnerships</dt>
            <dd className="mt-2 text-ink-2">
              Write to{" "}
              <a href={`mailto:${brand.contact.email}`} className="link-quiet text-accent">
                {brand.contact.emailDisplay}
              </a>
              . We do not discuss clients, ever.
            </dd>
          </div>
        </dl>
      </div>
      <div className="lg:col-span-6 lg:col-start-7">
        <div className="border border-line-strong bg-paper-2 p-7 sm:p-12">
          <StarMark className="mb-6 h-6 w-6 text-accent" />
          <AskFlow labels={dict.ask} locale={locale} source="contact" />
        </div>
      </div>
    </section>
  );
}
