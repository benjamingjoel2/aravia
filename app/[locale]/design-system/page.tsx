import type { Metadata } from "next";
import { LatticeFrame, LatticeHover, LatticeRule, Logo, StarMark } from "@/components/motif";
import { Reveal } from "@/components/motion/Reveal";
import { ToConfirm } from "@/components/ui/ToConfirm";
import { AskButton } from "@/components/ask/AskButton";

export const metadata: Metadata = { title: "Design system", robots: { index: false, follow: false } };

const swatches = [
  ["paper", "bg-paper", "Page"],
  ["paper-2", "bg-paper-2", "Surface"],
  ["line", "bg-line", "Hairline"],
  ["ink", "bg-ink", "Text"],
  ["ink-2", "bg-ink-2", "Text, secondary"],
  ["accent", "bg-accent", "Accent text"],
  ["midnight-900", "bg-midnight-900", "Deep block, footer"],
  ["rose-900", "bg-rose-900", "Petra rose block"],
  ["sand-200", "bg-sand-200", "Sand block"],
  ["rose-200", "bg-rose-200", "Rose, light"],
  ["brass-400", "bg-brass-400", "Brass detail"],
  ["cream", "bg-cream", "Text on photographs"],
] as const;

export default function DesignSystem() {
  return (
    <div className="container-page pt-36 pb-32">
      <p className="eyebrow">Internal · not indexed</p>
      <h1 className="mt-6 text-display-lg">Design system</h1>
      <LatticeRule className="mt-12" />

      <section className="mt-20" aria-labelledby="ds-palette">
        <h2 id="ds-palette" className="eyebrow">Palette</h2>
        <ul className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-6">
          {swatches.map(([name, cls, use]) => (
            <li key={name}>
              <div className={`aspect-[4/3] rounded-lg border border-line ${cls}`} />
              <p className="mt-3 text-sm text-ink">{use}</p>
              <p className="text-xs text-ink-3">{name}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-24" aria-labelledby="ds-type">
        <h2 id="ds-type" className="eyebrow">Typography</h2>
        <div className="mt-8 space-y-6">
          <p className="font-display text-display-xl">Ask, and consider it arranged.</p>
          <p className="font-display text-display-lg">Petra at first light</p>
          <p className="font-display text-display-md">Your concierge is one message away.</p>
          <p className="font-display text-display-sm italic text-accent">At any hour.</p>
          <p className="prose-aravia">
            Some doors in this region open only with an introduction. We make introductions. Body text is set in Inter Tight at
            seventeen pixels, with generous leading and a measure of no more than sixty-eight characters.
          </p>
          <p className="eyebrow">Eyebrow · spaced capitals</p>
        </div>
      </section>

      <section className="mt-24" aria-labelledby="ds-motif">
        <h2 id="ds-motif" className="eyebrow">Mashrabiya motif</h2>
        <div className="mt-8 space-y-12">
          <LatticeRule />
          <LatticeRule variant="strip" />
          <div className="flex items-center gap-10 text-accent">
            <StarMark className="h-10 w-10" />
            <StarMark className="h-5 w-5" />
            <Logo />
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {["Frame", "Hover me", "Focus me"].map((t) => (
              <LatticeFrame key={t}>
                <a href="#ds-motif" className="lattice-host block aspect-[4/5] border border-line bg-paper-2 p-8">
                  <LatticeHover />
                  <span className="font-display text-2xl">{t}</span>
                </a>
              </LatticeFrame>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-24" aria-labelledby="ds-actions">
        <h2 id="ds-actions" className="eyebrow">Actions</h2>
        <div className="mt-8 flex flex-wrap items-center gap-8">
          <AskButton source="page">Ask Aravia</AskButton>
          <AskButton source="page" prefill="Petra at first light" className="btn-secondary">
            Pre-filled request
          </AskButton>
          <a href="#ds-actions" className="link-quiet">
            A quiet text link
          </a>
          <span>
            Private openings after hours
            <ToConfirm />
          </span>
        </div>
      </section>

      <section className="mt-24" aria-labelledby="ds-motion">
        <h2 id="ds-motion" className="eyebrow">Motion</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {[0, 0.15, 0.3].map((d) => (
            <Reveal key={d} delay={d} className="border border-line p-8 text-ink-2">
              Slow fade, delay {d}s
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
