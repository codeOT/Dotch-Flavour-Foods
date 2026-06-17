"use client";

import Image from "next/image";
import Link from "next/link";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import { footerLinks } from "@/lib/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-primary-dark text-white">
      <motion.div
        className="pointer-events-none absolute left-1/4 top-0 h-64 w-64 rounded-full bg-secondary/10 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="container-fluid relative z-10 min-w-0 py-12 sm:py-16">
        <Reveal className="mb-10 rounded-2xl bg-white/5 p-5 sm:mb-12 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <motion.div whileHover={{ scale: 1.03 }}>
                <Link href="/">
                  <Image
                    src="/assets/images/dotchbg.png"
                    alt="Dotch Flavours Foods logo"
                    width={320}
                    height={56}
                    className="mb-4 h-10 w-auto brightness-0 invert"
                  />
                </Link>
              </motion.div>
              <p className="text-sm text-white/75">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p>
            </div>
            <div>
              <h5 className="mb-4 text-lg font-semibold">Subscribe To Our Newsletter</h5>
              <motion.form
                className="flex flex-col overflow-hidden rounded-md sm:flex-row"
                whileHover={{ scale: 1.01 }}
              >
                <input
                  type="email"
                  required
                  placeholder="Enter Your Email"
                  className="min-w-0 flex-1 border-0 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60 outline-none"
                />
                <motion.button
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-secondary px-5 py-3 text-sm font-semibold uppercase"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe <Send className="h-4 w-4" />
                </motion.button>
              </motion.form>
            </div>
          </div>
        </Reveal>

        <StaggerContainer className="mb-12 grid gap-8 sm:grid-cols-2">
          <StaggerItem>
            <h5 className="mb-4 text-sm font-semibold uppercase tracking-wider">Our Links</h5>
            <ul className="space-y-2 text-sm text-white/75">
              {footerLinks.ourLinks.map((link) => (
                <li key={link.label}>
                  <motion.div whileHover={{ x: 6 }} className="inline-block">
                    <Link href={link.href} className="transition hover:text-secondary">
                      {link.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </StaggerItem>
          <StaggerItem className="sm:text-right">
            <h5 className="mb-4 text-sm font-semibold uppercase tracking-wider">Help Center</h5>
            <ul className="space-y-2 text-sm text-white/75">
              {footerLinks.helpCenter.map((link) => (
                <li key={link.label}>
                  <motion.div whileHover={{ x: -6 }} className="inline-block">
                    <Link href={link.href} className="transition hover:text-secondary">
                      {link.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </StaggerItem>
        </StaggerContainer>

        <Reveal>
          <div className="flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-white/60 sm:flex-row sm:justify-between">
            <p>Copyright {new Date().getFullYear()} All rights reserved.</p>
            <p>Made with 🫶 by CodeOT</p>
          </div>
        </Reveal>
      </div>

      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/assets/images/background/pic5.png"
          alt=""
          width={200}
          height={200}
          className="pointer-events-none absolute bottom-0 left-0 hidden h-24 w-24 opacity-30 sm:block sm:h-auto sm:w-auto"
        />
      </motion.div>
      <motion.div
        animate={{ y: [0, 12, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/assets/images/background/pic6.png"
          alt=""
          width={200}
          height={200}
          className="pointer-events-none absolute right-0 top-0 hidden h-24 w-24 opacity-30 sm:block sm:h-auto sm:w-auto"
        />
      </motion.div>
    </footer>
  );
}
