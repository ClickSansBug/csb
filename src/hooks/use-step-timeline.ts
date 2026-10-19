"use client";

import { type RefObject, useEffect } from "react";

// Lights the dot of each [data-step] once it reaches 62% of the window (design:
// csb-behaviors.js › Ligne de temps). Transitions start after the first paint, like the design
// whose first paint happens before the page is displayed.
export function useStepTimeline(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const steps = Array.from(
      // integration-allow: DOM attribute selector, not a Tailwind class
      ref.current?.querySelectorAll<HTMLElement>("[data-step]") ?? [],
    );
    if (!steps.length) return;

    const paint = () => {
      const height = window.innerHeight || 800;
      steps.forEach((step) => {
        // integration-allow: DOM attribute selector, not a Tailwind class
        const dot = step.querySelector<HTMLElement>("[data-dot]");
        if (!dot) return;
        const rect = step.getBoundingClientRect();
        const current = rect.top < height * 0.62 && rect.bottom > height * 0.08;
        const done = rect.bottom < height * 0.08;
        dot.toggleAttribute("data-reached", current || done);
        dot.toggleAttribute("data-current", current);
      });
    };

    window.addEventListener("scroll", paint, { passive: true });
    window.addEventListener("resize", paint);
    paint();
    const frame = requestAnimationFrame(() => {
      steps.forEach((step) =>
        // integration-allow: DOM attribute selector, not a Tailwind class
        step.querySelector("[data-dot]")?.setAttribute("data-animated", ""),
      );
    });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", paint);
      window.removeEventListener("resize", paint);
    };
  }, [ref]);
}
