import type { ReactNode } from "react";

import { AccentRule } from "@/components/ui/accent-rule";
import { ButtonLink } from "@/components/ui/button-link";
import { LabelRule } from "@/components/ui/label-rule";
import { StatusChip } from "@/components/ui/status-chip";
import { cn } from "@/utils/cn";

import { PreviewMockup } from "./preview-mockup";
import { gutters, mobileStack, mobileTitle, singleColumn } from "./responsive";

type HomeHeroProps = {
  chip: string;
  title: ReactNode;
  lead: string;
  primaryCta: { href: string; label: string };
  secondaryCta: { href: string; label: string };
  facts: { key: string; label: string }[];
  preview: {
    label: string;
    caption: string;
    address: string;
    video: { src: string; poster: string; label: string };
    tags: { neutral: string; green: string };
  };
};

// First section of the home page (design: index.html, hero).
export function HomeHero({
  chip,
  title,
  lead,
  primaryCta,
  secondaryCta,
  facts,
  preview,
}: HomeHeroProps) {
  return (
    <section
      className={cn(
        "mx-auto grid max-w-content grid-cols-hero items-center gap-16 px-8 pt-23 pb-22",
        singleColumn,
        gutters,
        mobileStack,
      )}
    >
      <div data-reveal="" className={cn(gutters, mobileStack)}>
        <StatusChip tone="home" label={chip} />
        <h1
          className={cn(
            "mt-6.5 text-display leading-103 font-semibold tracking-n32 text-balance",
            mobileTitle,
          )}
        >
          {title}
        </h1>
        <AccentRule className="mt-6" />
        <p className="mt-7.5 max-w-lead text-18 leading-158 text-pretty text-ink/66">
          {lead}
        </p>
        <div className="mt-9 flex flex-wrap gap-3.5">
          <ButtonLink tone="ink" size="md" href={primaryCta.href}>
            {primaryCta.label}
          </ButtonLink>
          <ButtonLink tone="outline" size="md" href={secondaryCta.href}>
            {secondaryCta.label}
          </ButtonLink>
        </div>
        <div
          data-reveal=""
          className="mt-12 flex flex-wrap items-center gap-4.5 border-t border-ink/10 pt-6.5 font-mono text-11-5 tracking-p110 text-ink/45 uppercase"
        >
          {facts.map((fact, index) => (
            <FactItem key={fact.key} label={fact.label} separated={index > 0} />
          ))}
        </div>
      </div>
      <div className={cn(gutters, mobileStack)}>
        <LabelRule
          reveal
          start={preview.label}
          end={preview.caption}
          className="mb-4"
        />
        <PreviewMockup
          address={preview.address}
          video={preview.video}
          tags={preview.tags}
        />
      </div>
    </section>
  );
}

function FactItem({ label, separated }: { label: string; separated: boolean }) {
  return (
    <>
      {separated ? (
        <span aria-hidden="true" className="size-0.75 rounded-full bg-ink/25" />
      ) : null}
      <span>{label}</span>
    </>
  );
}
