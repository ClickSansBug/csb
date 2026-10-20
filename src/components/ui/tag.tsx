import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

const tag = cva("rounded-pill px-2.5 font-mono text-tag", {
  variants: {
    tone: {
      neutral: "bg-ink/5 text-ink/60",
      green: "bg-g94 text-g42",
    },
    spacing: {
      chip: "py-1.5 tracking-chip",
      step: "py-1.25 tracking-tag",
    },
  },
  defaultVariants: { tone: "green", spacing: "chip" },
});

type TagProps = VariantProps<typeof tag> & {
  children: ReactNode;
};

// Small mono pill ("LIVRÉ EN 2 À 3 SEM.", "PRIX FIXE").
export function Tag({ tone, spacing, children }: TagProps) {
  return <span className={tag({ tone, spacing })}>{children}</span>;
}
