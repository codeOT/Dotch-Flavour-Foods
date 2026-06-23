"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, X } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { ProductDetailModal } from "@/components/home/ProductDetailModal";
import { CartQuantityControls } from "@/components/cart/CartQuantityControls";
import { productToCartItem } from "@/context/CartContext";
import {
  catalogProducts,
  formatProductPrice,
  productCategories,
  type Product,
  type ProductCategory,
} from "@/lib/products";

type ProductCatalogSectionProps = {
  initialCategory?: ProductCategory | null;
};

export function ProductCatalogSection({ initialCategory = null }: ProductCatalogSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>(
    initialCategory ?? "sauces",
  );
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const closePopup = useCallback((category?: ProductCategory) => {
    setShowPopup(false);
    if (category) {
      setActiveCategory(category);
      document.getElementById("product-catalog")?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const filteredProducts = catalogProducts.filter(
    (product) => product.category === activeCategory,
  );

  return (
    <>
      <AnimatePresence>
        {showPopup && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[70] bg-black/45 backdrop-blur-sm"
              onClick={() => closePopup()}
              aria-hidden
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="quick-food-popup-title"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="fixed inset-x-3 top-1/2 z-[75] mx-auto max-h-[90vh] w-[calc(100%-1.5rem)] max-w-lg -translate-y-1/2 overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:inset-x-4 sm:p-8"
            >
              <button
                type="button"
                onClick={() => closePopup()}
                className="absolute right-4 top-4 rounded-full p-1 text-title/60 transition hover:bg-surface hover:text-title"
                aria-label="Close popup"
              >
                <X className="h-5 w-5" />
              </button>

              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-secondary">
                Dotch Flavours Foods
              </p>
              <h2 id="quick-food-popup-title" className="mb-3 pr-8 text-xl font-bold leading-snug sm:text-2xl md:text-3xl">
                Quick and delicious food for busy days
              </h2>
              <p className="mb-6 text-sm text-title/70">
                Explore our ready-made range. Choose a category to see products, prices, ingredients,
                and allergen information.
              </p>

              <div className="space-y-3">
                {productCategories.map((category) => (
                  <motion.button
                    key={category.id}
                    type="button"
                    onClick={() => closePopup(category.id)}
                    className="flex w-full items-center justify-between rounded-xl border border-surface bg-surface/40 px-5 py-4 text-left transition hover:border-primary hover:bg-white"
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div>
                      <p className="font-semibold text-title">{category.label}</p>
                      <p className="text-xs text-title/60">{category.description}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 shrink-0 text-primary" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <section id="product-catalog" className="scroll-mt-24 overflow-hidden bg-white py-12 sm:py-16">
        <div className="container-fluid min-w-0">
          <Reveal className="mb-8 text-center sm:mb-10">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary sm:text-sm">
              Our Range
            </p>
            <h2 className="mb-3 text-2xl font-bold sm:text-3xl md:text-4xl">
              Quick and delicious food for busy days
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-title/70 sm:text-base">
              Browse sauces, soups and stews below. Tap any product for full ingredients and allergen
              details.
            </p>
          </Reveal>

          <Reveal className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3">
            {productCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={`w-full rounded-full px-5 py-2.5 text-sm font-semibold transition sm:w-auto sm:px-6 ${
                  activeCategory === category.id
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "bg-surface text-title hover:bg-cream"
                }`}
              >
                {category.label}
              </button>
            ))}
          </Reveal>

          <StaggerContainer
            key={activeCategory}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredProducts.map((product) => (
              <StaggerItem key={product.id}>
                <motion.div
                  className="group flex w-full flex-col overflow-hidden rounded-2xl border border-surface bg-white text-left shadow-sm transition hover:border-primary/30 hover:shadow-lg"
                  whileHover={{ y: -6 }}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(product)}
                    className="w-full text-left"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5 pb-3">
                      <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                        <h3 className="font-semibold text-title group-hover:text-primary">
                          {product.name}
                        </h3>
                        <span className="shrink-0 font-bold text-primary">
                          {formatProductPrice(product)}
                        </span>
                      </div>
                      <p className="mb-2 text-sm text-title/70">{product.shortDescription}</p>
                      <span className="text-xs font-semibold uppercase tracking-wide text-secondary">
                        View ingredients & allergens →
                      </span>
                    </div>
                  </button>
                  <div className="flex items-center justify-between gap-3 border-t border-surface px-5 py-4">
                    <span className="text-xs font-medium text-title/60">Add to cart</span>
                    <CartQuantityControls
                      item={productToCartItem(product)}
                      variant="compact"
                    />
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  );
}
