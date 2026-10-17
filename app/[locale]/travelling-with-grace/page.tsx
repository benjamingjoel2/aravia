import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/config/i18n";
import { localePath } from "@/lib/paths";
import { countriesInRegion, regions } from "@/data/countries";
import { etiquette } from "@/data/etiquette";
import { LatticeFrame, LatticeHover, LatticeRule } from "@/components/motif";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Travelling with grace",
  description:
    "A calm, practical guide to custom across the Arab world: dress at religious and heritage sites, the weekend, alcohol, photography, greetings and tipping, country by country.",
};

const weekendFor = Object.fromEntries(etiquette.map((g) => [g.country, g.weekend]));

export default async function GracePage({ params }: PageProps<"/[locale]/travelling-with-grace">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const href = (p: string) => localePath(locale, p);

  return (
    <div className="container-page pt-40 pb-32 sm:pt-48">
      <header className="max-w-3xl">
        <p className="eyebrow">Travelling with grace</p>
        <h1 className="mt-6 text-display-lg">To be a guest is an art. Here is how it is practised.</h1>
        <p className="mt-8 text-lg text-ivory-300">
          Hospitality runs deep across the Arab world, and it is returned in small courtesies: how we dress at a mosque, when we raise a
          camera, how we accept a cup of coffee. This is what our concierges share with every guest before they travel. Customs vary a
          great deal from one country to the next, and they change, so treat it as a companion rather than a rulebook.
        </p>
      </header>

      <Reveal className="mt-20">
        <LatticeFrame inset="1rem">
          <Link
            href={href("/travelling-with-grace/ramadan")}
            className="lattice-host group grid gap-6 border border-midnight-700 bg-midnight-900/50 p-8 sm:p-12 md:grid-cols-[1fr_auto] md:items-end"
          >
            <LatticeHover />
            <div>
              <p className="eyebrow">A month of its own</p>
              <h2 className="mt-4 font-display text-display-sm transition-colors duration-700 group-hover:text-brass-300">Travelling during Ramadan</h2>
              <p className="mt-3 max-w-xl text-ivory-300">What changes, what is beautiful about it, and how we plan around it.</p>
            </div>
            <span className="link-quiet text-xs tracking-[0.28em] uppercase">Read more →</span>
          </Link>
        </LatticeFrame>
      </Reveal>

      {regions.map((region) => (
        <section key={region.id} aria-labelledby={`grace-${region.id}`} className="mt-24">
          <LatticeRule className="mb-12" />
          <h2 id={`grace-${region.id}`} className="text-display-md">
            {region.name}
          </h2>
          <ul className="mt-10 grid ps-px pt-px sm:grid-cols-2 lg:grid-cols-3">
            {countriesInRegion(region.id).map((c) => (
              <li key={c.code} className="-ms-px -mt-px border border-midnight-800">
                <Link href={href(`/travelling-with-grace/${c.slug}`)} className="lattice-host group block h-full p-7">
                  <LatticeHover />
                  <h3 className="font-display text-2xl transition-colors duration-700 group-hover:text-brass-300">{c.name}</h3>
                  <p className="mt-3 text-sm text-ivory-300">
                    <span className="text-ivory-500">Weekend: </span>
                    {weekendFor[c.code]}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <p className="mt-20 max-w-2xl text-sm text-ivory-500">
        Laws and customs change, and alcohol rules in particular differ widely. Every note here is a guide only: verify before you travel.
        Your concierge will brief you on anything particular to your dates and plans.
      </p>
    </div>
  );
}
