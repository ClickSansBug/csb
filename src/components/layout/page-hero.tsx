import { useTranslations } from "next-intl";

import { AccentRule } from "@/components/ui/accent-rule";
import { Badge } from "@/components/ui/badge";
import { titleAccentTag } from "@/components/ui/rich-text";
import { Section, SECTION_GUTTERS } from "@/components/ui/section";
import { cn } from "@/utils/cn";

type PageHeroProps = {
  page: "pricing" | "process" | "faq" | "legal";
  // Pricing ends its hero 4px higher (20px) than Process, FAQ and the legal notice (24px).
  tight?: boolean;
  // Legal notice: still rule and a 17.5px introduction.
  legal?: boolean;
};

// Title block at the top of the Pricing, Process, FAQ and legal pages (texts in <page>.hero).
export function PageHero({
  page,
  tight = false,
  legal = false,
}: PageHeroProps) {
  const t = useTranslations();
  const badge = t(`${page}.hero.badge`);
  const title = t.rich(`${page}.hero.title`, { em: titleAccentTag });
  const text = t(`${page}.hero.text`);

  return (
    <Section
      className={cn("mx-auto max-w-page px-8 pt-22", tight ? "pb-5" : "pb-6")}
    >
      <div className={cn("max-w-hero reveal", SECTION_GUTTERS)}>
        <div className="flex items-center gap-3.5">
          <Badge label={badge} />
        </div>
        <h1 className="mt-5.5 text-display leading-display font-semibold tracking-display text-balance max-md:text-display-mobile">
          {title}
        </h1>
        {legal ? (
          <AccentRule animated={false} className="mt-7" />
        ) : (
          <AccentRule className="mt-6" />
        )}
        <p
          className={
            legal
              ? "mt-6.5 max-w-legal-lead text-lead leading-prose text-ink/66"
              : "mt-7 text-lead-lg leading-lead text-pretty text-ink/66"
          }
        >
          {text}
        </p>
      </div>
    </Section>
  );
}
