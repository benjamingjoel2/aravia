import type { Month, SeasonEvent } from "@/data/types";

/** Months covered by an event window, wrapping over the new year (e.g. October to March). */
export function windowMonths(e: Pick<SeasonEvent, "window">): Month[] {
  const out: Month[] = [];
  let m = e.window.start;
  for (;;) {
    out.push(m);
    if (m === e.window.end) break;
    m = ((m % 12) + 1) as Month;
  }
  return out;
}

/** Events whose usual window overlaps the next `span` months starting from `from`, soonest first. */
export function upcomingEvents(events: SeasonEvent[], from: Month, span = 3): SeasonEvent[] {
  const ahead = (m: Month) => (m - from + 12) % 12;
  return events
    .filter((e) => windowMonths(e).some((m) => ahead(m) < span))
    .sort((a, b) => {
      const sa = Math.min(...windowMonths(a).map(ahead));
      const sb = Math.min(...windowMonths(b).map(ahead));
      return sa - sb || ahead(a.window.start) - ahead(b.window.start);
    });
}
