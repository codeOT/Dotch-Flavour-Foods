import type { Metadata } from "next";
import { Suspense } from "react";
import { AccountContent } from "@/components/pages/AccountContent";

export const metadata: Metadata = {
  title: "My Account",
  description: "Manage your Dotch Flavour Foods account details, addresses, orders and settings.",
  robots: { index: false, follow: false },
};

export default function AccountPage() {
  return (
    <Suspense
      fallback={
        <section className="bg-[#f5f5f5] py-10 sm:py-14">
          <div className="container-fluid">
            <div className="h-10 w-48 animate-pulse rounded bg-surface/50" />
            <div className="mt-8 h-[28rem] animate-pulse rounded-xl bg-white" />
          </div>
        </section>
      }
    >
      <AccountContent />
    </Suspense>
  );
}
