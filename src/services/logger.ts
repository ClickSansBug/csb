import "server-only";

// Logs only the error type and message: never form content, email addresses or other personal data.
export function logError(context: string, error: unknown): void {
  const detail =
    error instanceof Error
      ? `${error.name}: ${error.message}`
      : typeof error === "string"
        ? error
        : `non-Error value (${typeof error})`;
  console.error(`[${context}] ${detail}`);
}
