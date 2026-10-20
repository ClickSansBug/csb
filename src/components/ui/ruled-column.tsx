import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

type RuledColumnProps = {
  className?: string;
  children: ReactNode;
};

// Column of an auto-fit grid separated by a vertical hairline; stacked with horizontal
// hairlines once the grid has a single column (csb-mobile.css, under 860px).
export function RuledColumn({ className, children }: RuledColumnProps) {
  return (
    <div
      className={cn(
        "border-l border-ink/10 max-nav:border-t max-nav:border-l-0 max-nav:px-0 max-nav:first:border-t-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
