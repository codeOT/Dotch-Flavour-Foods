import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FreshMenuProductContent } from "@/components/pages/FreshMenuProductContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { getMenuItemBySlug, getMenuItemPath, menuItems } from "@/lib/navigation";
import { getProductSeo, productImageAlt } from "@/lib/product-seo";
import { absoluteTitle, breadcrumbJsonLd } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return menuItems.map((item) => ({ slug: item.id.toLowerCase() }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getMenuItemBySlug(slug);

  if (!item) {
    return { title: "Product not found" };
  }

  const path = getMenuItemPath(item);
  const seo = getProductSeo(item.id);
  const title = seo?.title ?? `${item.name} | Dotch Flavour`;
  const description = seo?.description ?? item.description;

  return {
    title: absoluteTitle(title),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title,
      description,
      url: path,
      images: [{ url: item.image, alt: productImageAlt(item.id, item.name) }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [item.image],
    },
  };
}

export default async function FreshMenuProductPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getMenuItemBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Fresh Menu", path: "/fresh-menu" },
          { name: item.name, path: getMenuItemPath(item) },
        ])}
      />
      <FreshMenuProductContent item={item} />
    </>
  );
}
