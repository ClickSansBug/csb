import { useTranslations } from "next-intl";

import { BulletItem } from "@/components/ui/bullet-item";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { highlightTag } from "@/components/ui/rich-text";
import { Section } from "@/components/ui/section";
import { contactWithOffer } from "@/config/routes";

import { MaintenanceFolds, type MaintenancePlan } from "./maintenance-folds";

// Features of each plan, in their two columns. Every "Retenir cette formule" button leads to
// /contact?offre=essentiel (clarifications.md › « Retenir cette formule »).
const PLANS = {
  essential: [
    ["deployment", "domain", "versions"],
    ["monitoring", "updates", "support"],
  ],
  presence: [
    ["essential", "changes", "rollover"],
    ["examples", "support", "fit"],
  ],
  performance: [
    ["essential", "security", "support"],
    ["changes", "review", "fit"],
  ],
} as const;

type PlanId = keyof typeof PLANS;

const META = ["edition", "prices", "commitment"] as const;
const COLUMN = "font-mono text-micro tracking-label text-ink/42 uppercase";

export function MaintenanceSection() {
  const t = useTranslations("pricing.maintenance");

  const plans: MaintenancePlan[] = (Object.keys(PLANS) as PlanId[]).map(
    (id) => ({
      id,
      ref: t(`plans.${id}.ref`),
      name: t(`plans.${id}.name`),
      text: t(`plans.${id}.text`),
      price: t(`plans.${id}.price`),
      unit: t("unit"),
      body: (
        <div className="pt-1 pr-4.5 pb-7.5 pl-13 max-lg:pl-7.5 max-md:px-1">
          <div className="mb-1.5 font-mono text-tag tracking-label text-ink/40 uppercase">
            {t("detail")}
          </div>
          <div className="grid grid-cols-columns gap-x-11 gap-y-0 max-nav:grid-cols-single">
            {PLANS[id].map((column) => (
              <ul key={column.join("-")}>
                {column.map((feature) => (
                  <BulletItem key={feature} size="sm" bullet={t("bullet")}>
                    {t(
                      `plans.${id}.features.${feature}` as Parameters<
                        typeof t
                      >[0],
                    )}
                  </BulletItem>
                ))}
              </ul>
            ))}
          </div>
          <ButtonLink
            href={contactWithOffer("essentiel")}
            tone="outline-soft"
            size="compact"
            className="mt-6.5"
          >
            {t("choose")}
          </ButtonLink>
        </div>
      ),
    }),
  );

  return (
    <Section className="border-t border-ink/10 bg-card">
      <Container className="pt-22 pb-24">
        <div className="flex reveal flex-wrap items-baseline justify-between gap-6">
          <div>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h2 className="mt-3.5 text-h2 font-semibold tracking-heading max-md:text-h2-mobile">
              {t.rich("title", { mark: highlightTag })}
            </h2>
          </div>
          <div className="text-right font-mono text-tag leading-stack tracking-spec text-ink/40 uppercase max-md:mt-4.5 max-md:text-left">
            {META.map((line, index) => (
              <span key={line}>
                {index > 0 ? <br /> : null}
                {t(`meta.${line}`)}
              </span>
            ))}
          </div>
        </div>
        <p className="mt-5.5 max-w-copy-md reveal text-prose leading-text text-pretty text-ink/62">
          {t("text")}
        </p>

        <div className="mt-11 reveal border-t-2 border-ink">
          <div
            aria-hidden="true"
            className="grid grid-cols-fold gap-x-5 border-b border-ink py-3 pr-4.5 pl-3 max-md:hidden"
          >
            <div className={COLUMN}>{t("columns.ref")}</div>
            <div className={COLUMN}>{t("columns.plan")}</div>
            <div className={`text-right ${COLUMN}`}>{t("columns.amount")}</div>
            <div className="ml-5.5 w-6.5" />
          </div>
          <MaintenanceFolds
            plans={plans}
            defaultOpen="presence"
            sign={t("sign")}
          />
          <div className="flex flex-wrap items-baseline justify-between gap-5 pt-4 pr-4.5 pl-3 font-mono text-tag tracking-badge text-ink/40 uppercase">
            <span>{t("footnote.terms")}</span>
            <span>{t("footnote.discounts")}</span>
          </div>
        </div>
      </Container>
    </Section>
  );
}
