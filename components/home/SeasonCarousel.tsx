import { countryByCode } from "@/data/countries";
import type { SeasonEvent } from "@/data/types";
import { monthName } from "@/lib/months";
import { AskButton } from "@/components/ask/AskButton";
import { LatticeHover } from "@/components/motif";

/** Events as tall cards in a row that scrolls sideways (native scroll with snapping, keyboard focusable). */
export function SeasonCarousel({ events, label }: { events: SeasonEvent[]; label: string }) {
  return (
    <div
      role="region"
      aria-label={label}
      tabIndex={0}
      className="carousel -mx-[var(--gutter)] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-6 focus-visible:outline-offset-[-2px]"
    >
      {events.map((e) => (
        <article key={e.slug} className="lattice-host relative flex aspect-[4/5] w-[min(78vw,21rem)] shrink-0 snap-start flex-col border border-midnight-700 bg-gradient-to-b from-midnight-900 to-rose-900/50 p-7">
          <LatticeHover />
          <p className="font-display text-display-md leading-none text-sand-300">
            {e.window.start === e.window.end ? monthName(e.window.start) : `${monthName(e.window.start, "short")}–${monthName(e.window.end, "short")}`}
          </p>
          <p className="mt-3 text-xs tracking-[0.2em] text-ivory-500 uppercase">{countryByCode[e.country].name}</p>
          <h3 className="mt-auto font-display text-[1.75rem] leading-tight">{e.name}</h3>
          <p className="mt-3 text-sm text-ivory-300">{e.timing}.</p>
          <p className="mt-2 text-[0.6875rem] tracking-[0.16em] text-ivory-500 uppercase">Dates vary · verify yearly</p>
          <AskButton source="season" refId={e.slug} prefill={e.askPrompt} startAt="channel" className="link-quiet mt-6 self-start text-xs tracking-[0.28em] uppercase">
            Request access
          </AskButton>
        </article>
      ))}
    </div>
  );
}
