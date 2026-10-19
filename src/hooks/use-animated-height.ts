"use client";

import { type RefObject, useLayoutEffect, useRef } from "react";

import { prefersReducedMotion } from "./prefers-reduced-motion";

// Animates a collapsible panel between 0 and its real height. The closed / open height comes
// from the element's classes (`h-0` / `h-auto`); during the transition an inline height is
// set, then removed. The transition itself is declared in CSS (instant under reduced motion).
export function useAnimatedHeight(
  ref: RefObject<HTMLElement | null>,
  open: boolean,
) {
  const isFirstRender = useRef(true);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (prefersReducedMotion()) {
      element.style.removeProperty("height");
      return;
    }

    const from = open ? 0 : element.scrollHeight;
    const to = open ? element.scrollHeight : 0;
    element.style.height = `${from}px`;
    void element.offsetHeight; // commit the start height before transitioning
    element.style.height = `${to}px`;

    const done = (event: TransitionEvent) => {
      if (event.target !== element || event.propertyName !== "height") return;
      element.style.removeProperty("height");
      element.removeEventListener("transitionend", done);
    };
    element.addEventListener("transitionend", done);
    return () => element.removeEventListener("transitionend", done);
  }, [ref, open]);
}
