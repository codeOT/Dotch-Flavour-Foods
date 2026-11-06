"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { blackFridayPromo, isBlackFridayActive } from "@/lib/black-friday";
import { Button } from "@/components/ui/Button";

const HIDDEN_PATHS = ["/shop/checkout", "/shop/cart", "/admin", "/sign-in", "/sign-up"];

export function BlackFridayPopup() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isBlackFridayActive()) return;
    if (HIDDEN_PATHS.some((path) => pathname.startsWith(path))) return;

    const timer = window.setTimeout(() => setIsOpen(true), 600);
    return () => window.clearTimeout(timer);
    // Once per full page load so it returns on reload, not every in-site click.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePromo();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  function closePromo() {
    setIsOpen(false);
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/65 p-3 backdrop-blur-[2px] sm:p-5"
      onClick={closePromo}
      role="dialog"
      aria-modal="true"
      aria-labelledby="black-friday-popup-title"
    >
      <div
        className="relative w-full max-w-[420px] overflow-hidden rounded-2xl bg-[#0f2419] shadow-2xl sm:max-w-[480px]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={closePromo}
          aria-label="Close Black Friday offer"
          className="absolute right-2.5 top-2.5 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white shadow-md transition hover:bg-black/75"
        >
          <X className="h-4 w-4" />
        </button>

        <Link
          href={blackFridayPromo.path}
          onClick={closePromo}
          className="block"
          aria-label="Shop Black Friday Ready Soups bundles"
        >
          <Image
            src={blackFridayPromo.poster}
            alt={blackFridayPromo.posterAlt}
            width={900}
            height={1125}
            priority
            sizes="(max-width: 640px) 92vw, 480px"
            className="h-auto max-h-[70vh] w-full object-contain"
          />
        </Link>

        <div className="space-y-3 px-4 pb-5 pt-3 text-center sm:px-5">
          <p id="black-friday-popup-title" className="text-sm font-semibold text-white">
            Black Friday Ready Soups · {blackFridayPromo.dates}
          </p>
          <Button
            href={blackFridayPromo.path}
            fullWidth
            className="!bg-secondary hover:!bg-orange"
            onNavigate={closePromo}
          >
            Shop the bundles
          </Button>
        </div>
      </div>
    </div>
  );
}
