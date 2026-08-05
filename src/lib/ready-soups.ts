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
      "Order Monday–Thursday between 8am and 3pm for next-day frozen delivery. Orders placed Friday–Sunday are delivered on Tuesday. Your soups arrive ready for the freezer.",
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
      "£13.99 for orders up to 20kg, £16.99 up to 25kg. Next-day delivery: order Monday–Thursday 8am–3pm. Friday–Sunday orders arrive Tuesday. Collection remains available at checkout where offered.",
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
      "Heating instructions are clear and the 1 Litre size feeds our family of four with leftovers. Brilliant product.",
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
    tagline: "A rich vibrant Nigerian spinach stew",
    description:
      "Frozen Efo riro • Net Volume: 1 Litre • Fully Cooked • Ready to Heat • Keep Frozen at -18°C or BelowRich • Spicy • Homemade Style (No Artificial colours or Preservatives) • Produced in a Home Kitchen in the UK",
    shortDescription: "A rich vibrant Nigerian spinach stew",
    price: 70,
    size: "1 Litre",
    image: "/assets/images/Efo.png",
    ingredients: [
      "Spinach (Efo)",
      "Assorted meats (beef, tripe, cow foot)",
      "Palm oil",
      "Smoked dried fish (FISH)",
      "Stockfish (FISH)",
      "Crayfish (CRUSTACEANS)",
      "Bell red peppers",
      "Scotch bonnet peppers",
      "Onions",
      "Locust beans (iru)",
      "Seasoning (contains SOYA)",
      "Salt",
      "Spices",
    ],
    allergens: ["Fish", "Crustaceans", "Soya"],
    mayContain: ["Nuts", "Gluten", "Milk"],
    servingSuggestions: [
      "Amala",
      "Rice",
      "Pounded yam",
      "Eba (garri)",
      "Semolina,Fufu",
    ],
    storageInstructions:
      "Do not refreeze after thawingOnce thawed, keep refrigerated and consume within 2–3 days",
    heatingInstructions:
      "Thaw in refrigerator overnight OR use microwave defrost setting.Heat in a saucepan over medium heat for 8–10 minutes, stirring occasionally.Ensure product is piping hot before serving.",
  },
  {
    id: "efo-egusi",
    slug: "efo-egusi",
    name: "Efo Egusi",
    tagline: "Authentic Nigerian Egusi soup",
    description:
      "Egusi Soup • Net Volume: 1 litre • Fully Cooked • Ready to Heat • Keep Frozen at -18°C or BelowRich • Spicy • Homemade Style (No Artificial colours or Preservatives) • Produced in a Home Kitchen in the UK",
    shortDescription: "Authentic Nigerian Egusi soup",
    price: 70,
    size: "1 Litre",
    image: "/assets/images/Egus.png",
    ingredients: [
      "Egusi (Melon Seeds)",
      "assorted meats (beef, tripe, cow foot)",
      "Palm oil",
      "smoked dried fish (FISH)",
      "stockfish (FISH)",
      " crayfish (CRUSTACEANS)",
      "scotch bonnet peppers",
      "onions",
      "seasoning (contains SOYA)",
      "salt",
      "spices",
    ],
    allergens: ["Fish", "Crustaceans", "Soya"],
    mayContain: ["Nuts", "Gluten", "Milk"],
    servingSuggestions: [
      "Amala",
      "Rice",
      "Pounded yam",
      "Eba (garri)",
      "Semolina",
      "Fufu",
    ],
    storageInstructions:
      "Do not refreeze after thawing. Once thawed, keep refrigerated and consume within 2–3 days",
    heatingInstructions:
      "Thaw in refrigerator overnight OR use microwave defrost setting.Heat in a saucepan over medium heat for 8–10 minutes, stirring occasionally.Ensure product is piping hot before serving.",
  },
  {
    id: "ayamase",
    slug: "ayamase",
    name: "Ayamase",
    tagline: "Rich spicy and savory green bell pepper stew",
    description:
      "Frozen Ayamase stew • Net volume: 1 Litre • Fully Cooked • Ready to Heat • Keep Frozen at -18°C or BelowRich • Spicy • Bold • Homemade Style (No Artificial colours or Preservatives) • Produced in a Home Kitchen in the UK",
    shortDescription: "Rich spicy and savory green bell pepper stew",
    price: 85,
    size: "1 Litre",
    image: "/assets/images/Ayam.png",
    ingredients: [
      "Assorted meats (Beef, Tripe and cow skin)",
      "Green Bell Peppers",
      "Scotch Bonnet",
      "green peppers",
      "Onions",
      "palm oil",
      "locust beans",
      "seasoning",
      "salt",
    ],
    allergens: ["Fish", "Crustaceans", "Soya"],
    mayContain: ["Nuts", "Gluten", "Milk"],
    servingSuggestions: [
      "Rice",
      "Beans",
      "Yam",
      "Bread",
      "Fried plantain",
      "Boiled Plantain",
      "Pasta"
    ],
    storageInstructions:
      "Do not refreeze after thawing. Once thawed, keep refrigerated and consume within 2–3 days",
    heatingInstructions:
      "Thaw in refrigerator overnight OR use microwave defrost setting.Heat in a saucepan over medium heat for 8–10 minutes, stirring occasionally.Ensure product is piping hot before serving.",
  },
  {
    id: "buka-stew",
    slug: "buka-stew",
    name: "Buka Stew",
    tagline: "A rich and flavorful Nigerian Stew",
    description:
      "Frozen assorted meat in stew • Net Volume: 1 Litre • Fully Cooked • Ready to Heat • Keep Frozen at -18°C or BelowRich • Spicy • Homemade Style (No Artificial colours or Preservatives) • Produced in a Home Kitchen in the UK",
    shortDescription: "A rich and flavorful Nigerian Stew",
    price: 85,
    size: "1 Litre",
    image: "/assets/images/Bukas.png",
    ingredients: [
      "Assorted meats (Beef, Tripe and cow skin)",
      "Fresh bell peppers (red, green, yellow)",
      "Scotch bonnet",
      "Tomatoes",
      "Tomato paste",
      "Onions",
      "Vegetable oil",
      "Seasoning",
      "Salt",
      "Curry powder",
      "Thyme",
      "Black pepper",
      "Spices"
    ],
    allergens: ["Beef"],
    mayContain: ["Nuts", "Milk", "Soya", "Gluten"],
    servingSuggestions: [
      "Spaghetti or pasta",
      "Rice",
      "Mash potatoes",
      "Yam",
      "Toasted Bread",
      "Fried Plantain"
    ],
    storageInstructions:
      "Do not refreeze after thawing. Once thawed, keep refrigerated and consume within 2–3 days",
    heatingInstructions:
      "Thaw in refrigerator overnight OR use microwave defrost setting.Heat in a saucepan over medium heat for 8–10 minutes, stirring occasionally.Ensure product is piping hot before serving.",
  },
  {
    id: "ila-asepo",
    slug: "ila-asepo",
    name: "Ila Asepo",
    tagline: "A traditional one-pot Nigerian soup",
    description:
      "Frozen Ila asepo • Net Volume: 1 Litre • Fully Cooked • Ready to Heat • Keep Frozen at -18°C or BelowRich • Spicy • Homemade Style (No Artificial colours or Preservatives) • Produced in a Home Kitchen in the UK",
    shortDescription: "A traditional one-pot Nigerian soup.",
    price: 70,
    size: "1 Litre",
    image: "/assets/images/Ila Asepo.png",
    ingredients: [
      "Okra (Ila)",
      "assorted meats (beef, tripe, cow foot)",
      "palm oil",
      "smoked dried fish (FISH)",
      "stockfish (FISH)",
      "scotch bonnet",
      "crayfish (CRUSTACEANS)",
      "seasoning (contains SOYA)",
      "salt",
      "spices"
    ],
    allergens: ["Fish", "Crustaceans", "Soya"],
    mayContain: ["Nuts", "Gluten", "Milk"],
    servingSuggestions: [
      "Amala",
      "Pounded yam",
      "Eba (garri)",
      "Semolina",
      "Fufu"
    ],
    storageInstructions:
      "Do not refreeze after thawing. Once thawed, keep refrigerated and consume within 2–3 days",
    heatingInstructions:
      "Thaw in refrigerator overnight OR use microwave defrost setting.Heat in a saucepan over medium heat for 8–10 minutes, stirring occasionally.Ensure product is piping hot before serving.",
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
