import { CONTACT_FIELD_LIMITS } from "../constants";

// Digits, spaces, parentheses and hyphens; "+" only as the first character.
const PHONE_PATTERN = /^\+?[0-9 ()-]*$/;

export function isValidPhone(value: string): boolean {
  if (!PHONE_PATTERN.test(value)) return false;
  const digitCount = value.replace(/\D/g, "").length;
  const { minDigits, maxDigits } = CONTACT_FIELD_LIMITS.phone;
  return digitCount >= minDigits && digitCount <= maxDigits;
}
