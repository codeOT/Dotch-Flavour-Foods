"use client";

import Image from "next/image";
import { todaysMenu } from "@/lib/navigation";
import { OrderOnWhatsAppButton } from "@/components/cart/OrderOnWhatsAppButton";
import { freshMenuOrderWhatsAppHref } from "@/lib/whatsapp";
import { HoverCard } from "@/components/motion/HoverCard";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { productImageAlt } from "@/lib/product-seo";

export function MenuGrid() {
  return (
    <>
      <section className="bg-surface py-12 sm:py-16">
        <Reveal className="container-fluid text-center">
          <h1 className="mb-3 text-3xl font-bold sm:text-4xl md:text-5xl">
            Authentic Ready-to-Eat Nigerian Meals & Sides
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-title/70 sm:text-base">
            Order authentic Nigerian rice and meal options, plus sides for the table.
          </p>
        </Reveal>
      </section>
    <section className="py-16">
      <StaggerContainer className="container-fluid grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {todaysMenu.map((item) => (
          <StaggerItem key={item.id}>
            <HoverCard className="overflow-hidden rounded-2xl border border-surface bg-white shadow-sm">
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.image}
                  alt={productImageAlt(item.id, item.name)}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold">{item.name}</h3>
                <p className="mb-4 text-sm text-title/70">{item.description}</p>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-lg font-bold text-primary">{item.price}</span>
                  <OrderOnWhatsAppButton href={freshMenuOrderWhatsAppHref(item)} compact />
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

