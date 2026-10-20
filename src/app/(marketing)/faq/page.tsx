import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { CtaBanner } from "@/components/layout/cta-banner";
import { FaqSection } from "@/components/layout/faq-section";
import { PageHero } from "@/components/layout/page-hero";
import { PageShell } from "@/components/layout/page-shell";
import { titleAccentTag } from "@/components/ui/rich-text";
import { ROUTES } from "@/config/routes";
import { pageMetadata } from "@/utils/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");
  return pageMetadata({
    title: t("faq.title"),
    description: t("faq.description"),
    path: ROUTES.faq,
    siteName: t("siteName"),
    locale: t("locale"),
  });
}

export default async function FaqPage() {
  const t = await getTranslations("faq.hero");
  return (
    <PageShell current="faq">
      <PageHero
        badge={t("badge")}
        title={t.rich("title", { em: titleAccentTag })}
        text={t("text")}
      />
      <FaqSection />
      <CtaBanner page="faq" />
    </PageShell>
  );
}
