import { formatPrice } from "./site";

export type NavItem = {
  label: string;
  href?: string;
  children?: NavItem[];
};
export const mainNav: NavItem[] = [
  {
    label: "Home",
    children: [
      { label: "Home", href: "/" },
    ],
  },
  { label: "About Us", href: "/about-us" },
  { label: "Ready to Eat Soups", href: "/ready-to-eat-soups" },
  {
    label: "Blogs",
    children: [
      { label: "Blog Grid", href: "/blog" },
      { label: "Blog Detail", href: "/blog/detail" },
    ],
  },
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

export const menuItems = [
  { name: "Burger", description: "Delicious and Spicy", price: formatPrice(10), image: "/assets/images/menu-small/pic1.png" },
  { name: "Hot Rice", description: "Delicious and Spicy", price: formatPrice(15), image: "/assets/images/menu-small/pic2.png" },
  { name: "Momos", description: "Delicious and Spicy", price: formatPrice(25), image: "/assets/images/menu-small/pic3.png" },
  { name: "Pasta", description: "Delicious and Spicy", price: formatPrice(45), image: "/assets/images/menu-small/pic4.png" },
  { name: "Panner", description: "Delicious and Spicy", price: formatPrice(20), image: "/assets/images/menu-small/pic5.png" },
  { name: "Soya Rice", description: "Delicious and Spicy", price: formatPrice(90), image: "/assets/images/menu-small/pic6.png" },
];

export const todaysMenu = [
  { name: "Jollof Rice", description: "Lorem ipsum dolor sit amet, dipiscing elit, sed", price: formatPrice(35), image: "/assets/images/gallery/grid2/pic2.jpg" },
  { name: "Egusi Soup", description: "Lorem ipsum dolor sit amet, dipiscing elit, sed", price: formatPrice(55), image: "/assets/images/gallery/grid2/pic5.jpg" },
  { name: "Vegetable Soup", description: "Lorem ipsum dolor sit amet, dipiscing elit, sed", price: formatPrice(25), image: "/assets/images/gallery/grid2/pic4.jpg" },
  { name: "Ogbono Soup", description: "Lorem ipsum dolor sit amet, dipiscing elit, sed", price: formatPrice(90), image: "/assets/images/gallery/grid2/pic6.jpg" },
];

export const readyToEatSoups = [
  { name: "Egusi Soup", description: "Rich melon seed soup with leafy greens and seasoned protein.", price: formatPrice(18), image: "/assets/images/gallery/grid2/pic4.jpg" },
  { name: "Ogbono Soup", description: "Silky draw soup with a deep, nutty flavour — heat and serve.", price: formatPrice(16), image: "/assets/images/gallery/grid2/pic2.jpg" },
  { name: "Pepper Soup", description: "Bold, aromatic broth — perfect as a starter or light meal.", price: formatPrice(14), image: "/assets/images/gallery/grid2/pic5.jpg" },
  { name: "Vegetable Soup", description: "Wholesome mix of fresh vegetables in a savoury base.", price: formatPrice(15), image: "/assets/images/gallery/grid2/pic6.jpg" },
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
