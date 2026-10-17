import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/config/i18n";
import { localePath } from "@/lib/paths";
import { countries, regionById } from "@/data/countries";
import { destinationsIn } from "@/data/destinations";
import { events } from "@/data/events";
import { etiquette } from "@/data/etiquette";
import { entryNotes } from "@/data/composer";
import { countryBySlug, countryPhoto, destinationPhoto } from "@/lib/destinations";
import { monthRanges } from "@/lib/months";
import { PageHero } from "@/components/ui/PageHero";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { Reveal } from "@/components/motion/Reveal";
import { AskButton } from "@/components/ask/AskButton";
import { LatticeRule } from "@/components/motif";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => countries.map((c) => ({ locale, country: c.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/destinations/[country]">): Promise<Metadata> {
  const { country } = await params;
  const c = countryBySlug(country);
  return c ? { title: c.name, description: `${c.intro} Journeys in ${c.name} arranged by your Aravia concierge.` } : {};
}

export default async function CountryPage({ params }: PageProps<"/[locale]/destinations/[country]">) {
  const { locale, country } = await params;
  const c = countryBySlug(country);
  if (!isLocale(locale) || !c) notFound();
  const href = (p: string) => localePath(locale, p);
  const list = destinationsIn(c.code);
  const hero = countryPhoto(c.code);
  const season = events.filter((e) => e.country === c.code);
  const guide = etiquette.find((g) => g.country === c.code);
  const entry = entryNotes.find((n) => n.country === c.code);

  return (
    <>
      <PageHero
        top={
          <nav aria-label="Breadcrumb" className="text-xs tracking-[0.2em] text-ivory-300 uppercase">
            <Link href={href("/destinations")} className="link-quiet">
              Where we take you
            </Link>
            <span aria-hidden> / </span>
            <Link href={href(`/destinations#${c.region}`)} className="link-quiet">
              {regionById[c.region].name}
            </Link>
          </nav>
        }
        title={c.name}
        intro={c.intro}
        photo={hero.photo}
        illustrative={hero.illustrative}
      />

      <section className="container-page pt-8 pb-24" aria-labelledby="places-title">
        <h2 id="places-title" className="eyebrow">
          Where we take you in {c.name}
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((d, i) => (
            <Reveal as="li" key={d.slug} delay={(i % 3) * 0.08}>
              <PhotoCard href={href(`/destinations/${c.slug}/${d.slug}`)} title={d.name} photo={destinationPhoto(d).photo} meta={`Best: ${monthRanges(d.bestMonths)}`}>
                {d.summary}
              </PhotoCard>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="container-page grid gap-16 pb-32 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <LatticeRule className="mb-12" />
          <h2 className="font-display text-display-sm">The Season in {c.name}</h2>
          {season.length ? (
            <ul className="mt-8 divide-y divide-midnight-800 border-y border-midnight-800">
              {season.map((e) => (
                <li key={e.slug} className="flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:justify-between">
                  <span>
                    <span className="block font-display text-xl">{e.name}</span>
                    <span className="text-sm text-ivory-500">{e.timing} · verify yearly</span>
                  </span>
                  <AskButton source="season" refId={e.slug} prefill={e.askPrompt} startAt="channel" className="link-quiet shrink-0 text-xs tracking-[0.28em] uppercase">
                    Request access
                  </AskButton>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-6 text-ivory-300">Nothing is listed yet. Ask, and we will tell you what is on during your dates.</p>
          )}
          <Link href={href(`/season?country=${c.code}`)} className="link-quiet mt-6 inline-block text-xs tracking-[0.28em] uppercase">
            The full Season →
          </Link>
        </div>

        <aside className="lg:col-span-4 lg:col-start-9">
          <LatticeRule className="mb-12" />
          <h2 className="font-display text-display-sm">Before you go</h2>
          <dl className="mt-8 space-y-6 text-sm">
            {guide && (
              <div>
                <dt className="field-label">The weekend</dt>
                <dd className="mt-2 text-ivory-300">{guide.weekend}</dd>
              </div>
            )}
            {guide && (
              <div>
                <dt className="field-label">Dress</dt>
                <dd className="mt-2 text-ivory-300">{guide.dress[0]}</dd>
              </div>
            )}
            {entry && (
              <div>
                <dt className="field-label">Entry</dt>
                <dd className="mt-2 text-ivory-300">
                  {entry.summary} <span className="text-ivory-500">Guidance only, verify.</span>
                </dd>
              </div>
            )}
          </dl>
          <Link href={href(`/travelling-with-grace/${c.slug}`)} className="link-quiet mt-8 inline-block text-xs tracking-[0.28em] uppercase">
            Travelling with grace in {c.name} →
          </Link>
          <div className="mt-12">
            <AskButton source="destination" refId={c.slug} prefill={`A journey to ${c.name}`} className="btn-brass">
              Ask Aravia
            </AskButton>
          </div>
        </aside>
      </section>
    </>
  );
}
