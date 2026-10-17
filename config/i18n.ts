/**
 * Locales. Only English is enabled. Arabic (right-to-left), French and German are prepared:
 * add a dictionary in /dictionaries, enable the locale here, and the routes, <html dir> and
 * hreflang tags follow automatically.
 */
export const allLocales = {
  en: { label: "English", dir: "ltr", enabled: true, hreflang: "en" },
  ar: { label: "العربية", dir: "rtl", enabled: false, hreflang: "ar" },
  fr: { label: "Français", dir: "ltr", enabled: false, hreflang: "fr" },
  de: { label: "Deutsch", dir: "ltr", enabled: false, hreflang: "de" },
} as const;

export type Locale = keyof typeof allLocales;
export const defaultLocale: Locale = "en";

export const locales = (Object.keys(allLocales) as Locale[]).filter((l) => allLocales[l].enabled);

export function isLocale(value: string): value is Locale {
  return (locales as string[]).includes(value);
}

export function dirFor(locale: Locale) {
  return allLocales[locale].dir;
}
