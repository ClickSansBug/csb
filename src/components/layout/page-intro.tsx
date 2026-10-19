import type { ReactNode } from "react";

import { AccentRule } from "@/components/ui/accent-rule";
import { StatusChip } from "@/components/ui/status-chip";
import { cn } from "@/utils/cn";

import { gutters, mobileStack, mobileTitle } from "./responsive";

type PageIntroProps = {
  chip: string;
  title: ReactNode;
  lead: string;
  // "legal": static rule and smaller lead (design: mentions-legales.html).
  variant?: "default" | "legal";
  className?: string;
};

// Title block at the top of Tarifs, Processus, FAQ and Mentions légales.
export function PageIntro({
  chip,
  title,
  lead,
  variant = "default",
  className,
}: PageIntroProps) {
  const legal = variant === "legal";
  return (
    <section
      className={cn(
        "mx-auto max-w-content px-8 pt-22 pb-6",
        gutters,
        mobileStack,
        className,
      )}
    >
      <div data-reveal="" className={cn("max-w-intro", gutters, mobileStack)}>
        <div className="flex items-center gap-3.5">
          <StatusChip tone="page" label={chip} />
        </div>
        <h1
          className={cn(
            "mt-5.5 text-display leading-103 font-semibold tracking-n32 text-balance",
            mobileTitle,
          )}
        >
          {title}
        </h1>
        <AccentRule animated={!legal} className={legal ? "mt-7" : "mt-6"} />
        <p
          className={cn(
            "text-ink/66",
            legal
              ? "mt-6.5 max-w-legal-lead text-17-5 leading-162"
              : "mt-7 text-18 leading-158 text-pretty",
          )}
        >
          {lead}
        </p>
      </div>
    </section>
  );
}
