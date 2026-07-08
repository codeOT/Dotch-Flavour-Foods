"use client";

import Image from "next/image";
import { menuItems } from "@/lib/navigation";
import { menuItemToCartItem } from "@/lib/cart-utils";
import { CartQuantityControls } from "@/components/cart/CartQuantityControls";
import { HoverCard } from "@/components/motion/HoverCard";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";

export function FreshMenuContent() {
  return (
    <>
      <section className="bg-surface py-12 sm:py-16">
        <div className="container-fluid text-center">
          <Reveal>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-secondary sm:text-sm">
              Dotch Flavour Menu
            </p>
            <h1 className="mb-3 text-3xl font-bold sm:text-4xl md:text-5xl">
              Fresh Food Menu
            </h1>
            <p className="mx-auto max-w-2xl text-sm text-title/70 sm:text-base">
              Browse every dish from our fresh food range and add straight to cart.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-16 pt-4 sm:pb-20">
        <StaggerContainer className="container-fluid grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item) => (
            <StaggerItem key={item.id}>
              <HoverCard className="h-full overflow-hidden rounded-2xl border border-surface bg-white shadow-sm">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="p-5 sm:p-6">
                  <h2 className="mb-2 text-xl font-semibold">{item.name}</h2>
                  <p className="mb-4 text-sm text-title/70">{item.description}</p>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-bold text-primary">{item.price}</span>
                    <CartQuantityControls item={menuItemToCartItem(item)} showLabel />
                  </div>
                </div>
              </HoverCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </>
  );
}

