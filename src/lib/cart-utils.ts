import type { MenuItem } from "@/lib/navigation";
import type { CartItem } from "@/context/CartContext";
import { getPriceForLiters, type LiterSize } from "@/lib/liter-sizes";
import { formatPrice } from "@/lib/site";

/** Each Ready Soup tub is 1000ml (1 litre). */
export const READY_SOUP_TUB_LITERS = 1;

/** Delivery fee for Ready Soups orders up to and including 20 litres. */
export const DELIVERY_FEE_UP_TO_20L = 13.99;

/** Delivery fee for Ready Soups orders over 20 litres, up to and including 25 litres. */
export const DELIVERY_FEE_UP_TO_25L = 16.99;

/** Maximum Ready Soup volume fulfilled online without a custom quote. */
export const READY_SOUP_MAX_ONLINE_LITERS = 25;

/**
 * @deprecated Prefer DELIVERY_FEE_UP_TO_20L / getDeliveryFee — kept for transitional imports.
 */
export const DELIVERY_FEE = DELIVERY_FEE_UP_TO_20L;

/** Minimum number of Ready Soup tubs required for an online Ready Soups order. */
export const READY_SOUP_MIN_ORDER = 3;

/** Same-day order window for next-day Ready Soups dispatch (UK time). */
export const READY_SOUP_ORDER_WINDOW = "8am–3pm";

export const readySoupDeliveryInfo = {
  orderWindow: READY_SOUP_ORDER_WINDOW,
  nextDayNote:
    "Ready Soups orders placed between 8am and 3pm (UK time) are prepared for next-day delivery. Orders after 3pm are treated as the next working day's order.",
  feeUpTo20L: DELIVERY_FEE_UP_TO_20L,
  feeUpTo25L: DELIVERY_FEE_UP_TO_25L,
  feeSummary: `Delivery is ${formatPrice(DELIVERY_FEE_UP_TO_20L)} for orders up to 20kg, and ${formatPrice(DELIVERY_FEE_UP_TO_25L)} for orders up to 25kg.`,
} as const;

export type DeliveryMethod = "delivery" | "pickup";

type CartLikeItem = Pick<CartItem, "id" | "quantity" | "name">;

export function menuItemToCartItem(item: MenuItem, liters?: LiterSize): Omit<CartItem, "quantity"> {
  const price =
    item.pricingMode === "unit"
      ? item.priceValue
      : liters
        ? getPriceForLiters(item.priceValue, liters, item.literSizes, item.pricesByLiter)
        : item.priceValue;
  return {
    id: liters && item.pricingMode !== "unit" ? `${item.id}-${liters}l` : item.id,
    name:
      liters && item.pricingMode !== "unit"
        ? `${item.name} (${liters}L)`
        : item.unitLabel
          ? `${item.name} (${item.unitLabel})`
          : item.name,
    price,
    image: item.image,
  };
}

export function isReadySoupCartItem(item: Pick<CartItem, "id">): boolean {
  return item.id.startsWith("ready-soup-");
}

/**
 * Counts Ready Soup tubs in the cart.
 * Individual soups count as 1 each; mix bundles encode unit count in the id.
 */
export function getReadySoupUnitCount(items: CartLikeItem[]): number {
  return items.reduce((total, item) => {
    if (!isReadySoupCartItem(item)) return total;

    const mixMatch = item.id.match(/^ready-soup-bundle-mix-(\d+)/);
    if (mixMatch) {
      return total + Number(mixMatch[1]) * item.quantity;
    }

    const fixedBundleMatch = item.id.match(/^ready-soup-bundle-/);
    if (fixedBundleMatch) {
      const fromName = item.name.match(/\((\d+)\s+soups?\)/i);
      if (fromName) return total + Number(fromName[1]) * item.quantity;
      return total + item.quantity;
    }

    return total + item.quantity;
  }, 0);
}

/** Total Ready Soup volume in litres (1 tub = 1L). */
export function getCartReadySoupLiters(items: CartLikeItem[]): number {
  return getReadySoupUnitCount(items) * READY_SOUP_TUB_LITERS;
}

export function getDeliveryFee(method: DeliveryMethod, items: CartLikeItem[] = []): number {
  if (method === "pickup") return 0;

  const liters = getCartReadySoupLiters(items);
  if (liters <= 20) return DELIVERY_FEE_UP_TO_20L;
  if (liters <= READY_SOUP_MAX_ONLINE_LITERS) return DELIVERY_FEE_UP_TO_25L;
  return DELIVERY_FEE_UP_TO_25L;
}

export function getDeliveryLabel(method: DeliveryMethod, items: CartLikeItem[] = []): string {
  if (method === "pickup") return "Free — collection";

  const liters = getCartReadySoupLiters(items);
  if (liters <= 20) {
    return `${formatPrice(DELIVERY_FEE_UP_TO_20L)} (up to 20kg)`;
  }
  return `${formatPrice(DELIVERY_FEE_UP_TO_25L)} (up to 25kg)`;
}

export function getOrderTotal(
  subtotal: number,
  method: DeliveryMethod,
  items: CartLikeItem[] = [],
): number {
  return subtotal + getDeliveryFee(method, items);
}

export function cartHasReadySoups(items: CartLikeItem[]): boolean {
  return items.some(isReadySoupCartItem);
}

export function meetsReadySoupMinimum(items: CartLikeItem[]): boolean {
  if (!cartHasReadySoups(items)) return true;
  return getReadySoupUnitCount(items) >= READY_SOUP_MIN_ORDER;
}

export function exceedsReadySoupOnlineLimit(items: CartLikeItem[]): boolean {
  return getCartReadySoupLiters(items) > READY_SOUP_MAX_ONLINE_LITERS;
}

export function generateOrderId(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `DOTCH-${stamp}-${random}`;
}
