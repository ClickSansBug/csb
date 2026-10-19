import type { ReactNode } from "react";

import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/utils/cn";

import {
  gutters,
  mobileHeading,
  mobileStack,
  singleColumn,
} from "./responsive";

type Option = { key: string; name: string; price: string; unit?: string };

type PricingOptionsProps = {
  eyebrow: string;
  title: ReactNode;
  text: string;
  options: Option[];
};

// « Besoin de plus ? » — fixed-price options (design: tarifs.html, data-menu-row lines).
export function PricingOptions({
  eyebrow,
  title,
  text,
  options,
}: PricingOptionsProps) {
  return (
    <section className={cn("border-t border-ink/10", gutters, mobileStack)}>
      <div
        className={cn(
          "mx-auto max-w-content px-8 pt-21 pb-23",
          gutters,
          mobileStack,
        )}
      >
        <div data-reveal="">
          <Eyebrow label={eyebrow} />
          <h2
            className={cn(
              "mt-3.5 text-h2 font-semibold tracking-n30",
              mobileHeading,
            )}
          >
            {title}
          </h2>
          <p className="mt-5 max-w-copy text-16-5 leading-160 text-pretty text-ink/62">
            {text}
          </p>
        </div>
        <div
          data-reveal=""
          className={cn(
            "mt-9.5 grid grid-cols-options gap-x-14 gap-y-0 border-t border-ink",
            singleColumn,
          )}
        >
          {options.map((option) => (
            <div
              key={option.key}
              className="grid grid-cols-price-row items-baseline gap-5 rounded-xs border-b border-ink/9 px-3 py-4.5 transition-colors duration-250 ease-std hover:bg-card max-mobile:gap-3.5 max-mobile:px-0.5"
            >
              <span className="text-15-5 text-ink/80">{option.name}</span>
              <span className="font-mono text-16 tracking-n20 whitespace-nowrap">
                {option.price}
                {option.unit ? (
                  <span className="ml-1.25 text-12 text-ink/45">
                    {option.unit}
                  </span>
                ) : null}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
