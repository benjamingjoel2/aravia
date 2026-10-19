import type { Metadata } from "next";
import Link from "next/link";
import { alternates } from "@/lib/seo";
import { site } from "@/config/site";
import { JsonLd } from "@/components/ui/JsonLd";
import { notFound } from "next/navigation";
import { brand } from "@/config/brand";
import { isLocale } from "@/config/i18n";
import { getDictionary } from "@/lib/i18n";
import { localePath } from "@/lib/paths";
import { countriesInRegion, countryByCode, regions } from "@/data/countries";
import { events } from "@/data/events";
import { routes } from "@/data/composer";
import { services } from "@/data/services";
import { testimonials } from "@/data/testimonials";
import { upcomingEvents } from "@/lib/season";
import { findLeg, formatDuration, placeById } from "@/lib/composer";
import type { Month } from "@/data/types";
import { RegionPanels } from "@/components/home/RegionPanels";
import { GiantWordmark } from "@/components/home/GiantWordmark";
import { StickySteps } from "@/components/home/StickySteps";
import { OfferingRows } from "@/components/home/OfferingRows";
import { SeasonCarousel } from "@/components/home/SeasonCarousel";
import { Parallax } from "@/components/motion/Parallax";
import { Photo } from "@/components/ui/Photo";
import type { PhotoKey } from "@/data/photos";
import type { RegionId } from "@/data/types";
import { HeroAsk } from "@/components/home/HeroAsk";
import { AskButton } from "@/components/ask/AskButton";
import { LatticeFrame, StarMark } from "@/components/motif";
import { Reveal } from "@/components/motion/Reveal";
import { ToConfirm } from "@/components/ui/ToConfirm";

export const metadata: Metadata = { alternates: alternates("/") };

/** The Season teaser depends on the current month. */
export const revalidate = 86400;

const steps = [
  { title: "Meet your concierge", body: "One person, who speaks your language and comes to know how you like to travel." },
  { title: "Design your journey", body: "Countries, places and pace, shaped around you and refined until it feels right." },
  { title: "Travel with someone always on call", body: "Day and night, one message away, for the small things and the large." },
];

const regionPhoto: Record<RegionId, PhotoKey> = { gulf: "dubaiBurjAlArab", levant: "petraSiqTreasury", "north-africa": "duneRipplesGold" };

