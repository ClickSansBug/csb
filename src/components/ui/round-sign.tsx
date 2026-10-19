import { cn } from "@/utils/cn";

// Round « + » / « × » sign of the maintenance plans and of the FAQ.
type RoundSignProps = {
  sign: string;
  variant: "plan" | "faq";
  className?: string;
};

export function RoundSign({ sign, variant, className }: RoundSignProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-6.5 flex-none items-center justify-center rounded-full border border-ink/20 text-ink/50",
        variant === "plan" ? "text-15" : "font-mono text-14",
        className,
      )}
    >
      {sign}
    </span>
  );
}
