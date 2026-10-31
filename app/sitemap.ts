import type { MetadataRoute } from "next";
import { allLocales, defaultLocale, locales } from "@/config/i18n";
import { site } from "@/config/site";
import { countries, countryByCode } from "@/data/countries";
import { destinations } from "@/data/destinations";
import { services } from "@/data/services";
import { posts } from "@/lib/journal";
import { legalDocs } from "@/lib/legal";

const staticPaths = [
  "", "/ask", "/how-it-works", "/services", "/destinations", "/season", "/journey-composer",
  "/travelling-with-grace", "/travelling-with-grace/ramadan", "/discretion", "/about", "/journal", "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...staticPaths,
    ...services.map((s) => `/services/${s.slug}`),
    ...countries.map((c) => `/destinations/${c.slug}`),
    ...destinations.map((d) => `/destinations/${countryByCode[d.country].slug}/${d.slug}`),
    ...countries.map((c) => `/travelling-with-grace/${c.slug}`),
    ...posts.map((p) => `/journal/${p.slug}`),
    ...legalDocs.map((d) => `/legal/${d.slug}`),
  ];
  // Every page in every language, each entry listing its alternates (hreflang, x-default English).
  return locales.flatMap((l) =>
    paths.map((p) => ({
      url: `${site.url}/${l}${p}`,
      changeFrequency: p === "/season" || p === "" ? "weekly" : "monthly",
      priority: p === "" ? 1 : p.split("/").length > 3 ? 0.6 : 0.8,
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((o) => [allLocales[o].hreflang, `${site.url}/${o}${p}`])),
          "x-default": `${site.url}/${defaultLocale}${p}`,
        },
      },
    })),
  );
}
