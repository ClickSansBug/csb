import { cn } from "@/utils/cn";

// Bulleted lists of the pricing page: offer inclusions and maintenance details.
type DotListItem = { key: string; text: string; highlighted?: boolean };

type DotListProps = {
  items: DotListItem[];
  bullet: string;
  variant: "offer" | "plan";
  className?: string;
};

const item = {
  offer: "grid-cols-dot gap-2.5 py-3.25 border-ink/8 text-15",
  plan: "grid-cols-dot-sm gap-2.25 py-2.75 border-dotted border-ink/16 text-14-5",
} as const;

export function DotList({ items, bullet, variant, className }: DotListProps) {
  return (
    <ul className={className}>
      {items.map(({ key, text, highlighted }) => (
        <li
          key={key}
          className={cn(
            "grid items-baseline border-b",
            item[variant],
            // After the font size: tailwind-merge drops a line height placed before it.
            "leading-145",
            highlighted
              ? "font-medium text-g42"
              : variant === "offer"
                ? "text-ink/78"
                : "text-ink/74",
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "text-brand",
              variant === "offer" ? "text-13" : "text-12",
            )}
          >
            {bullet}
          </span>
          <span>{text}</span>
        </li>
      ))}
    </ul>
  );
}
