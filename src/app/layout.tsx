import "./globals.css";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import { getEnv } from "@/config/env";
import { fontVariables } from "@/styles/fonts";

export function generateMetadata(): Metadata {
  return { metadataBase: new URL(getEnv().NEXT_PUBLIC_SITE_URL) };
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={fontVariables}>
      <body className="bg-paper font-sans leading-normal text-ink antialiased selection:bg-g86">
        {children}
      </body>
    </html>
  );
}
