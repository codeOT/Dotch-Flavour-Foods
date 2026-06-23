export type BlogCategory = "recipes" | "culture" | "kitchen" | "tips";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: BlogCategory;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  featured?: boolean;
};

export const blogCategories: {
  id: BlogCategory | "all";
  label: string;
}[] = [
  { id: "all", label: "All posts" },
  { id: "recipes", label: "Recipes" },
  { id: "culture", label: "Culture & stories" },
  { id: "kitchen", label: "Behind the kitchen" },
  { id: "tips", label: "Cooking tips" },
];

export const blogPosts: BlogPost[] = [
  {
    id: "seasonal-dishes",
    slug: "10-best-dishes-to-try-this-season",
    title: "10 Best Dishes to Try This Season",
    excerpt:
      "From smoky jollof to slow-simmered stews — our chef picks the plates worth ordering (or reheating) right now.",
    image: "/assets/images/blog/grid/pic1.jpg",
    category: "recipes",
    author: "Chef Ada",
    authorRole: "Head Chef",
    date: "12 Jun 2026",
    readTime: "6 min read",
    featured: true,
  },
  {
    id: "fresh-ingredients",
    slug: "how-we-source-fresh-ingredients",
    title: "How We Source Fresh Ingredients",
    excerpt:
      "A look at the markets, suppliers, and quality checks behind every Dotch Flavours batch.",
    image: "/assets/images/blog/grid/pic2.jpg",
    category: "kitchen",
    author: "Tunde Okon",
    authorRole: "Operations",
    date: "4 Jun 2026",
    readTime: "5 min read",
  },
  {
    id: "kitchen-behind-scenes",
    slug: "behind-the-scenes-in-our-kitchen",
    title: "Behind the Scenes in Our Kitchen",
    excerpt:
      "Early starts, spice blends, and the small rituals that keep our flavours consistent week after week.",
    image: "/assets/images/blog/grid/pic3.jpg",
    category: "kitchen",
    author: "Chef Ada",
    authorRole: "Head Chef",
    date: "28 May 2026",
    readTime: "4 min read",
  },
  {
    id: "freezer-meal-prep",
    slug: "freezer-friendly-meal-prep-guide",
    title: "Freezer-Friendly Meal Prep Guide",
    excerpt:
      "Stock your freezer with ready-made soups and stews — and still eat well on your busiest nights.",
    image: "/assets/images/blog/grid/pic4.jpg",
    category: "tips",
    author: "Dotch Team",
    authorRole: "Kitchen tips",
    date: "20 May 2026",
    readTime: "7 min read",
  },
  {
    id: "west-african-comfort",
    slug: "west-african-comfort-food-at-home",
    title: "West African Comfort Food at Home",
    excerpt:
      "Why egusi, pepper soup, and ayamase belong on your table — and how to serve them like a pro.",
    image: "/assets/images/blog/grid/pic5.jpg",
    category: "culture",
    author: "Amara Diallo",
    authorRole: "Food writer",
    date: "14 May 2026",
    readTime: "8 min read",
  },
  {
    id: "heat-and-serve",
    slug: "heat-and-serve-without-losing-flavour",
    title: "Heat & Serve Without Losing Flavour",
    excerpt:
      "Our top tips for reheating frozen soups so they taste just as rich as the day they were cooked.",
    image: "/assets/images/blog/grid/pic6.jpg",
    category: "tips",
    author: "Dotch Team",
    authorRole: "Kitchen tips",
    date: "6 May 2026",
    readTime: "3 min read",
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getCategoryLabel(category: BlogCategory): string {
  return blogCategories.find((item) => item.id === category)?.label ?? category;
}
