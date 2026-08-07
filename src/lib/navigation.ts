import { formatPrice } from "./site";
import type { LitreSize, PricesByLitre } from "./litre-sizes";

export type NavItem = {
  label: string;
  href?: string;
  children?: NavItem[];
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  /** Base / display price (smallest available size, or unit price). */
  priceValue: number;
  image: string;
  /** Available tray sizes. Defaults to sizes present in pricesByLitre, else 2/4/6L. */
  litreSizes?: LitreSize[];
  /** Exact prices per litre size from the official price list. */
  pricesByLitre?: PricesByLitre;
  /** "unit" for items sold per wrap/piece (e.g. Moi Moi). */
  pricingMode?: "litres" | "unit";
  unitLabel?: string;
  category?: string;
};

function tray(
  id: string,
  name: string,
  description: string,
  image: string,
  prices: PricesByLitre,
  category: string,
): MenuItem {
  const litreSizes = ([2, 4, 6] as const).filter((size) => prices[size] != null);
  const priceValue = prices[litreSizes[0]] ?? 0;
  return {
    id,
    name,
    description,
    image,
    price: formatPrice(priceValue),
    priceValue,
    litreSizes,
    pricesByLitre: prices,
    pricingMode: "litres",
    category,
  };
}

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Ready Soups", href: "/ready-to-eat-soups" },
  { label: "Shop", href: "/shop" },
  { label: "Catering", href: "/catering" },
  { label: "Experience", href: "/experience" },
  { label: "Contact Us", href: "/contact-us" },
];

export const footerLinks = {
  ourLinks: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about-us" },
    { label: "Meet Abi", href: "/meet-abi" },
    { label: "Ready Soups", href: "/ready-to-eat-soups" },
    { label: "Shop", href: "/shop" },
    { label: "Fresh Menu", href: "/fresh-menu" },
    { label: "Catering", href: "/catering" },
    { label: "Corporate", href: "/corporate" },
    { label: "Wholesale", href: "/wholesale" },
    { label: "Experience", href: "/experience" },
    { label: "Merchandise", href: "/merchandise" },
    { label: "Request a Quote", href: "/request-a-quote" },
    { label: "Blog", href: "/blog" },
  ],
  helpCenter: [
    { label: "FAQ", href: "/faq" },
    { label: "My Orders", href: "/orders" },
    { label: "Contact Us", href: "/contact-us" },
    { label: "Delivery Policy", href: "/delivery-terms" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Cookie Policy", href: "/cookie-policy" },
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "Catering Booking Policy", href: "/catering-booking-policy" },
    { label: "Allergens & Food Safety", href: "/allergens" },
    { label: "Storage & Heating", href: "/storage-heating" },
    { label: "Disclaimer", href: "/disclaimer" },
    { label: "Accessibility", href: "/accessibility" },
    { label: "Email & Newsletter Terms", href: "/email-newsletter-terms" },
  ],
};

