import type { Metadata } from "next";
import { Instrument_Serif, Inter_Tight } from "next/font/google";
import "./globals.css";
import { NotFoundContent } from "@/components/ui/NotFoundContent";
import { defaultLocale } from "@/config/i18n";

const display = Instrument_Serif({ subsets: ["latin"], weight: ["400"], variable: "--font-instrument", display: "swap" });
const sans = Inter_Tight({ subsets: ["latin"], weight: ["300", "400"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = { title: "Not found · Aravia", robots: { index: false } };

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <main>
          <NotFoundContent homeHref={`/${defaultLocale}`} />
        </main>
      </body>
    </html>
  );
}
