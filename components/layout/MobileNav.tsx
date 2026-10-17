"use client";

import Link from "next/link";
import { useEffect } from "react";
import { LatticeRule } from "@/components/motif";
import type { NavItem } from "./Header";
import type { RegionNav } from "@/lib/nav";

type Props = { open: boolean; items: NavItem[]; destinationsHref: string; regions: RegionNav[]; onClose: () => void };

export function MobileNav({ open, items, destinationsHref, regions, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    open && (
        <nav
          id="mobile-nav"
          aria-label="Menu"
          className="fade-in fixed inset-x-0 top-20 bottom-0 z-30 overflow-y-auto bg-midnight-950 lg:hidden"
        >
          <div className="container-page py-10">
            <ul className="space-y-1">
              {items.map((item, i) => (
                <li key={item.href} className="fade-up" style={{ animationDelay: `${0.05 * i}s` }}>
                  <Link href={item.href} onClick={onClose} className="block py-2.5 font-display text-3xl text-ivory-50 hover:text-brass-300">
                    {item.label}
                  </Link>
                  {item.href === destinationsHref && (
                    <div className="mt-2 mb-5 grid gap-6 border-s border-midnight-700 ps-5">
                      {regions.map((region) => (
                        <div key={region.id}>
                          <Link href={region.href} onClick={onClose} className="eyebrow">
                            {region.name}
                          </Link>
                          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                            {region.countries.map((c) => (
                              <li key={c.href}>
                                <Link href={c.href} onClick={onClose} className="block py-1 text-ivory-300 hover:text-brass-300">
                                  {c.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <LatticeRule variant="strip" className="mt-12" />
          </div>
        </nav>
      )
  );
}
