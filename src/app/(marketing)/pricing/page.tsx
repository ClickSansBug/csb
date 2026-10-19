import { getTranslations } from "next-intl/server";

import { CtaBand } from "@/components/layout/cta-band";
import { MaintenancePlans } from "@/components/layout/maintenance-plans";
import { MaintenanceSection } from "@/components/layout/maintenance-section";
import { OfferPanel } from "@/components/layout/offer-panel";
import { PackTabs } from "@/components/layout/pack-tabs";
import { PageIntro } from "@/components/layout/page-intro";
import { PageShell } from "@/components/layout/page-shell";
import { PricingOptions } from "@/components/layout/pricing-options";
import { PricingTerms } from "@/components/layout/pricing-terms";
import { gutters, mobileStack } from "@/components/layout/responsive";
import { headingTags, titleTags } from "@/components/ui/rich-text";
import {
  maintenancePlanItemKeys,
  maintenancePlanKeys,
  pricingOfferHighlight,
  pricingOfferItemKeys,
  pricingOfferKeys,
  pricingOptionKeys,
  pricingOptionsWithoutUnit,
  pricingTermKeys,
} from "@/config/content/fr/pricing";
import { contactLinks, contactOfferHref, routes } from "@/config/content/site";
import { cn } from "@/utils/cn";
import { createPageMetadata } from "@/utils/page-metadata";

export function generateMetadata() {
  return createPageMetadata("pricing", routes.pricing);
}

export default async function PricingPage() {
  const t = await getTranslations("pricing");
  const tCommon = await getTranslations("common");
  const bullet = tCommon("signs.bullet");

  const offerTabs = pricingOfferKeys.map((key) => ({
    key,
    label: t(`offers.plans.${key}.tab`),
    panel: (
      <OfferPanel
        number={t(`offers.plans.${key}.number`)}
        name={t(`offers.plans.${key}.name`)}
        prefix={
          key === "performance"
            ? t("offers.plans.performance.prefix")
            : undefined
        }
        price={t(`offers.plans.${key}.price`)}
        currency={t(`offers.plans.${key}.currency`)}
        meta={t(`offers.plans.${key}.meta`)}
        text={t(`offers.plans.${key}.text`)}
        cta={{ href: contactOfferHref(key), label: t("offers.cta") }}
        includedTitle={t("offers.includedTitle")}
        bullet={bullet}
        items={pricingOfferItemKeys[key].map((item) => ({
          key: item,
          text: t(
            `offers.plans.${key}.items.${item}` as Parameters<typeof t>[0],
          ),
          highlighted:
            key === "essentiel" && item === pricingOfferHighlight.essentiel,
        }))}
      />
    ),
  }));

  return (
    <PageShell activeNav="pricing">
      <PageIntro
        chip={t("intro.chip")}
        title={t.rich("intro.title", titleTags())}
        lead={t("intro.lead")}
        className="pb-5"
      />
      <section
        className={cn("border-t border-ink/10 bg-card", gutters, mobileStack)}
      >
        <div
          className={cn(
            "mx-auto max-w-content px-8 pt-16 pb-21",
            gutters,
            mobileStack,
          )}
        >
          <PackTabs tabs={offerTabs} defaultKey="presence" />
        </div>
      </section>
      <PricingTerms
        terms={pricingTermKeys.map((key) => ({
          key,
          title: t(`terms.${key}.title`),
          text: t(`terms.${key}.text`),
        }))}
      />
      <MaintenanceSection
        eyebrow={t("maintenance.eyebrow")}
        title={t.rich("maintenance.title", headingTags())}
        asideLines={(["edition", "prices", "commitment"] as const).map(
          (key) => ({
            key,
            text: t(`maintenance.aside.${key}`),
          }),
        )}
        text={t("maintenance.text")}
      >
        <MaintenancePlans
          columns={{
            ref: t("maintenance.columns.ref"),
            plan: t("maintenance.columns.plan"),
            amount: t("maintenance.columns.amount"),
          }}
          plans={maintenancePlanKeys.map((key) => ({
            key,
            ref: t(`maintenance.plans.${key}.ref`),
            name: t(`maintenance.plans.${key}.name`),
            summary: t(`maintenance.plans.${key}.summary`),
            price: t(`maintenance.plans.${key}.price`),
            columns: maintenancePlanItemKeys[key].map((column) =>
              column.map((item) => ({
                key: item,
                text: t(
                  `maintenance.plans.${key}.items.${item}` as Parameters<
                    typeof t
                  >[0],
                ),
              })),
            ),
          }))}
          defaultOpenKey="presence"
          unit={t("maintenance.unit")}
          detailTitle={t("maintenance.detailTitle")}
          cta={{
            href: contactOfferHref("essentiel"),
            label: t("maintenance.cta"),
          }}
          signs={{ bullet, plus: tCommon("signs.plus") }}
          conditions={t("maintenance.conditions")}
          discounts={t("maintenance.discounts")}
        />
      </MaintenanceSection>
      <PricingOptions
        eyebrow={t("options.eyebrow")}
        title={t.rich("options.title", headingTags())}
        text={t("options.text")}
        options={pricingOptionKeys.map((key) => ({
          key,
          name: t(`options.items.${key}.name`),
          price: t(`options.items.${key}.price`),
          unit: (pricingOptionsWithoutUnit as readonly string[]).includes(key)
            ? undefined
            : t("options.currency"),
        }))}
      />
      <CtaBand
        title={t.rich("cta.title", headingTags("light"))}
        text={t("cta.text")}
        button={{ href: routes.contact, label: t("cta.button") }}
        email={{ href: contactLinks.email, label: tCommon("email") }}
      />
    </PageShell>
  );
}
