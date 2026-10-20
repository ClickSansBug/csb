import Link from "next/link";
import { useFormatter, useTranslations } from "next-intl";

import { AccentRule } from "@/components/ui/accent-rule";
import { ButtonLink } from "@/components/ui/button-link";
import { Logo } from "@/components/ui/logo";
import { SkipLink } from "@/components/ui/skip-link";
import { ROUTES } from "@/config/routes";

const HEADER_LINKS = ["pricing", "process", "faq"] as const;
const QUICK_LINKS = ["process", "faq", "contact"] as const;
const WRAP = "mx-auto w-full max-w-page px-8 max-md:px-5";

// Not-found page (404.html): simplified header and footer, no grain, no animation
// (clarifications.md › Page 404).
export function NotFoundView() {
  const t = useTranslations("notFound");
  const common = useTranslations("common");
  const format = useFormatter();
  const year = format.dateTime(new Date(), { year: "numeric" });
  const email = common("email");

  return (
    <div className="page-404 flex min-h-screen flex-col">
      <SkipLink label={common("skipLink")} />
      <header className="h-17 border-b border-ink/8">
        <div
          className={`flex h-full items-center justify-between gap-6 ${WRAP}`}
        >
          <Logo
            href={ROUTES.home}
            start={common("logo.start")}
            accent={common("logo.accent")}
            end={common("logo.end")}
          />
          <nav
            aria-label={common("nav.label")}
            className="flex items-center gap-8"
          >
            {HEADER_LINKS.map((key) => (
              <Link
                key={key}
                href={ROUTES[key]}
                className="text-ui text-ink/66 hover:text-ink max-md:hidden"
              >
                {common(`nav.${key}`)}
              </Link>
            ))}
            <ButtonLink
              href={ROUTES.contact}
              tone="ink"
              size="sm"
              className="transition-colors duration-200"
            >
              {common("nav.start")}
            </ButtonLink>
          </nav>
        </div>
      </header>

      <main id="main" className="flex flex-1 items-center">
        <div
          className={`grid grid-cols-pair items-center gap-12 pt-24 pb-27.5 max-md:grid-cols-single max-md:gap-0 max-md:pt-14 max-md:pb-18 ${WRAP}`}
        >
          <div>
            <div className="inline-flex items-center gap-2.25 rounded-pill border border-ink/14 px-3.25 py-1.75 font-mono text-eyebrow tracking-badge text-g52 uppercase">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-circle bg-brand"
              />
              {t("badge")}
            </div>
            <h1 className="mt-5.5 text-display-404 leading-display font-semibold tracking-display">
              {t("title.lead")}
              <br />
              <em className="font-normal text-g52 italic">
                {t("title.accent")}
              </em>
            </h1>
            <AccentRule animated={false} className="mt-7 bg-brand" />
            <p className="mt-6.5 max-w-lead-404 text-lead leading-prose text-ink/66">
              {t("text")}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink
                href={ROUTES.home}
                tone="ink"
                size="md"
                className="transition-colors duration-200"
              >
                {t("home")}
              </ButtonLink>
              <ButtonLink href={ROUTES.pricing} tone="ghost" size="ghost">
                {t("pricing")}
              </ButtonLink>
            </div>
            <div className="mt-11 flex flex-wrap gap-x-6.5 gap-y-2.5 border-t border-ink/10 pt-5.5 text-ui">
              <p className="w-full font-mono text-caption font-normal tracking-badge text-ink/45 uppercase">
                {t("links.label")}
              </p>
              {QUICK_LINKS.map((key) => (
                <Link
                  key={key}
                  href={ROUTES[key]}
                  className="text-ink/66 hover:text-ink"
                >
                  {t(`links.${key}`)}
                </Link>
              ))}
              <a
                href={`mailto:${email}`}
                className="text-ink/66 hover:text-ink"
              >
                {email}
              </a>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="font-mono text-code-404 leading-price font-medium tracking-initials text-ink/7 select-none max-md:-order-1 max-md:mb-2 max-md:text-code-404-mobile"
          >
            {t("code.start")}
            <span className="text-brand/45">{t("code.middle")}</span>
            {t("code.end")}
          </div>
        </div>
      </main>

      <footer className="border-t border-paper/10 bg-island font-mono text-caption tracking-footer text-paper/45 island">
        <div
          className={`flex flex-wrap justify-between gap-4 pt-5.5 pb-6.5 max-md:flex-col max-md:gap-2.5 ${WRAP}`}
        >
          <div>{common("footer.copyright", { year })}</div>
          <Link href={ROUTES.legal} className="hover:text-paper">
            {common("footer.legal")}
          </Link>
        </div>
      </footer>
    </div>
  );
}
