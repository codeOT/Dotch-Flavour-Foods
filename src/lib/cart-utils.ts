import type { MenuItem } from "@/lib/navigation";
import type { CartItem } from "@/context/CartContext";
import { getPriceForLiters, type LiterSize } from "@/lib/liter-sizes";

export const FREE_DELIVERY_THRESHOLD = 30;
export const DELIVERY_FEE = 3.99;

export type DeliveryMethod = "delivery" | "pickup";

export function menuItemToCartItem(item: MenuItem, liters?: LiterSize): Omit<CartItem, "quantity"> {
  const price = liters ? getPriceForLiters(item.priceValue, liters) : item.priceValue;
  return {
    id: liters ? `${item.id}-${liters}l` : item.id,
    name: liters ? `${item.name} (${liters}L)` : item.name,
    price,
    image: item.image,
  };
}

export function getDeliveryFee(subtotal: number, method: DeliveryMethod): number {
  if (method === "pickup") return 0;
  return subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
}

export function getDeliveryLabel(subtotal: number, method: DeliveryMethod): string {
  if (method === "pickup") return "Free — collection";
  if (subtotal >= FREE_DELIVERY_THRESHOLD) return "Free delivery";
  return `£${DELIVERY_FEE.toFixed(2)}`;
}

export function getOrderTotal(subtotal: number, method: DeliveryMethod): number {
  return subtotal + getDeliveryFee(subtotal, method);
}

export function generateOrderId(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `DOTCH-${stamp}-${random}`;
}


