import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReadySoupProductDetail } from "@/components/ready-soups/ReadySoupProductDetail";
import { getReadySoupBySlug, readySoupProducts } from "@/lib/ready-soups";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return readySoupProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getReadySoupBySlug(slug);

  if (!product) {
    return { title: "Product not found" };
  }

  return {
    title: `${product.name} | Ready Soups`,
    description: product.shortDescription,
  };
}

export default async function ReadySoupProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getReadySoupBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ReadySoupProductDetail product={product} />;
}
