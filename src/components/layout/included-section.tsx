import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

import { AccentRule } from "@/components/ui/accent-rule";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { highlightTag } from "@/components/ui/rich-text";
import { RuledColumn } from "@/components/ui/ruled-column";
import { Section } from "@/components/ui/section";

const ITEMS = ["price", "delay", "ownership", "warranty"] as const;

// Small unit before the figure ("CHF 500") or after it ("12 mois"), as in the design.
function Prefix({ children }: { children: ReactNode }) {
  return (
    <span className="mr-1.5 font-mono text-fine tracking-note text-ink/42">
      {children}
    </span>
  );
}

function Suffix({ children }: { children: ReactNode }) {
  return (
    <span className="ml-1.75 font-mono text-fine tracking-unit text-ink/42">
      {children}
    </span>
  );
}

// "Ce qui est compris, toujours." — four key figures (home page).
export function IncludedSection() {
  const t = useTranslations("home.included");

  const figures: Record<(typeof ITEMS)[number], ReactNode> = {
    price: (
      <>
        <Prefix>{t("items.price.prefix")}</Prefix>
        {t("items.price.value")}
      </>
    ),
    delay: (
      <>
        {t("items.delay.value")}
        <Suffix>{t("items.delay.suffix")}</Suffix>
      </>
    ),
    ownership: (
      <>
        {t("items.ownership.value")}
        <Suffix>{t("items.ownership.suffix")}</Suffix>
      </>
    ),
    warranty: (
      <>
        {t("items.warranty.value")}
        <Suffix>{t("items.warranty.suffix")}</Suffix>
      </>
    ),
  };

  return (
    <Section className="border-t border-ink/10 bg-card">
      <Container className="pt-21 pb-23">
        <Eyebrow className="reveal">{t("eyebrow")}</Eyebrow>
        <h2 className="mt-4 max-w-title reveal text-h2 font-semibold tracking-heading max-md:text-h2-mobile">
          {t.rich("title", { mark: highlightTag })}
        </h2>
        <AccentRule className="mt-5.5" />
        <div className="mt-13 border-y-2 border-ink">
          <div className="-ml-px grid grid-cols-facts max-nav:grid-cols-single">
            {ITEMS.map((item) => (
              <RuledColumn key={item} className="reveal px-6.5 pt-8.5 pb-1">
                <div className="flex flex-wrap items-baseline font-mono text-figure leading-figure font-medium tracking-figure text-ink">
                  {figures[item]}
                </div>
                <div
                  aria-hidden="true"
                  className="mt-5.5 mb-4.5 h-px w-full bg-ink/14"
                />
                <h3 className="mb-2.25 text-lead font-semibold tracking-subtitle">
                  {t(`items.${item}.title`)}
                </h3>
                <p className="mb-7.5 text-small leading-prose text-pretty text-ink/60">
                  {t(`items.${item}.text`)}
                </p>
              </RuledColumn>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
