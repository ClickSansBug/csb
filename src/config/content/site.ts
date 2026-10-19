// Shared non-text content: public URLs (architecture.md › URLs), contact links and media.
// Every displayed text lives in the next-intl messages (src/config/content/fr/).
import type { Pack } from "@/features/contact";

export const routes = {
  home: "/",
  pricing: "/tarifs",
  process: "/processus",
  faq: "/faq",
  contact: "/contact",
  legal: "/mentions-legales",
} as const;

export type RouteKey = keyof typeof routes;

// Pages listed in the sitemap, in the order of architecture.md › SEO.
export const indexedRoutes: readonly RouteKey[] = [
  "home",
  "pricing",
  "process",
  "faq",
  "contact",
  "legal",
];

// Pages reachable from the navigation (every page but the home, reached through the logo).
export type NavKey = Exclude<RouteKey, "home">;

// Header navigation and mobile menu (design: header of every page).
export const headerLinks: readonly NavKey[] = ["pricing", "process", "faq"];
export const menuLinks: readonly NavKey[] = [
  "pricing",
  "process",
  "faq",
  "contact",
  "legal",
];
export const footerLinks: readonly NavKey[] = [
  "pricing",
  "process",
  "faq",
  "contact",
];

// Offer preselection of the contact form (architecture.md › Présélection par URL).
export function contactOfferHref(
  offer: Extract<Pack, "essentiel" | "presence" | "performance">,
) {
  return `${routes.contact}?offre=${offer}`;
}

export const contactLinks = {
  email: "mailto:info@clicksansbug.ch",
  phone: "tel:+41795349298",
} as const;

export const media = {
  heroVideo: "/videos/clicksansbug-hero-v2.mp4",
  heroPoster: "/images/clicksansbug-hero-poster.jpg",
} as const;
