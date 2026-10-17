import type { Metadata } from "next";
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
  title: "How it works",
  description: "Meet your concierge, design your journey, and travel with someone always on call. How Aravia works, from the first message to the flight home.",
};

const chapters: { n: string; title: string; lede: string; points: (string | { text: string; confirm: true })[]; photo: PhotoKey }[] = [
  {
    n: "01", title: "Meet your concierge", photo: "sandRipplesClose",
    lede: "Your first message reaches a person, who will stay with you for the whole journey and every one after it.",
    points: [
      "One concierge, who speaks your language and comes to know how you like to travel.",
      "A first conversation, on WhatsApp, by phone or by email, at whatever pace suits you.",
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
            <p className="font-display text-display-md text-brass-400">{c.n}</p>
            <h2 id={`step-${c.n}`} className="mt-4 text-display-md">
              {c.title}
            </h2>
            <p className="mt-6 text-lg text-ivory-300">{c.lede}</p>
            <ul className="mt-8 space-y-4">
              {c.points.map((p) => {
                const text = typeof p === "string" ? p : p.text;
                return (
                  <li key={text} className="flex gap-4 text-ivory-50">
                    <StarMark className="mt-1.5 h-3 w-3 shrink-0 text-brass-400" />
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
      <section className="container-page pb-32 text-center">
        <LatticeRule className="mb-20" />
        <h2 className="mx-auto max-w-2xl text-display-md">
          Begin with a single message. <em className="text-sand-300">We will take it from there.</em>
        </h2>
        <div className="mt-12 flex flex-col items-center gap-8">
          <AskButton source="page">Ask Aravia</AskButton>
          <Link href={localePath(locale, "/discretion")} className="link-quiet text-xs tracking-[0.28em] uppercase">
            How we keep your privacy
          </Link>
        </div>
      </section>
    </>
  );
}
