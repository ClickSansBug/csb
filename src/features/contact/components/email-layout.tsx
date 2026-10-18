import type { CSSProperties, ReactNode } from "react";
import { Body, Container, Head, Html, Text } from "react-email";

import { DEFAULT_LOCALE } from "@/lib/i18n/config";

// Email clients need inline literal colors: the site's theme variables do not apply here.
const colors = {
  background: "#f7f6f3",
  card: "#fffefb",
  ink: "#14140f",
  border: "rgba(20,20,15,0.1)",
  muted: "rgba(20,20,15,0.55)",
  brand: "#1E7C50",
};

const monospace = "ui-monospace, Menlo, Consolas, monospace";

export const emailStyles = {
  text: {
    margin: "0 0 16px",
    color: colors.ink,
    fontSize: "15px",
    lineHeight: "1.6",
  },
  label: {
    margin: "0",
    color: colors.muted,
    fontFamily: monospace,
    fontSize: "11px",
    lineHeight: "1.6",
    textTransform: "uppercase",
  },
} satisfies Record<string, CSSProperties>;

const bodyStyle: CSSProperties = {
  margin: "0",
  padding: "32px 16px",
  backgroundColor: colors.background,
  fontFamily: "Helvetica, Arial, sans-serif",
};

const cardStyle: CSSProperties = {
  maxWidth: "560px",
  margin: "0 auto",
  padding: "32px",
  backgroundColor: colors.card,
  border: `1px solid ${colors.border}`,
  borderRadius: "14px",
};

const logoStyle: CSSProperties = {
  margin: "0 0 24px",
  color: colors.ink,
  fontFamily: monospace,
  fontSize: "13px",
  letterSpacing: "0.14em",
};

export function EmailLayout({ children }: { children: ReactNode }) {
  return (
    <Html lang={DEFAULT_LOCALE}>
      <Head />
      <Body style={bodyStyle}>
        <Container style={cardStyle}>
          <Text style={logoStyle}>
            CLICK<span style={{ color: colors.brand }}>SANS</span>BUG
          </Text>
          {children}
        </Container>
      </Body>
    </Html>
  );
}
