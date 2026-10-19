"use client";

import { type RefObject, useEffect } from "react";

const SCROLLED_AFTER_PX = 12;

// Tightens the sticky header and fills the reading gauge (design: csb-behaviors.js ›
// En-tête : jauge de lecture + densification).
export function useHeaderScroll(
  headerRef: RefObject<HTMLElement | null>,
  gaugeRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const paint = () => {
      const root = document.documentElement;
      const max = root.scrollHeight - window.innerHeight || 1;
      const y = window.scrollY || root.scrollTop || 0;
      gaugeRef.current?.style.setProperty(
        "--gauge",
        String(Math.min(1, y / max)),
      );
      headerRef.current?.toggleAttribute(
        "data-scrolled",
        y > SCROLLED_AFTER_PX,
      );
    };

    window.addEventListener("scroll", paint, { passive: true });
    window.addEventListener("resize", paint);
    paint();
    return () => {
      window.removeEventListener("scroll", paint);
      window.removeEventListener("resize", paint);
    };
  }, [headerRef, gaugeRef]);
}
