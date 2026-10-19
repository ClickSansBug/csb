import { cn } from "@/utils/cn";

// 48px green rule under page and section titles, drawn from the left after 0.12s.
type AccentRuleProps = {
  tone?: "brand" | "light";
  animated?: boolean;
  className?: string;
};

export function AccentRule({
  tone = "brand",
  animated = true,
  className,
}: AccentRuleProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "h-0.5 w-12 origin-left",
        tone === "brand" ? "bg-brand" : "bg-brand-light",
        animated && "animate-accent-rule motion-reduce:animate-none",
        className,
      )}
    />
  );
}
