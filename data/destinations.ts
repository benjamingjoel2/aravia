import type { CountryCode, Destination } from "./types";

/** Best months are general guidance; your concierge will advise for your dates. */
export const destinations: Destination[] = [
  // Saudi Arabia
  { slug: "alula-hegra", country: "SA", name: "AlUla and Hegra",
    summary: "Sandstone valleys and the tombs of Hegra, carved by the Nabataeans two thousand years ago. At first light the canyon belongs to almost no one.",
    bestMonths: [10, 11, 12, 1, 2, 3], askPrompt: "A few days in AlUla and Hegra" },
  { slug: "red-sea-islands", country: "SA", name: "The Red Sea islands",
    summary: "An archipelago of coral islands and lagoons on Saudi Arabia’s western coast, newly opened to a small number of guests.",
    bestMonths: [10, 11, 12, 1, 2, 3, 4, 5], askPrompt: "A stay on the Red Sea islands" },
  { slug: "riyadh-diriyah", country: "SA", name: "Riyadh and Diriyah",
    summary: "The capital at full pace, and beside it the restored mud-brick lanes of At-Turaif, birthplace of the Saudi state.",
    bestMonths: [11, 12, 1, 2, 3], askPrompt: "Riyadh and Diriyah, with a private guide" },
  { slug: "jeddah-al-balad", country: "SA", name: "Jeddah’s Al-Balad",
    summary: "Coral-stone merchant houses with carved wooden balconies, in the old heart of the Red Sea’s great port.",
    bestMonths: [11, 12, 1, 2, 3], askPrompt: "An evening walk through Al-Balad in Jeddah" },

  // United Arab Emirates
  { slug: "dubai", country: "AE", name: "Dubai",
    summary: "Tables that are hard to book, a creek still worked by wooden dhows, and the desert half an hour away.",
    bestMonths: [11, 12, 1, 2, 3, 4], askPrompt: "A few days in Dubai" },
  { slug: "abu-dhabi", country: "AE", name: "Abu Dhabi",
    summary: "Museums on Saadiyat, the Sheikh Zayed Grand Mosque in the evening, and the Liwa sands to the south.",
    bestMonths: [11, 12, 1, 2, 3], askPrompt: "Abu Dhabi, with time in the Liwa desert" },
  { slug: "ras-al-khaimah-desert", country: "AE", name: "Ras Al Khaimah’s desert",
    summary: "Red dunes at the foot of the Hajar mountains, an hour north of Dubai and a world quieter.",
    bestMonths: [11, 12, 1, 2, 3], askPrompt: "A desert night in Ras Al Khaimah" },

  // Qatar
  { slug: "doha", country: "QA", name: "Doha",
    summary: "The Museum of Islamic Art across the water from the corniche, Souq Waqif after dark, and the inland sea at Khor Al Adaid.",
    bestMonths: [11, 12, 1, 2, 3], askPrompt: "A few days in Doha" },

  // Kuwait
  { slug: "kuwait-city", country: "KW", name: "Kuwait City",
    summary: "Towers above a long bay, a grand mosque of quiet scale, and Souq Al-Mubarakiya, where the city still comes to shop and talk.",
    bestMonths: [11, 12, 1, 2, 3], askPrompt: "A few days in Kuwait City" },
  { slug: "failaka-island", country: "KW", name: "Failaka Island",
    summary: "A short crossing from the capital to an island of Bronze Age Dilmun and a Hellenistic temple, almost always empty.",
    bestMonths: [11, 12, 1, 2, 3], askPrompt: "A private day on Failaka Island" },

  // Bahrain
  { slug: "manama", country: "BH", name: "Manama",
    summary: "The Pearling Path in Muharraq, Bab Al Bahrain and its souq, and the ancient fort at Qal’at al-Bahrain at sunset.",
    bestMonths: [11, 12, 1, 2, 3], askPrompt: "A few days in Manama" },

  // Oman
  { slug: "muscat", country: "OM", name: "Muscat",
    summary: "A low white city between mountains and sea, with the Royal Opera House and the Mutrah souq.",
    bestMonths: [10, 11, 12, 1, 2, 3], askPrompt: "A few days in Muscat" },
  { slug: "musandam", country: "OM", name: "The Musandam fjords",
    summary: "Mountains falling straight into the sea at the tip of Arabia, best seen from a dhow or a yacht at anchor.",
    bestMonths: [10, 11, 12, 1, 2, 3, 4], askPrompt: "A yacht in Musandam" },
  { slug: "wahiba-sands", country: "OM", name: "Wahiba Sands",
    summary: "A sea of copper dunes where a private camp can be the only light for miles.",
    bestMonths: [10, 11, 12, 1, 2, 3], askPrompt: "A private camp in Wahiba Sands" },
  { slug: "jebel-akhdar", country: "OM", name: "Jebel Akhdar",
    summary: "The Green Mountain: terraced villages, pomegranates and roses at two thousand metres, cool when the coast is not.",
    bestMonths: [3, 4, 5, 6, 7, 8, 9, 10], askPrompt: "A few days on Jebel Akhdar" },

  // Jordan
  { slug: "petra", country: "JO", name: "Petra",
    summary: "The Siq at first light, before the day begins, and the Treasury as the sun reaches it.",
    bestMonths: [3, 4, 5, 9, 10, 11], askPrompt: "Petra at first light" },
  { slug: "wadi-rum", country: "JO", name: "Wadi Rum",
    summary: "Red sand and granite, Bedouin hospitality, and a night sky with nothing in the way.",
    bestMonths: [3, 4, 5, 9, 10, 11], askPrompt: "A night under the stars in Wadi Rum" },
  { slug: "dead-sea", country: "JO", name: "The Dead Sea",
    summary: "The lowest shore on earth, with warm mineral water and a slow sunset over the hills opposite.",
    bestMonths: [10, 11, 12, 1, 2, 3, 4, 5], askPrompt: "A quiet stay on the Dead Sea" },
  { slug: "aqaba", country: "JO", name: "Aqaba",
    summary: "Jordan’s window on the Red Sea, with reefs a few strokes from the shore.",
    bestMonths: [10, 11, 12, 1, 2, 3, 4, 5], askPrompt: "Time on the water in Aqaba" },

  // Egypt
  { slug: "cairo-pyramids", country: "EG", name: "Cairo and the Pyramids",
    summary: "Giza early in the morning, the Grand Egyptian Museum, and the lanes of Islamic Cairo.",
    bestMonths: [10, 11, 12, 1, 2, 3, 4], askPrompt: "Cairo and the Pyramids, with an Egyptologist" },
  { slug: "luxor-nile", country: "EG", name: "Luxor and the Nile",
    summary: "The Valley of the Kings, Karnak at dusk, and a private dahabiya drifting south toward Aswan.",
    bestMonths: [10, 11, 12, 1, 2, 3], askPrompt: "A private dahabiya on the Nile from Luxor" },
  { slug: "egypt-red-sea", country: "EG", name: "Egypt’s Red Sea",
    summary: "Clear water and coral off the eastern coast, from quiet bays to the deep reefs of the south.",
    bestMonths: [3, 4, 5, 9, 10, 11], askPrompt: "Time on Egypt’s Red Sea coast" },

  // Morocco
  { slug: "marrakech", country: "MA", name: "Marrakech",
    summary: "A riad behind a plain door, the medina waking up, and the palm groves and gardens beyond the walls.",
    bestMonths: [3, 4, 5, 10, 11], askPrompt: "A few days in Marrakech" },
  { slug: "fes", country: "MA", name: "Fes",
    summary: "The oldest of the imperial cities, a medina of craftsmen and scholars that has changed little in centuries.",
    bestMonths: [3, 4, 5, 9, 10, 11], askPrompt: "Fes, with a private guide to the medina" },
  { slug: "atlas-mountains", country: "MA", name: "The Atlas Mountains",
    summary: "Berber villages, walnut valleys and snow on the high peaks, an hour from Marrakech.",
    bestMonths: [4, 5, 6, 9, 10], askPrompt: "A few days in the Atlas Mountains" },
  { slug: "merzouga-sahara", country: "MA", name: "The Sahara at Merzouga",
    summary: "The great dunes of Erg Chebbi, and a camp set for you alone as the light turns gold.",
    bestMonths: [10, 11, 12, 1, 2, 3, 4], askPrompt: "A private camp in the Sahara at Merzouga" },
  { slug: "essaouira", country: "MA", name: "Essaouira",
    summary: "An Atlantic port of ramparts, gulls and blue fishing boats, where the wind keeps the summer gentle.",
    bestMonths: [4, 5, 6, 7, 8, 9, 10], askPrompt: "A few days in Essaouira" },
  { slug: "chefchaouen", country: "MA", name: "Chefchaouen",
    summary: "A mountain town washed in blue, quiet in the early morning before the day arrives.",
    bestMonths: [4, 5, 6, 9, 10], askPrompt: "Chefchaouen, early in the morning" },

  // Tunisia
  { slug: "tunis-sidi-bou-said", country: "TN", name: "Tunis and Sidi Bou Said",
    summary: "The medina of Tunis and the Bardo’s mosaics, then white walls and blue doors above the bay.",
    bestMonths: [4, 5, 6, 9, 10], askPrompt: "Tunis and Sidi Bou Said" },
  { slug: "carthage", country: "TN", name: "Carthage",
    summary: "The Punic ports and Roman baths of a city that once rivalled Rome, walked with an archaeologist.",
    bestMonths: [3, 4, 5, 6, 9, 10, 11], askPrompt: "Carthage with a private archaeologist" },
  { slug: "el-djem", country: "TN", name: "El Djem",
    summary: "A Roman amphitheatre rising out of an ordinary town, among the best preserved anywhere.",
    bestMonths: [3, 4, 5, 10, 11], askPrompt: "A private visit to El Djem" },
  { slug: "djerba", country: "TN", name: "Djerba",
    summary: "An island of whitewashed mosques, old synagogues, olive groves and long, calm beaches.",
    bestMonths: [4, 5, 6, 9, 10], askPrompt: "A few days on Djerba" },
  { slug: "tozeur-sahara", country: "TN", name: "Tozeur and the Sahara",
    summary: "Palm oases, brick-patterned lanes and the salt flats of Chott el Jerid, at the edge of the dunes.",
    bestMonths: [10, 11, 12, 1, 2, 3, 4], askPrompt: "Tozeur and a night in the Tunisian Sahara" },

  // Algeria
  { slug: "algiers-casbah", country: "DZ", name: "Algiers and the Casbah",
    summary: "A white city stepping down to the bay, and the Ottoman lanes of the Casbah above it.",
    bestMonths: [4, 5, 6, 9, 10], askPrompt: "Algiers and the Casbah, with a private guide" },
  { slug: "timgad-djemila", country: "DZ", name: "Timgad and Djémila",
    summary: "Two Roman cities in the highlands, their streets, arches and forums still laid out as they were.",
    bestMonths: [4, 5, 9, 10], askPrompt: "Timgad and Djémila with an archaeologist" },
  { slug: "tassili-djanet", country: "DZ", name: "Tassili n’Ajjer and Djanet",
    summary: "A plateau of sandstone forests and thousands of prehistoric rock paintings, reached from the oasis of Djanet.",
    bestMonths: [10, 11, 12, 1, 2, 3], askPrompt: "Tassili n’Ajjer and the Sahara at Djanet" },
];

export function destinationsIn(country: CountryCode): Destination[] {
  return destinations.filter((d) => d.country === country);
}

export const destinationBySlug = Object.fromEntries(destinations.map((d) => [d.slug, d])) as Record<string, Destination>;
