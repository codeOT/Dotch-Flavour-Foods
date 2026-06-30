"use client";

import { useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { ProductDetailModal } from "@/components/home/ProductDetailModal";
import { CatalogProductCard } from "@/components/products/CatalogProductCard";
import {
  catalogProducts,
  type Product,
} from "@/lib/products";
import { Button } from "@/components/ui/Button";

export function ProductCatalogSection() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const soups = catalogProducts
    .filter((product) => product.category === "soups-and-stews")
    .slice(0, 5);

  return (
    <>
      <section id="product-catalog" className="scroll-mt-24 overflow-hidden bg-white pb-16 pt-8 sm:pb-20 sm:pt-12">
        <div className="container-fluid min-w-0">
          <Reveal className="mb-10 text-center sm:mb-12">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-secondary sm:text-sm">
              Our Soups
            </p>
            <h2 className="mb-2 text-3xl font-bold sm:text-4xl">
              Ready to Nourish,
              <br />
              Made to Satisfy
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-title/70 sm:text-base">
              A rich, savoury experience in every bowl. Choose your favourite.
            </p>
          </Reveal>

          <StaggerContainer className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:flex lg:flex-wrap lg:justify-center">
            {soups.map((product) => (
              <StaggerItem key={product.id} className="w-full lg:max-w-[260px]">
                <CatalogProductCard
                  product={product}
                  onSelect={setSelectedProduct}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <Reveal className="mt-10 flex justify-center">
            <Button href="/ready-to-eat-soups">Shop More Soups</Button>
          </Reveal>

          <p className="mt-4 text-center text-sm text-title/60">
            Prefer stews and sauces?{" "}
            <Link href="/our-menu" className="font-semibold text-primary hover:underline">
              Explore the full menu
            </Link>
            .
          </p>
        </div>
      </section>

      <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  );
}
