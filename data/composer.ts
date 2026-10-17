import type { ComposerLeg, ComposerPlace, ComposerRoute, EntryNote } from "./types";

/**
 * Journey Composer data. Flight times are approximate time in the air or on the road, not door to door.
 * Every leg, route and entry note is flagged `verify: true`.
 */
export const places = [
  // The Gulf
  { id: "dubai", name: "Dubai", country: "AE", gateway: "DXB", lat: 25.2, lng: 55.27, idealNights: [3, 4], bestMonths: [11, 12, 1, 2, 3, 4], destination: "dubai" },
  { id: "abu-dhabi", name: "Abu Dhabi", country: "AE", gateway: "AUH", lat: 24.45, lng: 54.38, idealNights: [2, 3], bestMonths: [11, 12, 1, 2, 3], destination: "abu-dhabi" },
  { id: "ras-al-khaimah", name: "Ras Al Khaimah’s desert", country: "AE", gateway: "DXB", lat: 25.79, lng: 55.94, idealNights: [1, 2], bestMonths: [11, 12, 1, 2, 3], destination: "ras-al-khaimah-desert" },
  { id: "alula", name: "AlUla", country: "SA", gateway: "ULH", lat: 26.61, lng: 37.92, idealNights: [3, 4], bestMonths: [10, 11, 12, 1, 2, 3], destination: "alula-hegra" },
  { id: "red-sea", name: "The Red Sea islands", country: "SA", gateway: "RSI", lat: 25.6, lng: 36.85, idealNights: [3, 4], bestMonths: [10, 11, 12, 1, 2, 3, 4, 5], destination: "red-sea-islands" },
  { id: "riyadh", name: "Riyadh and Diriyah", country: "SA", gateway: "RUH", lat: 24.71, lng: 46.68, idealNights: [2, 3], bestMonths: [11, 12, 1, 2, 3], destination: "riyadh-diriyah" },
  { id: "jeddah", name: "Jeddah", country: "SA", gateway: "JED", lat: 21.49, lng: 39.19, idealNights: [1, 2], bestMonths: [11, 12, 1, 2, 3], destination: "jeddah-al-balad" },
  { id: "doha", name: "Doha", country: "QA", gateway: "DOH", lat: 25.29, lng: 51.53, idealNights: [2, 3], bestMonths: [11, 12, 1, 2, 3], destination: "doha" },
  { id: "kuwait-city", name: "Kuwait City", country: "KW", gateway: "KWI", lat: 29.38, lng: 47.99, idealNights: [2, 3], bestMonths: [11, 12, 1, 2, 3], destination: "kuwait-city" },
  { id: "manama", name: "Manama", country: "BH", gateway: "BAH", lat: 26.23, lng: 50.59, idealNights: [2, 2], bestMonths: [11, 12, 1, 2, 3], destination: "manama" },
  { id: "muscat", name: "Muscat", country: "OM", gateway: "MCT", lat: 23.59, lng: 58.38, idealNights: [2, 3], bestMonths: [10, 11, 12, 1, 2, 3], destination: "muscat" },
  { id: "musandam", name: "Musandam", country: "OM", gateway: "KHS", lat: 26.18, lng: 56.25, idealNights: [2, 2], bestMonths: [10, 11, 12, 1, 2, 3, 4], destination: "musandam" },
  { id: "wahiba-sands", name: "Wahiba Sands", country: "OM", gateway: "MCT", lat: 22.4, lng: 58.8, idealNights: [1, 2], bestMonths: [10, 11, 12, 1, 2, 3], destination: "wahiba-sands" },
  { id: "jebel-akhdar", name: "Jebel Akhdar", country: "OM", gateway: "MCT", lat: 23.07, lng: 57.67, idealNights: [2, 3], bestMonths: [3, 4, 5, 6, 7, 8, 9, 10], destination: "jebel-akhdar" },
  // The Levant
  { id: "petra", name: "Petra", country: "JO", gateway: "AMM", lat: 30.33, lng: 35.44, idealNights: [2, 2], bestMonths: [3, 4, 5, 9, 10, 11], destination: "petra" },
  { id: "wadi-rum", name: "Wadi Rum", country: "JO", gateway: "AQJ", lat: 29.58, lng: 35.42, idealNights: [1, 2], bestMonths: [3, 4, 5, 9, 10, 11], destination: "wadi-rum" },
  { id: "dead-sea", name: "The Dead Sea", country: "JO", gateway: "AMM", lat: 31.72, lng: 35.59, idealNights: [2, 2], bestMonths: [10, 11, 12, 1, 2, 3, 4, 5], destination: "dead-sea" },
  // North Africa
  { id: "cairo", name: "Cairo and the Pyramids", country: "EG", gateway: "CAI", lat: 30.04, lng: 31.24, idealNights: [3, 3], bestMonths: [10, 11, 12, 1, 2, 3, 4], destination: "cairo-pyramids" },
  { id: "luxor", name: "Luxor and the Nile", country: "EG", gateway: "LXR", lat: 25.69, lng: 32.64, idealNights: [3, 5], bestMonths: [10, 11, 12, 1, 2, 3], destination: "luxor-nile" },
  { id: "egypt-red-sea", name: "Egypt’s Red Sea", country: "EG", gateway: "HRG", lat: 27.26, lng: 33.81, idealNights: [3, 4], bestMonths: [3, 4, 5, 9, 10, 11], destination: "egypt-red-sea" },
  { id: "marrakech", name: "Marrakech", country: "MA", gateway: "RAK", lat: 31.63, lng: -8.0, idealNights: [3, 4], bestMonths: [3, 4, 5, 10, 11], destination: "marrakech" },
  { id: "fes", name: "Fes", country: "MA", gateway: "FEZ", lat: 34.03, lng: -5.0, idealNights: [2, 3], bestMonths: [3, 4, 5, 9, 10, 11], destination: "fes" },
  { id: "merzouga", name: "The Sahara at Merzouga", country: "MA", gateway: "ERH", lat: 31.1, lng: -4.01, idealNights: [2, 2], bestMonths: [10, 11, 12, 1, 2, 3, 4], destination: "merzouga-sahara" },
  { id: "essaouira", name: "Essaouira", country: "MA", gateway: "ESU", lat: 31.51, lng: -9.77, idealNights: [2, 3], bestMonths: [4, 5, 6, 7, 8, 9, 10], destination: "essaouira" },
  { id: "tunis", name: "Tunis, Carthage and Sidi Bou Said", country: "TN", gateway: "TUN", lat: 36.81, lng: 10.18, idealNights: [3, 3], bestMonths: [4, 5, 6, 9, 10], destination: "tunis-sidi-bou-said" },
  { id: "tozeur", name: "Tozeur and the Sahara", country: "TN", gateway: "TOE", lat: 33.92, lng: 8.13, idealNights: [2, 2], bestMonths: [10, 11, 12, 1, 2, 3, 4], destination: "tozeur-sahara" },
  { id: "djerba", name: "Djerba", country: "TN", gateway: "DJE", lat: 33.81, lng: 10.86, idealNights: [3, 4], bestMonths: [4, 5, 6, 9, 10], destination: "djerba" },
  { id: "algiers", name: "Algiers and the Casbah", country: "DZ", gateway: "ALG", lat: 36.75, lng: 3.06, idealNights: [2, 3], bestMonths: [4, 5, 6, 9, 10], destination: "algiers-casbah" },
  { id: "djanet", name: "Djanet and the Tassili n’Ajjer", country: "DZ", gateway: "DJG", lat: 24.55, lng: 9.48, idealNights: [4, 5], bestMonths: [10, 11, 12, 1, 2, 3], destination: "tassili-djanet" },
] as const satisfies readonly ComposerPlace[];

