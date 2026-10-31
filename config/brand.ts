/**
 * Brand settings. The site shows no phone numbers, messaging apps, licence numbers or social links.
 */
export const brand = {
  name: "Aravia",
  wordmark: "ARAVIA",
  etymology: "From “Arabia” and “via”: the way through Arabia.",
  promise: "Ask, and consider it arranged.",
  description:
    "A private travel concierge for the Arab world, from the Gulf to the Levant and North Africa. One personal concierge designs your journey, then stays with you, day and night, for anything you need.",
  legalName: "Aravia",
  contact: {
    /** One address per brand: {brandname}@tourground.com. */
    email: "aravia@tourground.com",
    emailDisplay: "aravia@tourground.com",
  },
  /**
   * Business address: The Executive Centre at One Central, Dubai World Trade Centre (the owner-approved
   * coworking arrangement). Source: executivecentre.com, Dubai coworking locations.
   */
  address: {
    lines: ["The Executive Centre, Level 3, The Offices 3, One Central", "Dubai World Trade Centre, Sheikh Zayed Road", "Dubai, United Arab Emirates"],
    street: "The Executive Centre, Level 3, The Offices 3, One Central, Dubai World Trade Centre, Sheikh Zayed Road",
    locality: "Dubai",
    countryCode: "AE",
  },
} as const;

export type Brand = typeof brand;
