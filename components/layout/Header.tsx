"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/motif";
import { AskButton } from "@/components/ask/AskButton";
import { MobileNav } from "./MobileNav";
import { DestinationsMenu } from "./DestinationsMenu";
import { LanguageSelector } from "./LanguageSelector";
import type { RegionNav } from "@/lib/nav";

export type NavItem = { href: string; label: string };

type Props = {
  homeHref: string;
  items: NavItem[];
  mobileItems: NavItem[];
  /** Smaller links stacked under the main navigation, after Sylver. */
  secondaryItems: NavItem[];
  /** Nav item href that opens the grouped destinations menu instead of linking directly. */
  destinationsHref: string;
  regions: RegionNav[];
  labels: { ask: string; menu: string; close: string; home: string; allDestinations: string };
};

/**
 * Desktop: the wordmark top-left, underlined links top-right with a second row stacked beneath.
 * Over the homepage hero the wordmark steps aside (the hero sets it very large) and the type turns white.
 * Mobile: a solid green bar with the wordmark and a menu button.
 */
export function Header({ homeHref, items, mobileItems, secondaryItems, destinationsHref, regions, labels }: Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // True while a [data-hero-photo] section sits under the navigation (it may scroll sideways on the homepage).
  const [overHero, setOverHero] = useState(false);
  // The homepage scrolls sideways on desktop and keeps the header transparent throughout ([data-header-static]).
  const [staticHeader, setStaticHeader] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-hero-photo]");
    const keep = document.querySelector("[data-header-static]");
    const check = () => {
      setScrolled(window.scrollY > 24);
      setStaticHeader(Boolean(keep) && window.matchMedia("(min-width: 64rem)").matches);
      if (!hero) return setOverHero(false);
      const r = hero.getBoundingClientRect();
      // The navigation sits at the top right: the hero is under it while its right edge is past the middle of the screen.
      setOverHero(r.bottom > 120 && r.right > window.innerWidth * 0.6);
    };
    // The homepage moves its panels in an animation frame after each scroll, so check again once they have moved.
    let raf = 0;
    const onScroll = () => {
      check();
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => (raf = requestAnimationFrame(check)));
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => setMenuOpen(false), [pathname]);

  const solid = scrolled && !staticHeader;
  const light = overHero && !solid;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 bg-ink text-cream transition-[background-color,color] duration-500 ease-sand lg:bg-transparent ${
          light ? "on-dark lg:text-cream" : "lg:text-ink"
        } ${solid ? "lg:!bg-paper/95 lg:backdrop-blur-md" : ""}`}
      >
        <div className="flex h-16 items-center justify-between gap-6 px-[var(--gutter)] lg:h-auto lg:items-start lg:pt-6 lg:pb-5">
          <Link
            href={homeHref}
            className={`relative z-10 -my-2 py-2 transition-opacity duration-500 ${light ? "lg:pointer-events-none lg:opacity-0" : ""}`}
            aria-label={`Aravia, ${labels.home}`}
            tabIndex={light ? -1 : undefined}
          >
            <Logo />
          </Link>

          <nav aria-label="Primary" className="hidden lg:ms-auto lg:block">
            <ul className="flex items-center gap-6 xl:gap-7">
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
                    <Link href={item.href} aria-current={active ? "page" : undefined} className="link-mark text-[1.0625rem]">
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li>
                <AskButton source="header" className="link-mark text-[1.0625rem]">
                  {labels.ask}
                </AskButton>
              </li>
            </ul>
            <ul
              className={`mt-3 space-y-1 text-end text-[0.9375rem] transition-opacity duration-500 ${
                solid ? "pointer-events-none invisible h-0 opacity-0" : "opacity-100"
              }`}
            >
              <li className="pb-1">
                <LanguageSelector className="flex justify-end" />
              </li>
              {secondaryItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} aria-current={pathname === item.href ? "page" : undefined} className="link-quiet">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative z-10 flex items-center gap-1 lg:hidden">
            <AskButton source="header" className="px-3 py-2 text-sm tracking-[0.16em] uppercase">
              {labels.ask}
            </AskButton>
            <button
              ref={menuButton}
              type="button"
              className="flex h-11 w-11 items-center justify-center"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className="sr-only">{menuOpen ? labels.close : labels.menu}</span>
              <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1">
                {menuOpen ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
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
