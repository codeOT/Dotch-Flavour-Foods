"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { slideLeft, slideRight } from "@/lib/motion";

export function AboutContent() {
  return (
    <section className="py-16">
      <div className="container-fluid grid items-center gap-12 lg:grid-cols-2">
        <Reveal variants={slideRight}>
          <h2 className="mb-4 text-3xl font-bold">We Serve Fresh Food Every Day</h2>
          <p className="mb-4 text-title/70">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry&apos;s standard dummy text ever since the 1500s.
          </p>
          <p className="text-title/70">
            When an unknown printer took a galley of type and scrambled it to make a type specimen
            book. It has survived not only five centuries, but also the leap into electronic
            typesetting.
          </p>
        </Reveal>
        <Reveal variants={slideLeft}>
          <Image
            src="/assets/images/gallery/grid/pic1.jpg"
            alt="Restaurant interior"
            width={600}
            height={450}
            className="rounded-2xl object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
}
