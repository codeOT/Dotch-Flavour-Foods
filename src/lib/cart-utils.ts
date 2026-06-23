import type { MenuItem } from "@/lib/navigation";
import type { CartItem } from "@/context/CartContext";

export const FREE_DELIVERY_THRESHOLD = 30;
export const DELIVERY_FEE = 3.99;

export type DeliveryMethod = "delivery" | "pickup";

export function menuItemToCartItem(item: MenuItem): Omit<CartItem, "quantity"> {
  return {
    id: item.id,
    name: item.name,
    price: item.priceValue,
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
