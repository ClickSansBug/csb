// Assets of design.zip served from public/ (versioned video name, architecture.md › Vidéo d'accueil).
export const HERO_VIDEO = {
  src: "/videos/clicksansbug-hero-v2.mp4",
  poster: "/images/clicksansbug-hero-poster.jpg",
} as const;

// Share image, served by the file convention src/app/opengraph-image.png. Pages that set their own
// openGraph must list it again: Next.js does not inherit it into a redefined openGraph.
export const OPEN_GRAPH_IMAGE = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  type: "image/png",
} as const;
