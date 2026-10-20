import { cn } from "@/utils/cn";

type DividerLabelProps = {
  start: string;
  end: string;
  className?: string;
};

const LABEL =
  "font-mono text-tag tracking-divider whitespace-nowrap text-ink/42 uppercase";

// Two mono labels joined by a hairline ("Aperçu ——— Votre futur site").
export function DividerLabel({ start, end, className }: DividerLabelProps) {
  return (
    <div className={cn("flex items-center gap-3.5", className)}>
      <span className={LABEL}>{start}</span>
      <span aria-hidden="true" className="h-px flex-1 bg-ink/13" />
      <span className={LABEL}>{end}</span>
    </div>
  );
}
