import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogDetailContent } from "@/components/pages/BlogContent";
import { blogPosts, getBlogPostBySlug } from "@/lib/blog";

type BlogDetailPageProps = {
  searchParams: Promise<{ slug?: string }>;
};

export async function generateMetadata({ searchParams }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await searchParams;
  const post = slug ? getBlogPostBySlug(slug) : blogPosts[0];

  return {
    title: post?.title ?? "Blog",
    description: post?.excerpt,
  };
}

export default async function BlogDetailPage({ searchParams }: BlogDetailPageProps) {
  const { slug } = await searchParams;
  const post = slug ? getBlogPostBySlug(slug) : blogPosts[0];

  if (!post) {
    notFound();
  }

  return <BlogDetailContent post={post} />;
}
