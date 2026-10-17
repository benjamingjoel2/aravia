import { countries } from "@/data/countries";
import { destinationDetails } from "@/data/destination-details";
import type { PhotoKey } from "@/data/photos";
import type { CountryCode, Destination } from "@/data/types";
import { destinationsIn } from "@/data/destinations";

export const countryBySlug = (slug: string) => countries.find((c) => c.slug === slug);

/** The photograph for a destination, and whether it only illustrates similar landscape. */
export function destinationPhoto(d: Destination): { photo?: PhotoKey; illustrative: boolean } {
  const detail = destinationDetails[d.slug];
  if (detail?.photo) return { photo: detail.photo, illustrative: false };
  if (detail?.mood) return { photo: detail.mood, illustrative: true };
  return { illustrative: false };
}

/** A country's hero: its first destination with a true photograph, otherwise the first illustrative one. */
export function countryPhoto(code: CountryCode) {
  const list = destinationsIn(code).map(destinationPhoto);
  return list.find((p) => p.photo && !p.illustrative) ?? list.find((p) => p.photo) ?? { illustrative: false };
}
