import { cn } from "@/utils/cn";

// Paper grain over the whole page: drifting on light pages, still and stronger on Contact.
export function Grain({ variant }: { variant: "default" | "island" }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed -inset-1/5 z-9999 grain-texture",
        variant === "default"
          ? "animate-drift opacity-3.5 mix-blend-multiply motion-reduce:animate-none"
          : "opacity-5 mix-blend-overlay",
      )}
    />
  );
}
