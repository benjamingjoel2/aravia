"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/motif";
import { AskButton } from "@/components/ask/AskButton";
import { MobileNav } from "./MobileNav";
import { DestinationsMenu } from "./DestinationsMenu";
import type { RegionNav } from "@/lib/nav";

export type NavItem = { href: string; label: string };

type Props = {
  homeHref: string;
  items: NavItem[];
  mobileItems: NavItem[];
  /** Nav item href that opens the grouped destinations menu instead of linking directly. */
  destinationsHref: string;
  regions: RegionNav[];
  labels: { ask: string; menu: string; close: string; home: string; allDestinations: string };
};

export function Header({ homeHref, items, mobileItems, destinationsHref, regions, labels }: Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-700 ease-sand ${
        scrolled || menuOpen
          ? "border-b border-midnight-700/70 bg-midnight-950/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-page flex h-20 items-center justify-between gap-6">
        <Link href={homeHref} className="relative z-10 -my-2 py-2" aria-label={`Aravia, ${labels.home}`}>
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {items.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              if (item.href === destinationsHref) {
                return (
                  <li key={item.href}>
                    <DestinationsMenu label={item.label} allLabel={labels.allDestinations} href={item.href} regions={regions} active={active} />
                  </li>
                );
              }
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`link-quiet text-[0.8125rem] tracking-[0.14em] ${active ? "text-brass-300" : ""}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="relative z-10 flex items-center gap-2">
          <AskButton source="header" className="btn-brass !min-h-10 !px-4 !py-2 !text-[0.6875rem] whitespace-nowrap sm:!px-5">
            {labels.ask}
          </AskButton>
          <button
            ref={menuButton}
            type="button"
            className="flex h-11 w-11 items-center justify-center text-ivory-50 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="sr-only">{menuOpen ? labels.close : labels.menu}</span>
            <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1">
              {menuOpen ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M3 8h18M3 16h18" />}
            </svg>
          </button>
        </div>
      </div>
    </header>

      <MobileNav
        open={menuOpen}
        items={mobileItems}
        destinationsHref={destinationsHref}
        regions={regions}
        onClose={() => {
          setMenuOpen(false);
          menuButton.current?.focus();
        }}
      />
    </>
  );
}
