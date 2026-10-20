import "./globals.css";

import type { Metadata, Viewport } from "next";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import { getEnv } from "@/config/env";
import { fontVariables } from "@/styles/fonts";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");
  return {
    metadataBase: new URL(getEnv().NEXT_PUBLIC_SITE_URL),
    openGraph: {
      type: "website",
      locale: t("locale"),
      siteName: t("siteName"),
    },
    twitter: { card: "summary_large_image" },
  };
}

export const viewport: Viewport = {
  colorScheme: "light dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
