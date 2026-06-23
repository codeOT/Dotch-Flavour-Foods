"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { menuItems } from "@/lib/navigation";
import { menuItemToCartItem } from "@/lib/cart-utils";
import { CartQuantityControls } from "@/components/cart/CartQuantityControls";
import { useScrollMotion } from "@/hooks/useScrollMotion";
import { HoverCard } from "@/components/motion/HoverCard";
import { Reveal } from "@/components/motion/Reveal";
import "swiper/css";

export function MenuSection() {
  const swiperRef = useRef<SwiperType | null>(null);
  const scrollMotion = useScrollMotion();

  return (
    <section className="overflow-hidden py-12 sm:py-16">
      <Reveal className="container-fluid mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-title sm:text-3xl md:text-4xl capitalize">
          Fresh food from the <motion.span className="text-accent whileHover={{ scale: 1.08, x: -2 }}">Dotch Flavour menu</motion.span> 
        </h2>
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
                <HoverCard className="group relative overflow-hidden rounded-2xl border border-surface bg-white p-4 shadow-sm">
                  <div className="mb-4 flex min-w-0 items-center gap-3 sm:gap-4">
                    <motion.div whileHover={{ rotate: [0, -5, 5, 0] }} transition={{ duration: 0.4 }}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="h-16 w-16 shrink-0 rounded-xl object-cover sm:h-20 sm:w-20"
                      />
                    </motion.div>
                    <div className="min-w-0">
                      <h6 className="font-semibold">
                        <Link href="/shop/product" className="hover:text-primary">
                          {item.name}
                        </Link>
                      </h6>
                      <p className="text-sm text-title/60">{item.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-surface pt-4 text-sm">
                    <span className="text-title/60">Regular Price</span>
                    <span className="font-semibold text-primary">{item.price}</span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <CartQuantityControls
                      item={menuItemToCartItem(item)}
                      variant="compact"
                    />
                  </div>
                </HoverCard>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Reveal>
    </section>
  );
}
