import { useTranslations } from "next-intl";
import type { ComponentType } from "react";

import { AccentRule } from "@/components/ui/accent-rule";
import { Badge } from "@/components/ui/badge";
import { IconClock } from "@/components/ui/icon-clock";
import { IconPin } from "@/components/ui/icon-pin";
import { titleAccentTag } from "@/components/ui/rich-text";
import { cn } from "@/utils/cn";

const HIGHLIGHTS: {
  id: "reply" | "location";
  Icon: ComponentType<{ className?: string }>;
}[] = [
  { id: "reply", Icon: IconClock },
  { id: "location", Icon: IconPin },
];
const PEOPLE = ["adrien", "ralph"] as const;

type ContactIntroProps = {
  className?: string;
};

// Left column of the Contact page: title, reply time, location and the two partners.
export function ContactIntro({ className }: ContactIntroProps) {
  const t = useTranslations("contact");

  return (
    <div className={cn("reveal", className)}>
      <div className="flex items-center gap-3.5">
        <Badge tone="contact" label={t("hero.badge")} />
      </div>
      <h1 className="mt-5.5 text-display leading-display font-semibold tracking-display text-balance max-md:text-display-mobile">
        {t.rich("hero.title", { em: titleAccentTag })}
      </h1>
      <AccentRule className="mt-6" />
      <p className="mt-7 max-w-copy-sm text-lead leading-text text-pretty text-paper/70">
        {t("hero.text")}
      </p>

      <div className="mt-10 grid gap-5.5 border-t border-paper/14 pt-8">
        {HIGHLIGHTS.map(({ id, Icon }) => (
          <div key={id} className="grid grid-cols-icon items-start gap-4">
            <Icon className="size-5.5 text-accent-text" />
            <div>
              <div className="text-body-lg font-semibold">
                {t(`highlights.${id}.title`)}
              </div>
              <div className="mt-1 text-ui leading-compact text-paper/62">
                {t(`highlights.${id}.text`)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-9 border-y border-paper/28">
        {PEOPLE.map((person, index) => (
          <div
            key={person}
            className={cn(
              "grid grid-cols-person-sm items-baseline gap-4.5 py-5",
              index > 0 && "border-t border-paper/12",
            )}
          >
            <div className="font-mono text-heading-md leading-price font-medium tracking-initials text-paper/26">
              {t(`people.${person}.initials`)}
            </div>
            <div>
              <div className="text-lead-sm font-semibold">
                {t(`people.${person}.name`)}
              </div>
              <div className="mt-1.5 font-mono text-tag tracking-badge text-paper-lift-45 uppercase">
                {t(`people.${person}.role`)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
