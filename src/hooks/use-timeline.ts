"use client";

import { useEffect } from "react";

import { BEHAVIOR_SELECTORS } from "./behavior-selectors";

// Port of "Ligne de temps" (csb-behaviors.js): the dot of a [data-step] turns green while the
// step is between 8% and 62% of the viewport height (data-current) or once it is above it
// (data-active only). Active even when motion is reduced, as in the design.
const ON_TOP_RATIO = 0.62;
const DONE_RATIO = 0.08;

export function useTimeline() {
  useEffect(() => {
    const steps = Array.from(
      document.querySelectorAll<HTMLElement>(BEHAVIOR_SELECTORS.step),
    );
    if (!steps.length) return;

    const paint = () => {
      const height = window.innerHeight || 800;
      steps.forEach((step) => {
        const dot = step.querySelector<HTMLElement>(BEHAVIOR_SELECTORS.dot);
        if (!dot) return;
        const rect = step.getBoundingClientRect();
        const current =
          rect.top < height * ON_TOP_RATIO && rect.bottom > height * DONE_RATIO;
        const done = rect.bottom < height * DONE_RATIO;
        dot.toggleAttribute("data-active", current || done);
        dot.toggleAttribute("data-current", current);
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
