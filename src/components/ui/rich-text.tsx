import type { ReactNode } from "react";

// Tags of the next-intl rich messages (clarifications.md › Convention des messages):
// <em> green italic part of a title, <mark> progressive highlight, <strong> emphasis.

export function accentTag(chunks: ReactNode) {
  return <span className="font-normal text-accent-text italic">{chunks}</span>;
}

// Second part of the page titles (h1): an inline block, as in the design.
export function titleAccentTag(chunks: ReactNode) {
  return (
    <span className="relative inline-block font-normal text-accent-text italic">
      {chunks}
    </span>
  );
}

export function highlightTag(chunks: ReactNode) {
  return (
    <span data-highlight="" className="highlight font-normal italic">
      {chunks}
    </span>
  );
}

// Bold part of a paragraph, in full ink.
export function strongTag(chunks: ReactNode) {
  return <strong className="font-semibold text-ink">{chunks}</strong>;
}

// Bold part that keeps the colour of its paragraph (legal notice).
export function strongPlainTag(chunks: ReactNode) {
  return <strong className="font-semibold">{chunks}</strong>;
}
