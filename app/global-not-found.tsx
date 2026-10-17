import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { NotFoundContent } from "@/components/ui/NotFoundContent";
import { defaultLocale } from "@/config/i18n";

const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["400"], variable: "--font-cormorant", display: "swap" });
const sans = Jost({ subsets: ["latin"], weight: ["300", "400"], variable: "--font-jost", display: "swap" });

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
