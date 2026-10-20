"use client";

import { useEffect } from "react";

import { BEHAVIOR_SELECTORS } from "./behavior-selectors";
import { prefersReducedMotion } from "./reduced-motion";

// Port of "Inclinaison 3D du mockup" (csb-behaviors.js): the [data-tilt] element leans towards
// the pointer, wherever it is in the window; disabled when motion is reduced.
const ROTATE_Y_DEG = 3.2;
const ROTATE_X_DEG = 2.4;

export function useTilt() {
  useEffect(() => {
    const element = document.querySelector<HTMLElement>(
      BEHAVIOR_SELECTORS.tilt,
    );
    if (!element || prefersReducedMotion()) return;

    const tilt = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      const dx = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
      const dy = (event.clientY - (rect.top + rect.height / 2)) / rect.height;
      element.style.transform = `perspective(1200px) rotateY(${dx * ROTATE_Y_DEG}deg) rotateX(${-dy * ROTATE_X_DEG}deg) translateY(-2px)`;
    };
    const reset = () => {
      element.style.transform = "none";
    };

    window.addEventListener("pointermove", tilt);
    window.addEventListener("pointerleave", reset);
    return () => {
      window.removeEventListener("pointermove", tilt);
      window.removeEventListener("pointerleave", reset);
    };
  }, []);
}
