"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  BarChart3,
  Boxes,
  CircleDollarSign,
  Clock3,
  LayoutDashboard,
  LogOut,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Users2,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { formatPrice } from "@/lib/site";

type DashboardResponse = {
  admin: { name?: string | null; email?: string | null };
  metrics: {
    totalOrders: number;
    pendingOrders: number;
    paidOrders: number;
    usersCount: number;
    paidRevenue: number;
  };
  inventoryReport: Array<{
    itemId: string;
    name: string;
    quantitySold: number;
    revenue: number;
  }>;
  monthlyRevenue: Array<{
    month: string;
    revenue: number;
    orders: number;
  }>;
  recentOrders: Array<{
    id: string;
    orderNumber: string;
    fullName: string;
    email: string;
    status: "pending" | "paid" | "failed" | "cancelled";
    deliveryMethod: "delivery" | "pickup";
    total: number;
    createdAt?: string;
  }>;
  error?: string;
};

const statusStyles: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  paid: "bg-emerald-100 text-emerald-700",
  failed: "bg-red-100 text-red-700",
  cancelled: "bg-slate-200 text-slate-700",
};

function formatMonth(value: string) {
  const [year, month] = value.split("-");
  return new Date(Number(year), Number(month) - 1, 1).toLocaleDateString("en-GB", {
    month: "short",
  });
}

