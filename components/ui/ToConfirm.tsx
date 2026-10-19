import { site } from "@/config/site";

/** Marks a specific claim the owner still has to confirm. Hidden when NEXT_PUBLIC_SHOW_PLACEHOLDERS=false. */
/** `onLight` for sand or ivory backgrounds, where the usual rose lacks contrast. */
export function ToConfirm({ label = "to confirm", onLight = false }: { label?: string; onLight?: boolean }) {
  if (!site.showPlaceholders) return null;
  return (
    <span className={`ms-2 inline-block align-middle whitespace-nowrap border px-1.5 py-px text-[0.625rem] leading-4 tracking-[0.18em] uppercase ${onLight ? "border-rose-800/50 text-rose-800" : "border-rose-400/50 text-rose-400"}`}>
      {label}
    </span>
  );
}