export type PlaceId = (typeof places)[number]["id"];

type Leg = ComposerLeg & { from: PlaceId; to: PlaceId };

/** Undirected: a leg from A to B also serves B to A. Pairs not listed fall back to a distance estimate marked "approximate". */
export const legs: Leg[] = [
  // Within the UAE and Oman
  { from: "dubai", to: "abu-dhabi", approxMinutes: 90, mode: "drive", verify: true },
  { from: "dubai", to: "ras-al-khaimah", approxMinutes: 60, mode: "drive", verify: true },
  { from: "dubai", to: "musandam", approxMinutes: 150, mode: "drive", verify: true, note: "By road via Ras Al Khaimah and the border crossing; helicopter by arrangement" },
  { from: "abu-dhabi", to: "ras-al-khaimah", approxMinutes: 120, mode: "drive", verify: true },
  { from: "muscat", to: "musandam", approxMinutes: 60, mode: "flight", verify: true, note: "To Khasab" },
  { from: "muscat", to: "wahiba-sands", approxMinutes: 150, mode: "drive", verify: true },
  { from: "muscat", to: "jebel-akhdar", approxMinutes: 120, mode: "drive", verify: true, note: "A four-wheel-drive vehicle is required on the mountain road" },
  { from: "wahiba-sands", to: "jebel-akhdar", approxMinutes: 180, mode: "drive", verify: true },
  // Across the Gulf
  { from: "dubai", to: "muscat", approxMinutes: 70, mode: "flight", verify: true },
  { from: "dubai", to: "doha", approxMinutes: 70, mode: "flight", verify: true },
  { from: "dubai", to: "manama", approxMinutes: 80, mode: "flight", verify: true },
  { from: "dubai", to: "kuwait-city", approxMinutes: 105, mode: "flight", verify: true },
  { from: "dubai", to: "riyadh", approxMinutes: 120, mode: "flight", verify: true },
  { from: "dubai", to: "jeddah", approxMinutes: 180, mode: "flight", verify: true },
  { from: "dubai", to: "alula", approxMinutes: 150, mode: "private", verify: true, note: "Scheduled flights are limited; a private jet is simplest" },
  { from: "abu-dhabi", to: "alula", approxMinutes: 150, mode: "private", verify: true },
  { from: "abu-dhabi", to: "muscat", approxMinutes: 65, mode: "flight", verify: true },
  { from: "abu-dhabi", to: "doha", approxMinutes: 65, mode: "flight", verify: true },
  { from: "doha", to: "kuwait-city", approxMinutes: 85, mode: "flight", verify: true },
  { from: "doha", to: "manama", approxMinutes: 45, mode: "flight", verify: true },
  { from: "doha", to: "muscat", approxMinutes: 90, mode: "flight", verify: true },
  { from: "doha", to: "riyadh", approxMinutes: 80, mode: "flight", verify: true },
  { from: "kuwait-city", to: "manama", approxMinutes: 75, mode: "flight", verify: true },
  { from: "kuwait-city", to: "riyadh", approxMinutes: 90, mode: "flight", verify: true },
  { from: "manama", to: "riyadh", approxMinutes: 65, mode: "flight", verify: true },
  // Within Saudi Arabia
  { from: "riyadh", to: "alula", approxMinutes: 105, mode: "flight", verify: true },
  { from: "riyadh", to: "jeddah", approxMinutes: 110, mode: "flight", verify: true },
  { from: "riyadh", to: "red-sea", approxMinutes: 110, mode: "flight", verify: true, note: "To Red Sea International, then by boat or seaplane to the islands" },
  { from: "jeddah", to: "alula", approxMinutes: 75, mode: "flight", verify: true },
  { from: "jeddah", to: "red-sea", approxMinutes: 60, mode: "flight", verify: true, note: "To Red Sea International, then by boat or seaplane to the islands" },
  { from: "alula", to: "red-sea", approxMinutes: 45, mode: "private", verify: true, note: "By helicopter or seaplane, by arrangement; about three hours by road" },
  // Into the Levant
  { from: "alula", to: "petra", approxMinutes: 180, mode: "flight+drive", verify: true, note: "Private jet to Aqaba, then about two hours by road" },
  { from: "dubai", to: "petra", approxMinutes: 390, mode: "flight+drive", verify: true, note: "About three and a half hours to Amman, then three hours by road; or fly to Aqaba" },
  { from: "dubai", to: "dead-sea", approxMinutes: 255, mode: "flight+drive", verify: true, note: "Fly to Amman, then about forty-five minutes by road" },
  { from: "doha", to: "petra", approxMinutes: 360, mode: "flight+drive", verify: true, note: "Fly to Amman, then about three hours by road" },
  { from: "riyadh", to: "petra", approxMinutes: 330, mode: "flight+drive", verify: true, note: "Fly to Amman, then about three hours by road" },
  { from: "petra", to: "wadi-rum", approxMinutes: 90, mode: "drive", verify: true },
  { from: "petra", to: "dead-sea", approxMinutes: 180, mode: "drive", verify: true },
  { from: "wadi-rum", to: "dead-sea", approxMinutes: 240, mode: "drive", verify: true },
  // Into North Africa
  { from: "dubai", to: "cairo", approxMinutes: 240, mode: "flight", verify: true },
  { from: "riyadh", to: "cairo", approxMinutes: 150, mode: "flight", verify: true },
  { from: "jeddah", to: "cairo", approxMinutes: 135, mode: "flight", verify: true },
  { from: "dead-sea", to: "cairo", approxMinutes: 150, mode: "flight+drive", verify: true, note: "By road to Amman, then about eighty minutes to Cairo" },
  { from: "petra", to: "cairo", approxMinutes: 270, mode: "flight+drive", verify: true, note: "By road to Amman, then about eighty minutes to Cairo" },
  { from: "dubai", to: "marrakech", approxMinutes: 540, mode: "flight", verify: true, note: "Usually via Casablanca; direct by private jet" },
  { from: "doha", to: "marrakech", approxMinutes: 540, mode: "flight", verify: true, note: "Usually via Casablanca; direct by private jet" },
  { from: "cairo", to: "marrakech", approxMinutes: 330, mode: "flight", verify: true, note: "Usually via Casablanca" },
  { from: "cairo", to: "tunis", approxMinutes: 210, mode: "flight", verify: true },
  { from: "cairo", to: "algiers", approxMinutes: 225, mode: "flight", verify: true },
  // Within Egypt
  { from: "cairo", to: "luxor", approxMinutes: 65, mode: "flight", verify: true },
  { from: "cairo", to: "egypt-red-sea", approxMinutes: 60, mode: "flight", verify: true, note: "To Hurghada" },
  { from: "luxor", to: "egypt-red-sea", approxMinutes: 240, mode: "drive", verify: true },
  // Within Morocco
  { from: "marrakech", to: "fes", approxMinutes: 70, mode: "flight", verify: true, note: "Or about six hours by road through the Middle Atlas" },
  { from: "marrakech", to: "merzouga", approxMinutes: 150, mode: "private", verify: true, note: "Private flight to Errachidia, then by road; about nine hours over the Atlas by car" },
  { from: "marrakech", to: "essaouira", approxMinutes: 165, mode: "drive", verify: true },
  { from: "fes", to: "merzouga", approxMinutes: 420, mode: "drive", verify: true, note: "Through Ifrane, the cedar forests and the Ziz valley" },
  // The Maghreb
  { from: "marrakech", to: "tunis", approxMinutes: 240, mode: "flight", verify: true, note: "Usually via Casablanca" },
  { from: "tunis", to: "algiers", approxMinutes: 85, mode: "flight", verify: true },
  { from: "tunis", to: "djerba", approxMinutes: 60, mode: "flight", verify: true },
  { from: "tunis", to: "tozeur", approxMinutes: 60, mode: "flight", verify: true },
  { from: "tozeur", to: "djerba", approxMinutes: 240, mode: "drive", verify: true, note: "Across the Chott el Jerid salt flats" },
  { from: "algiers", to: "djanet", approxMinutes: 150, mode: "flight", verify: true },
];

