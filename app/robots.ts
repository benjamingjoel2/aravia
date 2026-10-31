import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { locales } from "@/config/i18n";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/en/design-system", ...locales.map((l) => `/${l}/ask/received`)] }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
