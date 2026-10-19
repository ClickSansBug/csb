"use client";

import { useEffect } from "react";

import { prefersReducedMotion } from "./prefers-reduced-motion";

// Grows the highlight of every [data-highlight] text with the scroll (design:
// csb-behaviors.js › Surlignage). Under reduced motion, CSS draws it full.
export function useScrollHighlight() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const marks = Array.from(
      // integration-allow: DOM attribute selector, not a Tailwind class
      document.querySelectorAll<HTMLElement>("[data-highlight]"),
    );
    if (!marks.length) return;

    const paint = () => {
      const height = window.innerHeight || 800;
      marks.forEach((mark) => {
        const top = mark.getBoundingClientRect().top;
        const progress = Math.min(
          1,
          Math.max(0, (height * 0.82 - top) / (height * 0.34)),
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
