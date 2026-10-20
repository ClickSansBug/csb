import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { AftercareSection } from "@/components/layout/aftercare-section";
import { CtaBanner } from "@/components/layout/cta-banner";
import { HomeHero } from "@/components/layout/home-hero";
import { IncludedSection } from "@/components/layout/included-section";
import { OffersSection } from "@/components/layout/offers-section";
import { OrganizationJsonLd } from "@/components/layout/organization-json-ld";
import { PageShell } from "@/components/layout/page-shell";
import { TeamSection } from "@/components/layout/team-section";
import { ROUTES } from "@/config/routes";
import { pageMetadata } from "@/utils/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");
  return pageMetadata({
    title: t("home.title"),
    description: t("home.description"),
    path: ROUTES.home,
    siteName: t("siteName"),
    locale: t("locale"),
  });
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
