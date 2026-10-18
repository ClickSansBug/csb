import { CONTACT_FIELDS, HONEYPOT_FIELD, STARTED_AT_FIELD } from "../constants";
import type { ContactFormValues } from "../types";

export type ContactSubmission = {
  values: ContactFormValues;
  honeypot: string;
  startedAt: string;
};

function readText(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

// Missing or non-text entries become empty strings, left to the schema to reject.
export function readContactFormData(formData: FormData): ContactSubmission {
  const values = Object.fromEntries(
    CONTACT_FIELDS.map((field) => [field, readText(formData, field)]),
  ) as ContactFormValues;
  return {
    values,
    honeypot: readText(formData, HONEYPOT_FIELD),
    startedAt: readText(formData, STARTED_AT_FIELD),
  };
}
