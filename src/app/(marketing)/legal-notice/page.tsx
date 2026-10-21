import type { Metadata } from "next";

import { LegalSection } from "@/components/layout/legal-section";
import { PageHero } from "@/components/layout/page-hero";
import { PageShell } from "@/components/layout/page-shell";
import { getPageMetadata } from "@/utils/page-metadata";

export function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("legal");
}

export default function LegalNoticePage() {
  return (
    <PageShell>
      <PageHero page="legal" legal />
      <LegalSection />
    </PageShell>
  );
}
