import Link from "next/link";
import { notFound } from "next/navigation";
import { brand } from "@/config/brand";
import { isLocale } from "@/config/i18n";
import { getDictionary } from "@/lib/i18n";
import { localePath } from "@/lib/paths";
import { countriesInRegion, countryByCode, regions } from "@/data/countries";
import { destinationsIn } from "@/data/destinations";
import { events } from "@/data/events";
import { routes } from "@/data/composer";
import { services } from "@/data/services";
import { testimonials } from "@/data/testimonials";
import { upcomingEvents } from "@/lib/season";
import { findLeg, formatDuration, placeById } from "@/lib/composer";
import { monthName } from "@/lib/months";
import type { Month } from "@/data/types";
import { DuneNight } from "@/components/home/DuneNight";
import { HeroAsk } from "@/components/home/HeroAsk";
import { AskButton } from "@/components/ask/AskButton";
import { LatticeFrame, LatticeHover, LatticeRule, StarMark } from "@/components/motif";
import { Reveal } from "@/components/motion/Reveal";
import { ToConfirm } from "@/components/ui/ToConfirm";

/** The Season teaser depends on the current month. */
export const revalidate = 86400;

const steps = [
  { title: "Meet your concierge", body: "One person, who speaks your language and comes to know how you like to travel." },
  { title: "Design your journey", body: "Countries, places and pace, shaped around you and refined until it feels right." },
  { title: "Travel with someone always on call", body: "Day and night, one message away, for the small things and the large." },
];

const featuredRoute = routes.find((r) => r.slug === "dubai-alula-petra")!;

