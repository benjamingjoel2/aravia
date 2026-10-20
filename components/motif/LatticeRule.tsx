type Props = {
  /** Kept for existing call sites; both render the same hairline. */
  variant?: "line" | "strip";
  className?: string;
};

/** A plain hairline divider, after Sylver. Decorative only. */
export function LatticeRule({ className = "" }: Props) {
  return <div aria-hidden className={`h-px bg-line-strong ${className}`} />;
}
