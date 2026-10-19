import { StarMark } from "./StarMark";

type Props = {
  /** "line": hairline with a centred star; "strip": a narrow band of lattice. */
  variant?: "line" | "strip";
  className?: string;
};

/** Mashrabiya-inspired divider. Decorative only. */
export function LatticeRule({ variant = "line", className = "" }: Props) {
  if (variant === "strip") {
    return <div aria-hidden className={`lattice-strip text-accent/35 ${className}`} />;
  }
  return (
    <div aria-hidden className={`flex items-center gap-4 text-accent/70 ${className}`}>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-current rtl:bg-gradient-to-l" />
      <span className="h-1.5 w-1.5 rotate-45 border border-current" />
      <StarMark className="h-4 w-4" />
      <span className="h-1.5 w-1.5 rotate-45 border border-current" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-current rtl:bg-gradient-to-r" />
    </div>
  );
}
