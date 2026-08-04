import type { Metadata } from "next";
import { Suspense } from "react";
import { QuoteRequestContent } from "@/components/pages/QuoteRequestContent";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Request a catering, corporate, experience, or wholesale quote from Dotch Flavour Foods.",
};

export default function RequestAQuotePage() {
  return (
    <Suspense fallback={<section className="py-16 text-center text-title/60">Loading form…</section>}>
      <QuoteRequestContent />
    </Suspense>
  );
}
