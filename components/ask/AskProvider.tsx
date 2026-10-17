"use client";

import type { ReactNode } from "react";
import { AskStateProvider } from "./AskContext";
import { AskDialog } from "./AskDialog";
import type { AskLabels } from "./AskFlow";

export function AskProvider({ children, labels, closeLabel, locale }: { children: ReactNode; labels: AskLabels; closeLabel: string; locale: string }) {
  return (
    <AskStateProvider>
      {children}
      <AskDialog labels={labels} closeLabel={closeLabel} locale={locale} />
    </AskStateProvider>
  );
}
