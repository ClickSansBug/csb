import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
          },
          { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
        ],
      },
      {
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      { source: "/tarifs", destination: "/pricing" },
      { source: "/processus", destination: "/process" },
      { source: "/mentions-legales", destination: "/legal-notice" },
    ];
  },
  async redirects() {
    return [
      { source: "/pricing", destination: "/tarifs", permanent: true },
      { source: "/process", destination: "/processus", permanent: true },
      {
        source: "/legal-notice",
        destination: "/mentions-legales",
        permanent: true,
      },
      { source: "/index.html", destination: "/", statusCode: 301 },
      { source: "/tarifs.html", destination: "/tarifs", statusCode: 301 },
      { source: "/processus.html", destination: "/processus", statusCode: 301 },
      { source: "/faq.html", destination: "/faq", statusCode: 301 },
      { source: "/contact.html", destination: "/contact", statusCode: 301 },
      {
        source: "/mentions-legales.html",
        destination: "/mentions-legales",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
