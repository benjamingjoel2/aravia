"use client";

import type { ReactNode } from "react";
import { useAsk, type AskOptions } from "./AskContext";

type Props = AskOptions & { children: ReactNode; className?: string };

/** Any control that opens Ask Aravia, optionally pre-filled. */
export function AskButton({ children, className = "btn-brass", ...options }: Props) {
  const { openAsk } = useAsk();
  return (
    <button type="button" className={className} onClick={() => openAsk(options)} aria-haspopup="dialog">
      {children}
    </button>
  );
}
