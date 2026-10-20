import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

type EyebrowProps = {
  className?: string;
  children: ReactNode;
};

// Section label: short green bar, mono capitals in the accent green.
export function Eyebrow({ className, children }: EyebrowProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 font-mono text-eyebrow tracking-eyebrow text-accent-text uppercase",
        className,
      )}
    >
      <span aria-hidden="true" className="h-0.5 w-6 flex-none bg-accent-fill" />
      {children}
    </div>
  );
}
