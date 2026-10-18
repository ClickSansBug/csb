// Stable codes sent by the form; displayed labels live in the next-intl messages.
export const SITE_TYPES = [
  "vitrine",
  "complet",
  "ecommerce",
  "grosprojet",
] as const;

export const PACKS = [
  "indecis",
  "essentiel",
  "presence",
  "performance",
  "sur-mesure",
] as const;

// `name` attributes of the visible fields, in error-focus order.
export const CONTACT_FIELDS = [
  "type",
  "company",
  "name",
  "activity",
  "email",
  "phone",
  "pack",
] as const;

export const CONTACT_FIELD_LIMITS = {
  company: { min: 2, max: 100 },
  name: { min: 2, max: 100 },
  activity: { min: 10, max: 2000 },
  email: { max: 254 },
  phone: { max: 30, minDigits: 8, maxDigits: 15 },
} as const;

// Anti-spam technical fields, invisible to visitors.
export const HONEYPOT_FIELD = "website";
export const STARTED_AT_FIELD = "startedAt";
export const MIN_FILL_DURATION_MS = 3000;

// Reply-to address of the acknowledgement email sent to the visitor.
export const ACKNOWLEDGEMENT_REPLY_TO = "info@clicksansbug.ch";
