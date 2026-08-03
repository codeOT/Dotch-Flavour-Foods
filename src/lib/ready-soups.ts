import { formatPrice } from "./site";

export type ReadySoupProduct = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  shortDescription: string;
  price: number;
  size: string;
  image: string;
  ingredients: string[];
  allergens: string[];
  mayContain?: string[];
  servingSuggestions: string[];
  storageInstructions: string;
  heatingInstructions: string;
};

export type ReadySoupBundle = {
  id: string;
  slug: string;
  name: string;
  description: string;
  soupCount: number;
  includesGift?: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  image: string;
};

export const readySoupsBrand = {
  name: "Ready Soups by Dotch Flavour",
  parent: "Dotch Flavour",
  tagline: "Premium frozen Traditional soups, ready in minutes.",
  intro:
    "Ready Soups by Dotch Flavour is our dedicated frozen range of authentic Traditional soups. Each tub is slow-cooked in small batches, rapidly frozen to lock in flavour, and delivered ready for your freezer. No compromise on taste — just heat, serve, and enjoy.",
} as const;

export const howItWorksSteps = [
  {
    step: "01",
    title: "Choose your bundle",
    description: "Select 3, 5, 10 or 18 soups and mix flavours from the range. Minimum online order is 3 soups.",
  },
  {
    step: "02",
    title: "Checkout online",
    description:
      "Pay securely by card. Delivery is £13.99 up to 20kg, or £16.99 up to 25kg.",
  },
  {
    step: "03",
    title: "Next-day delivery",
    description:
      "Order between 8am and 3pm for next-day frozen delivery. Your soups arrive ready for the freezer.",
  },
  {
    step: "04",
    title: "Heat & serve",
    description: "Defrost overnight or heat from frozen. On the table in under 15 minutes.",
  },
] as const;

export const storageHeatingGuidance = {
  storage: {
    title: "Storage guidance",
    points: [
      "Store at −18°C or below at all times.",
      "Do not refreeze once fully defrosted.",
      "Best consumed within 3 months of delivery.",
      "Once opened, refrigerate and use within 2 days.",
    ],
  },
  heating: {
    title: "Heating guidance",
    points: [
      "Hob: defrost overnight, then heat gently in a pan until piping hot (75°C+).",
      "Microwave: pierce film, heat on high for 4–6 minutes, stir halfway.",
      "From frozen: place sealed tub in simmering water for 20–25 minutes.",
      "Always ensure the soup is steaming hot throughout before serving.",
    ],
  },
} as const;

export const launchOffers = [
  {
    id: "min-order",
    title: "Minimum order: 3 soups",
    description:
      "Online Ready Soups orders start at 3 tubs. Mix and match flavours freely within your bundle size.",
    code: null,
    badge: "Ordering",
  },
  {
    id: "flat-delivery",
    title: "Delivery by volume",
    description:
      "£13.99 for orders up to 20kg, £16.99 up to 25kg. Order 8am–3pm for next-day delivery. Collection remains available at checkout where offered.",
    code: null,
    badge: "Delivery",
  },
] as const;

export const readySoupReviews = [
  {
    name: "Adenike O.",
    location: "Manchester",
    rating: 5,
    quote:
      "The Efo Riro tastes exactly like my mum's — I keep three tubs in the freezer at all times. Genuinely premium quality.",
  },
  {
    name: "James T.",
    location: "London",
    rating: 4,
    quote:
      "Discovery Bundle was perfect for trying the range. Ayamase is now a weekly staple in our house.",
  },
  {
    name: "Priya S.",
    location: "Birmingham",
    rating: 4,
    quote:
      "Heating instructions are clear and the 1000ml size feeds our family of four with leftovers. Brilliant product.",
  },
  {
    name: "Chidi E.",
    location: "Leeds",
    rating: 4,
    quote:
      "Freezer Bundle is incredible value. Arrived perfectly frozen and the Buka Stew is outstanding.",
  },
] as const;

