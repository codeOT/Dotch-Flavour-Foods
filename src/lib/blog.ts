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
    id: "why-ready-soups",
    slug: "why-we-created-ready-soups",
    title: "Why We Created Ready Soups",
    excerpt:
      "Abi on the customer request that became Ready Soups by Dotch Flavour — proper Nigerian meals for busy UK weeks.",
    image: "/assets/images/blog/grid/pic1.jpg",
    category: "culture",
    author: "Mrs Abimbola Olurin",
    authorRole: "Founder",
    date: "20 Jul 2026",
    readTime: "5 min read",
    featured: true,
  },
  {
    id: "freezer-to-table",
    slug: "from-freezer-to-table-in-minutes",
    title: "From Freezer to Table in Minutes",
    excerpt:
      "Storage, thawing, and heating guidance so Ready Soups taste as rich as the day they were cooked.",
    image: "/assets/images/blog/grid/pic6.jpg",
    category: "tips",
    author: "Dotch Flavour Kitchen",
    authorRole: "Customer guide",
    date: "12 Jul 2026",
    readTime: "4 min read",
  },
  {
    id: "nigeria-to-uk",
    slug: "from-nigeria-2008-to-uk-tables",
    title: "From Nigeria in 2008 to UK Tables",
    excerpt:
      "How Dotch Flavour grew from a full table at home into a founder-led food brand built on consistency and care.",
    image: "/assets/images/blog/grid/pic5.jpg",
    category: "culture",
    author: "Mrs Abimbola Olurin",
    authorRole: "Founder",
    date: "2 Jul 2026",
    readTime: "6 min read",
  },
  {
    id: "bundle-guide",
    slug: "how-to-choose-your-ready-soup-bundle",
    title: "How to Choose Your Ready Soup Bundle",
    excerpt:
      "3, 5, 10, or 18 — mix flavours to match your household, with the online minimum of three soups explained.",
    image: "/assets/images/blog/grid/pic4.jpg",
    category: "tips",
    author: "Dotch Flavour Kitchen",
    authorRole: "Ordering tips",
    date: "24 Jun 2026",
    readTime: "3 min read",
  },
  {
    id: "kitchen-standards",
    slug: "what-project-discipline-means-in-our-kitchen",
    title: "What Project Discipline Means in Our Kitchen",
    excerpt:
      "Planning, clear standards, and repeatable flavour — the same lessons from Abi’s PRINCE2 career, applied to every batch.",
    image: "/assets/images/blog/grid/pic3.jpg",
    category: "kitchen",
    author: "Mrs Abimbola Olurin",
    authorRole: "Founder",
    date: "10 Jun 2026",
    readTime: "5 min read",
  },
  {
    id: "hosting-with-dotch",
    slug: "hosting-with-dotch-flavour-catering",
    title: "Hosting with Dotch Flavour Catering",
    excerpt:
      "Private celebrations, office lunches, and tasting moments — how to request a quote and what to expect next.",
    image: "/assets/images/blog/grid/pic2.jpg",
    category: "kitchen",
    author: "Dotch Flavour Kitchen",
    authorRole: "Catering",
    date: "28 May 2026",
    readTime: "4 min read",
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getCategoryLabel(category: BlogCategory): string {
  return blogCategories.find((item) => item.id === category)?.label ?? category;
}
