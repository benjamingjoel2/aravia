import { brand } from "@/config/brand";

/** DRAFTS. Every legal page must be reviewed by a qualified lawyer for each country of operation before launch. */
export type LegalDoc = { slug: string; title: string; updated: string; sections: { heading: string; body: string[] }[] };

const company = brand.legalName;

export const legalDocs: LegalDoc[] = [
  {
    slug: "terms", title: "Terms of service", updated: "October 2026",
    sections: [
      { heading: "Who we are", body: [`This website is operated by ${company}, licensed in the United Arab Emirates under ${brand.licences[0].label} and elsewhere as listed in the footer.`] },
      { heading: "Our role", body: ["Aravia is a concierge. We arrange services on your behalf with independent providers such as hotels, airlines, aircraft operators, yacht owners and guides. Each provider’s own terms apply to the service it provides.", "Requests for access to events, sites or venues are requests, not guarantees. We confirm only what a provider has confirmed to us."] },
      { heading: "Proposals and confirmations", body: ["A proposal is not a booking. A service is booked only when we confirm it to you in writing, and any deposit or payment terms will be set out at that time."] },
      { heading: "Changes and cancellations", body: ["Changes and cancellations follow the provider’s terms, which we will share with you before you confirm."] },
      { heading: "Travel documents and advice", body: ["Entry requirements, etiquette notes and travel times on this website are guidance only. You remain responsible for your passports, visas, insurance and health requirements, and for checking your government’s current travel advice."] },
      { heading: "Governing law", body: ["[GOVERNING LAW AND JURISDICTION TO BE CONFIRMED]"] },
    ],
  },
  {
    slug: "privacy-policy", title: "Privacy policy", updated: "October 2026",
    sections: [
      { heading: "Our promise", body: ["We never name our clients, never publish their photographs, and never sell or share personal details for marketing. Non-disclosure agreements are available on request."] },
      { heading: "What we collect", body: ["When you use Ask Aravia, we receive your request and the contact details you choose to give: a name, a phone number or an email address, a preferred time to call, and your time zone.", "We do not use advertising or tracking cookies. If we measure visits, we use cookieless, privacy-friendly analytics that store no personal data."] },
      { heading: "How we use it", body: ["Only to reply to you and arrange what you ask for. We share with providers only what they need to deliver a service you have confirmed."] },
      { heading: "How long we keep it", body: ["[RETENTION PERIOD TO BE CONFIRMED]. You may ask us at any time to see, correct or delete what we hold about you."] },
      { heading: "Where it is stored", body: ["[DATA LOCATION AND PROCESSORS TO BE CONFIRMED, e.g. hosting provider and CRM]."] },
      { heading: "Contact", body: [`Write to ${brand.contact.emailDisplay}. A person will read it and reply.`] },
    ],
  },
  {
    slug: "cookies", title: "Cookies", updated: "October 2026",
    sections: [
      { heading: "In short", body: ["This website sets no advertising, tracking or analytics cookies, which is why there is no cookie banner."] },
      { heading: "What the site does store", body: ["Your browser may keep the website’s own files in its cache so pages load faster. Nothing is stored that identifies you."] },
      { heading: "Third parties", body: ["Fonts are served from our own domain. Photographs are delivered through our own domain after being optimised by our hosting provider. There are no chat widgets or social media embeds."] },
    ],
  },
  {
    slug: "credits", title: "Photography", updated: "October 2026",
    sections: [
      { heading: "Credits", body: ["Photographs on this website are used under the Unsplash Licence (unsplash.com/license). Each image is listed below with a link to its page on Unsplash. Photographs marked “illustrative” show landscape similar to the destination rather than the place itself."] },
    ],
  },
];

export const legalBySlug = Object.fromEntries(legalDocs.map((d) => [d.slug, d])) as Record<string, LegalDoc>;
