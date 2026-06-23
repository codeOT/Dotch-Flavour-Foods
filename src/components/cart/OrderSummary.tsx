"use client";

import Image from "next/image";
import Link from "next/link";
import type { CartItem } from "@/context/CartContext";
import {
  type DeliveryMethod,
  getDeliveryFee,
  getDeliveryLabel,
  getOrderTotal,
} from "@/lib/cart-utils";
import { formatPrice } from "@/lib/site";
import { Button } from "@/components/ui/Button";

type OrderSummaryProps = {
  items: CartItem[];
  subtotal: number;
  deliveryMethod?: DeliveryMethod;
  showItems?: boolean;
  checkoutHref?: string;
  onCheckout?: () => void;
  checkoutLabel?: string;
  children?: React.ReactNode;
};

export function OrderSummary({
  items,
  subtotal,
  deliveryMethod = "delivery",
  showItems = false,
  checkoutHref,
  onCheckout,
  checkoutLabel = "Proceed to Checkout",
  children,
}: OrderSummaryProps) {
  const deliveryFee = getDeliveryFee(subtotal, deliveryMethod);
  const total = getOrderTotal(subtotal, deliveryMethod);

  return (
    <div className="rounded-2xl border border-surface bg-gradient-to-b from-surface/30 to-white p-6 shadow-sm">
      <h3 className="mb-5 text-lg font-bold">Order Summary</h3>

      {showItems && items.length > 0 && (
        <ul className="mb-5 max-h-48 space-y-3 overflow-y-auto border-b border-surface pb-5">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-3 text-sm">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg">
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="40px" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{item.name}</p>
                <p className="text-xs text-title/60">Qty {item.quantity}</p>
              </div>
              <span className="shrink-0 font-semibold">{formatPrice(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
      )}

      <dl className="mb-6 space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-title/70">Subtotal</dt>
          <dd className="font-semibold">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-title/70">Delivery</dt>
          <dd className="font-medium text-secondary">
            {deliveryFee === 0 ? getDeliveryLabel(subtotal, deliveryMethod) : formatPrice(deliveryFee)}
          </dd>
        </div>
        <div className="border-t border-surface pt-3">
          <div className="flex justify-between text-base">
            <dt className="font-bold">Total</dt>
            <dd className="text-xl font-bold text-primary">{formatPrice(total)}</dd>
          </div>
          <p className="mt-1 text-xs text-title/50">Tax included where applicable</p>
        </div>
      </dl>

      {children}

      {checkoutHref && (
        <div className="space-y-3">
          <Button href={checkoutHref} fullWidth>
            {checkoutLabel}
          </Button>
          <Button href="/" variant="outline" fullWidth>
            Continue Shopping
          </Button>
        </div>
      )}

      {onCheckout && (
        <Button type="button" onClick={onCheckout} fullWidth>
          {checkoutLabel}
        </Button>
      )}

      <p className="mt-5 text-center text-xs text-title/50">
        Questions?{" "}
        <Link href="/contact-us" className="font-medium text-primary hover:underline">
          Contact us
        </Link>
      </p>
    </div>
  );
}
