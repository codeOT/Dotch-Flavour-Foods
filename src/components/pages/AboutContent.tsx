"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { aboutImages, aboutSideNav, founder, ourStory } from "@/lib/about";

function StoryParagraph({
  paragraph,
}: {
  paragraph: (typeof ourStory.paragraphs)[number];
}) {
  if (!("highlights" in paragraph)) {
    return <p>{paragraph.text}</p>;
  }

  return (
    <p>
      {paragraph.text}
      {paragraph.highlights.map((item, index) => (
        <span key={item.label}>
          <Link href={item.href} className="text-secondary transition hover:text-accent">
            {item.label}
          </Link>
          {index < paragraph.highlights.length - 1 ? ", " : ""}
        </span>
      ))}
      {paragraph.textAfter}
    </p>
  );
}

export function AboutContent() {
  return (
    <article className="bg-white pb-20 pt-10 sm:pb-28 sm:pt-14">
      <div className="container-fluid min-w-0">
        <Reveal>
          <h1 className="text-center text-[clamp(2.75rem,9vw,5.75rem)] font-bold uppercase leading-none tracking-tight text-title">
            About Us.
          </h1>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-[minmax(9rem,16%)_1fr] lg:gap-16 xl:gap-24">
          <Reveal className="lg:pt-1">
            <nav aria-label="About page sections" className="flex flex-row flex-wrap gap-x-6 gap-y-2 lg:flex-col lg:gap-4">
              {aboutSideNav.map((item) =>
                item.href.startsWith("#") ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-sm text-title/45 transition hover:text-title"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-sm text-title/45 transition hover:text-title"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>
          </Reveal>

          <Reveal id="our-story" className="scroll-mt-28 space-y-8 lg:max-w-4xl">
            {ourStory.paragraphs.map((paragraph, index) => (
              <div
                key={index}
                className="text-sm leading-[2] text-title/50 sm:text-[0.95rem]"
              >
                <StoryParagraph paragraph={paragraph} />
              </div>
            ))}
          </Reveal>
        </div>
      </div>

      <Reveal className="mt-14 sm:mt-20">
        <div className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[21/9]">
          <Image
            src={aboutImages.hero.src}
            alt={aboutImages.hero.alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      </Reveal>

      <div
        id="our-team"
        className="container-fluid scroll-mt-28 mt-14 grid min-w-0 items-start gap-10 sm:mt-20 lg:grid-cols-2 lg:gap-16 xl:gap-24"
      >
        <Reveal>
          <blockquote className="max-w-xl">
            <span
              className="mb-2 block font-display text-6xl leading-none text-title sm:text-7xl"
              aria-hidden
            >
              &ldquo;
            </span>
            <p className="font-display text-[clamp(1.65rem,4vw,3rem)] italic leading-[1.35] text-title">
              {founder.quote}
            </p>
            <footer className="mt-8 text-sm text-title/45">
              <p className="font-medium text-title/70">{founder.name}</p>
              <p>
                {founder.role}, {founder.company}
              </p>
            </footer>
          </blockquote>
        </Reveal>

        <Reveal>
          <div className="relative aspect-[4/5] w-full max-w-xl overflow-hidden lg:ml-auto">
            <Image
              src={aboutImages.founder.src}
              alt={aboutImages.founder.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </Reveal>
      </div>
    </article>
  );
}
