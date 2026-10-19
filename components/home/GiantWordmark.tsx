import { brand } from "@/config/brand";

/**
 * The wordmark set edge to edge. SVG text stretched to the full width with letter-spacing only,
 * so the capitals keep their shape at any screen size. Decorative: the logo in the header carries the name.
 */
export function GiantWordmark({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 1000 128" className={`block w-full ${className}`} preserveAspectRatio="xMidYMax meet">
      <text
        x="0"
        y="124"
        textLength="1000"
        lengthAdjust="spacing"
        fill="currentColor"
        style={{ fontFamily: "var(--font-instrument), Georgia, serif", fontSize: 180, fontWeight: 400 }}
      >
        {brand.wordmark}
      </text>
    </svg>
  );
}
