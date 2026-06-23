import { siteConfig } from "./site";

export const aboutSideNav = [
  { label: "Our story.", href: "#our-story" },
  { label: "Our team.", href: "#our-team" },
  { label: "Ready soups.", href: "/ready-to-eat-soups" },
] as const;

export const ourStory = {
  paragraphs: [
    {
      text: "Dotch Flavours Foods began with a simple frustration: life was getting busier, but the craving for real, home-cooked African food never went away. Mrs Abimbola Olurin started cooking larger batches for friends and family — soups slow-simmered, stews rich with spice, flavours that tasted like home.",
    },
    {
      text: "Word spread. What started as shared tubs in freezers became a mission to make authentic, high-quality African meals accessible across the UK. Today our range includes ",
      highlights: [
        { label: "ready-to-eat soups", href: "/ready-to-eat-soups" },
        { label: "sauces", href: "/shop" },
        { label: "stews", href: "/our-menu" },
      ],
      textAfter:
        " — prepared in small batches, frozen at peak freshness, and delivered ready for your freezer. We are more than a food brand; we are a bridge between heritage and modern life.",
    },
  ],
} as const;

export const founder = {
  name: "Mrs Abimbola Olurin",
  role: "Founder",
  company: siteConfig.name,
  image: "/assets/images/team/pic1.jpg",
  imageAlt: "Mrs Abimbola Olurin, founder of Dotch Flavours Foods",
  quote:
    "Our food only makes sense if it is a faithful witness of its time — honest flavour, prepared with care, ready when life gets busy.",
} as const;

export const aboutImages = {
  hero: {
    src: "/assets/images/gallery/grid/pic2.jpg",
    alt: "Overhead view of the Dotch Flavours Foods kitchen at work",
  },
  founder: {
    src: "/assets/images/gallery/grid/pic1.jpg",
    alt: "Behind the scenes at Dotch Flavours Foods",
  },
} as const;
