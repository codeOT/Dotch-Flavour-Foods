"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart, User, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { mainNav } from "@/lib/navigation";
import { mobileMenu, slideDown, staggerContainer, staggerItem } from "@/lib/motion";

type HeaderProps = {
  mobileOpen: boolean;
  onToggleMobile: () => void;
  onCloseMobile: () => void;
};

export function Header({ mobileOpen, onToggleMobile, onCloseMobile }: HeaderProps) {
  const { itemCount, isHydrated, openCart } = useCart();

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={slideDown}
      className="fixed inset-x-0 top-0 z-50 w-full border-b border-black/5 bg-white backdrop-blur-md"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex h-16 w-full max-w-[1400px] min-w-0 items-center justify-between gap-2 sm:h-20 sm:gap-4">
          <motion.div className="min-w-0 shrink" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link href="/" className="block max-w-[42vw] sm:max-w-none">
              <Image
                src="/assets/images/dotchbg.png"
                alt="Dotch Flavours Foods logo"
                width={320}
                height={56}
                className="h-8 w-auto object-contain object-left sm:h-10"
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
                    className="flex items-center gap-1 text-sm font-medium text-title transition hover:text-primary"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {item.label}
                    <span className="text-[10px] text-title/50" aria-hidden>
                      ▾
                    </span>
                  </button>
                  <div className="invisible absolute left-0 top-full z-50 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="min-w-48 rounded-lg border border-surface bg-white py-2 shadow-xl">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href ?? "#"}
                          className="block px-4 py-2 text-sm text-title transition hover:translate-x-1 hover:bg-surface hover:text-primary"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
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
              <button
                type="button"
                onClick={openCart}
                className="relative flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-title transition hover:bg-surface hover:text-primary sm:px-3"
                aria-label="Open shopping cart"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="hidden lg:inline">Cart</span>
                {isHydrated && itemCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary px-1 text-[10px] font-bold text-white lg:-right-1 lg:-top-1">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/sign-up"
                className="hidden rounded-md px-3 py-2 text-sm font-medium text-title transition hover:bg-surface hover:text-primary lg:inline-flex"
              >
                Sign Up
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
              className="mx-auto w-full max-w-[1400px] space-y-1 px-4 py-4 sm:px-6 lg:px-8"
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
                <button
                  type="button"
                  onClick={() => {
                    onCloseMobile();
                    openCart();
                  }}
                  className="relative flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm font-medium hover:bg-surface"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Cart
                  {isHydrated && itemCount > 0 && (
                    <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary px-1 text-[10px] font-bold text-white">
                      {itemCount > 99 ? "99+" : itemCount}
                    </span>
                  )}
                </button>
                <Link
                  href="/sign-up"
                  onClick={onCloseMobile}
                  className="flex items-center justify-center rounded-md border border-primary px-4 py-2 text-sm font-semibold text-primary"
                >
                  Sign Up
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
