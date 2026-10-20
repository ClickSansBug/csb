import { useTranslations } from "next-intl";
import type { ComponentType } from "react";

import { IconCheckCircle } from "@/components/ui/icon-check-circle";
import { IconDocument } from "@/components/ui/icon-document";
import { IconMail } from "@/components/ui/icon-mail";
import { IconScreen } from "@/components/ui/icon-screen";
import { strongTag } from "@/components/ui/rich-text";
import { Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { cn } from "@/utils/cn";

const STEPS: {
  id: "contact" | "quote" | "build" | "launch";
  Icon: ComponentType<{ className?: string }>;
}[] = [
  { id: "contact", Icon: IconMail },
  { id: "quote", Icon: IconDocument },
  { id: "build", Icon: IconScreen },
  { id: "launch", Icon: IconCheckCircle },
];

// The four steps along the green timeline (process page); dots light up with the scroll.
export function ProcessTimeline() {
  const t = useTranslations("process.steps");

  return (
    <Section className="mx-auto max-w-page px-8 pt-16 pb-24">
      <div data-timeline="" className="relative">
        <div
          aria-hidden="true"
          className="absolute top-3 bottom-10 left-5.25 w-px timeline-line"
        />
        <ol>
          {STEPS.map(({ id, Icon }, index) => (
            <li
              key={id}
              data-step=""
              className={cn(
                "relative grid reveal grid-cols-step items-start gap-x-8 gap-y-2 max-xl:grid-cols-step-compact",
                index < STEPS.length - 1 && "pb-13",
              )}
            >
              <div
                data-dot=""
                aria-hidden="true"
                className="flex size-11 items-center justify-center rounded-circle border border-ink/18 bg-card font-mono text-meta text-ink/42 transition-all duration-400 ease-standard data-active:border-brand data-active:bg-brand data-active:text-on-brand data-current:shadow-step"
              >
                {t(`${id}.number`)}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <Icon className="size-5 flex-none text-brand" />
                  <Tag tone="green" spacing="step">
                    {t(`${id}.tag`)}
                  </Tag>
                </div>
                <h2 className="mt-4 text-title-lg font-semibold tracking-title">
                  {t(`${id}.title`)}
                </h2>
              </div>
              <p className="max-w-copy text-prose leading-text text-pretty text-ink/68 max-xl:col-start-2">
                {t.rich(`${id}.text`, { strong: strongTag })}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
