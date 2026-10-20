import type { Metadata } from "next";

import { OPEN_GRAPH_IMAGE } from "@/config/media";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  siteName: string;
  locale: string;
};

// Title, description, canonical URL and Open Graph of a public page (architecture.md › SEO).
// A page's openGraph replaces the layout's one, hence type, locale and site name repeated here.
export function pageMetadata({
  title,
  description,
  path,
  siteName,
  locale,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale,
      siteName,
      title,
      description,
      url: path,
      images: [OPEN_GRAPH_IMAGE],
    },
  };
}
