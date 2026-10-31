import { brand } from "@/config/brand";

/** Legal pages. Reviewed wording should replace these texts after a lawyer has checked them for each country of operation. */
export type LegalDoc = { slug: string; title: string; updated: string; sections: { heading: string; body: string[] }[] };

const name = brand.name;
const email = brand.contact.email;
const address = brand.address.lines.join(", ");

export const legalDocs: LegalDoc[] = [
  {
    slug: "terms", title: "Booking terms", updated: "30 October 2026",
    sections: [
      { heading: "Who we are", body: [`${name} is a private travel concierge for the Arab world, based at ${address}. You can reach us at ${email}. These terms apply to every journey and service we arrange for you. By confirming a booking you accept them on behalf of everyone travelling with you.`] },
      { heading: "Our role", body: [`${name} arranges services on your behalf with independent providers such as hotels, airlines, aircraft operators, yacht owners, drivers and guides. Each provider’s own terms also apply to the service it provides, and we share them with you before you confirm.`, "Requests for access to events, sites or venues are requests, not guarantees. We confirm only what a provider has confirmed to us."] },
      { heading: "Enquiries and proposals", body: ["Every journey is made to measure. When you ask us for something, we reply with advice and, if you wish, a written proposal with an itinerary and a quote. Proposals and quotes are free and do not commit you to anything.", "Travel times, seasons, etiquette notes and entry information on this website are guidance, not guarantees."] },
      { heading: "Quotes", body: ["A quote is valid for the period stated on it. Prices depend on availability at the time of booking, and we confirm the final price in writing before you pay anything. The quote lists what is included and what is not; international flights, visas, insurance, gratuities and personal expenses are not included unless the quote says so."] },
      { heading: "Confirming a booking", body: ["A proposal is not a booking. A service is booked when you have paid the deposit set out in your quote and we have confirmed the booking to you in writing. The person making the booking must be at least 18 years old and is responsible for passing these terms and all travel information to everyone in the party."] },
      { heading: "Paying the balance", body: ["The balance is due by the date shown on your confirmation. If it is not paid on time, we may treat the booking as cancelled by you, and the cancellation terms below apply."] },
      { heading: "Changes by you", body: ["If you would like to change a confirmed booking, tell us as soon as possible. We will do our best to help, but changes depend on availability and may cost more. Any charges made by providers, and any difference in price, are passed on to you."] },
      { heading: "Cancellation by you", body: ["You can cancel at any time by writing to us. Cancellation charges depend on how close to the date you cancel and on the conditions of the providers we have booked for you. The charges that apply are set out in your quote and confirmation before you pay. We recommend travel insurance that covers cancellation from the day you book."] },
      { heading: "Changes and cancellation by us", body: ["Weather, schedules and local circumstances sometimes require us to adjust an arrangement, for example a route, a hotel or a flight. If a change is significant, we will tell you as soon as possible and offer a comparable alternative or, where the change is major, a refund of the affected part of the booking.", "We will not cancel a confirmed booking unless we have to, for example because of unavoidable and extraordinary circumstances such as severe weather, civil unrest or official travel advice. If we cancel, we will offer you an alternative or a full refund of the money you have paid us."] },
      { heading: "Travel insurance", body: ["Comprehensive travel insurance is a condition of booking. It must cover medical treatment, emergency evacuation and repatriation, and should cover cancellation and curtailment."] },
      { heading: "Passports, visas and health", body: ["You are responsible for having a valid passport, any visa you need and any vaccinations or health documents required for each country you visit or pass through. Entry rules change, so check the current requirements for your nationality with official sources and take medical advice before you travel. We can point you to the right sources, but we cannot accept liability if you are refused boarding or entry."] },
      { heading: "Our responsibility", body: ["We take care in choosing the providers we work with, and we are responsible for arranging your journey as confirmed.", "We are not responsible for loss, damage, delay or injury caused by you or anyone in your party, by a third party unconnected with the services we arranged, or by unavoidable and extraordinary circumstances beyond our control. Where international conventions limit the compensation payable by airlines, operators or hotels, our liability is limited in the same way. Nothing in these terms limits liability that cannot be limited by law."] },
      { heading: "Your responsibilities", body: ["Please respect local laws and customs, follow the instructions of guides, drivers and crews, and dress and behave as each place expects. We may end the arrangements of anyone whose behaviour puts others at risk."] },
      { heading: "Complaints", body: [`If something is not right during your journey, tell your concierge straight away so we can put it right on the spot. If you are still not satisfied, write to ${email} within 28 days of your return and we will reply in writing.`] },
      { heading: "Law", body: [`These terms are governed by the law that applies to the contract between you and ${name}. Any dispute will be handled by the courts that have jurisdiction under that law. If you are a consumer, you keep the protection given to you by the law of the country where you live.`] },
    ],
  },
  {
    slug: "privacy-policy", title: "Privacy policy", updated: "30 October 2026",
    sections: [
      { heading: "Our promise", body: ["We never name our clients, never publish their photographs, and never sell or share personal details for marketing. Non-disclosure agreements are available on request."] },
      { heading: "Who is responsible", body: [`${name}, ${address}, is responsible for the personal information described here. Contact: ${email}.`] },
      { heading: "What we collect", body: ["When you use Ask Aravia or the request form, we receive your request and the contact details you choose to give: a name, a phone number for a call back or an email address, a preferred time to call, and your time zone.", "When you travel with us, we receive the details needed to arrange your journey, such as names as shown on passports, passport details where a provider requires them, flight times, and any dietary, health or mobility information you choose to share.", "When you browse this website, our hosting provider keeps standard server logs (IP address, browser, page and time) for security and to keep the site running. We do not use advertising, tracking or analytics cookies."] },
      { heading: "How we use it", body: ["To reply to your request and prepare a proposal (steps you have asked us to take before a contract).", "To arrange and deliver what you confirm, with the providers involved (performance of our contract with you).", "To meet legal, accounting and tax obligations, and to keep this website secure (our legitimate interest)."] },
      { heading: "Who we share it with", body: ["Providers receive only what they need to deliver a service you have confirmed, such as hotels, airlines, drivers and guides. Some are in other countries, which may not offer the same level of data protection as your own; we share only the minimum needed.", "Our hosting and email providers process data on our instructions only. We disclose information where the law requires it."] },
      { heading: "How long we keep it", body: ["Requests that do not lead to a booking are deleted within two years of our last contact. Booking records are kept for as long as accounting and tax law requires, then deleted. Server logs are kept for a short period only."] },
      { heading: "Your rights", body: [`Depending on where you live, you may have the right to see the information we hold about you, to correct it, to have it deleted, to restrict or object to how we use it, and to receive a copy. Where we rely on your consent, you can withdraw it at any time. Write to ${email}; we reply within one month. You may also complain to the data protection authority in your country.`] },
      { heading: "Changes", body: ["We may update this policy from time to time. The date at the top shows when it last changed."] },
    ],
  },
  {
    slug: "cookies", title: "Cookie policy", updated: "30 October 2026",
    sections: [
      { heading: "In short", body: ["This website sets no cookies: no advertising, tracking or analytics cookies, which is why there is no cookie banner. It also stores nothing in your browser’s local or session storage."] },
      { heading: "What your browser keeps", body: ["Your browser may keep the website’s own files, such as styles, scripts and images, in its cache so pages load faster. Nothing is stored that identifies you."] },
      { heading: "Third parties", body: ["Fonts are served from our own domain. Photographs come from our image delivery provider and are delivered through our own domain after being optimised by our hosting provider, so your browser does not contact a third-party image service. There are no chat widgets or social media embeds."] },
      { heading: "Consent and how to withdraw it", body: ["Because we set no cookies that need consent, we do not ask for it. If we ever add cookies that do, such as analytics, we will ask first, update this page and give you a way to withdraw consent at any time. You can also block or delete cookies in your browser settings at any time without affecting how this website works."] },
      { heading: "Questions", body: [`Write to ${email}.`] },
    ],
  },
];

export const legalBySlug = Object.fromEntries(legalDocs.map((d) => [d.slug, d])) as Record<string, LegalDoc>;
