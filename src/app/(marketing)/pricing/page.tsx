import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { CtaBanner } from "@/components/layout/cta-banner";
import { MaintenanceSection } from "@/components/layout/maintenance-section";
import { OptionsSection } from "@/components/layout/options-section";
import { PageHero } from "@/components/layout/page-hero";
import { PageShell } from "@/components/layout/page-shell";
import { PricingPacks } from "@/components/layout/pricing-packs";
import { PricingTerms } from "@/components/layout/pricing-terms";
import { titleAccentTag } from "@/components/ui/rich-text";
import { ROUTES } from "@/config/routes";
import { pageMetadata } from "@/utils/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");
  return pageMetadata({
    title: t("pricing.title"),
    description: t("pricing.description"),
    path: ROUTES.pricing,
    siteName: t("siteName"),
    locale: t("locale"),
  });
}

export default async function PricingPage() {
  const t = await getTranslations("pricing.hero");
  return (
    <PageShell current="pricing">
      <PageHero
        badge={t("badge")}
        title={t.rich("title", { em: titleAccentTag })}
        text={t("text")}
        tight
      />
      <PricingPacks />
      <PricingTerms />
      <MaintenanceSection />
      <OptionsSection />
      <CtaBanner page="pricing" />
    </PageShell>
  );
}
