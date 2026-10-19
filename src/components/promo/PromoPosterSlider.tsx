"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { promoSlides } from "@/lib/promo";
import "swiper/css";
import "swiper/css/pagination";

type PromoPosterSliderProps = {
  className?: string;
};

export function PromoPosterSlider({ className = "" }: PromoPosterSliderProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className={`min-w-0 ${className}`}>
      <div className="relative min-w-0 overflow-hidden rounded-2xl bg-white shadow-[0_16px_40px_rgba(25,46,34,0.16)] ring-1 ring-black/5 sm:rounded-3xl">
        <Swiper
          modules={[Autoplay, Pagination]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          loop
          autoplay={{ delay: 4200, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          spaceBetween={0}
          slidesPerView={1}
          className="min-w-0 [&_.swiper-pagination-bullet]:bg-[#192e22]/30 [&_.swiper-pagination-bullet-active]:bg-[#cf5c0b] [&_.swiper-pagination]:!bottom-2"
        >
          {promoSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="flex h-[min(58vh,26rem)] w-full items-center justify-center bg-white sm:h-[min(64vh,34rem)]">
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  width={1080}
                  height={1350}
                  sizes="(max-width: 768px) 92vw, (max-width: 1280px) 50vw, 560px"
                  className="max-h-full w-auto max-w-full object-contain"
                  priority={slide.id === "half-term-family"}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2 sm:mt-4">
        <button
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#192e22] text-white transition hover:bg-[#cf5c0b] sm:h-11 sm:w-11"
          aria-label="Previous promotion"
        >
          <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
        <button
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#192e22] text-white transition hover:bg-[#cf5c0b] sm:h-11 sm:w-11"
          aria-label="Next promotion"
        >
          <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>
    </div>
  );
}
