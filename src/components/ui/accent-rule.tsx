import { cn } from "@/utils/cn";

type AccentRuleProps = {
  animated?: boolean;
  className?: string;
};

// Short green rule under the titles; it grows from the left unless motion is reduced.
export function AccentRule({ animated = true, className }: AccentRuleProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "h-0.5 w-12 bg-accent-fill",
        animated &&
          "origin-left animate-accent-rule motion-reduce:animate-none",
        className,
      )}
    />
  );
}
