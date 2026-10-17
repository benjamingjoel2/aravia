import type { PhotoKey } from "./photos";

/**
 * What we arrange. Only services we can deliver; anything naming exclusive or private access,
 * or a partnership, carries `confirm: true` and shows a "to confirm" marker.
 */
export type Claim = { text: string; confirm?: true };

export type Service = {
  slug: string;
  name: string;
  summary: string;
  confirm?: true;
  photo: PhotoKey;
  /** Two short paragraphs for the service page. */
  body: [string, string];
  includes: Claim[];
  where: string;
  askPrompt: string;
};

export const services: Service[] = [
  {
    slug: "private-aviation", name: "Private aviation and helicopters", photo: "desertDuskHorizon",
    summary: "Jets between countries, helicopters between valleys, and the paperwork handled before you ask.",
    body: [
      "Distances in the Arab world are short by air and long by road. A private jet turns Dubai, AlUla and Petra into a single, unhurried week; a helicopter turns a three-hour drive into twenty minutes over the dunes.",
      "Your concierge sources the aircraft, the crew and the permits, times each flight around your days, and has a car waiting at every door.",
    ],
    includes: [
      { text: "Charter jets for one leg or the whole journey" },
      { text: "Helicopter transfers and scenic flights, where permitted" },
      { text: "Seaplane connections to island resorts, where available" },
      { text: "Private terminal and fast-track arrival", confirm: true },
    ],
    where: "Throughout the region, subject to local permits.",
    askPrompt: "A private jet for our journey",
  },
  {
    slug: "chauffeurs-security", name: "Chauffeurs and discreet security", photo: "dubaiBurjKhalifa", confirm: true,
    summary: "Drivers who know the city, and close protection that stays out of the photograph.",
    body: [
      "A good driver is a guide who never speaks unless asked. Ours know the back roads, the hotel entrances and the hours when a city is quiet.",
      "For guests who need it, licensed close protection travels with you, planned with the same care as everything else and kept as unobtrusive as you wish.",
    ],
    includes: [
      { text: "Chauffeurs by the day or the journey" },
      { text: "Luxury and four-wheel-drive vehicles" },
      { text: "Licensed close protection officers", confirm: true },
      { text: "Advance planning of routes and venues", confirm: true },
    ],
    where: "Major cities and every destination we arrange.",
    askPrompt: "A chauffeur for our stay",
  },
  {
    slug: "villas-palaces-suites", name: "Villas, palaces and suites", photo: "dunesSoftPale",
    summary: "The right room in the right house, from a riad in the medina to a private island villa.",
    body: [
      "The best room is rarely the most expensive one. It is the one with the right light, the right quiet and the right distance from everything you came to see.",
      "We know the suites worth asking for, the private villas that are rarely listed, and the riads behind plain doors. Your concierge books, briefs the house and checks every detail before you arrive.",
    ],
    includes: [
      { text: "Hotel suites, with preferences sent ahead" },
      { text: "Private villas with staff" },
      { text: "Riads and heritage houses" },
      { text: "Palaces and residences available for private hire", confirm: true },
    ],
    where: "Every country we cover.",
    askPrompt: "A villa for our family",
  },
  {
    slug: "yachts", name: "Yachts", photo: "yachtAerial",
    summary: "Dubai’s coast, the fjords of Musandam and the reefs of the Red Sea, by day or for a week.",
    body: [
      "From a sunset hour off Dubai Marina to a week among the Red Sea islands, the water changes how a journey feels.",
      "We charter the boat and the crew, plan the anchorages and the meals, and arrange permits for the waters that need them.",
    ],
    includes: [
      { text: "Day and sunset charters" },
      { text: "Week-long crewed charters" },
      { text: "Traditional dhows in Musandam and the Gulf" },
      { text: "Diving and snorkelling guides" },
    ],
    where: "Dubai and Abu Dhabi, Musandam, the Saudi and Egyptian Red Sea, Aqaba.",
    askPrompt: "A yacht for a few days",
  },
  {
    slug: "desert-camps", name: "Private desert camps and dinners", photo: "duneEveningShadow",
    summary: "A camp set for you alone, from Wahiba to Wadi Rum to the dunes of Merzouga.",
    body: [
      "Some of the region’s most remarkable evenings happen far from any building: a table set on a dune, lanterns, a fire, and a sky with nothing in the way.",
      "We choose the place, the crew and the cook, and arrange everything so it is there when you arrive and gone the next morning.",
    ],
    includes: [
      { text: "Private camps for a night or several" },
      { text: "Dinners in the desert for two or for many" },
      { text: "Stargazing with a guide" },
      { text: "Transfers by four-wheel drive or helicopter" },
    ],
    where: "The UAE, Oman, Saudi Arabia, Jordan, Egypt, Morocco, Tunisia and Algeria.",
    askPrompt: "A private dinner in the dunes",
  },
  {
    slug: "restaurants", name: "Restaurant reservations", photo: "sandRipplesGold",
    summary: "The table you wanted, on the night you wanted it, whenever it can be had.",
    body: [
      "The region’s best tables fill quickly, and some of the best are not listed anywhere at all.",
      "Tell us what you feel like and when. We will suggest a few places, book the one you choose and let them know who is coming.",
    ],
    includes: [
      { text: "Reservations at the region’s most sought-after restaurants" },
      { text: "Chef’s tables and private rooms" },
      { text: "Home dining with a local family, where welcome", confirm: true },
    ],
    where: "Every city we cover.",
    askPrompt: "A table tonight",
  },
  {
    slug: "events-access", name: "Events and private openings", photo: "seaNightStars", confirm: true,
    summary: "Grand Prix weekends, art fairs and openings, with access requested on your behalf.",
    body: [
      "The season brings Formula 1, art fairs, festivals and first nights. We request access for you, from hospitality at the circuit to the preview before the doors open.",
      "We never promise what we cannot confirm. If something cannot be arranged, we will say so, and suggest what can.",
    ],
    includes: [
      { text: "Formula 1 hospitality and paddock requests", confirm: true },
      { text: "Art fair previews and gallery visits", confirm: true },
      { text: "Concert and festival access" },
      { text: "Private openings of museums and sites", confirm: true },
    ],
    where: "See The Season for what is on.",
    askPrompt: "Access to an event",
  },
  {
    slug: "shopping-stylists", name: "Shopping and personal stylists", photo: "sandRipplesMono",
    summary: "Private appointments, personal shoppers and the ateliers worth knowing.",
    body: [
      "From the boutiques of Dubai and Doha to the craftsmen of the Fes medina, the region is a remarkable place to shop, if you know where to look.",
      "A personal stylist or shopper can accompany you, or have a selection waiting in your suite.",
    ],
    includes: [
      { text: "Personal shoppers and stylists" },
      { text: "Private appointments after hours", confirm: true },
      { text: "Ateliers, jewellers and perfumers" },
      { text: "Souq and medina visits with a guide" },
    ],
    where: "Dubai, Abu Dhabi, Doha, Riyadh, Marrakech, Fes and Cairo.",
    askPrompt: "A personal stylist during our stay",
  },
  {
    slug: "wellness", name: "Wellness and spa retreats", photo: "duneCrestLight",
    summary: "Hammams, mountain retreats and the Dead Sea, arranged around rest.",
    body: [
      "Rest is a reason to travel. The region offers hammams centuries old, cool mountain retreats and the mineral waters of the Dead Sea.",
      "We plan days around treatments, practitioners and quiet, and leave space for nothing at all.",
    ],
    includes: [
      { text: "Spa and hammam bookings" },
      { text: "Wellness retreats in the mountains and the desert" },
      { text: "Private practitioners in your villa or suite" },
    ],
    where: "The Dead Sea, Jebel Akhdar, the Atlas, the Red Sea and every major city.",
    askPrompt: "A few days of rest",
  },
  {
    slug: "families", name: "Families", photo: "shoreWavesAerial",
    summary: "Vetted nannies, kids’ clubs, family villas and days planned around the youngest guest.",
    body: [
      "Travelling with children asks for a different kind of planning: shorter days, longer lunches, a pool, and someone who knows which sites will hold a seven-year-old’s attention.",
      "We arrange family villas, vetted childcare and guides who are good with children, so the journey works for everyone.",
    ],
    includes: [
      { text: "Family villas and connecting suites" },
      { text: "Vetted nannies and childcare", confirm: true },
      { text: "Kids’ clubs and activities" },
      { text: "Guides who are good with children" },
    ],
    where: "Every country we cover.",
    askPrompt: "A family journey",
  },
  {
    slug: "celebrations", name: "Celebrations", photo: "dunesDuskSun",
    summary: "Proposals, birthdays and anniversaries, planned quietly and down to the last candle.",
    body: [
      "A proposal at first light in the desert, a birthday dinner in a palace courtyard, an anniversary on a yacht at sunset.",
      "We plan the setting, the music, the flowers and the photographer, and keep everything secret until the moment arrives.",
    ],
    includes: [
      { text: "Proposals" },
      { text: "Birthdays and anniversaries" },
      { text: "Private celebrations in unusual places", confirm: true },
      { text: "Musicians, florists and photographers" },
    ],
    where: "Every country we cover.",
    askPrompt: "A celebration",
  },
  {
    slug: "heritage", name: "Heritage, guides and archaeologists", photo: "petraTreasury", confirm: true,
    summary: "Private guides, Egyptologists and archaeologists who make the stones speak.",
    body: [
      "The region holds some of the oldest and most extraordinary places on earth. The right guide changes them from a sight into a story.",
      "We work with licensed guides, Egyptologists and archaeologists, and plan visits for the quiet hours whenever we can.",
    ],
    includes: [
      { text: "Licensed private guides" },
      { text: "Egyptologists and archaeologists", confirm: true },
      { text: "Early and late visits, where permitted", confirm: true },
      { text: "Heritage stays and specialist routes" },
    ],
    where: "Petra, AlUla, Egypt, Carthage, the Roman cities of Tunisia and Algeria, and more.",
    askPrompt: "A private guide",
  },
  {
    slug: "photographers", name: "Photographers", photo: "sandRipplesLight",
    summary: "A discreet photographer for a moment you want to keep, and only for you.",
    body: [
      "Some moments deserve better than a phone. A discreet photographer can join you for an hour, an evening or a day.",
      "The pictures are yours alone. We never use them, share them or post them.",
    ],
    includes: [
      { text: "Photographers for an hour, an evening or a journey" },
      { text: "Portraits, celebrations and proposals" },
      { text: "Strict privacy: the images are yours alone" },
    ],
    where: "Every country we cover.",
    askPrompt: "A photographer for an evening",
  },
];

export const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s])) as Record<string, Service>;
