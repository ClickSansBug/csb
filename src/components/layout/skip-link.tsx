import { cn } from "@/utils/cn";

// « Aller au contenu », first focusable element of each page (clarifications.md › Lien
// d'évitement): hidden until focused.
type SkipLinkProps = {
  targetId: string;
  label: string;
  inverted?: boolean;
};

export function SkipLink({ targetId, label, inverted = false }: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className={cn(
        "fixed top-3 left-3 z-10000 rounded-pill px-4.5 py-2.5 text-14 font-medium not-focus:sr-only",
        inverted ? "bg-paper text-ink" : "bg-ink text-paper",
      )}
    >
      {label}
    </a>
  );
}
