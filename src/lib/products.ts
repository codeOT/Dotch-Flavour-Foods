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
    id: "pepper-sauce",
    name: "Dotch Pepper Sauce",
    category: "sauces",
    price: 4.5,
    shortDescription: "Smoky chilli pepper sauce with aromatic spices.",
    image: "/assets/images/pepper sauce.jpg",
    ingredients: [
      "Red bell peppers",
      "Scotch bonnet chillies",
      "Onions",
      "Tomatoes",
      "Palm oil",
      "Garlic",
      "Ginger",
      "Sea salt",
      "Mixed herbs",
    ],
    allergens: ["None declared"],
    mayContain: ["Celery", "Mustard"],
    storage: "Keep refrigerated at 0–5°C. Consume within 3 days of opening.",
  },
  {
    id: "tomato-stew-base",
    name: "Tomato Stew Base",
    category: "sauces",
    price: 5.25,
    shortDescription: "Rich tomato base for rice, pasta, and grilled dishes.",
    image: "/assets/images/tomato stew.jpg",
    ingredients: [
      "Tomatoes",
      "Red onions",
      "Red peppers",
      "Vegetable oil",
      "Garlic",
      "Ginger",
      "Bay leaf",
      "Sea salt",
      "Black pepper",
    ],
    allergens: ["None declared"],
    storage: "Keep refrigerated at 0–5°C. Best consumed within 4 days of opening.",
  },
  {
    id: "jollof-sauce",
    name: "Jollof Cooking Sauce",
    category: "sauces",
    price: 5.75,
    shortDescription: "Authentic West African jollof sauce — just add rice.",
    image: "/assets/images/jollof small.jpg",
    ingredients: [
      "Tomatoes",
      "Red peppers",
      "Onions",
      "Tomato purée",
      "Vegetable stock",
      "Thyme",
      "Curry powder",
      "Nutmeg",
      "Sea salt",
    ],
    allergens: ["Celery (in stock)"],
    mayContain: ["Mustard", "Sulphites"],
    storage: "Keep refrigerated at 0–5°C. Use within 3 days once opened.",
  },
  {
    id: "egusi-soup",
    name: "Egusi Soup",
    category: "soups-and-stews",
    price: 8.5,
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
    id: "ogbono-soup",
    name: "Ogbono Soup",
    category: "soups-and-stews",
    price: 8.0,
    shortDescription: "Silky draw soup with a deep, nutty flavour.",
    image: "/assets/images/ogbono.jpg",
    ingredients: [
      "Ground ogbono seeds",
      "Assorted meat stock",
      "Palm oil", 
      "Onions",
      "Spinach",
      "Crayfish",
      "Locust beans",
      "Sea salt",
      "Chilli",
    ],
    allergens: ["Fish", "Crustaceans", "Soya (locust beans)"],
    storage: "Keep refrigerated at 0–5°C. Consume within 3 days of opening.",
  },
  {
    id: "pepper-soup",
    name: "Pepper Soup",
    category: "soups-and-stews",
    price: 7.5,
    shortDescription: "Aromatic broth with traditional pepper soup spices.",
    image: "/assets/images/pepper sauce.jpg",
    ingredients: [
      "Chicken stock",
      "Pepper soup spice blend",
      "Onions",
      "Ginger",
      "Garlic",
      "Scent leaves",
      "Scotch bonnet",
      "Sea salt",
    ],
    allergens: ["Celery (in stock)"],
    mayContain: ["Mustard"],
    storage: "Keep refrigerated at 0–5°C. Heat until piping hot before serving.",
  },
  {
    id: "vegetable-stew",
    name: "Vegetable Stew",
    category: "soups-and-stews",
    price: 7.25,
    shortDescription: "Hearty mixed vegetable stew in a savoury tomato base.",
    image: "/assets/images/efo.jpg",
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
