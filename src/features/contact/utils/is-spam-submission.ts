import { MIN_FILL_DURATION_MS } from "../constants";

const TIMESTAMP_PATTERN = /^\d+$/;

// Filled honeypot, missing or non-numeric timestamp, or a form sent under 3 s: treated as a robot.
export function isSpamSubmission(
  honeypot: string,
  startedAt: string,
  receivedAtMs: number,
): boolean {
  if (honeypot !== "") return true;
  if (!TIMESTAMP_PATTERN.test(startedAt)) return true;
  return receivedAtMs - Number(startedAt) < MIN_FILL_DURATION_MS;
}
