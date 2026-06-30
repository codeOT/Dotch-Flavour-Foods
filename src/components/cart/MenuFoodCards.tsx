"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { MenuItem } from "@/lib/navigation";
import { menuItemToCartItem } from "@/lib/cart-utils";
import { FoodItemLiterBlock } from "@/components/cart/FoodItemLiterBlock";
import { HoverCard } from "@/components/motion/HoverCard";

type TodaysMenuCardProps = {
  item: MenuItem;
};

export function TodaysMenuCard({ item }: TodaysMenuCardProps) {
  return (
    <HoverCard className="group relative h-full overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.5 }}
        >
          <Image src={item.image} alt={item.name} fill className="object-cover" />
        </motion.div>
        <motion.span
          className="absolute left-4 top-4 z-10 rounded bg-secondary px-3 py-1 text-xs font-semibold uppercase text-white"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          Top Seller
        </motion.span>
      </div>
      <div className="p-5">
        <h5 className="mb-2 text-lg font-semibold transition-colors group-hover:text-primary">
          <Link href="/our-menu" className="hover:text-primary">
            {item.name}
          </Link>
        </h5>
        <p className="mb-4 text-sm text-title/70">{item.description}</p>
        <FoodItemLiterBlock
          basePrice={item.priceValue}
          buildCartItem={(liters) => menuItemToCartItem(item, liters)}
          variant="compact"
        />
      </div>
    </HoverCard>
  );
}

type MenuCarouselCardProps = {
  item: MenuItem;
};

export function MenuCarouselCard({ item }: MenuCarouselCardProps) {
  return (
    <HoverCard className="group relative overflow-hidden rounded-2xl border border-surface bg-white p-4 shadow-sm">
      <div className="mb-4 flex min-w-0 items-center gap-3 sm:gap-4">
        <Image
          src={item.image}
          alt={item.name}
          width={80}
          height={80}
          className="h-16 w-16 shrink-0 rounded-xl object-cover sm:h-20 sm:w-20"
        />
        <div className="min-w-0">
          <h6 className="font-semibold">
            <Link href="/fresh-menu" className="hover:text-primary">
              {item.name}
            </Link>
          </h6>
          <p className="text-sm text-title/60">{item.description}</p>
        </div>
      </div>
      <FoodItemLiterBlock
        basePrice={item.priceValue}
        buildCartItem={(size) => menuItemToCartItem(item, size)}
        variant="compact"
        className="border-t border-surface pt-4"
      />
    </HoverCard>
  );
}
