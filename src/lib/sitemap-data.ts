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
      title: "Ready Soups by Dotch Flavour",
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
      path: "/corporate",
      title: "Corporate Catering",
      section: "Main pages",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      path: "/wholesale",
      title: "Wholesale and Stockists",
      section: "Main pages",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      path: "/merchandise",
      title: "Merchandise Coming Soon",
      section: "Main pages",
      changeFrequency: "monthly",
      priority: 0.5,
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
      title: "Delivery Policy",
      section: "Legal",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      path: "/terms",
      title: "Website Terms and Conditions",
      section: "Legal",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      path: "/refund-policy",
      title: "Refund, Returns and Cancellation",
      section: "Legal",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      path: "/catering-booking-policy",
      title: "Catering Booking Policy",
      section: "Legal",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      path: "/allergens",
      title: "Allergens and Food Safety",
      section: "Legal",
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      path: "/cookie-policy",
      title: "Cookie Policy",
      section: "Legal",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      path: "/storage-heating",
      title: "Storage and Heating Guide",
      section: "Legal",
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      path: "/disclaimer",
      title: "Website and Product Disclaimer",
      section: "Legal",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      path: "/accessibility",
      title: "Accessibility Statement",
      section: "Legal",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      path: "/email-newsletter-terms",
      title: "Email and Newsletter Terms",
      section: "Legal",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      path: "/meet-abi",
      title: "Meet Abi",
      section: "Main pages",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      path: "/catering",
      title: "Catering",
      section: "Main pages",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      path: "/request-a-quote",
      title: "Request a Quote",
      section: "Main pages",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      path: "/experience",
      title: "Dotch Flavour Experience",
      section: "Main pages",
      changeFrequency: "monthly",
      priority: 0.7,
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