type Route = ComposerRoute & { places: PlaceId[] };

export const routes: Route[] = [
  { slug: "dubai-alula-petra", title: "Dubai, AlUla and Petra", places: ["dubai", "alula", "petra"], nights: [3, 3, 2],
    season: "Late October to April", verify: true,
    note: "A city, then two of the great Nabataean sites. Fly privately from AlUla to Aqaba to keep the journey short." },
  { slug: "riyadh-alula-red-sea", title: "Saudi Arabia, end to end", places: ["riyadh", "alula", "red-sea"], nights: [2, 3, 3],
    season: "November to March", verify: true,
    note: "The capital and Diriyah, the canyons of AlUla, then the islands of the Red Sea to finish." },
  { slug: "gulf-capitals", title: "Three Gulf capitals", places: ["kuwait-city", "manama", "doha"], nights: [2, 2, 3],
    season: "November to March", verify: true,
    note: "Short hops down the Gulf coast, each city with its own museums, souqs and pearling history." },
  { slug: "dubai-musandam-muscat", title: "Dubai, Musandam and Muscat", places: ["dubai", "musandam", "muscat"], nights: [3, 2, 3],
    season: "October to April", verify: true,
    note: "From the city to the fjords by road or helicopter, then on to Muscat." },
  { slug: "oman-interior", title: "Oman, mountain and sand", places: ["muscat", "jebel-akhdar", "wahiba-sands"], nights: [2, 2, 2],
    season: "October to March", verify: true,
    note: "Muscat, the terraces of the Green Mountain, and a private camp in the dunes." },
  { slug: "jordan-classic", title: "Jordan, stone and sand", places: ["dead-sea", "petra", "wadi-rum"], nights: [2, 2, 1],
    season: "March to May, September to November", verify: true,
    note: "Rest at the Dead Sea, Petra at first light, then a night in the desert." },
  { slug: "pharaohs-and-nabataeans", title: "Pharaohs and Nabataeans", places: ["cairo", "luxor", "petra"], nights: [3, 3, 2],
    season: "October to April", verify: true,
    note: "Giza, the Nile at Luxor, and Petra. The flight to Jordan connects through Cairo." },
  { slug: "dubai-cairo-luxor", title: "The Gulf and the Nile", places: ["dubai", "cairo", "luxor"], nights: [3, 3, 4],
    season: "November to March", verify: true,
    note: "A few days in Dubai, then Egypt, ending with a private dahabiya from Luxor." },
  { slug: "morocco-imperial-sahara", title: "Morocco, cities and Sahara", places: ["marrakech", "merzouga", "fes"], nights: [3, 2, 3],
    season: "October to April", verify: true,
    note: "Marrakech, the dunes of Erg Chebbi, then north through the Ziz valley to Fes." },
  { slug: "marrakech-essaouira", title: "Marrakech and the Atlantic", places: ["marrakech", "essaouira"], nights: [3, 3],
    season: "April to October", verify: true,
    note: "The medina and its gardens, then the sea air of Essaouira." },
  { slug: "tunisia-north-to-south", title: "Tunisia, north to south", places: ["tunis", "tozeur", "djerba"], nights: [3, 2, 3],
    season: "April to June, September to October", verify: true,
    note: "Carthage and Sidi Bou Said, the oases of the Jerid, and the calm of Djerba." },
  { slug: "algeria-casbah-tassili", title: "Algeria, Casbah and Tassili", places: ["algiers", "djanet"], nights: [3, 5],
    season: "October to March", verify: true,
    note: "Algiers, then deep into the Sahara for the rock art of the Tassili n’Ajjer. Desert travel is arranged with a licensed local agency." },
  { slug: "gulf-and-morocco", title: "The Gulf and Morocco", places: ["dubai", "marrakech"], nights: [3, 4],
    season: "November, March and April", verify: true,
    note: "Two very different sides of the Arab world. A private jet makes the long crossing simple." },
];

