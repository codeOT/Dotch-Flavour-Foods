import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminDashboardContent } from "@/components/pages/AdminDashboardContent";
import { getAdminSession } from "@/lib/admin";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Professional admin dashboard for orders, revenue, and inventory insights.",
};

export default async function AdminPage() {
  const admin = await getAdminSession();
  if (!admin) {
    redirect("/admin/sign-in?callbackUrl=/admin");
  }

  return <AdminDashboardContent />;
}
