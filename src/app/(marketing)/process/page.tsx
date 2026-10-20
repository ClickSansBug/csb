import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { CtaBanner } from "@/components/layout/cta-banner";
import { PageHero } from "@/components/layout/page-hero";
import { PageShell } from "@/components/layout/page-shell";
import { ProcessTimeline } from "@/components/layout/process-timeline";
import { PromisesSection } from "@/components/layout/promises-section";
import { titleAccentTag } from "@/components/ui/rich-text";
import { ROUTES } from "@/config/routes";
import { pageMetadata } from "@/utils/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");
  return pageMetadata({
    title: t("process.title"),
    description: t("process.description"),
    path: ROUTES.process,
    siteName: t("siteName"),
    locale: t("locale"),
  });
}

export default async function ProcessPage() {
  const t = await getTranslations("process.hero");
  return (
    <PageShell current="process">
      <PageHero
        badge={t("badge")}
        title={t.rich("title", { em: titleAccentTag })}
        text={t("text")}
      />
      <ProcessTimeline />
      <PromisesSection />
      <CtaBanner page="process" />
    </PageShell>
  );
}
