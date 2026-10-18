// Translated email content: rendered once as HTML and once as plain text, so both always match.
export type NotificationContent = {
  subject: string;
  title: string;
  receivedAt: string;
  rows: { label: string; value: string; line: string }[];
  activity: { label: string; heading: string; value: string };
  replyHint: string;
};

export type AcknowledgementContent = {
  subject: string;
  paragraphs: string[];
};
