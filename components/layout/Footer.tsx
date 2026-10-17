import Link from "next/link";
import { brand } from "@/config/brand";
import { footerNav, legalNav } from "@/config/site";
import type { Locale } from "@/config/i18n";
import type { Dictionary } from "@/dictionaries/en";
import { localePath } from "@/lib/paths";
import { LatticeRule, Logo } from "@/components/motif";
import { whatsappLink } from "@/lib/whatsapp";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-midnight-800 bg-midnight-950">
      <LatticeRule variant="strip" className="-mt-4" />
      <div className="container-page grid gap-16 pt-16 pb-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Link href={localePath(locale, "/")} aria-label="Aravia">
            <Logo />
          </Link>
          <p className="mt-8 max-w-xs font-display text-2xl leading-snug text-ivory-50">{brand.promise}</p>
          <p className="mt-6 max-w-xs text-sm text-ivory-300">{dict.footer.discretionLine}</p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-5">
          {footerNav.map((group) => (
            <div key={group.key}>
              <h2 className="eyebrow">{dict.footer[group.key]}</h2>
              <ul className="mt-5 space-y-3 text-sm">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={localePath(locale, link.href)} className="link-quiet text-ivory-300">
                      {dict.nav[link.key]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="lg:col-span-3">
          <h2 className="eyebrow">{dict.footer.reach}</h2>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a href={whatsappLink()} className="link-quiet text-ivory-300" rel="noopener">
                {dict.footer.whatsapp} · {brand.contact.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${brand.contact.email}`} className="link-quiet text-ivory-300">
                {dict.footer.email} · {brand.contact.emailDisplay}
              </a>
            </li>
          </ul>
          <h2 className="eyebrow mt-10">{dict.footer.licences}</h2>
          <ul className="mt-5 space-y-2 text-xs text-ivory-500">
            {brand.licences.map((l) => (
              <li key={l.label}>
                {l.country}: {l.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-page flex flex-col gap-4 border-t border-midnight-800 py-8 text-xs text-ivory-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {brand.legalName}. {dict.footer.rights}
        </p>
        <ul className="flex flex-wrap gap-6">
          {legalNav.map((l) => (
            <li key={l.href}>
              <Link href={localePath(locale, l.href)} className="link-quiet text-ivory-500">
                {dict.nav[l.key]}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
