import type { Metadata } from "next";

import { CtaBanner } from "@/components/layout/cta-banner";
import { MaintenanceSection } from "@/components/layout/maintenance-section";
import { OptionsSection } from "@/components/layout/options-section";
import { PageHero } from "@/components/layout/page-hero";
import { PageShell } from "@/components/layout/page-shell";
import { PricingPacks } from "@/components/layout/pricing-packs";
import { PricingTerms } from "@/components/layout/pricing-terms";
import { getPageMetadata } from "@/utils/page-metadata";

export function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("pricing");
}

export default function PricingPage() {
  return (
    <PageShell current="pricing">
      <PageHero page="pricing" tight />
      <PricingPacks />
      <PricingTerms />
      <MaintenanceSection />
      <OptionsSection />
      <CtaBanner page="pricing" />
    </PageShell>
  );
}
