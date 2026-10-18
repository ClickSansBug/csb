import { z } from "zod";

// Zod error → `{ field: [messages] }`, the `fieldErrors` shape of ActionResult.
export function toFieldErrors(error: z.ZodError): Record<string, string[]> {
  const fieldErrors: Record<string, string[]> = {};
  for (const [field, messages] of Object.entries(
    z.flattenError(error).fieldErrors,
  )) {
    if (Array.isArray(messages) && messages.length > 0)
      fieldErrors[field] = messages;
  }
  return fieldErrors;
}
