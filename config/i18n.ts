// i18n-skip-strings (language names are shown in their own language)
/**
 * Locales. English is the source and lives at /en; French, German and Spanish are generated from it by
 * scripts/i18n-build.mjs (translations in i18n/<locale>.json and i18n/content/<locale>/). Arabic (right to
 * left) is prepared: add it to the build script and translations, enable it here, and the routes, <html dir>
 * and hreflang tags follow.
 */
export const allLocales = {
  en: { label: "English", short: "EN", dir: "ltr", enabled: true, hreflang: "en", og: "en_GB" },
  fr: { label: "Français", short: "FR", dir: "ltr", enabled: true, hreflang: "fr", og: "fr_FR" },
  de: { label: "Deutsch", short: "DE", dir: "ltr", enabled: true, hreflang: "de", og: "de_DE" },
  es: { label: "Español", short: "ES", dir: "ltr", enabled: true, hreflang: "es", og: "es_ES" },
  ar: { label: "العربية", short: "AR", dir: "rtl", enabled: false, hreflang: "ar", og: "ar_AE" },
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
