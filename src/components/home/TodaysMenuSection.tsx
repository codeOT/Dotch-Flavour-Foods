"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { HoverCard } from "@/components/motion/HoverCard";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { MeetFounderSection } from "@/components/home/MeetFounderSection";
import { todaysMenu } from "@/lib/navigation";

export function TodaysMenuSection() {
  return (
    <section className="overflow-hidden bg-surface py-12 sm:py-16">
      <div className="container-fluid min-w-0">
        <Reveal className="mb-8 text-center sm:mb-10">
          <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">Today&apos;s Menu</h2>
        </Reveal>

        <StaggerContainer className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {todaysMenu.map((item) => (
            <StaggerItem key={item.name}>
              <HoverCard className="group relative overflow-hidden rounded-2xl bg-white shadow-sm">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <motion.div whileHover={{ scale: 1.08 }} transition={{ duration: 0.5 }}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  <motion.span
                    className="absolute left-4 top-4 rounded bg-secondary px-3 py-1 text-xs font-semibold uppercase text-white"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    Top Seller
                  </motion.span>
                </div>
                <div className="p-5">
                  <h5 className="mb-2 text-lg font-semibold">
                    <Link href="/our-menu" className="hover:text-primary">
                      {item.name}
                    </Link>
                  </h5>
                  <p className="mb-4 text-sm text-title/70">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-primary">{item.price}</span>
                    <motion.div whileHover={{ scale: 1.15, rotate: 8 }} whileTap={{ scale: 0.9 }}>
                      <Link
                        href="/shop/cart"
                        className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-white transition hover:bg-primary-hover"
                        aria-label={`Add ${item.name} to cart`}
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </HoverCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <Reveal className="mb-16 text-center">
          <Button href="/our-menu">See All Dishes</Button>
        </Reveal>

        <MeetFounderSection />
      </div>
    </section>
  );
}
