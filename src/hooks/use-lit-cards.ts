"use client";

import { useEffect } from "react";

import { BEHAVIOR_SELECTORS } from "./behavior-selectors";

// Port of "Cartes éclairées au curseur" (csb-behaviors.js): the halo of a [data-lit] card follows
// the pointer, with every pointer type (clarifications.md › Survols sur écrans tactiles).
export function useLitCards() {
  useEffect(() => {
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>(BEHAVIOR_SELECTORS.litCard),
    );
    const cleanups = cards.flatMap((card) => {
      const glow = card.querySelector<HTMLElement>(BEHAVIOR_SELECTORS.litGlow);
      if (!glow) return [];
      const move = (event: PointerEvent) => {
        const rect = card.getBoundingClientRect();
        glow.style.setProperty("--lit-x", `${event.clientX - rect.left}px`);
        glow.style.setProperty("--lit-y", `${event.clientY - rect.top}px`);
        glow.style.opacity = "1";
      };
      const leave = () => {
        glow.style.opacity = "0";
      };
      card.addEventListener("pointermove", move);
      card.addEventListener("pointerleave", leave);
      return [
        () => {
          card.removeEventListener("pointermove", move);
          card.removeEventListener("pointerleave", leave);
        },
      ];
    });
    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);
}
