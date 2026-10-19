import Link from "next/link";
import type { ReactNode } from "react";
import type { PhotoKey } from "@/data/photos";
import { Photo } from "./Photo";
import { LatticeHover } from "@/components/motif";

type Props = { href: string; title: string; meta?: ReactNode; children?: ReactNode; photo?: PhotoKey; sizes?: string };

/** Tall portrait card with the title over the photograph; a lattice plate when there is no photograph. */
export function PhotoCard({ href, title, meta, children, photo, sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" }: Props) {
  return (
    <Link href={href} className={`lattice-host group relative block aspect-[4/5] overflow-hidden bg-paper-2 ${photo ? "on-dark text-cream" : "text-ink"}`}>
      {photo ? (
        <Photo name={photo} sizes={sizes} alt="" className="transition-transform duration-[1800ms] ease-sand group-hover:scale-[1.05] motion-reduce:transition-none" />
      ) : (
        <>
          <span aria-hidden className="absolute inset-0 bg-gradient-to-br from-sand-200 via-paper-2 to-rose-200" />
          <span aria-hidden className="lattice-field absolute inset-0 text-brass-600 opacity-[0.12]" />
          <span aria-hidden className="absolute inset-x-0 top-[16%] text-center font-display text-[9rem] leading-none text-accent/25">
            {title.replace(/^The /, "").charAt(0)}
          </span>
          <LatticeHover />
        </>
      )}
      {photo && <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />}
      <span className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
        {meta && <span className="block text-[0.6875rem] font-medium tracking-[0.16em] uppercase opacity-80">{meta}</span>}
        <span className="mt-3 block font-display text-[2rem] leading-[1.05]">{title}</span>
        {children && <span className="mt-3 block text-sm opacity-85">{children}</span>}
      </span>
    </Link>
  );
}
