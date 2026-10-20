import type { ReactNode } from "react";

type LegalArticleProps = {
  number: string;
  title: string;
  children: ReactNode;
};

// Numbered section of the legal notice; the number goes above the title under 760px.
export function LegalArticle({ number, title, children }: LegalArticleProps) {
  return (
    <div className="grid reveal grid-cols-article gap-x-5.5 gap-y-0 border-t border-ink/10 py-7.5 max-md:grid-cols-single max-md:gap-y-2.5">
      <div className="pt-1.25 font-mono text-eyebrow tracking-tag text-g52">
        {number}
      </div>
      <div>
        <h2 className="mb-3 text-title-sm font-semibold tracking-subtitle max-md:text-h2-mobile">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}
