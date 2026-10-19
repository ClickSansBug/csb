import { getTranslations } from "next-intl/server";

import { LegalArticle } from "@/components/layout/legal-article";
import { LegalCallout } from "@/components/layout/legal-callout";
import { LegalParagraph } from "@/components/layout/legal-paragraph";
import { LegalTopic } from "@/components/layout/legal-topic";
import { PageIntro } from "@/components/layout/page-intro";
import { PageShell } from "@/components/layout/page-shell";
import { PublisherCard } from "@/components/layout/publisher-card";
import { gutters, mobileStack } from "@/components/layout/responsive";
import { strongTags, titleTags } from "@/components/ui/rich-text";
import {
  legalContentParagraphKeys,
  legalLawParagraphKeys,
  legalLiabilityParagraphKeys,
  legalLinksParagraphKeys,
  legalPrivacyTopicKeys,
  legalPropertyParagraphKeys,
} from "@/config/content/fr/legal";
import { contactLinks, routes } from "@/config/content/site";
import { cn } from "@/utils/cn";
import { createPageMetadata } from "@/utils/page-metadata";

export function generateMetadata() {
  return createPageMetadata("legal", routes.legal);
}

// Simple sections made of paragraphs only (02, 03, 05, 06, 07).
const paragraphSections = [
  { section: "content", keys: legalContentParagraphKeys },
  { section: "property", keys: legalPropertyParagraphKeys },
] as const;
const closingSections = [
  { section: "links", keys: legalLinksParagraphKeys },
  { section: "liability", keys: legalLiabilityParagraphKeys },
  { section: "law", keys: legalLawParagraphKeys },
] as const;

export default async function LegalNoticePage() {
  const t = await getTranslations("legal");

  const renderParagraphs = (
    sections: typeof paragraphSections | typeof closingSections,
  ) =>
    sections.map(({ section, keys }) => (
      <LegalArticle
        key={section}
        number={t(`${section}.number`)}
        title={t(`${section}.title`)}
      >
        {keys.map((key, index) => (
          <LegalParagraph key={key} last={index === keys.length - 1}>
            {t(`${section}.paragraphs.${key}` as Parameters<typeof t>[0])}
          </LegalParagraph>
        ))}
      </LegalArticle>
    ));

  return (
    <PageShell>
      <PageIntro
        chip={t("intro.chip")}
        title={t.rich("intro.title", titleTags())}
        lead={t("intro.lead")}
        variant="legal"
      />
      <section
        className={cn(
          "mx-auto max-w-content px-8 pt-6 pb-24",
          gutters,
          mobileStack,
        )}
      >
        <div className={cn("max-w-intro", gutters, mobileStack)}>
          <LegalArticle
            number={t("publisher.number")}
            title={t("publisher.title")}
          >
            <PublisherCard
              label={t("publisher.cardLabel")}
              name={t("publisher.name")}
              lines={(["tradeName", "street", "city"] as const).map((key) => ({
                key,
                text: t(`publisher.${key}`),
              }))}
              email={{ href: contactLinks.email, label: t("publisher.email") }}
              phone={{ href: contactLinks.phone, label: t("publisher.phone") }}
            />
            <LegalParagraph>
              {t.rich("publisher.legalForm", strongTags(false))}
            </LegalParagraph>
            <LegalParagraph last>
              {t.rich("publisher.vat", strongTags(false))}
            </LegalParagraph>
          </LegalArticle>
          {renderParagraphs(paragraphSections)}
          <LegalArticle number={t("privacy.number")} title={t("privacy.title")}>
            <LegalCallout text={t("privacy.callout")} />
            {legalPrivacyTopicKeys.map((key, index) => (
              <LegalTopic
                key={key}
                title={t(`privacy.topics.${key}.title`)}
                text={t(`privacy.topics.${key}.text`)}
                last={index === legalPrivacyTopicKeys.length - 1}
              />
            ))}
          </LegalArticle>
          {renderParagraphs(closingSections)}
          <div className="border-t border-ink/10 pt-5.5 font-mono text-11 tracking-p60 text-ink/45">
            {t("updated")}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