function Eyebrow({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${center ? "justify-center" : ""}`}>
      <StarMark className="h-3 w-3 text-brass-400" />
      {children}
    </p>
  );
}

function MoreLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="link-quiet inline-flex items-center gap-3 text-xs tracking-[0.28em] uppercase">
      {children}
      <span aria-hidden className="rtl:rotate-180">
        →
      </span>
    </Link>
  );
}

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const href = (p: string) => localePath(locale, p);

  const month = (new Date().getMonth() + 1) as Month;
  const soon = upcomingEvents(events, month, 3).slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-28" aria-labelledby="hero-title">
        <DuneNight />
        <div className="container-page relative">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal>
              <p className="eyebrow">
                <span className="block sm:inline">Private travel concierge</span>
                <span aria-hidden className="hidden sm:inline"> · </span>
                <span className="mt-2 block sm:mt-0 sm:inline">The Arab world</span>
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <h1 id="hero-title" className="mt-8 text-display-xl">
                {brand.promise}
              </h1>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mx-auto mt-8 max-w-2xl text-lg text-ivory-300">
                One personal concierge designs your journey across the Gulf, the Levant and North Africa, then stays with you, day and
                night, for anything you need.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.45} className="mx-auto mt-14 max-w-3xl">
            <HeroAsk labels={dict.ask} askPath={href("/ask")} />
          </Reveal>
        </div>
      </section>

      {/* Statement and how it works */}
      <section className="section" aria-labelledby="how-title">
        <div className="container-page">
          <Reveal>
            <p className="max-w-4xl font-display text-display-md leading-[1.2] text-ivory-50">
              We are not a tour operator, and we do not sell packages. Each guest has one concierge, who designs the journey and then
              stays with it: <span className="text-sand-300">a jet, a villa, a table, a desert camp for two, a yacht by morning.</span>
            </p>
          </Reveal>
          <LatticeRule className="my-20" />
          <h2 id="how-title" className="sr-only">
            How it works
          </h2>
          <ol className="grid gap-14 md:grid-cols-3 md:gap-10">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.12}>
                <span className="font-display text-display-sm text-brass-400">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-display text-2xl">{s.title}</h3>
                <p className="mt-3 text-ivory-300">{s.body}</p>
              </Reveal>
            ))}
          </ol>
          <div className="mt-14">
            <MoreLink href={href("/how-it-works")}>How it works</MoreLink>
          </div>
        </div>
      </section>

      {/* What we arrange */}
      <section className="section border-t border-midnight-800 bg-midnight-900/40" aria-labelledby="arrange-title">
        <div className="container-page grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow>What we arrange</Eyebrow>
            <h2 id="arrange-title" className="mt-6 text-display-md">
              Whatever the journey asks for.
            </h2>
            <p className="mt-6 text-ivory-300">If it can be arranged, your concierge arranges it. If it cannot, we will say so, and suggest what can.</p>
            <div className="mt-10">
              <MoreLink href={href("/services")}>Everything we arrange</MoreLink>
            </div>
          </Reveal>
          <ul className="grid sm:grid-cols-2 lg:col-span-8">
            {services.map((s) => (
              <li key={s.slug} className="lattice-host -mt-px border-t border-b border-midnight-800 py-6 sm:odd:pe-8 sm:even:ps-8">
                <LatticeHover />
                <Link href={href(`/services/${s.slug}`)} className="group block">
                  <h3 className="font-display text-2xl transition-colors duration-700 group-hover:text-brass-300">
                    {s.name}
                    {s.confirm && <ToConfirm />}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] text-ivory-300">{s.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Where we take you */}
      <section className="section" aria-labelledby="where-title">
        <div className="container-page">
          <Reveal className="max-w-3xl">
            <Eyebrow>Where we take you</Eyebrow>
            <h2 id="where-title" className="mt-6 text-display-md">
              Eleven countries, from the Gulf to the Atlantic.
            </h2>
          </Reveal>
          <ul className="mt-16 grid gap-6 md:grid-cols-3">
            {regions.map((r, i) => (
              <Reveal as="li" key={r.id} delay={i * 0.12}>
                <LatticeFrame className="h-full">
                  <Link href={href(`/destinations#${r.id}`)} className="lattice-host group block h-full border border-midnight-800 p-8 sm:p-10">
                    <LatticeHover />
                    <h3 className="font-display text-display-sm transition-colors duration-700 group-hover:text-brass-300">{r.name}</h3>
                    <p className="mt-4 text-ivory-300">{r.intro}</p>
                    <ul className="mt-8 space-y-1.5 text-sm text-sand-300">
                      {countriesInRegion(r.id).map((c) => (
                        <li key={c.code} className="flex items-baseline justify-between gap-4">
                          <span>{c.name}</span>
                          <span className="text-xs text-ivory-500">{destinationsIn(c.code).length}</span>
                        </li>
                      ))}
                    </ul>
                  </Link>
                </LatticeFrame>
              </Reveal>
            ))}
          </ul>
          <div className="mt-12">
            <MoreLink href={href("/destinations")}>All destinations</MoreLink>
          </div>
        </div>
      </section>

      {/* The Season */}
      <section className="section border-t border-midnight-800" aria-labelledby="season-title">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <Reveal className="max-w-2xl">
              <Eyebrow>The Season</Eyebrow>
              <h2 id="season-title" className="mt-6 text-display-md">
                In the coming months.
              </h2>
              <p className="mt-6 text-ivory-300">
                Races, fairs and festivals across the region. We request access on your behalf; we never promise tickets.
              </p>
            </Reveal>
            <MoreLink href={href("/season")}>The full Season</MoreLink>
          </div>
          <ul className="mt-14 grid gap-px border border-midnight-800 bg-midnight-800 sm:grid-cols-2 lg:grid-cols-4">
            {soon.map((e, i) => (
              <Reveal as="li" key={e.slug} delay={i * 0.08} className="flex flex-col bg-midnight-950 p-7">
                <p className="text-xs tracking-[0.2em] text-brass-400 uppercase">
                  {e.window.start === e.window.end
                    ? monthName(e.window.start)
                    : `${monthName(e.window.start, "short")} – ${monthName(e.window.end, "short")}`}
                  <span className="text-ivory-500"> · {countryByCode[e.country].name}</span>
                </p>
                <h3 className="mt-4 font-display text-2xl leading-tight">{e.name}</h3>
                <p className="mt-3 flex-1 text-sm text-ivory-300">{e.timing}.</p>
                <p className="mt-2 text-[0.6875rem] tracking-[0.16em] text-ivory-500 uppercase">Dates vary · verify yearly</p>
                <AskButton source="season" refId={e.slug} prefill={e.askPrompt} startAt="channel" className="link-quiet mt-6 self-start text-xs tracking-[0.28em] uppercase">
                  Request access
                </AskButton>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Journey Composer */}
      <section className="section bg-midnight-900/40" aria-labelledby="composer-title">
        <div className="container-page grid items-center gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow>Journey Composer</Eyebrow>
            <h2 id="composer-title" className="mt-6 text-display-md">
              Many of our guests combine countries.
            </h2>
            <p className="mt-6 text-ivory-300">
              Choose two to four places and see a suggested order, the time between them, how long to stay and when to go. Then let your
              concierge refine it.
            </p>
            <div className="mt-10">
              <MoreLink href={href("/journey-composer")}>Compose a journey</MoreLink>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-7">
            <LatticeFrame inset="1rem">
              <div className="border border-midnight-700 p-8 sm:p-12">
                <p className="eyebrow">{featuredRoute.title}</p>
                <ol className="mt-10">
                  {featuredRoute.places.map((id, i) => {
                    const place = placeById[id];
                    const next = featuredRoute.places[i + 1];
                    const leg = next ? findLeg(id, next) : undefined;
                    return (
                      <li key={id} className="relative ps-10">
                        <StarMark className="absolute start-0 top-1.5 h-4 w-4 text-brass-400" />
                        {next && <span aria-hidden className="absolute start-[7.5px] top-7 bottom-0 w-px bg-midnight-600" />}
                        <div className="flex items-baseline justify-between gap-4">
                          <h3 className="font-display text-2xl">{place.name}</h3>
                          <span className="text-sm whitespace-nowrap text-ivory-300">
                            {featuredRoute.nights[i]} {featuredRoute.nights[i] === 1 ? "night" : "nights"}
                          </span>
                        </div>
                        <p className="text-xs text-ivory-500">{countryByCode[place.country].name}</p>
                        {leg && (
                          <p className="py-6 text-sm text-sand-300">
                            About {formatDuration(leg.approxMinutes)}
                            {leg.note && <span className="text-ivory-500"> · {leg.note}</span>}
                          </p>
                        )}
                      </li>
                    );
                  })}
                </ol>
                <p className="mt-8 border-t border-midnight-800 pt-6 text-xs text-ivory-500">
                  Best season: {featuredRoute.season}. Times approximate; guidance only, verify.
                </p>
              </div>
            </LatticeFrame>
          </Reveal>
        </div>
      </section>

      {/* Discretion */}
      <section className="section" aria-labelledby="discretion-title">
        <div className="container-page text-center">
          <Reveal>
            <Eyebrow center>Discretion, by design</Eyebrow>
            <h2 id="discretion-title" className="mx-auto mt-8 max-w-3xl text-display-md">
              We never name our clients. They prefer it that way, and so do we.
            </h2>
          </Reveal>
          <ul className="mx-auto mt-16 grid max-w-5xl gap-10 text-ivory-300 md:grid-cols-3">
            {[
              "No client names, and no client photographs, ever.",
              "Non-disclosure agreements, on request.",
              "Your enquiry is seen only by your concierge.",
            ].map((t, i) => (
              <Reveal as="li" key={t} delay={i * 0.1} className="border-t border-midnight-700 pt-6">
                {t}
              </Reveal>
            ))}
          </ul>
          <div className="mt-14">
            <MoreLink href={href("/discretion")}>Our privacy promise</MoreLink>
          </div>
        </div>
      </section>

      {/* Words from guests */}
      <section className="section border-t border-midnight-800" aria-labelledby="words-title">
        <div className="container-page">
          <Reveal>
            <Eyebrow>In their words</Eyebrow>
            <h2 id="words-title" className="sr-only">
              From our guests
            </h2>
          </Reveal>
          <ul className="mt-14 grid gap-x-16 gap-y-14 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <Reveal as="li" key={t.attribution} delay={(i % 2) * 0.12}>
                <figure>
                  <blockquote className="font-display text-[1.625rem] leading-snug text-ivory-50">“{t.quote}”</blockquote>
                  <figcaption className="mt-5 text-xs tracking-[0.2em] text-sand-300 uppercase">
                    {t.attribution}
                    {t.placeholder && <ToConfirm label="placeholder" />}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Closing */}
      <section className="relative overflow-hidden py-40" aria-labelledby="closing-title">
        <div aria-hidden className="lattice-field absolute inset-0 text-brass-400 opacity-[0.07]" />
        <div className="container-page relative text-center">
          <Reveal>
            <h2 id="closing-title" className="mx-auto max-w-3xl text-display-lg">
              Your concierge is one message away. At any hour.
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="mt-12">
            <AskButton source="page">{dict.ask.cta}</AskButton>
          </Reveal>
        </div>
      </section>
    </>
  );
}
