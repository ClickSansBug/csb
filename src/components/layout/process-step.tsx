import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

type ProcessStepProps = {
  number: string;
  icon: ReactNode;
  badge: string;
  title: string;
  text: ReactNode;
  last?: boolean;
};

// One step of the process timeline (design: processus.html, data-step). The dot is lit by
// ProcessTimeline through data-reached / data-current.
export function ProcessStep({
  number,
  icon,
  badge,
  title,
  text,
  last = false,
}: ProcessStepProps) {
  return (
    <div
      data-step=""
      data-reveal=""
      className={cn(
        "relative grid grid-cols-step items-start gap-x-8 gap-y-2 max-wide:grid-cols-step-compact",
        !last && "pb-13",
      )}
    >
      <div
        data-dot=""
        className="step-dot flex size-11 items-center justify-center rounded-full border border-ink/18 bg-card font-mono text-12-5 text-ink/42 data-current:shadow-step data-reached:border-brand data-reached:bg-brand data-reached:text-on-brand"
      >
        {number}
      </div>
      <div>
        <div className="flex flex-wrap items-center gap-3">
          {icon}
          <span className="rounded-pill bg-g94 px-2.5 py-1.25 font-mono text-10-5 tracking-p120 text-g42">
            {badge}
          </span>
        </div>
        <h2 className="mt-4 text-24 font-semibold tracking-n20">{title}</h2>
      </div>
      <p className="max-w-copy text-16-5 leading-160 text-pretty text-ink/68 max-wide:col-start-2">
        {text}
      </p>
    </div>
  );
}
