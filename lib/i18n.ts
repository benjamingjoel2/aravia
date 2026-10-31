import "server-only";
import type { Locale } from "@/config/i18n";
import { en, type Dictionary } from "@/dictionaries/en";

/**
 * UI strings. dictionaries/en.ts is the source; in the French, German and Spanish builds it is the translated
 * copy written by scripts/i18n-build.mjs, so every locale reads the same module.
 */
export function getDictionary(_locale?: Locale): Dictionary {
  return en;
}
