import { formatPrice } from "./site";

export type LitreSize = 2 | 4 | 6;

export const ALL_LITRE_SIZES: LitreSize[] = [2, 4, 6];

export type PricesByLitre = Partial<Record<LitreSize, number>>;

export const litreSizeOptions: {
  litres: LitreSize;
  label: string;
  serving: string;
}[] = [
  { litres: 2, label: "2L", serving: "Serves 2–3" },
  { litres: 4, label: "4L", serving: "Serves 5–7" },
  { litres: 6, label: "6L", serving: "Serves 9–12" },
];

/** Fallback multipliers when an item has no explicit size prices. */
const litrePriceMultipliers: Record<LitreSize, number> = {
  2: 1,
  4: 1.85,
  6: 2.7,
};

export function resolveLitreSizes(
  availableSizes?: readonly LitreSize[],
  pricesByLitre?: PricesByLitre,
): LitreSize[] {
  if (pricesByLitre) {
    const fromPrices = ALL_LITRE_SIZES.filter((size) => pricesByLitre[size] != null);
    if (fromPrices.length) return fromPrices;
  }
  if (!availableSizes?.length) return [...ALL_LITRE_SIZES];
  return ALL_LITRE_SIZES.filter((size) => availableSizes.includes(size));
}

export function getDefaultLitreSize(
  availableSizes?: readonly LitreSize[],
  pricesByLitre?: PricesByLitre,
): LitreSize {
  return resolveLitreSizes(availableSizes, pricesByLitre)[0] ?? 2;
}

export function getLitreSizeOptions(
  availableSizes?: readonly LitreSize[],
  pricesByLitre?: PricesByLitre,
) {
  const sizes = resolveLitreSizes(availableSizes, pricesByLitre);
  return litreSizeOptions.filter((option) => sizes.includes(option.litres));
}

export function getPriceForLitres(
  basePrice: number,
  litres: LitreSize,
  availableSizes?: readonly LitreSize[],
  pricesByLitre?: PricesByLitre,
): number {
  if (pricesByLitre?.[litres] != null) {
    return pricesByLitre[litres]!;
  }

  const baseSize = getDefaultLitreSize(availableSizes, pricesByLitre);
  const scaled =
    basePrice * (litrePriceMultipliers[litres] / litrePriceMultipliers[baseSize]);
  return Math.round(scaled * 100) / 100;
}

export function formatLitrePrice(
  basePrice: number,
  litres: LitreSize,
  availableSizes?: readonly LitreSize[],
  pricesByLitre?: PricesByLitre,
): string {
  return formatPrice(getPriceForLitres(basePrice, litres, availableSizes, pricesByLitre));
}

export function getServingForLitres(litres: LitreSize): string {
  return litreSizeOptions.find((option) => option.litres === litres)?.serving ?? "";
}
