import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";

import { cn } from "@/utils/cn";

// Text logo « CLICKSANSBUG », « SANS » in green (architecture.md › Icônes).
const logo = cva("font-mono tracking-p140", {
  variants: {
    tone: {
      header: "text-13 font-medium text-ink hover:text-g52",
      island: "text-13 font-medium text-paper hover:text-brand-light",
      footer: "text-12-5 text-paper",
      plain: "text-13 font-medium",
    },
  },
});

const accent = {
  header: "text-g52",
  island: "text-brand-light",
  footer: "text-brand-light",
  plain: "text-g52",
} as const;

type LogoProps = {
  tone: NonNullable<VariantProps<typeof logo>["tone"]>;
  href: string;
  start: string;
  highlight: string;
  end: string;
  className?: string;
};

export function Logo({
  tone,
  href,
  start,
  highlight,
  end,
  className,
}: LogoProps) {
  return (
    <Link href={href} className={cn(logo({ tone }), className)}>
      {start}
      <span className={accent[tone]}>{highlight}</span>
      {end}
    </Link>
  );
}
