import { z } from "zod";

// Empty values (e.g. `RESEND_API_KEY=` copied from .env.example) count as missing.
const emptyToUndefined = (value: unknown) => (value === "" ? undefined : value);

const envSchema = z
  .object({
    RESEND_API_KEY: z.preprocess(emptyToUndefined, z.string().optional()),
    CONTACT_TO_EMAIL: z.preprocess(emptyToUndefined, z.email()),
    CONTACT_FROM_EMAIL: z.preprocess(emptyToUndefined, z.email()),
    CONTACT_DRY_RUN: z.preprocess(
      emptyToUndefined,
      z
        .enum(["true", "false"])
        .default("false")
        .transform((value) => value === "true"),
    ),
    NEXT_PUBLIC_SITE_URL: z.preprocess(emptyToUndefined, z.url()),
    // Set by Vercel on deployments; absent locally.
    VERCEL_ENV: z.preprocess(
      emptyToUndefined,
      z.enum(["development", "preview", "production"]).optional(),
    ),
  })
  .refine((env) => env.CONTACT_DRY_RUN || Boolean(env.RESEND_API_KEY), {
    path: ["RESEND_API_KEY"],
    error: "Required when CONTACT_DRY_RUN is not true",
    // Also runs when other variables are invalid, so every problem is reported at once.
    when: (payload) =>
      payload.issues.every(
        (issue) =>
          issue.path?.[0] !== "CONTACT_DRY_RUN" &&
          issue.path?.[0] !== "RESEND_API_KEY",
      ),
  });

type Env = z.output<typeof envSchema>;

type EnvSource = Record<string, string | undefined>;

// A preview's URL is only known once Vercel deploys it: fall back to VERCEL_URL (set by Vercel, no protocol).
// Production always requires an explicit NEXT_PUBLIC_SITE_URL.
function withSiteUrlFallback(source: EnvSource): EnvSource {
  if (
    source.NEXT_PUBLIC_SITE_URL ||
    source.VERCEL_ENV === "production" ||
    !source.VERCEL_URL
  ) {
    return source;
  }
  return { ...source, NEXT_PUBLIC_SITE_URL: `https://${source.VERCEL_URL}` };
}

// Throws a single error listing every missing or invalid variable.
export function parseEnv(source: EnvSource): Env {
  const result = envSchema.safeParse(withSiteUrlFallback(source));
  if (!result.success) {
    throw new Error(
      `Invalid environment variables:\n${z.prettifyError(result.error)}`,
    );
  }
  return result.data;
}

// Build-only escape hatch for control builds made without secrets. Never set in production.
function isValidationSkipped(source: EnvSource): boolean {
  return source.SKIP_ENV_VALIDATION === "1";
}

// Called by next.config.ts so that `next build` fails when a variable is missing.
export function validateEnvAtStartup(source: EnvSource = process.env): void {
  if (!isValidationSkipped(source)) parseEnv(source);
}

let cachedEnv: Env | undefined;

// Server-side only: secrets are not exposed to the browser bundle.
export function getEnv(): Env {
  if (cachedEnv) return cachedEnv;
  if (isValidationSkipped(process.env)) {
    // Unvalidated values, only reached during a control build.
    const vercelEnv = process.env.VERCEL_ENV;
    return {
      RESEND_API_KEY: process.env.RESEND_API_KEY,
      CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL ?? "",
      CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL ?? "",
      CONTACT_DRY_RUN: process.env.CONTACT_DRY_RUN === "true",
      NEXT_PUBLIC_SITE_URL:
        withSiteUrlFallback(process.env).NEXT_PUBLIC_SITE_URL ?? "",
      VERCEL_ENV:
        vercelEnv === "development" ||
        vercelEnv === "preview" ||
        vercelEnv === "production"
          ? vercelEnv
          : undefined,
    };
  }
  cachedEnv = parseEnv(process.env);
  return cachedEnv;
}
