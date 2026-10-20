import type { MetadataRoute } from "next";

import { getEnv } from "@/config/env";
import { ROUTES } from "@/config/routes";

// The six public pages, at their French URLs, without lastModified (architecture.md › SEO,
// clarifications.md › Robots et sitemap). Base URL: NEXT_PUBLIC_SITE_URL (https://clicksansbug.ch in production).
const PAGES = [
  ROUTES.home,
  ROUTES.pricing,
  ROUTES.process,
  ROUTES.faq,
  ROUTES.contact,
  ROUTES.legal,
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getEnv().NEXT_PUBLIC_SITE_URL;
  return PAGES.map((path) => ({ url: new URL(path, base).href }));
}
