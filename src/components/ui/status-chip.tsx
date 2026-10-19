import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";

// Pill label with a pulsing green dot, at the top of each page.
const chip = cva(
  "inline-flex items-center gap-2.25 rounded-pill border px-3.25 py-1.75 font-mono text-11-5 tracking-p130 uppercase",
  {
    variants: {
      tone: {
        home: "border-ink/14 text-ink/55",
        page: "border-ink/14 text-ink/60",
        island: "border-paper/16 text-paper/72",
        static: "border-ink/14 text-g52",
      },
    },
  },
);

const dot = {
  home: "dot-halo animate-pulse-live bg-brand",
  page: "dot-halo animate-pulse-live bg-brand",
  island: "dot-halo-light animate-pulse-live bg-brand-light",
  static: "bg-brand",
} as const;

const labelColor = {
  home: undefined,
  page: "text-g52",
  island: "text-brand-light",
  static: undefined,
} as const;

type StatusChipProps = {
  tone: NonNullable<VariantProps<typeof chip>["tone"]>;
  label: string;
};

export function StatusChip({ tone, label }: StatusChipProps) {
  return (
    <div className={chip({ tone })}>
      <span
        aria-hidden="true"
        className={cn(
          "size-1.5 rounded-full motion-reduce:animate-none",
          tone !== "static" && "flex-none",
          dot[tone],
        )}
      />
      {labelColor[tone] ? (
        <span className={labelColor[tone]}>{label}</span>
      ) : (
        label
      )}
    </div>
  );
}
