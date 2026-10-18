import { createTranslator } from "next-intl";

import { messages } from "@/config/content/fr";

import { DEFAULT_LOCALE, TIME_ZONE } from "./config";

// Request-independent translators: usable in Server Actions, services and CLI scripts alike.
const translatorBase = {
  locale: DEFAULT_LOCALE,
  timeZone: TIME_ZONE,
  messages,
} as const;

export function getValidationTranslator() {
  return createTranslator({ ...translatorBase, namespace: "validation" });
}

export function getEmailsTranslator() {
  return createTranslator({ ...translatorBase, namespace: "emails" });
}
