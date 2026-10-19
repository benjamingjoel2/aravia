import type { PhotoKey } from "@/data/photos";
import { Photo } from "@/components/ui/Photo";

type Step = { title: string; body: string };

/**
 * Steps that scroll over a pinned photograph: the image holds still while each step rises past it.
 * Pure CSS (position: sticky), so it works without JavaScript.
 */
export function StickySteps({ photo, steps, label }: { photo: PhotoKey; steps: Step[]; label: string }) {
  return (
    <section aria-label={label} className="on-dark relative bg-midnight-950 text-cream">
      <div aria-hidden className="sticky top-0 -mb-[100svh] h-[100svh] overflow-hidden">
        <Photo name={photo} sizes="100vw" alt="" />
        <div className="absolute inset-0 bg-black/35" />
      </div>
      <ol>
        {steps.map((s, i) => (
          <li key={s.title} className="relative flex min-h-[100svh] items-center">
            <div className="container-page">
              <div className="max-w-3xl">
                <span className="font-display text-display-sm text-sand-300">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-display text-[clamp(2.75rem,1.5rem+5vw,6rem)] leading-[0.95]">{s.title}</h3>
                <p className="mt-8 max-w-xl text-xl text-cream/90">{s.body}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
