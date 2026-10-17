"use client";

import type { ReactNode } from "react";
import { AskStateProvider } from "./AskContext";
import { AskDialog } from "./AskDialog";

export function AskProvider({
  children,
  labels,
}: {
  children: ReactNode;
  labels: { label: string; submit: string; close: string };
}) {
  return (
    <AskStateProvider>
      {children}
      <AskDialog labels={labels} />
    </AskStateProvider>
  );
}