export const readySoupProducts: ReadySoupProduct[] = [
  {
    id: "efo-riro",
    slug: "efo-riro",
    name: "Efo Riro",
    tagline: "Spinach stew with peppers and locust beans",
    description:
      "A vibrant Yoruba classic — tender spinach simmered in a rich pepper and tomato base with locust beans, crayfish, and traditional seasonings. Bold, earthy, and deeply satisfying.",
    shortDescription: "Spinach stew with peppers, locust beans, and aromatic spices.",
    price: 70,
    size: "1000ml",
    image: "/assets/images/Efo.png",
    ingredients: [
      "Fresh spinach",
      "Red bell peppers",
      "Scotch bonnet",
      "Tomatoes",
      "Palm oil",
      "Locust beans (iru)",
      "Crayfish",
      "Onions",
      "Stockfish",
      "Sea salt",
      "Traditional spice blend",
    ],
    allergens: ["Fish", "Crustaceans"],
    mayContain: ["Celery", "Mustard", "Soya"],
    servingSuggestions: [
      "Serve with pounded yam, amala, or eba.",
      "Pair with grilled fish or assorted meat.",
      "Enjoy with steamed rice for a lighter meal.",
    ],
    storageInstructions:
      "Keep frozen at −18°C or below. Once defrosted, do not refreeze. Refrigerate after opening and consume within 2 days.",
    heatingInstructions:
      "Defrost overnight in the fridge. Heat in a saucepan over medium heat, stirring occasionally, until piping hot throughout. Alternatively, microwave in a microwave-safe bowl for 4–6 minutes, stirring halfway.",
  },
  {
    id: "efo-egusi",
    slug: "efo-egusi",
    name: "Efo Egusi",
    tagline: "Melon seed soup with leafy greens",
    description:
      "Ground egusi seeds cooked into a velvety, nutty soup with spinach, palm oil, and seasoned stock. A West African favourite that delivers comfort in every spoonful.",
    shortDescription: "Rich melon seed soup with spinach and traditional seasonings.",
    price: 70,
    size: "1000ml",
    image: "/assets/images/Egus.png",
    ingredients: [
      "Ground egusi (melon seeds)",
      "Spinach",
      "Palm oil",
      "Onions",
      "Tomatoes",
      "Stockfish",
      "Crayfish",
      "Scotch bonnet",
      "Seasoning cube",
      "Sea salt",
    ],
    allergens: ["Fish", "Crustaceans"],
    mayContain: ["Celery", "Mustard"],
    servingSuggestions: [
      "Classic with pounded yam or swallow of your choice.",
      "Add grilled chicken or beef for extra protein.",
      "Serve alongside fried plantain.",
    ],
    storageInstructions:
      "Store frozen at −18°C. Best within 3 months. Refrigerate opened tubs and use within 2 days.",
    heatingInstructions:
      "Thaw in the refrigerator overnight. Reheat on the hob until steaming hot, adding a splash of water if needed. Microwave option: 5–7 minutes on high, stir well before serving.",
  },
  {
    id: "ayamase",
    slug: "ayamase",
    name: "Ayamase",
    tagline: "Green pepper sauce with palm oil",
    description:
      "The legendary Ofada sauce — green bell peppers and scotch bonnet blended with fermented locust beans and palm oil. Smoky, spicy, and unforgettable.",
    shortDescription: "Iconic green pepper sauce with palm oil and locust beans.",
    price: 85,
    size: "1000ml",
    image: "/assets/images/Ayam.png",
    ingredients: [
      "Green bell peppers",
      "Scotch bonnet",
      "Locust beans (iru)",
      "Palm oil",
      "Onions",
      "Crayfish",
      "Assorted meat stock",
      "Bay leaf",
      "Sea salt",
    ],
    allergens: ["Fish", "Crustaceans", "Soya (locust beans)"],
    mayContain: ["Celery", "Mustard"],
    servingSuggestions: [
      "Serve with Ofada rice or any long-grain rice.",
      "Pair with boiled eggs and fried plantain.",
      "Excellent with grilled catfish.",
    ],
    storageInstructions:
      "Keep frozen at −18°C or below. Do not refreeze after thawing. Use within 2 days once opened.",
    heatingInstructions:
      "Defrost fully before heating. Warm gently in a pan — ayamase is best not boiled vigorously. Microwave: 4–5 minutes, stir and check temperature.",
  },
  {
    id: "buka-stew",
    slug: "buka-stew",
    name: "Buka Stew",
    tagline: "Smoky roadside-style tomato stew",
    description:
      "Inspired by the legendary buka joints of Lagos — a deep, smoky tomato stew with layered spices, perfect for rice, yams, or bread.",
    shortDescription: "Smoky, slow-cooked tomato stew with bold Nigerian spices.",
    price: 85,
    size: "1000ml",
    image: "/assets/images/Bukas.png",
    ingredients: [
      "Tomatoes",
      "Red peppers",
      "Onions",
      "Ginger",
      "Garlic",
      "Palm oil",
      "Smoked paprika",
      "Thyme",
      "Bay leaf",
      "Sea salt",
      "Chicken stock",
    ],
    allergens: ["Celery (in stock)"],
    mayContain: ["Mustard", "Sulphites"],
    servingSuggestions: [
      "Serve over white rice or jollof rice.",
      "Perfect with fried yam or plantain.",
      "Use as a base for beans (ewa agoyin style).",
    ],
    storageInstructions:
      "Frozen storage at −18°C. Consume within 3 months. Refrigerate after opening for up to 2 days.",
    heatingInstructions:
      "Defrost in fridge overnight. Heat in a saucepan, stirring frequently, until bubbling hot. Suitable for microwave reheating in 4–6 minutes.",
  },
  {
    id: "ila-asepo",
    slug: "ila-asepo",
    name: "Ila Asepo",
    tagline: "Okra soup one-pot classic",
    description:
      "A silky okra soup cooked one-pot style with palm oil, crayfish, and traditional seasonings. Light, nourishing, and perfect with any swallow.",
    shortDescription: "Silky okra soup with palm oil and crayfish — the one-pot classic.",
    price: 70,
    size: "1000ml",
    image: "/assets/images/Ila Asepo.png",
    ingredients: [
      "Fresh okra",
      "Palm oil",
      "Crayfish",
      "Onions",
      "Scotch bonnet",
      "Locust beans",
      "Spinach",
      "Sea salt",
      "Traditional seasoning",
    ],
    allergens: ["Crustaceans", "Soya (locust beans)"],
    mayContain: ["Fish", "Celery"],
    servingSuggestions: [
      "Serve with amala, semolina, or eba.",
      "Add assorted meat or fish when reheating.",
      "Enjoy with steamed rice for a lighter option.",
    ],
    storageInstructions:
      "Keep at −18°C until ready to use. Once thawed, keep refrigerated and consume within 2 days.",
    heatingInstructions:
      "Thaw overnight. Heat gently on the hob, stirring to maintain the okra texture. Do not over-stir if you prefer a thicker consistency. Microwave 5 minutes on high.",
  },
];

