import "server-only";

import { Resend } from "resend";

import { getEnv } from "@/config/env";

let client: Resend | undefined;

export function getResendClient(): Resend {
  if (client) return client;
  const { RESEND_API_KEY } = getEnv();
  if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not set");
  client = new Resend(RESEND_API_KEY);
  return client;
}
