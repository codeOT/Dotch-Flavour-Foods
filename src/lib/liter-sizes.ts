import { formatPrice } from "./site";

export type LiterSize = 2 | 4 | 6;

export const ALL_LITER_SIZES: LiterSize[] = [2, 4, 6];

export type PricesByLiter = Partial<Record<LiterSize, number>>;

export const literSizeOptions: {
  liters: LiterSize;
  label: string;
  serving: string;
}[] = [
  { liters: 2, label: "2L", serving: "Serves 2–3" },
  { liters: 4, label: "4L", serving: "Serves 5–7" },
  { liters: 6, label: "6L", serving: "Serves 9–12" },
];

/** Fallback multipliers when an item has no explicit size prices. */
const literPriceMultipliers: Record<LiterSize, number> = {
  2: 1,
  4: 1.85,
  6: 2.7,
};

export function resolveLiterSizes(
  availableSizes?: readonly LiterSize[],
  pricesByLiter?: PricesByLiter,
): LiterSize[] {
  if (pricesByLiter) {
    const fromPrices = ALL_LITER_SIZES.filter((size) => pricesByLiter[size] != null);
    if (fromPrices.length) return fromPrices;
  }
  if (!availableSizes?.length) return [...ALL_LITER_SIZES];
  return ALL_LITER_SIZES.filter((size) => availableSizes.includes(size));
}

export function getDefaultLiterSize(
  availableSizes?: readonly LiterSize[],
  pricesByLiter?: PricesByLiter,
): LiterSize {
  return resolveLiterSizes(availableSizes, pricesByLiter)[0] ?? 2;
}

export function getLiterSizeOptions(
  availableSizes?: readonly LiterSize[],
  pricesByLiter?: PricesByLiter,
) {
  const sizes = resolveLiterSizes(availableSizes, pricesByLiter);
  return literSizeOptions.filter((option) => sizes.includes(option.liters));
}

export function getPriceForLiters(
  basePrice: number,
  liters: LiterSize,
  availableSizes?: readonly LiterSize[],
  pricesByLiter?: PricesByLiter,
): number {
  if (pricesByLiter?.[liters] != null) {
    return pricesByLiter[liters]!;
  }

  const baseSize = getDefaultLiterSize(availableSizes, pricesByLiter);
  const scaled =
    basePrice * (literPriceMultipliers[liters] / literPriceMultipliers[baseSize]);
  return Math.round(scaled * 100) / 100;
}

export function formatLiterPrice(
  basePrice: number,
  liters: LiterSize,
  availableSizes?: readonly LiterSize[],
  pricesByLiter?: PricesByLiter,
): string {
  return formatPrice(getPriceForLiters(basePrice, liters, availableSizes, pricesByLiter));
}

export function getServingForLiters(liters: LiterSize): string {
  return literSizeOptions.find((option) => option.liters === liters)?.serving ?? "";
}
