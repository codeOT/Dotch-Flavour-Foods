"use client";

import { CateringCtaSection } from "@/components/home/CateringCtaSection";
import { FaqSection } from "@/components/home/FaqSection";
import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { MeetFounderSection } from "@/components/home/MeetFounderSection";
import { MenuSection } from "@/components/home/MenuSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { ProductCatalogSection } from "@/components/home/ProductCatalogSection";
import { SocialProofSection } from "@/components/home/SocialProofSection";

export function HomePageContent() {
  return (
    <div className="w-full min-w-0 overflow-x-clip">
      <HeroSection />
      <HowItWorksSection />
      <ProductCatalogSection />
      <MenuSection />
      <section className="overflow-x-clip bg-white py-12 sm:py-16">
        <div className="container-fluid min-w-0">
          <MeetFounderSection />
        </div>
      </section>
      <SocialProofSection />
      <CateringCtaSection />
      <NewsletterSection />
      <FaqSection />
    </div>
  );
}
