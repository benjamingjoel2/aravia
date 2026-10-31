"use client";

import { usePathname } from "next/navigation";
import { allLocales, locales } from "@/config/i18n";
import { locale as current } from "@/config/locale";

/**
 * EN · FR · DE · ES. Each link opens the same page in that language (a plain link: every language is its own
 * pre-rendered site, so there is nothing to load in the browser). No automatic redirects by browser language.
 */
export function LanguageSelector({ className = "" }: { className?: string }) {
  const pathname = usePathname() || `/${current}`;
  const rest = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "");
  return (
    <nav aria-label="Language" className={className}>
      <ul className="flex items-center gap-1 text-[0.8125rem] tracking-[0.12em]">
        {locales.map((l, i) => (
          <li key={l} className="flex items-center gap-1">
            {i > 0 && (
              <span aria-hidden className="opacity-50">
                ·
              </span>
            )}
            <a
              href={`/${l}${rest}`}
              hrefLang={allLocales[l].hreflang}
              lang={allLocales[l].hreflang}
              aria-label={allLocales[l].label}
              aria-current={l === current ? "true" : undefined}
              className={`link-quiet inline-flex min-h-6 items-center px-0.5 ${l === current ? "font-bold" : "opacity-75 hover:opacity-100"}`}
            >
              {allLocales[l].short}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
