"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getMenuItemPath, menuItems, type MenuItem } from "@/lib/navigation";
import { OrderOnWhatsAppButton } from "@/components/cart/OrderOnWhatsAppButton";
import { LitreSizeSelector } from "@/components/cart/LitreSizeSelector";
import { HoverCard } from "@/components/motion/HoverCard";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { Button } from "@/components/ui/Button";
import {
  formatLitrePrice,
  getDefaultLitreSize,
  type LitreSize,
} from "@/lib/litre-sizes";
import { productImageAlt } from "@/lib/product-seo";
import { formatPrice } from "@/lib/site";
import { freshMenuCustomiseWhatsAppHref, freshMenuOrderWhatsAppHref } from "@/lib/whatsapp";

function FreshMenuCard({ item }: { item: MenuItem }) {
  const isUnit = item.pricingMode === "unit";
  const [litres, setLitres] = useState<LitreSize>(() =>
    getDefaultLitreSize(item.litreSizes, item.pricesByLitre),
  );
  const priceLabel = isUnit
    ? `${formatPrice(item.priceValue)} ${item.unitLabel ?? ""}`.trim()
    : formatLitrePrice(item.priceValue, litres, item.litreSizes, item.pricesByLitre);
  const orderHref = freshMenuOrderWhatsAppHref(item, isUnit ? undefined : litres);

  return (
    <HoverCard className="h-full overflow-hidden rounded-2xl border border-surface bg-white shadow-sm">
      <Link href={getMenuItemPath(item)} className="relative block aspect-[4/3] overflow-hidden">
        <Image
          src={item.image}
          alt={productImageAlt(item.id, item.name)}
          fill
          className="object-cover"
        />
      </Link>
      <div className="p-5 sm:p-6">
        {item.category && (
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-secondary">
            {item.category}
          </p>
        )}
        <h2 className="mb-2 text-xl font-semibold">
          <Link href={getMenuItemPath(item)} className="hover:text-primary">
            {item.name}
          </Link>
        </h2>
        <p className="mb-4 text-sm text-title/70">{item.description}</p>
        {!isUnit && (
          <LitreSizeSelector
            value={litres}
            onChange={setLitres}
            availableSizes={item.litreSizes}
            pricesByLitre={item.pricesByLitre}
            className="mb-4"
          />
        )}
        <div className="flex items-center justify-between gap-3">
          <span className="font-bold text-primary">{priceLabel}</span>
          <OrderOnWhatsAppButton href={orderHref} compact />
        </div>
      </div>
    </HoverCard>
  );
}

export function FreshMenuContent() {
  const customisationHref = freshMenuCustomiseWhatsAppHref();

  return (
    <>
      <section className="bg-surface py-12 sm:py-16">
        <div className="container-fluid text-center">
          <Reveal>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-secondary sm:text-sm">
              Dotch Flavour Menu
            </p>
            <h1 className="mb-3 text-3xl font-bold sm:text-4xl md:text-5xl">
              Fresh Bulk Nigerian Food Trays & Combos
            </h1>
            <p className="mx-auto max-w-2xl text-sm text-title/70 sm:text-base">
              Choose a dish and size, then place your order. Need something tailored? Request a
              customisation. Ready Soups remain available for online checkout.
            </p>
            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href={customisationHref} className="!bg-secondary hover:!bg-orange">
                Request customisation
              </Button>
              <Button href="/ready-to-eat-soups" variant="outline">
                Shop Ready Soups
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
