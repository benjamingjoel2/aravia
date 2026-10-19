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
  /** Smaller links stacked under the main navigation while the page is at the top. */
  secondaryItems: NavItem[];
  /** Nav item href that opens the grouped destinations menu instead of linking directly. */
  destinationsHref: string;
  regions: RegionNav[];
  labels: { ask: string; menu: string; close: string; home: string; allDestinations: string };
};

export function Header({ homeHref, items, mobileItems, secondaryItems, destinationsHref, regions, labels }: Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // Pages that open on a full-bleed photograph mark it with data-hero-photo; the header sits on it in light text.
  const [overPhoto, setOverPhoto] = useState(false);
  // The homepage sets the name very large itself (data-hero-wordmark), so the small logo steps aside at the top.
  const [bigWordmark, setBigWordmark] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOverPhoto(Boolean(document.querySelector("[data-hero-photo]")));
    setBigWordmark(Boolean(document.querySelector("[data-hero-wordmark]")));
  }, [pathname]);
  const atTop = !scrolled && !menuOpen;

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
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,color] duration-500 ease-sand ${
        scrolled || menuOpen
          ? "border-b border-line bg-paper/95 text-ink backdrop-blur-md"
          : overPhoto
            ? "on-dark border-b border-transparent bg-transparent text-cream"
            : "border-b border-transparent bg-paper text-ink"
      }`}
    >
      <div className="container-page flex h-20 items-center justify-between gap-6">
        <Link
          href={homeHref}
          className={`relative z-10 -my-2 py-2 transition-opacity duration-500 ${bigWordmark && atTop ? "lg:invisible lg:opacity-0" : ""}`}
          aria-label={`Aravia, ${labels.home}`}
        >
          <Logo />
        </Link>

        <nav aria-label="Primary" className="relative hidden lg:ms-auto lg:block">
          <ul className="flex items-center gap-7">
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
                    className={`text-[1.0625rem] underline decoration-1 underline-offset-[7px] transition-colors duration-300 hover:decoration-current ${active ? "decoration-current" : "decoration-current/35"}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          {/* Secondary links stack beneath, right-aligned, while the page is at the top */}
          <ul
            className={`absolute end-0 top-full mt-2 space-y-0.5 text-end text-[0.9375rem] transition-opacity duration-500 ${
              atTop ? "opacity-100" : "pointer-events-none invisible opacity-0"
            }`}
          >
            {secondaryItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:underline hover:underline-offset-4">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative z-10 flex items-center gap-2">
          <AskButton source="header" className="btn-primary !min-h-10 !px-5 !py-2 !text-sm whitespace-nowrap">
            {labels.ask}
          </AskButton>
          <button
            ref={menuButton}
            type="button"
            className="flex h-11 w-11 items-center justify-center lg:hidden"
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
