"use client";

import { useEffect, useRef } from "react";
import { useAsk } from "./AskContext";
import dynamic from "next/dynamic";
import type { AskLabels } from "./AskFlow";

// The flow (and its animation library) stays out of the first page load; it is fetched in idle time
// after load, or on first open if that comes sooner.
const loadFlow = () => import("./AskFlow").then((m) => m.AskFlow);
const AskFlow = dynamic(loadFlow, { ssr: false });
import { StarMark } from "@/components/motif";

/**
 * The Ask Aravia dialog, opened from the header, the hero and every "Request access" link.
 * Uses the native <dialog> element for focus trapping, Esc to close and an inert background.
 */
export function AskDialog({ labels, closeLabel, locale }: { labels: AskLabels; closeLabel: string; locale: string }) {
  const { state, closeAsk } = useAsk();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1500));
    idle(() => void loadFlow());
  }, []);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (state.open && !dialog.open) {
      dialog.showModal();
      // showModal focuses the first button (close); hand focus to the request field or step heading instead.
      dialog.querySelector<HTMLElement>("textarea, h2[tabindex='-1']")?.focus();
    }
    else if (!state.open && dialog.open) dialog.close();
  }, [state.open, state.session]);

  return (
    <dialog
      ref={ref}
      onClose={closeAsk}
      onClick={(e) => e.target === e.currentTarget && closeAsk()}
      aria-labelledby="ask-dialog-title"
      className="m-auto max-h-[calc(100dvh-2rem)] w-[min(40rem,calc(100vw-2rem))] overflow-y-auto bg-paper p-0 text-ink shadow-[0_40px_120px_-40px_rgb(36_68_64/0.5)] backdrop:bg-ink/45 backdrop:backdrop-blur-sm"
    >
      <div className="relative p-7 sm:p-12">
        <button
          type="button"
          onClick={closeAsk}
          className="absolute end-3 top-3 flex h-11 w-11 items-center justify-center text-ink-2 transition-colors hover:text-accent"
        >
          <span className="sr-only">{closeLabel}</span>
          <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        </button>
        <StarMark className="mb-6 h-6 w-6 text-brass-600" />
        {state.open && (
          <AskFlow
            key={state.session}
            labels={labels}
            locale={locale}
            initialMessage={state.prefill}
            startAt={state.startAt}
            source={state.source}
            refId={state.refId}
            titleId="ask-dialog-title"
            autoFocus
          />
        )}
      </div>
    </dialog>
  );
}
