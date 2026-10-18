// A domain name: letters, digits or hyphens, a dot, at least 2 letters, then end, space or slash.
const DOMAIN_PATTERN = /[\p{L}\p{N}-]+\.\p{L}{2,}(?=$|\s|\/)/u;

export function containsLink(value: string): boolean {
  const lower = value.toLowerCase();
  return (
    lower.includes("http") ||
    lower.includes("www.") ||
    DOMAIN_PATTERN.test(value)
  );
}
