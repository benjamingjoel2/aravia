import { StarMark } from "./StarMark";
import { brand } from "@/config/brand";

/** Logo placeholder: star mark with "ARAVIA" in spaced capitals. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 text-ivory-50 ${className}`}>
      <StarMark className="h-5 w-5 text-brass-400" />
      <span className="font-display text-[1.35rem] leading-none tracking-[0.42em] [margin-inline-end:-0.42em]">
        {brand.wordmark}
      </span>
    </span>
  );
}
