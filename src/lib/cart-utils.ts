import type { MenuItem } from "@/lib/navigation";
import type { CartItem } from "@/context/CartContext";
import { getPriceForLiters, type LiterSize } from "@/lib/liter-sizes";

/** Flat delivery charge applied once per eligible delivery order (gap analysis). */
export const DELIVERY_FEE = 9.99;

/** Minimum number of Ready Soup tubs required for an online Ready Soups order. */
export const READY_SOUP_MIN_ORDER = 3;

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

export function getDeliveryFee(_subtotal: number, method: DeliveryMethod): number {
  if (method === "pickup") return 0;
  return DELIVERY_FEE;
}

export function getDeliveryLabel(_subtotal: number, method: DeliveryMethod): string {
  if (method === "pickup") return "Free — collection";
  return `£${DELIVERY_FEE.toFixed(2)} flat fee`;
}

export function getOrderTotal(subtotal: number, method: DeliveryMethod): number {
  return subtotal + getDeliveryFee(subtotal, method);
}

export function isReadySoupCartItem(item: Pick<CartItem, "id">): boolean {
  return item.id.startsWith("ready-soup-");
}

/**
 * Counts Ready Soup tubs in the cart.
 * Individual soups count as 1 each; mix bundles encode unit count in the id.
 */
export function getReadySoupUnitCount(items: CartItem[]): number {
  return items.reduce((total, item) => {
    if (!isReadySoupCartItem(item)) return total;

    const mixMatch = item.id.match(/^ready-soup-bundle-mix-(\d+)/);
    if (mixMatch) {
      return total + Number(mixMatch[1]) * item.quantity;
    }

    const fixedBundleMatch = item.id.match(/^ready-soup-bundle-/);
    if (fixedBundleMatch) {
      // Legacy fixed bundles without encoded count — fall back to parsing name "(N soups)"
      const fromName = item.name.match(/\((\d+)\s+soups?\)/i);
      if (fromName) return total + Number(fromName[1]) * item.quantity;
      return total + item.quantity;
    }

    return total + item.quantity;
  }, 0);
}

export function cartHasReadySoups(items: CartItem[]): boolean {
  return items.some(isReadySoupCartItem);
}

export function meetsReadySoupMinimum(items: CartItem[]): boolean {
  if (!cartHasReadySoups(items)) return true;
  return getReadySoupUnitCount(items) >= READY_SOUP_MIN_ORDER;
}

export function generateOrderId(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `DOTCH-${stamp}-${random}`;
}
