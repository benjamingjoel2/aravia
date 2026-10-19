import type { ReactNode } from "react";

type Props = { children: ReactNode; className?: string; inset?: string };

/**
 * Thin corner brackets drawn from the lattice geometry, framing an image or card.
 * The brackets sit `inset` inside the edges.
 */
export function LatticeFrame({ children, className = "", inset = "0.75rem" }: Props) {
  const corner = "pointer-events-none absolute h-6 w-6 border-ink/40";
  return (
    <div className={`relative ${className}`}>
      {children}
      <span aria-hidden className={`${corner} border-t border-s`} style={{ top: inset, insetInlineStart: inset }} />
      <span aria-hidden className={`${corner} border-t border-e`} style={{ top: inset, insetInlineEnd: inset }} />
      <span aria-hidden className={`${corner} border-b border-s`} style={{ bottom: inset, insetInlineStart: inset }} />
      <span aria-hidden className={`${corner} border-b border-e`} style={{ bottom: inset, insetInlineEnd: inset }} />
    </div>
  );
}
