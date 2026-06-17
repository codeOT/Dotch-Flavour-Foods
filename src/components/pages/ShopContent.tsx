"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { menuItems } from "@/lib/navigation";
import { HoverCard } from "@/components/motion/HoverCard";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";

export function ShopGrid() {
  return (
    <section className="py-16">
      <StaggerContainer className="container-fluid grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {menuItems.map((item) => (
          <StaggerItem key={item.name}>
            <HoverCard className="rounded-2xl border border-surface bg-white p-6 shadow-sm">
              <Image
                src={item.image}
                alt={item.name}
                width={120}
                height={120}
                className="mb-4 rounded-xl"
              />
              <h3 className="mb-2 text-lg font-semibold">{item.name}</h3>
              <p className="mb-4 text-sm text-title/70">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-primary">{item.price}</span>
                <motion.button
                  type="button"
                  className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-hover"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                >
                  Add to Cart
                </motion.button>
              </div>
            </HoverCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
