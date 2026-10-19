import { cn } from "@/utils/cn";

// Green dash + mono label above a section title.
type EyebrowProps = {
  label: string;
  tone?: "green" | "light";
  reveal?: boolean;
  className?: string;
};

export function Eyebrow({
  label,
  tone = "green",
  reveal = false,
  className,
}: EyebrowProps) {
  return (
    <div
      data-reveal={reveal ? "" : undefined}
      className={cn(
        "flex items-center gap-2.5 font-mono text-11-5 tracking-p140 uppercase",
        tone === "green" ? "text-g52" : "text-brand-light",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-0.5 w-6 flex-none",
          tone === "green" ? "bg-brand" : "bg-brand-light",
        )}
      />
      {label}
    </div>
  );
}
