import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

// Pill links of the design: black, green, light (on dark blocks), outlined.
const buttonLink = cva("inline-block rounded-pill font-medium", {
  variants: {
    tone: {
      ink: "bg-ink text-paper hover:bg-g42 hover:text-paper",
      brand: "bg-brand text-on-brand hover:bg-brand-light hover:text-on-brand",
      light: "bg-paper text-ink hover:bg-g86 hover:text-ink",
      outline:
        "border border-ink/18 hover:border-ink hover:bg-ink/3 hover:text-g52",
      "outline-plan":
        "border border-ink/20 hover:border-ink hover:bg-ink/4 hover:text-g52",
      ghost: "border border-ink/20 hover:border-ink/50",
    },
    size: {
      nav: "px-4.5 py-2.5 text-14-5",
      footer: "px-5 py-2.75 text-14",
      plan: "px-6 py-3.25 text-14-5",
      ghost: "px-6.25 py-3.5 text-15",
      md: "px-6.5 py-3.75 text-15",
      lg: "px-7 py-3.75 text-15",
    },
  },
});

type ButtonLinkProps = Required<VariantProps<typeof buttonLink>> & {
  href: string;
  children: ReactNode;
  className?: string;
};

export function ButtonLink({
  tone,
  size,
  href,
  children,
  className,
}: ButtonLinkProps) {
  return (
    <Link href={href} className={cn(buttonLink({ tone, size }), className)}>
      {children}
    </Link>
  );
}
