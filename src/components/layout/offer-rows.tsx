import Link from "next/link";
import type { ReactNode } from "react";

import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/utils/cn";

import { gutters, mobileHeading, mobileStack } from "./responsive";

type OfferRow = {
  key: string;
  name: string;
  text: string;
  currency: string;
  price: string;
  delay: string;
};

type OfferRowsProps = {
  eyebrow: string;
  title: ReactNode;
  rows: OfferRow[];
  rowHref: string;
  arrow: string;
  note: string;
  link: { href: string; label: string };
};

// « Trois formules » — one price line per offer (design: index.html, data-menu-row).
export function OfferRows({
  eyebrow,
  title,
  rows,
  rowHref,
  arrow,
  note,
  link,
}: OfferRowsProps) {
  return (
    <section className={cn("border-t border-ink/10", gutters, mobileStack)}>
      <div
        className={cn(
          "mx-auto max-w-content px-8 pt-22 pb-24",
          gutters,
          mobileStack,
        )}
      >
        <div data-reveal="" className="mb-11.5">
          <div>
            <Eyebrow label={eyebrow} />
            <h2
              className={cn(
                "mt-3.5 text-h2 font-semibold tracking-n30",
                mobileHeading,
              )}
            >
              {title}
            </h2>
          </div>
        </div>
        <div className="border-t border-ink/10">
          {rows.map((row) => (
            <Link
              key={row.key}
              href={rowHref}
              className="group grid grid-cols-offer-row items-baseline gap-x-6 gap-y-0 border-b border-ink/10 py-7.5 text-ink transition-colors duration-250 ease-std hover:bg-card max-mobile:grid-cols-single max-mobile:items-start max-mobile:gap-3.5"
            >
              <div>
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="text-30 font-semibold tracking-n20">
                    {row.name}
                  </span>
                </div>
                <p className="mt-2 max-w-copy text-14-5 leading-155 text-pretty text-ink/62">
                  {row.text}
                </p>
              </div>
              <span
                aria-hidden="true"
                className="self-baseline border-b border-dotted border-ink/25 transition-colors duration-250 ease-std group-hover:border-brand max-mobile:hidden"
              />
              <div className="text-right max-mobile:text-left">
                <div className="font-mono text-28 tracking-n30 whitespace-nowrap max-mobile:text-24">
                  <span className="mr-1.5 text-15 text-ink/45">
                    {row.currency}
                  </span>
                  {row.price}
                </div>
                <div className="mt-1.75 font-mono text-10-5 tracking-p100 text-ink/45">
                  {row.delay}
                </div>
              </div>
              <span
                aria-hidden="true"
                className="pl-5 text-18 opacity-0 transition-opacity duration-250 ease-std group-hover:opacity-100 max-mobile:hidden"
              >
                {arrow}
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-baseline justify-between gap-5">
          <p className="font-mono text-11-5 tracking-p40 text-ink/42">{note}</p>
          <Link
            href={link.href}
            className="border-b border-brand/40 text-14-5 font-medium text-g52 hover:border-g52"
          >
            {link.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
