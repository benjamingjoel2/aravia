import type { Metadata } from "next";
import { defaultLocale, locales, allLocales } from "@/config/i18n";
import { site } from "@/config/site";

/**
 * Canonical and hreflang links for a locale-relative path.
 * While English is the only enabled locale the canonical is the English URL; once more locales are enabled,
 * pass the page's own locale.
 */
export function alternates(path: string, locale: string = defaultLocale): Metadata["alternates"] {
  const p = path === "/" ? "" : path;
  return {
    canonical: `/${locale}${p}`,
    languages: {
      ...Object.fromEntries(locales.map((l) => [allLocales[l].hreflang, `/${l}${p}`])),
      "x-default": `/${defaultLocale}${p}`,
    },
  };
}

export const absoluteUrl = (path: string) => new URL(path, site.url).toString();
