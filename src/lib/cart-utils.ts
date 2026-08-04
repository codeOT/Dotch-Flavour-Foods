import type { MenuItem } from "@/lib/navigation";
import type { CartItem } from "@/context/CartContext";
import { getPriceForLitres, type LitreSize } from "@/lib/litre-sizes";
import { formatPrice } from "@/lib/site";

/** Each Ready Soup tub is 1 Litre. */
export const READY_SOUP_TUB_LITRES = 1;

/** Delivery fee for Ready Soups orders up to and including 20 litres. */
export const DELIVERY_FEE_UP_TO_20L = 13.99;

/** Delivery fee for Ready Soups orders over 20 litres, up to and including 25 litres. */
export const DELIVERY_FEE_UP_TO_25L = 16.99;

/** Maximum Ready Soup volume fulfilled online without a custom quote. */
export const READY_SOUP_MAX_ONLINE_LITRES = 25;

/**
 * @deprecated Prefer DELIVERY_FEE_UP_TO_20L / getDeliveryFee — kept for transitional imports.
 */
export const DELIVERY_FEE = DELIVERY_FEE_UP_TO_20L;

/** Minimum number of Ready Soup tubs required for an online Ready Soups order. */
export const READY_SOUP_MIN_ORDER = 3;

/** Same-day order window for next-day Ready Soups dispatch (UK time). */
export const READY_SOUP_ORDER_WINDOW = "8am–3pm";

/** Weekdays when next-day Ready Soups delivery is available. */
export const READY_SOUP_ORDER_DAYS = "Monday–Thursday";

export const readySoupDeliveryInfo = {
  orderWindow: READY_SOUP_ORDER_WINDOW,
  orderDays: READY_SOUP_ORDER_DAYS,
  /** Short line for cart / checkout footers. */
  scheduleSummary:
    "Next-day delivery: order Monday–Thursday, 8am–3pm (UK time). Orders placed Friday–Sunday are delivered on Tuesday.",
  nextDayNote:
    "Ready Soups next-day delivery is available for orders placed Monday to Thursday between 8am and 3pm (UK time). Orders placed Friday, Saturday or Sunday are scheduled for Tuesday delivery. Orders after 3pm on a weekday are treated as the next eligible order day's order.",
  weekendNote:
    "Orders placed from Friday to Sunday are delivered on the following Tuesday.",
  feeUpTo20L: DELIVERY_FEE_UP_TO_20L,
  feeUpTo25L: DELIVERY_FEE_UP_TO_25L,
  feeSummary: `Delivery is ${formatPrice(DELIVERY_FEE_UP_TO_20L)} for orders up to 20kg, and ${formatPrice(DELIVERY_FEE_UP_TO_25L)} for orders up to 25kg.`,
} as const;

export type DeliveryMethod = "delivery" | "pickup";

type CartLikeItem = Pick<CartItem, "id" | "quantity" | "name">;

export function menuItemToCartItem(item: MenuItem, litres?: LitreSize): Omit<CartItem, "quantity"> {
  const price =
    item.pricingMode === "unit"
      ? item.priceValue
      : litres
        ? getPriceForLitres(item.priceValue, litres, item.litreSizes, item.pricesByLitre)
        : item.priceValue;
  return {
    id: litres && item.pricingMode !== "unit" ? `${item.id}-${litres}l` : item.id,
    name:
      litres && item.pricingMode !== "unit"
        ? `${item.name} (${litres}L)`
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

/**
 * Estimated packed weight for one cart line (kg).
 * Ready Soup tubs use 1 tub ≈ 1kg; sized trays use their litre size as kg.
 */
export function getCartItemWeightKg(item: CartLikeItem & { quantity: number }): number {
  if (isReadySoupCartItem(item)) {
    return getReadySoupUnitCount([item]);
  }

  const idMatch = item.id.match(/-(\d+(?:\.\d+)?)l$/i);
  if (idMatch) {
    return Number(idMatch[1]) * item.quantity;
  }

  const nameMatch = item.name.match(/\((\d+(?:\.\d+)?)\s*L\)/i);
  if (nameMatch) {
    return Number(nameMatch[1]) * item.quantity;
  }

  return 0;
}

/** Total estimated cart weight in kg. */
export function getCartWeightKg(items: CartLikeItem[]): number {
  return items.reduce((total, item) => total + getCartItemWeightKg(item), 0);
}

export function formatWeightKg(kg: number): string {
  if (kg <= 0) return "0kg";
  const rounded = Math.round(kg * 10) / 10;
  return Number.isInteger(rounded) ? `${rounded}kg` : `${rounded.toFixed(1)}kg`;
}

/** Total Ready Soup volume in litres (1 tub = 1L). */
export function getCartReadySoupLitres(items: CartLikeItem[]): number {
  return getReadySoupUnitCount(items) * READY_SOUP_TUB_LITRES;
}

export function getDeliveryFee(method: DeliveryMethod, items: CartLikeItem[] = []): number {
  if (method === "pickup") return 0;

  const weightKg = Math.max(getCartReadySoupLitres(items), getCartWeightKg(items));
  if (weightKg <= 20) return DELIVERY_FEE_UP_TO_20L;
  if (weightKg <= READY_SOUP_MAX_ONLINE_LITRES) return DELIVERY_FEE_UP_TO_25L;
  return DELIVERY_FEE_UP_TO_25L;
}

export function getDeliveryLabel(method: DeliveryMethod, items: CartLikeItem[] = []): string {
  if (method === "pickup") return "Free — collection";

  const weightKg = Math.max(getCartReadySoupLitres(items), getCartWeightKg(items));
  if (weightKg <= 20) {
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
  const weightKg = Math.max(getCartReadySoupLitres(items), getCartWeightKg(items));
  return weightKg > READY_SOUP_MAX_ONLINE_LITRES;
}

export function generateOrderId(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `DOTCH-${stamp}-${random}`;
}
