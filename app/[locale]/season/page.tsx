import type { Metadata } from "next";
import { events } from "@/data/events";
import { SeasonCalendar } from "@/components/season/SeasonCalendar";

export const metadata: Metadata = {
  title: "The Season",
  description:
    "The Arab world's season, from Formula 1 weekends to art fairs, music festivals and Saharan gatherings. Request access through your Aravia concierge.",
};

export default function SeasonPage() {
  return (
    <div className="container-page pt-40 pb-32 sm:pt-48">
      <header className="max-w-3xl">
        <p className="eyebrow">The Season</p>
        <h1 className="mt-6 text-display-lg">From the first cool evenings to the last warm ones.</h1>
        <p className="mt-8 text-lg text-ivory-300">
          The region’s season runs from autumn to spring, with summer festivals in the mountains and by the sea. Choose what interests you
          and ask us for access. We request it on your behalf; we never promise tickets.
        </p>
        <p className="mt-6 text-sm text-ivory-500">
          Dates move every year, and some events are not held every year. Every listing is a guide only: verify yearly.
        </p>
      </header>
      <div className="mt-16">
        <SeasonCalendar events={events} />
      </div>
    </div>
  );
}
