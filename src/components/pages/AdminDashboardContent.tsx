"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  BarChart3,
  Boxes,
  Eye,
  LayoutDashboard,
  Leaf,
  LogOut,
  Mail,
  Menu,
  PackageCheck,
  PlusCircle,
  ShoppingBag,
  Soup,
  Star,
  Ticket,
  Users2,
  UserRound,
  X,
} from "lucide-react";
import { AdminFeedbackSection } from "@/components/admin/AdminFeedbackSection";
import { AdminProductsSection } from "@/components/admin/AdminProductsSection";
import { OrderStatusBadge } from "@/components/orders/OrderStatusBadge";
import { formatPrice, siteConfig } from "@/lib/site";
import {
  ADMIN_SETTABLE_STATUSES,
  normalizeOrderStatus,
  orderStatusLabels,
  type OrderStatus,
} from "@/lib/order-status";

type AdminSection =
  | "overview"
  | "products"
  | "orders"
  | "feedback"
  | "customers"
  | "coupons"
  | "inventory"
  | "revenue"
  | "team"
  | "account";

type DashboardResponse = {
  admin: { name?: string | null; email?: string | null };
  metrics: {
    totalOrders: number;
    pendingOrders: number;
    paidOrders: number;
    processingOrders: number;
    usersCount: number;
    registeredUsersCount?: number;
    productsCount: number;
    paidRevenue: number;
  };
  productCounts?: {
    readySoups: number;
    bundles: number;
    freshMenu: number;
    adminProducts: number;
    adminReadySoups: number;
    adminFreshFood: number;
    totalCatalog: number;
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
    status: OrderStatus;
    deliveryMethod: "delivery" | "pickup";
    total: number;
    createdAt?: string;
    feedbackEmailSentAt?: string | null;
    feedbackReceived?: boolean;
  }>;
  error?: string;
};

const DASHBOARD_STORAGE_KEY = "dotch-admin-dashboard-v1";

const NAV: { id: AdminSection; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "products", label: "Products", icon: PlusCircle },
  { id: "orders", label: "Orders", icon: ShoppingBag },
  { id: "feedback", label: "Feedback", icon: Star },
  { id: "customers", label: "Customers", icon: Users2 },
  { id: "coupons", label: "Coupons", icon: Ticket },
  { id: "inventory", label: "Inventory report", icon: PackageCheck },
  { id: "revenue", label: "Revenue", icon: BarChart3 },
  { id: "team", label: "Team", icon: Users2 },
  { id: "account", label: "Account", icon: UserRound },
];

function formatMonth(value: string) {
  const [year, month] = value.split("-");
  return new Date(Number(year), Number(month) - 1, 1).toLocaleDateString("en-GB", {
    month: "short",
  });
}

function formatAxisPound(amount: number) {
  if (amount >= 1000) {
    const thousands = amount / 1000;
    return `£${thousands >= 10 ? Math.round(thousands) : thousands.toFixed(1)}k`;
  }
  return `£${Math.round(amount)}`;
}

