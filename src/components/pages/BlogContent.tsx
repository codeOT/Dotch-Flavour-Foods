"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HoverCard } from "@/components/motion/HoverCard";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import {
  blogCategories,
  blogPosts,
  getCategoryLabel,
  type BlogCategory,
  type BlogPost,
} from "@/lib/blog";
import { slideLeft, slideRight } from "@/lib/motion";
import { siteConfig } from "@/lib/site";

function BlogMeta({ post }: { post: BlogPost }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-title/55">
      <span className="inline-flex items-center gap-1.5">
        <Calendar className="h-3.5 w-3.5" />
        {post.date}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock className="h-3.5 w-3.5" />
        {post.readTime}
      </span>
    </div>
  );
}

function CategoryBadge({ category }: { category: BlogCategory }) {
  return (
    <span className="inline-block rounded-full bg-secondary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-secondary">
      {getCategoryLabel(category)}
    </span>
  );
}

function FeaturedPostCard({ post }: { post: BlogPost }) {
  return (
    <HoverCard className="h-full">
      <article className="group grid overflow-hidden rounded-3xl border border-surface bg-white shadow-sm lg:grid-cols-2">
        <Link
          href={`/blog/detail?slug=${post.slug}`}
          className="relative block aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[22rem]"
        >
          <motion.div
            className="relative h-full min-h-[16rem] w-full"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-primary-dark/10" />
          <span className="absolute left-4 top-4 rounded-full bg-secondary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            Featured
          </span>
        </Link>

        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <CategoryBadge category={post.category} />
          <h2 className="mt-4 text-2xl font-bold leading-tight text-title sm:text-3xl">
            <Link href={`/blog/detail?slug=${post.slug}`} className="transition hover:text-primary">
              {post.title}
            </Link>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-title/70 sm:text-base">{post.excerpt}</p>
          <div className="mt-5">
            <BlogMeta post={post} />
          </div>
          <p className="mt-4 text-sm text-title/60">
            By <span className="font-semibold text-title">{post.author}</span>
            <span className="text-title/45"> · {post.authorRole}</span>
          </p>
          <div className="mt-6">
            <Button href={`/blog/detail?slug=${post.slug}`} variant="outline">
              Read article
            </Button>
          </div>
        </div>
      </article>
    </HoverCard>
  );
}

function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <HoverCard className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-surface bg-white shadow-sm transition hover:border-primary/20 hover:shadow-lg">
        <Link href={`/blog/detail?slug=${post.slug}`} className="relative block aspect-[16/10] overflow-hidden">
          <motion.div
            className="relative h-full w-full"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/55 via-primary-dark/10 to-transparent opacity-80 transition group-hover:opacity-100" />
          <div className="absolute bottom-4 left-4 right-4">
            <CategoryBadge category={post.category} />
          </div>
        </Link>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <BlogMeta post={post} />
          <h3 className="mt-3 text-lg font-bold leading-snug text-title">
            <Link href={`/blog/detail?slug=${post.slug}`} className="transition hover:text-primary">
              {post.title}
            </Link>
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-title/70">{post.excerpt}</p>
          <div className="mt-5 flex items-center justify-between gap-3 border-t border-surface pt-4">
            <p className="text-xs font-medium text-title/60">{post.author}</p>
            <Link
              href={`/blog/detail?slug=${post.slug}`}
              className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-secondary transition hover:gap-2"
            >
              Read
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </article>
    </HoverCard>
  );
}

export function BlogGrid() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "all">("all");
  const [query, setQuery] = useState("");

  const featuredPost = blogPosts.find((post) => post.featured) ?? blogPosts[0];

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return blogPosts.filter((post) => {
      if (post.id === featuredPost.id) return false;

      const matchesCategory = activeCategory === "all" || post.category === activeCategory;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        post.title.toLowerCase().includes(normalizedQuery) ||
        post.excerpt.toLowerCase().includes(normalizedQuery) ||
        post.author.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, featuredPost.id, query]);

  return (
    <>
     

      <section className="py-12 sm:py-16">
        <div className="container-fluid min-w-0">
          <Reveal className="mb-8 flex flex-col gap-6 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary">
                Latest articles
              </p>
              <h2 className="text-2xl font-bold sm:text-3xl">Browse the blog</h2>
            </div>
          </Reveal>

          <Reveal className="mb-8 flex flex-wrap gap-2">
            {blogCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeCategory === category.id
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "bg-white text-title hover:bg-surface"
                }`}
              >
                {category.label}
              </button>
            ))}
          </Reveal>

          {filteredPosts.length > 0 ? (
            <StaggerContainer
              key={`${activeCategory}-${query}`}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredPosts.map((post) => (
                <StaggerItem key={post.id}>
                  <BlogPostCard post={post} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <Reveal className="rounded-2xl border border-dashed border-surface bg-surface/30 px-6 py-16 text-center">
              <p className="text-lg font-semibold text-title">No articles found</p>
              <p className="mt-2 text-sm text-title/60">
                Try a different search term or category.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveCategory("all");
                }}
                className="mt-5 text-sm font-semibold text-secondary hover:underline"
              >
                Clear filters
              </button>
            </Reveal>
          )}
        </div>
      </section>

      <section className="bg-primary-dark py-14 text-white sm:py-16">
        <div className="container-fluid min-w-0">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              Stay in the loop
            </p>
            <h2 className="mb-3 text-2xl font-bold sm:text-3xl">Fresh stories in your inbox</h2>
            <p className="mb-6 text-sm text-white/75 sm:text-base">
              Get recipes, offers, and kitchen tips from {siteConfig.name}. No spam — just good food
              talk.
            </p>
            <form
              className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
              onSubmit={(event) => event.preventDefault()}
            >
              <input
                type="email"
                placeholder="you@example.com"
                className="flex-1 rounded-md border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-white/50 focus:border-secondary focus:ring-2 focus:ring-secondary/20"
              />
              <Button type="submit" variant="white" className="shrink-0">
                Subscribe
              </Button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export function BlogDetailContent({ post }: { post: BlogPost }) {
  return (
    <article>
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-dark via-forest to-primary-dark py-14 text-white sm:py-20">
        <div className="container-fluid relative min-w-0 max-w-4xl">
          <Reveal>
            <Link
              href="/blog"
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-white/75 transition hover:text-white"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              Back to blog
            </Link>
            <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-secondary">
              {getCategoryLabel(post.category)}
            </span>
            <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
              {post.excerpt}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/70">
              <span>
                By <span className="font-semibold text-white">{post.author}</span>
              </span>
              <BlogMeta post={post} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <Reveal className="container-fluid max-w-3xl">
          <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-3xl shadow-lg">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
          <div className="prose prose-neutral max-w-none text-title/80">
            <p className="mb-4 text-base leading-relaxed">
              At {siteConfig.name}, we believe great food starts long before it reaches your table.
              This piece shares a little more about how we approach flavour, tradition, and the
              everyday moments that make a meal memorable.
            </p>
            <p className="mb-4 text-base leading-relaxed">
              Whether you are reheating a ready-made soup or cooking from scratch, the same principles
              apply: quality ingredients, patience, and respect for the recipes passed down through
              generations.
            </p>
            <p className="text-base leading-relaxed">
              We will be sharing more stories like this on the blog — from sourcing visits to chef
              tips and seasonal favourites. Check back soon for the next article.
            </p>
          </div>
        </Reveal>
      </section>
    </article>
  );
}
