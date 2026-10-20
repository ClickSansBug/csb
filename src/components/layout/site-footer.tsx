import Link from "next/link";
import { useFormatter, useTranslations } from "next-intl";

import { ButtonLink } from "@/components/ui/button-link";
import { Logo } from "@/components/ui/logo";
import { ROUTES } from "@/config/routes";
import { cn } from "@/utils/cn";

const FOOTER_LINKS = ["pricing", "process", "faq", "contact"] as const;

type SiteFooterProps = {
  contact?: boolean;
};

// Dark footer of every page. On the Contact page it follows the page theme (lifted greys).
export function SiteFooter({ contact = false }: SiteFooterProps) {
  const t = useTranslations("common");
  const format = useFormatter();
  // Year computed at build time, Europe/Zurich time zone (clarifications.md › Pied de page : année).
  const year = format.dateTime(new Date(), { year: "numeric" });
  const linkTone = contact
    ? "text-paper-lift-55 hover:text-paper"
    : "text-paper/55 hover:text-paper";
  const bottomTone = contact
    ? "text-paper-lift-45 hover:text-paper"
    : "text-paper/45 hover:text-paper";

  return (
    <footer
      className={cn(
        "border-t border-paper/10 bg-island",
        contact ? "text-paper-lift-55" : "text-paper/55 island",
      )}
    >
      <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-6 px-8 pt-9 pb-4 max-lg:px-6 max-md:flex-col max-md:items-stretch max-md:gap-6.5 max-md:pt-11 max-md:pb-2.5 max-sm:px-4.5">
        <Logo
          href={ROUTES.home}
          size="footer"
          start={t("logo.start")}
          accent={t("logo.accent")}
          end={t("logo.end")}
        />
        <nav
          aria-label={t("footer.label")}
          className="flex flex-wrap gap-6.5 text-label max-md:grid max-md:grid-cols-halves max-md:gap-x-5 max-md:gap-y-4 max-md:text-base"
        >
          {FOOTER_LINKS.map((key) => (
            <Link key={key} href={ROUTES[key]} className={linkTone}>
              {t(`nav.${key}`)}
            </Link>
          ))}
        </nav>
        <ButtonLink
          href={ROUTES.contact}
          tone="brand"
          size="footer"
          className="max-md:self-start max-md:justify-self-start max-md:px-6.5 max-md:py-3.25"
        >
          {t("footer.start")}
        </ButtonLink>
      </div>
      <div className="mx-auto max-w-page px-8 max-lg:px-6 max-sm:px-4.5">
        <div
          className={cn(
            "flex flex-wrap items-center justify-between gap-4 border-t border-paper/10 pt-4.5 pb-7.5 font-mono text-caption tracking-footer",
            "max-md:flex-col max-md:items-start max-md:gap-3 max-md:pb-9 max-md:leading-text",
            contact ? "text-paper-lift-45" : "text-paper/45",
          )}
        >
          <div>{t("footer.copyright", { year })}</div>
          <Link href={ROUTES.legal} className={bottomTone}>
            {t("footer.legal")}
          </Link>
          <a href={`mailto:${t("email")}`} className={bottomTone}>
            {t("email")}
          </a>
        </div>
      </div>
    </footer>
  );
}
