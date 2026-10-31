import type { Metadata } from "next";
import { alternates } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/config/i18n";
import { localePath } from "@/lib/paths";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/motion/Reveal";
import { ToConfirm } from "@/components/ui/ToConfirm";
import { AskButton } from "@/components/ask/AskButton";
import { LatticeFrame, LatticeRule, StarMark } from "@/components/motif";
import type { PhotoKey } from "@/data/photos";

export const metadata: Metadata = {
  alternates: alternates("/how-it-works"),
  title: "How it works",
  description: "Meet your concierge, design your journey, and travel with someone always on call. How Aravia works, from the first message to the flight home.",
};

const faqs: { q: string; a: string }[] = [
  { q: "Do you sell packages or tours?", a: "No. Every journey is designed for you by your concierge, and nothing is booked until you have agreed to it." },
  { q: "Why are there no prices on the site?", a: "Because every journey is different. Your concierge will share costs with each proposal, before anything is confirmed." },
  { q: "Which countries do you cover?", a: "Eleven across the Arab world: Saudi Arabia, the United Arab Emirates, Qatar, Kuwait, Bahrain and Oman in the Gulf; Jordan in the Levant; Egypt, Morocco, Tunisia and Algeria in North Africa." },
  { q: "How do I reach my concierge while travelling?", a: "However you prefer: a call or email. Your concierge is one message away, at any hour." },
  { q: "Can you guarantee access to events or private visits?", a: "We request access on your behalf and confirm only what has been confirmed to us. If something cannot be arranged, we will say so, and suggest what can." },
  { q: "Will you ever share who I am?", a: "Never. We do not name our clients or publish their photographs, and we sign non-disclosure agreements on request." },
];

const chapters: { n: string; title: string; lede: string; points: (string | { text: string; confirm: true })[]; photo: PhotoKey }[] = [
  {
    n: "01", title: "Meet your concierge", photo: "sandRipplesClose",
    lede: "Your first message reaches a person, who will stay with you for the whole journey and every one after it.",
    points: [
      "One concierge, who speaks your language and comes to know how you like to travel.",
      "A first conversation, by phone or by email, at whatever pace suits you.",
      "No forms, no packages, no obligation.",
    ],
  },
  {
    n: "02", title: "Design your journey", photo: "petraTreasury",
    lede: "Together you shape the journey: the places, the pace, the rooms, the tables, the quiet hours.",
    points: [
      "A proposal written for you, refined until it feels right.",
      "Every booking made, checked and confirmed by your concierge.",
      "Notes on custom and etiquette for each country, before you leave.",
    ],
  },
  {
    n: "03", title: "Travel with someone always on call", photo: "seaNightStars",
    lede: "Once you arrive, your concierge is one message away. At any hour.",
    points: [
      "Changes made as you go: a new table, a later flight, a different villa.",
      { text: "A local team on the ground in every country we arrange.", confirm: true },
      "Requests large and small, from a jet by morning to an extra pillow tonight.",
    ],
  },
];

export default async function HowItWorks({ params }: PageProps<"/[locale]/how-it-works">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="One person, from the first message to the flight home."
        photo="desertDuskHorizon"
        intro="We are not a tour operator and we do not sell packages. You have a concierge, who designs the journey with you and then stays with it, day and night."
      />
      {chapters.map((c, i) => (
        <section key={c.n} aria-labelledby={`step-${c.n}`} className="container-page grid items-center gap-12 py-20 lg:grid-cols-12 lg:py-28">
          <Reveal className={`lg:col-span-5 ${i % 2 ? "lg:order-2 lg:col-start-8" : ""}`}>
            <LatticeFrame inset="0.75rem">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Photo name={c.photo} sizes="(min-width: 1024px) 40vw, 100vw" />
              </div>
            </LatticeFrame>
          </Reveal>
          <Reveal delay={0.1} className={`lg:col-span-6 ${i % 2 ? "lg:order-1" : "lg:col-start-7"}`}>
            <p className="font-display text-display-md text-accent">{c.n}</p>
            <h2 id={`step-${c.n}`} className="mt-4 text-display-md">
              {c.title}
            </h2>
            <p className="mt-6 text-lg text-ink-2">{c.lede}</p>
            <ul className="mt-8 space-y-4">
              {c.points.map((p) => {
                const text = typeof p === "string" ? p : p.text;
                return (
                  <li key={text} className="flex gap-4 text-ink">
                    <StarMark className="mt-1.5 h-3 w-3 shrink-0 text-accent" />
                    <span>
                      {text}
                      {typeof p !== "string" && <ToConfirm />}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </section>
      ))}
      <section className="container-page grid gap-12 pt-12 pb-24 lg:grid-cols-12" aria-labelledby="faq-title">
        <div className="lg:col-span-4">
          <p className="eyebrow">Questions</p>
          <h2 id="faq-title" className="mt-6 text-display-md">
            What guests <em className="text-accent">ask first.</em>
          </h2>
        </div>
        <div className="border-t border-line-strong lg:col-span-8">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-line-strong">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-2xl transition-colors duration-500 hover:text-accent [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden className="shrink-0 text-accent transition-transform duration-500 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="max-w-2xl pb-7 text-ink-2">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="container-page pb-32 text-center">
        <LatticeRule className="mb-20" />
        <h2 className="mx-auto max-w-2xl text-display-md">
          Begin with a single message. <em className="text-accent">We will take it from there.</em>
        </h2>
        <div className="mt-12 flex flex-col items-center gap-8">
          <AskButton source="page">Ask Aravia</AskButton>
          <Link href={localePath(locale, "/discretion")} className="link-quiet text-xs tracking-[0.16em] font-medium uppercase">
            How we keep your privacy
          </Link>
        </div>
      </section>
    </>
  );
}
