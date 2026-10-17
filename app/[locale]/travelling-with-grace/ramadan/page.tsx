import type { Metadata } from "next";
import { alternates } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/config/i18n";
import { ramadan } from "@/config/ramadan";
import { localePath } from "@/lib/paths";
import { AskButton } from "@/components/ask/AskButton";
import { LatticeFrame, LatticeRule, StarMark } from "@/components/motif";
import { Reveal } from "@/components/motion/Reveal";
import { ToConfirm } from "@/components/ui/ToConfirm";

export const metadata: Metadata = {
  alternates: alternates("/travelling-with-grace/ramadan"),
  title: "Travelling during Ramadan",
  description:
    "What changes during Ramadan across the Arab world, what is beautiful about it, from iftar to the quiet of the day, and how your Aravia concierge plans around it.",
};

/** Dates shown are recomputed daily so the next Ramadan is always first. */
export const revalidate = 86400;

const fmt = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));

const changes = [
  "Most Muslims fast from dawn until sunset, without food, water or smoking. As a guest, avoid eating, drinking or smoking in public during the day; hotels and many restaurants serve guests discreetly, often behind screens.",
  "Days are quieter and working hours shorter. Museums, sites and shops may open later or close earlier, and many come alive again after sunset.",
  "Alcohol may be served later in the day, more discreetly, or not at all, depending on the country and the venue.",
  "Dress a little more modestly than usual, and keep music and voices low in public during the day.",
  "Evenings are lively and late. Traffic gathers just before sunset as everyone hurries home for iftar.",
  "Eid al-Fitr, which marks the end of the month, is a public holiday of several days. Flights and hotels fill early.",
];

const beautiful = [
  { title: "Iftar", body: "The fast is broken at sunset, often with dates and water, then a meal shared with family and friends. Guests are welcomed at iftar tents and tables across the region." },
  { title: "Suhoor", body: "The meal before dawn, late at night, when cities stay awake and cafés are full." },
  { title: "The atmosphere", body: "Lanterns in the souqs, the call to prayer across a quiet city, a generosity you feel everywhere, and nights that seem to last." },
];

const planning: { text: string; confirm?: true }[] = [
  { text: "We place sightseeing in the cooler, quieter mornings, and the evenings for iftar, the souqs and the city at its most alive." },
  { text: "We confirm opening hours for every site, restaurant and experience during the month, as they change." },
  { text: "We arrange iftar for you, whether in a hotel, a desert camp, or, where it is possible and welcome, with a local family.", confirm: true },
  { text: "We plan around Eid early, so flights, villas and tables are held before the holiday fills them." },
];

export default async function RamadanPage({ params }: PageProps<"/[locale]/travelling-with-grace/ramadan">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = ramadan.filter((r) => r.eidAlFitr >= today);

  return (
    <div className="container-page pt-40 pb-32 sm:pt-48">
      <nav aria-label="Breadcrumb" className="text-xs tracking-[0.2em] text-ivory-500 uppercase">
        <Link href={localePath(locale, "/travelling-with-grace")} className="link-quiet text-ivory-300">
          Travelling with grace
        </Link>
      </nav>

      <header className="mt-8 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h1 className="text-display-lg">Travelling during Ramadan</h1>
          <p className="mt-8 text-lg text-ivory-300">
            Ramadan is the holiest month of the Islamic year, a time of fasting, reflection and generosity. For a guest it is not a time
            to avoid, but a rare chance to see the region at its most heartfelt. A little understanding is all it asks.
          </p>
        </div>
        <aside className="lg:col-span-5" aria-labelledby="dates-title">
          <LatticeFrame inset="0.75rem">
            <div className="border border-midnight-700 p-8">
              <h2 id="dates-title" className="eyebrow">
                Expected dates
              </h2>
              <ul className="mt-6 space-y-6">
                {upcoming.map((r, i) => (
                  <li key={r.year} className={i > 0 ? "border-t border-midnight-800 pt-6" : ""}>
                    <p className="font-display text-2xl">Ramadan {r.year}</p>
                    <p className="mt-1 text-ivory-300">
                      {fmt(r.start)} to {fmt(r.end)}
                    </p>
                    <p className="mt-1 text-sm text-sand-300">Eid al-Fitr from {fmt(r.eidAlFitr)}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs leading-relaxed text-ivory-500">
                Expected, subject to the sighting of the moon, and may differ by a day between countries. Verify yearly.
              </p>
            </div>
          </LatticeFrame>
        </aside>
      </header>

      <LatticeRule className="my-24" />

      <section aria-labelledby="changes-title" className="grid gap-10 lg:grid-cols-12">
        <h2 id="changes-title" className="text-display-md lg:col-span-4">
          What changes
        </h2>
        <ul className="space-y-6 lg:col-span-8">
          {changes.map((c) => (
            <Reveal as="li" key={c} className="flex gap-4 text-ivory-300">
              <StarMark className="mt-2 h-3 w-3 shrink-0 text-brass-400" />
              <span>{c}</span>
            </Reveal>
          ))}
        </ul>
      </section>

      <section aria-labelledby="beautiful-title" className="mt-28">
        <h2 id="beautiful-title" className="text-display-md">
          What is beautiful about it
        </h2>
        <ul className="mt-12 grid gap-10 md:grid-cols-3">
          {beautiful.map((b, i) => (
            <Reveal as="li" key={b.title} delay={i * 0.12} className="border-t border-midnight-700 pt-6">
              <h3 className="font-display text-display-sm text-sand-300">{b.title}</h3>
              <p className="mt-4 text-ivory-300">{b.body}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section aria-labelledby="planning-title" className="mt-28 grid gap-10 lg:grid-cols-12">
        <h2 id="planning-title" className="text-display-md lg:col-span-4">
          How we plan around it
        </h2>
        <ul className="space-y-6 lg:col-span-8">
          {planning.map((p) => (
            <Reveal as="li" key={p.text} className="flex gap-4 text-ivory-300">
              <StarMark className="mt-2 h-3 w-3 shrink-0 text-brass-400" />
              <span>
                {p.text}
                {p.confirm && <ToConfirm />}
              </span>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="mt-32 text-center">
        <p className="mx-auto max-w-2xl font-display text-display-sm">
          Thinking of travelling during Ramadan or Eid? Your concierge will shape the days around it.
        </p>
        <div className="mt-10">
          <AskButton source="page" refId="ramadan" prefill="A journey during Ramadan" className="btn-brass">
            Ask Aravia
          </AskButton>
        </div>
      </section>
    </div>
  );
}
