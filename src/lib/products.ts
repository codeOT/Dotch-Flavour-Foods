import { formatPrice } from "./site";

export type ProductCategory = "sauces" | "soups-and-stews";

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  shortDescription: string;
  image: string;
  ingredients: string[];
  allergens: string[];
  mayContain?: string[];
  storage: string;
};

export const productCategories: {
  id: ProductCategory;
  label: string;
  description: string;
}[] = [
    {
      id: "sauces",
      label: "Sauces",
      description: "Bold, ready-to-use sauces for quick midweek meals.",
    },
    {
      id: "soups-and-stews",
      label: "Soups and Stews",
      description: "Slow-cooked flavour, ready to heat and serve.",
    },
  ];

export const catalogProducts: Product[] = [

  {
    id: "Efo-egusi",
    name: "Efo Egusi ",
    category: "soups-and-stews",
    price: 70,
    shortDescription: "Authentic Nigerian Egusi soup",
    image: "/assets/images/egusi.jpg",
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
    storage: "Do not refreeze after thawing. Once thawed, keep refrigerated and consume within 2–3 days",
  },
  {
    id: "Ila-asepo",
    name: "Ila Asepo",
    category: "soups-and-stews",
    price: 70,
    shortDescription: "A traditional one-pot Nigerian soup",
    image: "/assets/images/ilaasepo.jpeg",
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
    storage: "Do not refreeze after thawing. Once thawed, keep refrigerated and consume within 2–3 days",
  },

  {
    id: "Efo-riro",
    name: "Efo Riro",
    category: "soups-and-stews",
    price: 70,
    shortDescription: "A rich vibrant Nigerian spinach stew",
    image: "/assets/images/vg stew r.jpg",
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
    storage: "Do not refreeze after thawing. Once thawed, keep refrigerated and consume within 2–3 days",
  },
];

export function getProductsByCategory(category: ProductCategory): Product[] {
  return catalogProducts.filter((product) => product.category === category);
}

export function getProductById(id: string): Product | undefined {
  return catalogProducts.find((product) => product.id === id);
}

export function formatProductPrice(product: Product): string {
  return formatPrice(product.price);
}
