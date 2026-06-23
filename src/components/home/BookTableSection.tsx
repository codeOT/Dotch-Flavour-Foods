"use client";

import { Calendar, Clock, Mail, MapPin, Phone, User, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { scaleIn } from "@/lib/motion";
import { siteConfig } from "@/lib/site";

export function BookTableSection() {
  return (
    <section className="overflow-hidden py-12 sm:py-16">
      <div className="container-fluid min-w-0">
        <div className="grid min-w-0 gap-8 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <h4 className="mb-2 text-2xl font-bold">Request a Quote</h4>
            <p className="mb-8 text-title/70">
              Lorem Ipsum is that it has a more-or-less normal distribution of letters, to using
              making it look like readable English.
            </p>
            <StaggerContainer className="grid gap-6 sm:grid-cols-2">
              {[
                { icon: User, type: "text", placeholder: "Your Name" },
                { icon: Phone, type: "tel", placeholder: "Phone Number" },
                { icon: Mail, type: "email", placeholder: "Your Email" },
                { icon: Clock, type: "time", placeholder: "" },
                { icon: Calendar, type: "date", placeholder: "" },
              ].map((field) => (
                <StaggerItem key={field.placeholder || field.type}>
                  <motion.label
                    className="flex items-center gap-3 rounded-lg border border-surface bg-white px-4 py-3"
                    whileFocus={{ borderColor: "#cf5c0b", scale: 1.02 }}
                    whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(87, 72, 33, 0.08)" }}
                  >
                    <field.icon className="h-5 w-5 text-primary" />
                    <input
                      type={field.type}
                      required
                      placeholder={field.placeholder}
                      className="w-full outline-none"
                    />
                  </motion.label>
                </StaggerItem>
              ))}
              <StaggerItem className="sm:col-span-2">
                <motion.label
                  className="flex items-center gap-3 rounded-lg border border-surface bg-white px-4 py-3"
                  whileHover={{ y: -2 }}
                >
                  <Users className="h-5 w-5 text-primary" />
                  <select className="w-full bg-transparent outline-none">
                    <option>Number Of People</option>
                    {Array.from({ length: 250 }, (_, i) => i + 10).map((n) => (
                      <option key={n}>{n}</option>
                    ))}
                  </select>
                </motion.label>
              </StaggerItem>
              <StaggerItem className="sm:col-span-2">
                <Button type="submit">Request a Quote</Button>
              </StaggerItem>
            </StaggerContainer>
          </Reveal>

          <Reveal variants={scaleIn}>
            <motion.aside
              className="rounded-2xl bg-forest p-5 text-white sm:p-8"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <h5 className="mb-2 text-xl font-semibold">Contact Info</h5>
              <p className="mb-8 text-sm text-white/80">
                Lorem Ipsum is simply dummy text of the printing typesetting industry.
              </p>
              <ul className="space-y-6 text-sm">
                {[
                  { icon: MapPin, text: siteConfig.contact.address },
                  { icon: Phone, text: `${siteConfig.contact.phone}` },
                  { icon: Mail, text: `${siteConfig.contact.email}` },
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                  >
                    <item.icon className="mt-1 h-5 w-5 shrink-0" />
                    <span className="whitespace-pre-line">{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
