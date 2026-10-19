import type { ReactNode } from "react";

import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/utils/cn";

import { gutters, mobileHeading, mobileStack } from "./responsive";

type MaintenanceSectionProps = {
  eyebrow: string;
  title: ReactNode;
  asideLines: { key: string; text: string }[];
  text: string;
  children: ReactNode;
};

// « Votre site reste vivant. » (design: tarifs.html, maintenance section). The plans table
// comes as children.
export function MaintenanceSection({
  eyebrow,
  title,
  asideLines,
  text,
  children,
}: MaintenanceSectionProps) {
  return (
    <section
      className={cn("border-t border-ink/10 bg-card", gutters, mobileStack)}
    >
      <div
        className={cn(
          "mx-auto max-w-content px-8 pt-22 pb-24",
          gutters,
          mobileStack,
        )}
      >
        <div
          data-reveal=""
          className="flex flex-wrap items-baseline justify-between gap-6"
        >
          <div>
            <Eyebrow label={eyebrow} />
            <h2
              className={cn(
                "mt-3.5 text-h2 font-semibold tracking-n30",
                mobileHeading,
              )}
            >
              {title}
            </h2>
          </div>
          <div className="text-right font-mono text-10-5 leading-190 tracking-p150 text-ink/40 uppercase max-mobile:mt-4.5 max-mobile:text-left">
            {asideLines.map((line, index) => (
              <span key={line.key}>
                {index > 0 ? <br /> : null}
                {line.text}
              </span>
            ))}
          </div>
        </div>
        <p
          data-reveal=""
          className="mt-5.5 max-w-maintenance text-16-5 leading-160 text-pretty text-ink/62"
        >
          {text}
        </p>
        {children}
      </div>
    </section>
  );
}
