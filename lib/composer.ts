import { entryNotes, legs, places, routes, type PlaceId, type Route } from "@/data/composer";
import type { ComposerLeg, CountryCode, EntryNote, LegMode, Month } from "@/data/types";

export type Place = (typeof places)[number];

export const placeById = Object.fromEntries(places.map((p) => [p.id, p])) as Record<PlaceId, Place>;

export function isPlaceId(value: string): value is PlaceId {
  return value in placeById;
}

/** The known leg between two places in either direction, if one is listed. */
export function findLeg(a: PlaceId, b: PlaceId): ComposerLeg | undefined {
  return legs.find((l) => (l.from === a && l.to === b) || (l.from === b && l.to === a));
}

/** Great-circle distance in kilometres. */
function distanceKm(a: Place, b: Place) {
  const rad = Math.PI / 180;
  const dLat = (b.lat - a.lat) * rad;
  const dLng = (b.lng - a.lng) * rad;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLng / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

export type ResolvedLeg = { from: PlaceId; to: PlaceId; approxMinutes: number; mode: LegMode; note?: string; estimated: boolean };

/** A listed leg, or an estimate from distance when none is listed: by road under 250 km, otherwise by air. */
export function resolveLeg(from: PlaceId, to: PlaceId): ResolvedLeg {
  const known = findLeg(from, to);
  if (known) return { from, to, approxMinutes: known.approxMinutes, mode: known.mode, note: known.note, estimated: false };
  const km = distanceKm(placeById[from], placeById[to]);
  const note = "Estimated from distance; connections vary";
  if (km < 250) return { from, to, approxMinutes: (km / 75) * 60, mode: "drive", note, estimated: true };
  return { from, to, approxMinutes: (km / 750) * 60 + 30, mode: "flight", note, estimated: true };
}

function permutations<T>(items: T[]): T[][] {
  if (items.length <= 1) return [items];
  return items.flatMap((item, i) => permutations([...items.slice(0, i), ...items.slice(i + 1)]).map((rest) => [item, ...rest]));
}

const sameSet = (a: readonly string[], b: readonly string[]) => a.length === b.length && a.every((x) => b.includes(x));

export type ComposedJourney = {
  order: PlaceId[];
  legs: ResolvedLeg[];
  /** Suggested nights per place, as a range. */
  nights: [number, number][];
  totalNights: [number, number];
  /** Months that suit every place, or an empty list when they differ. */
  sharedMonths: Month[];
  entry: EntryNote[];
  /** The curated route this selection matches, when there is one. */
  curated?: Route;
};

/**
 * Suggest an order for two to four places. A curated route wins when it covers exactly the same places;
 * otherwise every order is tried and the one with the least time travelling is chosen.
 */
export function composeJourney(selection: PlaceId[]): ComposedJourney {
  const curated = routes.find((r) => sameSet(r.places, selection));
  let order: PlaceId[];
  if (curated) {
    order = curated.places;
  } else {
    // Estimates ignore connections and road transfers, so weigh them more heavily than listed legs.
    // A small distance term favours journeys that flow across the map rather than doubling back.
    const cost = (a: PlaceId, b: PlaceId) => {
      const leg = resolveLeg(a, b);
      return (leg.estimated ? leg.approxMinutes * 1.5 : leg.approxMinutes) + distanceKm(placeById[a], placeById[b]) / 20;
    };
    const totalMinutes = (o: PlaceId[]) => o.slice(1).reduce((sum, id, i) => sum + cost(o[i], id), 0);
    order = permutations(selection).reduce((best, o) => (totalMinutes(o) < totalMinutes(best) ? o : best));
  }

  const nights: [number, number][] = order.map((id, i) =>
    curated ? [curated.nights[i], curated.nights[i]] : [placeById[id].idealNights[0], placeById[id].idealNights[1]],
  );
  const totalNights = nights.reduce<[number, number]>((t, n) => [t[0] + n[0], t[1] + n[1]], [0, 0]);

  const sharedMonths = ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as Month[]).filter((m) =>
    order.every((id) => (placeById[id].bestMonths as readonly Month[]).includes(m)),
  );

  const countries: CountryCode[] = [];
  for (const id of order) if (!countries.includes(placeById[id].country)) countries.push(placeById[id].country);
  const entry = countries.map((c) => entryNotes.find((n) => n.country === c)).filter((n): n is EntryNote => Boolean(n));

  return {
    order,
    legs: order.slice(1).map((id, i) => resolveLeg(order[i], id)),
    nights,
    totalNights,
    sharedMonths,
    entry,
    curated,
  };
}

export const legModeLabel: Record<LegMode, string> = {
  flight: "By air",
  private: "Private flight",
  drive: "By road",
  "flight+drive": "By air and road",
  boat: "By sea",
};

/** "1 h 10 min", "45 min", "6 h 30 min" */
export function formatDuration(minutes: number) {
  const rounded = Math.max(5, Math.round(minutes / 5) * 5);
  const h = Math.floor(rounded / 60);
  const m = rounded % 60;
  if (!h) return `${m} min`;
  return m ? `${h} h ${m} min` : `${h} h`;
}

export const formatNights = ([a, b]: [number, number]) => (a === b ? `${a} ${a === 1 ? "night" : "nights"}` : `${a}–${b} nights`);
