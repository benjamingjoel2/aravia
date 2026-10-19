import type { Metadata } from "next";
import { alternates } from "@/lib/seo";
import { regions, countriesInRegion } from "@/data/countries";
import { destinationsIn } from "@/data/destinations";
import { LatticeRule } from "@/components/motif";
import { Reveal } from "@/components/motion/Reveal";
import { AskButton } from "@/components/ask/AskButton";
import { monthRanges } from "@/lib/months";
import { localePath } from "@/lib/paths";
import { destinationPhoto } from "@/lib/destinations";
import { isLocale } from "@/config/i18n";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PhotoCard } from "@/components/ui/PhotoCard";

export const metadata: Metadata = {
  alternates: alternates("/destinations"),
  title: "Where we take you",
  description: "The Gulf, the Levant and North Africa: the countries and places across the Arab world where your Aravia concierge arranges journeys.",
};

export default async function DestinationsPage({ params }: PageProps<"/[locale]/destinations">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const href = (p: string) => localePath(locale, p);
  return (
    <>
      <header className="container-page pt-40 pb-16 sm:pt-48">
        <p className="eyebrow">Where we take you</p>
        <h1 className="mt-6 max-w-4xl text-display-lg">From the Gulf to the Atlantic.</h1>
        <p className="mt-8 max-w-2xl text-lg text-ink-2">
          Eleven countries across the Arab world, and the places within them we know best. Combine as many as you wish; your concierge
          will shape the journey around you.
        </p>
        <nav aria-label="Regions" className="mt-12 flex flex-wrap gap-x-10 gap-y-3">
          {regions.map((r) => (
            <a key={r.id} href={`#${r.id}`} className="link-quiet text-xs tracking-[0.16em] font-medium uppercase">
              {r.name}
            </a>
          ))}
        </nav>
      </header>

      {regions.map((region) => (
        <section key={region.id} id={region.id} aria-labelledby={`${region.id}-title`} className="scroll-mt-24 pb-24">
          <div className="container-page">
            <LatticeRule className="mb-16" />
            <Reveal>
              <h2 id={`${region.id}-title`} className="text-display-md">
                {region.name}
              </h2>
              <p className="mt-4 max-w-2xl text-ink-2">{region.intro}</p>
            </Reveal>

            {countriesInRegion(region.id).map((country) => (
              <div key={country.code} id={country.slug} className="mt-20 scroll-mt-28 grid gap-10 lg:grid-cols-12">
                <Reveal className="lg:col-span-4">
                  <h3 className="font-display text-display-sm text-accent">
                    <Link href={href(`/destinations/${country.slug}`)} className="link-quiet !text-accent">
                      {country.name}
                    </Link>
                  </h3>
                  <p className="mt-4 text-ink-2">{country.intro}</p>
                </Reveal>
                <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
                  {destinationsIn(country.code).map((d) => (
                    <li key={d.slug}>
                      <PhotoCard
                        href={href(`/destinations/${country.slug}/${d.slug}`)}
                        title={d.name}
                        photo={destinationPhoto(d).photo}
                        meta={`Best: ${monthRanges(d.bestMonths)}`}
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                      >
                        {d.summary}
                      </PhotoCard>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="container-page pb-32 text-center">
        <LatticeRule className="mb-16" />
        <p className="mx-auto max-w-xl font-display text-display-sm">Somewhere you have in mind, or somewhere not listed here.</p>
        <div className="mt-10">
          <AskButton source="page" prefill="I would like to travel to ">
            Ask Aravia
          </AskButton>
        </div>
      </section>
    </>
  );
}
