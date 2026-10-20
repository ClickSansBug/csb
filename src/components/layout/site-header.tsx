import { useTranslations } from "next-intl";

import { ButtonLink } from "@/components/ui/button-link";
import { Logo } from "@/components/ui/logo";
import { type RouteKey, ROUTES } from "@/config/routes";

import { HeaderBar } from "./header-bar";

export type NavKey = Extract<RouteKey, "pricing" | "process" | "faq">;

const HEADER_LINKS: NavKey[] = ["pricing", "process", "faq"];
const MENU_LINKS = ["pricing", "process", "faq", "contact", "legal"] as const;

type SiteHeaderProps = {
  current?: NavKey;
  contact?: boolean;
};

export function SiteHeader({ current, contact = false }: SiteHeaderProps) {
  const t = useTranslations("common");

  return (
    <HeaderBar
      contact={contact}
      navLabel={t("nav.label")}
      openMenuLabel={t("nav.openMenu")}
      closeMenuLabel={t("nav.closeMenu")}
      logo={
        <Logo
          href={ROUTES.home}
          start={t("logo.start")}
          accent={t("logo.accent")}
          end={t("logo.end")}
        />
      }
      links={HEADER_LINKS.map((key) => ({
        href: ROUTES[key],
        label: t(`nav.${key}`),
        current: key === current,
      }))}
      menuLinks={MENU_LINKS.map((key) => ({
        href: ROUTES[key],
        label: t(`nav.${key}`),
        current: key === current,
      }))}
      cta={
        <ButtonLink
          href={ROUTES.contact}
          tone={contact ? "brand" : "ink"}
          size="sm"
          className="max-nav:inline-flex max-nav:items-center"
        >
          {t("nav.start")}
        </ButtonLink>
      }
    />
  );
}
