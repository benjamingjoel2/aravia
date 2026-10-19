"use client";

import { useState } from "react";
import { useAsk } from "@/components/ask/AskContext";
import { CyclingPlaceholder } from "@/components/ask/CyclingPlaceholder";
import { requestExamples } from "@/data/request-examples";
import type { AskLabels } from "@/components/ask/AskFlow";

/**
 * The single elegant field in the hero. On submit it hands the request to the Ask Aravia dialog,
 * which asks how the visitor would like to continue. Without JavaScript it posts to /ask.
 */
export function HeroAsk({ labels, askPath }: { labels: AskLabels; askPath: string }) {
  const { openAsk } = useAsk();
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <form
      action={askPath}
      method="get"
      onSubmit={(e) => {
        e.preventDefault();
        openAsk({ prefill: value, source: "hero", startAt: value.trim().length >= 3 ? "channel" : "compose" });
      }}
      className="w-full"
    >
      <label htmlFor="hero-ask" className="eyebrow block">
        {labels.label}
      </label>
      <div
        className={`mt-4 flex items-center gap-2 rounded-full border bg-black/15 p-1.5 ps-5 backdrop-blur-md transition-colors duration-500 sm:ps-7 ${
          focused ? "border-cream/80" : "border-cream/35"
        }`}
      >
        <div className="relative min-w-0 flex-1">
          <input
            id="hero-ask"
            name="q"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            autoComplete="off"
            maxLength={2000}
            className="relative z-10 block w-full bg-transparent py-2 text-base text-cream focus:outline-none sm:text-lg"
          />
          <CyclingPlaceholder examples={requestExamples} visible={value.length === 0} className="text-base text-cream/70 sm:text-lg" />
        </div>
        <button type="submit" className="btn-primary shrink-0">
          {labels.submit}
        </button>
      </div>
      <p className="mt-3 text-xs text-cream">{labels.privacy}</p>
    </form>
  );
}
