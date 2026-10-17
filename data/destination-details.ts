import type { PhotoKey } from "./photos";
import type { Claim } from "./services";

/**
 * Destination page content, keyed by destination slug.
 * `photo` is a photograph of that place; `mood` is an illustrative photograph of similar landscape,
 * labelled as such on the page. Destinations with neither use the typographic plate.
 */
export type DestinationDetail = {
  opening: string;
  arrange: Claim[];
  photo?: PhotoKey;
  mood?: PhotoKey;
};

export const destinationDetails: Record<string, DestinationDetail> = {
  // Saudi Arabia
  "alula-hegra": {
    opening: "AlUla is a valley of sandstone outcrops, palm groves and silence. At Hegra, Saudi Arabia’s first UNESCO World Heritage Site, more than a hundred tombs were carved into the rock by the same Nabataeans who built Petra. Come early, and the light does the rest.",
    arrange: [{ text: "Private guided visits to Hegra and the old town" }, { text: "Helicopter flights over the valley", confirm: true }, { text: "Villas and desert resorts in the canyons" }, { text: "Dinners under the stars" }],
  },
  "red-sea-islands": {
    opening: "Off Saudi Arabia’s western coast, an archipelago of low coral islands, lagoons and reefs is opening to a small number of guests. The water is clear, the islands are quiet, and most of the coast is still untouched.",
    arrange: [{ text: "Island resort villas" }, { text: "Seaplane and boat transfers" }, { text: "Private diving and snorkelling guides" }, { text: "Yacht days among the islands" }],
  },
  "riyadh-diriyah": {
    opening: "Riyadh moves fast: new museums, restaurants and a season of events. A short drive away, the mud-brick lanes of At-Turaif in Diriyah recall where the first Saudi state began, and its terraces fill in the evening.",
    arrange: [{ text: "Private guides to At-Turaif and the National Museum" }, { text: "Tables at Bujairi Terrace and beyond" }, { text: "Access requests for Riyadh Season events", confirm: true }, { text: "Day trips to the Edge of the World escarpment" }],
  },
  "jeddah-al-balad": {
    opening: "Al-Balad is Jeddah’s historic heart: coral-stone houses with carved wooden rawasheen, narrow lanes and old souqs. Walk it at dusk, when the heat lifts and the coffee houses open.",
    arrange: [{ text: "Evening walks with a historian" }, { text: "Visits to restored merchant houses", confirm: true }, { text: "Seafood dinners on the Corniche" }, { text: "Onward travel to the Red Sea or AlUla" }],
  },
  // United Arab Emirates
  "dubai": {
    opening: "Dubai can be whatever you need it to be: a city of tables hard to book and views hard to forget, a creek still worked by wooden dhows, and a desert half an hour away. Your concierge knows which Dubai you came for.",
    photo: "dubaiBurjAlArab",
    arrange: [{ text: "Suites and private villas" }, { text: "Restaurant reservations at the city’s most sought-after tables" }, { text: "Yacht charters along the coast" }, { text: "Private desert dinners and camps" }],
  },
  "abu-dhabi": {
    opening: "Abu Dhabi is quieter than its neighbour and rich in culture: the Louvre and the other museums of Saadiyat, the Sheikh Zayed Grand Mosque in the evening light, and to the south the great dunes of Liwa.",
    arrange: [{ text: "Private visits to Saadiyat’s museums" }, { text: "Access requests for the Abu Dhabi Grand Prix", confirm: true }, { text: "Desert stays in Liwa" }, { text: "Mangrove kayaking at dawn" }],
  },
  "ras-al-khaimah-desert": {
    opening: "North of Dubai, Ras Al Khaimah’s red dunes meet the Hajar mountains. It is close enough for an evening, and quiet enough to feel very far away.",
    mood: "dunesWideSun",
    arrange: [{ text: "Desert retreats and private camps" }, { text: "Falconry with local experts" }, { text: "Mountain drives on Jebel Jais" }, { text: "Transfers from Dubai" }],
  },
  // Qatar
  "doha": {
    opening: "Doha has gathered some of the finest museums in the region along its corniche. Spend the day with I. M. Pei’s Museum of Islamic Art and the desert-rose National Museum, the evening in Souq Waqif, and a night at the inland sea where the dunes meet the water.",
    arrange: [{ text: "Private museum visits with a curator", confirm: true }, { text: "Access requests for the Qatar Grand Prix", confirm: true }, { text: "Desert drives to Khor Al Adaid" }, { text: "Dhow evenings on the bay" }],
  },
  // Kuwait
  "kuwait-city": {
    opening: "Kuwait City wraps around a deep bay, with a skyline above and a trading city’s soul below. The Grand Mosque, the Kuwait Towers and Souq Al-Mubarakiya are best seen slowly, with someone who knows the stories.",
    arrange: [{ text: "Private city guides" }, { text: "Visits to the Grand Mosque" }, { text: "Diwaniya evenings, where welcome", confirm: true }, { text: "Crossings to Failaka Island" }],
  },
  "failaka-island": {
    opening: "Failaka lies a short crossing from the capital. Bronze Age Dilmun settlements and a Hellenistic temple from the time of Alexander’s successors sit quietly on an island most visitors never reach.",
    arrange: [{ text: "Private boat crossings" }, { text: "Guided visits to the archaeological sites" }, { text: "Picnics by the shore" }],
  },
  // Bahrain
  "manama": {
    opening: "Bahrain was Dilmun, a trading crossroads for four thousand years. Walk the Pearling Path in Muharraq, see the burial mounds of A’ali, and watch the sun set over Qal’at al-Bahrain.",
    arrange: [{ text: "Guided walks on the Pearling Path" }, { text: "Access requests for the Bahrain Grand Prix", confirm: true }, { text: "Pearl diving with local divers" }, { text: "Island hotels and villas" }],
  },
  // Oman
  "muscat": {
    opening: "Muscat is low, white and calm, between the Hajar mountains and the sea. The Sultan Qaboos Grand Mosque in the morning, the Royal Opera House at night, and the Mutrah souq in between.",
    arrange: [{ text: "Private city and mosque visits" }, { text: "Performances at the Royal Opera House" }, { text: "Boat trips along the coast" }, { text: "Onward journeys to the mountains and the sands" }],
  },
  "musandam": {
    opening: "At the tip of the Arabian Peninsula, the Musandam fjords drop straight from bare mountains into clear water. Spend days at anchor in quiet inlets, with dolphins for company.",
    arrange: [{ text: "Yacht and dhow charters" }, { text: "Mountain drives to Jebel Harim" }, { text: "Snorkelling and diving" }, { text: "Transfers from Dubai by road or helicopter" }],
  },
  "wahiba-sands": {
    opening: "The Sharqiya Sands, once called Wahiba, roll for miles in shades of copper and amber. Here a private camp can be the only light you see.",
    mood: "duneRipplesGold",
    arrange: [{ text: "Private desert camps" }, { text: "Dune drives at sunset" }, { text: "Visits to Bedouin families, where welcome", confirm: true }, { text: "Swims in Wadi Bani Khalid on the way" }],
  },
  "jebel-akhdar": {
    opening: "The Green Mountain rises two thousand metres above the plain. Terraced villages, pomegranates and roses cling to the canyon edges, and the air stays cool when the coast is hot.",
    arrange: [{ text: "Mountain resort stays" }, { text: "Village walks with a local guide" }, { text: "Rose-water distilleries in spring" }, { text: "Canyon-edge dinners" }],
  },
  // Jordan
  "petra": {
    opening: "Walk the Siq in the first light, before the day begins, and watch the Treasury emerge from the rock. Petra rewards those who stay: the Monastery in the afternoon, and the city by candlelight at night.",
    photo: "petraSiqTreasury",
    arrange: [{ text: "Early entry with a private guide", confirm: true }, { text: "Petra by Night" }, { text: "Hikes to the Monastery and the High Place" }, { text: "Stays a few minutes from the gate" }],
  },
  "wadi-rum": {
    opening: "The Valley of the Moon: red sand, granite mountains and Bedouin hospitality. By night the sky here is among the darkest you will ever see.",
    arrange: [{ text: "Private desert camps" }, { text: "Four-wheel-drive journeys through the canyons" }, { text: "Hot-air balloon flights", confirm: true }, { text: "Stargazing with a guide" }],
  },
  "dead-sea": {
    opening: "At the lowest point on earth, the water holds you up and the air is soft. The Dead Sea is a place to do very little, and to watch the hills across the water turn rose at sunset.",
    arrange: [{ text: "Resort and spa stays" }, { text: "Private spa treatments" }, { text: "Visits to the baptism site and Mount Nebo" }, { text: "Hikes in Wadi Mujib" }],
  },
  "aqaba": {
    opening: "Aqaba is Jordan’s Red Sea, with coral gardens a few strokes from the shore and the mountains of Sinai across the gulf.",
    arrange: [{ text: "Diving and snorkelling guides" }, { text: "Yacht days on the gulf" }, { text: "Beach resort stays" }, { text: "Transfers to Wadi Rum and Petra" }],
  },
  // Egypt
  "cairo-pyramids": {
    opening: "Cairo is a city of a thousand minarets and five thousand years. See the Pyramids of Giza early in the morning, the treasures of the Grand Egyptian Museum with an Egyptologist, and the lanes of Islamic Cairo at dusk.",
    arrange: [{ text: "Egyptologists for Giza and the Grand Egyptian Museum", confirm: true }, { text: "Private visits inside the pyramids, where permitted", confirm: true }, { text: "Walks through Islamic Cairo" }, { text: "Suites with views of the pyramids" }],
  },
  "luxor-nile": {
    opening: "Luxor is the greatest open-air museum on earth: the Valley of the Kings, Karnak and the Temple of Luxor. From here, a private dahabiya drifts south toward Aswan, stopping where you please.",
    arrange: [{ text: "Private dahabiya cruises" }, { text: "Egyptologists for the Valley of the Kings", confirm: true }, { text: "Hot-air balloon flights at dawn" }, { text: "Karnak at dusk" }],
  },
  "egypt-red-sea": {
    opening: "Egypt’s Red Sea coast offers some of the clearest water and finest reefs in the world, from quiet bays in the north to the deep walls of the south.",
    arrange: [{ text: "Diving and snorkelling with private guides" }, { text: "Yacht charters" }, { text: "Beach resort villas" }, { text: "Desert excursions inland" }],
  },
  // Morocco
  "marrakech": {
    opening: "Behind a plain door in the medina, a riad opens onto a courtyard of orange trees and quiet. Beyond the walls are gardens, palm groves and the Atlas on the horizon.",
    arrange: [{ text: "Riads and palaces for private hire", confirm: true }, { text: "Guides to the medina and the souqs" }, { text: "Hammams and spa days" }, { text: "Days in the Agafay desert and the Atlas" }],
  },
  "fes": {
    opening: "Fes el-Bali is one of the largest car-free urban areas in the world, a medina of tanneries, madrasas and craftsmen that has changed little in centuries. It asks for a guide, and repays one.",
    arrange: [{ text: "Private guides to the medina" }, { text: "Visits to artisans’ workshops" }, { text: "Riad stays" }, { text: "Day trips to Volubilis and Meknes" }],
  },
  "atlas-mountains": {
    opening: "An hour from Marrakech, the High Atlas rises to snow-capped peaks. Berber villages, walnut valleys and mountain lodges offer quiet walking and cool nights.",
    arrange: [{ text: "Mountain lodge stays" }, { text: "Walks with mountain guides" }, { text: "Lunch with a village family, where welcome", confirm: true }, { text: "Helicopter transfers", confirm: true }],
  },
  "merzouga-sahara": {
    opening: "At Merzouga, the dunes of Erg Chebbi rise up to 150 metres from the stony desert. A private camp, the light turning gold, and the drums of the Gnaoua at night.",
    mood: "duneOrangeSky",
    arrange: [{ text: "Private luxury camps" }, { text: "Dune walks at sunrise and sunset" }, { text: "Gnaoua music in Khamlia" }, { text: "Private flights to Errachidia", confirm: true }],
  },
  "essaouira": {
    opening: "Essaouira is an Atlantic port of ramparts, gulls and blue fishing boats, where the trade winds keep the summer gentle and the pace slow.",
    arrange: [{ text: "Riad and villa stays" }, { text: "Fish lunches in the port" }, { text: "Argan cooperatives and workshops" }, { text: "Horse riding on the beach" }],
  },
  "chefchaouen": {
    opening: "In the Rif mountains, Chefchaouen is washed in every shade of blue. Arrive early, when the lanes are empty and the town still belongs to its people.",
    arrange: [{ text: "Early walks with a local guide" }, { text: "Hikes to the Spanish Mosque" }, { text: "Day trips to the Akchour waterfalls" }],
  },
  // Tunisia
  "tunis-sidi-bou-said": {
    opening: "The medina of Tunis, the mosaics of the Bardo, and on the hill above the bay, the white walls and blue doors of Sidi Bou Said.",
    arrange: [{ text: "Private guides to the medina and the Bardo" }, { text: "Stays in Sidi Bou Said" }, { text: "Lunch overlooking the bay" }],
  },
  "carthage": {
    opening: "Little stands of Carthage, once Rome’s rival, but what remains is extraordinary: the Punic ports, the Antonine Baths by the sea, and the hilltop of Byrsa.",
    arrange: [{ text: "Visits with a private archaeologist", confirm: true }, { text: "The Antonine Baths and the Punic ports" }, { text: "Evenings at the Carthage International Festival" }],
  },
  "el-djem": {
    opening: "At El Djem, a Roman amphitheatre for 35,000 spectators rises out of an ordinary market town. It is one of the best preserved anywhere, and often almost empty.",
    arrange: [{ text: "Private guided visits" }, { text: "Combined days with Kairouan and Sousse" }],
  },
  "djerba": {
    opening: "Djerba is an island of whitewashed mosques, the ancient El Ghriba synagogue, olive groves and long, calm beaches on the Gulf of Gabès.",
    arrange: [{ text: "Beach resort and villa stays" }, { text: "Guided visits to Houmt Souk and El Ghriba" }, { text: "Boat days to the lagoons" }],
  },
  "tozeur-sahara": {
    opening: "Tozeur is an oasis of brick-patterned lanes and palm groves at the edge of the Sahara. Nearby, the salt flats of Chott el Jerid stretch to the horizon and mirages are common.",
    mood: "desertDuskClouds",
    arrange: [{ text: "Oasis resort stays" }, { text: "Four-wheel-drive journeys to Chebika and Tamerza" }, { text: "Desert camps beyond Douz" }],
  },
  // Algeria
  "algiers-casbah": {
    opening: "Algiers steps down white to the bay. Above it, the Ottoman Casbah, a UNESCO World Heritage Site, is a maze of lanes, palaces and stairways best explored with someone who grew up there.",
    arrange: [{ text: "Private guides to the Casbah" }, { text: "Visits to the Bardo and Notre-Dame d’Afrique" }, { text: "Day trips to Tipaza" }],
  },
  "timgad-djemila": {
    opening: "In the eastern highlands, Timgad and Djémila are two of the most complete Roman cities to survive, their streets, arches and forums laid out as they were.",
    arrange: [{ text: "Visits with a private archaeologist", confirm: true }, { text: "Journeys from Constantine" }],
  },
  "tassili-djanet": {
    opening: "The Tassili n’Ajjer is a plateau of sandstone forests and arches, with thousands of prehistoric paintings. From the oasis of Djanet, licensed Tuareg guides lead journeys into one of the most remote landscapes on earth.",
    arrange: [{ text: "Accompanied desert journeys with licensed guides" }, { text: "Rock-art visits with specialists", confirm: true }, { text: "Camps in the dunes of Tin Merzouga" }],
  },
};
