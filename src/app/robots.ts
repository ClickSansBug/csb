import type { MetadataRoute } from "next";

import { getEnv } from "@/config/env";

// Everything is allowed in production; previews and local builds are closed to all robots
// (clarifications.md › Robots et sitemap).
export default function robots(): MetadataRoute.Robots {
  const env = getEnv();
  if (env.VERCEL_ENV !== "production") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", env.NEXT_PUBLIC_SITE_URL).href,
  };
}
