import { site } from "@/config/site";

/** Marks a specific claim the owner still has to confirm. Hidden when NEXT_PUBLIC_SHOW_PLACEHOLDERS=false. */
export function ToConfirm({ label = "to confirm" }: { label?: string }) {
  if (!site.showPlaceholders) return null;
  return (
    <span className="ms-2 inline-block align-middle whitespace-nowrap border border-rose-400/50 px-1.5 py-px text-[0.625rem] leading-4 tracking-[0.18em] text-rose-400 uppercase">
      {label}
    </span>
  );
}
