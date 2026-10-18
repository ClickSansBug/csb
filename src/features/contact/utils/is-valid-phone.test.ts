import { describe, expect, it } from "vitest";

import { isValidPhone } from "./is-valid-phone";

describe("isValidPhone", () => {
  it.each([
    "+41 79 000 00 00",
    "079 000 00 00",
    "(021) 000-00-00",
    "12345678",
    "+123456789012345",
  ])("accepts %s", (value) => {
    expect(isValidPhone(value)).toBe(true);
  });

  it.each([
    ["letters", "079 abc 00 00"],
    ["dot separator", "079.000.00.00"],
    ["plus not first", "41+79 000 00 00"],
    ["fewer than 8 digits", "1234567"],
    ["more than 15 digits", "+1234567890123456"],
  ])("rejects %s", (_case, value) => {
    expect(isValidPhone(value)).toBe(false);
  });
});
