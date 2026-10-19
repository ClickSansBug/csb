import Link from "next/link";
import { getFormatter, getTranslations } from "next-intl/server";

import { MAIN_CONTENT_ID } from "@/components/layout/page-shell";
import { SkipLink } from "@/components/layout/skip-link";
import { AccentRule } from "@/components/ui/accent-rule";
import { ButtonLink } from "@/components/ui/button-link";
import { Logo } from "@/components/ui/logo";
import { headingTags } from "@/components/ui/rich-text";
import { StatusChip } from "@/components/ui/status-chip";
import { contactLinks, routes } from "@/config/content/site";
import { cn } from "@/utils/cn";

export async function generateMetadata() {
  const t = await getTranslations("metadata");
  return { title: t("notFound.title") };
}

const wrap = "mx-auto w-full max-w-content px-8 max-mobile:px-5";
const quietLink = "text-ink/66 hover:text-ink";

// 404 faithful to 404.html: simple header and footer, no grain, no animation
// (clarifications.md › Page 404).
export default async function NotFound() {
  const t = await getTranslations("notFound");
  const tCommon = await getTranslations("common");
  const format = await getFormatter();

  return (
    <div className="flex min-h-screen flex-col">
      <SkipLink targetId={MAIN_CONTENT_ID} label={tCommon("skipLink")} />
      <header className="h-17 border-b border-ink/8">
        <div
          className={cn(wrap, "flex h-full items-center justify-between gap-6")}
        >
          <Logo
            tone="plain"
            href={routes.home}
            start={tCommon("logo.start")}
            highlight={tCommon("logo.accent")}
            end={tCommon("logo.end")}
          />
          <nav
            aria-label={tCommon("nav.label")}
            className="flex items-center gap-8"
          >
            {(["pricing", "process", "faq"] as const).map((key) => (
              <Link
                key={key}
                href={routes[key]}
                className={cn("text-14-5 max-mobile:hidden", quietLink)}
              >
                {tCommon(`nav.${key}`)}
              </Link>
            ))}
            <ButtonLink
              tone="ink"
              size="nav"
              href={routes.contact}
              className="transition-colors duration-200 ease-std"
            >
              {tCommon("nav.start")}
            </ButtonLink>
          </nav>
        </div>
      </header>

      <main id={MAIN_CONTENT_ID} className="flex flex-1 items-center">
        <div
          className={cn(
            wrap,
            "grid grid-cols-not-found items-center gap-12 pt-24 pb-27.5 max-mobile:grid-cols-single max-mobile:gap-0 max-mobile:pt-14 max-mobile:pb-18",
          )}
        >
          <div>
            <StatusChip tone="static" label={t("chip")} />
            <h1 className="mt-5.5 text-display-404 leading-103 font-semibold tracking-n32">
              {t.rich("title", headingTags())}
            </h1>
            <AccentRule animated={false} className="mt-7" />
            <p className="mt-6.5 max-w-404-lead text-17-5 leading-162 text-ink/66">
              {t("lead")}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink
                tone="ink"
                size="md"
                href={routes.home}
                className="transition-colors duration-200 ease-std"
              >
                {t("home")}
              </ButtonLink>
              <ButtonLink tone="ghost" size="ghost" href={routes.pricing}>
                {t("pricing")}
              </ButtonLink>
            </div>
            <div className="mt-11 flex flex-wrap gap-x-6.5 gap-y-2.5 border-t border-ink/10 pt-5.5 text-14-5">
              <b className="w-full font-mono text-11 font-normal tracking-p130 text-ink/45 uppercase">
                {t("linksTitle")}
              </b>
              <Link href={routes.process} className={quietLink}>
                {t("links.process")}
              </Link>
              <Link href={routes.faq} className={quietLink}>
                {t("links.faq")}
              </Link>
              <Link href={routes.contact} className={quietLink}>
                {t("links.contact")}
              </Link>
              <a href={contactLinks.email} className={quietLink}>
                {tCommon("email")}
              </a>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="font-mono text-code-404 leading-90 font-medium tracking-n40 text-ink/7 select-none max-mobile:-order-1 max-mobile:mb-2 max-mobile:text-96"
          >
            {t("code.start")}
            <span className="text-brand/45">{t("code.middle")}</span>
            {t("code.end")}
          </div>
        </div>
      </main>

      <footer className="border-t border-paper/10 bg-island font-mono text-11 tracking-p50 text-paper/45 island">
        <div
          className={cn(
            wrap,
            "flex flex-wrap justify-between gap-4 pt-5.5 pb-6.5 max-mobile:flex-col max-mobile:gap-2.5",
          )}
        >
          <div>
            {tCommon("footer.copyright", {
              year: format.dateTime(new Date(), { year: "numeric" }),
            })}
          </div>
          <Link href={routes.legal} className="hover:text-paper">
            {tCommon("nav.legal")}
          </Link>
        </div>
      </footer>
    </div>
  );
}
