import type { EtiquetteGuide } from "./types";

/**
 * Travelling with grace. Written as a host would brief a guest, not as rules for foreigners.
 * Customs and laws change, and alcohol rules in particular differ widely: every guide is flagged `verify: true`.
 */
export const etiquette: EtiquetteGuide[] = [
  {
    country: "SA", verify: true,
    intro: "Saudi Arabia has opened to travellers quickly, and its hospitality is generous. A little care in dress and manner is noticed and appreciated.",
    dress: [
      "Modest, loose clothing covering shoulders and knees is appreciated for men and women in public places.",
      "Visiting women are not required to wear an abaya or cover their hair, though many choose a light scarf at heritage and religious sites.",
      "Mosques ask for covered arms and legs, and a headscarf for women. Shoes come off at the door.",
    ],
    weekend: "Friday and Saturday. Many places open later on Friday, after midday prayers.",
    alcohol: [
      "Alcohol is not available to visitors and must not be brought into the country.",
      "Hotels and restaurants offer excellent alcohol-free drinks, and Saudi coffee with dates is the true welcome.",
    ],
    photography: [
      "Ask before photographing people, especially women and families.",
      "Avoid photographing government buildings, military sites and airports.",
    ],
    greetings: [
      "“As-salamu alaykum” is always welcome; the reply is “wa alaykum as-salam”.",
      "Wait for a woman to offer her hand before offering yours. A hand on the heart is a warm alternative.",
      "Accept coffee or tea when offered; a gentle shake of the cup signals you have had enough.",
    ],
    tipping: [
      "Not expected, but appreciated. Around ten per cent in restaurants where service is not included.",
      "A small amount for drivers, guides and hotel staff is a kind gesture.",
    ],
  },
  {
    country: "AE", verify: true,
    intro: "The Emirates are cosmopolitan, but they remain a place of Emirati custom. A little modesty away from the beach goes a long way.",
    dress: [
      "Beachwear belongs at the beach and the pool. Elsewhere, cover shoulders and knees, particularly in malls and older neighbourhoods.",
      "At the Sheikh Zayed Grand Mosque, women cover their hair, arms and legs; men wear long trousers. Abayas can be provided.",
    ],
    weekend: "Saturday and Sunday for most of the country, with a shorter working day on Friday. Sharjah differs.",
    alcohol: [
      "Served in licensed hotels, restaurants and bars. Drinking in public places is not permitted.",
      "Sharjah does not permit alcohol.",
      "Rules for residents and visitors have changed in recent years; your concierge will advise.",
    ],
    photography: [
      "Ask before photographing people, especially Emirati women and families.",
      "Drones need permission and registration.",
    ],
    greetings: [
      "A handshake is common between men. With women, wait for a hand to be offered.",
      "Public displays of affection are best kept discreet.",
    ],
    tipping: [
      "Service is sometimes included. Otherwise, ten to fifteen per cent in restaurants.",
      "Small tips for drivers, valets and porters are customary.",
    ],
  },
  {
    country: "QA", verify: true,
    intro: "Doha is open and international, with a traditional heart. Visitors are welcomed warmly and asked, gently, to dress with care.",
    dress: [
      "Cover shoulders and knees in public places, including museums and souqs.",
      "Mosques ask for covered arms and legs and a headscarf for women.",
    ],
    weekend: "Friday and Saturday.",
    alcohol: [
      "Served only in licensed hotel restaurants and bars. Drinking in public places is not permitted.",
      "Alcohol cannot be brought into the country.",
    ],
    photography: [
      "Ask before photographing people, especially women.",
      "Avoid government and security buildings.",
    ],
    greetings: [
      "Handshakes are common between men; with women, follow her lead.",
      "Using the right hand to give and receive is courteous.",
    ],
    tipping: [
      "Ten to fifteen per cent in restaurants where service is not included.",
      "Small tips for drivers and porters are welcome.",
    ],
  },
  {
    country: "KW", verify: true,
    intro: "Kuwait is a conservative, family-centred society with a long tradition of hospitality. Guests who dress and behave modestly are welcomed warmly.",
    dress: [
      "Modest clothing covering shoulders and knees is expected in public places.",
      "At the Grand Mosque, women cover their hair, arms and legs; abayas may be provided for guided visits.",
    ],
    weekend: "Friday and Saturday.",
    alcohol: [
      "Alcohol is prohibited in Kuwait, including in hotels, and must not be brought into the country.",
    ],
    photography: [
      "Ask before photographing people, and never photograph women without permission.",
      "Avoid photographing oil installations, government buildings and military sites.",
    ],
    greetings: [
      "“As-salamu alaykum” is a gracious opening. Kuwaitis often greet at length; there is no need to rush.",
      "Wait for a woman to offer her hand.",
    ],
    tipping: [
      "Ten per cent in restaurants is appreciated. Small tips for drivers and porters are customary.",
    ],
  },
  {
    country: "BH", verify: true,
    intro: "Bahrain has long been a crossroads of the Gulf, relaxed and welcoming, with deep roots in its pearling past.",
    dress: [
      "Away from hotels and beaches, cover shoulders and knees.",
      "At Al Fateh Grand Mosque, women cover their hair, arms and legs; robes are usually provided.",
    ],
    weekend: "Friday and Saturday.",
    alcohol: [
      "Available in licensed hotels, restaurants and bars. Drinking in public places is not permitted.",
    ],
    photography: [
      "Ask before photographing people.",
      "Avoid government and military sites.",
    ],
    greetings: [
      "A handshake is common between men; with women, follow her lead.",
    ],
    tipping: [
      "Service is often included. Otherwise, around ten per cent.",
    ],
  },
  {
    country: "OM", verify: true,
    intro: "Oman is perhaps the most quietly traditional country in the Gulf. Courtesy and calm are the national manner, and guests are expected to share it.",
    dress: [
      "Cover shoulders and knees in towns, villages and souqs. In mountain villages, more modest dress is kind.",
      "At the Sultan Qaboos Grand Mosque, women cover their hair, arms and legs. Visiting hours are limited.",
    ],
    weekend: "Friday and Saturday.",
    alcohol: [
      "Served in licensed hotels and some restaurants. Not sold in ordinary shops, and not for public places.",
    ],
    photography: [
      "Ask before photographing people, especially in villages and the interior.",
      "Avoid military and government sites.",
    ],
    greetings: [
      "Omanis greet unhurriedly. Take the time to ask after health and family.",
      "Accept kahwa and dates when offered; it is the heart of Omani welcome.",
    ],
    tipping: [
      "Not expected, but appreciated. Around ten per cent in restaurants; something for guides and drivers.",
    ],
  },
  {
    country: "JO", verify: true,
    intro: "Jordanians are famously hospitable. Accept the tea, take your time, and you will be treated as a friend.",
    dress: [
      "Amman is relaxed; outside the city, and in villages, cover shoulders and knees.",
      "At Petra and Wadi Rum, comfortable, modest clothing and good shoes. Mosques ask for covered arms, legs and hair for women.",
    ],
    weekend: "Friday and Saturday.",
    alcohol: [
      "Available in hotels, many restaurants and licensed shops. Discretion is appreciated in conservative areas.",
    ],
    photography: [
      "Ask before photographing people, including Bedouin families at Petra and in Wadi Rum.",
    ],
    greetings: [
      "“Ahlan wa sahlan”, welcome, you will hear often. A handshake is common; with women, follow her lead.",
      "Refusing tea or coffee outright can seem cold. Accept at least one cup.",
    ],
    tipping: [
      "Ten per cent in restaurants is usual. Guides, drivers and camp hosts appreciate a tip at the end.",
    ],
  },
  {
    country: "EG", verify: true,
    intro: "Egypt has welcomed travellers for millennia. A little patience and good humour are returned many times over.",
    dress: [
      "Cover shoulders and knees in cities and at temples. Beachwear is for the Red Sea resorts.",
      "At mosques, women cover their hair, arms and legs; shoes come off at the door.",
    ],
    weekend: "Friday and Saturday for offices; shops and sites are generally open.",
    alcohol: [
      "Available in hotels, Nile boats and many restaurants. Discretion is appreciated outside tourist areas.",
    ],
    photography: [
      "Some sites charge for, or restrict, photography inside tombs. Your guide will advise at each site.",
      "Ask before photographing people, and avoid military and police installations.",
    ],
    greetings: [
      "A warm handshake is common; with women, follow her lead.",
    ],
    tipping: [
      "Baksheesh, small tips for small services, is part of daily life. Your concierge will prepare you so you are never caught without.",
      "Ten to fifteen per cent in restaurants; guides, drivers and boat crews at the end of their time with you.",
    ],
  },
  {
    country: "MA", verify: true,
    intro: "Moroccan hospitality is unhurried and generous. Mint tea is a welcome, and saying yes to a glass is the start of a conversation.",
    dress: [
      "Cover shoulders and knees in medinas and villages. Coastal towns and riads are more relaxed.",
      "Most mosques in Morocco are open only to Muslims; the Hassan II Mosque in Casablanca welcomes visitors on guided tours.",
    ],
    weekend: "Saturday and Sunday. Friday is the day for communal prayer and couscous at home.",
    alcohol: [
      "Served in licensed hotels, riads, restaurants and bars, and sold in some supermarkets. Drinking in the street is not appropriate.",
    ],
    photography: [
      "Always ask before photographing people, especially in the medinas and the mountains; some prefer not to be photographed.",
      "Performers and storytellers in squares may ask for a small tip.",
    ],
    greetings: [
      "“Salam” or “As-salamu alaykum”, with a handshake and a hand to the heart. French is widely spoken.",
      "Bread is treated with respect; it is never thrown away.",
    ],
    tipping: [
      "Around ten per cent in restaurants. Small tips for guides, drivers, riad staff and porters are customary.",
    ],
  },
  {
    country: "TN", verify: true,
    intro: "Tunisia is open, Mediterranean and proud of its long history. Visitors are welcomed with ease.",
    dress: [
      "Relaxed in Tunis and resorts; cover shoulders and knees in medinas, the south and at religious sites.",
      "Many mosques are closed to non-Muslims, though some courtyards, such as Kairouan’s Great Mosque, can be visited.",
    ],
    weekend: "Saturday and Sunday. Many offices close early on Friday.",
    alcohol: [
      "Available in hotels, restaurants and bars, and Tunisia makes its own wines. Discretion is kind in conservative areas and the south.",
    ],
    photography: [
      "Ask before photographing people. Avoid government buildings and security forces.",
    ],
    greetings: [
      "A handshake is common; French is widely spoken alongside Tunisian Arabic.",
    ],
    tipping: [
      "Around ten per cent in restaurants. Guides and drivers appreciate a tip.",
    ],
  },
  {
    country: "DZ", verify: true,
    intro: "Algeria receives few travellers, and those who come are often met with real curiosity and warmth. Patience and respect for local custom are essential.",
    dress: [
      "Modest clothing covering shoulders and knees in all public places. In the south and in smaller towns, more conservative dress is kind.",
      "In the Sahara, loose, light clothing and a scarf against sun and sand.",
    ],
    weekend: "Friday and Saturday.",
    alcohol: [
      "Available in some hotels and licensed restaurants in the cities; limited or unavailable elsewhere. Discretion is important.",
    ],
    photography: [
      "Always ask before photographing people.",
      "Avoid photographing police, military, government buildings and infrastructure; this is taken seriously.",
    ],
    greetings: [
      "A handshake is common, often followed by a hand to the heart. French and Arabic are widely spoken; Tamazight in the south and the mountains.",
      "Tuareg hosts in the Sahara will offer tea in three glasses. It is a ritual worth the time.",
    ],
    tipping: [
      "Not always expected, but appreciated. Guides, drivers and desert crews receive a tip at the end of the journey.",
    ],
  },
];
