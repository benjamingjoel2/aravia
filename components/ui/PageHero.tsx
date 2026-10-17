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

/**
 * A full-width page opening with the title set large over a photograph.
 * Without a photograph, a quiet typographic plate with a lattice field stands in.
 */
export function PageHero({ eyebrow, title, intro, photo, illustrative, top }: Props) {
  return (
    <section className="relative flex min-h-[78svh] items-end overflow-hidden pt-36 pb-16 sm:pb-20">
      <div aria-hidden className="absolute inset-0">
        {photo ? (
          <>
            <Parallax className="h-full" distance={40}>
              <div className="relative h-full w-full">
                <Photo name={photo} sizes="100vw" preload alt="" />
              </div>
            </Parallax>
            <div className="absolute inset-0 bg-midnight-950/35" />
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-midnight-950/80 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-midnight-950 via-midnight-950/60 to-transparent" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-midnight-950 via-midnight-900 to-rose-900/60" />
            <div className="lattice-field absolute inset-0 text-brass-400 opacity-[0.09]" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-midnight-950 to-transparent" />
          </>
        )}
      </div>
      <div className="container-page relative w-full">
        {top}
        {eyebrow && (
          <p className="rise eyebrow mt-6">{eyebrow}</p>
        )}
        <div className="rise">
          <h1 className="mt-5 max-w-5xl font-display text-[clamp(3rem,1.5rem+6vw,7.5rem)] leading-[0.95] tracking-[0.02em]">{title}</h1>
        </div>
        {intro && (
          <div className="rise mt-8 max-w-2xl text-lg text-ivory-50/85" style={{ animationDelay: "0.15s" }}>
            {intro}
          </div>
        )}
        {photo && illustrative && <p className="mt-8 text-[0.6875rem] tracking-[0.18em] text-ivory-300/70 uppercase">Illustrative photograph</p>}
      </div>
    </section>
  );
}
