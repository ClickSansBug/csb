"use client";

import { type RefObject, useEffect } from "react";

import { prefersReducedMotion } from "./prefers-reduced-motion";

const KEYSTROKE_MS = 62;

// Retypes the text of the element one character at a time (design: csb-behaviors.js › URL
// qui s'écrit). The full text is rendered on the server and kept under reduced motion.
export function useTypewriter(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion()) return;

    const full = element.textContent ?? "";
    let length = 0;
    element.textContent = "";
    const timer = window.setInterval(() => {
      length += 1;
      element.textContent = full.slice(0, length);
      if (length >= full.length) window.clearInterval(timer);
    }, KEYSTROKE_MS);
    return () => {
      window.clearInterval(timer);
      element.textContent = full;
    };
  }, [ref]);
}
