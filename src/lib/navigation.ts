import { formatPrice } from "./site";

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
  priceValue: number;
  image: string;
};
export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Ready Soups", href: "/ready-to-eat-soups" },
  { label: "Blogs", href: "/blog" },
  { label: "Contact Us", href: "/contact-us" },
];

export const footerLinks = {
  ourLinks: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about-us" },
    { label: "Services", href: "/services" },
    { label: "Team", href: "/team" },
    { label: "Blog", href: "/blog" },
  ],
  helpCenter: [
    { label: "FAQ", href: "/faq" },
    { label: "Shop", href: "/shop" },
    { label: "Testimonials", href: "/testimonial" },
    { label: "Contact Us", href: "/contact-us" },
  ],
};

export const menuItems: MenuItem[] = [
  { id: "jollof", name: "Party Smokey Jollof", description: "Delicious and Spicy", price: formatPrice(10), priceValue: 10, image: "/assets/images/jollof small.jpg" },
  { id: "fried-rice", name: "Special Fried Rice", description: "Delicious and Spicy", price: formatPrice(15), priceValue: 15, image: "/assets/images/fried rice.jpg" },
  { id: "pepper-fish", name: "Fried Pepper Fish", description: "Delicious and Spicy", price: formatPrice(25), priceValue: 25, image: "/assets/images/pfish small.jpg" },
  { id: "Fish-in-stew", name: "Fresh Fish in Stew", description: "Delicious and Spicy", price: formatPrice(45), priceValue: 45, image: "/assets/images/fish in stew.jpg" },
  { id: "Asaro-sauce", name: "Asaro with Sauce", description: "Delicious and Spicy", price: formatPrice(20), priceValue: 20, image: "/assets/images/porridge.jpg" },
  { id: "Gizdodo", name: "Gizdodo", description: "Delicious and Spicy", price: formatPrice(90), priceValue: 90, image: "/assets/images/gizdodo.jpg" },
  { id: "pepper-gizzard", name: "Peppered Gizzard", description: "Delicious and Spicy", price: formatPrice(90), priceValue: 90, image: "/assets/images/gizzard.jpg" },
  { id: "pepper-turkey", name: "Peppered Fried Turkey", description: "Delicious and Spicy", price: formatPrice(90), priceValue: 90, image: "/assets/images/pfturkey.jpg" },
  { id: "Ogbono", name: "Ogbono", description: "Delicious and Spicy", price: formatPrice(90), priceValue: 90, image: "/assets/images/ogbono.jpg" },
];

export const todaysMenu: MenuItem[] = [
  { id: "jollof-rice", name: "Jollof Rice", description: "Lorem ipsum dolor sit amet, dipiscing elit, sed", price: formatPrice(35), priceValue: 35, image: "/assets/images/jollof.jpg" },
  { id: "egusi-soup-today", name: "Egusi Soup", description: "Lorem ipsum dolor sit amet, dipiscing elit, sed", price: formatPrice(55), priceValue: 55, image: "/assets/images/egusi.jpg" },
  { id: "vegetable-soup-today", name: "Vegetable Soup", description: "Lorem ipsum dolor sit amet, dipiscing elit, sed", price: formatPrice(25), priceValue: 25, image: "/assets/images/efo.jpg" },
  { id: "ogbono-soup-today", name: "Ogbono Soup", description: "Lorem ipsum dolor sit amet, dipiscing elit, sed", price: formatPrice(90), priceValue: 90, image: "/assets/images/ogbono.jpg" },
];

export const readyToEatSoups: MenuItem[] = [
  { id: "egusi-soup-ready", name: "Egusi Soup", description: "Rich melon seed soup with leafy greens and seasoned protein.", price: formatPrice(18), priceValue: 18, image: "/assets/images/gallery/grid2/pic4.jpg" },
  { id: "ogbono-soup-ready", name: "Ogbono Soup", description: "Silky draw soup with a deep, nutty flavour — heat and serve.", price: formatPrice(16), priceValue: 16, image: "/assets/images/gallery/grid2/pic2.jpg" },
  { id: "pepper-soup-ready", name: "Pepper Soup", description: "Bold, aromatic broth — perfect as a starter or light meal.", price: formatPrice(14), priceValue: 14, image: "/assets/images/gallery/grid2/pic5.jpg" },
  { id: "vegetable-soup-ready", name: "Vegetable Soup", description: "Wholesome mix of fresh vegetables in a savoury base.", price: formatPrice(15), priceValue: 15, image: "/assets/images/gallery/grid2/pic6.jpg" },
];
export const features = [
  { title: "Fresh Healthy Food", description: "lorem ipsum dolor shit amet lorem ipsum" },
  { title: "Fast Serve On Table", description: "lorem ipsum dolor shit amet lorem ipsum" },
];

export const services = [
  { title: "Restaurant", description: "Lorem ipsum dolor sit amet, dipiscing elit, sed", image: "/assets/images/gallery/grid/pic1.jpg" },
  { title: "Bar", description: "Lorem ipsum dolor sit amet, dipiscing elit, sed", image: "/assets/images/gallery/grid/pic2.jpg" },
  { title: "Cafe", description: "Lorem ipsum dolor sit amet, dipiscing elit, sed", image: "/assets/images/gallery/grid/pic3.jpg" },
  { title: "Dessert", description: "Lorem ipsum dolor sit amet, dipiscing elit, sed", image: "/assets/images/gallery/grid/pic4.jpg" },
];
