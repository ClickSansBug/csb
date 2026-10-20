import { useTranslations } from "next-intl";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { accentTag } from "@/components/ui/rich-text";
import { Section } from "@/components/ui/section";
import { ROUTES } from "@/config/routes";
import { cn } from "@/utils/cn";

type CtaBannerProps = {
  page: "home" | "pricing" | "process" | "faq";
};

// Dark call-to-action band before the footer (texts in common.cta.<page>).
export function CtaBanner({ page }: CtaBannerProps) {
  const t = useTranslations("common.cta");
  const email = useTranslations("common")("email");
  // Only the home page band has a label above its title.
  const eyebrow = page === "home" ? t("home.eyebrow") : null;

  return (
    <Section className="bg-island text-paper island">
      <Container className="pt-24 pb-26 text-center">
        <div className="mx-auto max-w-cta reveal">
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h2
            className={cn(
              "mb-4.5 text-h2-cta font-semibold tracking-display max-md:text-h2-mobile",
              eyebrow ? "mt-4" : "mt-0",
            )}
          >
            {t.rich(`${page}.title`, { em: accentTag })}
          </h2>
          <p className="mx-auto mb-8 max-w-copy text-lead-sm leading-text text-pretty text-paper/70">
            {t(`${page}.text`)}
          </p>
          <ButtonLink href={ROUTES.contact} tone="light" size="lg">
            {t(`${page}.button`)}
          </ButtonLink>
          <div className="mt-5.5">
            <a
              href={`mailto:${email}`}
              className="font-mono text-note tracking-hint text-paper/55 hover:text-paper"
            >
              {email}
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