/** Six offerings for the homepage; the full list lives on /services. */
const featuredServices = ["private-aviation", "villas-palaces-suites", "yachts", "desert-camps", "events-access", "heritage"].map(
  (slug) => services.find((s) => s.slug === slug)!,
);

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
    <Link href={href} className="link-quiet inline-flex items-center gap-3 text-xs tracking-[0.16em] font-medium uppercase">
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
  const soon = upcomingEvents(events, month, 4).slice(0, 8);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TravelAgency",
          name: brand.name,
          slogan: brand.promise,
          description: brand.description,
          url: `${site.url}/${locale}`,
          email: brand.contact.email,
          areaServed: regions.flatMap((r) => countriesInRegion(r.id).map((c) => ({ "@type": "Country", name: c.name }))),
        }}
      />
      {/* Hero: the promise and the request field, the name set edge to edge below */}
      <section data-hero-photo className="on-dark relative flex min-h-[100svh] flex-col overflow-hidden text-cream" aria-labelledby="hero-title">
        <div aria-hidden className="absolute inset-0">
          <Parallax className="h-full" distance={50}>
            <div className="relative h-full w-full">
              <Photo name="dunesDuskSun" sizes="100vw" preload alt="" />
            </div>
          </Parallax>
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/45 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
        </div>

        <div className="container-page relative flex flex-1 flex-col justify-center pt-32 pb-10">
          <div className="mx-auto max-w-4xl text-center">
            <h1 id="hero-title" className="rise text-display-xl">
              Ask, and consider it <em className="text-sand-300">arranged.</em>
            </h1>
            <p className="rise mx-auto mt-8 max-w-2xl text-lg text-cream/90" style={{ animationDelay: "0.15s" }}>
              One personal concierge designs your journey across the Arab world, then stays with you, day and night, for anything you
              need.
            </p>
          </div>
          <div className="rise mx-auto mt-12 w-full max-w-3xl" style={{ animationDelay: "0.3s" }}>
            <HeroAsk labels={dict.ask} askPath={href("/ask")} />
          </div>
        </div>

        <div className="container-page relative pb-4 sm:pb-6">
          <div className="rise flex justify-between gap-6 text-[0.6875rem] font-medium tracking-[0.16em] text-cream/85 uppercase sm:text-xs" style={{ animationDelay: "0.45s" }}>
            <p>Private travel concierge</p>
            <p className="text-end">
              <span className="hidden sm:inline">The Gulf · The Levant · North Africa</span>
              <span className="sm:hidden">The Arab world</span>
            </p>
          </div>
          <GiantWordmark className="rise mt-3 text-cream" />
        </div>
      </section>

      {/* Statement */}
      <section className="section" aria-labelledby="statement-title">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-6">
            <Eyebrow>Aravia</Eyebrow>
            <h2 id="statement-title" className="mt-6 font-display text-[clamp(2.75rem,1.5rem+4.5vw,5.5rem)] leading-[0.95]">
              Not a tour operator. <em className="text-accent">A concierge.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6">
            <p className="text-[clamp(1.25rem,1.05rem+0.7vw,1.75rem)] leading-snug text-ink-2">
              We do not sell packages. Each guest has one concierge, who designs the journey and then stays with it: a jet, a villa, a
              table, a desert camp for two, a yacht by morning.
            </p>
            <div className="mt-8">
              <MoreLink href={href("/how-it-works")}>How it works</MoreLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How it works: steps over a pinned photograph */}
      <StickySteps photo="desertDuskHorizon" steps={steps} label="How it works" />

      {/* What we arrange */}
      <section className="section" aria-labelledby="arrange-title">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <Reveal className="max-w-3xl">
              <Eyebrow>What we arrange</Eyebrow>
              <h2 id="arrange-title" className="mt-6 text-display-md">
                Whatever the journey <em className="text-accent">asks for.</em>
              </h2>
            </Reveal>
            <MoreLink href={href("/services")}>All thirteen services</MoreLink>
          </div>
          <Reveal className="mt-14">
            <OfferingRows items={featuredServices} hrefFor={(slug) => href(`/services/${slug}`)} />
          </Reveal>
        </div>
      </section>

      {/* Where we take you */}
      <section className="section" aria-labelledby="where-title">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <Reveal className="max-w-3xl">
              <Eyebrow>Where we take you</Eyebrow>
              <h2 id="where-title" className="mt-6 text-display-md">
                Eleven countries, from the Gulf <em className="text-accent">to the Atlantic.</em>
              </h2>
            </Reveal>
            <MoreLink href={href("/destinations")}>All destinations</MoreLink>
          </div>
        </div>
        <div className="mt-14 px-2 md:px-[var(--gutter)]">
          <RegionPanels
            regions={regions.map((r) => ({
              id: r.id,
              name: r.name,
              intro: r.intro,
              href: href(`/destinations#${r.id}`),
              photo: regionPhoto[r.id],
              countries: countriesInRegion(r.id).map((c) => c.name),
            }))}
          />
        </div>
      </section>

      {/* The Season */}
      <section className="section border-t border-line" aria-labelledby="season-title">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <Reveal className="max-w-2xl">
              <Eyebrow>The Season</Eyebrow>
              <h2 id="season-title" className="mt-6 text-display-md">
                In the coming <em className="text-accent">months.</em>
              </h2>
              <p className="mt-6 text-ink-2">
                Races, fairs and festivals across the region. We request access on your behalf; we never promise tickets.
              </p>
            </Reveal>
            <MoreLink href={href("/season")}>The full Season</MoreLink>
          </div>
          <div className="mt-14">
            <SeasonCarousel events={soon} label="Events in the coming months" />
          </div>
        </div>
      </section>

      {/* Journey Composer */}
      <section className="section bg-paper-2" aria-labelledby="composer-title">
        <div className="container-page grid items-center gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow>Journey Composer</Eyebrow>
            <h2 id="composer-title" className="mt-6 text-display-md">
              Many of our guests combine countries.
            </h2>
            <p className="mt-6 text-ink-2">
              Choose two to four places and see a suggested order, the time between them, how long to stay and when to go. Then let your
              concierge refine it.
            </p>
            <div className="mt-10">
              <MoreLink href={href("/journey-composer")}>Compose a journey</MoreLink>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-7">
            <LatticeFrame inset="1rem">
              <div className="border border-line-strong p-8 sm:p-12">
                <p className="eyebrow">{featuredRoute.title}</p>
                <ol className="mt-10">
                  {featuredRoute.places.map((id, i) => {
                    const place = placeById[id];
                    const next = featuredRoute.places[i + 1];
                    const leg = next ? findLeg(id, next) : undefined;
                    return (
                      <li key={id} className="relative ps-10">
                        <StarMark className="absolute start-0 top-1.5 h-4 w-4 text-accent" />
                        {next && <span aria-hidden className="absolute start-[7.5px] top-7 bottom-0 w-px bg-line-strong" />}
                        <div className="flex items-baseline justify-between gap-4">
                          <h3 className="font-display text-2xl">{place.name}</h3>
                          <span className="text-sm whitespace-nowrap text-ink-2">
                            {featuredRoute.nights[i]} {featuredRoute.nights[i] === 1 ? "night" : "nights"}
                          </span>
                        </div>
                        <p className="text-xs text-ink-3">{countryByCode[place.country].name}</p>
                        {leg && (
                          <p className="py-6 text-sm text-accent">
                            About {formatDuration(leg.approxMinutes)}
                            {leg.note && <span className="text-ink-3"> · {leg.note}</span>}
                          </p>
                        )}
                      </li>
                    );
                  })}
                </ol>
                <p className="mt-8 border-t border-line pt-6 text-xs text-ink-3">
                  Best season: {featuredRoute.season}. Times approximate; guidance only, verify.
                </p>
              </div>
            </LatticeFrame>
          </Reveal>
        </div>
      </section>

      {/* Discretion: a short manifesto */}
      <section className="on-dark section bg-rose-900 text-cream" aria-labelledby="discretion-title">
        <div className="container-page text-center">
          <Reveal>
            <Eyebrow center>Discretion, by design</Eyebrow>
            <h2 id="discretion-title" className="sr-only">
              Discretion, by design
            </h2>
          </Reveal>
          <ul className="mt-12 font-display text-[clamp(2.25rem,1.2rem+4.2vw,5rem)] leading-[1.02] text-sand-300">
            {["Never named.", "Never photographed.", "Never shared.", "Always on call."].map((t, i) => (
              <Reveal as="li" key={t} delay={i * 0.12} className={i === 3 ? "text-cream italic" : ""}>
                {t}
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.4}>
            <p className="mx-auto mt-14 max-w-xl text-cream/80">
              We never name our clients. They prefer it that way, and so do we. Non-disclosure agreements on request; your enquiry is seen
              only by your concierge.
            </p>
            <div className="mt-10">
              <MoreLink href={href("/discretion")}>Our privacy promise</MoreLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Words from guests */}
      <section className="section bg-sand-200 text-ink" aria-labelledby="words-title">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 !text-rose-800">
              <StarMark className="h-3 w-3" />
              In their words
            </p>
            <h2 id="words-title" className="sr-only">
              From our guests
            </h2>
          </Reveal>
          <ul className="mt-14 grid gap-x-16 gap-y-14 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <Reveal as="li" key={t.attribution} delay={(i % 2) * 0.12}>
                <figure>
                  <blockquote className="font-display text-[2rem] leading-[1.15] text-ink">“{t.quote}”</blockquote>
                  <figcaption className="mt-5 text-[0.6875rem] font-medium tracking-[0.16em] text-ink-2 uppercase">
                    {t.attribution}
                    {t.placeholder && <ToConfirm label="placeholder" onLight />}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Closing */}
      <section className="on-dark relative overflow-hidden py-48 text-cream sm:py-60" aria-labelledby="closing-title">
        <div aria-hidden className="absolute inset-0">
          <Photo name="seaNightStars" sizes="100vw" alt="" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="container-page relative text-center">
          <Reveal>
            <h2 id="closing-title" className="mx-auto max-w-3xl text-display-lg">
              Your concierge is one message away. <em className="text-sand-300">At any hour.</em>
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
