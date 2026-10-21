"use client";

import { useRef } from "react";

// Elements of a list kept by id, for the measurements of an effect, and the ref callback that
// registers each of them (and forgets it once unmounted).
export function useElementMap<T extends HTMLElement>() {
  const elements = useRef(new Map<string, T>());
  const register = (id: string) => (node: T | null) => {
    if (node) elements.current.set(id, node);
    else elements.current.delete(id);
  };
  return [elements, register] as const;
}
