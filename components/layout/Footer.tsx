import Link from "next/link";
import { brand } from "@/config/brand";
import { footerNav, legalNav } from "@/config/site";
import type { Locale } from "@/config/i18n";
import type { Dictionary } from "@/dictionaries/en";
import { localePath } from "@/lib/paths";
import { GiantWordmark } from "@/components/home/GiantWordmark";
import { regionNav } from "@/lib/nav";
import { FooterForm } from "./FooterForm";

/** Green footer after Sylver: the request form first, then the site map, the name set large and the legal line. */
export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark relative mt-auto overflow-hidden bg-ink text-cream">
      <div className="container-page grid gap-14 pt-20 pb-16 lg:grid-cols-12 lg:pt-28">
        <div className="lg:col-span-5">
          <h2 className="text-display-md">Ask your concierge</h2>
          <p className="mt-6 max-w-sm">{dict.footer.discretionLine}</p>
          <ul className="mt-10 space-y-3 text-[0.9375rem]">
            <li>
              <a href={`mailto:${brand.contact.email}`} className="link-quiet">
                {dict.footer.email} · {brand.contact.emailDisplay}
              </a>
            </li>
            <li className="text-cream/85">{brand.address.lines.join(", ")}</li>
          </ul>
        </div>
        <div className="lg:col-span-7">
          <FooterForm
            locale={locale}
            labels={{
              name: dict.ask.name,
              phone: dict.ask.phone,
              email: dict.ask.email_,
              request: dict.ask.yourRequest,
              privacy: dict.ask.privacy,
              replyBy: "How should we reply?",
              channels: { callback: "A call back", email: "Email" },
              submit: "Send request",
              sent: "Thank you. Your concierge has your request and will be in touch shortly.",
            }}
          />
        </div>
      </div>

      <nav aria-label="Footer" className="container-page grid grid-cols-2 gap-10 border-t border-cream/25 pt-12 pb-10 sm:grid-cols-4">
        <div>
          <h2 className="eyebrow">{dict.footer.regions}</h2>
          <ul className="mt-5 space-y-2.5 text-[0.9375rem]">
            {regionNav(locale).map((r) => (
              <li key={r.id}>
                <Link href={r.href} className="link-quiet">
                  {r.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {footerNav.map((group) => (
          <div key={group.key}>
            <h2 className="eyebrow">{dict.footer[group.key]}</h2>
            <ul className="mt-5 space-y-2.5 text-[0.9375rem]">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={localePath(locale, link.href)} className="link-quiet">
                    {dict.nav[link.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* The name, set across the width and cut by the foot of the page */}
      <div aria-hidden className="container-page -mb-[4%] pt-10 text-cream/20">
        <GiantWordmark />
      </div>
      <div className="relative bg-ink">
        <div className="container-page flex flex-col gap-4 border-t border-cream/25 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {brand.name}. {dict.footer.rights}
          </p>
          <ul className="flex flex-wrap gap-6">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={localePath(locale, l.href)} className="link-quiet">
                  {dict.nav[l.key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
