import type { Metadata } from "next";
import { defaultLocale, locales, allLocales } from "@/config/i18n";
import { locale as currentLocale } from "@/config/locale";
import { site } from "@/config/site";

/** Canonical (this page in this language) and hreflang links (every language, x-default English) for a locale-relative path. */
export function alternates(path: string, locale: string = currentLocale): Metadata["alternates"] {
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
