export const blackFridayPromo = {
  title: "Black Friday",
  eyebrow: "Ready Soups offer",
  dates: "1–30 November",
  intro:
    "Mix any flavours. Individual tubs stay £25.99. Delivery is charged on 3 and 4 tub bundles; the 5-tub bundle includes free delivery.",
  path: "/ready-to-eat-soups#bundles",
  poster: "/assets/images/promo/black-friday.jpg",
  posterAlt:
    "Dotch Flavour Foods Black Friday Ready Soups offer — 3, 4 and 5 tub bundles from 1 to 30 November",
  start: "2026-11-01T00:00:00+00:00",
  end: "2026-11-30T23:59:59.999+00:00",
} as const;

export const blackFridayBundleOffers: Record<
  3 | 4 | 5,
  { price: number; originalPrice: number; badge: string; includesGift: string }
> = {
  3: {
    price: 71.99,
    originalPrice: 77.97,
    badge: "Save £5.98",
    includesGift: "a free wooden spoon",
  },
  4: {
    price: 94.99,
    originalPrice: 103.96,
    badge: "Save £8.97",
    includesGift: "a free cooler bag",
  },
  5: {
    price: 115.99,
    originalPrice: 129.95,
    badge: "Save £13.96",
    includesGift: "a free cooler bag and free delivery",
  },
};

export function isBlackFridayActive(now = new Date()) {
  const start = new Date(blackFridayPromo.start);
  const end = new Date(blackFridayPromo.end);
  return now >= start && now <= end;
}
