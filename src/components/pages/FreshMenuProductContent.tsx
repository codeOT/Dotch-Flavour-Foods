"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { MenuItem } from "@/lib/navigation";
import { OrderOnWhatsAppButton } from "@/components/cart/OrderOnWhatsAppButton";
import { LitreSizeSelector } from "@/components/cart/LitreSizeSelector";
import { Reveal } from "@/components/motion/Reveal";
import {
  formatLitrePrice,
  getDefaultLitreSize,
  type LitreSize,
} from "@/lib/litre-sizes";
import { getProductSeo, productImageAlt } from "@/lib/product-seo";
import { formatPrice } from "@/lib/site";
import { freshMenuOrderWhatsAppHref } from "@/lib/whatsapp";

export function FreshMenuProductContent({ item }: { item: MenuItem }) {
  const isUnit = item.pricingMode === "unit";
  const [litres, setLitres] = useState<LitreSize>(() =>
    getDefaultLitreSize(item.litreSizes, item.pricesByLitre),
  );
  const priceLabel = isUnit
    ? `${formatPrice(item.priceValue)} ${item.unitLabel ?? ""}`.trim()
    : formatLitrePrice(item.priceValue, litres, item.litreSizes, item.pricesByLitre);
  const orderHref = freshMenuOrderWhatsAppHref(item, isUnit ? undefined : litres);
  const seo = getProductSeo(item.id);

  return (
    <section className="py-12 sm:py-16">
      <div className="container-fluid">
        <Reveal>
          <Link
            href="/fresh-menu"
            className="mb-8 inline-flex text-sm font-semibold text-primary transition hover:text-secondary"
          >
            ← Back to Fresh Menu
          </Link>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-surface shadow-xl">
              <Image
                src={item.image}
                alt={productImageAlt(item.id, item.name)}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>

          <Reveal>
            {item.category && (
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-secondary">
                {item.category}
              </p>
            )}
            <h1 className="mb-4 text-3xl font-bold sm:text-4xl">{item.name}</h1>
            <p className="mb-6 text-sm leading-relaxed text-title/75 sm:text-base">
              {seo?.description ?? item.description}
            </p>
            {!isUnit && (
              <LitreSizeSelector
                value={litres}
                onChange={setLitres}
                availableSizes={item.litreSizes}
                pricesByLitre={item.pricesByLitre}
                className="mb-6"
              />
            )}
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <span className="text-2xl font-bold text-primary">{priceLabel}</span>
            </div>
            <OrderOnWhatsAppButton href={orderHref} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
