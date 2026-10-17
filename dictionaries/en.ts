/** UI strings. Content lives in /data; this file holds labels, buttons and form copy. */
export const en = {
  skipToContent: "Skip to content",
  nav: {
    home: "Home",
    howItWorks: "How it works",
    services: "What we arrange",
    destinations: "Where we take you",
    season: "The Season",
    composer: "Journey Composer",
    grace: "Travelling with grace",
    ramadan: "Travelling during Ramadan",
    discretion: "Discretion",
    about: "About",
    journal: "Journal",
    contact: "Contact",
    terms: "Terms",
    privacyPolicy: "Privacy policy",
    cookies: "Cookies",
    menu: "Menu",
    close: "Close",
  },
  footer: {
    arrange: "Arrange",
    guidance: "Guidance",
    house: "The house",
    licences: "Licences",
    reach: "Your concierge",
    whatsapp: "WhatsApp",
    email: "Email",
    rights: "All rights reserved.",
    discretionLine: "We never name our clients. They prefer it that way, and so do we.",
  },
  ask: {
    cta: "Ask Aravia",
    label: "What would you like arranged?",
    submit: "Continue",
    toConfirm: "to confirm",
  },
} as const;

export type Dictionary = typeof en;
