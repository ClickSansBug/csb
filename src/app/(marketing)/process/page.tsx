import { getTranslations } from "next-intl/server";

import { CtaBand } from "@/components/layout/cta-band";
import { PageIntro } from "@/components/layout/page-intro";
import { PageShell } from "@/components/layout/page-shell";
import { ProcessStep } from "@/components/layout/process-step";
import { ProcessTimeline } from "@/components/layout/process-timeline";
import { PromisesSection } from "@/components/layout/promises-section";
import { gutters, mobileStack } from "@/components/layout/responsive";
import {
  CheckCircleIcon,
  DocumentIcon,
  MailIcon,
  ScreenIcon,
} from "@/components/ui/icons";
import { headingTags, strongTags, titleTags } from "@/components/ui/rich-text";
import {
  processPromiseKeys,
  processStepKeys,
} from "@/config/content/fr/process";
import { contactLinks, routes } from "@/config/content/site";
import { cn } from "@/utils/cn";
import { createPageMetadata } from "@/utils/page-metadata";

export function generateMetadata() {
  return createPageMetadata("process", routes.process);
}

const stepIcons = {
  contact: MailIcon,
  quote: DocumentIcon,
  build: ScreenIcon,
  launch: CheckCircleIcon,
} as const;

export default async function ProcessPage() {
  const t = await getTranslations("process");
  const tCommon = await getTranslations("common");

  return (
    <PageShell activeNav="process">
      <PageIntro
        chip={t("intro.chip")}
        title={t.rich("intro.title", titleTags())}
        lead={t("intro.lead")}
      />
      <section
        className={cn(
          "mx-auto max-w-content px-8 pt-16 pb-24",
          gutters,
          mobileStack,
        )}
      >
        <ProcessTimeline>
          {processStepKeys.map((key, index) => {
            const Icon = stepIcons[key];
            return (
              <ProcessStep
                key={key}
                number={t(`steps.${key}.number`)}
                icon={<Icon className="size-5 flex-none text-brand" />}
                badge={t(`steps.${key}.badge`)}
                title={t(`steps.${key}.title`)}
                text={t.rich(`steps.${key}.text`, strongTags())}
                last={index === processStepKeys.length - 1}
              />
            );
          })}
        </ProcessTimeline>
      </section>
      <PromisesSection
        eyebrow={t("promises.eyebrow")}
        title={t.rich("promises.title", headingTags())}
        items={processPromiseKeys.map((key) => ({
          key,
          number: t(`promises.items.${key}.number`),
          title: t(`promises.items.${key}.title`),
          text: t(`promises.items.${key}.text`),
        }))}
      />
      <CtaBand
        title={t.rich("cta.title", headingTags("light"))}
        text={t("cta.text")}
        button={{ href: routes.contact, label: t("cta.button") }}
        email={{ href: contactLinks.email, label: tCommon("email") }}
      />
    </PageShell>
  );
}
