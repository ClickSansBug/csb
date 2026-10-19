import Link from "next/link";

import { ButtonLink } from "@/components/ui/button-link";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/utils/cn";

import { gutters } from "./responsive";

type FooterLink = { key: string; href: string; label: string };

type SiteFooterProps = {
  logo: { href: string; start: string; highlight: string; end: string };
  navLabel: string;
  links: FooterLink[];
  start: { href: string; label: string };
  copyright: string;
  legal: { href: string; label: string };
  email: { href: string; label: string };
};

// Dark footer of every page except the 404 (design: footer data-island, csb-mobile.css).
export function SiteFooter({
  logo,
  navLabel,
  links,
  start,
  copyright,
  legal,
  email,
}: SiteFooterProps) {
  return (
    <footer className="border-t border-paper/10 bg-island text-paper/55 island">
      <div
        className={cn(
          "mx-auto flex max-w-content flex-wrap items-center justify-between gap-6 px-8 pt-9 pb-4",
          "max-mobile:flex-col max-mobile:items-stretch max-mobile:gap-6.5 max-mobile:pt-11 max-mobile:pb-2.5",
          gutters,
        )}
      >
        <Logo tone="footer" {...logo} />
        <nav
          aria-label={navLabel}
          className="flex flex-wrap gap-6.5 text-13-5 max-mobile:grid max-mobile:grid-cols-halves max-mobile:gap-x-5 max-mobile:gap-y-4 max-mobile:text-15"
        >
          {links.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="text-paper/55 hover:text-paper"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <ButtonLink
          tone="brand"
          size="footer"
          href={start.href}
          className="max-mobile:self-start max-mobile:justify-self-start max-mobile:px-6.5 max-mobile:py-3.25"
        >
          {start.label}
        </ButtonLink>
      </div>
      <div className={cn("mx-auto max-w-content px-8", gutters)}>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-paper/10 pt-4.5 pb-7.5 font-mono text-11 tracking-p50 text-paper/45 max-mobile:flex-col max-mobile:items-start max-mobile:gap-3 max-mobile:pb-9 max-mobile:leading-160">
          <div>{copyright}</div>
          <Link href={legal.href} className="text-paper/45 hover:text-paper">
            {legal.label}
          </Link>
          <a href={email.href} className="text-paper/45 hover:text-paper">
            {email.label}
          </a>
        </div>
      </div>
    </footer>
  );
}
