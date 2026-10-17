import { brand } from "@/config/brand";

/** wa.me link to the concierge line, optionally with a pre-filled message. */
export function whatsappLink(text?: string) {
  const base = `https://wa.me/${brand.contact.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
