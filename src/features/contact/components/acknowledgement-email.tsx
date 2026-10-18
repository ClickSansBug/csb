import { Text } from "react-email";

import type { AcknowledgementContent } from "../types/emails";
import { EmailLayout, emailStyles } from "./email-layout";

export function AcknowledgementEmail({
  content,
}: {
  content: AcknowledgementContent;
}) {
  return (
    <EmailLayout>
      {content.paragraphs.map((paragraph) => (
        <Text key={paragraph} style={emailStyles.text}>
          {paragraph}
        </Text>
      ))}
    </EmailLayout>
  );
}
