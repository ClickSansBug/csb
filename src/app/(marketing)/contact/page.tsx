import Link from "next/link";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import { ContactForm } from "@/components/layout/contact-form";
import { ContactSection } from "@/components/layout/contact-section";
import { PageShell } from "@/components/layout/page-shell";
import { ClockIcon, PinIcon } from "@/components/ui/icons";
import { titleTags } from "@/components/ui/rich-text";
import {
  contactFactKeys,
  contactPacks,
  contactSiteTypes,
  contactTeamKeys,
} from "@/config/content/fr/contact";
import { contactLinks, routes } from "@/config/content/site";
import { createPageMetadata } from "@/utils/page-metadata";

export function generateMetadata() {
  return createPageMetadata("contact", routes.contact);
}

const factIcons = { reply: ClockIcon, location: PinIcon } as const;

export default async function ContactPage() {
  const t = await getTranslations("contact");

  return (
    <PageShell variant="island">
      <ContactSection
        chip={t("intro.chip")}
        title={t.rich("intro.title", titleTags("light"))}
        lead={t("intro.lead")}
        facts={contactFactKeys.map((key) => {
          const Icon = factIcons[key];
          return {
            key,
            icon: <Icon className="size-5.5 text-brand-light" />,
            title: t(`facts.${key}.title`),
            text: t(`facts.${key}.text`),
          };
        })}
        team={contactTeamKeys.map((key) => ({
          key,
          initials: t(`team.${key}.initials`),
          name: t(`team.${key}.name`),
          role: t(`team.${key}.role`),
        }))}
      >
        <ContactForm
          texts={{
            brief: t("form.brief"),
            progress: t("form.progress", { count: 0 }),
            title: t("form.title"),
            subtitle: t("form.subtitle"),
            typeLabel: t("form.type.label"),
            companyLabel: t("form.company.label"),
            companyPlaceholder: t("form.company.placeholder"),
            nameLabel: t("form.name.label"),
            namePlaceholder: t("form.name.placeholder"),
            activityLabel: t("form.activity.label"),
            activityPlaceholder: t("form.activity.placeholder"),
            emailLabel: t("form.email.label"),
            emailPlaceholder: t("form.email.placeholder"),
            phoneLabel: (
              <>
                {t("form.phone.label")}{" "}
                <span className="opacity-50">{t("form.phone.optional")}</span>
              </>
            ),
            phonePlaceholder: t("form.phone.placeholder"),
            packLabel: t("form.pack.label"),
            hint: t("form.hint.required"),
            submit: t("form.submit"),
            reassurance: t("form.reassurance"),
            privacy: t.rich("form.privacy", {
              link: (chunks: ReactNode) => (
                <Link
                  href={routes.legal}
                  className="text-paper underline hover:text-brand-light"
                >
                  {chunks}
                </Link>
              ),
            }),
            honeypot: t("form.honeypot"),
            noScript: t.rich("form.noScript", {
              link: (chunks: ReactNode) => (
                <a
                  href={contactLinks.email}
                  className="text-brand-light underline"
                >
                  {chunks}
                </a>
              ),
            }),
          }}
          siteTypes={contactSiteTypes.map((value) => ({
            value,
            label: t(`form.type.options.${value}.label`),
            hint: t(`form.type.options.${value}.hint`),
          }))}
          packs={contactPacks.map((value) => ({
            value,
            label: t(`form.pack.options.${value}`),
          }))}
        />
      </ContactSection>
    </PageShell>
  );
}
