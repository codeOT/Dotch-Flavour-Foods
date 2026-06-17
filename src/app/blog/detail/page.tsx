import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { BlogDetailContent } from "@/components/pages/BlogContent";

export const metadata: Metadata = {
  title: "Blog Detail",
};

export default function BlogDetailPage() {
  return (
    <>
      <PageHeader title="Blog Detail" />
      <BlogDetailContent />
    </>
  );
}
