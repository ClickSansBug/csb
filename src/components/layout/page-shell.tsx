import { getFormatter, getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import {
  contactLinks,
  footerLinks,
  headerLinks,
  menuLinks,
  type NavKey,
  type RouteKey,
  routes,
} from "@/config/content/site";
import { noScriptStyles } from "@/styles/no-script";
import { cn } from "@/utils/cn";

import { Grain } from "./grain";
import { PageEffects } from "./page-effects";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { SkipLink } from "./skip-link";

export const MAIN_CONTENT_ID = "contenu";

type PageShellProps = {
  // "island": the whole page is a dark block (design: contact.html).
  variant?: "default" | "island";
  activeNav?: RouteKey;
  children: ReactNode;
};

// Frame shared by every page except the 404: grain, sticky header, footer, page behaviours.
export async function PageShell({
  variant = "default",
  activeNav,
  children,
}: PageShellProps) {
  const t = await getTranslations("common");
  const format = await getFormatter();
  const island = variant === "island";

  const logo = {
    href: routes.home,
    start: t("logo.start"),
    highlight: t("logo.accent"),
    end: t("logo.end"),
  };
  const toLink = (key: NavKey) => ({
    key,
    href: routes[key],
    label: t(`nav.${key}`),
  });
  const start = { href: routes.contact, label: t("nav.start") };

  return (
    <div
      className={cn(
        "relative overflow-x-clip",
        island && "min-h-screen bg-island text-paper island selection:text-ink",
      )}
    >
      <SkipLink
        targetId={MAIN_CONTENT_ID}
        label={t("skipLink")}
        inverted={island}
      />
      <Grain variant={variant} />
      <SiteHeader
        variant={variant}
        logo={logo}
        navLabel={t("nav.label")}
        links={headerLinks.map(toLink)}
        activeKey={activeNav}
        start={start}
        menu={{
          links: menuLinks.map(toLink),
          openLabel: t("nav.openMenu"),
          closeLabel: t("nav.closeMenu"),
        }}
      />
      <main id={MAIN_CONTENT_ID}>{children}</main>
      <SiteFooter
        logo={logo}
        navLabel={t("footer.label")}
        links={footerLinks.map(toLink)}
        start={start}
        copyright={t("footer.copyright", {
          year: format.dateTime(new Date(), { year: "numeric" }),
        })}
        legal={{ href: routes.legal, label: t("nav.legal") }}
        email={{ href: contactLinks.email, label: t("email") }}
      />
      <PageEffects />
      <noscript dangerouslySetInnerHTML={{ __html: noScriptStyles }} />
    </div>
  );
}
