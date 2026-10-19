"use client";

import {
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { prefersReducedMotion } from "@/hooks/prefers-reduced-motion";
import { cn } from "@/utils/cn";

type PackTab = { key: string; label: string; panel: ReactNode };

type PackTabsProps = {
  tabs: PackTab[];
  defaultKey: string;
};

// Delay of the design's second layout pass (csb-behaviors.js › Bascules: setTimeout 260).
const RELAYOUT_DELAY_MS = 260;

// Essentiel / Présence / Performance selector with sliding pill (design: data-tabs, tabs
// pattern of clarifications.md › Sélecteur Essentiel / Présence / Performance).
export function PackTabs({ tabs, defaultKey }: PackTabsProps) {
  const [selected, setSelected] = useState(defaultKey);
  const [entering, setEntering] = useState(false);
  const animateInk = useRef(false);
  const inkRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const baseId = useId();

  const selectedRef = useRef(selected);

  const placeInk = useCallback((animate: boolean) => {
    const ink = inkRef.current;
    const tab = tabRefs.current[selectedRef.current];
    if (!ink || !tab) return;
    ink.toggleAttribute("data-animate", animate);
    ink.style.setProperty("--tab-ink-width", `${tab.offsetWidth}px`);
    ink.style.setProperty("--tab-ink-x", `${tab.offsetLeft}px`);
  }, []);

  // Selected weight (600) changes the tab width: measure after each selection.
  useLayoutEffect(() => {
    selectedRef.current = selected;
    placeInk(animateInk.current);
  }, [selected, placeInk]);

  useEffect(() => {
    const relayout = () => placeInk(false);
    window.addEventListener("resize", relayout);
    const timer = window.setTimeout(relayout, RELAYOUT_DELAY_MS);
    return () => {
      window.removeEventListener("resize", relayout);
      window.clearTimeout(timer);
    };
  }, [placeInk]);

  const select = (key: string, focus = false) => {
    animateInk.current = true;
    setSelected(key);
    setEntering(!prefersReducedMotion());
    if (focus) tabRefs.current[key]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const index = tabs.findIndex((tab) => tab.key === selected);
    const last = tabs.length - 1;
    const target = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    }[event.key];
    const next = target === undefined ? undefined : tabs[target];
    if (!next) return;
    event.preventDefault();
    select(next.key, true);
  };

  return (
    <>
      <div
        data-reveal=""
        role="tablist"
        className="relative inline-flex items-center rounded-pill border border-ink/14 bg-paper p-1.25"
      >
        <div
          ref={inkRef}
          aria-hidden="true"
          className="tab-ink absolute top-1.25 left-0 tab-ink-height rounded-pill bg-ink"
        />
        {tabs.map((tab) => {
          const active = tab.key === selected;
          return (
            <button
              key={tab.key}
              ref={(node) => {
                tabRefs.current[tab.key] = node;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${tab.key}`}
              aria-selected={active}
              aria-controls={`${baseId}-panel-${tab.key}`}
              tabIndex={active ? 0 : -1}
              onClick={() => select(tab.key)}
              onKeyDown={onKeyDown}
              className={cn(
                "relative z-1 cursor-pointer appearance-none rounded-pill border-none bg-transparent px-6.5 py-2.75 text-15 whitespace-nowrap transition-colors duration-300 ease-std motion-reduce:transition-none",
                "max-phone:px-3.25 max-phone:py-2.5 max-phone:text-14 max-tiny:px-2.25 max-tiny:text-13",
                active ? "font-semibold text-paper" : "font-medium text-ink/60",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="mt-10 border-t-2 border-ink">
        {tabs.map((tab) => {
          const active = tab.key === selected;
          return (
            <div
              key={tab.key}
              role="tabpanel"
              id={`${baseId}-panel-${tab.key}`}
              aria-labelledby={`${baseId}-tab-${tab.key}`}
              hidden={!active}
              data-panel-enter={active && entering ? "" : undefined}
              onAnimationEnd={() => setEntering(false)}
            >
              {tab.panel}
            </div>
          );
        })}
      </div>
    </>
  );
}
