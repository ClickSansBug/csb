import type { ReactNode } from "react";

import { AccentRule } from "@/components/ui/accent-rule";
import { StatusChip } from "@/components/ui/status-chip";
import { cn } from "@/utils/cn";

import { gutters, mobileTitle, singleColumn } from "./responsive";

type ContactSectionProps = {
  chip: string;
  title: ReactNode;
  lead: string;
  facts: { key: string; icon: ReactNode; title: string; text: string }[];
  team: { key: string; initials: string; name: string; role: string }[];
  // The form card content (form, and later its states, added by wiring).
  children: ReactNode;
};

// Contact page body: introduction on the left, form card on the right (design: contact.html).
export function ContactSection({
  chip,
  title,
  lead,
  facts,
  team,
  children,
}: ContactSectionProps) {
  return (
    <section
      className={cn(
        "mx-auto grid max-w-content grid-cols-hero items-start gap-16 px-8 pt-19 pb-24",
        singleColumn,
        gutters,
      )}
    >
      <div data-reveal="" className={gutters}>
        <div className="flex items-center gap-3.5">
          <StatusChip tone="island" label={chip} />
        </div>
        <h1
          className={cn(
            "mt-5.5 text-display leading-103 font-semibold tracking-n32 text-balance",
            mobileTitle,
          )}
        >
          {title}
        </h1>
        <AccentRule tone="light" className="mt-6" />
        <p className="mt-7 max-w-lead text-17-5 leading-160 text-pretty text-paper/70">
          {lead}
        </p>

        <div className="mt-10 grid gap-5.5 border-t border-paper/14 pt-8">
          {facts.map((fact) => (
            <div
              key={fact.key}
              className="grid grid-cols-icon-row items-start gap-4"
            >
              {fact.icon}
              <div>
                <div className="text-16 font-semibold">{fact.title}</div>
                <div className="mt-1 text-14-5 leading-155 text-paper/62">
                  {fact.text}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-9 border-y border-paper/28">
          {team.map((member, index) => (
            <div
              key={member.key}
              className={cn(
                "grid grid-cols-person-sm items-baseline gap-4.5 py-5",
                index > 0 && "border-t border-paper/12",
              )}
            >
              <div className="font-mono text-28 leading-90 font-medium tracking-n40 text-paper/26">
                {member.initials}
              </div>
              <div>
                <div className="text-17 font-semibold">{member.name}</div>
                <div className="mt-1.5 font-mono text-10-5 tracking-p130 text-paper/45 uppercase">
                  {member.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        data-reveal=""
        className={cn(
          "rounded-lg border border-paper/12 bg-paper/4 px-7.5 pt-8 pb-8.5",
          gutters,
        )}
      >
        {children}
      </div>
    </section>
  );
}
