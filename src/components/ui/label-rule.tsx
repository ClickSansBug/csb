import { cn } from "@/utils/cn";

// Two mono labels joined by a thin rule (« APERÇU —— VOTRE FUTUR SITE »).
type LabelRuleProps = {
  start: string;
  end: string;
  reveal?: boolean;
  className?: string;
};

const label =
  "font-mono text-10-5 tracking-p180 whitespace-nowrap text-ink/42 uppercase";

export function LabelRule({
  start,
  end,
  reveal = false,
  className,
}: LabelRuleProps) {
  return (
    <div
      data-reveal={reveal ? "" : undefined}
      className={cn("flex items-center gap-3.5", className)}
    >
      <span className={label}>{start}</span>
      <span aria-hidden="true" className="h-px flex-1 bg-ink/13" />
      <span className={label}>{end}</span>
    </div>
  );
}
