import type { Metadata } from "next";
import { MyOrdersContent } from "@/components/pages/MyOrdersContent";

export const metadata: Metadata = {
  title: "My Orders",
  description: "Track and review your Dotch Flavour Foods orders.",
};

export default function OrdersPage() {
  return <MyOrdersContent />;
}
