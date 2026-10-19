"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import { ButtonLink } from "@/components/ui/button-link";
import { Logo } from "@/components/ui/logo";
import { useHeaderScroll } from "@/hooks/use-header-scroll";
import { cn } from "@/utils/cn";

import { gutters } from "./responsive";

type NavLink = { key: string; href: string; label: string };

type SiteHeaderProps = {
  variant: "default" | "island";
  logo: { href: string; start: string; highlight: string; end: string };
  navLabel: string;
  links: NavLink[];
  activeKey?: string;
  start: { href: string; label: string };
  menu: { links: NavLink[]; openLabel: string; closeLabel: string };
};

// Menu collapse width of csb-mobile.css: the menu closes when the window grows past it.
const MENU_MAX_WIDTH = 860;

// Sticky header with reading gauge and collapsed menu under 860px (design: header of every
// page, csb-behaviors.js › Menu de navigation replié, clarifications.md › Menu mobile).
export function SiteHeader({
  variant,
  logo,
  navLabel,
  links,
  activeKey,
  start,
  menu,
}: SiteHeaderProps) {
  const island = variant === "island";
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const gaugeRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useHeaderScroll(headerRef, gaugeRef);

  useEffect(() => {
    if (!open) return;
    const closeAway = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        panelRef.current?.contains(target) ||
        buttonRef.current?.contains(target)
      )
        return;
      setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    const closeOnResize = () => {
      if (window.innerWidth > MENU_MAX_WIDTH) setOpen(false);
    };
    document.addEventListener("click", closeAway);
    document.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnResize);
    return () => {
      document.removeEventListener("click", closeAway);
      document.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnResize);
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className={cn(
        "site-header sticky top-0 z-100 h-17 border-b backdrop-blur-header data-scrolled:h-14.5 data-scrolled:shadow-header max-menu:backdrop-blur-none",
        island
          ? "border-paper/10 bg-island/82 max-menu:bg-island"
          : "border-ink/8 bg-paper/82 max-menu:bg-paper",
      )}
    >
      <div
        className={cn(
          "mx-auto flex h-full max-w-content items-center justify-between gap-6 px-8",
          gutters,
        )}
      >
        <Logo tone={island ? "island" : "header"} {...logo} />
        <nav
          aria-label={navLabel}
          className="flex items-center gap-8 max-menu:gap-3"
        >
          {links.map((link) => {
            const active = link.key === activeKey;
            return (
              <Link
                key={link.key}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-14-5 max-menu:hidden",
                  active
                    ? "font-medium text-g52"
                    : island
                      ? "text-paper/66 hover:text-paper"
                      : "text-ink/66 hover:text-ink",
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <ButtonLink
            tone={island ? "brand" : "ink"}
            size="nav"
            href={start.href}
            className="max-menu:flex max-menu:items-center"
          >
            {start.label}
          </ButtonLink>
          <button
            ref={buttonRef}
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? menu.closeLabel : menu.openLabel}
            onClick={() => setOpen((value) => !value)}
            className={cn(
              "hidden size-10 flex-none cursor-pointer flex-col items-center justify-center gap-1 rounded-field border p-0 max-menu:inline-flex",
              island ? "border-paper/22 text-paper" : "border-ink/16 text-ink",
            )}
          >
            <span className="burger-line" />
            <span className="burger-line" />
            <span className="burger-line" />
          </button>
        </nav>
      </div>
      <div
        ref={panelRef}
        id={panelId}
        data-open={open ? "" : undefined}
        className={cn(
          "absolute inset-x-0 top-full hidden border-b shadow-panel max-menu:data-open:block",
          gutters,
          island
            ? "border-paper/12 bg-island island"
            : "border-ink/10 bg-paper",
        )}
      >
        <div className="mx-auto max-w-content px-6 pt-2 pb-4.5">
          {menu.links.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block border-b px-0.5 py-3.75 text-17 font-medium last:border-b-0",
                island ? "border-paper/8 text-paper" : "border-ink/7 text-ink",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div
        ref={gaugeRef}
        aria-hidden="true"
        className={cn(
          "gauge absolute inset-x-0 -bottom-px h-0.5 bg-brand",
          gutters,
        )}
      />
    </header>
  );
}
