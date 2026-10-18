import type { z } from "zod";

import type { ActionResult } from "@/types/action-result";

import type { CONTACT_FIELDS, PACKS, SITE_TYPES } from "../constants";
import type { createContactSchema } from "../schemas/contact-schema";

export type SiteType = (typeof SITE_TYPES)[number];
export type Pack = (typeof PACKS)[number];
export type ContactField = (typeof CONTACT_FIELDS)[number];

// Raw form values, as typed by the visitor (all strings, "" when empty).
export type ContactFormValues = Record<ContactField, string>;

// Validated and trimmed values; empty optional fields become `undefined`.
export type ContactInput = z.output<ReturnType<typeof createContactSchema>>;

// VALIDATION: see `fieldErrors`. SEND_FAILED: the notification email could not be sent,
// or any unexpected server error.
export type ContactErrorCode = "VALIDATION" | "SEND_FAILED";

export type ContactResult = ActionResult<null, ContactErrorCode>;

// `useActionState` state: `null` before the first submission.
export type ContactState = ContactResult | null;
