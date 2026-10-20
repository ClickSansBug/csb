import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/cn";

import { SECTION_GUTTERS } from "./section";

type ContainerProps = ComponentPropsWithoutRef<"div">;

// Centred 1180px column of a section (direct child of the <section>).
export function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={cn("mx-auto max-w-page px-8", SECTION_GUTTERS, className)}
      {...props}
    />
  );
}
