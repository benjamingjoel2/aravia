import Link from "next/link";
import { brand } from "@/config/brand";
import { footerNav, legalNav } from "@/config/site";
import type { Locale } from "@/config/i18n";
import type { Dictionary } from "@/dictionaries/en";
import { localePath } from "@/lib/paths";
import { Logo } from "@/components/motif";
import { GiantWordmark } from "@/components/home/GiantWordmark";
import { whatsappLink } from "@/lib/whatsapp";
import { regionNav } from "@/lib/nav";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark mt-auto bg-midnight-900 text-cream">
      <div className="container-page grid gap-16 pt-16 pb-12 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <Link href={localePath(locale, "/")} aria-label="Aravia">
            <Logo />
          </Link>
          <p className="mt-8 max-w-xs font-display text-2xl leading-snug text-cream">{brand.promise}</p>
          <p className="mt-6 max-w-xs text-sm text-cream/70">{dict.footer.discretionLine}</p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-6">
          <div>
            <h2 className="eyebrow !text-cream/60">{dict.footer.regions}</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {regionNav(locale).map((r) => (
                <li key={r.id}>
                  <Link href={r.href} className="link-quiet text-cream/70">
                    {r.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {footerNav.map((group) => (
            <div key={group.key}>
              <h2 className="eyebrow !text-cream/60">{dict.footer[group.key]}</h2>
              <ul className="mt-5 space-y-3 text-sm">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={localePath(locale, link.href)} className="link-quiet text-cream/70">
                      {dict.nav[link.key]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="lg:col-span-3">
          <h2 className="eyebrow !text-cream/60">{dict.footer.reach}</h2>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a href={whatsappLink()} className="link-quiet text-cream/70" rel="noopener">
                {dict.footer.whatsapp} · {brand.contact.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${brand.contact.email}`} className="link-quiet text-cream/70">
                {dict.footer.email} · {brand.contact.emailDisplay}
              </a>
            </li>
          </ul>
          <h2 className="eyebrow mt-10 !text-cream/60">{dict.footer.licences}</h2>
          <ul className="mt-5 space-y-2 text-xs text-cream/55">
            {brand.licences.map((l) => (
              <li key={l.label}>
                {l.country}: {l.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-page pb-6">
        <GiantWordmark className="text-cream/90" />
      </div>
      <div className="container-page flex flex-col gap-4 border-t border-cream/15 py-8 text-xs text-cream/55 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {brand.legalName}. {dict.footer.rights}
        </p>
        <ul className="flex flex-wrap gap-6">
          {legalNav.map((l) => (
            <li key={l.href}>
              <Link href={localePath(locale, l.href)} className="link-quiet text-cream/55">
                {dict.nav[l.key]}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
