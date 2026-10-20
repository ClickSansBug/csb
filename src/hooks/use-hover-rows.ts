"use client";

import { useEffect } from "react";

import { BEHAVIOR_SELECTORS } from "./behavior-selectors";

// Port of "Lignes d'offre : survol" (csb-behaviors.js): a [data-menu-row] gets data-hover between
// pointerenter and pointerleave, with every pointer type (clarifications.md › Survols).
export function useHoverRows() {
  useEffect(() => {
    const rows = Array.from(
      document.querySelectorAll<HTMLElement>(BEHAVIOR_SELECTORS.menuRow),
    );
    const cleanups = rows.map((row) => {
      const enter = () => row.setAttribute("data-hover", "");
      const leave = () => row.removeAttribute("data-hover");
      row.addEventListener("pointerenter", enter);
      row.addEventListener("pointerleave", leave);
      return () => {
        row.removeEventListener("pointerenter", enter);
        row.removeEventListener("pointerleave", leave);
      };
    });
    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);
}
