import { describe, expect, it } from "vitest";

import { parseEnv, validateEnvAtStartup } from "./env";

const valid = {
  RESEND_API_KEY: "re_test",
  CONTACT_TO_EMAIL: "info@clicksansbug.ch",
  CONTACT_FROM_EMAIL: "site@clicksansbug.ch",
  CONTACT_DRY_RUN: "false",
  NEXT_PUBLIC_SITE_URL: "https://clicksansbug.ch",
};

describe("parseEnv", () => {
  it("parses a complete environment", () => {
    const env = parseEnv(valid);
    expect(env.CONTACT_DRY_RUN).toBe(false);
    expect(env.CONTACT_TO_EMAIL).toBe("info@clicksansbug.ch");
  });

  it("lists every missing or invalid variable in a single error", () => {
    let message = "";
    try {
      parseEnv({ CONTACT_FROM_EMAIL: "not-an-email" });
    } catch (error) {
      message = (error as Error).message;
    }
    for (const name of [
      "RESEND_API_KEY",
      "CONTACT_TO_EMAIL",
      "CONTACT_FROM_EMAIL",
      "NEXT_PUBLIC_SITE_URL",
    ]) {
      expect(message).toContain(name);
    }
  });

  it("requires RESEND_API_KEY unless dry-run mode is on", () => {
    expect(() => parseEnv({ ...valid, RESEND_API_KEY: "" })).toThrowError(
      /RESEND_API_KEY/,
    );
    expect(
      parseEnv({ ...valid, RESEND_API_KEY: "", CONTACT_DRY_RUN: "true" })
        .CONTACT_DRY_RUN,
    ).toBe(true);
  });

  it("falls back to VERCEL_URL for NEXT_PUBLIC_SITE_URL outside production", () => {
    const preview = {
      ...valid,
      NEXT_PUBLIC_SITE_URL: "",
      VERCEL_ENV: "preview",
      VERCEL_URL: "csb-abc123.vercel.app",
    };
    expect(parseEnv(preview).NEXT_PUBLIC_SITE_URL).toBe(
      "https://csb-abc123.vercel.app",
    );
    expect(() =>
      parseEnv({ ...preview, VERCEL_ENV: "production" }),
    ).toThrowError(/NEXT_PUBLIC_SITE_URL/);
    expect(
      parseEnv({ ...preview, NEXT_PUBLIC_SITE_URL: "https://clicksansbug.ch" })
        .NEXT_PUBLIC_SITE_URL,
    ).toBe("https://clicksansbug.ch");
  });

  it("defaults CONTACT_DRY_RUN to false and rejects other values", () => {
    expect(parseEnv({ ...valid, CONTACT_DRY_RUN: "" }).CONTACT_DRY_RUN).toBe(
      false,
    );
    expect(() => parseEnv({ ...valid, CONTACT_DRY_RUN: "yes" })).toThrowError(
      /CONTACT_DRY_RUN/,
    );
  });
});

describe("validateEnvAtStartup", () => {
  it("throws on a missing variable", () => {
    expect(() => validateEnvAtStartup({})).toThrowError(
      /Invalid environment variables/,
    );
  });

  it("is skipped for control builds", () => {
    expect(() =>
      validateEnvAtStartup({ SKIP_ENV_VALIDATION: "1" }),
    ).not.toThrow();
  });
});
