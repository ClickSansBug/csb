import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/utils/cn";

// Selectable chips of the contact form: site type (card) and wished offer (pill).
// `selected` reproduces the active state of the design script (green background).
const choiceChip = cva("chip-transition cursor-pointer border", {
  variants: {
    shape: {
      card: "rounded-chip px-4 py-3.5 text-left",
      pill: "rounded-pill px-3.75 py-2.5 text-13-5",
    },
    selected: {
      true: "border-brand bg-brand text-on-brand",
      false: "border-paper/16 bg-ink/40 text-paper/80",
    },
  },
});

type ChoiceChipProps = Required<VariantProps<typeof choiceChip>> &
  Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "type" | "className" | "children"
  > & {
    children: ReactNode;
    className?: string;
  };

export function ChoiceChip({
  shape,
  selected,
  children,
  className,
  ...props
}: ChoiceChipProps) {
  return (
    <button
      type="button"
      className={cn(choiceChip({ shape, selected }), className)}
      {...props}
    >
      {children}
    </button>
  );
}
