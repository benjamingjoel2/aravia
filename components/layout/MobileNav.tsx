"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect } from "react";
import { LatticeRule } from "@/components/motif";
import type { NavItem } from "./Header";

export function MobileNav({ open, items, onClose }: { open: boolean; items: NavItem[]; onClose: () => void }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.nav
          id="mobile-nav"
          aria-label="Menu"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 top-20 bottom-0 overflow-y-auto bg-midnight-950 lg:hidden"
        >
          <div className="container-page py-10">
            <ul className="space-y-1">
              {items.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link href={item.href} onClick={onClose} className="block py-2.5 font-display text-3xl text-ivory-50 hover:text-brass-300">
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <LatticeRule variant="strip" className="mt-12" />
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
