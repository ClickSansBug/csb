import type { Metadata } from "next";

import { CtaBanner } from "@/components/layout/cta-banner";
import { PageHero } from "@/components/layout/page-hero";
import { PageShell } from "@/components/layout/page-shell";
import { ProcessTimeline } from "@/components/layout/process-timeline";
import { PromisesSection } from "@/components/layout/promises-section";
import { getPageMetadata } from "@/utils/page-metadata";

export function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("process");
}

export default function ProcessPage() {
  return (
    <PageShell current="process">
      <PageHero page="process" />
      <ProcessTimeline />
      <PromisesSection />
      <CtaBanner page="process" />
    </PageShell>
  );
}
