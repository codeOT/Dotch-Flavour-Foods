"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { meetAbi } from "@/lib/meet-abi";

export function MeetAbiContent() {
  return (
    <section className="w-full min-w-0 overflow-x-clip bg-white py-10 sm:py-16">
      <div className="container-fluid min-w-0">
        <div className="grid w-full min-w-0 grid-cols-1 gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-14">
          <Reveal className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl shadow-xl lg:max-w-none">
              <Image
                src={meetAbi.image}
                alt={meetAbi.imageAlt}
                fill
                priority
                className="object-cover object-[center_18%]"
                sizes="(max-width: 1024px) 90vw, 352px"
              />
            </div>

            <div className="mt-4 space-y-1 rounded-2xl bg-[#192e22] px-4 py-4 text-white sm:px-5">
              <p className="text-xs uppercase tracking-widest text-white/70">{meetAbi.role}</p>
              <p className="text-lg font-semibold">{meetAbi.name}</p>
              <p className="text-sm text-white/75">{meetAbi.company}</p>
            </div>
          </Reveal>

          <div className="min-w-0">
            <Reveal>
              <h1 className="mb-6 text-[clamp(1.5rem,6vw,3rem)] font-bold leading-tight text-title sm:mb-8">
                {meetAbi.headline}
              </h1>
            </Reveal>

            <StaggerContainer className="space-y-5">
              {meetAbi.fullStory.map((paragraph) => (
                <StaggerItem key={paragraph.slice(0, 48)}>
                  <p className="text-sm leading-relaxed text-title/75 sm:text-base">{paragraph}</p>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <div className="mt-8 flex w-full min-w-0 flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
              <Button href="/ready-to-eat-soups" fullWidth className="sm:!w-auto">
                Shop Ready Soups
              </Button>
              <Button href="/about-us" variant="outline" fullWidth className="sm:!w-auto">
                Our story
              </Button>
              <Button href="/request-a-quote" variant="outline" fullWidth className="sm:!w-auto">
                Request a quote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
