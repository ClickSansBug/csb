import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { LegalSection } from "@/components/layout/legal-section";
import { PageHero } from "@/components/layout/page-hero";
import { PageShell } from "@/components/layout/page-shell";
import { titleAccentTag } from "@/components/ui/rich-text";
import { ROUTES } from "@/config/routes";
import { pageMetadata } from "@/utils/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");
  return pageMetadata({
    title: t("legal.title"),
    description: t("legal.description"),
    path: ROUTES.legal,
    siteName: t("siteName"),
    locale: t("locale"),
  });
}

export default async function LegalNoticePage() {
  const t = await getTranslations("legal.hero");
  return (
    <PageShell>
      <PageHero
        badge={t("badge")}
        title={t.rich("title", { em: titleAccentTag })}
        text={t("text")}
        legal
      />
      <LegalSection />
    </PageShell>
  );
}
