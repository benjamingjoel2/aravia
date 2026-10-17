"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useUrlState } from "@/lib/use-url-state";
import type { CountryCode, EventType, Month, RegionId, SeasonEvent } from "@/data/types";
import { countryByCode, regions } from "@/data/countries";
import { eventTypes } from "@/data/events";
import { monthName } from "@/lib/months";
import { windowMonths } from "@/lib/season";
import { AskButton } from "@/components/ask/AskButton";
import { LatticeHover } from "@/components/motif";

/** The season runs autumn to spring, so the calendar opens in October. */
const SEASON_ORDER: Month[] = [10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9];

type Filters = { region?: RegionId; country?: CountryCode; type?: EventType };

function parseFilters(params: URLSearchParams): Filters {
  const country = params.get("country");
  return {
    region: regions.find((r) => r.id === params.get("region"))?.id,
    country: country && country in countryByCode ? (country as CountryCode) : undefined,
    type: eventTypes.find((t) => t.id === params.get("type"))?.id,
  };
}

function serializeFilters(f: Filters) {
  const qs = new URLSearchParams();
  if (f.region) qs.set("region", f.region);
  if (f.country) qs.set("country", f.country);
  if (f.type) qs.set("type", f.type);
  return qs;
}

function MonthStrip({ event }: { event: SeasonEvent }) {
  const on = new Set(windowMonths(event));
  return (
    <div aria-hidden className="flex gap-[3px]">
      {SEASON_ORDER.map((m) => (
        <span key={m} title={monthName(m)} className={`h-1 flex-1 ${on.has(m) ? "bg-brass-400" : "bg-midnight-700"}`} />
      ))}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" aria-pressed={active} onClick={onClick} className="chip !min-h-10 !py-1.5">
      {children}
    </button>
  );
}

export function SeasonCalendar({ events }: { events: SeasonEvent[] }) {
  const reduce = useReducedMotion();
  const [filters, update] = useUrlState<Filters>(parseFilters, serializeFilters, {});

  const visibleCountries = filters.region ? regions.find((r) => r.id === filters.region)!.countries : regions.flatMap((r) => r.countries);

  const filtered = events.filter(
    (e) =>
      (!filters.region || countryByCode[e.country].region === filters.region) &&
      (!filters.country || e.country === filters.country) &&
      (!filters.type || e.type === filters.type),
  );

  const byMonth = SEASON_ORDER.map((m) => ({ month: m, items: filtered.filter((e) => e.window.start === m) })).filter((g) => g.items.length);
  const typeName = Object.fromEntries(eventTypes.map((t) => [t.id, t.label])) as Record<EventType, string>;
  const anyFilter = Boolean(filters.region || filters.country || filters.type);

  return (
    <div>
      {/* Filters */}
      <div className="grid gap-6 border-y border-midnight-800 py-8">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Region">
          <span className="field-label w-full sm:me-3 sm:w-20">Region</span>
          <Chip active={!filters.region} onClick={() => update({ ...filters, region: undefined, country: undefined })}>
            All
          </Chip>
          {regions.map((r) => (
            <Chip key={r.id} active={filters.region === r.id} onClick={() => update({ ...filters, region: r.id, country: undefined })}>
              {r.name}
            </Chip>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Country">
          <span className="field-label w-full sm:me-3 sm:w-20">Country</span>
          <Chip active={!filters.country} onClick={() => update({ ...filters, country: undefined })}>
            All
          </Chip>
          {visibleCountries.map((c) => (
            <Chip key={c} active={filters.country === c} onClick={() => update({ ...filters, country: c })}>
              {countryByCode[c].name}
            </Chip>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Type">
          <span className="field-label w-full sm:me-3 sm:w-20">Type</span>
          <Chip active={!filters.type} onClick={() => update({ ...filters, type: undefined })}>
            All
          </Chip>
          {eventTypes.map((t) => (
            <Chip key={t.id} active={filters.type === t.id} onClick={() => update({ ...filters, type: t.id })}>
              {t.name}
            </Chip>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-ivory-500" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "event" : "events"}
        {anyFilter && (
          <>
            {" · "}
            <button type="button" onClick={() => update({})} className="link-quiet text-ivory-300">
              Show everything
            </button>
          </>
        )}
      </p>

      {/* Timeline */}
      <div className="mt-12">
        {byMonth.length === 0 && (
          <div className="border border-midnight-800 p-10 text-center">
            <p className="font-display text-2xl">Nothing listed for this selection.</p>
            <p className="mt-3 text-ivory-300">The season is wider than this page. Ask, and we will tell you what is on.</p>
            <AskButton source="season" className="btn-quiet mt-8">
              Ask Aravia
            </AskButton>
          </div>
        )}
        <AnimatePresence initial={false}>
          {byMonth.map((group) => (
            <motion.section
              key={group.month}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.6 }}
              aria-labelledby={`month-${group.month}`}
              className="grid gap-6 border-t border-midnight-800 py-12 lg:grid-cols-12"
            >
              <h2 id={`month-${group.month}`} className="font-display text-display-sm text-sand-300 lg:col-span-3 lg:sticky lg:top-28 lg:self-start">
                {monthName(group.month)}
              </h2>
              <ul className="grid gap-px bg-midnight-800 sm:grid-cols-2 lg:col-span-9">
                {group.items.map((e) => (
                  <li key={e.slug} className="lattice-host flex flex-col bg-midnight-950 p-7">
                    <LatticeHover />
                    <p className="text-xs tracking-[0.2em] text-brass-400 uppercase">
                      {typeName[e.type]}
                      <span className="text-ivory-500"> · {countryByCode[e.country].name}</span>
                    </p>
                    <h3 className="mt-4 font-display text-2xl leading-tight">{e.name}</h3>
                    <p className="mt-3 text-[0.9375rem] text-ivory-300">{e.description}</p>
                    <p className="mt-4 flex-1 text-sm text-sand-300">{e.timing}.</p>
                    <div className="mt-6">
                      <MonthStrip event={e} />
                      <p className="mt-2 text-[0.6875rem] tracking-[0.16em] text-ivory-500 uppercase">Dates vary · verify yearly</p>
                    </div>
                    <AskButton
                      source="season"
                      refId={e.slug}
                      prefill={e.askPrompt}
                      startAt="channel"
                      className="link-quiet mt-6 self-start text-xs tracking-[0.28em] uppercase"
                    >
                      Request access
                    </AskButton>
                  </li>
                ))}
                {group.items.length % 2 === 1 && <li aria-hidden className="hidden bg-midnight-950 sm:block" />}
              </ul>
            </motion.section>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
