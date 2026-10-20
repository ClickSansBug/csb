import { useTranslations } from "next-intl";

import { BulletItem } from "@/components/ui/bullet-item";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { contactWithOffer } from "@/config/routes";

import { type PackTab, PackTabs } from "./pack-tabs";

// Display order of the packs and of their features; "Présence" is selected by default.
const PACKS = {
  essential: {
    offer: "essentiel",
    features: [
      "page",
      "design",
      "screens",
      "form",
      "security",
      "seo",
      "revisions",
      "warranty",
      "upgrade",
    ],
    highlighted: "upgrade",
  },
  presence: {
    offer: "presence",
    features: [
      "pages",
      "design",
      "form",
      "security",
      "seo",
      "speed",
      "revisions",
      "warranty",
    ],
    highlighted: null,
  },
  performance: {
    offer: "performance",
    features: [
      "pages",
      "shop",
      "payment",
      "seo",
      "training",
      "warranty",
      "extras",
    ],
    highlighted: null,
  },
} as const;

type PackId = keyof typeof PACKS;

const LABEL = "font-mono text-tag tracking-label text-ink/40 uppercase";
const UNIT = "font-mono text-base text-ink/45";

export function PricingPacks() {
  const t = useTranslations("pricing.packs");

  const tabs: PackTab[] = (Object.keys(PACKS) as PackId[]).map((id) => {
    const pack = PACKS[id];
    return {
      id,
      label: t(`items.${id}.name`),
      panel: (
        <>
          <div className="py-11 pr-11.5 pl-0 max-lg:px-0 max-lg:pt-8.5 max-lg:pb-7.5">
            <div className={LABEL}>{t(`items.${id}.ref`)}</div>
            <div className="mt-3.5 flex flex-wrap items-baseline">
              <h2 className="text-heading-xl font-semibold tracking-heading">
                {t(`items.${id}.name`)}
              </h2>
            </div>
            <div className="mt-6.5 flex items-baseline gap-2.5">
              {id === "performance" ? (
                <span className={UNIT}>{t("items.performance.prefix")}</span>
              ) : null}
              <span className="font-mono text-price leading-price font-medium tracking-price">
                {t(`items.${id}.price`)}
              </span>
              <span className={UNIT}>{t("currency")}</span>
            </div>
            <div className="mt-3.5 font-mono text-tag tracking-spec text-ink/40 uppercase">
              {t(`items.${id}.spec`)}
            </div>
            <p className="mt-6.5 max-w-copy-xs text-body-lg leading-text text-pretty text-ink/68">
              {t(`items.${id}.text`)}
            </p>
            <ButtonLink
              href={contactWithOffer(pack.offer)}
              tone="ink"
              size="md"
              className="mt-8.5"
            >
              {t("choose")}
            </ButtonLink>
          </div>
          <div className="border-l border-ink/10 py-11 pr-0 pl-11.5 max-lg:border-t max-lg:border-l-0 max-lg:px-0 max-lg:pt-0 max-lg:pb-8.5">
            <div className={LABEL}>{t("included")}</div>
            <ul className="mt-4.5">
              {pack.features.map((feature) => (
                <BulletItem
                  key={feature}
                  bullet={t("bullet")}
                  tone={feature === pack.highlighted ? "highlight" : "default"}
                >
                  {t(
                    `items.${id}.features.${feature}` as Parameters<
                      typeof t
                    >[0],
                  )}
                </BulletItem>
              ))}
            </ul>
          </div>
        </>
      ),
    };
  });

  return (
    <Section className="border-t border-ink/10 bg-card">
      <Container className="pt-16 pb-21">
        <PackTabs tabs={tabs} defaultTab="presence" />
      </Container>
    </Section>
  );
}