/** Official fresh-food tray pricing (2L / 4L / 6L). */
export const menuItems: MenuItem[] = [
  tray(
    "Chicken-Beef-Stew",
    "Chicken & beef in stew",
    "Stews and sauces",
    "/assets/images/cbs.jpeg",
    { 2: 60, 4: 90, 6: 135 },
    "Stews and sauces",
  ),
  tray(
    "Buka-stew",
    "Buka Stew",
    "Stews and sauces",
    "/assets/images/bstew.jpg",
    { 2: 85, 4: 125, 6: 180 },
    "Stews and sauces",
  ),
  tray(
    "Ayamase-Ofada-Sauce",
    "Ayamase / Ofada",
    "Stews and sauces",
    "/assets/images/aaa.png",
    { 2: 85, 4: 125, 6: 180 },
    "Stews and sauces",
  ),
  tray(
    "Efo-riro",
    "Efo riro",
    "Soups",
    "/assets/images/efo.jpg",
    { 2: 70, 4: 100, 6: 150 },
    "Soups",
  ),
  tray(
    "Efo-Egusi",
    "Efo Egusi",
    "Soups",
    "/assets/images/egusi.jpg",
    { 2: 70, 4: 100, 6: 150 },
    "Soups",
  ),
  tray(
    "Ila-Alasepo",
    "Ila asepo",
    "Soups",
    "/assets/images/ilaasepo.jpeg",
    { 2: 70, 4: 100, 6: 150 },
    "Soups",
  ),
  tray(
    "Ogbono",
    "Ogbono",
    "Soups",
    "/assets/images/ogbono r.jpg",
    { 2: 80, 4: 120, 6: 160 },
    "Soups",
  ),
  tray(
    "pepper-fish",
    "Fried Peppered Fish (Hake Fish)",
    "Protein and sides",
    "/assets/images/fpepper fish r.jpg",
    { 2: 75, 4: 110, 6: 170 },
    "Protein and sides",
  ),
  tray(
    "pepper-gizzard",
    "Peppered Gizzard",
    "Protein and sides",
    "/assets/images/peppered-gizzard r.jpg",
    { 2: 70, 4: 100, 6: 150 },
    "Protein and sides",
  ),
  tray(
    "pepper-turkey",
    "Peppered Turkey",
    "Protein and sides",
    "/assets/images/pfturkey.jpg",
    { 2: 70, 4: 100, 6: 150 },
    "Protein and sides",
  ),
  tray(
    "Gizdodo",
    "Gizdodo",
    "Protein and sides",
    "/assets/images/gizd.jpeg",
    { 2: 70, 4: 100, 6: 150 },
    "Protein and sides",
  ),
  tray(
    "Ewa-Riro-Ewa-Agoyin",
    "Ewa Riro / Ewa Agoyin",
    "Protein and sides",
    "/assets/images/ewa.png",
    { 2: 70, 4: 100, 6: 150 },
    "Protein and sides",
  ),
  {
    id: "Moi-Moi",
    name: "MoiMoi",
    description: "£3.00 per wrap — minimum order applies",
    price: formatPrice(3),
    priceValue: 3,
    image: "/assets/images/moimoi.jpg",
    pricingMode: "unit",
    unitLabel: "per wrap",
    category: "Protein and sides",
  },
  tray(
    "Asaro-sauce",
    "Asaro with Sauce",
    "Traditional dishes",
    "/assets/images/porridge.jpg",
    { 2: 70, 4: 100, 6: 150 },
    "Traditional dishes",
  ),
  tray(
    "Abula-combo",
    "Abula Combo",
    "Ewedu, Gbegiri & assorted meat in stew, Buka style — available in 4L and 6L",
    "/assets/images/amm.jpg",
    { 4: 300, 6: 450 },
    "Traditional dishes",
  ),
];

export const todaysMenu: MenuItem[] = [
  {
    id: "jollof-rice",
    name: "Jollof Rice",
    description: "Party-style jollof with deep smoky flavour.",
    price: formatPrice(35),
    priceValue: 35,
    image: "/assets/images/jollof new.jpg",
  },
  {
    id: "egusi-soup-today",
    name: "Egusi Soup",
    description: "Rich melon seed soup with leafy greens.",
    price: formatPrice(55),
    priceValue: 55,
    image: "/assets/images/egusi.jpg",
  },
  {
    id: "vegetable-soup-today",
    name: "Vegetable Soup",
    description: "Hearty greens in a savoury pepper base.",
    price: formatPrice(25),
    priceValue: 25,
    image: "/assets/images/efo.jpg",
  },
  {
    id: "ogbono-soup-today",
    name: "Ogbono Soup",
    description: "Silky draw soup with a deep, nutty flavour.",
    price: formatPrice(90),
    priceValue: 90,
    image: "/assets/images/ogbono.jpg",
  },
];

export const features = [
  {
    title: "Authentic Flavour",
    description: "Traditional recipes, cooked in small batches and frozen at peak freshness.",
  },
  {
    title: "Ready in Minutes",
    description: "Heat and serve — restaurant-quality Nigerian soups without the wait.",
  },
  {
    title: "Made for Sharing",
    description: "From family meals to catering trays — sized for real gatherings.",
  },
];




