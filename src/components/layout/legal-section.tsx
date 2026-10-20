import { useTranslations } from "next-intl";
import { Fragment } from "react";

import { strongPlainTag } from "@/components/ui/rich-text";
import { Section, SECTION_GUTTERS } from "@/components/ui/section";

import { LegalArticle } from "./legal-article";

const PARAGRAPH = "mb-2.75 text-body leading-legal text-ink/78 last:mb-0";
const TOPIC = "mt-5 mb-2 font-mono text-tag tracking-tag text-g52 uppercase";

// Display order of the articles and of their paragraphs.
const PUBLISHER_PARAGRAPHS = ["legalForm", "vat"] as const;
const PRIVACY_TOPICS = [
  "received",
  "delivery",
  "access",
  "retention",
  "logs",
  "transfers",
  "rights",
] as const;
const SIMPLE_ARTICLES = {
  content: ["indicative", "prices"],
  property: ["rights"],
  links: ["thirdParty"],
  liability: ["accuracy", "interruption"],
  law: ["jurisdiction"],
} as const;

export function LegalSection() {
  const t = useTranslations("legal");
  const email = useTranslations("common")("email");
  const phone = t("publisher.card.phone");

  const simple = (id: keyof typeof SIMPLE_ARTICLES) => (
    <LegalArticle key={id} number={t(`${id}.number`)} title={t(`${id}.title`)}>
      {SIMPLE_ARTICLES[id].map((paragraph) => (
        <p key={paragraph} className={PARAGRAPH}>
          {t(`${id}.paragraphs.${paragraph}` as Parameters<typeof t>[0])}
        </p>
      ))}
    </LegalArticle>
  );

  return (
    <Section className="mx-auto max-w-page px-8 pt-6 pb-24">
      <div className={`max-w-hero ${SECTION_GUTTERS}`}>
        <LegalArticle
          number={t("publisher.number")}
          title={t("publisher.title")}
        >
          <div className="mb-3.5 rounded-panel border border-ink/10 bg-card px-6.5 py-6">
            <div className="mb-3 font-mono text-tag tracking-badge text-g52 uppercase">
              {t("publisher.card.label")}
            </div>
            <div className="mb-2 text-lead-sm font-semibold">
              {t("publisher.card.name")}
            </div>
            <div className="text-base leading-address text-ink/72">
              {t("publisher.card.trade")}
              <br />
              {t("publisher.card.street")}
              <br />
              {t("publisher.card.city")}
              <br />
              <a href={`mailto:${email}`} className="text-g52">
                {email}
              </a>
              <br />
              <a
                href={`tel:${phone.replaceAll(" ", "")}`}
                className="text-inherit hover:text-g52"
              >
                {phone}
              </a>
            </div>
          </div>
          {PUBLISHER_PARAGRAPHS.map((paragraph) => (
            <p key={paragraph} className={PARAGRAPH}>
              {t.rich(`publisher.paragraphs.${paragraph}`, {
                strong: strongPlainTag,
              })}
            </p>
          ))}
        </LegalArticle>

        {simple("content")}
        {simple("property")}

        <LegalArticle number={t("privacy.number")} title={t("privacy.title")}>
          <div className="mb-1 rounded-r-panel border border-l-2 border-ink/10 border-l-g52 bg-card px-6 py-5">
            <p className="text-body leading-legal text-ink/78">
              {t("privacy.notice")}
            </p>
          </div>
          {PRIVACY_TOPICS.map((topic) => (
            <Fragment key={topic}>
              <h3 className={TOPIC}>{t(`privacy.topics.${topic}.title`)}</h3>
              <p className={PARAGRAPH}>{t(`privacy.topics.${topic}.text`)}</p>
            </Fragment>
          ))}
        </LegalArticle>

        {simple("links")}
        {simple("liability")}
        {simple("law")}

        <div className="border-t border-ink/10 pt-5.5 font-mono text-caption tracking-hint text-ink/45">
          {t("updated")}
        </div>
      </div>
    </Section>
  );
}
