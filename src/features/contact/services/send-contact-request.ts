import "server-only";

import { getEnv } from "@/config/env";
import { logError } from "@/services/logger";
import { sendEmail } from "@/services/mailer";

import { ACKNOWLEDGEMENT_REPLY_TO } from "../constants";
import type { ContactInput } from "../types";
import {
  createAcknowledgementEmail,
  createNotificationEmail,
} from "./contact-emails";

type SendContactRequestResult = { ok: true } | { ok: false };

// Notification first; the acknowledgement only once the request has reached the inbox.
// A failed acknowledgement is logged but still counts as a success for the visitor.
export async function sendContactRequest(
  input: ContactInput,
  receivedAt: Date,
): Promise<SendContactRequestResult> {
  const notification = await createNotificationEmail(
    input,
    receivedAt,
    getEnv().CONTACT_TO_EMAIL,
  );
  const notificationResult = await sendEmail(notification);
  if (!notificationResult.ok) {
    logError("contact.notification", notificationResult.reason);
    return { ok: false };
  }

  const acknowledgement = await createAcknowledgementEmail(
    input,
    ACKNOWLEDGEMENT_REPLY_TO,
  );
  const acknowledgementResult = await sendEmail(acknowledgement);
  if (!acknowledgementResult.ok) {
    logError("contact.acknowledgement", acknowledgementResult.reason);
  }
  return { ok: true };
}
