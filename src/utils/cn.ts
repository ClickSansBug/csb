import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// tailwind-merge must know the custom scales of src/styles/tokens.css, otherwise it would
// mistake a font size (`text-14-5`) for a colour and drop one of the two classes.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "display",
        "display-404",
        "display-mobile",
        "h2",
        "h2-cta",
        "h2-mobile",
        "stat",
        "price-xl",
        "code-404",
        (value: string) => /^\d+(-5)?$/.test(value),
      ],
      leading: [(value: string) => /^\d+$/.test(value)],
      tracking: [(value: string) => /^[np]\d+$/.test(value)],
      radius: ["pill", "lg", "md", "chip", "field", "sm", "xs", "hair"],
      shadow: ["mockup", "header", "panel", "step"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
