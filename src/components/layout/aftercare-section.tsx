import { useTranslations } from "next-intl";

import { AccentRule } from "@/components/ui/accent-rule";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { highlightTag, strongTag } from "@/components/ui/rich-text";
import { Section } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { ROUTES } from "@/config/routes";

const LABEL = "mb-2.5 font-mono text-tag tracking-eyebrow text-g52 uppercase";
const TEXT = "text-lead-sm leading-text text-pretty text-ink/72";

// "Et après ?" — what happens after going live (home page). The cursor halo of the design is
// not reproduced on these two blocks (clarifications.md › frontend-integrator, 2026-10-18, point 1).
export function AftercareSection() {
  const t = useTranslations("home.aftercare");

  return (
    <Section className="border-t border-ink/10">
      <Container className="grid grid-cols-split items-start gap-14 pt-22 pb-24 max-nav:grid-cols-single">
        <div className="reveal">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="mt-3.5 text-h2 font-semibold tracking-heading max-md:text-h2-mobile">
            {t.rich("title", { mark: highlightTag })}
          </h2>
          <AccentRule className="mt-5.5" />
        </div>
        <div className="reveal">
          <div className="border-t-2 border-ink">
            <div className="border-b border-ink/12 pt-6.5 pb-6">
              <div className={LABEL}>{t("free.label")}</div>
              <p className={TEXT}>{t("free.text")}</p>
            </div>
            <div className="border-b-2 border-ink pt-6.5 pb-6">
              <div className={LABEL}>{t("then.label")}</div>
              <p className={`mb-2 ${TEXT}`}>
                {t.rich("then.text", { strong: strongTag })}
              </p>
              <p className={TEXT}>{t("then.alternative")}</p>
            </div>
          </div>
          <div className="mt-5.5">
            <TextLink href={ROUTES.pricing}>{t("link")}</TextLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
