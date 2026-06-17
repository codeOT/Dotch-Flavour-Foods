"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";

export function SignInForm() {
  return (
    <StaggerContainer className="container-fluid mx-auto max-w-md space-y-4 rounded-2xl border border-surface bg-white p-8 shadow-sm">
      <StaggerItem>
        <motion.input
          type="email"
          required
          placeholder="Email"
          className="w-full rounded-lg border border-surface px-4 py-3 outline-none focus:border-primary"
          whileFocus={{ scale: 1.02 }}
        />
      </StaggerItem>
      <StaggerItem>
        <motion.input
          type="password"
          required
          placeholder="Password"
          className="w-full rounded-lg border border-surface px-4 py-3 outline-none focus:border-primary"
          whileFocus={{ scale: 1.02 }}
        />
      </StaggerItem>
      <StaggerItem>
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </StaggerItem>
      <StaggerItem>
        <p className="text-center text-sm text-title/70">
          Don&apos;t have an account?{" "}
          <Link href="/contact-us" className="font-medium text-primary hover:underline">
            Contact us
          </Link>
        </p>
      </StaggerItem>
    </StaggerContainer>
  );
}