function RevenueBarChart({
  points,
  maxRevenue,
  heightClass = "h-48",
  showValues = false,
}: {
  points: Array<{ month: string; revenue: number }>;
  maxRevenue: number;
  heightClass?: string;
  showValues?: boolean;
}) {
  const ticks = [1, 0.75, 0.5, 0.25, 0].map((ratio) => ratio * maxRevenue);

  const topPad = showValues ? "pt-6" : "pt-5";

  return (
    <div className="flex gap-2 sm:gap-3">
      <div
        className={`flex ${heightClass} w-10 shrink-0 flex-col justify-between ${topPad} pb-7 text-right text-[10px] font-medium leading-none text-neutral-400`}
      >
        {ticks.map((tick) => (
          <span key={tick}>{formatAxisPound(tick)}</span>
        ))}
      </div>
      <div className="relative min-w-0 flex-1">
        <div
          className={`pointer-events-none absolute inset-x-0 top-0 flex ${heightClass} flex-col justify-between ${topPad} pb-7`}
        >
          {ticks.map((tick) => (
            <div key={tick} className="border-t border-dashed border-neutral-200" />
          ))}
        </div>
        <div className={`relative flex ${heightClass} items-end gap-2 ${topPad} pb-7 sm:gap-3`}>
          {points.map((point) => {
            const pct = maxRevenue > 0 ? (point.revenue / maxRevenue) * 100 : 0;
            const barHeight = point.revenue <= 0 ? 0 : Math.max(6, pct);
            return (
              <div key={point.month} className="group flex h-full min-w-0 flex-1 flex-col items-center">
                <div className="relative flex min-h-0 w-full flex-1 items-end justify-center">
                  {showValues ? (
                    <span className="absolute bottom-full left-1/2 z-10 mb-1 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold text-neutral-600">
                      {formatPrice(point.revenue)}
                    </span>
                  ) : (
                    <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-neutral-950 px-1.5 py-0.5 text-[10px] font-semibold text-white opacity-0 shadow-sm transition group-hover:opacity-100">
                      {formatPrice(point.revenue)}
                    </span>
                  )}
                  <div
                    className="w-[70%] max-w-[2.75rem] rounded-t-lg bg-[#cf5c0b] shadow-[inset_0_-8px_12px_rgba(0,0,0,0.12)] transition group-hover:bg-[#b44e09]"
                    style={{ height: `${barHeight}%` }}
                    title={formatPrice(point.revenue)}
                  />
                </div>
                <div className="mt-2 h-5 text-[11px] font-semibold text-neutral-500">
                  {formatMonth(point.month)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  hint,
  className = "",
}: {
  label: string;
  value: string;
  hint?: string;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 ${className}`}>
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-neutral-500">{label}</p>
      <p className="mt-3 text-3xl font-bold tracking-tight text-neutral-950">{value}</p>
      {hint ? <p className="mt-2 text-sm text-neutral-500">{hint}</p> : null}
    </div>
  );
}

function ComingSoonPanel({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-[#cf5c0b]/30 bg-[#fff7ed] px-5 py-6 text-[#9a3412]">
      <p className="text-sm font-bold uppercase tracking-wider">{title}</p>
      <p className="mt-2 text-sm leading-relaxed">{body}</p>
    </div>
  );
}

export function AdminDashboardContent() {
  const router = useRouter();
  const [section, setSection] = useState<AdminSection>("overview");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingOrder, setUpdatingOrder] = useState<string | null>(null);
  const [sendingFeedback, setSendingFeedback] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState("");

  async function updateOrderStatus(orderNumber: string, status: OrderStatus) {
    setUpdatingOrder(orderNumber);
    setStatusMessage("");
    try {
      const res = await fetch(`/api/admin/orders/${encodeURIComponent(orderNumber)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const payload = (await res.json()) as {
        order?: { orderNumber: string; status: OrderStatus };
        emailSent?: boolean;
        error?: string;
      };
      if (!res.ok || !payload.order) {
        setStatusMessage(payload.error ?? "Unable to update order status.");
        return;
      }

      setData((current) => {
        if (!current) return current;
        return {
          ...current,
          recentOrders: current.recentOrders.map((order) =>
            order.orderNumber === payload.order!.orderNumber
              ? { ...order, status: payload.order!.status }
              : order,
          ),
        };
      });
      const emailNote = payload.emailSent
        ? " Customer email sent."
        : payload.order.status === "paid"
          ? ""
          : " Status saved (email may have been skipped or failed — check Resend).";
      setStatusMessage(
        `Order ${payload.order.orderNumber} marked as ${orderStatusLabels[payload.order.status]}.${emailNote}`,
      );
    } catch {
      setStatusMessage("Unable to update order status.");
    } finally {
      setUpdatingOrder(null);
    }
  }

  async function sendFeedbackMail(orderNumber: string) {
    setSendingFeedback(orderNumber);
    setStatusMessage("");
    try {
      const res = await fetch(
        `/api/admin/orders/${encodeURIComponent(orderNumber)}/feedback`,
        { method: "POST" },
      );
      const payload = (await res.json()) as {
        ok?: boolean;
        email?: string;
        feedbackEmailSentAt?: string;
        error?: string;
      };
      if (!res.ok) {
        setStatusMessage(payload.error ?? "Unable to send feedback email.");
        return;
      }

      setData((current) => {
        if (!current) return current;
        return {
          ...current,
          recentOrders: current.recentOrders.map((order) =>
            order.orderNumber === orderNumber
              ? { ...order, feedbackEmailSentAt: payload.feedbackEmailSentAt ?? new Date().toISOString() }
              : order,
          ),
        };
      });
      setStatusMessage(
        `Feedback email sent to ${payload.email ?? "the customer"} for ${orderNumber}. Their reply will appear under Feedback.`,
      );
    } catch {
      setStatusMessage("Unable to send feedback email.");
    } finally {
      setSendingFeedback(null);
    }
  }

  useEffect(() => {
    let cancelled = false;
    let hadCache = false;

    try {
      const raw = sessionStorage.getItem(DASHBOARD_STORAGE_KEY);
      if (raw) {
        const cached = JSON.parse(raw) as DashboardResponse;
        if (cached?.metrics) {
          setData(cached);
          setLoading(false);
          hadCache = true;
        }
      }
    } catch {
      sessionStorage.removeItem(DASHBOARD_STORAGE_KEY);
    }

    async function load() {
      if (!hadCache) setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/admin/dashboard");
        const payload = (await res.json()) as DashboardResponse;
        if (!res.ok) {
          if (!cancelled) {
            if (res.status === 403) {
              sessionStorage.removeItem(DASHBOARD_STORAGE_KEY);
              router.replace("/admin/sign-in?callbackUrl=/admin");
              return;
            }
            if (!hadCache) setError(payload.error ?? "Unable to load admin dashboard.");
          }
          return;
        }
        if (!cancelled) {
          setData(payload);
          sessionStorage.setItem(DASHBOARD_STORAGE_KEY, JSON.stringify(payload));
        }
      } catch {
        if (!cancelled && !hadCache) setError("Unable to load admin dashboard.");
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
    sessionStorage.removeItem(DASHBOARD_STORAGE_KEY);
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/sign-in");
    router.refresh();
  }

  function goTo(next: AdminSection) {
    setSection(next);
    setMobileNavOpen(false);
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f5f5]">
        <div className="h-10 w-48 animate-pulse rounded-full bg-neutral-200" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f5f5] px-4">
        <div className="max-w-md rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
          {error || "Unable to load admin dashboard."}
        </div>
      </div>
    );
  }

  const sectionTitle = NAV.find((item) => item.id === section)?.label ?? "Overview";

  const sidebar = (
    <aside className="flex h-full min-h-screen w-full flex-col bg-neutral-950 text-white lg:w-[17.5rem]">
      <div className="border-b border-white/10 px-5 py-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#cf5c0b]">
          {siteConfig.name}
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">Staff portal</h1>
        <p className="mt-3 truncate text-sm text-neutral-400">{data.admin.email}</p>
        <span className="mt-3 inline-flex rounded-full bg-[#cf5c0b] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
          Owner
        </span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {NAV.map((item) => {
          const active = section === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => goTo(item.id)}
              className={`flex w-full items-center gap-3 rounded-full px-4 py-2.5 text-left text-sm font-medium transition ${
                active
                  ? "bg-[#cf5c0b] text-neutral-950"
                  : "text-white/85 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="space-y-2 border-t border-white/10 p-4">
        <Link
          href="/"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/30 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          <Eye className="h-4 w-4" />
          View storefront
        </Link>
        <button
          type="button"
          onClick={() => void signOutAdmin()}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/30 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-[#f3f3f3] lg:grid lg:grid-cols-[17.5rem_minmax(0,1fr)]">
      <div className="hidden lg:block">{sidebar}</div>

      {mobileNavOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            aria-label="Close menu"
            onClick={() => setMobileNavOpen(false)}
          />
          <div className="relative h-full w-[min(100%,18rem)] overflow-y-auto">{sidebar}</div>
        </div>
      ) : null}

      <div className="min-w-0">
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-black/5 bg-[#f3f3f3]/95 px-4 py-3 backdrop-blur lg:hidden">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#cf5c0b]">
              {siteConfig.name}
            </p>
            <p className="text-sm font-bold text-neutral-950">Staff portal</p>
          </div>
          <button
            type="button"
            onClick={() => setMobileNavOpen(true)}
            className="rounded-full border border-neutral-300 bg-white p-2 text-neutral-800"
            aria-label="Open menu"
          >
            {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mb-6">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-950">{sectionTitle}</h2>
            <p className="mt-1 text-sm text-neutral-500">
              {section === "overview"
                ? new Date().toLocaleDateString("en-GB", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })
                : "Full access"}
            </p>
          </div>

          {section === "overview" && (
            <div className="space-y-6">
              <div className="grid gap-4 lg:grid-cols-4">
                <div className="rounded-3xl bg-neutral-950 p-6 text-white lg:col-span-2">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#cf5c0b]">
                    Paid revenue
                  </p>
                  <p className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                    {formatPrice(data.metrics.paidRevenue)}
                  </p>
                  <p className="mt-2 text-sm text-white/55">Confirmed and fulfilling orders</p>
                </div>
                <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-neutral-500">
                    Orders
                  </p>
                  <p className="mt-4 text-4xl font-bold tracking-tight text-neutral-950">
                    {data.metrics.totalOrders}
                  </p>
                  <p className="mt-2 text-sm text-neutral-500">
                    {data.metrics.processingOrders} in fulfilment
                  </p>
                </div>
                <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-neutral-500">
                    Customers
                  </p>
                  <p className="mt-4 text-4xl font-bold tracking-tight text-neutral-950">
                    {data.metrics.usersCount}
                  </p>
                  <p className="mt-2 text-sm text-neutral-500">Unique order emails</p>
                </div>
              </div>

              <div>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-neutral-500">
                    Catalogue
                  </h3>
                  <button
                    type="button"
                    onClick={() => goTo("products")}
                    className="text-sm font-semibold text-[#cf5c0b] hover:underline"
                  >
                    Manage products
                  </button>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    {
                      label: "Ready Soups",
                      value: data.productCounts?.readySoups ?? 0,
                      hint: "Live flavours",
                      icon: Soup,
                    },
                    {
                      label: "Mix bundles",
                      value: data.productCounts?.bundles ?? 0,
                      hint: "3, 4 and 5 packs",
                      icon: Boxes,
                    },
                    {
                      label: "Fresh menu",
                      value: data.productCounts?.freshMenu ?? 0,
                      hint: "Tray dishes",
                      icon: Leaf,
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.label}
                        className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5"
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#fff4eb] text-[#cf5c0b]">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-2xl font-bold tracking-tight text-neutral-950">
                            {item.value}
                          </p>
                          <p className="text-sm font-semibold text-neutral-800">{item.label}</p>
                          <p className="text-xs text-neutral-500">{item.hint}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-4 xl:grid-cols-5">
                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 xl:col-span-3">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <h3 className="text-lg font-bold text-neutral-950">Latest orders</h3>
                    <button
                      type="button"
                      onClick={() => goTo("orders")}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[#cf5c0b] hover:underline"
                    >
                      View all
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                  {data.recentOrders.length === 0 ? (
                    <p className="text-sm text-neutral-500">No orders yet.</p>
                  ) : (
                    <ul className="divide-y divide-neutral-100">
                      {data.recentOrders.slice(0, 5).map((order) => (
                        <li
                          key={order.id}
                          className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
                        >
                          <div className="min-w-0">
                            <p className="truncate font-semibold text-neutral-950">
                              {order.fullName}
                            </p>
                            <p className="truncate text-xs text-neutral-500">
                              {order.orderNumber}
                              {order.createdAt
                                ? ` · ${new Date(order.createdAt).toLocaleDateString("en-GB")}`
                                : ""}
                            </p>
                          </div>
                          <div className="flex shrink-0 flex-col items-end gap-1">
                            <p className="text-sm font-bold text-neutral-950">
                              {formatPrice(order.total)}
                            </p>
                            <OrderStatusBadge status={order.status} />
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 xl:col-span-2">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <h3 className="text-lg font-bold text-neutral-950">Revenue</h3>
                    <button
                      type="button"
                      onClick={() => goTo("revenue")}
                      className="text-sm font-semibold text-[#cf5c0b] hover:underline"
                    >
                      Full chart
                    </button>
                  </div>
                  <RevenueBarChart
                    points={data.monthlyRevenue}
                    maxRevenue={maxRevenue}
                    heightClass="h-48"
                  />
                </div>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h3 className="text-lg font-bold text-neutral-950">Top sellers</h3>
                  <button
                    type="button"
                    onClick={() => goTo("inventory")}
                    className="text-sm font-semibold text-[#cf5c0b] hover:underline"
                  >
                    Inventory
                  </button>
                </div>
                {data.inventoryReport.length === 0 ? (
                  <p className="text-sm text-neutral-500">No sold items yet.</p>
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {data.inventoryReport.slice(0, 6).map((item) => (
                      <div key={item.itemId} className="rounded-xl border border-neutral-100 bg-neutral-50 p-3">
                        <div className="mb-2 flex items-start justify-between gap-3">
                          <p className="truncate text-sm font-semibold text-neutral-900">{item.name}</p>
                          <p className="shrink-0 text-xs text-neutral-500">{item.quantitySold} sold</p>
                        </div>
                        <div className="mb-2 h-1.5 rounded-full bg-neutral-200">
                          <div
                            className="h-1.5 rounded-full bg-[#cf5c0b]"
                            style={{
                              width: `${Math.min(
                                100,
                                Math.round((item.quantitySold / maxInventorySold) * 100),
                              )}%`,
                            }}
                          />
                        </div>
                        <p className="text-xs font-medium text-neutral-600">{formatPrice(item.revenue)}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {section === "products" && (
            <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-6">
              <AdminProductsSection />
            </div>
          )}

          {section === "feedback" && (
            <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-6">
              <AdminFeedbackSection />
            </div>
          )}

          {section === "orders" && (
            <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-neutral-950">Recent orders</h3>
                  <p className="text-sm text-neutral-500">
                    Update fulfilment, then send a feedback email. Replies are saved under Feedback.
                  </p>
                </div>
                <Link
                  href="/orders"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[#cf5c0b] hover:underline"
                >
                  Customer view
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
              {statusMessage && (
                <p className="mb-3 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-700">
                  {statusMessage}
                </p>
              )}
              <div className="overflow-hidden rounded-xl border border-neutral-200">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="border-b border-neutral-200 bg-neutral-50 text-left text-neutral-600">
                        <th className="px-4 py-3 font-medium">Order</th>
                        <th className="px-4 py-3 font-medium">Customer</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                        <th className="px-4 py-3 font-medium">Update</th>
                        <th className="px-4 py-3 font-medium">Feedback</th>
                        <th className="px-4 py-3 font-medium">Total</th>
                        <th className="px-4 py-3 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.recentOrders.map((order) => {
                        const status = normalizeOrderStatus(order.status);
                        const canEdit = status !== "pending" && status !== "failed";
                        return (
                          <tr
                            key={order.id}
                            className="border-b border-neutral-100 last:border-none hover:bg-neutral-50/80"
                          >
                            <td className="px-4 py-3 font-semibold text-neutral-950">
                              {order.orderNumber}
                            </td>
                            <td className="px-4 py-3">
                              <p className="font-medium text-neutral-950">{order.fullName}</p>
                              <p className="text-xs text-neutral-500">{order.email}</p>
                            </td>
                            <td className="px-4 py-3">
                              <OrderStatusBadge status={status} />
                            </td>
                            <td className="px-4 py-3">
                              {canEdit ? (
                                <select
                                  className="rounded-md border border-neutral-200 bg-white px-2 py-1.5 text-xs font-medium text-neutral-800 outline-none focus:border-[#cf5c0b]"
                                  value={
                                    ADMIN_SETTABLE_STATUSES.includes(status) ? status : "paid"
                                  }
                                  disabled={updatingOrder === order.orderNumber}
                                  onChange={(event) =>
                                    void updateOrderStatus(
                                      order.orderNumber,
                                      event.target.value as OrderStatus,
                                    )
                                  }
                                >
                                  {ADMIN_SETTABLE_STATUSES.map((option) => (
                                    <option key={option} value={option}>
                                      {orderStatusLabels[option]}
                                    </option>
                                  ))}
                                </select>
                              ) : (
                                <span className="text-xs text-neutral-400">—</span>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              {order.feedbackReceived ? (
                                <span className="inline-flex h-[30px] items-center text-xs font-medium text-emerald-700">
                                  Received
                                </span>
                              ) : canEdit ? (
                                <button
                                  type="button"
                                  disabled={sendingFeedback === order.orderNumber}
                                  onClick={() => void sendFeedbackMail(order.orderNumber)}
                                  className="inline-flex h-[30px] items-center gap-1 whitespace-nowrap rounded-md border border-neutral-200 bg-white px-2 py-1.5 text-xs font-medium text-neutral-800 outline-none transition hover:border-[#cf5c0b] focus:border-[#cf5c0b] disabled:opacity-50"
                                >
                                  <Mail className="h-3.5 w-3.5 shrink-0" />
                                  {sendingFeedback === order.orderNumber
                                    ? "Sending…"
                                    : order.feedbackEmailSentAt
                                      ? "Resend"
                                      : "Send"}
                                </button>
                              ) : (
                                <span className="text-xs text-neutral-400">—</span>
                              )}
                            </td>
                            <td className="px-4 py-3 font-semibold text-[#cf5c0b]">
                              {formatPrice(order.total)}
                            </td>
                            <td className="px-4 py-3 text-neutral-600">
                              {order.createdAt
                                ? new Date(order.createdAt).toLocaleDateString("en-GB")
                                : "—"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {section === "customers" && (
            <div className="space-y-4">
              <MetricCard
                label="Customers"
                value={String(data.metrics.usersCount)}
                hint="Unique emails used to place an order, including guest checkout."
              />
              <MetricCard
                label="Registered accounts"
                value={String(data.metrics.registeredUsersCount ?? 0)}
                hint="People who created a storefront account."
              />
              <ComingSoonPanel
                title="Customer directory"
                body="A searchable customer list with order history will land here next. For now, customer details appear on each order."
              />
            </div>
          )}

          {section === "coupons" && (
            <ComingSoonPanel
              title="Coupons"
              body="Discount codes and promotions are not enabled yet. This section is ready for a future coupons release."
            />
          )}

          {section === "inventory" && (
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-neutral-950">Inventory report</h3>
                <PackageCheck className="h-5 w-5 text-neutral-400" />
              </div>
              <div className="space-y-3">
                {data.inventoryReport.length === 0 ? (
                  <p className="text-sm text-neutral-500">No sold items yet.</p>
                ) : (
                  data.inventoryReport.slice(0, 10).map((item) => (
                    <div
                      key={item.itemId}
                      className="rounded-xl border border-neutral-100 bg-neutral-50 p-3"
                    >
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <p className="truncate text-sm font-semibold text-neutral-900">{item.name}</p>
                        <p className="text-xs text-neutral-500">{item.quantitySold} sold</p>
                      </div>
                      <div className="mb-2 h-2 rounded-full bg-neutral-200">
                        <div
                          className="h-2 rounded-full bg-[#cf5c0b]"
                          style={{
                            width: `${Math.min(
                              100,
                              Math.round((item.quantitySold / maxInventorySold) * 100),
                            )}%`,
                          }}
                        />
                      </div>
                      <p className="text-xs text-neutral-600">Revenue: {formatPrice(item.revenue)}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {section === "revenue" && (
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-neutral-950">Revenue trend (6 months)</h3>
                <BarChart3 className="h-5 w-5 text-neutral-400" />
              </div>
              <RevenueBarChart
                points={data.monthlyRevenue}
                maxRevenue={maxRevenue}
                heightClass="h-64"
                showValues
              />
            </div>
          )}

          {section === "team" && (
            <ComingSoonPanel
              title="Team"
              body="Invite staff with role-based access from this panel in a future update. Right now only owner admin credentials can sign in."
            />
          )}

          {section === "account" && (
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
              <h3 className="text-lg font-bold text-neutral-950">Account</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-4 border-b border-neutral-100 pb-3">
                  <dt className="text-neutral-500">Email</dt>
                  <dd className="font-semibold text-neutral-950">{data.admin.email}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-neutral-100 pb-3">
                  <dt className="text-neutral-500">Role</dt>
                  <dd>
                    <span className="rounded-full bg-[#cf5c0b] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      Owner
                    </span>
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-neutral-500">Access</dt>
                  <dd className="font-semibold text-neutral-950">Full access</dd>
                </div>
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
