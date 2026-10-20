import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { alternates } from "@/lib/seo";
import { site } from "@/config/site";
import { brand } from "@/config/brand";
import { isLocale } from "@/config/i18n";
import { localePath } from "@/lib/paths";
import { regionNav } from "@/lib/nav";
import { countriesInRegion, regions } from "@/data/countries";
import { places } from "@/data/composer";
import { concierges } from "@/data/concierges";
import { coveredPaths, mapSize, neighbourPaths } from "@/data/map";
import { whatsappLink } from "@/lib/whatsapp";
import { JsonLd } from "@/components/ui/JsonLd";
import { Photo } from "@/components/ui/Photo";
import { GiantWordmark } from "@/components/home/GiantWordmark";
import { HorizontalScroller } from "@/components/home/HorizontalScroller";
import { ToConfirm } from "@/components/ui/ToConfirm";

export const metadata: Metadata = { alternates: alternates("/") };

const arrangeList = ["Private aviation", "Villas, palaces and suites", "Yachts", "Desert camps and dinners", "Events and private openings", "Guides and archaeologists"];

/** Sylver's link: words, a short rule beneath the first letters, an arrow. A faint wordmark sits behind it. */
function PanelLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <div className="relative mt-10 inline-block">
      <span aria-hidden className="pointer-events-none absolute -top-3 -start-6 font-display text-[1.75rem] tracking-[0.18em] text-ink/10 select-none">
        {brand.wordmark}
      </span>
      <Link href={href} className="link-mark relative text-[1.125rem] text-ink">
        {children} <span aria-hidden className="arrow">→</span>
      </Link>
    </div>
  );
}

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const href = (p: string) => localePath(locale, p);
  const regionLinks = regionNav(locale);

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

      <HorizontalScroller>
        {/* 1. Hero: the photograph melting into taupe, the name across the top, the promise at the foot */}
        <section
          data-hero-photo
          aria-labelledby="hero-title"
          className="on-dark relative shrink-0 bg-taupe text-cream lg:h-full lg:w-screen"
        >
          <div aria-hidden className="relative h-[78svh] min-h-[30rem] lg:absolute lg:inset-y-0 lg:start-0 lg:h-auto lg:w-[64%]">
            <Photo name="dunesDuskSun" sizes="(min-width: 1024px) 64vw, 100vw" preload alt="" className="object-[30%_50%]" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent lg:hidden" />
            <div className="absolute inset-y-0 end-0 hidden w-1/2 bg-gradient-to-r from-transparent via-taupe/60 to-taupe lg:block rtl:bg-gradient-to-l" />
          </div>

          <div aria-hidden className="absolute top-6 start-[var(--gutter)] z-10 hidden w-[19vw] lg:block">
            <GiantWordmark />
          </div>

          <h1
            id="hero-title"
            className="rise absolute start-[var(--gutter)] top-[max(78svh,30rem)] z-20 -translate-y-full pb-8 font-display text-[clamp(2.5rem,1rem+6vw,3.75rem)] leading-[1] tracking-[0.04em] uppercase lg:top-auto lg:start-[60%] lg:bottom-[9svh] lg:translate-y-0 lg:pb-0 lg:text-[5.4vw] lg:whitespace-nowrap"
          >
            Ask.
            <br />
            Consider it
            <br className="lg:hidden" /> arranged.
          </h1>

          <div className="relative z-10 px-[var(--gutter)] pt-10 pb-14 lg:absolute lg:top-[34%] lg:start-[60%] lg:w-[25vw] lg:p-0">
            <p className="max-w-md text-[1.0625rem] leading-relaxed lg:text-[1rem]">
              Aravia is a private travel concierge for the Arab world. One personal concierge designs your journey across the Gulf, the
              Levant and North Africa, then stays with you, day and night, for anything you need.
            </p>
            <Link href={href("/about")} className="link-mark mt-8 text-[1.125rem]">
              About <span aria-hidden className="arrow">→</span>
            </Link>
          </div>
        </section>

        {/* 2. A full-height photograph */}
        <div aria-hidden className="relative hidden shrink-0 lg:block lg:h-full lg:w-[30vw]">
          <Photo name="petraSiqTreasury" sizes="30vw" alt="" />
        </div>

        {/* 3. What we arrange */}
        <section aria-labelledby="arrange-title" className="relative shrink-0 bg-paper lg:h-full lg:w-[84vw]">
          <div className="px-[var(--gutter)] pt-24 pb-16 lg:absolute lg:inset-0 lg:p-0">
            <h2
              id="arrange-title"
              className="text-[clamp(2.25rem,1.2rem+4.4vw,3.5rem)] tracking-[0.06em] lg:absolute lg:top-[19%] lg:start-[8vw] lg:text-[5.2vw] lg:whitespace-nowrap"
            >
              What we arrange
            </h2>
            <div className="mt-10 max-w-md lg:absolute lg:top-[34%] lg:start-[8vw] lg:mt-0 lg:w-[24vw]">
              <ul className="space-y-1 text-[0.9375rem]">
                {arrangeList.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <p className="mt-10 text-[0.9375rem] leading-relaxed lg:mt-[6vh]">
                Travel at this level is made of details. A jet that waits, a villa opened for you alone, a table on the dunes at the hour the
                light turns. Your concierge arranges each one, and the people behind it.
              </p>
              <p className="mt-4 text-[0.9375rem] leading-relaxed">
                From the first flight to the last transfer, everything is designed around how you like to travel, refined until it feels
                right, and looked after while you are away.
              </p>
              <PanelLink href={href("/services")}>What we arrange</PanelLink>
            </div>
            <div className="mt-14 grid grid-cols-2 gap-4 lg:absolute lg:end-[12vw] lg:bottom-0 lg:mt-0 lg:flex lg:items-end lg:gap-5">
              <div className="relative aspect-[4/5] lg:aspect-auto lg:h-[44svh] lg:w-[14vw]">
                <Photo name="yachtAerial" sizes="(min-width: 1024px) 14vw, 50vw" />
              </div>
              <div className="relative aspect-[4/5] lg:aspect-auto lg:h-[32svh] lg:w-[14vw] lg:-translate-y-[12svh]">
                <Photo name="dubaiBurjAlArab" sizes="(min-width: 1024px) 14vw, 50vw" />
              </div>
            </div>
          </div>
        </section>

        {/* 4. Where we take you */}
        <section aria-labelledby="where-title" className="relative shrink-0 bg-paper lg:h-full lg:w-[84vw]">
          <div className="px-[var(--gutter)] pt-10 pb-20 lg:absolute lg:inset-0 lg:p-0">
            <div className="grid grid-cols-2 gap-4 lg:absolute lg:top-0 lg:start-0 lg:flex lg:items-start lg:gap-5">
              <div className="relative aspect-[4/5] lg:aspect-auto lg:h-[48svh] lg:w-[20vw]">
                <Photo name="petraTreasury" sizes="(min-width: 1024px) 20vw, 50vw" />
              </div>
              <div className="relative aspect-[4/5] lg:mt-[21svh] lg:aspect-auto lg:h-[27svh] lg:w-[15vw]">
                <Photo name="minaretsSunset" sizes="(min-width: 1024px) 15vw, 50vw" />
              </div>
            </div>
            <h2
              id="where-title"
              className="mt-16 text-[clamp(2.25rem,1.2rem+4.4vw,3.5rem)] tracking-[0.06em] lg:absolute lg:top-[19%] lg:start-[40vw] lg:mt-0 lg:text-[5.2vw] lg:whitespace-nowrap"
            >
              Where we take you
            </h2>
            <div className="mt-10 max-w-md lg:absolute lg:top-[34%] lg:start-[42vw] lg:mt-0 lg:w-[24vw]">
              <ul className="space-y-1 text-[0.9375rem]">
                {regionLinks.map((r) => (
                  <li key={r.id}>
                    <Link href={r.href} className="link-quiet">
                      {r.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-10 text-[0.9375rem] leading-relaxed lg:mt-[6vh]">
                Eleven countries, from the Gulf to the Atlantic. The valleys of AlUla and the fjords of Musandam, the rose-red city of Petra,
                the Nile, the medinas of Fez and Marrakech, and the edge of the Sahara.
              </p>
              <p className="mt-4 text-[0.9375rem] leading-relaxed">
                Your concierge knows each of them first hand, and travels them often, so the journey follows the season, the light and the
                pace you prefer.
              </p>
              <PanelLink href={href("/destinations")}>Where we take you</PanelLink>
            </div>
          </div>
        </section>

        {/* 5. A narrow photograph, then the house: contacts, the map and the places strip */}
        <div aria-hidden className="relative hidden shrink-0 lg:block lg:h-full lg:w-[22vw]">
          <Photo name="duneEveningShadow" sizes="22vw" alt="" />
        </div>

        <section aria-labelledby="house-title" className="relative flex shrink-0 flex-col bg-paper lg:h-full lg:w-[78vw]">
          <div className="relative flex-1">
            <svg
              aria-hidden
              viewBox={`0 0 ${mapSize.width} ${mapSize.height}`}
              className="pointer-events-none mx-auto mt-6 block w-full max-w-xl px-[var(--gutter)] lg:absolute lg:inset-y-0 lg:end-0 lg:mt-0 lg:h-full lg:w-[62%] lg:max-w-none lg:px-0"
              preserveAspectRatio="xMidYMid meet"
            >
              <path d={neighbourPaths} fill="none" stroke="var(--color-line)" strokeWidth="1" />
              <path d={Object.values(coveredPaths).join("")} fill="var(--color-ink)" stroke="var(--color-paper)" strokeWidth="1.25" />
            </svg>

            <div className="relative px-[var(--gutter)] pt-10 pb-14 lg:absolute lg:top-[14%] lg:start-[5vw] lg:w-[30vw] lg:p-0">
              <h2 id="house-title" className="text-[1.75rem] tracking-[0.12em]">
                {brand.name}
              </h2>
              <p className="mt-3 text-[0.9375rem]">
                <a href={`mailto:${brand.contact.email}`} className="link-quiet">
                  {brand.contact.emailDisplay}
                </a>
              </p>
              <p className="mt-1 text-[0.9375rem]">
                <a href={whatsappLink()} rel="noopener" className="link-quiet">
                  WhatsApp · {brand.contact.whatsappDisplay}
                </a>
              </p>

              <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-[0.9375rem]">
                {concierges.map((c) => (
                  <li key={c.id}>
                    {c.name}
                    <span className="block text-ink-3">
                      {c.based} · {c.languages.slice(0, 2).join(", ")}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs">
                <ToConfirm />
              </p>

              <h3 className="mt-10 text-[1.25rem] tracking-[0.12em] uppercase">
                Always on call <span className="font-sans text-[0.875rem] tracking-normal normal-case">(day and night)</span>
              </h3>
              <p className="mt-2 text-[0.9375rem]">From the first message to the flight home, one person, one message away.</p>
              <Link href={href("/contact")} className="link-mark mt-4 text-[0.9375rem] text-ink">
                Contact <span aria-hidden className="arrow">→</span>
              </Link>
            </div>
          </div>

          {/* The places strip, with the name set large and cut by the foot of the page */}
          <div aria-hidden className="on-dark relative h-44 shrink-0 overflow-hidden bg-ink text-cream lg:h-[26svh]">
            <div className="marquee flex w-max gap-14 pt-8 font-display text-[1.375rem] tracking-[0.12em] whitespace-nowrap uppercase opacity-90">
              {[0, 1].map((copy) => (
                <div key={copy} className="flex gap-14">
                  {places.map((p) => (
                    <span key={p.id}>{p.name}</span>
                  ))}
                </div>
              ))}
            </div>
            <div className="absolute inset-x-[var(--gutter)] -bottom-[4%] text-cream/20 lg:-bottom-[18%]">
              <GiantWordmark />
            </div>
          </div>
        </section>
      </HorizontalScroller>
    </>
  );
}
