import { getTranslations } from "next-intl/server";

import { CtaBand } from "@/components/layout/cta-band";
import { FaqAccordion } from "@/components/layout/faq-accordion";
import { PageIntro } from "@/components/layout/page-intro";
import { PageShell } from "@/components/layout/page-shell";
import { gutters, mobileStack } from "@/components/layout/responsive";
import { headingTags, strongTags, titleTags } from "@/components/ui/rich-text";
import { faqItemKeys } from "@/config/content/fr/faq";
import { contactLinks, routes } from "@/config/content/site";
import { cn } from "@/utils/cn";
import { createPageMetadata } from "@/utils/page-metadata";

export function generateMetadata() {
  return createPageMetadata("faq", routes.faq);
}

export default async function FaqPage() {
  const t = await getTranslations("faq");
  const tCommon = await getTranslations("common");

  return (
    <PageShell activeNav="faq">
      <PageIntro
        chip={t("intro.chip")}
        title={t.rich("intro.title", titleTags())}
        lead={t("intro.lead")}
      />
      <section
        className={cn(
          "mx-auto max-w-content px-8 pt-14 pb-24",
          gutters,
          mobileStack,
        )}
      >
        <FaqAccordion
          items={faqItemKeys.map((key) => ({
            key,
            question: t(`items.${key}.question`),
            answer: t.rich(`items.${key}.answer`, strongTags()),
          }))}
          signs={{
            open: tCommon("signs.times"),
            closed: tCommon("signs.plus"),
          }}
        />
      </section>
      <CtaBand
        title={t.rich("cta.title", headingTags("light"))}
        text={t("cta.text")}
        button={{ href: routes.contact, label: t("cta.button") }}
        email={{ href: contactLinks.email, label: tCommon("email") }}
      />
    </PageShell>
  );
}
