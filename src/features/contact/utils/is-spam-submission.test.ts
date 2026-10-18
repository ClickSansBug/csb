import { describe, expect, it } from "vitest";

import { isSpamSubmission } from "./is-spam-submission";

const NOW = 1_800_000_000_000;

describe("isSpamSubmission", () => {
  it("accepts an empty honeypot and a form filled in 3 s or more", () => {
    expect(isSpamSubmission("", String(NOW - 3000), NOW)).toBe(false);
    expect(isSpamSubmission("", String(NOW - 3_600_000), NOW)).toBe(false);
  });

  it("flags a filled honeypot", () => {
    expect(
      isSpamSubmission("https://spam.example", String(NOW - 10_000), NOW),
    ).toBe(true);
  });

  it("flags a form sent under 3 s", () => {
    expect(isSpamSubmission("", String(NOW - 2999), NOW)).toBe(true);
  });

  it.each(["", "abc", "12.5", "-1000"])(
    "flags a missing or non-numeric timestamp (%s)",
    (startedAt) => {
      expect(isSpamSubmission("", startedAt, NOW)).toBe(true);
    },
  );
});
