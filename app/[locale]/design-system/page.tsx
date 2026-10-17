import type { Metadata } from "next";
import { LatticeFrame, LatticeHover, LatticeRule, Logo, StarMark } from "@/components/motif";
import { Reveal } from "@/components/motion/Reveal";
import { ToConfirm } from "@/components/ui/ToConfirm";
import { AskButton } from "@/components/ask/AskButton";

export const metadata: Metadata = { title: "Design system", robots: { index: false, follow: false } };

const swatches = [
  ["midnight-950", "bg-midnight-950", "Page"],
  ["midnight-900", "bg-midnight-900", "Surface"],
  ["midnight-800", "bg-midnight-800", "Raised"],
  ["midnight-700", "bg-midnight-700", "Hairline"],
  ["sand-300", "bg-sand-300", "Desert sand"],
  ["sand-500", "bg-sand-500", "Sand, muted"],
  ["rose-400", "bg-rose-400", "Petra rose"],
  ["rose-600", "bg-rose-600", "Rose, deep"],
  ["brass-400", "bg-brass-400", "Brass accent"],
  ["brass-600", "bg-brass-600", "Brass, pressed"],
  ["ivory-50", "bg-ivory-50", "Text"],
  ["ivory-300", "bg-ivory-300", "Text, secondary"],
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
              <div className={`aspect-[4/3] border border-midnight-700 ${cls}`} />
              <p className="mt-3 text-sm text-ivory-50">{use}</p>
              <p className="text-xs text-ivory-500">{name}</p>
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
          <p className="font-display text-display-sm italic text-sand-300">At any hour.</p>
          <p className="prose-aravia">
            Some doors in this region open only with an introduction. We make introductions. Body text is set in Jost Light at
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
          <div className="flex items-center gap-10 text-brass-400">
            <StarMark className="h-10 w-10" />
            <StarMark className="h-5 w-5" />
            <Logo />
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {["Frame", "Hover me", "Focus me"].map((t) => (
              <LatticeFrame key={t}>
                <a href="#ds-motif" className="lattice-host block aspect-[4/5] border border-midnight-800 bg-midnight-900 p-8">
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
          <AskButton source="page" prefill="Petra at first light" className="btn-quiet">
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
            <Reveal key={d} delay={d} className="border border-midnight-800 p-8 text-ivory-300">
              Slow fade, delay {d}s
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
