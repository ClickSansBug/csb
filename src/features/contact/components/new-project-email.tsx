import { Section, Text } from "react-email";

import type { NotificationContent } from "../types/emails";
import { EmailLayout, emailStyles } from "./email-layout";

const preservedLinesStyle = {
  ...emailStyles.text,
  whiteSpace: "pre-line" as const,
};

export function NewProjectEmail({ content }: { content: NotificationContent }) {
  return (
    <EmailLayout>
      <Text style={emailStyles.text}>
        {content.title}
        <br />
        {content.receivedAt}
      </Text>
      {content.rows.map((row) => (
        <Section key={row.label}>
          <Text style={emailStyles.label}>{row.label}</Text>
          <Text style={emailStyles.text}>{row.value}</Text>
        </Section>
      ))}
      <Text style={emailStyles.label}>{content.activity.label}</Text>
      <Text style={preservedLinesStyle}>{content.activity.value}</Text>
      <Text style={emailStyles.text}>{content.replyHint}</Text>
    </EmailLayout>
  );
}
