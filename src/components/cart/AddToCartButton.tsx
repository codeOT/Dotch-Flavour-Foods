"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Plus, ShoppingCart } from "lucide-react";
import { useCart, type CartItem } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";

type CartItemInput = Omit<CartItem, "quantity">;

type AddToCartButtonProps = {
  item: CartItemInput;
  variant?: "button" | "icon" | "compact";
  className?: string;
  label?: string;
  onAdded?: () => void;
};

export function AddToCartButton({
  item,
  variant = "button",
  className = "",
  label = "Add to Cart",
  onAdded,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(item);
    setAdded(true);
    onAdded?.();
    window.setTimeout(() => setAdded(false), 1800);
  };

  if (variant === "compact") {
    return (
      <motion.button
        type="button"
        onClick={handleAdd}
        aria-label={`Add ${item.name} to cart`}
        className={`flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-white shadow-md transition hover:bg-orange ${className}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {added ? (
            <motion.span
              key="check"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              <Check className="h-4 w-4" />
            </motion.span>
          ) : (
            <motion.span
              key="plus"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              <Plus className="h-4 w-4" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    );
  }

  if (variant === "icon") {
    return (
      <motion.button
        type="button"
        onClick={handleAdd}
        aria-label={`Add ${item.name} to cart`}
        className={`relative flex h-10 w-10 items-center justify-center rounded-md bg-primary text-white transition hover:bg-primary-hover ${className}`}
        whileHover={{ scale: 1.12, rotate: 6 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {added ? (
            <motion.span
              key="check"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              <Check className="h-4 w-4" />
            </motion.span>
          ) : (
            <motion.span
              key="cart"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              <ShoppingCart className="h-4 w-4" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    );
  }

  return (
    <Button
      type="button"
      onClick={handleAdd}
      className={`${added ? "!bg-secondary" : ""} ${className}`}
    >
      <AnimatePresence mode="wait">
        {added ? (
          <motion.span
            key="added"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="inline-flex items-center gap-2"
          >
            <Check className="h-4 w-4" /> Added
          </motion.span>
        ) : (
          <motion.span
            key="label"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
}
