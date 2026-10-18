import { FORMAT_LOCALE, TIME_ZONE } from "@/lib/i18n/config";

const dateFormatter = new Intl.DateTimeFormat(FORMAT_LOCALE, {
  timeZone: TIME_ZONE,
  day: "numeric",
  month: "long",
  year: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat(FORMAT_LOCALE, {
  timeZone: TIME_ZONE,
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

// "18 octobre 2026" and "14:32", Zurich time.
export function formatReceivedAt(date: Date): { date: string; time: string } {
  return { date: dateFormatter.format(date), time: timeFormatter.format(date) };
}
