"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CartQuantityControls } from "@/components/cart/CartQuantityControls";
import { LitreSizeSelector } from "@/components/cart/LitreSizeSelector";
import { productToCartItem } from "@/context/CartContext";
import type { Product } from "@/lib/products";
import { formatProductPrice } from "@/lib/products";
import { formatLitrePrice, getServingForLitres, type LitreSize } from "@/lib/litre-sizes";

type CatalogProductCardProps = {
  product: Product;
  onSelect: (product: Product) => void;
};

export function CatalogProductCard({ product, onSelect }: CatalogProductCardProps) {
  const isOneLitre = product.category === "soups-and-stews";
  const [litres, setLitres] = useState<LitreSize>(2);
  const cartItem = isOneLitre
    ? productToCartItem(product, 1)
    : productToCartItem(product, litres);
  const priceLabel = isOneLitre
    ? formatProductPrice(product)
    : formatLitrePrice(product.price, litres);

  return (
    <motion.div
      className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-surface bg-white text-left shadow-sm transition hover:border-primary/30 hover:shadow-lg"
      whileHover={{ y: -6 }}
    >
      <button
        type="button"
        onClick={() => onSelect(product)}
        className="flex min-h-0 w-full flex-1 flex-col text-left"
      >
        <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col p-5 pb-3">
          <h3 className="mb-2 font-semibold text-title group-hover:text-primary">{product.name}</h3>
          <p className="mb-2 line-clamp-3 flex-1 text-sm text-title/70">{product.shortDescription}</p>
          <span className="mt-auto text-xs font-semibold uppercase tracking-wide text-secondary">
            View ingredients & allergens →
          </span>
        </div>
      </button>
      <div className="mt-auto shrink-0 border-t border-surface px-5 py-4">
        <div className="mb-3">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-title/50">
            {isOneLitre ? "Size" : "Choose size"}
          </p>
          {isOneLitre ? (
            <>
              <p className="text-sm font-semibold text-title">1 Litre</p>
              <p className="mt-1 text-xs text-title/60">Serves 3–4</p>
            </>
          ) : (
            <>
              <LitreSizeSelector value={litres} onChange={setLitres} />
              <p className="mt-2 text-xs text-title/60">{getServingForLitres(litres)}</p>
            </>
          )}
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-lg font-bold text-primary">{priceLabel}</span>
          <CartQuantityControls item={cartItem} variant="compact" />
        </div>
      </div>
    </motion.div>
  );
}
