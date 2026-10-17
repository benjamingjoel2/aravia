"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

type Props = { children: ReactNode; className?: string; distance?: number };

/** Gentle vertical drift as the element passes through the viewport. */
export function Parallax({ children, className, distance = 40 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <motion.div style={reduce ? undefined : { y }} className="h-full w-full scale-[1.08]">
        {children}
      </motion.div>
    </div>
  );
}
