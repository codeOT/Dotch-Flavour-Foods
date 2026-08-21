import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReadySoupProductDetail } from "@/components/ready-soups/ReadySoupProductDetail";
import { JsonLd } from "@/components/seo/JsonLd";
import { getReadySoupBySlug, readySoupProducts } from "@/lib/ready-soups";
import { breadcrumbJsonLd, productJsonLd } from "@/lib/seo";

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

  const path = `/ready-to-eat-soups/${product.slug}`;

  return {
    title: `${product.name} | Ready Soups`,
    description: product.shortDescription,
    keywords: [product.name, "Ready Soups", "Nigerian soup", "frozen soup UK", ...product.allergens],
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title: product.name,
      description: product.shortDescription,
      url: path,
      images: [{ url: product.image, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.shortDescription,
      images: [product.image],
    },
  };
}

export default async function ReadySoupProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getReadySoupBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={[
          productJsonLd(product),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Ready Soups", path: "/ready-to-eat-soups" },
            { name: product.name, path: `/ready-to-eat-soups/${product.slug}` },
          ]),
        ]}
      />
      <ReadySoupProductDetail product={product} />
    </>
  );
}
