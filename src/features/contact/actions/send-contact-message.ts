"use server";

import { getValidationTranslator } from "@/lib/i18n/translator";
import { logError } from "@/services/logger";

import { createContactSchema } from "../schemas/contact-schema";
import { sendContactRequest } from "../services/send-contact-request";
import type { ContactResult, ContactState } from "../types";
import { isSpamSubmission } from "../utils/is-spam-submission";
import { readContactFormData } from "../utils/read-contact-form-data";
import { toFieldErrors } from "../utils/to-field-errors";

const SUCCESS: ContactResult = { success: true, data: null };

// Public endpoint (no auth by design): protected by honeypot, minimal fill delay and link refusal.
export async function sendContactMessage(
  _previousState: ContactState,
  formData: FormData,
): Promise<ContactResult> {
  const receivedAt = new Date();
  try {
    const submission = readContactFormData(formData);

    // Fake success: no email is sent and the robot learns nothing.
    if (
      isSpamSubmission(
        submission.honeypot,
        submission.startedAt,
        receivedAt.getTime(),
      )
    ) {
      return SUCCESS;
    }

    const parsed = createContactSchema(getValidationTranslator()).safeParse(
      submission.values,
    );
    if (!parsed.success) {
      return {
        success: false,
        error: "VALIDATION",
        fieldErrors: toFieldErrors(parsed.error),
      };
    }

    const result = await sendContactRequest(parsed.data, receivedAt);
    return result.ok ? SUCCESS : { success: false, error: "SEND_FAILED" };
  } catch (error) {
    logError("sendContactMessage", error);
    return { success: false, error: "SEND_FAILED" };
  }
}
