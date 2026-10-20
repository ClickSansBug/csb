import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

import { SkipLink } from "@/components/ui/skip-link";
import { cn } from "@/utils/cn";

import { PageEffects } from "./page-effects";
import { SiteFooter } from "./site-footer";
import { type NavKey, SiteHeader } from "./site-header";

type PageShellProps = {
  current?: NavKey;
  contact?: boolean;
  children: ReactNode;
};

// Frame of every public page: grain, sticky header, <main>, footer and page behaviours.
// The Contact page has its own theme (charcoal at night, white by day).
export function PageShell({
  current,
  contact = false,
  children,
}: PageShellProps) {
  const t = useTranslations("common");

  return (
    <div
      className={cn(
        "relative overflow-x-clip",
        contact && "min-h-screen bg-island text-paper theme-contact",
      )}
    >
      <SkipLink label={t("skipLink")} inverted={contact} />
      <div
        aria-hidden="true"
        className={cn("grain", contact ? "grain-overlay" : "grain-drift")}
      />
      <SiteHeader current={current} contact={contact} />
      <main id="main">{children}</main>
      <SiteFooter contact={contact} />
      <PageEffects />
      <noscript>
        {/* integration-allow: CSS rule of the <noscript> block (clarifications.md › Rendu sans JavaScript), not visible text */}
        <style>{".reveal{opacity:1;transform:none}"}</style>
      </noscript>
    </div>
  );
}
