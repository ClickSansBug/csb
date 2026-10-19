import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

// Renderers for the tags of the rich next-intl messages (clarifications.md › Convention des
// messages next-intl): <em> = green italic part of a title, <mark> = scroll highlight,
// <strong> = emphasised words, <br> = forced line break.
type Tone = "green" | "light";

const accentColor: Record<Tone, string> = {
  green: "text-g52",
  light: "text-brand-light",
};

// Italic part of a page title (h1).
export function titleTags(tone: Tone = "green") {
  return {
    em: (chunks: ReactNode) => (
      <span
        className={cn(
          "relative inline-block font-normal italic",
          accentColor[tone],
        )}
      >
        {chunks}
      </span>
    ),
  };
}

// Italic part of a section title (h2): either coloured, or highlighted with the scroll.
export function headingTags(tone: Tone = "green") {
  return {
    em: (chunks: ReactNode) => (
      <span className={cn("font-normal italic", accentColor[tone])}>
        {chunks}
      </span>
    ),
    mark: (chunks: ReactNode) => (
      <span data-highlight="" className="font-normal italic">
        {chunks}
      </span>
    ),
    br: () => <br />,
  };
}

// Bold words of a paragraph, in full ink unless the paragraph keeps its own colour.
export function strongTags(inked = true) {
  return {
    strong: (chunks: ReactNode) => (
      <strong className={cn("font-semibold", inked && "text-ink")}>
        {chunks}
      </strong>
    ),
  };
}
