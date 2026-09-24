import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminDashboardContent } from "@/components/pages/AdminDashboardContent";
import { getAdminSession } from "@/lib/admin";

export const metadata: Metadata = {
  title: "Staff portal",
  description: "Dotch Flavour Foods staff portal for orders, products, and inventory.",
};

export default async function AdminPage() {
  const admin = await getAdminSession();
  if (!admin) {
    redirect("/admin/sign-in?callbackUrl=/admin");
  }

  return <AdminDashboardContent />;
}
