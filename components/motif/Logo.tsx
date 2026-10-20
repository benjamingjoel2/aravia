import { brand } from "@/config/brand";

/** Logo placeholder: "ARAVIA" in widely spaced capitals. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display text-[1.5rem] leading-none tracking-[0.32em] [margin-inline-end:-0.32em] sm:text-[1.875rem] ${className}`}>
      {brand.wordmark}
    </span>
  );
}
