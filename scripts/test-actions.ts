/**
 * Manual test of the Server Actions, outside Next.js.
 *
 * Run: pnpm test:actions
 *
 * Required (read from .env.local when present, otherwise from the shell):
 * - CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL, NEXT_PUBLIC_SITE_URL
 *
 * CONTACT_DRY_RUN is forced to "true": no email is ever sent, both emails are printed instead.
 */
import { existsSync } from "node:fs";

const REQUIRED_VARIABLES = [
  "CONTACT_TO_EMAIL",
  "CONTACT_FROM_EMAIL",
  "NEXT_PUBLIC_SITE_URL",
];

type Check = {
  action: string;
  scenario: string;
  expected: string;
  obtained: string;
};

function contactFormData(overrides: Record<string, string> = {}): FormData {
  const formData = new FormData();
  const values: Record<string, string> = {
    type: "complet",
    company: "Boulangerie Martin",
    name: "Claire Martin",
    activity: "Boulangerie artisanale à Lausanne, ouverte depuis 2010.",
    email: "claire.martin@example.com",
    phone: "+41 79 000 00 00",
    pack: "presence",
    website: "",
    startedAt: String(Date.now() - 10_000),
    ...overrides,
  };
  for (const [name, value] of Object.entries(values)) formData.set(name, value);
  return formData;
}

async function main(): Promise<void> {
  if (existsSync(".env.local")) process.loadEnvFile(".env.local");
  process.env.CONTACT_DRY_RUN = "true";

  const missing = REQUIRED_VARIABLES.filter((name) => !process.env[name]);
  if (missing.length > 0) {
    console.error(
      `Missing variables (set them in .env.local): ${missing.join(", ")}`,
    );
    process.exit(1);
  }

  // Imported after the environment is prepared: the env module reads it on first use.
  const { sendContactMessage } = await import("@/features/contact");

  const checks: Check[] = [];
  const run = async (
    scenario: string,
    expected: string,
    formData: FormData,
  ) => {
    const result = await sendContactMessage(null, formData);
    const obtained = result.success
      ? "success"
      : `${result.error}${result.fieldErrors ? ` ${Object.keys(result.fieldErrors).join(",")}` : ""}`;
    checks.push({ action: "sendContactMessage", scenario, expected, obtained });
  };

  await run("valid request", "success", contactFormData());
  await run(
    "valid request, optional fields empty",
    "success",
    contactFormData({ phone: "", pack: "" }),
  );
  await run(
    "invalid: empty required fields",
    "VALIDATION type,company,name,activity,email",
    contactFormData({
      type: "",
      company: "",
      name: "",
      activity: "",
      email: "",
    }),
  );
  await run(
    "invalid: link in company",
    "VALIDATION company",
    contactFormData({ company: "bellini.ch" }),
  );
  await run(
    "invalid: phone format",
    "VALIDATION phone",
    contactFormData({ phone: "079 abc" }),
  );
  await run(
    "invalid: unknown pack",
    "VALIDATION pack",
    contactFormData({ pack: "gratuit" }),
  );
  await run(
    "spam: honeypot filled (fake success)",
    "success",
    contactFormData({ website: "x" }),
  );
  await run(
    "spam: sent under 3 s (fake success)",
    "success",
    contactFormData({ startedAt: String(Date.now()) }),
  );
  await run(
    "spam: missing timestamp (fake success)",
    "success",
    contactFormData({ startedAt: "" }),
  );

  let failures = 0;
  for (const check of checks) {
    const ok = check.obtained === check.expected;
    if (!ok) failures += 1;
    console.log(
      `${ok ? "OK    " : "ÉCHEC "} ${check.action} | ${check.scenario} | expected: ${check.expected} | obtained: ${check.obtained}`,
    );
  }
  console.log(`\n${checks.length - failures}/${checks.length} OK`);
  process.exit(failures > 0 ? 1 : 0);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
