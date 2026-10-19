"use client";

import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import { useScrollHighlight } from "@/hooks/use-scroll-highlight";

// Page-wide behaviours of csb-behaviors.js: scroll reveal and growing highlights.
export function PageEffects() {
  useRevealOnScroll();
  useScrollHighlight();
  return null;
}
