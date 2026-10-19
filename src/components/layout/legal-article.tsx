import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

import { mobileHeading } from "./responsive";

type LegalArticleProps = {
  number: string;
  title: string;
  children: ReactNode;
};

// Numbered section of the legal notice (design: mentions-legales.html, 62px number column,
// number above the title under 760px).
export function LegalArticle({ number, title, children }: LegalArticleProps) {
  return (
    <div
      data-reveal=""
      className="grid grid-cols-legal gap-x-5.5 gap-y-0 border-t border-ink/10 py-7.5 max-mobile:grid-cols-single max-mobile:gap-y-2.5"
    >
      <div className="pt-1.25 font-mono text-11-5 tracking-p120 text-g52">
        {number}
      </div>
      <div>
        <h2
          className={cn(
            "mb-3 text-19 font-semibold tracking-n12",
            mobileHeading,
          )}
        >
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}
