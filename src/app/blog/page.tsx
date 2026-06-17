import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { BlogGrid } from "@/components/pages/BlogContent";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader title="Blog" description="News, recipes, and stories from our kitchen." />
      <BlogGrid />
    </>
  );
}
