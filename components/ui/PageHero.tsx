import type { ReactNode } from "react";
import type { PhotoKey } from "@/data/photos";
import { Photo } from "./Photo";
import { Parallax } from "@/components/motion/Parallax";

type Props = {
  eyebrow?: ReactNode;
  title: string;
  intro?: ReactNode;
  photo?: PhotoKey;
  /** The photo shows similar landscape, not this exact place. */
  illustrative?: boolean;
  /** Content above the eyebrow, e.g. a breadcrumb. */
  top?: ReactNode;
};

const titleClass = "font-display text-[clamp(3.25rem,1.4rem+7vw,8.5rem)] leading-[0.92] tracking-[-0.015em]";

/**
 * A page opening. With a photograph: full bleed, the title set very large in light type over it.
 * Without: an editorial opening on paper.
 */
export function PageHero({ eyebrow, title, intro, photo, illustrative, top }: Props) {
  if (!photo) {
    return (
      <section className="container-page pt-36 pb-16 sm:pt-44 sm:pb-20">
        {top}
        {eyebrow && <p className="rise eyebrow mt-8">{eyebrow}</p>}
        <h1 className={`rise mt-6 max-w-6xl ${titleClass}`}>{title}</h1>
        {intro && (
          <div className="rise mt-10 max-w-2xl text-xl text-ink-2" style={{ animationDelay: "0.15s" }}>
            {intro}
          </div>
        )}
      </section>
    );
  }

  return (
    <section data-hero-photo className="on-dark relative flex min-h-[88svh] items-end overflow-hidden pt-36 pb-14 text-cream sm:pb-16">
      <div aria-hidden className="absolute inset-0">
        <Parallax className="h-full" distance={40}>
          <div className="relative h-full w-full">
            <Photo name={photo} sizes="100vw" preload alt="" />
          </div>
        </Parallax>
        <div className="absolute inset-0 bg-black/15" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>
      <div className="container-page relative w-full">
        {top}
        {eyebrow && <p className="rise eyebrow mt-6 !text-cream/85">{eyebrow}</p>}
        <h1 className={`rise mt-5 max-w-6xl ${titleClass}`}>{title}</h1>
        <div className="mt-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          {intro && (
            <div className="rise max-w-2xl text-lg text-cream/90" style={{ animationDelay: "0.15s" }}>
              {intro}
            </div>
          )}
          {illustrative && <p className="shrink-0 text-[0.6875rem] tracking-[0.16em] text-cream/70 uppercase">Illustrative photograph</p>}
        </div>
      </div>
    </section>
  );
}
