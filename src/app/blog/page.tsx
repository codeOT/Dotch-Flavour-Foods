import type { Metadata } from "next";
import { BlogGrid } from "@/components/pages/BlogContent";

export const metadata: Metadata = {
  title: "Blog",
  description: "Stories, recipes, and kitchen wisdom from Dotch Flavour Foods.",
};

export default function BlogPage() {
  return <BlogGrid />;
}
