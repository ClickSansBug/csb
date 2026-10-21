"use client";

import {
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { prefersReducedMotion } from "@/hooks/reduced-motion";
import { useElementMap } from "@/hooks/use-element-map";
import { cn } from "@/utils/cn";

// Essentiel / Présence / Performance selector (data-tabs of csb-behaviors.js): the ink pill slides
// under the selected tab and the panel fades in. Tabs pattern of clarifications.md › Tarifs:
// automatic activation, arrows loop, Home / End, only the selected tab is tabbable.
const RELAYOUT_AFTER_MS = 260;

export type PackTab = {
  id: string;
  label: string;
  panel: ReactNode;
};

type PackTabsProps = {
  tabs: PackTab[];
  defaultTab: string;
};

export function PackTabs({ tabs, defaultTab }: PackTabsProps) {
  const [selected, setSelected] = useState(defaultTab);
  const baseId = useId();
  const inkRef = useRef<HTMLDivElement>(null);
  const [tabRefs, registerTab] = useElementMap<HTMLButtonElement>();
  const [panelRefs, registerPanel] = useElementMap<HTMLDivElement>();
  const animate = useRef(false);

  // Ink position: width and offset of the selected tab, measured after its weight changed.
  useLayoutEffect(() => {
    const place = (withTransition: boolean) => {
      const ink = inkRef.current;
      const tab = tabRefs.current.get(selected);
      if (!ink || !tab) return;
      ink.style.transition =
        withTransition && !prefersReducedMotion()
          ? "transform var(--motion-tab) var(--ease-swift), width var(--motion-tab) var(--ease-swift)"
          : "none";
      ink.style.width = `${tab.offsetWidth}px`;
      ink.style.transform = `translateX(${tab.offsetLeft}px)`;
    };
    const initial = !animate.current;
    place(!initial);
    const relayout = () => place(false);
    window.addEventListener("resize", relayout);
    // On load only, as in the design: measured again after 260ms, and once the web fonts are loaded.
    let active = true;
    const timer = initial ? window.setTimeout(relayout, RELAYOUT_AFTER_MS) : 0;
    if (initial) {
      void document.fonts.ready.then(() => {
        if (active && !animate.current) relayout();
      });
    }
    return () => {
      active = false;
      window.removeEventListener("resize", relayout);
      window.clearTimeout(timer);
    };
  }, [selected, tabRefs]);

  // Panel entrance: from 10px lower and transparent, unless motion is reduced.
  useEffect(() => {
    const panel = panelRefs.current.get(selected);
    if (!panel || prefersReducedMotion()) return;
    panel.style.transition = "none";
    panel.style.opacity = "0";
    panel.style.transform = "translateY(10px)";
    const frame = requestAnimationFrame(() => {
      panel.style.transition =
        "opacity var(--motion-tab) ease, transform var(--motion-tab) var(--ease-swift)";
      panel.style.opacity = "1";
      panel.style.transform = "none";
    });
    return () => cancelAnimationFrame(frame);
  }, [selected, panelRefs]);

  const select = (id: string, focus: boolean) => {
    animate.current = true;
    setSelected(id);
    if (focus) tabRefs.current.get(id)?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const index = tabs.findIndex((tab) => tab.id === selected);
    const last = tabs.length - 1;
    const target =
      event.key === "ArrowRight"
        ? index === last
          ? 0
          : index + 1
        : event.key === "ArrowLeft"
          ? index === 0
            ? last
            : index - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : -1;
    const next = tabs[target];
    if (!next) return;
    event.preventDefault();
    select(next.id, true);
  };

  return (
    <>
      <div
        role="tablist"
        className="relative inline-flex reveal items-center rounded-pill border border-ink/14 bg-paper p-1.25"
      >
        <div
          ref={inkRef}
          aria-hidden="true"
          className="absolute top-1.25 bottom-1.25 left-0 rounded-pill bg-ink"
        />
        {tabs.map((tab) => {
          const on = tab.id === selected;
          return (
            <button
              key={tab.id}
              ref={registerTab(tab.id)}
              type="button"
              role="tab"
              id={`${baseId}-tab-${tab.id}`}
              aria-selected={on}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => select(tab.id, false)}
              onKeyDown={onKeyDown}
              className={cn(
                "relative z-1 cursor-pointer rounded-pill px-6.5 py-2.75 text-base whitespace-nowrap transition-colors duration-300 ease-standard",
                "max-sm:px-3.25 max-sm:py-2.5 max-sm:text-small max-xs:px-2.25 max-xs:text-fine",
                on ? "font-semibold text-paper" : "font-medium text-ink/60",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="mt-10 border-t-2 border-ink">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            ref={registerPanel(tab.id)}
            role="tabpanel"
            id={`${baseId}-panel-${tab.id}`}
            aria-labelledby={`${baseId}-tab-${tab.id}`}
            hidden={tab.id !== selected}
            className="grid grid-cols-pack gap-0 max-lg:grid-cols-single"
          >
            {tab.panel}
          </div>
        ))}
      </div>
    </>
  );
}
