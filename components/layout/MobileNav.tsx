"use client";

import Link from "next/link";
import { useEffect } from "react";
import { brand } from "@/config/brand";
import type { NavItem } from "./Header";
import type { RegionNav } from "@/lib/nav";
import { LanguageSelector } from "./LanguageSelector";

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
          className="on-dark fade-in fixed inset-x-0 top-16 bottom-0 z-30 overflow-y-auto bg-ink text-cream lg:hidden"
        >
          <div className="container-page py-10">
            <ul className="space-y-1">
              {items.map((item, i) => (
                <li key={item.href} className="fade-up" style={{ animationDelay: `${0.05 * i}s` }}>
                  <Link href={item.href} onClick={onClose} className="block py-2 font-display text-[2rem] leading-tight tracking-[0.04em] uppercase hover:opacity-70">
                    {item.label}
                  </Link>
                  {item.href === destinationsHref && (
                    <div className="mt-2 mb-5 grid gap-6 border-s border-cream/30 ps-5">
                      {regions.map((region) => (
                        <div key={region.id}>
                          <Link href={region.href} onClick={onClose} className="eyebrow">
                            {region.name}
                          </Link>
                          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                            {region.countries.map((c) => (
                              <li key={c.href}>
                                <Link href={c.href} onClick={onClose} className="block py-1 text-cream/85 hover:text-cream">
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
            <LanguageSelector className="mt-12 border-t border-cream/25 pt-8" />
            <div className="mt-8 space-y-2 text-sm">
              <p>
                <a href={`mailto:${brand.contact.email}`} className="link-quiet">
                  {brand.contact.emailDisplay}
                </a>
              </p>
            </div>
          </div>
        </nav>
      )
  );
}
