import type { Metadata } from "next";

import { CtaBanner } from "@/components/layout/cta-banner";
import { FaqSection } from "@/components/layout/faq-section";
import { PageHero } from "@/components/layout/page-hero";
import { PageShell } from "@/components/layout/page-shell";
import { getPageMetadata } from "@/utils/page-metadata";

export function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("faq");
}

export default function FaqPage() {
  return (
    <PageShell current="faq">
      <PageHero page="faq" />
      <FaqSection />
      <CtaBanner page="faq" />
    </PageShell>
  );
}
