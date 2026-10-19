"use client";

import { useEffect } from "react";

import { prefersReducedMotion } from "./prefers-reduced-motion";

const VISIBLE_RATIO = 0.94;
const STAGGER_MS = 60;
const REVEAL_ALL_AFTER_MS = 2600;

// Shows every [data-reveal] block when its top passes 94% of the window height (design:
// csb-behaviors.js › Révélations au scroll). Under reduced motion, CSS shows them at once.
export function useRevealOnScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const items = Array.from(
      // integration-allow: DOM attribute selector, not a Tailwind class
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const timers: number[] = [];
    const show = (element: HTMLElement) =>
      element.setAttribute("data-revealed", "");
    let pending = items.slice();

    const stop = () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };

    function check() {
      const height = window.innerHeight || 800;
      let order = 0;
      pending = pending.filter((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top < height * VISIBLE_RATIO && rect.bottom > 0) {
          timers.push(
            window.setTimeout(() => show(element), order++ * STAGGER_MS),
          );
          return false;
        }
        return true;
      });
      if (!pending.length) stop();
    }

    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    check();
    const frame = requestAnimationFrame(check);
    const revealAll = window.setTimeout(() => {
      items.forEach(show);
      stop();
    }, REVEAL_ALL_AFTER_MS);

    return () => {
      stop();
      cancelAnimationFrame(frame);
      window.clearTimeout(revealAll);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);
}
