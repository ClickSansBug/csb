import type { ReactNode } from "react";

import { AccentRule } from "@/components/ui/accent-rule";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/utils/cn";

import {
  gutters,
  mobileHeading,
  mobileStack,
  singleColumn,
  stackedCell,
} from "./responsive";

type Stat = {
  key: string;
  value: string;
  prefix?: string;
  suffix?: string;
  title: string;
  text: string;
};

type IncludedStatsProps = {
  eyebrow: string;
  title: ReactNode;
  stats: Stat[];
};

// « Ce qui est compris, toujours. » — four key figures (design: index.html, 2nd section).
export function IncludedStats({ eyebrow, title, stats }: IncludedStatsProps) {
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
            "mt-4 max-w-heading text-h2 font-semibold tracking-n30",
            mobileHeading,
          )}
        >
          {title}
        </h2>
        <AccentRule className="mt-5.5" />
        <div className="mt-13 border-y-2 border-ink">
          <div className={cn("-ml-px grid grid-cols-stats", singleColumn)}>
            {stats.map((stat) => (
              <div
                key={stat.key}
                data-reveal=""
                className={cn(
                  "border-l border-ink/10 px-6.5 pt-8.5 pb-1",
                  stackedCell,
                )}
              >
                <div className="flex flex-wrap items-baseline font-mono text-stat leading-94 font-medium tracking-n45 text-ink">
                  {stat.prefix ? (
                    <span className="mr-1.5 font-mono text-13 tracking-p40 text-ink/42">
                      {stat.prefix}
                    </span>
                  ) : null}
                  {stat.value}
                  {stat.suffix ? (
                    <span className="ml-1.75 font-mono text-13 tracking-p20 text-ink/42">
                      {stat.suffix}
                    </span>
                  ) : null}
                </div>
                <div
                  aria-hidden="true"
                  className="mt-5.5 mb-4.5 h-px w-full bg-ink/14"
                />
                <h3 className="mb-2.25 text-17-5 font-semibold tracking-n12">
                  {stat.title}
                </h3>
                <p className="mb-7.5 text-14 leading-162 text-pretty text-ink/60">
                  {stat.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
