import Link from "next/link";
import type { ReactNode } from "react";

import { AccentRule } from "@/components/ui/accent-rule";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/utils/cn";

import {
  gutters,
  mobileHeading,
  mobileStack,
  singleColumn,
} from "./responsive";

type AfterLaunchProps = {
  eyebrow: string;
  title: ReactNode;
  free: { label: string; text: string };
  then: { label: string; text: ReactNode; alternative: string };
  link: { href: string; label: string };
};

const blockLabel =
  "mb-2.5 font-mono text-10-5 tracking-p140 text-g52 uppercase";
const blockText = "text-17 leading-160 text-pretty text-ink/72";

// « Et après ? » (design: index.html). No cursor halo on these two blocks: the design's halo
// is not visible there (clarifications.md › Réponses aux questions de frontend-integrator, 1).
export function AfterLaunch({
  eyebrow,
  title,
  free,
  then,
  link,
}: AfterLaunchProps) {
  return (
    <section className={cn("border-t border-ink/10", gutters, mobileStack)}>
      <div
        className={cn(
          "mx-auto grid max-w-content grid-cols-split items-start gap-14 px-8 pt-22 pb-24",
          singleColumn,
          gutters,
          mobileStack,
        )}
      >
        <div data-reveal="">
          <Eyebrow label={eyebrow} />
          <h2
            className={cn(
              "mt-3.5 text-h2 font-semibold tracking-n30",
              mobileHeading,
            )}
          >
            {title}
          </h2>
          <AccentRule className="mt-5.5" />
        </div>
        <div data-reveal="">
          <div className="border-t-2 border-ink">
            <div className="border-b border-ink/12 pt-6.5 pb-6">
              <div className={blockLabel}>{free.label}</div>
              <p className={blockText}>{free.text}</p>
            </div>
            <div className="border-b-2 border-ink pt-6.5 pb-6">
              <div className={blockLabel}>{then.label}</div>
              <p className={cn("mb-2", blockText)}>{then.text}</p>
              <p className={blockText}>{then.alternative}</p>
            </div>
          </div>
          <div className="mt-5.5">
            <Link
              href={link.href}
              className="border-b border-brand/40 text-14-5 font-medium text-g52 hover:border-g52"
            >
              {link.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
