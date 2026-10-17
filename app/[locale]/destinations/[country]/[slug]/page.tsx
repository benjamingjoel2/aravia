import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/config/i18n";
import { localePath } from "@/lib/paths";
import { countryByCode } from "@/data/countries";
import { destinationBySlug, destinations, destinationsIn } from "@/data/destinations";
import { destinationDetails } from "@/data/destination-details";
import { events } from "@/data/events";
import { etiquette } from "@/data/etiquette";
import { destinationPhoto } from "@/lib/destinations";
import { PageHero } from "@/components/ui/PageHero";
import { BestMonths } from "@/components/ui/BestMonths";
import { ToConfirm } from "@/components/ui/ToConfirm";
import { Reveal } from "@/components/motion/Reveal";
import { AskButton } from "@/components/ask/AskButton";
import { LatticeFrame, LatticeRule, StarMark } from "@/components/motif";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => destinations.map((d) => ({ locale, country: countryByCode[d.country].slug, slug: d.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/destinations/[country]/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const d = destinationBySlug[slug];
  return d ? { title: `${d.name}, ${countryByCode[d.country].name}`, description: d.summary } : {};
}

export default async function DestinationPage({ params }: PageProps<"/[locale]/destinations/[country]/[slug]">) {
  const { locale, country, slug } = await params;
  const d = destinationBySlug[slug];
  const c = d && countryByCode[d.country];
  if (!isLocale(locale) || !d || !c || c.slug !== country) notFound();
  const href = (p: string) => localePath(locale, p);
  const detail = destinationDetails[d.slug];
  const { photo, illustrative } = destinationPhoto(d);
  const here = events.filter((e) => e.destination === d.slug);
  const nearby = here.length ? [] : events.filter((e) => e.country === d.country).slice(0, 3);
  const guide = etiquette.find((g) => g.country === d.country);
  const others = destinationsIn(d.country).filter((o) => o.slug !== d.slug);

  return (
    <>
      <PageHero
        top={
          <nav aria-label="Breadcrumb" className="text-xs tracking-[0.2em] text-ivory-300 uppercase">
            <Link href={href("/destinations")} className="link-quiet">
              Where we take you
            </Link>
            <span aria-hidden> / </span>
            <Link href={href(`/destinations/${c.slug}`)} className="link-quiet">
              {c.name}
            </Link>
          </nav>
        }
        title={d.name}
        intro={d.summary}
        photo={photo}
        illustrative={illustrative}
      />

      <section className="container-page grid gap-16 pt-12 pb-24 lg:grid-cols-12">
        <div className="lg:col-span-6">
          {detail && (
            <Reveal>
              <p className="font-display text-[1.75rem] leading-snug text-ivory-50">{detail.opening}</p>
            </Reveal>
          )}
          <div className="mt-12">
            <h2 className="field-label">Best months</h2>
            <div className="mt-4 max-w-md">
              <BestMonths months={d.bestMonths} />
            </div>
          </div>
        </div>
        {detail && (
          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <LatticeFrame inset="0.75rem">
              <div className="border border-midnight-700 p-8 sm:p-10">
                <h2 className="eyebrow">What your concierge can arrange here</h2>
                <ul className="mt-6 space-y-4">
                  {detail.arrange.map((a) => (
                    <li key={a.text} className="flex gap-4 text-ivory-50">
                      <StarMark className="mt-1.5 h-3 w-3 shrink-0 text-brass-400" />
                      <span>
                        {a.text}
                        {a.confirm && <ToConfirm />}
                      </span>
                    </li>
                  ))}
                </ul>
                <AskButton source="destination" refId={d.slug} prefill={d.askPrompt} className="btn-brass mt-10 w-full">
                  Ask Aravia
                </AskButton>
              </div>
            </LatticeFrame>
          </Reveal>
        )}
      </section>

      <section className="container-page grid gap-16 pb-24 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <LatticeRule className="mb-12" />
          <h2 className="font-display text-display-sm">{here.length ? "In the Season" : `The Season in ${c.name}`}</h2>
          {[...here, ...nearby].length ? (
            <ul className="mt-8 divide-y divide-midnight-800 border-y border-midnight-800">
              {[...here, ...nearby].map((e) => (
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
        </div>
        {guide && (
          <aside className="lg:col-span-4 lg:col-start-9">
            <LatticeRule className="mb-12" />
            <h2 className="font-display text-display-sm">As a guest</h2>
            <ul className="mt-8 space-y-4 text-sm text-ivory-300">
              {[guide.dress[0], guide.photography[0], `The weekend: ${guide.weekend}`].map((t) => (
                <li key={t} className="flex gap-3">
                  <StarMark className="mt-1 h-3 w-3 shrink-0 text-brass-400" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <Link href={href(`/travelling-with-grace/${c.slug}`)} className="link-quiet mt-8 inline-block text-xs tracking-[0.28em] uppercase">
              Travelling with grace in {c.name} →
            </Link>
          </aside>
        )}
      </section>

      {others.length > 0 && (
        <section className="container-page pb-32">
          <LatticeRule className="mb-12" />
          <h2 className="eyebrow">Also in {c.name}</h2>
          <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={href(`/destinations/${c.slug}/${o.slug}`)} className="link-quiet font-display text-2xl">
                  {o.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
