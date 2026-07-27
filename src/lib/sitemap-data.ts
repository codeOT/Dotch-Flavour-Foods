import { blogPosts } from "@/lib/blog";
import { readySoupProducts } from "@/lib/ready-soups";
import { siteConfig } from "@/lib/site";

export type SitemapEntry = {
  path: string;
  title: string;
  section: string;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
};

export function getSiteUrl() {
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXTAUTH_URL ??
    "http://localhost:3000";

  return fromEnv.replace(/\/$/, "");
}

export function getSitemapEntries(): SitemapEntry[] {
  const staticRoutes: SitemapEntry[] = [
    { path: "/", title: "Home", section: "Main pages", changeFrequency: "weekly", priority: 1 },
    {
      path: "/about-us",
      title: "About Us",
      section: "Main pages",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      path: "/ready-to-eat-soups",
      title: "Ready To Eat Soups",
      section: "Main pages",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      path: "/fresh-menu",
      title: "Fresh Menu",
      section: "Main pages",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      path: "/our-menu",
      title: "Our Menu",
      section: "Main pages",
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      path: "/shop",
      title: "Shop",
      section: "Main pages",
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      path: "/blog",
      title: "Blog",
      section: "Main pages",
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      path: "/contact-us",
      title: "Contact Us",
      section: "Main pages",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      path: "/faq",
      title: "FAQ",
      section: "Main pages",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      path: "/event-registration",
      title: "Event Registration",
      section: "Main pages",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      path: "/privacy-policy",
      title: "Privacy Policy",
      section: "Legal",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      path: "/delivery-terms",
      title: "Delivery Terms",
      section: "Legal",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      path: "/services",
      title: "Services",
      section: "Main pages",
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      path: "/team",
      title: "Team",
      section: "Main pages",
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      path: "/testimonial",
      title: "Testimonials",
      section: "Main pages",
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const readySoupRoutes: SitemapEntry[] = readySoupProducts.map((product) => ({
    path: `/ready-to-eat-soups/${product.slug}`,
    title: product.name,
    section: "Ready soups",
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogRoutes: SitemapEntry[] = blogPosts.map((post) => ({
    path: `/blog/detail?slug=${encodeURIComponent(post.slug)}`,
    title: post.title,
    section: "Blog posts",
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...readySoupRoutes, ...blogRoutes];
}

export function getSitemapDocumentMeta() {
  return {
    siteName: siteConfig.name,
    generatedAt: new Date(),
    baseUrl: getSiteUrl(),
  };
}
