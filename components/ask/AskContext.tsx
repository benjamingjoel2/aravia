"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type AskSource = "hero" | "header" | "season" | "composer" | "destination" | "service" | "contact" | "page";

export type AskOptions = { prefill?: string; source?: AskSource; ref?: string };

type AskState = AskOptions & { open: boolean };

type AskContextValue = {
  state: AskState;
  openAsk: (options?: AskOptions) => void;
  closeAsk: () => void;
};

const AskContext = createContext<AskContextValue | null>(null);

export function AskStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AskState>({ open: false });
  const openAsk = useCallback((options: AskOptions = {}) => setState({ ...options, open: true }), []);
  const closeAsk = useCallback(() => setState((s) => ({ ...s, open: false })), []);
  const value = useMemo(() => ({ state, openAsk, closeAsk }), [state, openAsk, closeAsk]);
  return <AskContext.Provider value={value}>{children}</AskContext.Provider>;
}

export function useAsk() {
  const ctx = useContext(AskContext);
  if (!ctx) throw new Error("useAsk must be used inside <AskProvider>");
  return ctx;
}
