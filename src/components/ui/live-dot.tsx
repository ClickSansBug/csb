import { cn } from "@/utils/cn";

type LiveDotProps = {
  onDark?: boolean;
};

// Pulsing "live" dot of the hero badges; still when motion is reduced.
export function LiveDot({ onDark = false }: LiveDotProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "size-1.5 flex-none animate-pulse-dot rounded-circle bg-accent-fill motion-reduce:animate-none",
        onDark ? "dot-halo-light" : "dot-halo",
      )}
    />
  );
}
