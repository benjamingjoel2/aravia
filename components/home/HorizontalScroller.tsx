"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * After Sylver: on large screens the homepage panels sit side by side and scrolling down moves them sideways.
 * The outer box is as tall as the track is wide; a sticky frame shows the track, translated by the scroll position.
 * Below 64rem the panels simply stack. Keyboard focus moving into an off-screen panel scrolls it into view.
 */
export function HorizontalScroller({ children }: { children: ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const o = outer.current;
    const t = track.current;
    if (!o || !t) return;
    const mq = window.matchMedia("(min-width: 64rem)");
    const sign = document.documentElement.dir === "rtl" ? 1 : -1;
    let raf = 0;

    const distance = () => Math.max(t.scrollWidth - window.innerWidth, 0);
    const start = () => o.getBoundingClientRect().top + window.scrollY;

    const update = () => {
      if (!mq.matches) return;
      const x = Math.min(Math.max(window.scrollY - start(), 0), distance());
      t.style.transform = `translate3d(${sign * x}px,0,0)`;
    };
    const layout = () => {
      if (!mq.matches) {
        o.style.height = "";
        t.style.transform = "";
        return;
      }
      o.style.height = `${distance() + window.innerHeight}px`;
      update();
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    const onFocus = (e: FocusEvent) => {
      if (!mq.matches || !(e.target instanceof HTMLElement)) return;
      const offset = Math.abs(e.target.getBoundingClientRect().left - t.getBoundingClientRect().left);
      const x = Math.min(Math.max(offset - window.innerWidth * 0.25, 0), distance());
      window.scrollTo({ top: start() + x });
    };

    const ro = new ResizeObserver(layout);
    ro.observe(t);
    layout();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", layout);
    mq.addEventListener("change", layout);
    t.addEventListener("focusin", onFocus);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", layout);
      mq.removeEventListener("change", layout);
      t.removeEventListener("focusin", onFocus);
    };
  }, []);

  return (
    <div ref={outer} data-header-static className="relative">
      <div className="lg:sticky lg:top-0 lg:h-[100svh] lg:overflow-clip">
        <div ref={track} className="flex flex-col lg:h-full lg:w-max lg:flex-row lg:will-change-transform">
          {children}
        </div>
      </div>
    </div>
  );
}
