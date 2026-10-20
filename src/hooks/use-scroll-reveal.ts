"use client";

import { useEffect } from "react";

import { prefersReducedMotion } from "./reduced-motion";

// Port of the "Révélations au scroll" behaviour of csb-behaviors.js (clarifications.md › Rendu
// sans JavaScript): a .reveal block appears when its top passes 94% of the viewport height,
// 60ms apart from the blocks that appear with it, once; everything is shown after 2.6s.
const VIEWPORT_RATIO = 0.94;
const STAGGER_MS = 60;
const SHOW_ALL_AFTER_MS = 2600;

function show(element: HTMLElement) {
  element.style.opacity = "1";
  element.style.transform = "none";
}

export function useScrollReveal() {
  useEffect(() => {
    // With reduced motion, the CSS of .reveal already shows every block.
    if (prefersReducedMotion()) return;

    const items = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    let pending = items.slice();
    const timers: number[] = [];

    const detach = () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };

    function check() {
      const height = window.innerHeight || 800;
      let shown = 0;
      pending = pending.filter((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top < height * VIEWPORT_RATIO && rect.bottom > 0) {
          timers.push(
            window.setTimeout(() => show(element), shown++ * STAGGER_MS),
          );
          return false;
        }
        return true;
      });
      if (!pending.length) detach();
    }

    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    check();
    const frame = requestAnimationFrame(check);
    const showAll = window.setTimeout(() => {
      items.forEach(show);
      detach();
    }, SHOW_ALL_AFTER_MS);

    return () => {
      detach();
      cancelAnimationFrame(frame);
      window.clearTimeout(showAll);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);
}
