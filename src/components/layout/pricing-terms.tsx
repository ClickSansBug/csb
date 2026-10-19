import { cn } from "@/utils/cn";

import { gutters, mobileStack, singleColumn, stackedCell } from "./responsive";

type PricingTermsProps = {
  terms: { key: string; title: string; text: string }[];
};

// Payment, deployment and ownership strip (design: tarifs.html, 3rd section).
export function PricingTerms({ terms }: PricingTermsProps) {
  return (
    <section className={cn("border-t border-ink/10", gutters, mobileStack)}>
      <div className={cn("mx-auto max-w-content px-8", gutters, mobileStack)}>
        <div
          className={cn(
            "grid grid-cols-terms border-b border-ink/10",
            singleColumn,
          )}
        >
          {terms.map((term) => (
            <div
              key={term.key}
              data-reveal=""
              className={cn(
                "border-l border-ink/10 px-6.5 pt-7.5 pb-8.5",
                stackedCell,
              )}
            >
              <div className="font-mono text-11 tracking-p140 text-g52 uppercase">
                {term.title}
              </div>
              <p className="mt-3 text-14-5 leading-160 text-pretty text-ink/60">
                {term.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
