import { LatticeRule } from "@/components/motif";
import { brand } from "@/config/brand";

/** Temporary home. Replaced in step 3. */
export default function Home() {
  return (
    <section className="container-page flex min-h-[80dvh] flex-col items-center justify-center pt-20 text-center">
      <p className="eyebrow">Private travel concierge · The Arab world</p>
      <h1 className="mt-8 text-display-xl">{brand.promise}</h1>
      <LatticeRule className="mt-12 w-full max-w-md" />
    </section>
  );
}
