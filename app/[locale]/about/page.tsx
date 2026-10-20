import type { Metadata } from "next";
import { alternates } from "@/lib/seo";
import { notFound } from "next/navigation";
import { isLocale } from "@/config/i18n";
import { brand } from "@/config/brand";
import { concierges } from "@/data/concierges";
import { Photo } from "@/components/ui/Photo";
import { ToConfirm } from "@/components/ui/ToConfirm";
import { Reveal } from "@/components/motion/Reveal";
import { AskButton } from "@/components/ask/AskButton";
import { LatticeHover, LatticeRule, StarMark } from "@/components/motif";

export const metadata: Metadata = {
  alternates: alternates("/about"),
  title: "About",
  description: "Aravia, from “Arabia” and “via”: the way through Arabia. A private travel concierge for the Arab world, and the concierges who make it work.",
};

export default async function About({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      {/* The name, split around an image */}
      <section className="container-page pt-40 pb-24 sm:pt-48" aria-labelledby="about-title">
        <p className="eyebrow">About Aravia</p>
        <h1 id="about-title" className="mt-10 font-display text-[clamp(1.875rem,0.2rem+7.4vw,9rem)] leading-[0.95] tracking-[0.02em]">
          <span className="block">The way</span>
          <span className="my-6 flex items-center gap-6 sm:my-8 sm:gap-10">
            <span aria-hidden className="relative block aspect-[3/2] w-[38%] max-w-md shrink-0 overflow-hidden sm:w-[30%]">
              <Photo name="petraSiqTreasury" sizes="(min-width: 640px) 30vw, 40vw" alt="" />
            </span>
            <em className="text-accent">through</em>
          </span>
          <span className="block text-end">Arabia.</span>
        </h1>
      </section>

      <section className="container-page grid gap-16 pb-28 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="font-display text-display-sm text-ink">{brand.etymology}</p>
        </Reveal>
        <Reveal delay={0.1} className="space-y-6 text-lg text-ink-2 lg:col-span-6 lg:col-start-7">
          <p>
            Aravia began with a simple observation: the Arab world is one of the most rewarding regions on earth to travel, and one of the
            hardest to travel well without someone who knows it.
          </p>
          <p>
            Its hospitality is generous, its distances short by air, its customs quietly particular from one country to the next. The
            right introduction opens doors; the wrong hour closes them. We set out to be the introduction.
          </p>
          <p>
            We are not a tour operator. We do not sell packages, and we never name our clients. Each guest has one concierge, who designs
            the journey and then stays with it, day and night. Our promise is the one on every page:{" "}
            <span className="text-ink">{brand.promise}</span>
          </p>
          <p className="text-sm text-ink-3">
            Founding story and team details are placeholders to be confirmed.
            <ToConfirm />
          </p>
        </Reveal>
      </section>

      <section className="relative h-[60vh] min-h-[22rem] overflow-hidden" aria-hidden>
        <Photo name="dunesWideSun" sizes="100vw" alt="" />
      </section>

      <section className="container-page py-28" aria-labelledby="team-title">
        <div className="max-w-2xl">
          <p className="eyebrow">Our concierges</p>
          <h2 id="team-title" className="mt-6 text-display-md">
            The people you will speak to.
          </h2>
          <p className="mt-6 text-ink-2">
            First names only. Our concierges are as discreet about themselves as they are about you.
          </p>
        </div>
        <ul className="mt-16 grid gap-px bg-line sm:grid-cols-2">
          {concierges.map((c, i) => (
            <Reveal as="li" key={c.id} delay={(i % 2) * 0.1} className="lattice-host grid grid-cols-[5.5rem_1fr] gap-6 bg-paper p-8 sm:grid-cols-[7rem_1fr] sm:p-10">
              <LatticeHover />
              <span aria-hidden className="flex aspect-[4/5] items-center justify-center bg-gradient-to-br from-sand-200 to-rose-200 font-display text-5xl text-accent">
                {c.name.charAt(0)}
              </span>
              <div>
                <h3 className="font-display text-display-sm">
                  {c.name}
                  {c.placeholder && <ToConfirm label="placeholder" />}
                </h3>
                <p className="mt-1 text-xs tracking-[0.16em] font-medium text-accent uppercase">
                  {c.based} · {c.regions}
                </p>
                <p className="mt-5 font-display text-xl leading-snug text-ink italic">“{c.line}”</p>
                <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-2">
                  <StarMark className="h-3 w-3 text-accent" />
                  {c.languages.join(" · ")}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
        <LatticeRule className="my-24" />
        <div className="text-center">
          <p className="mx-auto max-w-xl font-display text-display-sm">One of them will be yours.</p>
          <AskButton source="page" className="btn-primary mt-10">
            Ask Aravia
          </AskButton>
        </div>
      </section>
    </>
  );
}
