import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type MetadataPage =
  "home" | "pricing" | "process" | "faq" | "contact" | "legal";

// Title, description, canonical URL and Open Graph of a page (architecture.md › SEO). The
// Open Graph image comes from src/app/opengraph-image.png.
export async function createPageMetadata(
  page: MetadataPage,
  path: string,
): Promise<Metadata> {
  const t = await getTranslations("metadata");
  const title = t(`${page}.title`);
  const description = t(`${page}.description`);

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "fr_CH",
      siteName: t("siteName"),
      title,
      description,
      url: path,
    },
    twitter: { card: "summary_large_image" },
  };
}
