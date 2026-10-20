import { useTranslations } from "next-intl";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { highlightTag } from "@/components/ui/rich-text";
import { Section } from "@/components/ui/section";

// Options and their prices; "Refonte de site existant" has no CHF unit ("sur devis").
const OPTIONS = [
  "page",
  "copywriting",
  "blog",
  "language",
  "newsletter",
  "booking",
  "members",
  "redesign",
  "smallChange",
  "mediumChange",
] as const;
const WITHOUT_CURRENCY = new Set<string>(["redesign"]);

// "Besoin de plus ?" — price list of the options (pricing page); rows light up on hover.
export function OptionsSection() {
  const t = useTranslations("pricing.options");

  return (
    <Section className="border-t border-ink/10">
      <Container className="pt-21 pb-23">
        <div className="reveal">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="mt-3.5 text-h2 font-semibold tracking-heading max-md:text-h2-mobile">
            {t.rich("title", { mark: highlightTag })}
          </h2>
          <p className="mt-5 max-w-copy text-prose leading-text text-pretty text-ink/62">
            {t("text")}
          </p>
        </div>
        <div className="mt-9.5 grid reveal grid-cols-options gap-x-14 gap-y-0 border-t border-ink max-nav:grid-cols-single">
          {OPTIONS.map((option) => (
            <div
              key={option}
              data-menu-row=""
              className="grid grid-cols-pair items-baseline gap-5 rounded-row border-b border-ink/9 px-3 py-4.5 transition-colors duration-250 ease-standard data-hover:bg-card max-md:gap-3.5 max-md:px-0.5"
            >
              <span className="text-body text-ink/80">
                {t(`items.${option}.name`)}
              </span>
              <span className="font-mono text-body-lg tracking-title whitespace-nowrap">
                {t(`items.${option}.price`)}
                {WITHOUT_CURRENCY.has(option) ? null : (
                  <span className="ml-1.25 text-note text-ink/45">
                    {t("currency")}
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
