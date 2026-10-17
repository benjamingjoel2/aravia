import Link from "next/link";
import type { ReactNode } from "react";
import type { PhotoKey } from "@/data/photos";
import { Photo } from "./Photo";
import { LatticeHover } from "@/components/motif";

type Props = { href: string; title: string; meta?: ReactNode; children?: ReactNode; photo?: PhotoKey; sizes?: string };

/** Tall portrait card with the title over the photograph; a lattice plate when there is no photograph. */
export function PhotoCard({ href, title, meta, children, photo, sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" }: Props) {
  return (
    <Link href={href} className="lattice-host group relative block aspect-[4/5] overflow-hidden border border-midnight-800 bg-midnight-900">
      {photo ? (
        <Photo name={photo} sizes={sizes} alt="" className="transition-transform duration-[1800ms] ease-sand group-hover:scale-[1.05] motion-reduce:transition-none" />
      ) : (
        <>
          <span aria-hidden className="absolute inset-0 bg-gradient-to-br from-midnight-800 via-midnight-900 to-rose-900/70" />
          <span aria-hidden className="lattice-field absolute inset-0 text-brass-400 opacity-[0.07]" />
          <span aria-hidden className="absolute inset-x-0 top-[18%] text-center font-display text-[8rem] leading-none text-sand-300/15">
            {title.replace(/^The /, "").charAt(0)}
          </span>
          <LatticeHover />
        </>
      )}
      <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-midnight-950/95 via-midnight-950/30 to-transparent" />
      <span className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
        {meta && <span className="block text-[0.6875rem] tracking-[0.22em] text-sand-300 uppercase">{meta}</span>}
        <span className="mt-3 block font-display text-[1.75rem] leading-tight text-ivory-50 transition-colors duration-700 group-hover:text-brass-300">{title}</span>
        {children && <span className="mt-3 block text-sm text-ivory-300">{children}</span>}
      </span>
    </Link>
  );
}
