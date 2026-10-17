import { ImageResponse } from "next/og";
import { brand } from "@/config/brand";
import { locales } from "@/config/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const alt = `${brand.name}: ${brand.promise}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Shared-link image: midnight, a brass star, the wordmark and the promise. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #0b0e1f 0%, #12162e 55%, #3a2428 100%)",
          color: "#f6f1e7",
        }}
      >
        <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#c8a35f" strokeWidth="0.8">
          <path d="M5.64 5.64h12.72v12.72H5.64Z" />
          <path d="M12 3 21 12 12 21 3 12Z" />
          <circle cx="12" cy="12" r="1.6" fill="#c8a35f" stroke="none" />
        </svg>
        <div style={{ marginTop: 36, fontSize: 64, letterSpacing: "0.42em", paddingLeft: "0.42em" }}>{brand.wordmark}</div>
        <div style={{ marginTop: 28, width: 240, height: 1, background: "#c8a35f", opacity: 0.6 }} />
        <div style={{ marginTop: 28, fontSize: 34, color: "#e3cfa8" }}>{brand.promise}</div>
        <div style={{ marginTop: 18, fontSize: 20, letterSpacing: "0.3em", color: "#cfc7b8" }}>PRIVATE TRAVEL CONCIERGE · THE ARAB WORLD</div>
      </div>
    ),
    size,
  );
}
