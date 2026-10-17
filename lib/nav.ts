import type { Locale } from "@/config/i18n";
import { countriesInRegion, regions } from "@/data/countries";
import { localePath } from "./paths";

export type RegionNav = { id: string; name: string; href: string; countries: { name: string; href: string }[] };

/** Destinations grouped as The Gulf, The Levant, North Africa. Countries link to their section of the destinations page. */
export function regionNav(locale: Locale): RegionNav[] {
  const base = localePath(locale, "/destinations");
  return regions.map((r) => ({
    id: r.id,
    name: r.name,
    href: `${base}#${r.id}`,
    countries: countriesInRegion(r.id).map((c) => ({ name: c.name, href: `${base}#${c.slug}` })),
  }));
}
