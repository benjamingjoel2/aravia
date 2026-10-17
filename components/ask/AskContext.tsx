"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type AskSource = "hero" | "header" | "season" | "composer" | "destination" | "service" | "contact" | "page";

export type AskOptions = {
  prefill?: string;
  source?: AskSource;
  refId?: string;
  /** Skip straight to choosing a channel, e.g. after the hero field has been filled in. */
  startAt?: "compose" | "channel";
};

type AskState = AskOptions & { open: boolean; /** Increments on every open so the flow starts fresh. */ session: number };

type AskContextValue = {
  state: AskState;
  openAsk: (options?: AskOptions) => void;
  closeAsk: () => void;
};

const AskContext = createContext<AskContextValue | null>(null);

export function AskStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AskState>({ open: false, session: 0 });
  const openAsk = useCallback((options: AskOptions = {}) => setState((s) => ({ ...options, open: true, session: s.session + 1 })), []);
  const closeAsk = useCallback(() => setState((s) => ({ ...s, open: false })), []);
  const value = useMemo(() => ({ state, openAsk, closeAsk }), [state, openAsk, closeAsk]);
  return <AskContext.Provider value={value}>{children}</AskContext.Provider>;
}

export function useAsk() {
  const ctx = useContext(AskContext);
  if (!ctx) throw new Error("useAsk must be used inside <AskProvider>");
  return ctx;
}
