import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Shop Cart",
};

export default function ShopCartPage() {
  return (
    <>
      <PageHeader title="Shopping Cart" />
      <section className="py-16">
        <Reveal className="container-fluid max-w-2xl rounded-2xl border border-surface bg-white p-8 text-center shadow-sm">
          <p className="mb-6 text-title/70">Your cart is empty. Browse our menu to add items.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/shop">Browse Shop</Button>
            <Link href="/our-menu" className="text-sm font-semibold text-primary hover:underline">
              View Menu
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
