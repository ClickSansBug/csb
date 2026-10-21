import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { OPEN_GRAPH_IMAGE } from "@/config/media";
import { type RouteKey, ROUTES } from "@/config/routes";

// Title, description, canonical URL and Open Graph of a public page (architecture.md › SEO),
// read from the `metadata.<page>` messages.
// A page's openGraph replaces the layout's one, hence type, locale and site name repeated here.
export async function getPageMetadata(page: RouteKey): Promise<Metadata> {
  const t = await getTranslations("metadata");
  const title = t(`${page}.title`);
  const description = t(`${page}.description`);
  const path = ROUTES[page];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: t("locale"),
      siteName: t("siteName"),
      title,
      description,
      url: path,
      images: [OPEN_GRAPH_IMAGE],
    },
  };
}
