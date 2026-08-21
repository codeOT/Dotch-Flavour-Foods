import type { MetadataRoute } from "next";
import { getSiteUrl, getSitemapEntries } from "@/lib/sitemap-data";

function absoluteAsset(baseUrl: string, path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${baseUrl}${encodeURI(path.startsWith("/") ? path : `/${path}`)}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const now = new Date();

  return getSitemapEntries().map((entry) => ({
    url: `${baseUrl}${entry.path}`,
    lastModified: now,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
    images: entry.images?.map((image) => absoluteAsset(baseUrl, image)),
  }));
}
