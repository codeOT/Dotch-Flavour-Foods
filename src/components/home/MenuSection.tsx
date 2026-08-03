"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { menuItems } from "@/lib/navigation";
import { MenuCarouselCard } from "@/components/cart/MenuFoodCards";
import { Button } from "@/components/ui/Button";
import { useScrollMotion } from "@/hooks/useScrollMotion";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import "swiper/css";

export function MenuSection() {
  const swiperRef = useRef<SwiperType | null>(null);
  const scrollMotion = useScrollMotion();

  return (
    <section className="overflow-hidden py-12 sm:py-16">
      <Reveal className="container-fluid mb-6 flex min-w-0 flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <StaggerContainer className="min-w-0">
          <StaggerItem>
            <h2 className="text-[clamp(1.35rem,5vw,2.25rem)] font-bold capitalize leading-snug text-title sm:text-3xl md:text-4xl">
              Fresh food from the{" "}
              <motion.span className="text-secondary" whileHover={{ scale: 1.08 }}>
                Dotch Flavour menu
              </motion.span>
            </h2>
          </StaggerItem>
        </StaggerContainer>
        <div className="flex shrink-0 gap-2 self-end sm:self-auto">
          <motion.button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white transition hover:bg-primary-hover"
            aria-label="Previous menu items"
            whileHover={{ scale: 1.08, x: -2 }}
            whileTap={{ scale: 0.92 }}
          >
            <ArrowLeft className="h-5 w-5" />
          </motion.button>
          <motion.button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white transition hover:bg-primary-hover"
            aria-label="Next menu items"
            whileHover={{ scale: 1.08, x: 2 }}
            whileTap={{ scale: 0.92 }}
          >
            <ArrowRight className="h-5 w-5" />
          </motion.button>
        </div>
      </Reveal>

      <Reveal className="container-fluid min-w-0 overflow-hidden" delay={0.15}>
        <Swiper
          modules={[Navigation]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            480: { slidesPerView: 1.15, spaceBetween: 20 },
            640: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
            1280: { slidesPerView: 4, spaceBetween: 24 },
          }}
        >
          {menuItems.map((item, index) => (
            <SwiperSlide key={item.id}>
              <motion.div
                initial={scrollMotion.from}
                whileInView={scrollMotion.to}
                viewport={scrollMotion.viewport}
                transition={{ ...scrollMotion.transition, delay: index * 0.1 }}
              >
                <MenuCarouselCard item={item} />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Reveal>

      <Reveal className="container-fluid mt-10 flex justify-center">
        <motion.div whileHover={{ y: -3, scale: 1.03 }} whileTap={{ scale: 0.98 }}>
          <Button href="/fresh-menu">View All</Button>
        </motion.div>
      </Reveal>
    </section>
  );
}
