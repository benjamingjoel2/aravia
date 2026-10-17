import type { Country, CountryCode, Region, RegionId } from "./types";

/** Navigation and page order: The Gulf, The Levant, North Africa. */
export const regions: Region[] = [
  {
    id: "gulf",
    name: "The Gulf",
    intro: "Six nations along the Arabian Gulf and the Red Sea, from the ancient valleys of AlUla to the fjords of Musandam.",
    countries: ["SA", "AE", "QA", "KW", "BH", "OM"],
  },
  {
    id: "levant",
    name: "The Levant",
    intro: "Rose-red cities carved from stone, desert under a sky of stars, and the lowest shore on earth.",
    countries: ["JO"],
  },
  {
    id: "north-africa",
    name: "North Africa",
    intro: "From the Nile to the Atlantic: pharaohs and medinas, Roman stone, mountain villages and the deep Sahara.",
    countries: ["EG", "MA", "TN", "DZ"],
  },
];

export const countries: Country[] = [
  { code: "SA", slug: "saudi-arabia", name: "Saudi Arabia", region: "gulf",
    intro: "A kingdom opening to travellers after centuries kept for pilgrims and traders: Nabataean tombs, coral islands and the mud-brick capital of the first Saudi state." },
  { code: "AE", slug: "united-arab-emirates", name: "United Arab Emirates", region: "gulf",
    intro: "Skyline and dune within the same hour. Seven emirates, each with its own character." },
  { code: "QA", slug: "qatar", name: "Qatar", region: "gulf",
    intro: "A small peninsula with a serious devotion to museums, architecture and the sea." },
  { code: "KW", slug: "kuwait", name: "Kuwait", region: "gulf",
    intro: "A trading city on a deep bay, with a pearl-diving past and an island that Alexander’s sailors once knew." },
  { code: "BH", slug: "bahrain", name: "Bahrain", region: "gulf",
    intro: "An island of old souqs, pearling houses and Dilmun burial mounds, close and unhurried." },
  { code: "OM", slug: "oman", name: "Oman", region: "gulf",
    intro: "Mountains, wadis, fjords and sand sea. The Gulf at its most quietly traditional." },
  { code: "JO", slug: "jordan", name: "Jordan", region: "levant",
    intro: "Petra, Wadi Rum and the Dead Sea, all within a few hours of one another." },
  { code: "EG", slug: "egypt", name: "Egypt", region: "north-africa",
    intro: "Five thousand years along one river, and a coral sea to the east." },
  { code: "MA", slug: "morocco", name: "Morocco", region: "north-africa",
    intro: "Imperial cities, Atlas villages, Saharan dunes and an Atlantic coast, in a single country." },
  { code: "TN", slug: "tunisia", name: "Tunisia", region: "north-africa",
    intro: "Carthage and blue-and-white Sidi Bou Said, a Roman amphitheatre on the plain, and oases at the edge of the Sahara." },
  { code: "DZ", slug: "algeria", name: "Algeria", region: "north-africa",
    intro: "Africa’s largest country, still rarely visited: a whitewashed Casbah, intact Roman cities, and the rock art of the Tassili." },
];

export const countryByCode = Object.fromEntries(countries.map((c) => [c.code, c])) as Record<CountryCode, Country>;

export const regionById = Object.fromEntries(regions.map((r) => [r.id, r])) as Record<RegionId, Region>;

export function countriesInRegion(id: RegionId): Country[] {
  return regionById[id].countries.map((code) => countryByCode[code]);
}
