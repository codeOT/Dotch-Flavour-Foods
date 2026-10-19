export const halfTermPromo = {
  path: "/promo",
  eyebrow: "Half-term campaign",
  title: "Half-term is here",
  subtitle: "What are we eating today?",
  dates: "16 October – 1 November",
  intro:
    "This half-term, let us take some of that stress off your hands. Family combos for the table, or Ready Soups for the freezer.",
} as const;

export type PromoSlide = {
  id: string;
  image: string;
  alt: string;
  title: string;
  kicker: string;
};

export const promoSlides: PromoSlide[] = [
  {
    id: "half-term-family",
    image: "/assets/images/promo/half-term-family.jpg",
    alt: "A family sharing Dotch Flavour jollof, chicken and plantain at the table",
    title: "Half-term is here",
    kicker: "Take the stress off your hands",
  },
  {
    id: "combo-99",
    image: "/assets/images/promo/combo-99.jpg",
    alt: "The £99 Combo with small trays of jollof rice, chicken, fried plantain and drinks",
    title: "The £99 Combo",
    kicker: "Feed 6–8 people",
  },
  {
    id: "combo-129",
    image: "/assets/images/promo/combo-129.jpg",
    alt: "The £129 Combo with medium trays of jollof rice, chicken and beef, fried plantain and drinks",
    title: "The £129 Combo",
    kicker: "Feed 10–15 people",
  },
  {
    id: "half-term-delicious",
    image: "/assets/images/promo/half-term-delicious.jpg",
    alt: "Jollof rice, grilled chicken, plantain and Ready Soups for half-term",
    title: "Make this half term delicious",
    kicker: "16 October – 1 November",
  },
  {
    id: "ready-soups",
    image: "/assets/images/promo/ready-soups.jpg",
    alt: "Five Ready Soups tubs — Efo Riro, Buka Stew, Ila Asepo, Efo Egusi and Ayamase",
    title: "Authentic flavour, ready for you",
    kicker: "Mix & match 5 Ready Soups",
  },
];

export const promoCombos = [
  {
    id: "combo-99",
    slug: "99",
    name: "The £99 Combo",
    price: 99,
    priceLabel: "£99",
    feeds: "Feed 6–8 (ages 5–18)",
    image: "/assets/images/promo/combo-99.jpg",
    includes: [
      "Small tray of jollof rice",
      "Small tray of chicken",
      "Fried plantain",
      "Complimentary drink",
    ],
  },
  {
    id: "combo-129",
    slug: "129",
    name: "The £129 Combo",
    price: 129,
    priceLabel: "£129",
    feeds: "Feed 10–15 (ages 5–18)",
    image: "/assets/images/promo/combo-129.jpg",
    includes: [
      "Medium tray of jollof rice",
      "Medium tray of chicken and beef",
      "Fried plantain",
      "Complimentary drink",
    ],
  },
] as const;

export type PromoCombo = (typeof promoCombos)[number];

export function promoComboToCartItem(combo: PromoCombo) {
  return {
    id: `promo-combo-${combo.slug}`,
    name: `${combo.name} — ${combo.feeds}`,
    price: combo.price,
    image: combo.image,
  };
}

export function getPromoComboByCartId(id: string) {
  const match = id.match(/^promo-combo-(99|129)$/);
  if (!match) return null;
  return promoCombos.find((combo) => combo.slug === match[1]) ?? null;
}
