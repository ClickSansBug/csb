"use client";

import { useHighlights } from "@/hooks/use-highlights";
import { useHoverRows } from "@/hooks/use-hover-rows";
import { useLitCards } from "@/hooks/use-lit-cards";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useTilt } from "@/hooks/use-tilt";
import { useTimeline } from "@/hooks/use-timeline";

// Page-wide behaviours of csb-behaviors.js, attached to the data attributes of the markup.
export function PageEffects() {
  useScrollReveal();
  useHighlights();
  useLitCards();
  useTilt();
  useTimeline();
  useHoverRows();
  return null;
}
