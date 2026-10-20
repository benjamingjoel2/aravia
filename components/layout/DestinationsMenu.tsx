"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { LatticeRule } from "@/components/motif";
import type { RegionNav } from "@/lib/nav";

type Props = { label: string; allLabel: string; href: string; regions: RegionNav[]; active: boolean };

/** Desktop disclosure for "Where we take you": opens on click or hover, closes on Esc, outside click or focus leaving. */
export function DestinationsMenu({ label, allLabel, href, regions, active }: Props) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  /** When hover has just opened the panel, the click that follows should not close it again. */
  const hoverOpenedAt = useRef(0);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const enter = () => {
    window.clearTimeout(closeTimer.current);
    if (!open) hoverOpenedAt.current = Date.now();
    setOpen(true);
  };
  const leave = () => {
    closeTimer.current = window.setTimeout(() => setOpen(false), 180);
  };

  return (
    <div
      ref={root}
      onPointerEnter={(e) => e.pointerType === "mouse" && enter()}
      onPointerLeave={(e) => e.pointerType === "mouse" && leave()}
      onBlur={(e) => !root.current?.contains(e.relatedTarget as Node) && setOpen(false)}
    >
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => (o && Date.now() - hoverOpenedAt.current < 800 ? true : !o))}
        aria-current={active ? "page" : undefined}
        className={`link-mark text-[1.0625rem] ${open ? "after:!w-full" : ""}`}
      >
        {label}
        <svg aria-hidden viewBox="0 0 12 12" className={`h-2.5 w-2.5 transition-transform duration-500 ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor">
          <path d="M2.5 4.5 6 8l3.5-3.5" />
        </svg>
      </button>

      {open && (
          <div
            id={panelId}
            className="fade-in absolute inset-x-0 top-full border-y border-line bg-paper text-ink"
          >
            <div className="container-page grid grid-cols-3 gap-12 py-12">
              {regions.map((region) => (
                <div key={region.id}>
                  <Link href={region.href} onClick={() => setOpen(false)} className="eyebrow link-mark !text-accent">
                    {region.name}
                  </Link>
                  <ul className="mt-6 space-y-3">
                    {region.countries.map((c) => (
                      <li key={c.href}>
                        <Link href={c.href} onClick={() => setOpen(false)} className="link-quiet font-display text-2xl uppercase tracking-[0.04em]">
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="container-page pb-10">
              <LatticeRule />
              <p className="mt-6 text-center">
                <Link href={href} onClick={() => setOpen(false)} className="btn-secondary">
                  {allLabel}
                </Link>
              </p>
            </div>
          </div>
        )}
    </div>
  );
}
