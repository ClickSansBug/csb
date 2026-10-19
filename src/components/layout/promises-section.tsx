import type { ReactNode } from "react";

import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/utils/cn";

import {
  gutters,
  mobileHeading,
  mobileStack,
  singleColumn,
  stackedCell,
} from "./responsive";

type PromisesSectionProps = {
  eyebrow: string;
  title: ReactNode;
  items: { key: string; number: string; title: string; text: string }[];
};

// « Trois choses, tenues. » (design: processus.html, promises section).
export function PromisesSection({
  eyebrow,
  title,
  items,
}: PromisesSectionProps) {
  return (
    <section
      className={cn("border-t border-ink/10 bg-card", gutters, mobileStack)}
    >
      <div
        className={cn(
          "mx-auto max-w-content px-8 pt-21 pb-23",
          gutters,
          mobileStack,
        )}
      >
        <Eyebrow reveal label={eyebrow} />
        <h2
          data-reveal=""
          className={cn(
            "mt-4 text-h2 font-semibold tracking-n30",
            mobileHeading,
          )}
        >
          {title}
        </h2>
        <div className="mt-11.5 border-y-2 border-ink">
          <div className={cn("grid grid-cols-promises", singleColumn)}>
            {items.map((item) => (
              <div
                key={item.key}
                data-reveal=""
                className={cn(
                  "border-l border-ink/10 px-6.5 pt-8 pb-8.5",
                  stackedCell,
                )}
              >
                <div className="font-mono text-11 tracking-p160 text-g52 uppercase">
                  {item.number}
                </div>
                <h3 className="mt-5 mb-2.5 text-21 font-semibold tracking-n18">
                  {item.title}
                </h3>
                <p className="text-14-5 leading-162 text-pretty text-ink/60">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
