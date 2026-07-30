"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { meetAbi } from "@/lib/meet-abi";
import { scaleIn, slideRight } from "@/lib/motion";

export function MeetAbiContent() {
  return (
    <section className="overflow-hidden bg-white py-12 sm:py-16">
      <div className="container-fluid min-w-0">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-14">
          <Reveal variants={slideRight} className="lg:sticky lg:top-28 lg:self-start">
            <motion.div
              className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl shadow-xl lg:max-w-none"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
            >
              <Image
                src={meetAbi.image}
                alt={meetAbi.imageAlt}
                fill
                priority
                className="object-cover object-[center_18%] transition-transform duration-700 ease-out hover:scale-105"
                sizes="(max-width: 1024px) 90vw, 352px"
              />
            </motion.div>

            <StaggerContainer className="mt-4 space-y-1 rounded-2xl bg-[#192e22] px-5 py-4 text-white">
              <StaggerItem>
                <p className="text-xs uppercase tracking-widest text-white/70">{meetAbi.role}</p>
              </StaggerItem>
              <StaggerItem>
                <p className="text-lg font-semibold">{meetAbi.name}</p>
              </StaggerItem>
              <StaggerItem>
                <p className="text-sm text-white/75">{meetAbi.company}</p>
              </StaggerItem>
            </StaggerContainer>
          </Reveal>

          <div className="min-w-0">
            <Reveal variants={scaleIn}>
              <h1 className="mb-8 text-3xl font-bold leading-tight text-title sm:text-4xl lg:text-5xl">
                {meetAbi.headline}
              </h1>
            </Reveal>

            <StaggerContainer className="space-y-5">
              {meetAbi.fullStory.map((paragraph) => (
                <StaggerItem key={paragraph.slice(0, 48)}>
                  <motion.p
                    className="text-sm leading-relaxed text-title/75 sm:text-base"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  >
                    {paragraph}
                  </motion.p>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <StaggerContainer className="mt-10 flex flex-wrap gap-3">
              {[
                { href: "/ready-to-eat-soups", label: "Shop Ready Soups", variant: undefined },
                { href: "/about-us", label: "Our story", variant: "outline" as const },
                { href: "/request-a-quote", label: "Request a quote", variant: "outline" as const },
              ].map((item) => (
                <StaggerItem key={item.href}>
                  <motion.div whileHover={{ y: -3, scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Button href={item.href} variant={item.variant}>
                      {item.label}
                    </Button>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
