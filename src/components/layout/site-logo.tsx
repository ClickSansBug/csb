import { useTranslations } from "next-intl";

import { Logo } from "@/components/ui/logo";
import { ROUTES } from "@/config/routes";

type SiteLogoProps = {
  size?: "header" | "footer";
};

// Text logo of the site (common.logo), linking to the home page.
export function SiteLogo({ size }: SiteLogoProps) {
  const t = useTranslations("common");

  return (
    <Logo
      href={ROUTES.home}
      size={size}
      start={t("logo.start")}
      accent={t("logo.accent")}
      end={t("logo.end")}
    />
  );
}
