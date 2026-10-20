"use client";

import Link from "next/link";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { cn } from "@/utils/cn";

// Sticky header of the design: shrinks after 12px of scroll, green reading gauge, folded menu
// under 860px (csb-behaviors.js, clarifications.md › Menu mobile : focus).
const SCROLLED_AFTER_PX = 12;
const MENU_BREAKPOINT_PX = 860;

export type HeaderLink = {
  href: string;
  label: string;
  current: boolean;
};

type HeaderBarProps = {
  logo: ReactNode;
  navLabel: string;
  links: HeaderLink[];
  menuLinks: HeaderLink[];
  cta: ReactNode;
  openMenuLabel: string;
  closeMenuLabel: string;
  contact: boolean;
};

export function HeaderBar({
  logo,
  navLabel,
  links,
  menuLinks,
  cta,
  openMenuLabel,
  closeMenuLabel,
  contact,
}: HeaderBarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const gaugeRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    const paint = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight || 1;
      const y = window.scrollY || doc.scrollTop || 0;
      if (gaugeRef.current)
        gaugeRef.current.style.scale = `${Math.min(1, y / max)} 1`;
      setScrolled(y > SCROLLED_AFTER_PX);
    };
    window.addEventListener("scroll", paint, { passive: true });
    window.addEventListener("resize", paint);
    paint();
    return () => {
      window.removeEventListener("scroll", paint);
      window.removeEventListener("resize", paint);
    };
  }, []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const away = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        panelRef.current?.contains(target) ||
        toggleRef.current?.contains(target)
      )
        return;
      close();
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      close();
      toggleRef.current?.focus();
    };
    const resize = () => {
      if (window.innerWidth > MENU_BREAKPOINT_PX) close();
    };
    document.addEventListener("click", away);
    document.addEventListener("keydown", escape);
    window.addEventListener("resize", resize);
    return () => {
      document.removeEventListener("click", away);
      document.removeEventListener("keydown", escape);
      window.removeEventListener("resize", resize);
    };
  }, [open, close]);

  return (
    <header
      data-scrolled={scrolled ? "" : undefined}
      className={cn(
        "sticky top-0 z-100 h-17 border-b backdrop-blur-header transition-all duration-300 ease-standard",
        "data-scrolled:h-14.5 data-scrolled:shadow-header motion-reduce:transition-none max-nav:backdrop-blur-none",
        contact
          ? "border-paper/10 bg-island/82 max-nav:bg-island"
          : "border-ink/8 bg-paper/82 max-nav:bg-paper",
      )}
    >
      <div className="mx-auto flex h-full max-w-page items-center justify-between gap-6 px-8 max-lg:px-6 max-sm:px-4.5">
        {logo}
        <nav
          aria-label={navLabel}
          className="flex items-center gap-8 max-nav:gap-3"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={link.current ? "page" : undefined}
              className={cn(
                "text-ui max-nav:hidden",
                link.current
                  ? "font-medium text-g52"
                  : contact
                    ? "text-paper/66 hover:text-paper"
                    : "text-ink/66 hover:text-ink",
              )}
            >
              {link.label}
            </Link>
          ))}
          {cta}
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? closeMenuLabel : openMenuLabel}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setOpen((value) => !value);
            }}
            className={cn(
              "burger hidden size-10 flex-none cursor-pointer flex-col items-center justify-center gap-1 rounded-field border p-0 max-nav:inline-flex",
              contact ? "border-paper/22 text-paper" : "border-ink/16 text-ink",
            )}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </div>
      <div
        ref={panelRef}
        id={panelId}
        data-open={open ? "" : undefined}
        className={cn(
          "absolute inset-x-0 top-full hidden border-b shadow-panel max-lg:px-6 max-nav:data-open:block max-sm:px-4.5",
          contact ? "border-paper/12 bg-island" : "border-ink/10 bg-paper",
        )}
      >
        <div className="mx-auto max-w-page px-6 pt-2 pb-4.5">
          {menuLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              aria-current={link.current ? "page" : undefined}
              className={cn(
                "block border-b px-0.5 py-3.75 text-lead-sm font-medium last:border-b-0",
                contact ? "border-paper/8 text-paper" : "border-ink/7 text-ink",
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
        className="absolute inset-x-0 -bottom-px h-0.5 origin-left scale-x-0 bg-brand max-lg:px-6 max-sm:px-4.5"
      />
    </header>
  );
}
