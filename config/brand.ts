/**
 * Brand settings. Everything in [BRACKETS] is a placeholder to be supplied before launch.
 */
export const brand = {
  name: "Aravia",
  wordmark: "ARAVIA",
  etymology: "From “Arabia” and “via”: the way through Arabia.",
  promise: "Ask, and consider it arranged.",
  description:
    "A private travel concierge for the Arab world, from the Gulf to the Levant and North Africa. One personal concierge designs your journey, then stays with you, day and night, for anything you need.",
  legalName: "[COMPANY NAME]",
  contact: {
    /** International format, digits only, used for wa.me links. */
    whatsapp: "971000000000",
    whatsappDisplay: "[WHATSAPP NUMBER]",
    email: "concierge@aravia.example",
    emailDisplay: "[CONCIERGE EMAIL]",
  },
  licences: [
    { country: "United Arab Emirates", label: "[DUBAI DET LICENCE]" },
    { country: "Other countries of operation", label: "[OTHER LICENCES]" },
  ],
} as const;

export type Brand = typeof brand;
