"use client";

import { type ReactNode, useRef } from "react";

import { useCursorGlow } from "@/hooks/use-cursor-glow";
import { cn } from "@/utils/cn";

type GlowCardProps = {
  children: ReactNode;
  className?: string;
};

// Card lit by a soft halo under the pointer (design: data-lit on the team cards).
export function GlowCard({ children, className }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  useCursorGlow(cardRef, glowRef);

  return (
    <div ref={cardRef} data-reveal="" className={cn("relative", className)}>
      {children}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="lit-glow pointer-events-none absolute inset-0 rounded-inherit opacity-0 transition-opacity duration-400 ease-std data-active:opacity-100"
      />
    </div>
  );
}
