import Link from "next/link";
import type { Service } from "@/data/services";
import { Photo } from "@/components/ui/Photo";
import { ToConfirm } from "@/components/ui/ToConfirm";

/** Offerings as hairline rows: name, a small photograph, a line of description. */
export function OfferingRows({ items, hrefFor }: { items: Service[]; hrefFor: (slug: string) => string }) {
  return (
    <ul className="border-t border-midnight-700">
      {items.map((s) => (
        <li key={s.slug} className="border-b border-midnight-700">
          <Link
            href={hrefFor(s.slug)}
            className="group grid items-center gap-x-10 gap-y-3 py-7 md:grid-cols-[minmax(0,1.1fr)_9rem_minmax(0,1fr)_auto] md:py-8"
          >
            <span className="font-display text-[clamp(1.75rem,1.2rem+1.6vw,2.5rem)] leading-tight transition-colors duration-700 group-hover:text-brass-300">
              {s.name}
              {s.confirm && <ToConfirm />}
            </span>
            <span aria-hidden className="relative hidden aspect-[4/3] overflow-hidden md:block">
              <Photo name={s.photo} sizes="144px" alt="" className="transition-transform duration-[1600ms] ease-sand group-hover:scale-110" />
            </span>
            <span className="text-ivory-300">{s.summary}</span>
            <span aria-hidden className="hidden text-2xl text-ivory-500 transition-transform duration-700 group-hover:translate-x-1 md:block rtl:rotate-180">
              →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
