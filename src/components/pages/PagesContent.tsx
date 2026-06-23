"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { HoverCard } from "@/components/motion/HoverCard";
import { scaleIn } from "@/lib/motion";
import { CartQuantityControls } from "@/components/cart/CartQuantityControls";
import { menuItemToCartItem } from "@/lib/cart-utils";
import { menuItems } from "@/lib/navigation";

const team = [
  { name: "John Doe", role: "Head Chef", image: "/assets/images/team/pic1.jpg" },
  { name: "Jane Smith", role: "Sous Chef", image: "/assets/images/team/pic2.jpg" },
  { name: "Mike Johnson", role: "Pastry Chef", image: "/assets/images/team/pic3.jpg" },
];

const testimonials = [
  { name: "Sarah Williams", quote: "Amazing food and fast delivery. Will definitely order again!" },
  { name: "David Chen", quote: "The best restaurant experience in town. Highly recommended." },
  { name: "Emily Brown", quote: "Fresh ingredients and wonderful service every single time." },
];

const services = [
  { title: "Dine In", description: "Enjoy a warm atmosphere with table service." },
  { title: "Takeaway", description: "Order ahead and pick up at your convenience." },
  { title: "Delivery", description: "Fresh meals delivered straight to your door." },
  { title: "Catering", description: "Custom menus for events and celebrations." },
];

export function TeamGrid() {
  return (
    <section className="py-16">
      <StaggerContainer className="container-fluid grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((member) => (
          <StaggerItem key={member.name}>
            <HoverCard className="text-center">
              <div className="relative mx-auto mb-4 aspect-square w-full max-w-xs overflow-hidden rounded-2xl">
                <Image src={member.image} alt={member.name} fill className="object-cover" />
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-primary">{member.role}</p>
            </HoverCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}

export function TestimonialGrid() {
  return (
    <section className="py-16">
      <StaggerContainer className="container-fluid grid gap-6 md:grid-cols-3">
        {testimonials.map((item) => (
          <StaggerItem key={item.name}>
            <HoverCard className="rounded-2xl border border-surface bg-white p-8 shadow-sm">
              <p className="mb-4 text-title/80">&ldquo;{item.quote}&rdquo;</p>
              <footer className="font-semibold text-primary">{item.name}</footer>
            </HoverCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}

export function ServicesGrid() {
  return (
    <section className="py-16">
      <StaggerContainer className="container-fluid grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <StaggerItem key={service.title}>
            <HoverCard className="rounded-2xl border border-surface bg-white p-8 shadow-sm">
              <h3 className="mb-3 text-xl font-semibold">{service.title}</h3>
              <p className="text-title/70">{service.description}</p>
            </HoverCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}

export function ProductDetailContent() {
  return (
    <section className="py-16">
      <div className="container-fluid grid gap-12 lg:grid-cols-2">
        <Reveal variants={scaleIn}>
          <Image
            src="/assets/images/menu-small/pic1.png"
            alt="Burger"
            width={500}
            height={500}
            className="mx-auto rounded-2xl"
          />
        </Reveal>
        <Reveal>
          <h2 className="mb-4 text-3xl font-bold">Burger</h2>
          <p className="mb-6 text-2xl font-bold text-primary">{menuItems[0].price}</p>
          <p className="mb-8 text-title/70">
            Delicious and spicy burger made with fresh ingredients and served hot.
          </p>
          <CartQuantityControls item={menuItemToCartItem(menuItems[0])} showLabel />
        </Reveal>
      </div>
    </section>
  );
}
