import type { Locale } from "./i18n";

/**
 * The language this copy of the site renders in. English is the source; scripts/i18n-build.mjs writes a
 * copy of the code for each other language (in .i18n/<locale>/) where this constant is that language.
 */
export const locale: Locale = "en";
