import type { Month } from "@/data/types";
import { monthName, monthRanges } from "@/lib/months";

const ORDER: Month[] = [10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9];

/** Twelve months from October, the good ones lit in brass. */
export function BestMonths({ months }: { months: readonly Month[] }) {
  const on = new Set(months);
  return (
    <div>
      <p className="text-ivory-50">{monthRanges(months)}</p>
      <ol aria-hidden className="mt-4 grid grid-cols-12 gap-1">
        {ORDER.map((m) => (
          <li key={m} className="text-center">
            <span className={`block h-1 ${on.has(m) ? "bg-brass-400" : "bg-midnight-700"}`} />
            <span className={`mt-2 block text-[0.625rem] ${on.has(m) ? "text-sand-300" : "text-ivory-500"}`}>{monthName(m, "short").charAt(0)}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
