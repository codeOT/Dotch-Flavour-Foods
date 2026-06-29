"use client";

import Image from "next/image";
import { todaysMenu } from "@/lib/navigation";
import { FoodItemLiterBlock } from "@/components/cart/FoodItemLiterBlock";
import { menuItemToCartItem } from "@/lib/cart-utils";
import { HoverCard } from "@/components/motion/HoverCard";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";

export function MenuGrid() {
  return (
    <section className="py-16">
      <StaggerContainer className="container-fluid grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {todaysMenu.map((item) => (
          <StaggerItem key={item.id}>
            <HoverCard className="overflow-hidden rounded-2xl border border-surface bg-white shadow-sm">
              <div className="relative aspect-[4/3]">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold">{item.name}</h3>
                <p className="mb-4 text-sm text-title/70">{item.description}</p>
                <FoodItemLiterBlock
                  basePrice={item.priceValue}
                  buildCartItem={(liters) => menuItemToCartItem(item, liters)}
                  variant="compact"
                />
              </div>
            </HoverCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
