"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CartQuantityControls } from "@/components/cart/CartQuantityControls";
import { LiterSizeSelector } from "@/components/cart/LiterSizeSelector";
import { productToCartItem } from "@/context/CartContext";
import type { Product } from "@/lib/products";
import { formatLiterPrice, getServingForLiters, type LiterSize } from "@/lib/liter-sizes";

type CatalogProductCardProps = {
  product: Product;
  onSelect: (product: Product) => void;
};

export function CatalogProductCard({ product, onSelect }: CatalogProductCardProps) {
  const [liters, setLiters] = useState<LiterSize>(2);

  return (
    <motion.div
      className="group flex w-full flex-col overflow-hidden rounded-2xl border border-surface bg-white text-left shadow-sm transition hover:border-primary/30 hover:shadow-lg"
      whileHover={{ y: -6 }}
    >
      <button type="button" onClick={() => onSelect(product)} className="w-full text-left">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-5 pb-3">
          <h3 className="mb-2 font-semibold text-title group-hover:text-primary">{product.name}</h3>
          <p className="mb-2 text-sm text-title/70">{product.shortDescription}</p>
          <span className="text-xs font-semibold uppercase tracking-wide text-secondary">
            View ingredients & allergens →
          </span>
        </div>
      </button>
      <div className="border-t border-surface px-5 py-4">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-title/50">
          Choose size
        </p>
        <LiterSizeSelector value={liters} onChange={setLiters} />
        <p className="mt-2 text-xs text-title/60">{getServingForLiters(liters)}</p>
        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="text-lg font-bold text-primary">
            {formatLiterPrice(product.price, liters)}
          </span>
          <CartQuantityControls
            item={productToCartItem(product, liters)}
            variant="compact"
          />
        </div>
      </div>
    </motion.div>
  );
}
