"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { CartProvider } from "@/context/CartContext";
import { CartSidebar } from "@/components/cart/CartSidebar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/motion/PageTransition";

const AUTH_PATHS = new Set(["/sign-in", "/sign-up"]);

type SiteShellProps = {
  children: React.ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isAuthPage = AUTH_PATHS.has(pathname);

  return (
    <CartProvider>
      {isAuthPage ? (
        <div className="min-h-screen overflow-x-clip">{children}</div>
      ) : (
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
          <CartSidebar />
        </div>
      )}
    </CartProvider>
  );
}
