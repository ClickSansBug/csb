import { useTranslations } from "next-intl";

import { Container } from "@/components/ui/container";
import { DividerLabel } from "@/components/ui/divider-label";
import { Eyebrow } from "@/components/ui/eyebrow";
import { LitGlow } from "@/components/ui/lit-glow";
import { highlightTag } from "@/components/ui/rich-text";
import { Section } from "@/components/ui/section";
import { cn } from "@/utils/cn";

const MEMBERS = ["adrien", "ralph"] as const;
const TEXT = "text-lead-sm leading-prose text-pretty text-ink/68";

// "L'équipe" — the two partners, with the cursor halo on their cards (home page).
export function TeamSection() {
  const t = useTranslations("home.team");

  return (
    <Section className="border-t border-ink/10 bg-card">
      <Container className="grid grid-cols-split items-start gap-14 pt-22 pb-24 max-nav:grid-cols-single">
        <div className="reveal">
          <div>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
          </div>
          <h2 className="mt-3.5 mb-5.5 text-h2 font-semibold tracking-heading max-md:text-h2-mobile">
            {t.rich("title", { mark: highlightTag })}
          </h2>
          <p className={`mb-4 ${TEXT}`}>{t("intro")}</p>
          <p className={TEXT}>{t("promise")}</p>
        </div>
        <div className="reveal">
          <DividerLabel className="mb-1" start={t("label")} end={t("region")} />
          <div className="border-y-2 border-ink">
            {MEMBERS.map((member, index) => (
              <div
                key={member}
                data-lit=""
                className={cn(
                  "relative grid reveal grid-cols-person items-start gap-5.5 rounded-sm py-6.5 pr-5 pl-0",
                  index > 0 && "border-t border-ink/12",
                )}
              >
                <div className="pl-1 font-mono text-heading-xl leading-price font-medium tracking-price text-ink/16">
                  {t(`members.${member}.initials`)}
                </div>
                <div>
                  <div className="text-title-md font-semibold tracking-title">
                    {t(`members.${member}.name`)}
                  </div>
                  <div className="mt-1.25 text-base leading-snug text-ink/62">
                    {t(`members.${member}.role`)}
                  </div>
                  <div className="mt-3.5 font-mono text-tag tracking-badge text-ink/40 uppercase">
                    {t(`members.${member}.skills`)}
                  </div>
                </div>
                <LitGlow />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
