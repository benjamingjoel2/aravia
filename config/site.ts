export const site = {
  /** Replace with the production domain once chosen. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aravia.example",
  /** Show "[to confirm]" markers next to claims that still need the owner's confirmation. */
  showPlaceholders: process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS !== "false",
  /** Privacy-friendly, cookieless analytics only. Leave null for none. */
  analytics: null as null | { provider: "plausible" | "vercel"; domain?: string },
} as const;

/** Primary navigation. Paths are locale-relative. */
export const primaryNav = [
  { href: "/how-it-works", key: "howItWorks" },
  { href: "/services", key: "services" },
  { href: "/destinations", key: "destinations" },
  { href: "/season", key: "season" },
  { href: "/journey-composer", key: "composer" },
] as const;

export const footerNav = [
  {
    key: "arrange",
    links: [
      { href: "/services", key: "services" },
      { href: "/destinations", key: "destinations" },
      { href: "/season", key: "season" },
      { href: "/journey-composer", key: "composer" },
    ],
  },
  {
    key: "guidance",
    links: [
      { href: "/how-it-works", key: "howItWorks" },
      { href: "/travelling-with-grace", key: "grace" },
      { href: "/travelling-with-grace/ramadan", key: "ramadan" },
      { href: "/journal", key: "journal" },
    ],
  },
  {
    key: "house",
    links: [
      { href: "/about", key: "about" },
      { href: "/discretion", key: "discretion" },
      { href: "/contact", key: "contact" },
    ],
  },
] as const;

export const legalNav = [
  { href: "/legal/terms", key: "terms" },
  { href: "/legal/privacy-policy", key: "privacyPolicy" },
  { href: "/legal/cookies", key: "cookies" },
] as const;
