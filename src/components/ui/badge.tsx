import { cva, type VariantProps } from "class-variance-authority";

import { LiveDot } from "./live-dot";

const badge = cva(
  "inline-flex items-center gap-2.25 rounded-pill border px-3.25 py-1.75 font-mono text-eyebrow tracking-badge uppercase",
  {
    variants: {
      tone: {
        home: "border-ink/14 text-ink/55",
        page: "border-ink/14 text-ink/60",
        contact: "border-paper/16 text-paper/72",
      },
    },
    defaultVariants: { tone: "page" },
  },
);

type BadgeProps = VariantProps<typeof badge> & {
  label: string;
};

// Pill with the live dot at the top of each page.
export function Badge({ tone, label }: BadgeProps) {
  return (
    <div className={badge({ tone })}>
      <LiveDot onDark={tone === "contact"} />
      {tone === "home" ? (
        label
      ) : (
        <span className="text-accent-text">{label}</span>
      )}
    </div>
  );
}
