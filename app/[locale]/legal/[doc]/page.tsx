import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/config/i18n";
import { legalBySlug, legalDocs } from "@/lib/legal";
import { photos } from "@/data/photos";
import { ToConfirm } from "@/components/ui/ToConfirm";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => legalDocs.map((d) => ({ locale, doc: d.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/legal/[doc]">): Promise<Metadata> {
  const { doc } = await params;
  const d = legalBySlug[doc];
  return d ? { title: d.title, robots: { index: d.slug !== "credits" } } : {};
}

export default async function LegalPage({ params }: PageProps<"/[locale]/legal/[doc]">) {
  const { locale, doc } = await params;
  const d = legalBySlug[doc];
  if (!isLocale(locale) || !d) notFound();

  return (
    <article className="container-page pt-40 pb-32 sm:pt-48">
      <header className="max-w-3xl">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-6 text-display-lg">{d.title}</h1>
        <p className="mt-6 text-sm text-ivory-500">
          Last updated {d.updated}.
          {d.slug !== "credits" && (
            <>
              {" "}Draft, to be reviewed by a lawyer for each country of operation.
              <ToConfirm />
            </>
          )}
        </p>
      </header>
      <div className="prose-aravia mt-16">
        {d.sections.map((s) => (
          <section key={s.heading}>
            <h2>{s.heading}</h2>
            {s.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </section>
        ))}
        {d.slug === "credits" && (
          <ul className="mt-10 space-y-3 text-sm">
            {Object.entries(photos).map(([key, p]) => (
              <li key={key}>
                <span className="text-ivory-50">{p.alt}.</span>{" "}
                <a href={p.credit} rel="noopener noreferrer">
                  View on Unsplash
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
