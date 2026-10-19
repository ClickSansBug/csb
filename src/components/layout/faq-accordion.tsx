"use client";

import { type ReactNode, useId, useRef, useState } from "react";

import { RoundSign } from "@/components/ui/round-sign";
import { useAnimatedHeight } from "@/hooks/use-animated-height";
import { cn } from "@/utils/cn";

import { gutters, mobileStack } from "./responsive";

type FaqItem = { key: string; question: string; answer: ReactNode };

type FaqAccordionProps = {
  items: FaqItem[];
  signs: { open: string; closed: string };
};

// One question open at a time, the first on load (design: faq.html script; animation from
// clarifications.md › FAQ).
export function FaqAccordion({ items, signs }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div
      data-reveal=""
      className={cn("max-w-faq border-t border-ink/12", gutters, mobileStack)}
    >
      {items.map((item, index) => (
        <FaqEntry
          key={item.key}
          item={item}
          open={index === openIndex}
          onToggle={() =>
            setOpenIndex((current) => (current === index ? -1 : index))
          }
          signs={signs}
        />
      ))}
    </div>
  );
}

type FaqEntryProps = {
  item: FaqItem;
  open: boolean;
  onToggle: () => void;
  signs: { open: string; closed: string };
};

function FaqEntry({ item, open, onToggle, signs }: FaqEntryProps) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const bodyId = useId();
  useAnimatedHeight(bodyRef, open);

  return (
    <div
      className={cn(
        "faq-item border-b border-l-3 border-ink/12",
        open ? "border-l-brand pl-5" : "border-l-transparent pl-0",
      )}
    >
      <h2>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={bodyId}
          onClick={onToggle}
          className="flex w-full cursor-pointer items-center justify-between gap-6 px-0 py-5.5 text-left text-16-5 font-medium text-ink"
        >
          {item.question}
          <RoundSign variant="faq" sign={open ? signs.open : signs.closed} />
        </button>
      </h2>
      <div
        ref={bodyRef}
        id={bodyId}
        inert={!open}
        className={cn("faq-body overflow-hidden", open ? "h-auto" : "h-0")}
      >
        <p className="mb-6 max-w-answer pr-15 text-15-5 leading-162 text-pretty text-ink/65">
          {item.answer}
        </p>
      </div>
    </div>
  );
}
