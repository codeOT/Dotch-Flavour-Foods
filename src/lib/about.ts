import { siteConfig } from "./site";

export const aboutSideNav = [
  { label: "About.", href: "#about" },
  { label: "Our story.", href: "#our-story" },
  { label: "What makes us different.", href: "#what-makes-us-different" },
  { label: "Meet Abi.", href: "/meet-abi" },
  { label: "Ready soups.", href: "/ready-to-eat-soups" },
] as const;

export const aboutIntro = {
  title: "About Dotch Flavour",
  tagline: "Bringing the taste of home to every table.",
  paragraphs: [
    "Dotch Flavour began with a love of cooking and grew into a food brand serving Nigerian food to homes and families across the UK.",
    "We cook the way you would cook for your own family. Traditional recipes, ingredients we are happy to put our name to, and no rushing the parts that matter.",
    "Whether you are planning a celebration, ordering a tray for people you love, feeding yourself after a long day or trying West African food for the first time, we want the meal to be worth sitting down for.",
  ],
} as const;

export const ourStory = {
  title: "Our Story",
  paragraphs: [
    "Dotch Flavour was founded in Nigeria in 2008 by Abi Olurin, though the cooking started a long time before the business did.",
    "For Abi, feeding people has always been how she looks after them. Family gatherings, celebrations, ordinary weeknights. The lesson was the same every time: good food takes patience and a generous hand.",
    "She built a career in project management alongside it. That side of her, the planning and the refusal to let standards slip, is still how Dotch Flavour runs.",
    "When she moved to the United Kingdom she brought the recipes, and an idea with them. Authentic Nigerian food should be easier to get hold of without losing what makes it worth eating in the first place.",
    "Today Dotch Flavour serves customers across the UK.",
  ],
} as const;

export const whatMakesUsDifferent = {
  title: "What Makes Us Different",
  points: [
    {
      title: "Authentic recipes",
      text: "The flavours many of us grew up with, cooked properly.",
    },
    {
      title: "Cooked with care",
      text: "No shortcuts. Every dish is seasoned and cooked the way it should be, even when that takes longer.",
    },
    {
      title: "Made for modern living",
      text: "Life is busy. From fresh catering to our Ready Soups range, we are working on easier ways to get a proper Nigerian meal on the table.",
    },
    {
      title: "A brand you can trust",
      text: "Your tenth order should taste like your first. That consistency is what we have built since 2008.",
    },
  ],
} as const;

export const moreThanFood = {
  title: "More Than Food",
  paragraphs: [
    "We are not just serving meals. We are keeping traditions going and helping people stay close to the flavours that remind them of home.",
    "Catering your celebration or cooking your family dinner, either way we are glad to be at your table.",
  ],
} as const;

export const founder = {
  name: "Abi Olurin",
  role: "Founder",
  company: siteConfig.name,
  image: "/assets/images/Mrs A. Olurin .jpeg",
  imageAlt: "Abi Olurin, founder of Dotch Flavour",
  quote:
    "Good food takes patience and a generous hand.",
} as const;

export const aboutImages = {
  hero: {
    src: "/assets/images/egusi.jpg",
    alt: "A bowl of Dotch Flavour Egusi soup, cooked with care",
  },
  founder: {
    src: "/assets/images/Mrs A. Olurin .jpeg",
    alt: "Abi Olurin, founder of Dotch Flavour",
  },
} as const;
