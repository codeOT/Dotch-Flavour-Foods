"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { slideLeft, slideRight } from "@/lib/motion";
import { siteConfig } from "@/lib/site";

export function ContactContent() {
  const { contact } = siteConfig;

  return (
    <section className="py-16">
      <div className="container-fluid grid gap-12 lg:grid-cols-2">
        <Reveal variants={slideRight}>
          <StaggerContainer className="space-y-8">
            {[
              { icon: Phone, title: "Phone", text: contact.phone },
              { icon: Mail, title: "Email", text: contact.email },
              { icon: MapPin, title: "Address", text: contact.address },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <motion.div className="flex gap-4" whileHover={{ x: 8 }}>
                  <item.icon className="mt-1 h-6 w-6 text-primary" />
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-title/70">{item.text}</p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Reveal>

        <Reveal variants={slideLeft}>
          <motion.form
            className="space-y-4 rounded-2xl border border-surface bg-white p-8 shadow-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            {["Your Name", "Your Email", "Your Message"].map((placeholder) =>
              placeholder === "Your Message" ? (
                <motion.textarea
                  key={placeholder}
                  required
                  rows={5}
                  placeholder={placeholder}
                  className="w-full rounded-lg border border-surface px-4 py-3 outline-none focus:border-primary"
                  whileFocus={{ scale: 1.01, borderColor: "#cf5c0b" }}
                />
              ) : (
                <motion.input
                  key={placeholder}
                  type={placeholder.includes("Email") ? "email" : "text"}
                  required
                  placeholder={placeholder}
                  className="w-full rounded-lg border border-surface px-4 py-3 outline-none focus:border-primary"
                  whileFocus={{ scale: 1.01 }}
                />
              ),
            )}
            <Button type="submit">Send Message</Button>
          </motion.form>
        </Reveal>
      </div>
    </section>
  );
}
