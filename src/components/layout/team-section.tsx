import type { ReactNode } from "react";

import { Eyebrow } from "@/components/ui/eyebrow";
import { LabelRule } from "@/components/ui/label-rule";
import { cn } from "@/utils/cn";

import { GlowCard } from "./glow-card";
import {
  gutters,
  mobileHeading,
  mobileStack,
  singleColumn,
} from "./responsive";

type Member = {
  key: string;
  initials: string;
  name: string;
  role: string;
  tags: string;
};

type TeamSectionProps = {
  eyebrow: string;
  title: ReactNode;
  paragraphs: { key: string; text: string }[];
  aside: { start: string; end: string };
  members: Member[];
};

const paragraph = "text-17 leading-162 text-pretty text-ink/68";

// « Deux personnes, pas un service client. » (design: index.html, team section).
export function TeamSection({
  eyebrow,
  title,
  paragraphs,
  aside,
  members,
}: TeamSectionProps) {
  return (
    <section
      className={cn("border-t border-ink/10 bg-card", gutters, mobileStack)}
    >
      <div
        className={cn(
          "mx-auto grid max-w-content grid-cols-split items-start gap-14 px-8 pt-22 pb-24",
          singleColumn,
          gutters,
          mobileStack,
        )}
      >
        <div data-reveal="">
          <div>
            <Eyebrow label={eyebrow} />
          </div>
          <h2
            className={cn(
              "mt-3.5 mb-5.5 text-h2 font-semibold tracking-n30",
              mobileHeading,
            )}
          >
            {title}
          </h2>
          {paragraphs.map((item, index) => (
            <p
              key={item.key}
              className={cn(paragraph, index < paragraphs.length - 1 && "mb-4")}
            >
              {item.text}
            </p>
          ))}
        </div>
        <div data-reveal="">
          <LabelRule start={aside.start} end={aside.end} className="mb-1" />
          <div className="border-y-2 border-ink">
            {members.map((member, index) => (
              <GlowCard
                key={member.key}
                className={cn(
                  "grid grid-cols-person items-start gap-5.5 rounded-sm py-6.5 pr-5 pl-0",
                  index > 0 && "border-t border-ink/12",
                )}
              >
                <div className="pl-1 font-mono text-40 leading-90 font-medium tracking-n50 text-ink/16">
                  {member.initials}
                </div>
                <div>
                  <div className="text-22 font-semibold tracking-n20">
                    {member.name}
                  </div>
                  <div className="mt-1.25 text-15 leading-150 text-ink/62">
                    {member.role}
                  </div>
                  <div className="mt-3.5 font-mono text-10-5 tracking-p130 text-ink/40 uppercase">
                    {member.tags}
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
