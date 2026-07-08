"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Reveal } from "@/components/motion/Reveal";
import { scaleIn } from "@/lib/motion";

export function MeetFounderSection() {
  const isMobile = useIsMobile();

  return (
    <div className="mt-6 min-w-0 overflow-hidden sm:mt-8">
      <Reveal className="mb-6 px-1 text-center sm:mb-10">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary sm:text-sm">
          Our Story
        </p>
        <h2 className="text-balance text-[clamp(1.35rem,5.5vw,2.25rem)] font-bold leading-snug sm:text-3xl md:text-4xl">
          Meet Mrs Abimbola Olurin
        </h2>
      </Reveal>

      <div className="grid min-w-0 grid-cols-1 items-start gap-6 sm:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] sm:gap-4 lg:grid-cols-[minmax(0,28rem)_minmax(0,1fr)] lg:gap-6">
        <Reveal className="min-w-0" variants={scaleIn}>
          <div className="relative mx-auto w-full max-w-sm lg:mx-0 lg:max-w-md">
            <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/assets/images/Mrs A. Olurin .jpeg"
                alt="Mrs Abimbola Olurin, founder of Dotch Flavours Foods"
                fill
                sizes="(max-width: 1024px) 85vw, 400px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>

            {/* Mobile: badge below image */}
            <div className="mt-3 rounded-xl bg-primary px-4 py-3 text-white shadow-lg md:hidden">
              <p className="text-xs uppercase tracking-wider text-white/80">Founder</p>
              <p className="text-sm font-semibold sm:text-base">Dotch Flavours Foods</p>
            </div>

            {/* Desktop: floating badge */}
            {!isMobile && (
              <div className="absolute -bottom-4 -right-4 rounded-xl bg-primary px-5 py-3 text-white shadow-lg">
                <p className="text-xs uppercase tracking-wider text-white/80">Founder</p>
                <p className="font-semibold">Dotch Flavours Foods</p>
              </div>
            )}
          </div>
        </Reveal>

        <Reveal className="min-w-0 px-1">
          <p className="mb-3 text-base font-medium leading-snug text-primary sm:mb-4 sm:text-lg">
            Authentic African flavours, thoughtfully prepared.
          </p>
          <p className="mb-3 text-sm leading-relaxed text-title/70 sm:mb-4 sm:text-base">
            Mrs Abimbola Olurin founded Dotch Flavours Foods with a simple belief: that busy
            families should never have to compromise on the taste, warmth, and tradition of a
            properly made meal.
          </p>
          <p className="mb-3 text-sm leading-relaxed text-title/70 sm:mb-4 sm:text-base">
            From ready-to-eat soups to carefully prepared dishes, every recipe reflects years of
            kitchen craft, cultural pride, and a commitment to quality ingredients you can trust.
          </p>
          <p className="mb-6 text-sm leading-relaxed text-title/70 sm:mb-8 sm:text-base">
            Dotch Flavours Foods is more than a food brand, it is a bridge between heritage and
            modern life, served with care in every portion.
          </p>
          <Button href="/about-us#our-story" fullWidth className="sm:w-auto">
            Read Our Story
          </Button>
        </Reveal>
      </div>
    </div>
  );
}
