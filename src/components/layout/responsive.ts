// Responsive rules of the export that apply to every page, as class lists.

// `section > div, section, header > div, footer > div`: side padding 24px under 900px,
// 18px under 520px. Applied to the same elements as in the design.
export const gutters = "max-tablet:px-6 max-phone:px-4.5";

// `section, section > div` under 760px: 56px on top, 60px at the bottom.
export const mobileStack = "max-mobile:pt-14 max-mobile:pb-15";

// csb-mobile.css: every h1 and h2 of the design shrinks under 760px.
export const mobileTitle = "max-mobile:text-display-mobile";
export const mobileHeading = "max-mobile:text-h2-mobile";

// csb-mobile.css: `repeat(auto-fit, …)` grids become a single column under 860px, and the
// vertical rules between their cells become horizontal.
export const singleColumn = "max-menu:grid-cols-single";
export const stackedCell =
  "max-menu:border-l-0 max-menu:border-t max-menu:px-0 max-menu:first:border-t-0";
