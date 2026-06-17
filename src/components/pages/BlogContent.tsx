"use client";

import Image from "next/image";
import Link from "next/link";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { HoverCard } from "@/components/motion/HoverCard";
import { Reveal } from "@/components/motion/Reveal";

const posts = [
  { title: "10 Best Dishes to Try This Season", image: "/assets/images/blog/grid/pic1.jpg" },
  { title: "How We Source Fresh Ingredients", image: "/assets/images/blog/grid/pic2.jpg" },
  { title: "Behind the Scenes in Our Kitchen", image: "/assets/images/blog/grid/pic3.jpg" },
];

export function BlogGrid() {
  return (
    <section className="py-16">
      <StaggerContainer className="container-fluid grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <StaggerItem key={post.title}>
            <HoverCard className="overflow-hidden rounded-2xl border border-surface bg-white shadow-sm">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={post.image} alt={post.title} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="mb-3 text-lg font-semibold">
                  <Link href="/blog/detail" className="hover:text-primary">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-sm text-title/70">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </HoverCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}

export function BlogDetailContent() {
  return (
    <article className="py-16">
      <Reveal className="container-fluid max-w-3xl">
        <Image
          src="/assets/images/blog/grid/pic1.jpg"
          alt="Blog post"
          width={900}
          height={500}
          className="mb-8 w-full rounded-2xl object-cover"
        />
        <h2 className="mb-4 text-3xl font-bold">10 Best Dishes to Try This Season</h2>
        <p className="mb-4 text-title/70">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </p>
        <p className="text-title/70">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </p>
      </Reveal>
    </article>
  );
}
