"use client";

import { type ReactNode, useRef } from "react";

import { useStepTimeline } from "@/hooks/use-step-timeline";

// Vertical timeline whose dots light up with the scroll (design: processus.html,
// data-timeline). Steps come as children.
export function ProcessTimeline({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useStepTimeline(ref);

  return (
    <div ref={ref} className="relative">
      <div
        aria-hidden="true"
        className="timeline-line absolute top-3 bottom-10 left-5.25 w-px"
      />
      {children}
    </div>
  );
}
