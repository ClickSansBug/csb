import { useTranslations } from "next-intl";

import { Container } from "@/components/ui/container";
import { RuledColumn } from "@/components/ui/ruled-column";
import { Section } from "@/components/ui/section";

const TERMS = ["payment", "deployment", "ownership"] as const;

// Payment, deployment and ownership terms, under the packs (pricing page).
export function PricingTerms() {
  const t = useTranslations("pricing.terms");

  return (
    <Section className="border-t border-ink/10">
      <Container>
        <div className="grid grid-cols-terms border-b border-ink/10 max-nav:grid-cols-single">
          {TERMS.map((term) => (
            <RuledColumn
              key={term}
              className="reveal pt-7.5 pr-6.5 pb-8.5 pl-6.5"
            >
              <h2 className="font-mono text-caption tracking-eyebrow text-g52 uppercase">
                {t(`${term}.title`)}
              </h2>
              <p className="mt-3 text-ui leading-text text-pretty text-ink/60">
                {t(`${term}.text`)}
              </p>
            </RuledColumn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
