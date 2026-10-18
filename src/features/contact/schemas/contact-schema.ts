import { z } from "zod";

import { CONTACT_FIELD_LIMITS, PACKS, SITE_TYPES } from "../constants";
import { containsLink } from "../utils/contains-link";
import { isValidPhone } from "../utils/is-valid-phone";

// Keys of the `validation` next-intl namespace used by this schema.
export type ContactValidationKey =
  | "contact.type.invalid"
  | "contact.company.required"
  | "contact.company.tooShort"
  | "contact.company.tooLong"
  | "contact.company.link"
  | "contact.name.required"
  | "contact.name.tooShort"
  | "contact.name.tooLong"
  | "contact.name.link"
  | "contact.activity.required"
  | "contact.activity.tooShort"
  | "contact.activity.tooLong"
  | "contact.email.required"
  | "contact.email.invalid"
  | "contact.email.tooLong"
  | "contact.phone.invalid"
  | "contact.phone.tooLong"
  | "contact.pack.invalid";

// Accepts `useTranslations("validation")` in the browser and `getValidationTranslator()` on the server.
export type ContactValidationTranslator = (key: ContactValidationKey) => string;

// Every rule stops at its first failure, so each field reports a single message.
function nameLikeField(
  t: ContactValidationTranslator,
  field: "company" | "name",
  limits: { min: number; max: number },
) {
  return z
    .string()
    .trim()
    .min(1, { error: t(`contact.${field}.required`), abort: true })
    .min(limits.min, { error: t(`contact.${field}.tooShort`), abort: true })
    .max(limits.max, { error: t(`contact.${field}.tooLong`), abort: true })
    .refine((value) => !containsLink(value), {
      error: t(`contact.${field}.link`),
    });
}

// Single schema shared by the form (browser) and the Server Action (server).
export function createContactSchema(t: ContactValidationTranslator) {
  const limits = CONTACT_FIELD_LIMITS;
  return z.object({
    type: z.enum(SITE_TYPES, { error: t("contact.type.invalid") }),
    company: nameLikeField(t, "company", limits.company),
    name: nameLikeField(t, "name", limits.name),
    activity: z
      .string()
      .trim()
      .min(1, { error: t("contact.activity.required"), abort: true })
      .min(limits.activity.min, {
        error: t("contact.activity.tooShort"),
        abort: true,
      })
      .max(limits.activity.max, {
        error: t("contact.activity.tooLong"),
        abort: true,
      }),
    email: z
      .string()
      .trim()
      .min(1, { error: t("contact.email.required"), abort: true })
      .max(limits.email.max, { error: t("contact.email.tooLong"), abort: true })
      .pipe(z.email({ error: t("contact.email.invalid") })),
    phone: z
      .string()
      .trim()
      .max(limits.phone.max, { error: t("contact.phone.tooLong"), abort: true })
      .refine((value) => value === "" || isValidPhone(value), {
        error: t("contact.phone.invalid"),
      })
      .transform((value) => value || undefined),
    pack: z
      .enum(["", ...PACKS], { error: t("contact.pack.invalid") })
      .transform((value) => value || undefined),
  });
}
