import type { Metadata } from "next";
import { ProductDetailContent } from "@/components/pages/PagesContent";

export const metadata: Metadata = {
  title: "Product Detail",
};

export default function ProductDetailPage() {
  return <ProductDetailContent />;
}
