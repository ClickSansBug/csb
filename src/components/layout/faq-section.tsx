import { useTranslations } from "next-intl";

import { strongTag } from "@/components/ui/rich-text";
import { Section, SECTION_GUTTERS } from "@/components/ui/section";
import { cn } from "@/utils/cn";

import { FaqAccordion, type FaqEntry } from "./faq-accordion";

const QUESTIONS = [
  "onePage",
  "content",
  "hosting",
  "coverage",
  "payment",
  "changes",
  "start",
] as const;

// The seven questions of the FAQ page.
export function FaqSection() {
  const t = useTranslations("faq");

  const items: FaqEntry[] = QUESTIONS.map((id) => ({
    id,
    question: t(`items.${id}.question`),
    answer: t.rich(`items.${id}.answer`, { strong: strongTag }),
  }));

  return (
    <Section className="mx-auto max-w-page px-8 pt-14 pb-24">
      <FaqAccordion
        items={items}
        openSign={t("signs.open")}
        closedSign={t("signs.closed")}
        className={cn("max-w-faq reveal", SECTION_GUTTERS)}
      />
    </Section>
  );
}
