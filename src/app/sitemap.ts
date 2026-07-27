import type { MetadataRoute } from "next";
import { getSiteUrl, getSitemapEntries } from "@/lib/sitemap-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const now = new Date();

  return getSitemapEntries().map((entry) => ({
    url: `${baseUrl}${entry.path}`,
    lastModified: now,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
