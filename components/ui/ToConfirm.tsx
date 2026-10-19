import { site } from "@/config/site";

/** Marks a specific claim the owner still has to confirm. Hidden when NEXT_PUBLIC_SHOW_PLACEHOLDERS=false. */
/** Takes the surrounding text colour, so it reads on paper, photographs and dark blocks alike. */
export function ToConfirm({ label = "to confirm", onLight = false }: { label?: string; onLight?: boolean }) {
  if (!site.showPlaceholders) return null;
  return (
    <span className="ms-2 inline-block align-middle whitespace-nowrap rounded-full border border-current px-2 py-px font-sans text-[0.625rem] leading-4 font-medium tracking-[0.12em] uppercase">
      {label}
    </span>
  );
}
