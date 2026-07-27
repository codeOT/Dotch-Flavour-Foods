import { Suspense } from "react";
import { redirect } from "next/navigation";
import { AdminSignInContent } from "@/components/pages/AdminSignInContent";
import { getAdminSession } from "@/lib/admin";

export default async function AdminSignInPage() {
  const admin = await getAdminSession();
  if (admin) {
    redirect("/admin");
  }

  return (
    <Suspense
      fallback={
        <section className="flex min-h-screen items-center justify-center bg-[#192e22]">
          <div className="h-80 w-full max-w-md animate-pulse rounded-3xl bg-white/10" />
        </section>
      }
    >
      <AdminSignInContent />
    </Suspense>
  );
}
