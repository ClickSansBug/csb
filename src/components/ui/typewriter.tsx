"use client";

import { useEffect, useState } from "react";

import { prefersReducedMotion } from "@/hooks/reduced-motion";

// Port of "URL qui s'écrit" (csb-behaviors.js): one more character every 62ms. The full text is
// rendered on the server and kept as is when motion is reduced.
const CHARACTER_DELAY_MS = 62;

type TypewriterProps = {
  text: string;
};

export function Typewriter({ text }: TypewriterProps) {
  const [length, setLength] = useState(text.length);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let typed = 0;
    let timer = 0;
    // The address is cleared, then typed one character per tick, as in the design.
    const start = window.setTimeout(() => {
      setLength(0);
      timer = window.setInterval(() => {
        typed += 1;
        setLength(typed);
        if (typed >= text.length) window.clearInterval(timer);
      }, CHARACTER_DELAY_MS);
    }, 0);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(timer);
    };
  }, [text]);

  return <span>{text.slice(0, length)}</span>;
}
