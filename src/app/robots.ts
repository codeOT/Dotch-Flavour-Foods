import type { MetadataRoute } from "next";

function getSiteUrl() {
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXTAUTH_URL ??
    "http://localhost:3000";

  return fromEnv.replace(/\/$/, "");
}

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/",
          "/api/",
          "/orders",
          "/sign-in",
          "/sign-up",
          "/shop/cart",
          "/shop/checkout",
          "/shop/checkout/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
