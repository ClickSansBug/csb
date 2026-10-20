import { useTranslations } from "next-intl";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { highlightTag } from "@/components/ui/rich-text";
import { RuledColumn } from "@/components/ui/ruled-column";
import { Section } from "@/components/ui/section";

const PROMISES = ["commitment", "warranty", "ownership"] as const;

// "Trois choses, tenues." — the three promises (process page).
export function PromisesSection() {
  const t = useTranslations("process.promises");

  return (
    <Section className="border-t border-ink/10 bg-card">
      <Container className="pt-21 pb-23">
        <Eyebrow className="reveal">{t("eyebrow")}</Eyebrow>
        <h2 className="mt-4 reveal text-h2 font-semibold tracking-heading max-md:text-h2-mobile">
          {t.rich("title", { mark: highlightTag })}
        </h2>
        <div className="mt-11.5 border-y-2 border-ink">
          <div className="grid grid-cols-columns max-nav:grid-cols-single">
            {PROMISES.map((promise) => (
              <RuledColumn key={promise} className="reveal px-6.5 pt-8 pb-8.5">
                <div className="font-mono text-caption tracking-label text-g52 uppercase">
                  {t(`items.${promise}.number`)}
                </div>
                <h3 className="mt-5 mb-2.5 text-title font-semibold tracking-card-title">
                  {t(`items.${promise}.title`)}
                </h3>
                <p className="text-ui leading-prose text-pretty text-ink/60">
                  {t(`items.${promise}.text`)}
                </p>
              </RuledColumn>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
