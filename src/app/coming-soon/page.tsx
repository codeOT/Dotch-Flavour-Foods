import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Coming Soon",
};

export default function ComingSoonPage() {
  return (
    <>
      <PageHeader title="Coming Soon" description="Something delicious is on the way." />
      <section className="py-24 text-center">
        <div className="container-fluid">
          <p className="text-lg text-title/70">
            We are working on something exciting. Check back soon!
          </p>
        </div>
      </section>
    </>
  );
}
