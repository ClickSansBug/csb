import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

// Body paragraph of the legal notice; the last one of a block has no bottom margin.
export function LegalParagraph({
  children,
  last = false,
}: {
  children: ReactNode;
  last?: boolean;
}) {
  return (
    <p className={cn("text-15-5 leading-170 text-ink/78", !last && "mb-2.75")}>
      {children}
    </p>
  );
}
