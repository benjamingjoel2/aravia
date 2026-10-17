"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = { children: ReactNode; className?: string; distance?: number };

/** Gentle vertical drift as the element passes through the viewport. Off under reduced motion. */
export function Parallax({ children, className, distance = 40 }: Props) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = outer.current;
      if (!el || !inner.current) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < 0 || r.top > vh) return;
      // 0 when the element enters at the bottom, 1 when it leaves at the top.
      const progress = (vh - r.top) / (vh + r.height);
      inner.current.style.transform = `translate3d(0, ${(progress * 2 - 1) * distance}px, 0) scale(1.08)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [distance]);

  return (
    <div ref={outer} className={`overflow-hidden ${className ?? ""}`}>
      <div ref={inner} className="h-full w-full scale-[1.08] will-change-transform">
        {children}
      </div>
    </div>
  );
}
