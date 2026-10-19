"use client";

import { type RefObject, useEffect } from "react";

// Halo that follows the pointer inside a card (design: csb-behaviors.js › Cartes éclairées
// au curseur). Active with every pointer type (clarifications.md › Survols).
export function useCursorGlow(
  cardRef: RefObject<HTMLElement | null>,
  glowRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    const move = (event: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      glow.style.setProperty("--lit-x", `${event.clientX - rect.left}px`);
      glow.style.setProperty("--lit-y", `${event.clientY - rect.top}px`);
      glow.setAttribute("data-active", "");
    };
    const leave = () => glow.removeAttribute("data-active");

    card.addEventListener("pointermove", move);
    card.addEventListener("pointerleave", leave);
    return () => {
      card.removeEventListener("pointermove", move);
      card.removeEventListener("pointerleave", leave);
    };
  }, [cardRef, glowRef]);
}
