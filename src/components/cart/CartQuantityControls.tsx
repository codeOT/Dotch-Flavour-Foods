"use client";

import { Minus, Plus } from "lucide-react";
import { useCart, type CartItem } from "@/context/CartContext";

type CartItemInput = Omit<CartItem, "quantity">;

type CartQuantityControlsProps = {
  item: CartItemInput;
  variant?: "default" | "compact";
  className?: string;
  showLabel?: boolean;
};

export function CartQuantityControls({
  item,
  variant = "default",
  className = "",
  showLabel = false,
}: CartQuantityControlsProps) {
  const { items, addItem, updateQuantity } = useCart();
  const quantity = items.find((entry) => entry.id === item.id)?.quantity ?? 0;

  const stopBubble = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const increase = () => {
    if (quantity === 0) addItem(item, 1);
    else updateQuantity(item.id, quantity + 1);
  };

  const decrease = () => {
    if (quantity > 0) updateQuantity(item.id, quantity - 1);
  };

  const isCompact = variant === "compact";

  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      onClick={stopBubble}
      onKeyDown={(event) => event.stopPropagation()}
      role="group"
      aria-label={`Quantity for ${item.name}`}
    >
      {showLabel && quantity === 0 && (
        <span className="text-xs font-semibold uppercase tracking-wide text-title/60">
          Add to cart
        </span>
      )}

      <div
        className={`inline-flex items-center border border-surface bg-white shadow-sm ${
          isCompact ? "rounded-full" : "rounded-lg"
        }`}
      >
        <button
          type="button"
          disabled={quantity === 0}
          onClick={(event) => {
            stopBubble(event);
            decrease();
          }}
          aria-label={`Decrease ${item.name} quantity`}
          className={`text-title transition hover:bg-surface disabled:cursor-not-allowed disabled:opacity-35 ${
            isCompact ? "rounded-l-full p-1.5" : "rounded-l-lg p-2"
          }`}
        >
          <Minus className={isCompact ? "h-3.5 w-3.5" : "h-4 w-4"} />
        </button>

        <span
          className={`min-w-[2rem] text-center font-semibold tabular-nums ${
            isCompact ? "px-1 text-xs" : "px-2 text-sm"
          }`}
        >
          {quantity}
        </span>

        <button
          type="button"
          onClick={(event) => {
            stopBubble(event);
            increase();
          }}
          aria-label={`Increase ${item.name} quantity`}
          className={`bg-primary text-white transition hover:bg-primary-hover ${
            isCompact ? "rounded-r-full p-1.5" : "rounded-r-lg p-2"
          }`}
        >
          <Plus className={isCompact ? "h-3.5 w-3.5" : "h-4 w-4"} />
        </button>
      </div>
    </div>
  );
}
