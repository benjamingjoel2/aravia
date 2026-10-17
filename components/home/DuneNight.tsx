"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/** Deterministic pseudo-random numbers so the stars render identically on server and client. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rand = seeded(7);
const stars = Array.from({ length: 140 }, (_, i) => ({
  x: rand() * 1600,
  y: rand() * 560,
  r: 0.35 + rand() * rand() * 1.3,
  o: 0.25 + rand() * 0.65,
  twinkle: i % 7 === 0,
  delay: rand() * 6,
}));

const FAR = "M0 720 C 180 675 360 710 540 688 S 880 630 1090 666 S 1420 702 1600 658 L1600 900 L0 900 Z";
const MID_TOP = "M0 795 C 160 755 300 737 470 775 C 620 809 760 737 920 725 C 1080 715 1180 785 1340 775 C 1460 767 1540 745 1600 750";
const NEAR_TOP = "M0 868 C 220 826 380 766 600 824 C 760 867 900 854 1040 834 C 1200 812 1380 786 1600 846";

/**
 * Night falling over the desert: an afterglow on the horizon, the first stars, three ridges of dunes.
 * Stands in for photography until the art-directed images are supplied.
 */
export function DuneNight({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const skyY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const farY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const midY = useTransform(scrollYProgress, [0, 1], [0, 22]);
  const motionStyle = (y: typeof skyY) => (reduce ? undefined : { y });

  return (
    <div ref={ref} aria-hidden className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" className="h-full w-full">
        <defs>
          <linearGradient id="dn-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#090b1a" />
            <stop offset="0.45" stopColor="#11152d" />
            <stop offset="0.68" stopColor="#1d1d3a" />
            <stop offset="0.8" stopColor="#3b2a3d" />
            <stop offset="0.9" stopColor="#6e4a45" />
          </linearGradient>
          <radialGradient id="dn-glow" cx="0.62" cy="0.7" r="0.5">
            <stop offset="0" stopColor="#c98f7e" stopOpacity="0.35" />
            <stop offset="1" stopColor="#c98f7e" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="dn-far" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#2a2340" />
            <stop offset="0.6" stopColor="#3a2b3f" />
            <stop offset="1" stopColor="#241f3a" />
          </linearGradient>
          <linearGradient id="dn-mid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1e1a32" />
            <stop offset="1" stopColor="#12122a" />
          </linearGradient>
          <linearGradient id="dn-near" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#11122a" />
            <stop offset="1" stopColor="#0b0e1f" />
          </linearGradient>
          <linearGradient id="dn-ridge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#c8a35f" stopOpacity="0" />
            <stop offset="0.45" stopColor="#c8a35f" stopOpacity="0.55" />
            <stop offset="0.8" stopColor="#c8a35f" stopOpacity="0.2" />
            <stop offset="1" stopColor="#c8a35f" stopOpacity="0" />
          </linearGradient>
        </defs>

        <motion.g style={motionStyle(skyY)}>
          <rect x="0" y="-80" width="1600" height="1000" fill="url(#dn-sky)" />
          <rect x="0" y="-80" width="1600" height="1000" fill="url(#dn-glow)" />
          {stars.map((s, i) => (
            <circle
              key={i}
              cx={s.x}
              cy={s.y}
              r={s.r}
              fill="#f6f1e7"
              opacity={s.o * (1 - s.y / 700)}
              className={s.twinkle ? "dn-twinkle" : undefined}
              style={s.twinkle ? { animationDelay: `${s.delay}s` } : undefined}
            />
          ))}
        </motion.g>

        <motion.path d={FAR} fill="url(#dn-far)" style={motionStyle(farY)} />

        <motion.g style={motionStyle(midY)}>
          <path d={`${MID_TOP} L1600 900 L0 900 Z`} fill="url(#dn-mid)" />
          <path d={MID_TOP} fill="none" stroke="url(#dn-ridge)" strokeWidth="1" />
        </motion.g>

        <path d={`${NEAR_TOP} L1600 900 L0 900 Z`} fill="url(#dn-near)" />
        <path d={NEAR_TOP} fill="none" stroke="url(#dn-ridge)" strokeWidth="0.75" opacity="0.6" />
      </svg>
      {/* Blend into the page below */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-midnight-950" />
    </div>
  );
}
