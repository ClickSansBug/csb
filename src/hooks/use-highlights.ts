"use client";

import { useEffect } from "react";

import { BEHAVIOR_SELECTORS } from "./behavior-selectors";
import { prefersReducedMotion } from "./reduced-motion";

// Port of "Surlignage qui se propage au scroll" (csb-behaviors.js): the mint band of each
// [data-highlight] grows from 0 to 100% while its top goes from 82% to 48% of the viewport.
const START_RATIO = 0.82;
const SPAN_RATIO = 0.34;

export function useHighlights() {
  useEffect(() => {
    // With reduced motion, the CSS of .highlight shows the full band.
    if (prefersReducedMotion()) return;

    const marks = Array.from(
      document.querySelectorAll<HTMLElement>(BEHAVIOR_SELECTORS.highlight),
    );
    if (!marks.length) return;

    const paint = () => {
      const height = window.innerHeight || 800;
      marks.forEach((mark) => {
        const top = mark.getBoundingClientRect().top;
        const progress = Math.min(
          1,
          Math.max(0, (height * START_RATIO - top) / (height * SPAN_RATIO)),
        );
        mark.style.setProperty(
          "--highlight-progress",
          `${(progress * 100).toFixed(1)}%`,
        );
      });
    };

    window.addEventListener("scroll", paint, { passive: true });
    window.addEventListener("resize", paint);
    paint();
    return () => {
      window.removeEventListener("scroll", paint);
      window.removeEventListener("resize", paint);
    };
  }, []);
}
