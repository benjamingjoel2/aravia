import type { Metadata } from "next";
import { alternates } from "@/lib/seo";
import { JourneyComposer } from "@/components/composer/JourneyComposer";

export const metadata: Metadata = {
  alternates: alternates("/journey-composer"),
  title: "Journey Composer",
  description:
    "Combine two to four places across the Gulf, the Levant and North Africa. See a suggested order, approximate travel times, how long to stay and when to go.",
};

export default function JourneyComposerPage() {
  return (
    <div className="container-page pt-40 pb-32 sm:pt-48">
      <header className="max-w-3xl">
        <p className="eyebrow">Journey Composer</p>
        <h1 className="mt-6 text-display-lg">Many journeys, one concierge.</h1>
        <p className="mt-8 text-lg text-ink-2">
          Many of our guests combine countries: the Gulf with Petra, Cairo with Marrakech, AlUla with the Red Sea. Choose the places that
          call to you and we will suggest an order, the time between them, how long to stay and when to go. Your concierge then makes it
          yours.
        </p>
      </header>
      <div className="mt-20">
        <JourneyComposer />
      </div>
    </div>
  );
}
