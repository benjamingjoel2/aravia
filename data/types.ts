/**
 * Shared content types. All site content lives in typed /data files.
 * Strings are plain English for now; see /config/i18n.ts for how other locales are added.
 */

export type RegionId = "gulf" | "levant" | "north-africa";

export type CountryCode =
  // The Gulf
  | "SA" | "AE" | "QA" | "KW" | "BH" | "OM"
  // The Levant
  | "JO"
  // North Africa
  | "EG" | "MA" | "TN" | "DZ";

export type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/** A statement that must be checked before launch or each year. Rendered with a "verify" / "to confirm" marker. */
export type Verify = { verify: true };

export interface Region {
  id: RegionId;
  name: string;
  intro: string;
  countries: CountryCode[];
}

export interface Country {
  code: CountryCode;
  slug: string;
  name: string;
  region: RegionId;
  intro: string;
}

export interface Destination {
  slug: string;
  country: CountryCode;
  name: string;
  /** One or two evocative sentences. Fuller page copy is added in step 5. */
  summary: string;
  bestMonths: Month[];
  /** Pre-fills Ask Aravia on the destination page. */
  askPrompt: string;
}

export type EventType = "motorsport" | "art-culture" | "music" | "sport" | "festival";

export interface SeasonEvent extends Verify {
  slug: string;
  name: string;
  type: EventType;
  country: CountryCode;
  /** Destination slug, when the event belongs to one. */
  destination?: string;
  /** Typical window. Exact dates change every year. */
  window: { start: Month; end: Month };
  /** Human description of the usual timing, e.g. "Usually late November or early December". */
  timing: string;
  description: string;
  /** Ask Aravia pre-fill. Never promises tickets. */
  askPrompt: string;
}

export interface ComposerPlace {
  id: string;
  name: string;
  country: CountryCode;
  /** Usual gateway airport (IATA). */
  gateway: string;
  lat: number;
  lng: number;
  idealNights: [min: number, max: number];
  bestMonths: Month[];
  /** Destination page this place links to. */
  destination: string;
}

export type LegMode = "flight" | "private" | "drive" | "flight+drive" | "boat";

export interface ComposerLeg extends Verify {
  from: string;
  to: string;
  /** Door-to-door is longer; this is time in the air or on the road. */
  approxMinutes: number;
  mode: LegMode;
  note?: string;
}

export interface ComposerRoute extends Verify {
  slug: string;
  title: string;
  /** Place ids, in the suggested order. */
  places: string[];
  /** Suggested nights per place, same order as `places`. */
  nights: number[];
  season: string;
  note: string;
}

export interface EntryNote extends Verify {
  country: CountryCode;
  summary: string;
  /** Extra caution, e.g. travel advisories for remote areas. */
  caution?: string;
}

export interface EtiquetteGuide extends Verify {
  country: CountryCode;
  intro: string;
  dress: string[];
  weekend: string;
  alcohol: string[];
  photography: string[];
  greetings: string[];
  tipping: string[];
}
