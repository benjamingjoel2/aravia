/** Legal pages (English source; French, German and Spanish come from i18n/<locale>.json at build time).
 * Paragraphs may contain [label](/path) links. Sections may carry a table and paragraphs after it. */
export type LegalSection = { heading: string; body: string[]; table?: { head: string[]; rows: string[][] }; after?: string[] };
export type LegalDoc = { slug: string; title: string; updated: string; sections: LegalSection[] };

export const legalDocs: LegalDoc[] = [
  {
    "slug": "terms",
    "title": "Booking terms",
    "updated": "1 November 2026",
    "sections": [
      {
        "heading": "Who we are",
        "body": [
          "These terms apply to every journey arranged by Aravia, The Executive Centre, Level 3, The Offices 3, One Central, Dubai World Trade Centre, Sheikh Zayed Road, Dubai, United Arab Emirates (email aravia@tourground.com). By confirming a booking, the lead traveller accepts them on behalf of everyone named on it."
        ]
      },
      {
        "heading": "Our role",
        "body": [
          "Aravia arranges services on your behalf with independent providers such as hotels, airlines, aircraft operators, yacht owners, drivers and guides. Each provider’s own terms also apply to the service it provides, and we share them with you before you confirm. Requests for access to events, sites or venues are requests, not guarantees: we confirm only what a provider has confirmed to us."
        ]
      },
      {
        "heading": "How a booking is made",
        "body": [
          "Every journey is tailor-made. You tell us what you would like, and we send you a written proposal and quote setting out the itinerary, what is included and excluded, the price and the payment dates.",
          "Prices on this website are shown “From”: a per-person guide to the starting cost of a journey of that kind. They are not an offer. The final price is the one confirmed to you in writing in your quote, which is valid for the period stated on it and subject to availability until your booking is confirmed.",
          "The person making the booking must be at least 18 years old and is responsible for payments and for passing on all information about the journey to the other travellers."
        ]
      },
      {
        "heading": "Confirmation",
        "body": [
          "Your booking is confirmed, and a contract between you and us is formed, when you have accepted your quote in writing, we have received your deposit, and we have sent you a written booking confirmation. Please check it carefully and tell us straight away if anything is wrong."
        ]
      },
      {
        "heading": "Deposit and balance",
        "body": [
          "A deposit of 25% of the total price is payable when you confirm, unless your quote states a different amount. The balance is due 60 days before departure; if you book within 60 days of departure, the full price is payable at booking.",
          "Some services, such as certain flights, permits or small lodges, must be paid in full when booked; your quote will say so. If the balance is not paid on time, we may treat the booking as cancelled by you and apply the charges below.",
          "Once your booking is confirmed, we will not increase its price, except to pass on new or higher government taxes, fees or fuel surcharges imposed after confirmation. We will not do so within 20 days of departure, and if an increase would exceed 8% of the total price you may cancel with a full refund."
        ]
      },
      {
        "heading": "What is included",
        "body": [
          "Your journey includes exactly the services listed in your quote and booking confirmation, typically accommodation, the transport, transfers and activities named in the itinerary, and the meals stated.",
          "Unless your quote says otherwise, it does not include international flights, travel insurance, visas and entry fees, vaccinations, meals and drinks not listed, tips, optional activities, excess baggage or personal expenses."
        ]
      },
      {
        "heading": "Changes by you",
        "body": [
          "If you want to change your arrangements after booking, write to us and we will do our best to help. Changes depend on availability and may carry supplier costs and a reasonable administration charge, which we will confirm before making them. You may transfer your booking to another person who meets its conditions if you tell us at least 7 days before departure; you and they are jointly responsible for the price and any costs of the transfer."
        ]
      },
      {
        "heading": "Cancellation by you",
        "body": [
          "You may cancel at any time by writing to us; cancellation takes effect on the day we receive it. Because we commit money to suppliers on your behalf, the following charges apply, calculated on the total price:"
        ],
        "table": {
          "head": [
            "When we receive your cancellation",
            "Cancellation charge"
          ],
          "rows": [
            [
              "More than 60 days before departure",
              "The deposit"
            ],
            [
              "60 to 31 days before departure",
              "50% of the total price"
            ],
            [
              "30 to 15 days before departure",
              "75% of the total price"
            ],
            [
              "14 days or fewer before departure, or no-show",
              "100% of the total price"
            ]
          ]
        },
        "after": [
          "Services your confirmation lists as non-refundable once booked (such as some flights or permits) are charged in full in addition to the scale above where they exceed it. You will not pay a cancellation charge if unavoidable and extraordinary circumstances at your destination significantly affect the journey. We strongly recommend insurance that covers cancellation from the day you book."
        ]
      },
      {
        "heading": "Changes and cancellation by us",
        "body": [
          "Travel is shaped by weather, seasons and local conditions, so minor changes (a different vehicle, a revised route, a comparable lodge) may be needed and do not give rise to compensation.",
          "If we have to make a significant change before departure, we will tell you as soon as possible and you may accept it, take a comparable alternative, or cancel with a full refund of everything you have paid us. If we must cancel your journey, we will refund all money you have paid us or, if you prefer, offer an alternative. We are not responsible for costs outside your booking with us, such as flights you arranged yourself."
        ]
      },
      {
        "heading": "Travel insurance",
        "body": [
          "Comprehensive travel insurance is a condition of travelling with us. It must cover cancellation and curtailment, medical treatment, emergency evacuation and repatriation, and the activities in your itinerary. Please send us your policy details before departure."
        ]
      },
      {
        "heading": "Passports, visas and health",
        "body": [
          "Each traveller is responsible for holding a passport valid for the whole journey (many countries require at least six months’ validity beyond your return), any visa or entry authorisation needed, and for meeting all health and vaccination requirements. Requirements depend on your nationality and change, so please check official government sources and take medical advice in good time.",
          "We are not liable if you cannot travel, or incur costs, because you do not have the right documents. Please tell us before booking about any medical condition or reduced mobility, so we can check the arrangements suit you."
        ]
      },
      {
        "heading": "Our responsibility",
        "body": [
          "We arrange your journey with reasonable skill and care and are responsible for providing the services in your booking confirmation. If you are in difficulty during your journey, we will give you prompt and appropriate assistance.",
          "We are not liable where a problem is caused by you or a member of your party, by a third party unconnected with the services we provide, or by unusual and unforeseeable circumstances beyond our control. Where international conventions limit what a carrier or hotel must pay, our liability is limited in the same way. Except for death or personal injury caused by our negligence, or where the law does not allow a limit, our liability is limited to three times the price of your journey. Nothing in these terms affects your statutory rights as a consumer."
        ]
      },
      {
        "heading": "Behaviour",
        "body": [
          "Please follow the reasonable instructions of drivers, hosts and suppliers, particularly on safety, and respect local laws, customs and the places you visit. If your behaviour puts others at risk or causes serious disruption or damage, we or a supplier may end your arrangements without refund."
        ]
      },
      {
        "heading": "Complaints",
        "body": [
          "If something is not right during your journey, tell the supplier concerned and us straight away, so we can put it right on the spot. If you are still unhappy, write to aravia@tourground.com within 28 days of your return; we will acknowledge your complaint promptly and reply in full within 28 days."
        ]
      },
      {
        "heading": "Force majeure",
        "body": [
          "We are not liable, and pay no compensation, where we cannot perform or must change our obligations because of unavoidable and extraordinary circumstances beyond our control, such as war, civil unrest, terrorism, natural disasters, extreme weather, epidemics, government action or official travel advice against travel, or the closure of airports or borders. If such circumstances lead us to cancel, we will refund what you have paid us as set out above."
        ]
      },
      {
        "heading": "Data protection",
        "body": [
          "We use your personal data to arrange your journey as described in our [Privacy Policy](/en/legal/privacy-policy)."
        ]
      },
      {
        "heading": "Governing law",
        "body": [
          "These terms and any booking are governed by the law of the Emirate of Dubai and the federal laws of the United Arab Emirates, and the courts of Dubai have jurisdiction. If you are a consumer, you keep the protection of the mandatory laws of your country of residence and may bring proceedings there where those laws allow. We will always try to resolve a complaint by agreement first."
        ]
      },
      {
        "heading": "Contact",
        "body": [
          "Aravia, The Executive Centre, Level 3, The Offices 3, One Central, Dubai World Trade Centre, Sheikh Zayed Road, Dubai, United Arab Emirates. Email: aravia@tourground.com."
        ]
      }
    ]
  },
  {
    "slug": "privacy-policy",
    "title": "Privacy policy",
    "updated": "1 November 2026",
    "sections": [
      {
        "heading": "Our promise",
        "body": [
          "We never name our clients, never publish their photographs, and never sell or share personal details for marketing. Non-disclosure agreements are available on request."
        ]
      },
      {
        "heading": "Who we are",
        "body": [
          "Aravia (“we”, “us”) plans and arranges tailor-made journeys across the Arab world. Aravia is the controller of the personal data described in this policy.",
          "Business address: The Executive Centre, Level 3, The Offices 3, One Central, Dubai World Trade Centre, Sheikh Zayed Road, Dubai, United Arab Emirates. Email: aravia@tourground.com."
        ]
      },
      {
        "heading": "What we collect",
        "body": [
          "When you send an enquiry or use our planning form: your name, email address, country of residence, preferred travel dates, number of travellers (and the ages of any children), interests, budget range and anything else you write in your message.",
          "When you ask for a call back through Ask Aravia: the phone number you give us, the time you would like us to call and your time zone.",
          "When you book: the names of all travellers as shown on their passports, dates of birth, nationality and passport details where a supplier or authority requires them, flight details, dietary requirements, an emergency contact, and records of your payments. If you tell us about a medical condition or mobility needs, we use that information only to arrange your journey safely, with your explicit consent.",
          "Emails and other messages you exchange with us.",
          "Technical data when you visit this website: your IP address, browser and device type, the pages requested and the date and time, recorded in our hosting provider’s server logs to deliver the site and keep it secure. We do not use analytics, advertising or tracking tools on this website."
        ]
      },
      {
        "heading": "Why we use it and our legal bases",
        "body": [
          "To answer your enquiry and prepare proposals: steps taken at your request before entering into a contract (Article 6(1)(b) GDPR).",
          "To book, arrange and look after your journey, including passing details to the suppliers who provide it: performance of our contract with you (Article 6(1)(b) GDPR).",
          "To use health or mobility information you choose to give us: your explicit consent (Article 9(2)(a) GDPR), which you can withdraw at any time.",
          "To keep accounting and tax records: compliance with our legal obligations (Article 6(1)(c) GDPR).",
          "To keep this website secure, prevent misuse of our forms, improve our service and establish or defend legal claims: our legitimate interests (Article 6(1)(f) GDPR), balanced against your rights.",
          "To send you occasional news about our journeys, only if you have asked for it: your consent (Article 6(1)(a) GDPR). Every message has an unsubscribe link, or you can simply email us.",
          "We do not sell your personal data, and we do not make decisions about you by automated means."
        ]
      },
      {
        "heading": "Who we share it with",
        "body": [
          "Travel suppliers across the Arab world and elsewhere who provide the services in your journey, such as accommodation, transport and activity providers, and only the details each of them needs.",
          "Service providers who process data on our behalf under a written contract and only on our instructions:",
          "Vercel Inc. (United States), which hosts this website and keeps short-lived server logs;",
          "our email provider, which stores the messages you send to aravia@tourground.com and our replies.",
          "Public authorities, insurers or professional advisers, where the law requires it, to protect someone’s vital interests, or to establish or defend legal claims."
        ]
      },
      {
        "heading": "International transfers",
        "body": [
          "Some of the providers above are based in the United States, and arranging your journey means sharing details with suppliers across the Arab world. When personal data leaves the European Economic Area, the United Kingdom or Switzerland, we rely on an adequacy decision (for example the EU–US Data Privacy Framework, where the provider is certified) or on the European Commission’s Standard Contractual Clauses. Transfers to suppliers delivering your journey are also necessary to perform our contract with you. You can ask us for a copy of the safeguards we use."
        ]
      },
      {
        "heading": "How long we keep it",
        "body": [
          "Enquiries that do not lead to a booking: up to two years after our last contact, then deleted.",
          "Booking and payment records: seven years after the end of your journey, for accounting, tax and legal claims.",
          "Health and mobility information: deleted within three months of your return, unless it is needed for a claim.",
          "Newsletter details: until you unsubscribe. Server logs: a short period set by our hosting provider, then deleted automatically."
        ]
      },
      {
        "heading": "How we protect it",
        "body": [
          "This website is served only over an encrypted (HTTPS) connection. Access to your data is limited to the people who need it to plan and look after your journey, and we choose providers for their security standards."
        ]
      },
      {
        "heading": "Your rights",
        "body": [
          "You have the right to access the personal data we hold about you; to have it rectified; to have it erased; to restrict how we use it; to receive it in a portable format; to object to processing based on our legitimate interests, and at any time to direct marketing; and to withdraw any consent you have given, without affecting what we did before.",
          "To exercise any of these rights, email aravia@tourground.com. It is free, and we will reply within one month. We may ask you to confirm your identity first.",
          "You also have the right to lodge a complaint with a data protection supervisory authority, in particular in the country where you live or work, or where you believe your rights were infringed. We would appreciate the chance to deal with your concern first.",
          "Because we are based in the United Arab Emirates, we also handle your personal data in line with Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data."
        ]
      },
      {
        "heading": "Cookies",
        "body": [
          "This website stores only what is needed for features you use, and no tracking cookies. Our [Cookie Policy](/en/legal/cookies) lists every item."
        ]
      },
      {
        "heading": "Children",
        "body": [
          "This website is not intended for children under 16, and we do not knowingly collect their data directly. Details of children who travel with their families are provided by, and used on behalf of, a parent or guardian."
        ]
      },
      {
        "heading": "Changes to this policy",
        "body": [
          "We may update this policy. The date at the top shows when it last changed; if a change matters to you, we will tell you before it applies."
        ]
      },
      {
        "heading": "Contact",
        "body": [
          "Aravia, The Executive Centre, Level 3, The Offices 3, One Central, Dubai World Trade Centre, Sheikh Zayed Road, Dubai, United Arab Emirates. Email: aravia@tourground.com."
        ]
      }
    ]
  },
  {
    "slug": "cookies",
    "title": "Cookie policy",
    "updated": "1 November 2026",
    "sections": [
      {
        "heading": "What cookies are",
        "body": [
          "Cookies are small text files a website places in your browser. Websites can also keep information on your device with similar technologies such as local storage and session storage. This policy covers all of them and applies to aravia.tourground.com."
        ]
      },
      {
        "heading": "What this website stores",
        "body": [
          "This website sets no cookies and stores nothing on your device. We do not use analytics, advertising or social-media cookies."
        ]
      },
      {
        "heading": "Consent",
        "body": [
          "Everything listed is strictly necessary for a feature you choose to use, or keeps your own preference on your own device, so the law does not require consent and we show no cookie banner. If we ever add analytics or other optional cookies, we will ask for your consent first and update this page."
        ]
      },
      {
        "heading": "Hosting and third-party content",
        "body": [
          "Pages are delivered by our hosting provider, Vercel, which processes your IP address and request details in its server logs to serve the site and protect it from attacks. It sets no tracking cookies on this site.",
          "Photographs are optimised by our hosting provider and delivered from our own domain, so your browser does not contact a third-party image service. There are no chat widgets, maps or social media embeds.",
          "Fonts are served from our own domain, so no font service receives your data."
        ]
      },
      {
        "heading": "How to manage or delete them",
        "body": [
          "You can delete everything this website stores at any time by clearing your browser’s cookies and site data for it, and you can block cookies and site storage in your browser settings. The site will still work; you will simply lose the saved preference."
        ]
      },
      {
        "heading": "Changes",
        "body": [
          "We will update this page whenever the way this website stores information changes. The date at the top shows when it last changed."
        ]
      },
      {
        "heading": "Contact",
        "body": [
          "Questions about this policy: aravia@tourground.com. Aravia, The Executive Centre, Level 3, The Offices 3, One Central, Dubai World Trade Centre, Sheikh Zayed Road, Dubai, United Arab Emirates. See also our [Privacy Policy](/en/legal/privacy-policy)."
        ]
      }
    ]
  },
];

export const legalBySlug = Object.fromEntries(legalDocs.map((d) => [d.slug, d])) as Record<string, LegalDoc>;
