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
      <label htmlFor="hero-ask" className="eyebrow block text-center">
        {labels.label}
      </label>
      <div
        className={`mt-6 flex flex-col gap-4 border-b pb-3 transition-colors duration-700 sm:flex-row sm:items-end ${
          focused ? "border-brass-400" : "border-ivory-300/40"
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
            className="relative z-10 block w-full bg-transparent py-2 font-display text-[1.625rem] leading-tight text-ivory-50 focus:outline-none sm:text-[2rem]"
          />
          <CyclingPlaceholder
            examples={requestExamples}
            visible={value.length === 0}
            className="font-display text-[1.625rem] leading-tight text-ivory-50/55 sm:text-[2rem]"
          />
        </div>
        <button type="submit" className="btn-brass shrink-0">
          {labels.submit}
        </button>
      </div>
      <p className="mt-4 text-center text-xs text-ivory-300/80 sm:text-start">{labels.privacy}</p>
    </form>
  );
}
