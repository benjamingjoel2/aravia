"use client";

import { useEffect, useState } from "react";

/**
 * Example requests that fade slowly one into the next, shown behind an empty field.
 * Purely visual (aria-hidden): the field keeps its own label for assistive technology.
 */
export function CyclingPlaceholder({ examples, visible, className = "" }: { examples: readonly string[]; visible: boolean; className?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!visible || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % examples.length), 4200);
    return () => window.clearInterval(id);
  }, [visible, examples.length]);

  return (
    <span aria-hidden className={`pointer-events-none absolute inset-0 flex items-center overflow-hidden ${visible ? "" : "invisible"} ${className}`}>
      <span key={index} className={`truncate ${index ? "fade-up" : ""}`}>
        {examples[index]}
      </span>
    </span>
  );
}
