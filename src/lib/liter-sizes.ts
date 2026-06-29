import { formatPrice } from "./site";

export type LiterSize = 2 | 3 | 5;

export const literSizeOptions: {
  liters: LiterSize;
  label: string;
  serving: string;
}[] = [
  { liters: 2, label: "2L", serving: "Serves 2–3" },
  { liters: 3, label: "3L", serving: "Serves 4–6" },
  { liters: 5, label: "5L", serving: "Serves 8–10" },
];

/** Base product price is the 2L price */
const literPriceMultipliers: Record<LiterSize, number> = {
  2: 1,
  3: 1.5,
  5: 2.35,
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
