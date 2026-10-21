import type { Metadata } from "next";

import { AftercareSection } from "@/components/layout/aftercare-section";
import { CtaBanner } from "@/components/layout/cta-banner";
import { HomeHero } from "@/components/layout/home-hero";
import { IncludedSection } from "@/components/layout/included-section";
import { OffersSection } from "@/components/layout/offers-section";
import { OrganizationJsonLd } from "@/components/layout/organization-json-ld";
import { PageShell } from "@/components/layout/page-shell";
import { TeamSection } from "@/components/layout/team-section";
import { getPageMetadata } from "@/utils/page-metadata";

export function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("home");
}

export default function HomePage() {
  return (
    <PageShell>
      <OrganizationJsonLd />
      <HomeHero />
      <IncludedSection />
      <OffersSection />
      <AftercareSection />
      <TeamSection />
      <CtaBanner page="home" />
    </PageShell>
  );
}
