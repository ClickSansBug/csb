"use client";

import { useId, useRef, useState } from "react";

import { ButtonLink } from "@/components/ui/button-link";
import { DotList } from "@/components/ui/dot-list";
import { RoundSign } from "@/components/ui/round-sign";
import { useAnimatedHeight } from "@/hooks/use-animated-height";
import { cn } from "@/utils/cn";

type PlanItem = { key: string; text: string };

type Plan = {
  key: string;
  ref: string;
  name: string;
  summary: string;
  price: string;
  columns: PlanItem[][];
};

type MaintenancePlansProps = {
  columns: { ref: string; plan: string; amount: string };
  plans: Plan[];
  defaultOpenKey: string;
  unit: string;
  detailTitle: string;
  cta: { href: string; label: string };
  signs: { bullet: string; plus: string };
  conditions: string;
  discounts: string;
};

// Maintenance plans table, one plan open at a time (design: tarifs.html, data-fold;
// clarifications.md › Formules de maintenance dépliables). Between 761 and 900px the header
// row keeps its four columns, as in the design (clarifications.md › Réponses aux questions
// de frontend-integrator, 2).
export function MaintenancePlans({
  columns,
  plans,
  defaultOpenKey,
  unit,
  detailTitle,
  cta,
  signs,
  conditions,
  discounts,
}: MaintenancePlansProps) {
  const [openKey, setOpenKey] = useState<string | null>(defaultOpenKey);

  return (
    <div data-reveal="" className="mt-11 border-t-2 border-ink">
      <div className="grid grid-cols-maintenance gap-x-5 border-b border-ink pt-3 pr-4.5 pb-3 pl-3 font-mono text-10 tracking-p160 text-ink/42 uppercase max-mobile:hidden">
        <div>{columns.ref}</div>
        <div>{columns.plan}</div>
        <div className="text-right">{columns.amount}</div>
        <div className="ml-5.5 w-6.5" />
      </div>
      {plans.map((plan) => (
        <PlanRow
          key={plan.key}
          plan={plan}
          open={openKey === plan.key}
          onToggle={() =>
            setOpenKey((current) => (current === plan.key ? null : plan.key))
          }
          unit={unit}
          detailTitle={detailTitle}
          cta={cta}
          signs={signs}
        />
      ))}
      <div className="flex flex-wrap items-baseline justify-between gap-5 pt-4 pr-4.5 pl-3 font-mono text-10-5 tracking-p130 text-ink/40 uppercase">
        <span>{conditions}</span>
        <span>{discounts}</span>
      </div>
    </div>
  );
}

type PlanRowProps = {
  plan: Plan;
  open: boolean;
  onToggle: () => void;
  unit: string;
  detailTitle: string;
  cta: { href: string; label: string };
  signs: { bullet: string; plus: string };
};

function PlanRow({
  plan,
  open,
  onToggle,
  unit,
  detailTitle,
  cta,
  signs,
}: PlanRowProps) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const bodyId = useId();
  useAnimatedHeight(bodyRef, open);

  return (
    <div
      className={cn(
        "fold-row rounded-xs border-b border-ink/10",
        open && "bg-card",
      )}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={bodyId}
        onClick={onToggle}
        className={cn(
          "grid w-full cursor-pointer grid-cols-maintenance items-center gap-x-5 pt-6.5 pr-4.5 pb-6.5 pl-3 text-left",
          "max-tablet:grid-cols-maintenance-tablet max-tablet:gap-y-2.5 max-tablet:pr-3",
          "max-mobile:grid-cols-maintenance-mobile max-mobile:gap-x-3 max-mobile:gap-y-2 max-mobile:pt-5.5 max-mobile:pr-1 max-mobile:pb-5.5 max-mobile:pl-0.5",
        )}
      >
        <span className="font-mono text-12 text-g52 max-mobile:hidden">
          {plan.ref}
        </span>
        <span className="flex flex-wrap items-baseline gap-x-3.5 gap-y-0 max-mobile:col-start-1 max-mobile:row-start-1">
          <span className="text-25 font-semibold tracking-n20">
            {plan.name}
          </span>
          <span className="text-14-5 text-ink/55">{plan.summary}</span>
        </span>
        <span className="text-right font-mono text-25 tracking-n30 whitespace-nowrap max-mobile:col-start-1 max-mobile:row-start-2 max-mobile:text-left max-mobile:text-22">
          {plan.price}
          <span className="ml-1.5 text-13 text-ink/45">{unit}</span>
        </span>
        <RoundSign
          variant="plan"
          sign={signs.plus}
          className="fold-sign ml-5.5 max-tablet:hidden max-mobile:col-start-2 max-mobile:row-span-2 max-mobile:row-start-1 max-mobile:ml-2.5 max-mobile:flex max-mobile:self-center"
        />
      </button>
      <div
        ref={bodyRef}
        id={bodyId}
        inert={!open}
        className={cn(
          "fold-body overflow-hidden",
          open ? "h-auto opacity-100" : "h-0 opacity-0",
        )}
      >
        <div className="pt-1 pr-4.5 pb-7.5 pl-13 max-tablet:pl-7.5 max-mobile:px-1">
          <div className="mb-1.5 font-mono text-10-5 tracking-p160 text-ink/40 uppercase">
            {detailTitle}
          </div>
          <div className="grid grid-cols-promises gap-x-11 gap-y-0 max-menu:grid-cols-single">
            {plan.columns.map((items, index) => (
              <DotList
                key={index}
                items={items}
                bullet={signs.bullet}
                variant="plan"
              />
            ))}
          </div>
          <ButtonLink
            tone="outline-plan"
            size="plan"
            href={cta.href}
            className="mt-6.5"
          >
            {cta.label}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
