"use client";

import Image from "next/image";
import Link from "next/link";
import { Snowflake, Star } from "lucide-react";
import {
  formatReadySoupPrice,
  readySoupToCartItem,
  type ReadySoupBundle,
  type ReadySoupProduct,
} from "@/lib/ready-soups";
import { CartQuantityControls } from "@/components/cart/CartQuantityControls";
import { READY_SOUP_MIN_ORDER } from "@/lib/cart-utils";

export function ReadySoupProductCard({
  product,
  priority = false,
}: {
  product: ReadySoupProduct;
  priority?: boolean;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-surface/80 bg-white shadow-sm transition hover:border-primary/25 hover:shadow-lg">
      <Link
        href={`/ready-to-eat-soups/${product.slug}`}
        className="relative block aspect-[4/5] w-full overflow-hidden"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          quality={75}
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/70 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary shadow-sm">
          <Snowflake className="h-3 w-3 text-secondary" />
          Frozen
        </span>
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-xs font-medium uppercase tracking-widest text-white/80">{product.size}</p>
          <h3 className="text-xl font-bold text-white">{product.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-white/85">{product.tagline}</p>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="mb-4 flex-1 text-sm leading-relaxed text-title/70">{product.shortDescription}</p>
        <p className="mb-4 text-xs text-title/55">
          Online Ready Soups orders require a minimum of {READY_SOUP_MIN_ORDER} soups.
        </p>

        <div className="flex items-center justify-between gap-3 border-t border-surface pt-4">
          <div>
            <p className="text-lg font-bold text-primary">{formatReadySoupPrice(product.price)}</p>
            <Link
              href={`/ready-to-eat-soups/${product.slug}`}
              className="text-xs font-semibold text-secondary hover:underline"
            >
              View full details →
            </Link>
          </div>
          <CartQuantityControls item={readySoupToCartItem(product)} variant="compact" />
        </div>
      </div>
    </article>
  );
}

export function ReadySoupBundleCard({
  bundle,
  onBuild,
}: {
  bundle: ReadySoupBundle;
  onBuild?: (bundle: ReadySoupBundle) => void;
}) {
  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white p-6 text-title shadow-sm">
      {bundle.badge && (
        <span className="absolute right-4 top-4 z-10 rounded-full bg-secondary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
          {bundle.badge}
        </span>
      )}

      <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-xl">
        <Image
          src={bundle.image}
          alt={bundle.name}
          fill
          quality={75}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      </div>

      <h3 className="mb-2 text-xl font-bold">{bundle.name}</h3>
      <p className="mb-3 flex-1 text-sm text-title/70">{bundle.description}</p>

      <div className="mb-4 space-y-1">
        <p className="text-sm text-title/80">• {bundle.soupCount} soups — mix any flavours</p>
        {bundle.includesGift && (
          <p className="text-sm text-title/80">• Includes {bundle.includesGift}</p>
        )}
      </div>

      <div className="mt-auto flex flex-col gap-3 border-t border-surface pt-4">
        <div>
          <p className="text-2xl font-bold text-primary">{formatReadySoupPrice(bundle.price)}</p>
          {bundle.originalPrice && (
            <p className="text-sm text-title/50 line-through">
              {formatReadySoupPrice(bundle.originalPrice)}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={() => onBuild?.(bundle)}
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover"
        >
          Mix flavours
        </button>
      </div>
    </article>
  );
}

export function ReviewStars({ rating }: { rating: number }) {
  const clamped = Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <div className="flex gap-0.5" aria-label={`${clamped} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => {
        const filled = index < clamped;
        return (
          <Star
            key={index}
            className={`h-4 w-4 ${
              filled
                ? "fill-secondary text-secondary"
                : "fill-none text-title/25"
            }`}
          />
        );
      })}
    </div>
  );
}
