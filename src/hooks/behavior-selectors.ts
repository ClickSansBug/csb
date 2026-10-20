// Data attributes the page behaviours attach to (names of csb-behaviors.js). These strings are CSS
// attribute selectors for querySelector, not Tailwind classes.
export const BEHAVIOR_SELECTORS = {
  highlight: "[data-highlight]", // integration-allow: CSS attribute selector for querySelector, not a Tailwind class
  litCard: "[data-lit]", // integration-allow: CSS attribute selector for querySelector, not a Tailwind class
  litGlow: "[data-lit-glow]", // integration-allow: CSS attribute selector for querySelector, not a Tailwind class
  tilt: "[data-tilt]", // integration-allow: CSS attribute selector for querySelector, not a Tailwind class
  step: "[data-step]", // integration-allow: CSS attribute selector for querySelector, not a Tailwind class
  dot: "[data-dot]", // integration-allow: CSS attribute selector for querySelector, not a Tailwind class
  menuRow: "[data-menu-row]", // integration-allow: CSS attribute selector for querySelector, not a Tailwind class
} as const;
