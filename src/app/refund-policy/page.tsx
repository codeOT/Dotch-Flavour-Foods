import type { Metadata } from "next";
import { LegalContent } from "@/components/pages/LegalContent";
import { refundReturnsPolicy } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Refund, Returns and Cancellation",
  description: refundReturnsPolicy.description,
};

export default function RefundPolicyPage() {
  return <LegalContent document={refundReturnsPolicy} />;
}
