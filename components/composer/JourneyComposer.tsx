"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo } from "react";
import { useUrlState } from "@/lib/use-url-state";
import { places, routes, type PlaceId } from "@/data/composer";
import { countriesInRegion, countryByCode, regions } from "@/data/countries";
import { composeJourney, formatDuration, formatNights, isPlaceId, legModeLabel, placeById } from "@/lib/composer";
import { monthRanges } from "@/lib/months";
import { useAsk } from "@/components/ask/AskContext";
import { LatticeFrame, LatticeRule, StarMark } from "@/components/motif";

const MAX = 4;

function readSelection(params: URLSearchParams): PlaceId[] {
  const raw = params.get("places");
  if (!raw) return [];
  const ids = raw.split(",").filter(isPlaceId);
  return [...new Set(ids)].slice(0, MAX);
}

function writeSelection(ids: PlaceId[]) {
  return new URLSearchParams(ids.length ? { places: ids.join(",") } : {});
}

export function JourneyComposer() {
  const reduce = useReducedMotion();
  const { openAsk } = useAsk();
  const [selection, setSelection] = useUrlState<PlaceId[]>(readSelection, writeSelection, []);
  const journey = useMemo(() => (selection.length >= 2 ? composeJourney(selection) : null), [selection]);

  function toggle(id: PlaceId) {
    if (selection.includes(id)) setSelection(selection.filter((s) => s !== id));
    else if (selection.length < MAX) setSelection([...selection, id]);
  }

  function refine() {
    if (!journey) return;
    const route = journey.order.map((id) => placeById[id].name).join(" → ");
    const [a, b] = journey.totalNights;
    const nights = a === b ? `${a} nights` : `${a} to ${b} nights`;
    openAsk({ prefill: `${route}, about ${nights}. `, source: "composer", refId: journey.order.join(","), startAt: "compose" });
  }

  return (
    <div className="grid gap-16 lg:grid-cols-12">
      {/* Picker */}
      <div className="lg:col-span-6">
        <div className="flex items-baseline justify-between gap-6">
          <h2 className="eyebrow">Choose two to four places</h2>
          <p className="text-xs text-ink-3" aria-live="polite">
            {selection.length} of {MAX} chosen
            {selection.length > 0 && (
              <>
                {" · "}
                <button type="button" onClick={() => setSelection([])} className="link-quiet text-ink-2">
                  Clear
                </button>
              </>
            )}
          </p>
        </div>

        <div className="mt-8 space-y-10">
          {regions.map((region) => (
            <fieldset key={region.id}>
              <legend className="font-display text-2xl text-ink">{region.name}</legend>
              <div className="mt-4 space-y-4">
                {countriesInRegion(region.id).map((country) => {
                  const inCountry = places.filter((p) => p.country === country.code);
                  if (!inCountry.length) return null;
                  return (
                    <div key={country.code} className="grid gap-2 sm:grid-cols-[9rem_1fr] sm:items-baseline">
                      <p className="text-xs tracking-[0.16em] font-medium text-accent uppercase">{country.name}</p>
                      <div className="flex flex-wrap gap-2">
                        {inCountry.map((p) => {
                          const on = selection.includes(p.id);
                          const full = !on && selection.length >= MAX;
                          return (
                            <button
                              key={p.id}
                              type="button"
                              aria-pressed={on}
                              disabled={full}
                              onClick={() => toggle(p.id)}
                              className="chip !min-h-10 !py-1.5 disabled:cursor-not-allowed disabled:opacity-35"
                            >
                              {on && <span className="me-2 text-[0.625rem] text-accent">{selection.indexOf(p.id) + 1}</span>}
                              {p.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>

        <LatticeRule className="my-14" />

        <h2 className="eyebrow">Or begin with a journey we know well</h2>
        <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">
          {routes.map((r) => (
            <li key={r.slug}>
              <button
                type="button"
                onClick={() => setSelection(r.places)}
                className="group flex w-full items-baseline justify-between gap-4 border-b border-line py-3 text-start"
              >
                <span className="font-display text-lg text-ink transition-colors duration-700 group-hover:text-accent">{r.title}</span>
                <span className="shrink-0 text-xs text-ink-3">{r.places.length} places</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Result */}
      <div className="lg:col-span-6">
        <div className="lg:sticky lg:top-28">
          <LatticeFrame inset="1rem">
            <section aria-labelledby="journey-title" aria-live="polite" className="min-h-[24rem] border border-line-strong bg-paper-2 p-7 sm:p-10">
              <AnimatePresence mode="wait" initial={false}>
                {!journey ? (
                  <motion.div
                    key="empty"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex min-h-[20rem] flex-col items-center justify-center text-center"
                  >
                    <StarMark className="h-8 w-8 text-accent/70" />
                    <h2 id="journey-title" className="mt-6 font-display text-display-sm">
                      Your journey
                    </h2>
                    <p className="mt-3 max-w-xs text-ink-2">
                      {selection.length === 1
                        ? `${placeById[selection[0]].name}, and where next?`
                        : "Choose at least two places to see a suggested order, the time between them and when to go."}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={journey.order.join()}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="eyebrow">{journey.curated ? journey.curated.title : "A suggested order"}</p>
                    <h2 id="journey-title" className="mt-4 font-display text-display-sm">
                      {formatNights(journey.totalNights)}
                    </h2>
                    {journey.curated && <p className="mt-3 text-ink-2">{journey.curated.note}</p>}

                    <ol className="mt-10">
                      {journey.order.map((id, i) => {
                        const place = placeById[id];
                        const leg = journey.legs[i];
                        return (
                          <li key={id} className="relative ps-10">
                            <StarMark className="absolute start-0 top-1.5 h-4 w-4 text-accent" />
                            {leg && <span aria-hidden className="absolute start-[7.5px] top-7 bottom-0 w-px bg-line-strong" />}
                            <div className="flex items-baseline justify-between gap-4">
                              <h3 className="font-display text-2xl">{place.name}</h3>
                              <span className="text-sm whitespace-nowrap text-ink-2">{formatNights(journey.nights[i])}</span>
                            </div>
                            <p className="text-xs text-ink-3">
                              {countryByCode[place.country].name} · Best: {monthRanges(place.bestMonths)}
                            </p>
                            {leg && (
                              <p className="py-6 text-sm text-accent">
                                {legModeLabel[leg.mode]}, about {formatDuration(leg.approxMinutes)}
                                {leg.estimated && <span className="text-ink-3"> (estimate)</span>}
                                {leg.note && <span className="block text-ink-3">{leg.note}</span>}
                              </p>
                            )}
                          </li>
                        );
                      })}
                    </ol>

                    <dl className="mt-10 grid gap-6 border-t border-line pt-8 text-sm">
                      <div>
                        <dt className="field-label">Best season</dt>
                        <dd className="mt-2 text-ink">
                          {journey.curated
                            ? journey.curated.season
                            : journey.sharedMonths.length
                              ? monthRanges(journey.sharedMonths)
                              : "These places are at their best in different months. Your concierge will find the balance."}
                        </dd>
                      </div>
                      <div>
                        <dt className="field-label">Entry</dt>
                        <dd className="mt-2 space-y-3 text-ink-2">
                          {journey.entry.map((n) => (
                            <p key={n.country}>
                              <span className="text-ink">{countryByCode[n.country].name}.</span> {n.summary}
                              {n.caution && <span className="mt-1 block text-rose-600">{n.caution}</span>}
                            </p>
                          ))}
                          <p className="text-xs tracking-[0.16em] text-ink-3 uppercase">
                            Guidance only, verify. Rules depend on your passport and change often.
                          </p>
                        </dd>
                      </div>
                    </dl>

                    <p className="mt-8 text-xs text-ink-3">Times are approximate time in the air or on the road, not door to door. Verify.</p>

                    <button type="button" onClick={refine} className="btn-primary mt-10 w-full sm:w-auto" aria-haspopup="dialog">
                      Have your concierge refine this
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          </LatticeFrame>
        </div>
      </div>
    </div>
  );
}
