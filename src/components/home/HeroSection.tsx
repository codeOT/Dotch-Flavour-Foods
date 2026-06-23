"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { floatAnimation, pulseGlow } from "@/lib/motion";
import { Reveal } from "@/components/motion/Reveal";

const highlights = [
  "African Traditional Cuisines",
  "Ready to Eat Soups",
  "Vegetarian Specialty",
];

export function HeroSection() {
  return (
    <section className="overflow-hidden bg-gradient-to-b from-surface to-white pb-10 pt-8 sm:pb-16 sm:pt-12 lg:pb-24 lg:pt-20">
      <div className="container-fluid">
        <div className="grid min-w-0 grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Copy */}
          <Reveal className="order-1 min-w-0 max-w-full lg:order-none">
            <motion.h1
              className="mb-4 text-[clamp(1.5rem,6.5vw,2rem)] font-bold leading-[1.2] text-title sm:mb-6 sm:text-4xl sm:leading-tight md:text-5xl lg:text-6xl"
              initial="rest"
              whileHover="hover"
              whileTap="hover"
              variants={{
                rest: { scale: 1, color: "#192e22" },
                hover: {
                  scale: 1.04,
                  color: "#cf5c0b",
                  transition: { type: "spring", stiffness: 380, damping: 22 },
                },
              }}
            >
              <motion.span
                className="block sm:inline"
                variants={{ hover: { letterSpacing: "0.02em" } }}
              >
                Authentic Nigerian Flavours,
                <span className="hidden sm:inline"> </span>
              </motion.span>
              <motion.span
                className="mt-1 block text-primary sm:mt-0 sm:inline"
                variants={{
                  rest: { color: "#574821", scale: 1 },
                  hover: {
                    color: "#630a0a",
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 420, damping: 18 },
                  },
                }}
              >
                Thoughtfully Prepared
              </motion.span>
            </motion.h1>

            <p className="mb-5 max-w-xl text-sm leading-relaxed text-title/70 sm:mb-8 sm:text-base md:text-lg">
              We are the best food delivery partner for your shops and restaurants, deliver
              safely and on time.
            </p>

            <div className="mb-5 flex w-full flex-col gap-3 sm:mb-8 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
              <Button href="/contact-us" fullWidth className="sm:w-auto">
                Order Now
              </Button>
              <Button href="/about-us" variant="outline" fullWidth className="sm:w-auto">
                View More
              </Button>
            </div>

            <StaggerContainer className="grid gap-2.5 sm:grid-cols-2 sm:gap-3">
              {highlights.map((item) => (
                <StaggerItem key={item}>
                  <div className="flex items-start gap-2 text-sm text-title/80">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="min-w-0 break-words">{item}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </Reveal>

          {/* Image + cards */}
          <Reveal className="order-2 min-w-0 max-w-full lg:order-none">
            <div className="relative mx-auto w-full max-w-[min(100%,22rem)] sm:max-w-md lg:max-w-lg">
              <motion.div animate={pulseGlow} className="overflow-hidden rounded-2xl">
                <Image
                  src="/assets/images/main-slider/slider4/banner.png"
                  alt="Fresh food delivery"
                  width={640}
                  height={640}
                  sizes="(max-width: 1024px) 90vw, 480px"
                  className="h-auto w-full object-contain"
                  priority
                />
              </motion.div>

              {/* Mobile / tablet: cards below image */}
              <div className="mt-3 grid gap-2.5 sm:mt-4 lg:hidden">
                <div className="rounded-xl bg-white p-3.5 shadow-lg sm:rounded-2xl sm:p-4">
                  <h6 className="text-sm font-bold">
                    4.5{" "}
                    <span className="font-normal text-title/60">(1000+ review)</span>
                  </h6>
                  <div className="my-2 flex gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={`h-4 w-4 ${index < 4 ? "fill-secondary text-secondary" : "text-cream"}`}
                      />
                    ))}
                  </div>
                  <div className="flex -space-x-2">
                    {["pic1", "pic2", "pic3"].map((pic) => (
                      <Image
                        key={pic}
                        src={`/assets/images/testimonial/mini/${pic}.jpg`}
                        alt=""
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-full border-2 border-white object-cover"
                      />
                    ))}
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs text-white">
                      8+
                    </span>
                  </div>
                </div>
                <div className="flex min-w-0 items-center gap-3 rounded-xl bg-white p-3 shadow-lg sm:rounded-2xl">
                  <Image
                    src="/assets/images/main-slider/slider4/pic1.png"
                    alt="Spicy Seafood Fried Rice"
                    width={64}
                    height={64}
                    className="h-12 w-12 shrink-0 rounded-lg object-cover sm:h-14 sm:w-14 sm:rounded-xl"
                  />
                  <div className="min-w-0 flex-1">
                    <h6 className="text-sm font-semibold leading-snug">
                      Spicy Seafood Fried Rice
                    </h6>
                    <span className="text-xs text-title/60">Serves 4</span>
                  </div>
                </div>
              </div>

              {/* Desktop: floating cards */}
              <motion.div
                animate={floatAnimation}
                className="absolute -right-2 top-6 hidden w-44 rounded-2xl bg-white p-4 shadow-xl lg:block xl:right-0"
              >
                <h6 className="text-sm font-bold">
                  4.5 <span className="font-normal text-title/60">(1000+ review)</span>
                </h6>
                <div className="my-2 flex gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`h-4 w-4 ${index < 4 ? "fill-secondary text-secondary" : "text-cream"}`}
                    />
                  ))}
                </div>
                <div className="flex -space-x-2">
                  {["pic1", "pic2", "pic3"].map((pic) => (
                    <Image
                      key={pic}
                      src={`/assets/images/testimonial/mini/${pic}.jpg`}
                      alt=""
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs text-white">
                    8+
                  </span>
                </div>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 10, 0],
                  transition: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
                }}
                className="absolute bottom-2 left-0 hidden max-w-[calc(100%-0.5rem)] items-center gap-3 rounded-2xl bg-white p-3 shadow-xl lg:flex"
              >
                <Image
                  src="/assets/images/main-slider/slider4/pic1.png"
                  alt="Spicy Seafood Fried Rice"
                  width={64}
                  height={64}
                  className="h-14 w-14 shrink-0 rounded-xl object-cover"
                />
                <div className="min-w-0">
                  <h6 className="text-sm font-semibold">Spicy Seafood Fried Rice</h6>
                  <span className="text-xs text-title/60">Serves 4</span>
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
