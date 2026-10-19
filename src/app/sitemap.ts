import type { MetadataRoute } from "next";

import { indexedRoutes, routes } from "@/config/content/site";
import { getEnv } from "@/config/env";

// The six public pages, on their clean URLs (architecture.md › SEO; no lastModified,
// clarifications.md › Robots et sitemap).
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getEnv().NEXT_PUBLIC_SITE_URL;
  return indexedRoutes.map((key) => ({ url: `${baseUrl}${routes[key]}` }));
}