export const readySoupBundles: ReadySoupBundle[] = [
  {
    id: "bundle-3",
    slug: "bundle-3",
    name: "3-Soup Bundle",
    description: "Mix any three flavours — ideal for first-time customers exploring the range.",
    soupCount: 3,
    price: 210,
    originalPrice: 255,
    badge: "Starter",
    image: "/assets/images/gallery/grid2/pic4.jpg",
  },
  {
    id: "bundle-5",
    slug: "bundle-5",
    name: "5-Soup Bundle",
    description: "Five soups to feed the household — mix and match your favourites.",
    soupCount: 5,
    price: 350,
    originalPrice: 425,
    badge: "Popular",
    image: "/assets/images/gallery/grid2/pic2.jpg",
  },
  {
    id: "bundle-10",
    slug: "bundle-10",
    name: "10-Soup Bundle",
    description: "Stock your freezer for busy weeks with ten soups of your choice.",
    soupCount: 10,
    price: 700,
    originalPrice: 850,
    badge: "Best value",
    image: "/assets/images/gallery/grid2/pic6.jpg",
  },
  {
    id: "bundle-18",
    slug: "bundle-18",
    name: "18-Soup Bundle",
    description: "Our largest mix-and-match collection for families and meal planners.",
    soupCount: 18,
    price: 1260,
    originalPrice: 1530,
    badge: "Family stock",
    image: "/assets/images/gallery/grid2/pic5.jpg",
  },
];

export function getReadySoupBySlug(slug: string): ReadySoupProduct | undefined {
  return readySoupProducts.find((product) => product.slug === slug);
}

export function getReadySoupBundleBySlug(slug: string): ReadySoupBundle | undefined {
  return readySoupBundles.find((bundle) => bundle.slug === slug);
}

export function formatReadySoupPrice(price: number): string {
  return formatPrice(price);
}

/** One Ready Soup tub (as listed size) for the cart. */
export function readySoupToCartItem(product: ReadySoupProduct) {
  return {
    id: `ready-soup-${product.id}`,
    name: `${product.name} (${product.size})`,
    price: product.price,
    image: product.image,
  };
}

export function readySoupBundleToCartItem(bundle: ReadySoupBundle) {
  return {
    id: `ready-soup-bundle-mix-${bundle.soupCount}`,
    name: `${bundle.name} (${bundle.soupCount} soups)`,
    price: bundle.price,
    image: bundle.image,
  };
}

export type MixSelection = Record<string, number>;

export function getMixSelectionTotal(selection: MixSelection): number {
  return Object.values(selection).reduce((sum, qty) => sum + qty, 0);
}

export function getMixedBundlePrice(
  selection: MixSelection,
  products: ReadySoupProduct[] = readySoupProducts,
): number {
  return products.reduce((sum, product) => {
    const qty = selection[product.id] ?? 0;
    return sum + qty * product.price;
  }, 0);
}

export function buildMixedBundleCartItem(
  bundle: ReadySoupBundle,
  selection: MixSelection,
  products: ReadySoupProduct[] = readySoupProducts,
) {
  const lines = products
    .map((product) => {
      const qty = selection[product.id] ?? 0;
      return qty > 0 ? `${qty}× ${product.name}` : null;
    })
    .filter(Boolean);

  return {
    id: `ready-soup-bundle-mix-${bundle.soupCount}-${Date.now().toString(36)}`,
    name: `${bundle.name}: ${lines.join(", ")}`,
    price: getMixedBundlePrice(selection, products),
    image: bundle.image,
  };
}
