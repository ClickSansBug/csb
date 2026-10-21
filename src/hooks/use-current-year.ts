import { useFormatter } from "next-intl";

// Year computed at build time, Europe/Zurich time zone (clarifications.md › Pied de page : année).
export function useCurrentYear(): string {
  const format = useFormatter();
  return format.dateTime(new Date(), { year: "numeric" });
}
