"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { readyToEatSoups } from "@/lib/navigation";
import { HoverCard } from "@/components/motion/HoverCard";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";

export function SoupsGrid() {
  return (
    <section className="py-16">
      <StaggerContainer className="container-fluid grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {readyToEatSoups.map((item) => (
          <StaggerItem key={item.name}>
            <HoverCard className="overflow-hidden rounded-2xl border border-surface bg-white shadow-sm">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
                <span className="absolute left-4 top-4 rounded bg-secondary px-3 py-1 text-xs font-semibold uppercase text-white">
                  Ready to Eat
                </span>
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold">{item.name}</h3>
                <p className="mb-4 text-sm text-title/70">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">{item.price}</span>
                  <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                    <Link
                      href="/shop/cart"
                      className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-white transition hover:bg-primary-hover"
                      aria-label={`Add ${item.name} to cart`}
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </HoverCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
