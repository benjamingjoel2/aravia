/**
 * What we arrange. Short summaries for the homepage and index; each service gets its own page in step 5.
 * Anything that names exclusive or private access is a claim to confirm.
 */
export type Service = { slug: string; name: string; summary: string; confirm?: true };

export const services: Service[] = [
  { slug: "private-aviation", name: "Private aviation and helicopters", summary: "Jets between countries, helicopters between valleys, and the paperwork handled before you ask." },
  { slug: "chauffeurs-security", name: "Chauffeurs and discreet security", summary: "Drivers who know the city, and close protection that stays out of the photograph.", confirm: true },
  { slug: "villas-palaces-suites", name: "Villas, palaces and suites", summary: "The right room in the right house, from a riad in the medina to a private island villa." },
  { slug: "yachts", name: "Yachts", summary: "Dubai’s coast, the fjords of Musandam and the reefs of the Red Sea, by day or for a week." },
  { slug: "desert-camps", name: "Private desert camps and dinners", summary: "A camp set for you alone, from Wahiba to Wadi Rum to the dunes of Merzouga." },
  { slug: "restaurants", name: "Restaurant reservations", summary: "The table you wanted, on the night you wanted it, whenever it can be had." },
  { slug: "events-access", name: "Events and private openings", summary: "Grand Prix weekends, art fairs and openings, with access requested on your behalf.", confirm: true },
  { slug: "shopping-stylists", name: "Shopping and personal stylists", summary: "Private appointments, personal shoppers and the ateliers worth knowing." },
  { slug: "wellness", name: "Wellness and spa retreats", summary: "Hammams, mountain retreats and the Dead Sea, arranged around rest." },
  { slug: "families", name: "Families", summary: "Vetted nannies, kids’ clubs, family villas and days planned around the youngest guest." },
  { slug: "celebrations", name: "Celebrations", summary: "Proposals, birthdays and anniversaries, planned quietly and down to the last candle." },
  { slug: "heritage", name: "Heritage, guides and archaeologists", summary: "Private guides, Egyptologists and archaeologists who make the stones speak.", confirm: true },
  { slug: "photographers", name: "Photographers", summary: "A discreet photographer for a moment you want to keep, and only for you." },
];
