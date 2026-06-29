"use client";

import Image from "next/image";
import { menuItems } from "@/lib/navigation";
import { FoodItemLiterBlock } from "@/components/cart/FoodItemLiterBlock";
import { menuItemToCartItem } from "@/lib/cart-utils";
import { HoverCard } from "@/components/motion/HoverCard";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";

export function ShopGrid() {
  return (
    <section className="py-16">
      <StaggerContainer className="container-fluid grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {menuItems.map((item) => (
          <StaggerItem key={item.id}>
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
              <FoodItemLiterBlock
                basePrice={item.priceValue}
                buildCartItem={(liters) => menuItemToCartItem(item, liters)}
                variant="default"
                showLabel
              />
            </HoverCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
