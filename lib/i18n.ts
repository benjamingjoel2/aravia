import "server-only";
import type { Locale } from "@/config/i18n";
import { en, type Dictionary } from "@/dictionaries/en";

const dictionaries: Record<Locale, Dictionary> = {
  en,
  // Fall back to English until translations exist.
  ar: en,
  fr: en,
  de: en,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
