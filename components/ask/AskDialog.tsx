"use client";

import { useEffect, useRef, useState } from "react";
import { useAsk } from "./AskContext";
import { StarMark } from "@/components/motif";

/**
 * The Ask Aravia dialog. Step 2: the request field. Step 3 adds the channel choice and submission.
 * Uses the native <dialog> element for focus trapping, Esc to close and an inert background.
 */
export function AskDialog({ labels }: { labels: { label: string; submit: string; close: string } }) {
  const { state, closeAsk } = useAsk();
  const ref = useRef<HTMLDialogElement>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (state.open && !dialog.open) {
      setMessage(state.prefill ?? "");
      dialog.showModal();
    } else if (!state.open && dialog.open) {
      dialog.close();
    }
  }, [state.open, state.prefill]);

  return (
    <dialog
      ref={ref}
      onClose={closeAsk}
      onClick={(e) => e.target === e.currentTarget && closeAsk()}
      aria-labelledby="ask-dialog-title"
      className="ask-dialog m-auto w-[min(40rem,calc(100vw-2rem))] max-h-[calc(100dvh-2rem)] border border-midnight-700 bg-midnight-900 p-0 text-ivory-50 backdrop:bg-midnight-950/80 backdrop:backdrop-blur-sm"
    >
      <div className="relative p-8 sm:p-12">
        <button
          type="button"
          onClick={closeAsk}
          className="absolute top-4 end-4 flex h-11 w-11 items-center justify-center text-ivory-300 transition-colors hover:text-brass-300"
        >
          <span className="sr-only">{labels.close}</span>
          <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        </button>
        <StarMark className="mb-6 h-6 w-6 text-brass-400" />
        <h2 id="ask-dialog-title" className="text-display-sm">
          {labels.label}
        </h2>
        <form
          className="mt-8"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label htmlFor="ask-dialog-message" className="sr-only">
            {labels.label}
          </label>
          <textarea
            id="ask-dialog-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            required
            className="w-full resize-none border-0 border-b border-midnight-600 bg-transparent px-0 py-3 font-display text-2xl text-ivory-50 placeholder:text-ivory-500 focus:border-brass-400 focus:ring-0 focus:outline-none"
          />
          <div className="mt-8 flex justify-end">
            <button type="submit" className="btn-brass">
              {labels.submit}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
