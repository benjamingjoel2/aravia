import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/config/i18n";
import { localePath } from "@/lib/paths";
import { countries, regionById } from "@/data/countries";
import { destinationsIn } from "@/data/destinations";
import { entryNotes } from "@/data/composer";
import { etiquette } from "@/data/etiquette";
import { AskButton } from "@/components/ask/AskButton";
import { LatticeRule, StarMark } from "@/components/motif";
import { Reveal } from "@/components/motion/Reveal";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => countries.map((c) => ({ locale, country: c.slug })));
}

const bySlug = (slug: string) => countries.find((c) => c.slug === slug);

export async function generateMetadata({ params }: PageProps<"/[locale]/travelling-with-grace/[country]">): Promise<Metadata> {
  const { country } = await params;
  const c = bySlug(country);
  if (!c) return {};
  return {
    title: `Travelling with grace in ${c.name}`,
    description: `Dress, the weekend, alcohol, photography, greetings and tipping in ${c.name}: a calm, practical guide for guests.`,
  };
}

export default async function CountryGrace({ params }: PageProps<"/[locale]/travelling-with-grace/[country]">) {
  const { locale, country } = await params;
  const c = bySlug(country);
  const guide = c && etiquette.find((g) => g.country === c.code);
  if (!isLocale(locale) || !c || !guide) notFound();
  const href = (p: string) => localePath(locale, p);
  const entry = entryNotes.find((n) => n.country === c.code);

  const sections: { id: string; title: string; items: string[] }[] = [
    { id: "dress", title: "Dress", items: guide.dress },
    { id: "weekend", title: "The weekend", items: [guide.weekend] },
    { id: "alcohol", title: "Alcohol", items: guide.alcohol },
    { id: "photography", title: "Photography", items: guide.photography },
    { id: "greetings", title: "Greetings", items: guide.greetings },
    { id: "tipping", title: "Tipping", items: guide.tipping },
  ];

  return (
    <div className="container-page pt-40 pb-32 sm:pt-48">
      <nav aria-label="Breadcrumb" className="text-xs tracking-[0.2em] text-ivory-500 uppercase">
        <Link href={href("/travelling-with-grace")} className="link-quiet text-ivory-300">
          Travelling with grace
        </Link>
        <span aria-hidden> / </span>
        <span>{regionById[c.region].name}</span>
      </nav>

      <header className="mt-8 max-w-3xl">
        <h1 className="text-display-lg">{c.name}</h1>
        <p className="mt-8 text-lg text-ivory-300">{guide.intro}</p>
      </header>

      <div className="mt-20 grid gap-16 lg:grid-cols-12">
        <nav aria-label="On this page" className="hidden lg:col-span-3 lg:block">
          <ul className="sticky top-28 space-y-3 text-sm">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="link-quiet text-ivory-300">
                  {s.title}
                </a>
              </li>
            ))}
            <li>
              <a href="#entry" className="link-quiet text-ivory-300">
                Entry
              </a>
            </li>
          </ul>
        </nav>

        <div className="lg:col-span-8">
          {sections.map((s) => (
            <Reveal key={s.id}>
              <section id={s.id} aria-labelledby={`${s.id}-title`} className="scroll-mt-28 border-t border-midnight-800 py-10">
                <h2 id={`${s.id}-title`} className="font-display text-display-sm text-sand-300">
                  {s.title}
                </h2>
                <ul className="mt-6 space-y-4">
                  {s.items.map((item) => (
                    <li key={item} className="flex gap-4 text-ivory-300">
                      <StarMark className="mt-2 h-3 w-3 shrink-0 text-brass-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          ))}

          {entry && (
            <section id="entry" aria-labelledby="entry-title" className="scroll-mt-28 border-t border-midnight-800 py-10">
              <h2 id="entry-title" className="font-display text-display-sm text-sand-300">
                Entry
              </h2>
              <p className="mt-6 text-ivory-300">{entry.summary}</p>
              {entry.caution && <p className="mt-4 text-rose-400">{entry.caution}</p>}
              <p className="mt-4 text-xs tracking-[0.16em] text-ivory-500 uppercase">Guidance only, verify. Rules depend on your passport.</p>
            </section>
          )}

          <p className="mt-6 text-sm text-ivory-500">Customs and laws change. Everything on this page is a guide only: verify before you travel.</p>

          <LatticeRule className="my-16" />

          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <h2 className="eyebrow">Where we take you in {c.name}</h2>
              <ul className="mt-5 space-y-2">
                {destinationsIn(c.code).map((d) => (
                  <li key={d.slug}>
                    <Link href={href(`/destinations#${c.slug}`)} className="link-quiet font-display text-xl">
                      {d.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="sm:text-end">
              <p className="text-ivory-300">Travelling to {c.name}? Your concierge will brief you before you go.</p>
              <AskButton source="page" refId={`grace-${c.slug}`} prefill={`A journey to ${c.name}`} className="btn-quiet mt-6">
                Ask Aravia
              </AskButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
