import Link from "next/link";
import { brand } from "@/config/brand";
import { footerNav, legalNav } from "@/config/site";
import type { Locale } from "@/config/i18n";
import type { Dictionary } from "@/dictionaries/en";
import { localePath } from "@/lib/paths";

/** Minimal green footer: one row with the name, the pages and the email; one row with ©, the address and the legal links. */
export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();
  type NavLink = { href: string; key: keyof Dictionary["nav"] };
  const links: NavLink[] = footerNav.flatMap((group): readonly NavLink[] => group.links);
  return (
    <footer className="on-dark relative mt-auto bg-ink text-cream">
      <div className="container-page flex flex-col gap-8 pt-14 pb-10 lg:flex-row lg:items-start lg:justify-between lg:gap-12 lg:pt-16">
        <div className="shrink-0">
          <p className="font-display text-[1.5rem] tracking-[0.28em] uppercase">{brand.name}</p>
          <p className="mt-3 max-w-xs text-[0.9375rem] text-cream/85">{dict.footer.discretionLine}</p>
        </div>
        <nav aria-label="Footer" className="lg:max-w-[44rem]">
          <ul className="flex flex-wrap gap-x-7 gap-y-3 text-[0.9375rem]">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={localePath(locale, link.href)} className="link-quiet">
                  {dict.nav[link.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="shrink-0 text-[0.9375rem]">
          <a href={`mailto:${brand.contact.email}`} className="link-quiet">
            {brand.contact.emailDisplay}
          </a>
        </p>
      </div>
      <div className="container-page flex flex-col gap-4 border-t border-cream/25 py-6 text-xs lg:flex-row lg:items-center lg:justify-between">
        <p>
          © {year} {brand.name}. {dict.footer.rights}
        </p>
        <p className="text-cream/80">{brand.address.lines.join(", ")}</p>
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
    </footer>
  );
}
