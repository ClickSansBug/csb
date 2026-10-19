import type { ReactNode } from "react";

import { ButtonLink } from "@/components/ui/button-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/utils/cn";

import { gutters, mobileHeading, mobileStack } from "./responsive";

type CtaBandProps = {
  eyebrow?: string;
  title: ReactNode;
  text: string;
  button: { href: string; label: string };
  email: { href: string; label: string };
};

// Dark call-to-action band before the footer (design: section data-island).
export function CtaBand({ eyebrow, title, text, button, email }: CtaBandProps) {
  return (
    <section
      className={cn("bg-island text-paper island", gutters, mobileStack)}
    >
      <div
        className={cn(
          "mx-auto max-w-content px-8 pt-24 pb-26 text-center",
          gutters,
          mobileStack,
        )}
      >
        <div data-reveal="" className="mx-auto max-w-cta">
          {eyebrow ? <Eyebrow label={eyebrow} tone="light" /> : null}
          <h2
            className={cn(
              "mb-4.5 text-h2-cta font-semibold tracking-n32",
              eyebrow ? "mt-4" : "mt-0",
              mobileHeading,
            )}
          >
            {title}
          </h2>
          <p className="mx-auto mb-8 max-w-copy text-17 leading-160 text-pretty text-paper/70">
            {text}
          </p>
          <ButtonLink tone="light" size="lg" href={button.href}>
            {button.label}
          </ButtonLink>
          <div className="mt-5.5">
            <a
              href={email.href}
              className="font-mono text-12 tracking-p60 text-paper/55 hover:text-paper"
            >
              {email.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
