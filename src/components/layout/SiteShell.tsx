"use client";

import { useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/motion/PageTransition";

type SiteShellProps = {
  children: React.ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-clip">
      <Header
        mobileOpen={mobileOpen}
        onToggleMobile={() => setMobileOpen((open) => !open)}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <main className="min-w-0 overflow-x-clip pt-16 sm:pt-20">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </div>
  );
}
