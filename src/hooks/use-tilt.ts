"use client";

import { type RefObject, useEffect } from "react";

import { prefersReducedMotion } from "./prefers-reduced-motion";

// Light 3D tilt that follows the pointer over the whole window (design: csb-behaviors.js ›
// Inclinaison 3D du mockup). Disabled under reduced motion.
export function useTilt(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion()) return;

    const move = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      const dx = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
      const dy = (event.clientY - (rect.top + rect.height / 2)) / rect.height;
      element.style.setProperty(
        "--tilt",
        `perspective(1200px) rotateY(${dx * 3.2}deg) rotateX(${-dy * 2.4}deg) translateY(-2px)`,
      );
    };
    const reset = () => element.style.setProperty("--tilt", "none");

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerleave", reset);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", reset);
    };
  }, [ref]);
}
