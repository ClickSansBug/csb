import "server-only";

import { render } from "react-email";

import { getEmailsTranslator } from "@/lib/i18n/translator";
import type { EmailMessage } from "@/services/mailer";

import { AcknowledgementEmail } from "../components/acknowledgement-email";
import { NewProjectEmail } from "../components/new-project-email";
import type { ContactInput, Pack } from "../types";
import type {
  AcknowledgementContent,
  NotificationContent,
} from "../types/emails";
import { formatReceivedAt } from "../utils/format-received-at";

// Message keys are camelCase; the "sur-mesure" code maps to "surMesure".
const PACK_MESSAGE_KEYS = {
  indecis: "indecis",
  essentiel: "essentiel",
  presence: "presence",
  performance: "performance",
  "sur-mesure": "surMesure",
} as const satisfies Record<Pack, string>;

// Keeps a visitor value on a single line (email subject header).
function toSingleLine(value: string): string {
  return value.replace(/\s+/g, " ");
}

export function buildNotificationContent(
  input: ContactInput,
  receivedAt: Date,
): NotificationContent {
  const t = getEmailsTranslator();
  const notSpecified = t("notification.notSpecified");
  const fields = [
    {
      label: t("notification.labels.type"),
      value: t(`notification.siteTypes.${input.type}`),
    },
    { label: t("notification.labels.company"), value: input.company },
    { label: t("notification.labels.name"), value: input.name },
    { label: t("notification.labels.email"), value: input.email },
    {
      label: t("notification.labels.phone"),
      value: input.phone ?? notSpecified,
    },
    {
      label: t("notification.labels.pack"),
      value: input.pack
        ? t(`notification.packs.${PACK_MESSAGE_KEYS[input.pack]}`)
        : notSpecified,
    },
  ];
  const activityLabel = t("notification.labels.activity");

  return {
    subject: t("notification.subject", {
      company: toSingleLine(input.company),
    }),
    title: t("notification.title"),
    receivedAt: t("notification.receivedAt", formatReceivedAt(receivedAt)),
    rows: fields.map((field) => ({
      ...field,
      line: t("notification.row", field),
    })),
    activity: {
      label: activityLabel,
      heading: t("notification.activityHeading", { label: activityLabel }),
      value: input.activity,
    },
    replyHint: t("notification.replyHint", {
      name: input.name,
      email: input.email,
    }),
  };
}

export function buildNotificationText(content: NotificationContent): string {
  return [
    content.title,
    content.receivedAt,
    "",
    ...content.rows.map((row) => row.line),
    "",
    content.activity.heading,
    content.activity.value,
    "",
    content.replyHint,
  ].join("\n");
}

export function buildAcknowledgementContent(
  input: ContactInput,
): AcknowledgementContent {
  const t = getEmailsTranslator();
  return {
    subject: t("acknowledgement.subject"),
    paragraphs: [
      t("acknowledgement.greeting", { name: input.name }),
      t("acknowledgement.received"),
      t("acknowledgement.followUp"),
      t("acknowledgement.closing"),
    ],
  };
}

export function buildAcknowledgementText(
  content: AcknowledgementContent,
): string {
  return content.paragraphs.join("\n\n");
}

// Internal notification to the agency inbox; replying writes to the visitor.
export async function createNotificationEmail(
  input: ContactInput,
  receivedAt: Date,
  to: string,
): Promise<EmailMessage> {
  const content = buildNotificationContent(input, receivedAt);
  return {
    to,
    replyTo: input.email,
    subject: content.subject,
    html: await render(<NewProjectEmail content={content} />),
    text: buildNotificationText(content),
  };
}

// Acknowledgement to the visitor: a thank-you without any copy of the request.
export async function createAcknowledgementEmail(
  input: ContactInput,
  replyTo: string,
): Promise<EmailMessage> {
  const content = buildAcknowledgementContent(input);
  return {
    to: input.email,
    replyTo,
    subject: content.subject,
    html: await render(<AcknowledgementEmail content={content} />),
    text: buildAcknowledgementText(content),
  };
}
