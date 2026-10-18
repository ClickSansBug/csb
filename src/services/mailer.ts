import "server-only";

import { EMAIL_SENDER_NAME } from "@/config/email";
import { getEnv } from "@/config/env";
import { getResendClient } from "@/lib/resend";

export type EmailMessage = {
  to: string;
  replyTo: string;
  subject: string;
  html: string;
  text: string;
};

// `reason` holds the provider error code and status only, safe to log.
export type SendEmailResult = { ok: true } | { ok: false; reason: string };

export async function sendEmail(
  message: EmailMessage,
): Promise<SendEmailResult> {
  const env = getEnv();
  const from = `${EMAIL_SENDER_NAME} <${env.CONTACT_FROM_EMAIL}>`;

  if (env.CONTACT_DRY_RUN) {
    // Dry-run mode (local, e2e, CLI script only): the email is logged instead of sent.
    console.warn(
      [
        "[mailer] CONTACT_DRY_RUN=true, email not sent",
        `From: ${from}`,
        `To: ${message.to}`,
        `Reply-To: ${message.replyTo}`,
        `Subject: ${message.subject}`,
        "",
        message.text,
      ].join("\n"),
    );
    return { ok: true };
  }

  const { error } = await getResendClient().emails.send({
    from,
    to: message.to,
    replyTo: message.replyTo,
    subject: message.subject,
    html: message.html,
    text: message.text,
  });

  if (error) {
    return {
      ok: false,
      reason: `${error.name} (status ${error.statusCode ?? "unknown"})`,
    };
  }
  return { ok: true };
}
