import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";

import { cn } from "@/utils/cn";

const logo = cva("font-mono tracking-eyebrow", {
  variants: {
    size: {
      header: "text-fine font-medium",
      footer: "text-meta text-paper",
    },
  },
  defaultVariants: { size: "header" },
});

type LogoProps = VariantProps<typeof logo> & {
  href: string;
  start: string;
  accent: string;
  end: string;
  className?: string;
};

// Text logo: CLICK·SANS·BUG, the middle part in the accent green of the surface.
export function Logo({ href, start, accent, end, size, className }: LogoProps) {
  return (
    <Link href={href} className={cn(logo({ size }), className)}>
      {start}
      <span className="text-accent-text">{accent}</span>
      {end}
    </Link>
  );
}
