"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export function IndependencePromo() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show the popup every time the page loads
    setIsOpen(true);
  }, []);

  const closePromo = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-3 sm:p-5 backdrop-blur-[2px] animate-in fade-in duration-300"
      onClick={closePromo}
      role="dialog"
      aria-modal="true"
      aria-label="Independence Day promotion"
    >
      {/* Popup */}
      <div
        className="relative h-auto w-full max-w-[520px] overflow-hidden rounded-xl bg-white shadow-2xl animate-in zoom-in-95 duration-300 sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
       
        <button
          type="button"
          onClick={closePromo}
          aria-label="Close promotion"
          className="absolute right-2.5 top-2.5 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-2xl leading-none text-white shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white sm:right-3 sm:top-3"
        >
          <span className="-mt-0.5">×</span>
        </button>

      
        <Link
          href="/ready-to-eat-soups"
          onClick={closePromo}
          className="group block"
          aria-label="View Independence Day Ready Soups promotion"
        >
          <Image
            src="/assets/images/popup.png"
            alt="A Taste of Home - Nigerian Independence Day Ready Soups promotion"
            width={1092}
            height={1365}
            priority
            sizes="(max-width: 640px) 94vw, 520px"
            className="h-auto max-h-[88vh] w-full object-contain transition-transform duration-300 group-hover:scale-[1.01]"
          />
        </Link>
      </div>
    </div>
  );
}