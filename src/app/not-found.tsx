import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { NotFoundView } from "@/components/layout/not-found-view";

// Next.js already marks the not-found page "noindex" (architecture.md › Sitemap / robots).
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata.notFound");
  return { title: t("title") };
}

export default function NotFound() {
  return <NotFoundView />;
}
