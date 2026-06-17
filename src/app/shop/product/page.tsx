import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductDetailContent } from "@/components/pages/PagesContent";

export const metadata: Metadata = {
  title: "Product Detail",
};

export default function ProductDetailPage() {
  return (
    <>
      <PageHeader title="Product Detail" />
      <ProductDetailContent />
    </>
  );
}
