"use client";

import {
  type ReactNode,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { prefersReducedMotion } from "@/hooks/reduced-motion";
import { cn } from "@/utils/cn";

// FAQ accordion (script of faq.html, clarifications.md › FAQ): one question open, the first on
// load, a click on the open question closes everything. The answer height is animated from 0 to
// its real height (no cap), the left rule and offset in 0.3s; instant when motion is reduced.

export type FaqEntry = {
  id: string;
  question: string;
  answer: ReactNode;
};

type FaqAccordionProps = {
  items: FaqEntry[];
  openSign: string;
  closedSign: string;
  className?: string;
};

const BODY_TRANSITION = "height var(--motion-accordion) var(--ease-reveal)";

export function FaqAccordion({
  items,
  openSign,
  closedSign,
  className,
}: FaqAccordionProps) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);
  const baseId = useId();
  const bodies = useRef(new Map<string, HTMLDivElement>());
  const animate = useRef(false);
  const previous = useRef<string | null>(open);

  // At rest the open answer keeps its natural height (exact, like the CSS max-height of the
  // design); a pixel height is only used while it opens or closes, before the paint.
  useLayoutEffect(() => {
    const before = previous.current;
    previous.current = open;
    if (!animate.current || prefersReducedMotion()) return;

    const cleanups: (() => void)[] = [];
    bodies.current.forEach((body, id) => {
      const opening = id === open;
      const closing = id === before && id !== open;
      if (!opening && !closing) return;
      const height = body.scrollHeight;
      body.style.transition = "none";
      body.style.height = opening ? "0px" : `${height}px`;
      void body.offsetHeight;
      body.style.transition = BODY_TRANSITION;
      body.style.height = opening ? `${height}px` : "0px";
      const settle = () => {
        body.style.transition = "";
        body.style.height = "";
      };
      body.addEventListener("transitionend", settle, { once: true });
      cleanups.push(() => body.removeEventListener("transitionend", settle));
    });
    return () => cleanups.forEach((cleanup) => cleanup());
  }, [open]);

  return (
    <div className={cn("border-t border-ink/12", className)}>
      {items.map((item) => {
        const isOpen = item.id === open;
        const bodyId = `${baseId}-${item.id}`;
        return (
          <div
            key={item.id}
            className={cn(
              "border-b border-l-3 border-ink/12 transition-all duration-300 ease-standard motion-reduce:transition-none",
              isOpen ? "border-l-brand pl-5" : "border-l-transparent pl-0",
            )}
          >
            <h2>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={bodyId}
                onClick={() => {
                  animate.current = true;
                  setOpen((current) => (current === item.id ? null : item.id));
                }}
                className="flex w-full cursor-pointer items-center justify-between gap-6 py-5.5 text-left text-prose font-medium text-ink"
              >
                {item.question}
                <span
                  aria-hidden="true"
                  className="flex size-6.5 flex-none items-center justify-center rounded-circle border border-ink/20 font-mono text-small text-ink/50"
                >
                  {isOpen ? openSign : closedSign}
                </span>
              </button>
            </h2>
            <div
              ref={(node) => {
                if (node) bodies.current.set(item.id, node);
                else bodies.current.delete(item.id);
              }}
              id={bodyId}
              aria-hidden={!isOpen}
              inert={!isOpen}
              className={cn("overflow-hidden", !isOpen && "h-0")}
            >
              <p className="mb-6 max-w-copy-lg pr-15 text-body leading-prose text-pretty text-ink/65">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
