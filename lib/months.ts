import type { Month } from "@/data/types";

const short = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const long = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const monthName = (m: Month, style: "short" | "long" = "long") => (style === "short" ? short : long)[m - 1];

/**
 * Collapse a list of months into readable ranges, wrapping over the new year:
 * [10,11,12,1,2,3] -> "October to March"; [3,4,5,9,10,11] -> "March to May, September to November".
 */
export function monthRanges(months: readonly Month[]): string {
  const set = new Set(months);
  if (set.size === 12) return "All year";
  // Start each range at a month whose predecessor is not included.
  const starts = [...set].filter((m) => !set.has((((m + 10) % 12) + 1) as Month)).sort((a, b) => a - b);
  // Season order: autumn first, so a range starting in October reads before one starting in March.
  starts.sort((a, b) => ((a + 3) % 12) - ((b + 3) % 12));
  return starts
    .map((start) => {
      let end = start;
      while (set.has(((end % 12) + 1) as Month) && ((end % 12) + 1) !== start) end = ((end % 12) + 1) as Month;
      return start === end ? monthName(start) : `${monthName(start)} to ${monthName(end)}`;
    })
    .join(", ");
}
