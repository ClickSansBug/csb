"use client";

import { type ReactNode, useEffect, useId, useRef, useState } from "react";

import { prefersReducedMotion } from "@/hooks/reduced-motion";
import { cn } from "@/utils/cn";

// Maintenance plans that unfold (data-fold of csb-behaviors.js): one open at a time, B open on
// load, a click on the open plan closes it. Each head is a button (clarifications.md › Tarifs).

export type MaintenancePlan = {
  id: string;
  ref: string;
  name: string;
  text: string;
  price: string;
  unit: string;
  body: ReactNode;
};

type MaintenanceFoldsProps = {
  plans: MaintenancePlan[];
  defaultOpen: string;
  sign: string;
};

const BODY_TRANSITION =
  "height var(--motion-tab) var(--ease-swift), opacity var(--motion-fold-fade) ease";

export function MaintenanceFolds({
  plans,
  defaultOpen,
  sign,
}: MaintenanceFoldsProps) {
  const [open, setOpen] = useState<string | null>(defaultOpen);
  const baseId = useId();
  const bodies = useRef(new Map<string, HTMLDivElement>());
  const animate = useRef(false);

  // Height of each body: its scroll height when open, 0 when closed (kept in sync on resize, and
  // measured again once the web fonts are loaded).
  useEffect(() => {
    let active = true;
    const apply = (withTransition: boolean) => {
      bodies.current.forEach((body, id) => {
        const isOpen = id === open;
        body.style.transition =
          withTransition && !prefersReducedMotion() ? BODY_TRANSITION : "none";
        body.style.height = isOpen ? `${body.scrollHeight}px` : "0px";
        body.style.opacity = isOpen ? "1" : "0";
      });
    };
    apply(animate.current);
    const resize = () => apply(false);
    void document.fonts.ready.then(() => {
      if (active && !animate.current) resize();
    });
    window.addEventListener("resize", resize);
    return () => {
      active = false;
      window.removeEventListener("resize", resize);
    };
  }, [open]);

  const toggle = (id: string) => {
    animate.current = true;
    setOpen((current) => (current === id ? null : id));
  };

  return (
    <>
      {plans.map((plan) => {
        const isOpen = plan.id === open;
        const bodyId = `${baseId}-${plan.id}`;
        return (
          <div
            key={plan.id}
            className={cn(
              "rounded-row border-b border-ink/10 transition-colors duration-300 ease-standard motion-reduce:transition-none",
              isOpen && "bg-card",
            )}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={bodyId}
              onClick={() => toggle(plan.id)}
              className={cn(
                "grid w-full cursor-pointer grid-cols-fold items-center gap-x-5 gap-y-0 py-6.5 pr-4.5 pl-3 text-left",
                "max-lg:grid-cols-fold-tablet max-lg:gap-y-2.5 max-lg:pr-3",
                "max-md:grid-cols-pair max-md:gap-x-3 max-md:gap-y-2 max-md:py-5.5 max-md:pr-1 max-md:pl-0.5",
              )}
            >
              <div className="font-mono text-note text-g52 max-md:hidden">
                {plan.ref}
              </div>
              <div className="flex flex-wrap items-baseline gap-x-3.5 gap-y-0 max-md:col-start-1 max-md:row-start-1">
                <span className="text-heading-sm font-semibold tracking-title">
                  {plan.name}
                </span>
                <span className="text-ui text-ink/55">{plan.text}</span>
              </div>
              <div className="text-right font-mono text-heading-sm tracking-heading whitespace-nowrap max-md:col-start-1 max-md:row-start-2 max-md:text-left max-md:text-title-md">
                {plan.price}
                <span className="ml-1.5 text-fine text-ink/45">
                  {plan.unit}
                </span>
              </div>
              <div
                aria-hidden="true"
                className={cn(
                  "ml-5.5 flex size-6.5 flex-none items-center justify-center rounded-circle border border-ink/20 text-base text-ink/50 transition-transform duration-320 ease-swift motion-reduce:transition-none",
                  "max-lg:hidden max-md:col-start-2 max-md:row-span-2 max-md:row-start-1 max-md:ml-2.5 max-md:flex max-md:self-center",
                  isOpen && "rotate-45",
                )}
              >
                {sign}
              </div>
            </button>
            <div
              ref={(node) => {
                if (node) bodies.current.set(plan.id, node);
                else bodies.current.delete(plan.id);
              }}
              id={bodyId}
              aria-hidden={!isOpen}
              inert={!isOpen}
              className={cn("overflow-hidden", !isOpen && "h-0 opacity-0")}
            >
              {plan.body}
            </div>
          </div>
        );
      })}
    </>
  );
}
