import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReadySoupProductDetail } from "@/components/ready-soups/ReadySoupProductDetail";
import { JsonLd } from "@/components/seo/JsonLd";
import { getProductSeo, productImageAlt } from "@/lib/product-seo";
import { getReadySoupBySlug, readySoupProducts } from "@/lib/ready-soups";
import { absoluteTitle, breadcrumbJsonLd, productJsonLd } from "@/lib/seo";

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
  const seo = getProductSeo(product.id);
  const title = seo?.title ?? `${product.name} | Dotch Flavour`;
  const description = seo?.description ?? product.shortDescription;

  return {
    title: absoluteTitle(title),
    description,
    keywords: [product.name, "Ready Soups", "Nigerian soup", "frozen soup UK", ...product.allergens],
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title,
      description,
      url: path,
      images: [{ url: product.image, alt: productImageAlt(product.id, product.name) }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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
