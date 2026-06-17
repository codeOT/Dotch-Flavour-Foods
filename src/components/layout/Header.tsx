"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart, User, X } from "lucide-react";
import { mainNav } from "@/lib/navigation";
import { mobileMenu, slideDown, staggerContainer, staggerItem } from "@/lib/motion";

type HeaderProps = {
  mobileOpen: boolean;
  onToggleMobile: () => void;
  onCloseMobile: () => void;
};

export function Header({ mobileOpen, onToggleMobile, onCloseMobile }: HeaderProps) {
  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={slideDown}
      className="fixed inset-x-0 top-0 z-50 bg-white/90 backdrop-blur-md"
    >
      <div className="container-fluid">
        <div className="flex h-16 min-w-0 items-center justify-between gap-2 sm:h-20 sm:gap-4">
          <motion.div className="min-w-0 shrink" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link href="/" className="block max-w-[42vw] sm:max-w-none">
              <Image
                src="/assets/images/dotchbg.png"
                alt="Dotch Flavours Foods logo"
                width={320}
                height={56}
                className="h-8 w-auto max-h-10 object-contain object-left sm:h-10"
                priority
              />
            </Link>
          </motion.div>

          <motion.nav
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="hidden items-center gap-8 lg:flex"
          >
            {mainNav.map((item) =>
              item.children ? (
                <motion.div key={item.label} variants={staggerItem} className="group relative">
                  <button
                    type="button"
                    className="text-sm font-medium text-title transition hover:text-primary"
                  >
                    {item.label}
                  </button>
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    whileHover={{ opacity: 1, y: 0, scale: 1 }}
                    className="invisible absolute left-0 top-full z-50 min-w-48 rounded-lg border border-surface bg-white py-2 opacity-0 shadow-xl group-hover:visible group-hover:opacity-100"
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href ?? "#"}
                        className="block px-4 py-2 text-sm text-title transition hover:translate-x-1 hover:bg-surface hover:text-primary"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div key={item.label} variants={staggerItem}>
                  <Link
                    href={item.href ?? "#"}
                    className="relative text-sm font-medium text-title transition hover:text-primary"
                  >
                    {item.label}
                    <motion.span
                      className="absolute -bottom-1 left-0 h-0.5 w-full origin-left bg-secondary"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.25 }}
                    />
                  </Link>
                </motion.div>
              ),
            )}
          </motion.nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/shop/cart"
                className="hidden items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-title transition hover:bg-surface hover:text-primary lg:flex"
              >
                <ShoppingCart className="h-5 w-5" />
                Cart
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/sign-in"
                className="hidden items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-hover lg:flex"
              >
                <User className="h-4 w-4" />
                Sign In
              </Link>
            </motion.div>

            <motion.button
              type="button"
              onClick={onToggleMobile}
              className="rounded-md p-2 lg:hidden"
              aria-label="Toggle navigation"
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    className="flex flex-col gap-1.5"
                  >
                    <span className="block h-0.5 w-6 bg-title" />
                    <span className="block h-0.5 w-6 bg-title" />
                    <span className="block h-0.5 w-6 bg-title" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenu}
            className="overflow-hidden border-t border-surface bg-white lg:hidden"
          >
            <motion.nav
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="container-fluid space-y-1 py-4"
            >
              {mainNav.map((item) =>
                item.children ? (
                  <motion.div key={item.label} variants={staggerItem} className="space-y-1">
                    <p className="px-2 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                      {item.label}
                    </p>
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href ?? "#"}
                        onClick={onCloseMobile}
                        className="block rounded-md px-2 py-2 text-sm hover:bg-surface"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div key={item.label} variants={staggerItem}>
                    <Link
                      href={item.href ?? "#"}
                      onClick={onCloseMobile}
                      className="block rounded-md px-2 py-2 text-sm font-medium hover:bg-surface"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ),
              )}
              <motion.div
                variants={staggerItem}
                className="mt-4 flex flex-col gap-2 border-t border-surface pt-4"
              >
                <Link
                  href="/shop/cart"
                  onClick={onCloseMobile}
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium hover:bg-surface"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Cart
                </Link>
                <Link
                  href="/sign-in"
                  onClick={onCloseMobile}
                  className="flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white"
                >
                  <User className="h-4 w-4" />
                  Sign In
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
