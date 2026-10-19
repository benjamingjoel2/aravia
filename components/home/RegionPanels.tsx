import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import type { PhotoKey } from "@/data/photos";

export type RegionPanel = { id: string; name: string; intro: string; href: string; photo: PhotoKey; countries: string[] };

/**
 * Three tall photographs side by side; the one under the pointer or focus widens and reveals its countries.
 * On small screens they stack.
 */
export function RegionPanels({ regions }: { regions: RegionPanel[] }) {
  return (
    <ul className="group/panels flex flex-col gap-2 md:h-[78vh] md:min-h-[34rem] md:flex-row">
      {regions.map((r) => (
        <li
          key={r.id}
          className="relative h-[62vh] min-h-[24rem] overflow-hidden md:h-auto md:flex-1 md:transition-[flex-grow] md:duration-[1200ms] md:ease-sand md:hover:flex-[2.2] md:focus-within:flex-[2.2] motion-reduce:transition-none"
        >
          <Link href={r.href} className="on-dark group absolute inset-0 block text-cream focus-visible:outline-offset-[-6px]">
            <Photo name={r.photo} sizes="(min-width: 768px) 60vw, 100vw" alt="" className="transition-transform duration-[2000ms] ease-sand group-hover:scale-[1.04] motion-reduce:transition-none" />
            <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 p-7 sm:p-10">
              <span className="block font-display text-display-lg leading-none">{r.name}</span>
              <span className="mt-4 block max-w-sm text-[0.9375rem] text-cream/90 md:opacity-0 md:transition-opacity md:duration-700 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
                {r.intro}
              </span>
              <span className="mt-5 block text-[0.6875rem] font-medium tracking-[0.16em] text-cream/80 uppercase">{r.countries.join(" · ")}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
