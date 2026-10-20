import { useTranslations } from "next-intl";
import { Fragment } from "react";

import { AccentRule } from "@/components/ui/accent-rule";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { DividerLabel } from "@/components/ui/divider-label";
import { LoopVideo } from "@/components/ui/loop-video";
import { titleAccentTag } from "@/components/ui/rich-text";
import { Section, SECTION_GUTTERS } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { Typewriter } from "@/components/ui/typewriter";
import { HERO_VIDEO } from "@/config/media";
import { ROUTES } from "@/config/routes";
import { cn } from "@/utils/cn";

const FACTS = ["price", "warranty", "ownership"] as const;

export function HomeHero() {
  const t = useTranslations("home.hero");

  return (
    <Section className="mx-auto grid max-w-page grid-cols-hero items-center gap-16 px-8 pt-23 pb-22 max-nav:grid-cols-single">
      <div className={cn("reveal", SECTION_GUTTERS)}>
        <Badge tone="home" label={t("badge")} />
        <h1 className="mt-6.5 text-display leading-display font-semibold tracking-display text-balance max-md:text-display-mobile">
          {t.rich("title", { em: titleAccentTag })}
        </h1>
        <AccentRule className="mt-6" />
        <p className="mt-7.5 max-w-copy-sm text-lead-lg leading-lead text-pretty text-ink/66">
          {t("text")}
        </p>
        <div className="mt-9 flex flex-wrap gap-3.5">
          <ButtonLink href={ROUTES.contact} tone="ink" size="md">
            {t("primary")}
          </ButtonLink>
          <ButtonLink href={ROUTES.pricing} tone="outline" size="md">
            {t("secondary")}
          </ButtonLink>
        </div>
        <div className="mt-12 flex reveal flex-wrap items-center gap-4.5 border-t border-ink/10 pt-6.5 font-mono text-eyebrow tracking-facts text-ink/45 uppercase">
          {FACTS.map((fact, index) => (
            <Fragment key={fact}>
              {index > 0 ? (
                <span
                  aria-hidden="true"
                  className="size-0.75 rounded-circle bg-ink/25"
                />
              ) : null}
              <span>{t(`facts.${fact}`)}</span>
            </Fragment>
          ))}
        </div>
      </div>

      <div className={SECTION_GUTTERS}>
        <DividerLabel
          className="mb-4 reveal"
          start={t("preview.label")}
          end={t("preview.caption")}
        />
        <div
          data-tilt=""
          className="relative overflow-hidden rounded-card border border-ink/10 bg-card shadow-mockup transition-transform duration-350 ease-reveal"
        >
          <div className="flex items-center gap-2 border-b border-ink/8 px-4 py-3.25">
            <span
              aria-hidden="true"
              className="size-2.25 rounded-circle bg-ink/14"
            />
            <span
              aria-hidden="true"
              className="size-2.25 rounded-circle bg-ink/14"
            />
            <span
              aria-hidden="true"
              className="size-2.25 rounded-circle bg-ink/14"
            />
            <div className="ml-2 flex flex-1 items-center rounded-sm bg-ink/4.5 px-2.75 py-1.25 font-mono text-eyebrow text-ink/55">
              <Typewriter text={t("preview.url")} />
              <span
                aria-hidden="true"
                className="ml-0.5 h-3 w-px animate-caret bg-brand motion-reduce:animate-none"
              />
            </div>
          </div>
          <div className="relative aspect-video overflow-hidden border-b border-ink/8 bg-paper">
            <LoopVideo
              src={HERO_VIDEO.src}
              poster={HERO_VIDEO.poster}
              label={t("preview.video")}
            />
          </div>
          <div className="px-7 pt-5 pb-6">
            <div className="flex flex-wrap gap-2">
              <Tag tone="neutral">{t("preview.tags.colors")}</Tag>
              <Tag tone="green">{t("preview.tags.delay")}</Tag>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
