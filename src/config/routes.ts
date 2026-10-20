// Public URLs of the pages (French paths, rewritten to the English route folders by next.config.ts).
export const ROUTES = {
  home: "/",
  pricing: "/tarifs",
  process: "/processus",
  faq: "/faq",
  contact: "/contact",
  legal: "/mentions-legales",
} as const;

export type RouteKey = keyof typeof ROUTES;

// Offer codes of the `?offre=` pre-selection on the contact form (architecture.md › Formulaires).
export const OFFER_QUERY_PARAM = "offre";

export function contactWithOffer(
  offer: "essentiel" | "presence" | "performance",
): string {
  return `${ROUTES.contact}?${OFFER_QUERY_PARAM}=${offer}`;
}
