import { cn } from "@/utils/cn";

type SkipLinkProps = {
  label: string;
  inverted?: boolean;
};

// "Aller au contenu": first focusable element, shown only while focused (clarifications.md).
export function SkipLink({ label, inverted = false }: SkipLinkProps) {
  return (
    <a
      href="#main"
      className={cn(
        "fixed top-3 left-3 z-10000 -translate-y-24 rounded-pill px-4.5 py-2.5 text-small font-medium focus:translate-y-0",
        inverted
          ? "bg-paper text-ink hover:text-ink"
          : "bg-ink text-paper hover:text-paper",
      )}
    >
      {label}
    </a>
  );
}
