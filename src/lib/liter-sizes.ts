import { formatPrice } from "./site";

export type LiterSize = 2 | 4 | 6;

export const literSizeOptions: {
  liters: LiterSize;
  label: string;
  serving: string;
}[] = [
  { liters: 2, label: "2L", serving: "Serves 2–3" },
  { liters: 4, label: "4L", serving: "Serves 5–7" },
  { liters: 6, label: "6L", serving: "Serves 9–12" },
];

/** Base product price is the 2L price */
const literPriceMultipliers: Record<LiterSize, number> = {
  2: 1,
  4: 1.85,
  6: 2.7,
};

export function getPriceForLiters(basePrice: number, liters: LiterSize): number {
  return Math.round(basePrice * literPriceMultipliers[liters] * 100) / 100;
}

export function formatLiterPrice(basePrice: number, liters: LiterSize): string {
  return formatPrice(getPriceForLiters(basePrice, liters));
}

export function getServingForLiters(liters: LiterSize): string {
  return literSizeOptions.find((option) => option.liters === liters)?.serving ?? "";
}
