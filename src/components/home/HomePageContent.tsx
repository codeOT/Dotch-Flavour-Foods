"use client";

import { BookTableSection } from "@/components/home/BookTableSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { HeroSection } from "@/components/home/HeroSection";
import { MenuSection } from "@/components/home/MenuSection";
import { ProductCatalogSection } from "@/components/home/ProductCatalogSection";
import { TodaysMenuSection } from "@/components/home/TodaysMenuSection";

export function HomePageContent() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <MenuSection />
      <TodaysMenuSection />
      <ProductCatalogSection />
      <BookTableSection />
    </>
  );
}
