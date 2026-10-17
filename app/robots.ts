import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/en/design-system", "/en/ask/received"] }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
