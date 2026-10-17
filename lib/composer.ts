import { legs, places, type PlaceId } from "@/data/composer";
import type { ComposerLeg } from "@/data/types";

export const placeById = Object.fromEntries(places.map((p) => [p.id, p])) as Record<PlaceId, (typeof places)[number]>;

/** The known leg between two places in either direction, if one is listed. */
export function findLeg(a: PlaceId, b: PlaceId): ComposerLeg | undefined {
  return legs.find((l) => (l.from === a && l.to === b) || (l.from === b && l.to === a));
}

/** "1 h 10 min", "45 min", "6 h 30 min" */
export function formatDuration(minutes: number) {
  const rounded = Math.round(minutes / 5) * 5;
  const h = Math.floor(rounded / 60);
  const m = rounded % 60;
  if (!h) return `${m} min`;
  return m ? `${h} h ${m} min` : `${h} h`;
}
