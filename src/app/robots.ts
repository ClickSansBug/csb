import type { MetadataRoute } from "next";

import { getEnv } from "@/config/env";

// Everything allowed in production, with the sitemap (architecture.md › SEO); every robot
// refused outside production (clarifications.md › Robots et sitemap).
export default function robots(): MetadataRoute.Robots {
  const { NEXT_PUBLIC_SITE_URL, VERCEL_ENV } = getEnv();
  if (VERCEL_ENV !== "production") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  };
}
