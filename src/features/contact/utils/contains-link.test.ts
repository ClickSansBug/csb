import { describe, expect, it } from "vitest";

import { containsLink } from "./contains-link";

describe("containsLink", () => {
  it.each([
    "bellini.ch",
    "Pizzeria bellini.ch",
    "www.bellini",
    "https://bellini.ch",
    "HTTP://X",
    "voir bellini.ch/menu",
  ])("rejects %s", (value) => {
    expect(containsLink(value)).toBe(true);
  });

  it.each(["Bellini S.A.", "J.-P. Dupont", "Dupont & Fils", "Claire Martin"])(
    "accepts %s",
    (value) => {
      expect(containsLink(value)).toBe(false);
    },
  );

  it("flags the accepted rare false positive written without space", () => {
    expect(containsLink("Ste.Croix")).toBe(true);
  });
});
