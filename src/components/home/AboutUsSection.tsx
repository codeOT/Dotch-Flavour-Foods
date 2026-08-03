"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { aboutIntro } from "@/lib/about";

const aboutVisual = {
  src: "/assets/images/egusi.jpg",
  alt: "A bowl of Dotch Flavour Egusi soup, cooked with care",
} as const;

export function AboutUsSection() {
  const [origin, care, invitation] = aboutIntro.paragraphs;

  return (
    <section className="w-full min-w-0 overflow-x-clip bg-[#192e22] text-white">
      <div className="grid min-w-0 grid-cols-1 lg:grid-cols-2">
        <Reveal className="relative min-h-[280px] min-w-0 sm:min-h-[360px] lg:min-h-full">
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.06 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={aboutVisual.src}
              alt={aboutVisual.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#192e22]/70 via-[#192e22]/15 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#192e22]/20 lg:to-[#192e22]/55" />
        </Reveal>

        <div className="relative flex min-w-0 items-center px-4 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20 xl:px-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(207,92,11,0.14),transparent_42%)]" />

          <div className="relative w-full min-w-0 max-w-xl">
            <StaggerContainer>
              <StaggerItem>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
                  About us
                </p>
              </StaggerItem>
              <StaggerItem>
                <h2 className="mb-2 font-display text-[clamp(1.75rem,5vw,2.75rem)] font-bold leading-tight">
                  {aboutIntro.title}
                </h2>
              </StaggerItem>
              <StaggerItem>
                <p className="mb-6 text-lg font-medium leading-snug text-secondary sm:text-xl">
                  {aboutIntro.tagline}
                </p>
              </StaggerItem>
              <StaggerItem>
                <div className="space-y-4 text-sm leading-relaxed text-white/75 sm:text-base">
                  <p>{origin}</p>
                  <p>{care}</p>
                  <p>{invitation}</p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="mt-8 flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button
                    href="/about-us"
                    fullWidth
                    className="!bg-secondary hover:!bg-orange sm:!w-auto"
                  >
                    Our story
                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </Button>
                  <Button
                    href="/ready-to-eat-soups"
                    variant="outline"
                    fullWidth
                    className="!border-white/35 !text-white hover:!bg-white/10 sm:!w-auto"
                  >
                    Shop Ready Soups
                  </Button>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
