"use client";

import { BookTableSection } from "@/components/home/BookTableSection";
import { FaqSection } from "@/components/home/FaqSection";
import { HeroSection } from "@/components/home/HeroSection";
import { MeetFounderSection } from "@/components/home/MeetFounderSection";
import { MenuSection } from "@/components/home/MenuSection";
import { ProductCatalogSection } from "@/components/home/ProductCatalogSection";

export function HomePageContent() {
  return (
    <>
      <HeroSection />
      <ProductCatalogSection />
      <MenuSection />
      <section className="overflow-hidden bg-white py-12 sm:py-16">
        <div className="container-fluid min-w-0">
          <MeetFounderSection />
        </div>
      </section>
      <BookTableSection />
      <FaqSection />
    </>
  );
}
