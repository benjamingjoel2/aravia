import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter_Tight } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { brand } from "@/config/brand";
import { primaryNav, site } from "@/config/site";
import { dirFor, isLocale, locales } from "@/config/i18n";
import { getDictionary } from "@/lib/i18n";
import { localePath } from "@/lib/paths";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AskProvider } from "@/components/ask/AskProvider";
import { regionNav } from "@/lib/nav";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const sans = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export const viewport: Viewport = {
  themeColor: "#f3eee4",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${brand.name}: private travel concierge for the Arab world`, template: `%s · ${brand.name}` },
  description: brand.description,
  applicationName: brand.name,
  openGraph: { siteName: brand.name, type: "website" },
  formatDetection: { telephone: false },
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  const items = primaryNav.map((n) => ({ href: localePath(locale, n.href), label: dict.nav[n.key] }));
  const mobileItems = [
    ...items,
    { href: localePath(locale, "/travelling-with-grace"), label: dict.nav.grace },
    { href: localePath(locale, "/about"), label: dict.nav.about },
    { href: localePath(locale, "/journal"), label: dict.nav.journal },
    { href: localePath(locale, "/contact"), label: dict.nav.contact },
  ];

  return (
    <html lang={locale} dir={dirFor(locale)} className={`${display.variable} ${sans.variable}`}>
      <head>
        {/* Without JavaScript, scroll reveals never run: show everything. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          {dict.skipToContent}
        </a>
        <AskProvider labels={dict.ask} closeLabel={dict.nav.close} locale={locale}>
          <Header
            homeHref={localePath(locale, "/")}
            items={items}
            mobileItems={mobileItems}
            destinationsHref={localePath(locale, "/destinations")}
            regions={regionNav(locale)}
            labels={{ ask: dict.ask.cta, menu: dict.nav.menu, close: dict.nav.close, home: dict.nav.home, allDestinations: dict.nav.allDestinations }}
          />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer locale={locale} dict={dict} />
        </AskProvider>
      </body>
    </html>
  );
}
