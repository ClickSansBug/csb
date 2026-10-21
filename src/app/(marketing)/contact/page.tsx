import type { Metadata } from "next";

import { ContactSection } from "@/components/layout/contact-section";
import { PageShell } from "@/components/layout/page-shell";
import { getPageMetadata } from "@/utils/page-metadata";

export function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("contact");
}

export default function ContactPage() {
  return (
    <PageShell contact>
      <ContactSection />
    </PageShell>
  );
}
