import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

const item = cva("grid items-baseline border-b leading-list", {
  variants: {
    size: {
      md: "grid-cols-bullet gap-2.5 border-ink/8 py-3.25 text-base",
      sm: "grid-cols-bullet-sm gap-2.25 border-dotted border-ink/16 py-2.75 text-ui",
    },
    tone: {
      default: "",
      highlight: "font-medium text-g42",
    },
  },
  compoundVariants: [
    { size: "md", tone: "default", className: "text-ink/78" },
    { size: "sm", tone: "default", className: "text-ink/74" },
  ],
  defaultVariants: { size: "md", tone: "default" },
});

type BulletItemProps = VariantProps<typeof item> & {
  bullet: string;
  children: ReactNode;
};

// List item with the green middle dot of the pricing lists.
export function BulletItem({ size, tone, bullet, children }: BulletItemProps) {
  return (
    <li className={item({ size, tone })}>
      <span
        aria-hidden="true"
        className={
          size === "sm" ? "text-note text-brand" : "text-fine text-brand"
        }
      >
        {bullet}
      </span>
      <span>{children}</span>
    </li>
  );
}
