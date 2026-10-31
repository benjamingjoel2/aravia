import type { Metadata } from "next";
import { alternates } from "@/lib/seo";
import { localePath } from "@/lib/paths";
import { services } from "@/data/services";
import { PageHero } from "@/components/ui/PageHero";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { ToConfirm } from "@/components/ui/ToConfirm";
import { Reveal } from "@/components/motion/Reveal";
import { AskButton } from "@/components/ask/AskButton";
import { LatticeRule } from "@/components/motif";
import { locale } from "@/config/locale";

export const metadata: Metadata = {
  alternates: alternates("/services"),
  title: "What we arrange",
  description:
    "Private aviation, villas, yachts, desert camps, restaurant reservations, access to events, guides and more, across the Arab world. Arranged by your personal concierge.",
};

export default async function ServicesPage() {

  return (
    <>
      <PageHero
        eyebrow="What we arrange"
        title="Whatever the journey asks for."
        photo="duneEveningShadow"
        intro="If it can be arranged, your concierge arranges it. If it cannot, we will say so, and suggest what can. These are the things we are asked for most."
      />
      <section className="container-page pb-32">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={(i % 3) * 0.08}>
              <PhotoCard href={localePath(locale, `/services/${s.slug}`)} title={s.name} photo={s.photo}>
                {s.summary}
                {s.confirm && <ToConfirm />}
              </PhotoCard>
            </Reveal>
          ))}
        </ul>
        <LatticeRule className="my-24" />
        <div className="text-center">
          <p className="mx-auto max-w-xl font-display text-display-sm">Something not on this list?</p>
          <AskButton source="service" className="btn-primary mt-10">
            Ask Aravia
          </AskButton>
        </div>
      </section>
    </>
  );
}
