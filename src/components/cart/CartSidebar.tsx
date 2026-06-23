"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getDeliveryFee, getOrderTotal } from "@/lib/cart-utils";
import { formatPrice } from "@/lib/site";
import { Button } from "@/components/ui/Button";

function QuantityControl({
  quantity,
  onDecrease,
  onIncrease,
}: {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}) {
  return (
    <div className="inline-flex items-center rounded-lg border border-surface bg-surface/30">
      <button
        type="button"
        onClick={onDecrease}
        aria-label="Decrease quantity"
        className="rounded-l-lg p-1.5 text-title transition hover:bg-surface"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="min-w-[1.75rem] px-1.5 text-center text-xs font-semibold">{quantity}</span>
      <button
        type="button"
        onClick={onIncrease}
        aria-label="Increase quantity"
        className="rounded-r-lg p-1.5 text-title transition hover:bg-surface"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export function CartSidebar() {
  const {
    items,
    subtotal,
    itemCount,
    isHydrated,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const deliveryFee = getDeliveryFee(subtotal, "delivery");
  const total = getOrderTotal(subtotal, "delivery");

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[80] bg-black/45 backdrop-blur-[2px]"
            onClick={closeCart}
            aria-hidden
          />

          <motion.aside
            key="cart-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed inset-y-0 right-0 z-[90] flex w-full max-w-md flex-col bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-surface px-5 py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-secondary">
                  Your order
                </p>
                <h2 className="text-lg font-bold text-title">
                  Cart
                  {isHydrated && itemCount > 0 && (
                    <span className="ml-2 text-sm font-normal text-title/60">
                      ({itemCount} {itemCount === 1 ? "item" : "items"})
                    </span>
                  )}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="rounded-lg p-2 text-title/60 transition hover:bg-surface hover:text-title"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex min-h-0 flex-1 flex-col">
              {!isHydrated ? (
                <div className="flex flex-1 items-center justify-center p-6">
                  <div className="h-32 w-full animate-pulse rounded-xl bg-surface/50" />
                </div>
              ) : items.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                  <motion.div
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-surface/60"
                  >
                    <ShoppingBag className="h-9 w-9 text-primary" />
                  </motion.div>
                  <h3 className="mb-2 text-xl font-bold">Your cart is empty</h3>
                  <p className="mb-6 max-w-xs text-sm text-title/70">
                    Explore our ready-to-eat soups, sauces, and stews.
                  </p>
                  <div className="flex w-full flex-col gap-2">
                    <Button href="/ready-to-eat-soups" fullWidth onNavigate={closeCart}>
                      Shop Ready Soups
                    </Button>
                    <Button href="/" variant="outline" fullWidth onNavigate={closeCart}>
                      Browse products
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between border-b border-surface/60 px-5 py-2">
                    <span className="text-xs text-title/50">
                      {items.length} product{items.length === 1 ? "" : "s"}
                    </span>
                    <button
                      type="button"
                      onClick={clearCart}
                      className="text-xs font-medium text-title/50 transition hover:text-accent-red"
                    >
                      Clear all
                    </button>
                  </div>

                  <ul className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
                    <AnimatePresence initial={false}>
                      {items.map((item) => (
                        <motion.li
                          key={item.id}
                          layout
                          initial={{ opacity: 0, x: 24 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 24, transition: { duration: 0.2 } }}
                          className="flex gap-3 rounded-xl border border-surface bg-white p-3 shadow-sm"
                        >
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                          <div className="flex min-w-0 flex-1 flex-col gap-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-title">{item.name}</p>
                                <p className="text-xs text-title/60">{formatPrice(item.price)} each</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeItem(item.id)}
                                aria-label={`Remove ${item.name}`}
                                className="shrink-0 rounded p-1 text-title/40 transition hover:text-accent-red"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                              <QuantityControl
                                quantity={item.quantity}
                                onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                                onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                              />
                              <p className="text-sm font-bold text-primary">
                                {formatPrice(item.price * item.quantity)}
                              </p>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                </>
              )}
            </div>

            {/* Footer */}
            {isHydrated && items.length > 0 && (
              <div className="shrink-0 border-t border-surface bg-surface/20 px-5 py-4">
                <dl className="mb-4 space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-title/70">Subtotal</dt>
                    <dd className="font-semibold">{formatPrice(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-title/70">Delivery</dt>
                    <dd className="text-secondary">
                      {deliveryFee === 0 ? "Calculated at checkout" : formatPrice(deliveryFee)}
                    </dd>
                  </div>
                  <div className="flex justify-between border-t border-surface pt-2 text-base">
                    <dt className="font-bold">Total</dt>
                    <dd className="font-bold text-primary">{formatPrice(total)}</dd>
                  </div>
                </dl>
                <div className="space-y-2">
                  <Button href="/shop/checkout" fullWidth onNavigate={closeCart}>
                    Proceed to checkout
                  </Button>
                  <Button href="/" variant="outline" fullWidth onNavigate={closeCart}>
                    Continue shopping
                  </Button>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