/** Guidance only. Rules depend on nationality and change often; always verify before travel. */
export const entryNotes: EntryNote[] = [
  { country: "SA", verify: true, summary: "Many nationalities can obtain a tourist eVisa online or a visa on arrival. Others apply in advance." },
  { country: "AE", verify: true, summary: "Many nationalities receive a visa on arrival or enter visa-free. Others need a visa arranged before travel." },
  { country: "QA", verify: true, summary: "Many nationalities enter visa-free for a short stay. Others apply in advance online." },
  { country: "KW", verify: true, summary: "Many nationalities can obtain an eVisa or a visa on arrival. Others apply in advance." },
  { country: "BH", verify: true, summary: "Many nationalities can obtain an eVisa or a visa on arrival. Others apply in advance." },
  { country: "OM", verify: true, summary: "Many nationalities enter visa-free for a short stay. Others apply for an eVisa." },
  { country: "JO", verify: true, summary: "Many nationalities can obtain a visa on arrival. The Jordan Pass may cover the visa fee and entry to Petra for qualifying stays." },
  { country: "EG", verify: true, summary: "Many nationalities can obtain an eVisa or a visa on arrival. Others apply in advance." },
  { country: "MA", verify: true, summary: "Many nationalities, including most European and North American passport holders, enter visa-free for a stay of up to ninety days. Others apply for an eVisa." },
  { country: "TN", verify: true, summary: "Many nationalities, including most European and North American passport holders, enter visa-free for a short stay. Others apply in advance." },
  { country: "DZ", verify: true,
    summary: "Most nationalities need a visa arranged in advance through an Algerian consulate. A visa on arrival may be available for organised trips to the Saharan south, arranged through a licensed agency.",
    caution: "Travel in the far south is accompanied by licensed guides, and some governments advise against travel to border areas. Check your government’s current travel advice." },
];
