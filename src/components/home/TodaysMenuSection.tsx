"use client";

import { Button } from "@/components/ui/Button";
import { TodaysMenuCard } from "@/components/cart/MenuFoodCards";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { MeetFounderSection } from "@/components/home/MeetFounderSection";
import { todaysMenu } from "@/lib/navigation";

export function TodaysMenuSection() {
  return (
    <section className="overflow-hidden bg-surface py-12 sm:py-16">
      <div className="container-fluid min-w-0">
        <Reveal className="mb-8 text-center sm:mb-10">
          <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">Today&apos;s Menu</h2>
        </Reveal>

        <StaggerContainer className="mb-12 grid gap-6 pt-2 sm:grid-cols-2 lg:grid-cols-4">
          {todaysMenu.map((item) => (
            <StaggerItem key={item.id} className="h-full">
              <TodaysMenuCard item={item} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <Reveal className="mb-16 text-center">
          <Button href="/our-menu">See All Dishes</Button>
        </Reveal>

        <MeetFounderSection />
      </div>
    </section>
  );
}
