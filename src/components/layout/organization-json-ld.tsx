import { useTranslations } from "next-intl";

import { getEnv } from "@/config/env";

// ProfessionalService structured data, on the home page only (architecture.md › SEO).
export function OrganizationJsonLd() {
  const t = useTranslations("metadata.organization");
  const email = useTranslations("common")("email");
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: t("name"),
    url: getEnv().NEXT_PUBLIC_SITE_URL,
    email,
    address: {
      "@type": "PostalAddress",
      addressRegion: t("region"),
      addressCountry: "CH",
    },
    areaServed: { "@type": "Country", name: t("areaServed") },
  };

  return (
    <script
      type="application/ld+json"
      // JSON of fixed messages, escaped so that no "<" can close the script element.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replaceAll("<", "\\u003c"),
      }}
    />
  );
}
