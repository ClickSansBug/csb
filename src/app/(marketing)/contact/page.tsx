import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { ContactSection } from "@/components/layout/contact-section";
import { PageShell } from "@/components/layout/page-shell";
import { ROUTES } from "@/config/routes";
import { pageMetadata } from "@/utils/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");
  return pageMetadata({
    title: t("contact.title"),
    description: t("contact.description"),
    path: ROUTES.contact,
    siteName: t("siteName"),
    locale: t("locale"),
  });
}

export default function ContactPage() {
  return (
    <PageShell contact>
      <ContactSection />
    </PageShell>
  );
}
