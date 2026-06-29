"use client";

import { useState } from "react";
import type { CartItem } from "@/context/CartContext";
import { CartQuantityControls } from "@/components/cart/CartQuantityControls";
import { LiterSizeSelector } from "@/components/cart/LiterSizeSelector";
import { formatLiterPrice, getServingForLiters, type LiterSize } from "@/lib/liter-sizes";

type CartItemInput = Omit<CartItem, "quantity">;

type FoodItemLiterBlockProps = {
  basePrice: number;
  buildCartItem: (liters: LiterSize) => CartItemInput;
  variant?: "default" | "compact";
  showServing?: boolean;
  showLabel?: boolean;
  className?: string;
};

export function FoodItemLiterBlock({
  basePrice,
  buildCartItem,
  variant = "compact",
  showServing = true,
  showLabel = false,
  className = "",
}: FoodItemLiterBlockProps) {
  const [liters, setLiters] = useState<LiterSize>(2);

  return (
    <div className={className}>
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-title/50">
        Choose size
      </p>
      <LiterSizeSelector value={liters} onChange={setLiters} />
      {showServing && (
        <p className="mt-2 text-xs text-title/60">{getServingForLiters(liters)}</p>
      )}
      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="text-lg font-bold text-primary">
          {formatLiterPrice(basePrice, liters)}
        </span>
        <CartQuantityControls item={buildCartItem(liters)} variant={variant} showLabel={showLabel} />
      </div>
    </div>
  );
}
