"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { meetAbi } from "@/lib/meet-abi";
import { easeOut, scaleIn } from "@/lib/motion";

export function MeetFounderSection() {
  return (
    <div className="mt-6 w-full min-w-0 overflow-x-clip sm:mt-8">
      <StaggerContainer className="mb-6 text-center sm:mb-10">
      
        <StaggerItem>
          <h2 className="text-balance text-[clamp(1.35rem,5.5vw,2.25rem)] font-bold leading-snug sm:text-3xl md:text-4xl text-secondary">
            Meet {meetAbi.shortName}
          </h2>
        </StaggerItem>
      </StaggerContainer>

      <div className="grid w-full min-w-0 grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,28rem)_minmax(0,1fr)] lg:gap-8">
        <Reveal className="min-w-0">
          <div className="relative mx-auto w-full max-w-sm lg:mx-0 lg:max-w-md">
            <motion.div
              className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
            >
              <Image
                src={meetAbi.image}
                alt={meetAbi.imageAlt}
                fill
                sizes="(max-width: 1024px) 85vw, 400px"
                className="object-cover object-[center_20%] transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </motion.div>

            <motion.div
              className="mt-3 rounded-xl bg-primary px-4 py-3 text-white shadow-lg lg:absolute lg:-bottom-4 lg:-right-4 lg:mt-0"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.45, ease: easeOut }}
            >
              <p className="text-xs uppercase tracking-wider text-white/80">{meetAbi.role}</p>
              <p className="text-sm font-semibold sm:text-base">{meetAbi.company}</p>
            </motion.div>
          </div>
        </Reveal>

        <StaggerContainer className="min-w-0 space-y-4">
          <StaggerItem>
            <p className="text-sm leading-relaxed text-title/75 sm:text-base">{meetAbi.intro}</p>
          </StaggerItem>
          <StaggerItem>
            <Reveal variants={scaleIn}>
              <p className="text-base font-medium leading-relaxed text-title sm:text-lg">
                &ldquo;{meetAbi.quote}&rdquo;
              </p>
            </Reveal>
          </StaggerItem>
          <StaggerItem>
            <div className="pt-2">
              <Button href="/meet-abi" fullWidth className="sm:!w-auto">
                Read Abi&apos;s story
              </Button>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </div>
  );
}
