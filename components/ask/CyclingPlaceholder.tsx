"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Example requests that fade slowly one into the next, shown behind an empty field.
 * Purely visual (aria-hidden): the field keeps its own label for assistive technology.
 */
export function CyclingPlaceholder({ examples, visible, className = "" }: { examples: readonly string[]; visible: boolean; className?: string }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || !visible) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % examples.length), 4200);
    return () => window.clearInterval(id);
  }, [reduce, visible, examples.length]);

  return (
    <span aria-hidden className={`pointer-events-none absolute inset-0 flex items-center overflow-hidden ${visible ? "" : "invisible"} ${className}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={index}
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="truncate"
        >
          {examples[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
