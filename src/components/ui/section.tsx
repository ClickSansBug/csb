import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/cn";

// The design forces these paddings on every <section> and on each of its direct <div> children:
// 24px sides under 900px, 56/60px top/bottom under 760px, 18px sides under 520px.
export const SECTION_GUTTERS =
  "max-lg:px-6 max-md:pt-14 max-md:pb-15 max-sm:px-4.5";

type SectionProps = ComponentPropsWithoutRef<"section">;

export function Section({ className, ...props }: SectionProps) {
  return <section className={cn(SECTION_GUTTERS, className)} {...props} />;
}
