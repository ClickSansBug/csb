// True when the visitor asked for less motion (read once, like the design's behaviours).
export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
