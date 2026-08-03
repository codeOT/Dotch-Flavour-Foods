"use client";

import { useState } from "react";
import Image from "next/image";
import type { MenuItem } from "@/lib/navigation";
import { menuItems } from "@/lib/navigation";
import { LiterSizeSelector } from "@/components/cart/LiterSizeSelector";
import { HoverCard } from "@/components/motion/HoverCard";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { Button } from "@/components/ui/Button";
import {
  formatLiterPrice,
  getDefaultLiterSize,
  type LiterSize,
} from "@/lib/liter-sizes";
import { formatPrice, siteConfig } from "@/lib/site";

function FreshMenuCard({ item }: { item: MenuItem }) {
  const isUnit = item.pricingMode === "unit";
  const [liters, setLiters] = useState<LiterSize>(() =>
    getDefaultLiterSize(item.literSizes, item.pricesByLiter),
  );
  const whatsappNumber = siteConfig.contact.phone.replace(/\D/g, "");
  const sizeLabel = isUnit ? (item.unitLabel ?? "per wrap") : `${liters}L`;
  const priceLabel = isUnit
    ? `${formatPrice(item.priceValue)} ${item.unitLabel ?? ""}`.trim()
    : formatLiterPrice(item.priceValue, liters, item.literSizes, item.pricesByLiter);
  const message = `Hi Dotch Flavour Foods, I'd like to place a Fresh Food WhatsApp order for ${item.name} (${sizeLabel}) at ${priceLabel}. Please confirm availability, price, and ordering deadline.`;
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <HoverCard className="h-full overflow-hidden rounded-2xl border border-surface bg-white shadow-sm">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>
      <div className="p-5 sm:p-6">
        {item.category && (
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-secondary">
            {item.category}
          </p>
        )}
        <h2 className="mb-2 text-xl font-semibold">{item.name}</h2>
        <p className="mb-4 text-sm text-title/70">{item.description}</p>
        {!isUnit && (
          <LiterSizeSelector
            value={liters}
            onChange={setLiters}
            availableSizes={item.literSizes}
            pricesByLiter={item.pricesByLiter}
            className="mb-4"
          />
        )}
        <div className="flex items-center justify-between gap-3">
          <span className="font-bold text-primary">{priceLabel}</span>
          <Button href={whatsappHref} className="!bg-secondary !px-4 !py-2 !text-xs hover:!bg-orange">
            Order on WhatsApp
          </Button>
        </div>
      </div>
    </HoverCard>
  );
}

export function FreshMenuContent() {
  const whatsappNumber = siteConfig.contact.phone.replace(/\D/g, "");
  const generalWhatsApp = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi Dotch Flavour Foods, I'd like to ask about a Fresh Food order / customisation.",
  )}`;

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
              Fresh food orders are placed on WhatsApp so we can confirm availability, customisations,
              and weekly ordering deadlines. Choose your litres below, then message us to complete
              your order.
            </p>
            <div className="mt-5">
              <Button href={generalWhatsApp} className="!bg-secondary hover:!bg-orange">
                Chat on WhatsApp
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-16 pt-4 sm:pb-20">
        <StaggerContainer className="container-fluid grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item) => (
            <StaggerItem key={item.id}>
              <FreshMenuCard item={item} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </>
  );
}
