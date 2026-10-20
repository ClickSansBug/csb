import Link from "next/link";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

import { ROUTES } from "@/config/routes";
import type { Pack, SiteType } from "@/features/contact";

import { ContactForm } from "./contact-form";
import { ContactIntro } from "./contact-intro";

// Codes of the action contract (backend-report.md › backend-manifest), in display order.
const SITE_TYPES: SiteType[] = [
  "vitrine",
  "complet",
  "ecommerce",
  "grosprojet",
];
const PACKS: {
  value: Pack;
  key: "indecis" | "essentiel" | "presence" | "performance" | "surMesure";
}[] = [
  { value: "indecis", key: "indecis" },
  { value: "essentiel", key: "essentiel" },
  { value: "presence", key: "presence" },
  { value: "performance", key: "performance" },
  { value: "sur-mesure", key: "surMesure" },
];
const ESSENTIALS = [0, 1, 2, 3, 4, 5];
const COLUMN_GUTTERS = "max-lg:px-6 max-sm:px-4.5";

// Contact page: introduction and the project brief card.
export function ContactSection() {
  const t = useTranslations("contact.form");
  const email = useTranslations("common")("email");

  const privacyLink = (chunks: ReactNode) => (
    <Link
      href={ROUTES.legal}
      className="text-paper-lift-38 underline hover:text-accent-text"
    >
      {chunks}
    </Link>
  );
  const mailLink = (chunks: ReactNode) => (
    <a href={`mailto:${email}`} className="text-accent-text underline">
      {chunks}
    </a>
  );
  // Fallback link of the sending failure message, in the colour of the message
  // (clarifications.md › Réponses aux questions de wiring, point 1).
  const failureLink = (chunks: ReactNode) => (
    <a href={`mailto:${email}`} className="text-error underline">
      {chunks}
    </a>
  );

  return (
    <section className="mx-auto grid max-w-page grid-cols-hero items-start gap-16 px-8 pt-19 pb-24 max-lg:px-6 max-nav:grid-cols-single max-sm:px-4.5">
      <ContactIntro className={COLUMN_GUTTERS} />
      <div
        className={`reveal rounded-card border border-paper/12 bg-form-bg px-7.5 pt-8 pb-8.5 ${COLUMN_GUTTERS}`}
      >
        <ContactForm
          labels={{
            brief: t("brief"),
            title: t("title"),
            intro: t("intro"),
            type: t("type.label"),
            company: {
              label: t("company.label"),
              placeholder: t("company.placeholder"),
            },
            name: {
              label: t("name.label"),
              placeholder: t("name.placeholder"),
            },
            activity: {
              label: t("activity.label"),
              placeholder: t("activity.placeholder"),
            },
            email: {
              label: t("email.label"),
              placeholder: t("email.placeholder"),
            },
            phone: {
              label: t("phone.label"),
              optional: t("phone.optional"),
              placeholder: t("phone.placeholder"),
            },
            pack: t("pack.label"),
            hintMissing: t("hint.missing"),
            hintReady: t("hint.ready"),
            submit: t("submit"),
            pending: t("pending"),
            reassurance: t("reassurance"),
            honeypot: t("honeypot"),
            success: {
              title: t("success.title"),
              text: t("success.text"),
              reset: t("success.reset"),
            },
          }}
          progress={ESSENTIALS.map((count) => t("progress", { count }))}
          siteTypes={SITE_TYPES.map((value) => ({
            value,
            label: t(`type.options.${value}.label`),
            hint: t(`type.options.${value}.hint`),
          }))}
          packs={PACKS.map(({ value, key }) => ({
            value,
            label: t(`pack.options.${key}`),
          }))}
          privacy={t.rich("privacy", { link: privacyLink })}
          failure={t.rich("failure", { link: failureLink })}
        />
        <noscript>
          {/* integration-allow: CSS rule of the <noscript> block (clarifications.md › Sans JavaScript), not visible text */}
          <style>{".contact-form{display:none}"}</style>
          <div className="py-11 text-center">
            <p className="mx-auto max-w-copy-sm text-body leading-text text-paper/68">
              {t.rich("noscript", { link: mailLink })}
            </p>
          </div>
        </noscript>
      </div>
    </section>
  );
}
