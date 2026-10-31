import { z } from "zod";

export const channels = ["callback", "email"] as const;
export type Channel = (typeof channels)[number];

export const sources = ["hero", "header", "season", "composer", "destination", "service", "contact", "page"] as const;

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : undefined));

/** A request to the concierge, as sent by Ask Aravia (JSON) or by the no-JavaScript form (form data). */
export const conciergeRequestSchema = z
  .object({
    message: z.string().trim().min(3, "Please tell us a little about what you would like arranged.").max(2000),
    channel: z.enum(channels),
    name: optionalText(120),
    phone: optionalText(40),
    email: z
      .string()
      .trim()
      .max(200)
      .optional()
      .transform((v) => (v ? v : undefined))
      .pipe(z.email("Please check the email address.").optional()),
    preferredTime: optionalText(120),
    timezone: optionalText(80),
    source: z.enum(sources).default("page"),
    ref: optionalText(200),
    locale: z.string().max(10).default("en"),
    /** Honeypot. Real visitors never see or fill this field. */
    website: z.string().max(0).optional(),
  })
  .superRefine((r, ctx) => {
    if (r.channel === "callback" && !r.phone) {
      ctx.addIssue({ code: "custom", path: ["phone"], message: "Please add a number we can call, with the country code." });
    }
    if (r.channel === "email" && !r.email) {
      ctx.addIssue({ code: "custom", path: ["email"], message: "Please add an email address." });
    }
  });

export type ConciergeRequestInput = z.input<typeof conciergeRequestSchema>;
export type ConciergeRequest = z.output<typeof conciergeRequestSchema>;
