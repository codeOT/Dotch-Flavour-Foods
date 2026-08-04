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
    shortDescription: "Melon seed soup with leafy greens and seasoned stock.",
    image: "/assets/images/egusi.jpg",
    ingredients: [
      "Ground egusi (melon seeds)",
      "Spinach",
      "Palm oil",
      "Onions",
      "Stockfish",
      "Crayfish",
      "Scotch bonnet",
      "Seasoning cube",
      "Sea salt",
    ],
    allergens: ["Fish", "Crustaceans"],
    mayContain: ["Celery", "Mustard"],
    storage: "Keep refrigerated at 0–5°C. Heat thoroughly before serving.",
  },
  {
    id: "Ila-asepo",
    name: "Ila Asepo",
    category: "soups-and-stews",
    price: 70,
    shortDescription: "Rich, hearty okra soup delight.",
    image: "/assets/images/Ila Asepo f.png",
    ingredients: [
      "Fresh okra",
      "Assorted meat stock",
      "Palm oil",
      "Onions",
      "Crayfish",
      "Locust beans",
      "Spinach",
      "Smoked fish",
      "Sea salt",
      "Chilli",
    ],
    allergens: ["Fish", "Crustaceans", "Soya (locust beans)"],
    storage: "Keep refrigerated at 0–5°C. Consume within 3 days of opening.",
  },

  {
    id: "Efo-riro",
    name: "Efo Riro",
    category: "soups-and-stews",
    price: 70,
    shortDescription: "Hearty mixed vegetable stew in a savoury tomato base.",
    image: "/assets/images/vg stew r.jpg",
    ingredients: [
      "Carrots",
      "Green beans",
      "Potatoes",
      "Tomatoes",
      "Red peppers",
      "Onions",
      "Vegetable oil",
      "Vegetable stock",
      "Thyme",
      "Sea salt",
    ],
    allergens: ["Celery (in stock)"],
    storage: "Keep refrigerated at 0–5°C. Suitable for home freezing.",
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
