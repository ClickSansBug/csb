import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

const buttonLink = cva("inline-block rounded-pill font-medium", {
  variants: {
    tone: {
      ink: "bg-ink text-paper hover:bg-g42 hover:text-paper",
      outline: "border border-ink/18 hover:border-ink hover:bg-ink/3",
      "outline-soft": "border border-ink/20 hover:border-ink hover:bg-ink/4",
      ghost: "border border-ink/20 hover:border-ink/50",
      light: "bg-paper text-ink hover:bg-g86 hover:text-ink",
      brand: "bg-brand text-on-brand hover:bg-brand-light hover:text-on-brand",
    },
    size: {
      sm: "px-4.5 py-2.5 text-ui",
      md: "px-6.5 py-3.75 text-base",
      lg: "px-7 py-3.75 text-base",
      compact: "px-6 py-3.25 text-ui",
      footer: "px-5 py-2.75 text-small",
      ghost: "px-6.25 py-3.5 text-base",
    },
  },
  defaultVariants: { tone: "ink", size: "md" },
});

type ButtonLinkProps = VariantProps<typeof buttonLink> & {
  href: string;
  className?: string;
  children: ReactNode;
};

// Pill link of the design (ink, outline, light, brand green).
export function ButtonLink({
  href,
  tone,
  size,
  className,
  children,
}: ButtonLinkProps) {
  return (
    <Link href={href} className={cn(buttonLink({ tone, size }), className)}>
      {children}
    </Link>
  );
}
