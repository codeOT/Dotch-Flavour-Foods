import { formatPrice } from "./site";

export type LiterSize = 2 | 4 | 6;

export const ALL_LITER_SIZES: LiterSize[] = [2, 4, 6];

export const literSizeOptions: {
  liters: LiterSize;
  label: string;
  serving: string;
}[] = [
  { liters: 2, label: "2L", serving: "Serves 2–3" },
  { liters: 4, label: "4L", serving: "Serves 5–7" },
  { liters: 6, label: "6L", serving: "Serves 9–12" },
];

/** Base product price is the price of the smallest available size (usually 2L). */
const literPriceMultipliers: Record<LiterSize, number> = {
  2: 1,
  4: 1.85,
  6: 2.7,
};

export function resolveLiterSizes(availableSizes?: readonly LiterSize[]): LiterSize[] {
  if (!availableSizes?.length) return [...ALL_LITER_SIZES];
  return ALL_LITER_SIZES.filter((size) => availableSizes.includes(size));
}

export function getDefaultLiterSize(availableSizes?: readonly LiterSize[]): LiterSize {
  return resolveLiterSizes(availableSizes)[0] ?? 2;
}

export function getLiterSizeOptions(availableSizes?: readonly LiterSize[]) {
  const sizes = resolveLiterSizes(availableSizes);
  return literSizeOptions.filter((option) => sizes.includes(option.liters));
}

export function getPriceForLiters(
  basePrice: number,
  liters: LiterSize,
  availableSizes?: readonly LiterSize[],
): number {
  const baseSize = getDefaultLiterSize(availableSizes);
  const scaled =
    basePrice * (literPriceMultipliers[liters] / literPriceMultipliers[baseSize]);
  return Math.round(scaled * 100) / 100;
}

export function formatLiterPrice(
  basePrice: number,
  liters: LiterSize,
  availableSizes?: readonly LiterSize[],
): string {
  return formatPrice(getPriceForLiters(basePrice, liters, availableSizes));
}

export function getServingForLiters(liters: LiterSize): string {
  return literSizeOptions.find((option) => option.liters === liters)?.serving ?? "";
}
