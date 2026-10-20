import { useTranslations } from "next-intl";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { accentTag } from "@/components/ui/rich-text";
import { Section } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { ROUTES } from "@/config/routes";

import { OfferRow } from "./offer-row";

const OFFERS = ["essential", "presence", "performance"] as const;

// "Nos offres" — the three packs, each line leading to the pricing page (home page).
export function OffersSection() {
  const t = useTranslations("home.offers");

  return (
    <Section className="border-t border-ink/10">
      <Container className="pt-22 pb-24">
        <div className="mb-11.5 reveal">
          <div>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h2 className="mt-3.5 text-h2 font-semibold tracking-heading max-md:text-h2-mobile">
              {t.rich("title", { em: accentTag })}
            </h2>
          </div>
        </div>
        <div className="border-t border-ink/10">
          {OFFERS.map((offer) => (
            <OfferRow
              key={offer}
              href={ROUTES.pricing}
              name={t(`items.${offer}.name`)}
              text={t(`items.${offer}.text`)}
              currency={t(`items.${offer}.currency`)}
              price={t(`items.${offer}.price`)}
              delay={t(`items.${offer}.delay`)}
              arrow={t("arrow")}
            />
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-baseline justify-between gap-5">
          <p className="font-mono text-eyebrow tracking-note text-ink/42">
            {t("note")}
          </p>
          <TextLink href={ROUTES.pricing}>{t("link")}</TextLink>
        </div>
      </Container>
    </Section>
  );
}
