import type { Locale } from "@/config/i18n";

/** Prefix a locale-relative path with the locale segment. */
export function localePath(locale: Locale, path: string) {
  return `/${locale}${path === "/" ? "" : path}`;
}