export function AdminDashboardContent() {
  const router = useRouter();
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/admin/dashboard");
        const payload = (await res.json()) as DashboardResponse;
        if (!res.ok) {
          if (!cancelled) {
            if (res.status === 403) {
              router.replace("/admin/sign-in?callbackUrl=/admin");
              return;
            }
            setError(payload.error ?? "Unable to load admin dashboard.");
          }
          return;
        }
        if (!cancelled) setData(payload);
      } catch {
        if (!cancelled) setError("Unable to load admin dashboard.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [router]);

  const maxRevenue = useMemo(() => {
    const values = data?.monthlyRevenue.map((x) => x.revenue) ?? [];
    return Math.max(1, ...values);
  }, [data]);
  const maxInventorySold = useMemo(() => {
    const values = data?.inventoryReport.map((x) => x.quantitySold) ?? [];
    return Math.max(1, ...values);
  }, [data]);

  async function signOutAdmin() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/sign-in");
    router.refresh();
  }

  if (loading) {
    return (
      <section className="bg-white py-12 sm:py-16">
        <div className="container-fluid space-y-4">
          <div className="h-20 animate-pulse rounded-2xl bg-surface/40" />
          <div className="h-56 animate-pulse rounded-2xl bg-surface/40" />
          <div className="h-72 animate-pulse rounded-2xl bg-surface/40" />
        </div>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="bg-white py-12 sm:py-16">
        <div className="container-fluid max-w-3xl">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
            {error || "Unable to load admin dashboard."}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-slate-50 py-10 sm:py-14">
      <div className="container-fluid max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <Reveal className="h-fit rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:sticky lg:top-6">
            <div className="mb-4 rounded-xl bg-secondary px-4 py-3 text-white">
              <p className="text-xs uppercase tracking-wider text-slate-300">Admin</p>
              <p className="mt-1 truncate text-sm font-semibold">{data.admin.name || data.admin.email}</p>
            </div>
            <nav className="space-y-2">
              {[
                { label: "Overview", icon: LayoutDashboard, href: "#overview" },
                { label: "Orders", icon: ShoppingBag, href: "#recent-orders" },
                { label: "Inventory", icon: PackageCheck, href: "#inventory-report" },
                { label: "Revenue", icon: CircleDollarSign, href: "#revenue-trend" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  <item.icon className="h-4 w-4 text-slate-500" />
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-600">
                <ShieldCheck className="h-4 w-4" />
                Admin Access
              </p>
              <p className="mt-2 text-xs text-slate-600">
                This panel is restricted to approved admin emails and a separate admin password.
              </p>
            </div>
          </Reveal>

          <div className="space-y-6">
            <Reveal
              id="overview"
              className="scroll-mt-24 overflow-hidden rounded-3xl border border-slate-200 bg-[#192e22] p-6 text-white shadow-xl sm:p-8"
            >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-300">
                Admin Console
              </p>
              <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Operations Dashboard</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-200">
                Signed in as {data.admin.name || data.admin.email}. Manage orders, revenue, and
                inventory performance in one place.
              </p>
            </div>
            <button
              type="button"
              onClick={() => void signOutAdmin()}
              className="inline-flex items-center gap-2 self-start rounded-md border border-white/30 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-3">
              <p className="text-xs uppercase tracking-wider text-slate-300">Paid Revenue</p>
              <p className="mt-1 text-xl font-semibold">{formatPrice(data.metrics.paidRevenue)}</p>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-3">
              <p className="text-xs uppercase tracking-wider text-slate-300">Paid Orders</p>
              <p className="mt-1 text-xl font-semibold">{data.metrics.paidOrders.toLocaleString()}</p>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-3">
              <p className="text-xs uppercase tracking-wider text-slate-300">Pending Orders</p>
              <p className="mt-1 text-xl font-semibold">
                {data.metrics.pendingOrders.toLocaleString()}
              </p>
            </div>
          </div>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  label: "Total Orders",
                  value: data.metrics.totalOrders.toLocaleString(),
                  icon: Boxes,
                  accent: "from-indigo-500/10 to-indigo-400/5 text-indigo-700",
                },
                {
                  label: "Pending Orders",
                  value: data.metrics.pendingOrders.toLocaleString(),
                  icon: Clock3,
                  accent: "from-amber-500/10 to-amber-400/5 text-amber-700",
                },
                {
                  label: "Customers",
                  value: data.metrics.usersCount.toLocaleString(),
                  icon: Users2,
                  accent: "from-cyan-500/10 to-cyan-400/5 text-cyan-700",
                },
                {
                  label: "Paid Revenue",
                  value: formatPrice(data.metrics.paidRevenue),
                  icon: CircleDollarSign,
                  accent: "from-emerald-500/10 to-emerald-400/5 text-emerald-700",
                },
              ].map((card) => (
                <Reveal
                  key={card.label}
                  className={`rounded-2xl border border-slate-200 bg-gradient-to-br ${card.accent} p-5 shadow-sm`}
                >
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-medium text-slate-700">{card.label}</p>
                    <card.icon className="h-5 w-5" />
                  </div>
                  <p className="mt-3 text-2xl font-bold text-slate-900">{card.value}</p>
                </Reveal>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Reveal
                id="revenue-trend"
                className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900">Revenue trend (6 months)</h2>
                  <BarChart3 className="h-5 w-5 text-slate-400" />
                </div>
                <div className="flex h-56 items-end gap-3">
                  {data.monthlyRevenue.map((point) => {
                    const barHeight = Math.max(8, Math.round((point.revenue / maxRevenue) * 100));
                    return (
                      <div key={point.month} className="flex flex-1 flex-col items-center gap-2">
                        <div className="text-[10px] font-semibold text-slate-500">
                          {formatPrice(point.revenue)}
                        </div>
                        <div
                          className="w-full rounded-t-md bg-gradient-to-t from-primary to-secondary"
                          style={{ height: `${barHeight}%` }}
                        />
                        <div className="text-xs text-slate-600">{formatMonth(point.month)}</div>
                      </div>
                    );
                  })}
                </div>
              </Reveal>

              <Reveal
                id="inventory-report"
                className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900">Inventory report</h2>
                  <PackageCheck className="h-5 w-5 text-slate-400" />
                </div>
                <div className="space-y-3">
                  {data.inventoryReport.slice(0, 7).map((item) => (
                    <div key={item.itemId} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <p className="truncate text-sm font-semibold text-slate-800">{item.name}</p>
                        <p className="text-xs text-slate-500">{item.quantitySold} sold</p>
                      </div>
                      <div className="mb-2 h-2 rounded-full bg-slate-200">
                        <div
                          className="h-2 rounded-full bg-secondary"
                          style={{
                            width: `${Math.min(
                              100,
                              Math.round((item.quantitySold / maxInventorySold) * 100),
                            )}%`,
                          }}
                        />
                      </div>
                      <p className="text-xs text-slate-600">Revenue: {formatPrice(item.revenue)}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal
              id="recent-orders"
              className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Recent orders</h2>
                  <p className="text-sm text-slate-500">Latest customer checkouts and status updates</p>
                </div>
                <Link
                  href="/orders"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                >
                  View all
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="overflow-hidden rounded-xl border border-slate-200">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-left text-slate-600">
                        <th className="px-4 py-3 font-medium">Order</th>
                        <th className="px-4 py-3 font-medium">Customer</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                        <th className="px-4 py-3 font-medium">Delivery</th>
                        <th className="px-4 py-3 font-medium">Total</th>
                        <th className="px-4 py-3 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.recentOrders.map((order) => (
                        <tr
                          key={order.id}
                          className="border-b border-slate-100 transition hover:bg-slate-50/80 last:border-none"
                        >
                          <td className="px-4 py-3 font-semibold text-slate-900">{order.orderNumber}</td>
                          <td className="px-4 py-3">
                            <p className="font-medium text-slate-900">{order.fullName}</p>
                            <p className="text-xs text-slate-500">{order.email}</p>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                                statusStyles[order.status]
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-slate-600">
                            <span className="inline-flex items-center gap-1">
                              <ShoppingBag className="h-3.5 w-3.5" />
                              {order.deliveryMethod}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-semibold text-primary">
                            {formatPrice(order.total)}
                          </td>
                          <td className="px-4 py-3 text-slate-600">
                            {order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-GB") : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
