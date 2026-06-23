"use client";

import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, Flame, Leaf, Refrigerator, Snowflake, UtensilsCrossed } from "lucide-react";
import { motion } from "framer-motion";
import { CartQuantityControls } from "@/components/cart/CartQuantityControls";
import { Button } from "@/components/ui/Button";
import { HoverCard } from "@/components/motion/HoverCard";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { FloatingBadge } from "@/components/ready-soups/ReadySoupCards";
import {
  formatReadySoupPrice,
  readySoupToCartItem,
  type ReadySoupProduct,
} from "@/lib/ready-soups";
import { floatAnimation, slideLeft, slideRight } from "@/lib/motion";

function DetailPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <HoverCard className="h-full">
      <div className={`h-full ${className}`}>{children}</div>
    </HoverCard>
  );
}

function AnimatedBulletItem({ children }: { children: React.ReactNode }) {
  return (
    <StaggerItem>
      <motion.div
        className="text-sm text-title/80"
        whileHover={{ x: 4, color: "#574821" }}
      >
        • {children}
      </motion.div>
    </StaggerItem>
  );
}

export function ReadySoupProductDetail({ product }: { product: ReadySoupProduct }) {
  return (
    <section className="py-12 sm:py-16">
      <div className="container-fluid">
        <Reveal>
          <motion.div whileHover={{ x: -4 }}>
            <Link
              href="/ready-to-eat-soups"
              className="mb-8 inline-flex text-sm font-semibold text-primary transition hover:text-secondary"
            >
              ← Back to Ready Soups
            </Link>
          </motion.div>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal variants={slideRight}>
            <motion.div
              className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-surface shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
            >
              <motion.div animate={floatAnimation} className="relative h-full w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
              <FloatingBadge className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary shadow-sm">
                <Snowflake className="h-3.5 w-3.5 text-secondary" />
                Premium frozen · {product.size}
              </FloatingBadge>
            </motion.div>
          </Reveal>

          <Reveal variants={slideLeft}>
            <StaggerContainer>
              <StaggerItem>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary">
                  Ready Soups by Dotch Flavour
                </p>
              </StaggerItem>
              <StaggerItem>
                <h1 className="mb-2 text-3xl font-bold sm:text-4xl">{product.name}</h1>
              </StaggerItem>
              <StaggerItem>
                <p className="mb-4 text-lg font-medium text-primary">{product.tagline}</p>
              </StaggerItem>
              <StaggerItem>
                <p className="mb-6 text-sm leading-relaxed text-title/70 sm:text-base">{product.description}</p>
              </StaggerItem>
              <StaggerItem>
                <div className="mb-6 flex flex-wrap items-center gap-4">
                  <motion.p
                    className="text-3xl font-bold text-primary"
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  >
                    {formatReadySoupPrice(product.price)}
                  </motion.p>
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="rounded-full bg-surface px-4 py-1.5 text-sm font-semibold text-title/80"
                  >
                    {product.size} tub
                  </motion.span>
                </div>
              </StaggerItem>
              <StaggerItem>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="mb-8 flex flex-col gap-4 rounded-2xl border border-surface bg-surface/30 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <p className="font-semibold text-title">Add to order</p>
                  <CartQuantityControls item={readySoupToCartItem(product)} showLabel />
                </motion.div>
              </StaggerItem>
              <StaggerItem>
                <Button href="/shop/checkout" fullWidth className="mb-8 sm:w-auto">
                  Order now
                </Button>
              </StaggerItem>
            </StaggerContainer>
          </Reveal>
        </div>

        <StaggerContainer className="mt-16 grid gap-8 lg:grid-cols-2">
          <StaggerItem>
            <Reveal>
              <DetailPanel className="rounded-2xl border border-surface bg-white p-6 shadow-sm sm:p-8">
                <motion.div className="mb-4 flex items-center gap-2 text-primary" whileHover={{ x: 4 }}>
                  <Leaf className="h-5 w-5 text-secondary" />
                  <h2 className="text-lg font-bold">Ingredients</h2>
                </motion.div>
                <StaggerContainer className="grid gap-1.5 sm:grid-cols-2">
                  {product.ingredients.map((ingredient) => (
                    <AnimatedBulletItem key={ingredient}>{ingredient}</AnimatedBulletItem>
                  ))}
                </StaggerContainer>
              </DetailPanel>
            </Reveal>
          </StaggerItem>

          <StaggerItem>
            <Reveal delay={0.05}>
              <DetailPanel className="rounded-2xl border border-secondary/30 bg-secondary/5 p-6 shadow-sm sm:p-8">
                <motion.div className="mb-4 flex items-center gap-2 text-rust" whileHover={{ x: 4 }}>
                  <AlertTriangle className="h-5 w-5" />
                  <h2 className="text-lg font-bold">Allergen information</h2>
                </motion.div>
                <StaggerContainer className="space-y-1">
                  {product.allergens.map((allergen) => (
                    <AnimatedBulletItem key={allergen}>{allergen}</AnimatedBulletItem>
                  ))}
                </StaggerContainer>
                {product.mayContain && product.mayContain.length > 0 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-3 text-xs text-title/60"
                  >
                    May also contain: {product.mayContain.join(", ")}.
                  </motion.p>
                )}
              </DetailPanel>
            </Reveal>
          </StaggerItem>

          <StaggerItem>
            <Reveal delay={0.1}>
              <DetailPanel className="rounded-2xl border border-surface bg-white p-6 shadow-sm sm:p-8">
                <motion.div className="mb-4 flex items-center gap-2 text-primary" whileHover={{ x: 4 }}>
                  <UtensilsCrossed className="h-5 w-5 text-secondary" />
                  <h2 className="text-lg font-bold">Serving suggestions</h2>
                </motion.div>
                <StaggerContainer className="space-y-2">
                  {product.servingSuggestions.map((suggestion) => (
                    <AnimatedBulletItem key={suggestion}>{suggestion}</AnimatedBulletItem>
                  ))}
                </StaggerContainer>
              </DetailPanel>
            </Reveal>
          </StaggerItem>

          <StaggerItem>
            <Reveal delay={0.15}>
              <div className="space-y-6">
                <HoverCard>
                  <div className="rounded-2xl border border-surface bg-white p-6 shadow-sm">
                    <motion.div className="mb-3 flex items-center gap-2 text-primary" whileHover={{ x: 4 }}>
                      <Refrigerator className="h-5 w-5 text-secondary" />
                      <h2 className="text-lg font-bold">Storage instructions</h2>
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="text-sm leading-relaxed text-title/80"
                    >
                      {product.storageInstructions}
                    </motion.p>
                  </div>
                </HoverCard>
                <HoverCard>
                  <div className="rounded-2xl border border-surface bg-white p-6 shadow-sm">
                    <motion.div className="mb-3 flex items-center gap-2 text-primary" whileHover={{ x: 4 }}>
                      <Flame className="h-5 w-5 text-secondary" />
                      <h2 className="text-lg font-bold">Heating instructions</h2>
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                      className="text-sm leading-relaxed text-title/80"
                    >
                      {product.heatingInstructions}
                    </motion.p>
                  </div>
                </HoverCard>
              </div>
            </Reveal>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
