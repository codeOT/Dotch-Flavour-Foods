"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Leaf, X } from "lucide-react";
import type { Product } from "@/lib/products";
import { formatProductPrice } from "@/lib/products";

type ProductDetailModalProps = {
  product: Product | null;
  onClose: () => void;
};

export function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-detail-title"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-4"
          >
            <div
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-2xl">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 rounded-full bg-white/90 p-2 shadow-md transition hover:bg-white"
                aria-label="Close product details"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 sm:p-8">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-3">
                <div className="min-w-0">
                  <h3 id="product-detail-title" className="text-xl font-bold text-title sm:text-2xl">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-title/70">{product.shortDescription}</p>
                </div>
                <p className="text-2xl font-bold text-primary">{formatProductPrice(product)}</p>
              </div>

              <div className="mb-6 rounded-xl bg-surface/60 p-4">
                <div className="mb-2 flex items-center gap-2 text-primary">
                  <Leaf className="h-4 w-4" />
                  <h4 className="font-semibold">Ingredients</h4>
                </div>
                <ul className="grid gap-1.5 sm:grid-cols-2">
                  {product.ingredients.map((ingredient) => (
                    <li key={ingredient} className="text-sm text-title/80">
                      • {ingredient}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6 rounded-xl border border-secondary/30 bg-secondary/5 p-4">
                <div className="mb-2 flex items-center gap-2 text-rust">
                  <AlertTriangle className="h-4 w-4" />
                  <h4 className="font-semibold">Allergens</h4>
                </div>
                <ul className="space-y-1">
                  {product.allergens.map((allergen) => (
                    <li key={allergen} className="text-sm font-medium text-title">
                      {allergen}
                    </li>
                  ))}
                </ul>
                {product.mayContain && product.mayContain.length > 0 && (
                  <p className="mt-3 text-xs text-title/60">
                    May also contain: {product.mayContain.join(", ")}.
                  </p>
                )}
              </div>

              <p className="text-xs text-title/60">
                <span className="font-semibold text-title/80">Storage: </span>
                {product.storage}
              </p>
            </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
