"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import {
  aboutImages,
  aboutIntro,
  aboutSideNav,
  founder,
  moreThanFood,
  ourStory,
  whatMakesUsDifferent,
} from "@/lib/about";

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
          <Reveal className="lg:sticky lg:top-28 lg:self-start lg:pt-1">
            <nav
              aria-label="About page sections"
              className="flex flex-row flex-wrap gap-x-6 gap-y-2 lg:flex-col lg:gap-4"
            >
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

          <div className="min-w-0 space-y-16 lg:max-w-4xl lg:space-y-20">
            <Reveal id="about" className="scroll-mt-28 space-y-6">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary">
                  {aboutIntro.title}
                </p>
                <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-tight text-title">
                  {aboutIntro.tagline}
                </h2>
              </div>
              {aboutIntro.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-sm leading-[2] text-title/55 sm:text-[0.95rem]"
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>

            <Reveal id="our-story" className="scroll-mt-28 space-y-6">
              <h2 className="text-2xl font-bold text-title sm:text-3xl">{ourStory.title}</h2>
              {ourStory.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-sm leading-[2] text-title/55 sm:text-[0.95rem]"
                >
                  {paragraph}
                </p>
              ))}
              <Button href="/meet-abi" variant="outline" className="mt-2">
                Meet Abi
              </Button>
            </Reveal>

            <Reveal id="what-makes-us-different" className="scroll-mt-28">
              <h2 className="mb-8 text-2xl font-bold text-title sm:text-3xl">
                {whatMakesUsDifferent.title}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {whatMakesUsDifferent.points.map((point) => (
                  <div key={point.title} className="border-t border-surface pt-5">
                    <h3 className="mb-2 text-lg font-semibold text-title">{point.title}</h3>
                    <p className="text-sm leading-relaxed text-title/60">{point.text}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal id="more-than-food" className="scroll-mt-28 space-y-6">
              <h2 className="text-2xl font-bold text-title sm:text-3xl">{moreThanFood.title}</h2>
              {moreThanFood.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-sm leading-[2] text-title/55 sm:text-[0.95rem]"
                >
                  {paragraph}
                </p>
              ))}
              <div className="flex flex-wrap gap-3 pt-2">
                <Button href="/ready-to-eat-soups">Shop Ready Soups</Button>
                <Button href="/request-a-quote" variant="outline">
                  Request a quote
                </Button>
              </div>
            </Reveal>
          </div>
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

      <div className="container-fluid mt-14 grid min-w-0 items-start gap-10 sm:mt-20 lg:grid-cols-2 lg:gap-16 xl:gap-24">
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
              <p className="mt-4">
                <Link href="/meet-abi" className="font-semibold text-primary hover:underline">
                  Read Abi&apos;s full story →
                </Link>
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
              className="object-cover object-[center_18%]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </Reveal>
      </div>
    </article>
  );
}
