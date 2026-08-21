"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  ChevronDown,
  MapPin,
  Package,
  Settings,
  ShoppingBag,
  Tag,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DeliveryProgress } from "@/components/orders/DeliveryProgress";
import { OrderStatusBadge } from "@/components/orders/OrderStatusBadge";
import { formatPrice } from "@/lib/site";
import { type OrderStatus } from "@/lib/order-status";

export type AccountSection =
  | "details"
  | "addresses"
  | "orders"
  | "newsletters"
  | "settings";

type AccountAddress = {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postcode: string;
  isDefault: boolean;
};

type AccountProfile = {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  provider: string;
  newsletter: {
    offers: boolean;
    recipes: boolean;
    events: boolean;
  };
  addresses: AccountAddress[];
};

type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type OrderSummary = {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  deliveryMethod: "delivery" | "pickup";
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  postcode?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
  paidAt?: string;
  shippedAt?: string;
  deliveredAt?: string;
};

const NAV: {
  id: AccountSection;
  label: string;
  icon: typeof UserRound;
}[] = [
  { id: "orders", label: "My orders", icon: ShoppingBag },
  { id: "details", label: "My details", icon: UserRound },
  { id: "addresses", label: "My address book", icon: MapPin },
  { id: "newsletters", label: "My newsletters", icon: Tag },
  { id: "settings", label: "Account settings", icon: Settings },
];

const inputClassName =
  "w-full rounded-md border border-[#d9d9d9] bg-[#fafafa] px-3 py-2.5 text-sm text-title outline-none transition focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary/20";

const labelClassName =
  "mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-title/70";

function formatDate(value?: string) {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function SectionHeading({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-6 border-b border-[#ececec] pb-3">
      <h2 className="text-base font-bold text-title sm:text-lg">{title}</h2>
      {children}
    </div>
  );
}

function Message({ tone, children }: { tone: "error" | "success"; children: ReactNode }) {
  const classes =
    tone === "error"
      ? "border-red-200 bg-red-50 text-red-700"
      : "border-primary/20 bg-primary/5 text-primary";
  return <p className={`rounded-md border px-4 py-3 text-sm ${classes}`}>{children}</p>;
}

function OrderCard({ order }: { order: OrderSummary }) {
  const [open, setOpen] = useState(false);

  return (
    <article className="overflow-hidden rounded-xl border border-[#ececec] bg-white">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-start justify-between gap-4 p-4 text-left sm:p-5"
      >
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <p className="font-bold text-title">{order.orderNumber}</p>
            <OrderStatusBadge status={order.status} />
          </div>
          <p className="text-sm text-title/60">{formatDate(order.createdAt)}</p>
          <p className="mt-1 text-sm text-title/70">
            {order.items.length} item{order.items.length === 1 ? "" : "s"} ·{" "}
            {order.deliveryMethod === "delivery" ? "Home delivery" : "Collection"}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <p className="text-lg font-bold text-primary">{formatPrice(order.total)}</p>
          <ChevronDown
            className={`h-5 w-5 text-title/50 transition ${open ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      <div className="border-t border-[#ececec] px-4 py-4 sm:px-5">
        <DeliveryProgress order={order} />
      </div>

      {open && (
        <div className="border-t border-[#ececec] px-4 py-4 sm:px-5">
          <ul className="mb-4 space-y-3">
            {order.items.map((item) => (
              <li key={`${order.id}-${item.id}`} className="flex items-center gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-surface">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-title">{item.name}</p>
                  <p className="text-xs text-title/60">Qty {item.quantity}</p>
                </div>
                <p className="text-sm font-semibold text-primary">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </li>
            ))}
          </ul>
          {order.deliveryMethod === "delivery" && (
            <p className="flex gap-2 text-sm text-title/70">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
              {[order.addressLine1, order.addressLine2, order.city, order.postcode]
                .filter(Boolean)
                .join(", ")}
            </p>
          )}
          {order.deliveryMethod === "pickup" && (
            <p className="flex gap-2 text-sm text-title/70">
              <Package className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
              Collection order
            </p>
          )}
        </div>
      )}
    </article>
  );
}

export function AccountContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status, update } = useSession();
  const sectionParam = searchParams.get("section") as AccountSection | null;
  const section: AccountSection = NAV.some((item) => item.id === sectionParam)
    ? (sectionParam as AccountSection)
    : "orders";

  const [profile, setProfile] = useState<AccountProfile | null>(null);
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [detailsForm, setDetailsForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [detailsMessage, setDetailsMessage] = useState("");
  const [detailsError, setDetailsError] = useState("");
  const [detailsSaving, setDetailsSaving] = useState(false);

  const [addressForm, setAddressForm] = useState({
    label: "Home",
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    postcode: "",
    isDefault: true,
  });
  const [addressSaving, setAddressSaving] = useState(false);
  const [addressError, setAddressError] = useState("");
  const [addressMessage, setAddressMessage] = useState("");

  const [newsletterForm, setNewsletterForm] = useState({
    offers: false,
    recipes: false,
    events: false,
  });
  const [newsletterSaving, setNewsletterSaving] = useState(false);
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const [newsletterError, setNewsletterError] = useState("");

  const [settingsForm, setSettingsForm] = useState({
    username: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [settingsSaving, setSettingsSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [settingsMessage, setSettingsMessage] = useState("");
  const [settingsError, setSettingsError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/sign-in?callbackUrl=/account");
    }
  }, [status, router]);

  const applyProfile = useCallback((next: AccountProfile) => {
    setProfile(next);
    setDetailsForm({
      firstName: next.firstName,
      lastName: next.lastName,
      phone: next.phone,
    });
    setNewsletterForm(next.newsletter);
    setSettingsForm((current) => ({
      ...current,
      username: next.username,
    }));
    setAddressForm((current) => ({
      ...current,
      fullName: current.fullName || next.name,
      phone: current.phone || next.phone,
    }));
  }, []);

  useEffect(() => {
    if (status !== "authenticated") return;

    let cancelled = false;

    async function load() {
      setLoading(true);
      setLoadError("");
      try {
        const [profileRes, ordersRes] = await Promise.all([
          fetch("/api/account/profile"),
          fetch("/api/orders"),
        ]);
        const profileData = (await profileRes.json()) as {
          user?: AccountProfile;
          error?: string;
        };
        const ordersData = (await ordersRes.json()) as {
          orders?: OrderSummary[];
          error?: string;
        };

        if (!profileRes.ok || !profileData.user) {
          if (!cancelled) setLoadError(profileData.error ?? "Unable to load account.");
          return;
        }

        if (!cancelled) {
          applyProfile(profileData.user);
          if (ordersRes.ok) setOrders(ordersData.orders ?? []);
        }
      } catch {
        if (!cancelled) setLoadError("Unable to load account.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [status, applyProfile]);

  const setSection = (next: AccountSection) => {
    router.replace(`/account?section=${next}`, { scroll: false });
  };

  const activeTitle = useMemo(
    () => NAV.find((item) => item.id === section)?.label ?? "My orders",
    [section],
  );

  async function saveDetails(event: FormEvent) {
    event.preventDefault();
    setDetailsSaving(true);
    setDetailsError("");
    setDetailsMessage("");
    try {
      const response = await fetch("/api/account/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(detailsForm),
      });
      const data = (await response.json()) as { user?: AccountProfile; error?: string };
      if (!response.ok || !data.user) {
        setDetailsError(data.error ?? "Unable to save details.");
        return;
      }
      applyProfile(data.user);
      setDetailsMessage("Your personal information has been saved.");
      await update({ name: data.user.name });
    } catch {
      setDetailsError("Unable to save details.");
    } finally {
      setDetailsSaving(false);
    }
  }

  async function saveAddress(event: FormEvent) {
    event.preventDefault();
    setAddressSaving(true);
    setAddressError("");
    setAddressMessage("");
    try {
      const response = await fetch("/api/account/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addressForm),
      });
      const data = (await response.json()) as { addresses?: AccountAddress[]; error?: string };
      if (!response.ok || !data.addresses || !profile) {
        setAddressError(data.error ?? "Unable to save address.");
        return;
      }
      setProfile({ ...profile, addresses: data.addresses });
      setAddressMessage("Address saved to your address book.");
      setAddressForm({
        label: "Home",
        fullName: profile.name,
        phone: profile.phone,
        addressLine1: "",
        addressLine2: "",
        city: "",
        postcode: "",
        isDefault: data.addresses.length === 0,
      });
    } catch {
      setAddressError("Unable to save address.");
    } finally {
      setAddressSaving(false);
    }
  }

  async function removeAddress(id: string) {
    if (!profile) return;
    setAddressError("");
    try {
      const response = await fetch(`/api/account/addresses?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = (await response.json()) as { addresses?: AccountAddress[]; error?: string };
      if (!response.ok || !data.addresses) {
        setAddressError(data.error ?? "Unable to remove address.");
        return;
      }
      setProfile({ ...profile, addresses: data.addresses });
      setAddressMessage("Address removed.");
    } catch {
      setAddressError("Unable to remove address.");
    }
  }

  async function saveNewsletter(event: FormEvent) {
    event.preventDefault();
    setNewsletterSaving(true);
    setNewsletterError("");
    setNewsletterMessage("");
    try {
      const response = await fetch("/api/account/newsletter", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newsletterForm),
      });
      const data = (await response.json()) as {
        newsletter?: AccountProfile["newsletter"];
        error?: string;
      };
      if (!response.ok || !data.newsletter || !profile) {
        setNewsletterError(data.error ?? "Unable to save preferences.");
        return;
      }
      setProfile({ ...profile, newsletter: data.newsletter });
      setNewsletterForm(data.newsletter);
      setNewsletterMessage("Newsletter preferences saved.");
    } catch {
      setNewsletterError("Unable to save preferences.");
    } finally {
      setNewsletterSaving(false);
    }
  }

  async function saveUsername(event: FormEvent) {
    event.preventDefault();
    setSettingsSaving(true);
    setSettingsError("");
    setSettingsMessage("");
    try {
      const response = await fetch("/api/account/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: settingsForm.username }),
      });
      const data = (await response.json()) as { user?: AccountProfile; error?: string };
      if (!response.ok || !data.user) {
        setSettingsError(data.error ?? "Unable to update username.");
        return;
      }
      applyProfile(data.user);
      setSettingsMessage("Username updated.");
    } catch {
      setSettingsError("Unable to update username.");
    } finally {
      setSettingsSaving(false);
    }
  }

  async function savePassword(event: FormEvent) {
    event.preventDefault();
    setPasswordSaving(true);
    setSettingsError("");
    setSettingsMessage("");
    try {
      const response = await fetch("/api/account/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: settingsForm.currentPassword,
          newPassword: settingsForm.newPassword,
          confirmPassword: settingsForm.confirmPassword,
        }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setSettingsError(data.error ?? "Unable to update password.");
        return;
      }
      setSettingsForm((current) => ({
        ...current,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      setSettingsMessage("Password updated.");
    } catch {
      setSettingsError("Unable to update password.");
    } finally {
      setPasswordSaving(false);
    }
  }

  if (status === "loading" || status === "unauthenticated" || loading) {
    return (
      <section className="bg-[#f5f5f5] py-10 sm:py-14">
        <div className="container-fluid">
          <div className="h-10 w-48 animate-pulse rounded bg-surface/50" />
          <div className="mt-8 h-[28rem] animate-pulse rounded-xl bg-white" />
        </div>
      </section>
    );
  }

  if (loadError || !profile) {
    return (
      <section className="bg-[#f5f5f5] py-16">
        <div className="container-fluid max-w-lg">
          <Message tone="error">{loadError || "Unable to load account."}</Message>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#f5f5f5] py-10 sm:py-14">
      <div className="container-fluid min-w-0">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-title sm:text-4xl">
          My Account
        </h1>

        <div className="grid gap-6 lg:grid-cols-[15rem_minmax(0,1fr)] xl:grid-cols-[16rem_minmax(0,1fr)]">
          <aside className="h-fit rounded-xl bg-white p-3 shadow-sm sm:p-4">
            <nav aria-label="Account sections" className="space-y-1">
              {NAV.map((item) => {
                const active = section === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSection(item.id)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                      active
                        ? "bg-primary/10 font-semibold text-primary"
                        : "text-title/75 hover:bg-[#f7f5f1] hover:text-title"
                    }`}
                  >
                    <Icon className={`h-4 w-4 shrink-0 ${active ? "text-primary" : "text-title/45"}`} />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </aside>

          <div className="rounded-xl bg-white p-5 shadow-sm sm:p-8">
            <h2 className="mb-8 text-2xl font-bold text-title sm:text-[1.75rem]">{activeTitle}</h2>

            {section === "details" && (
              <div className="space-y-10">
                <div>
                  <SectionHeading title="Personal Information" />
                  <form onSubmit={saveDetails} className="grid gap-8 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]">
                    <p className="text-sm leading-relaxed text-title/60">
                      Keep your details up to date so we can prepare deliveries and contact you about
                      Ready Soups or catering orders.
                    </p>
                    <div className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="firstName" className={labelClassName}>
                            First name
                          </label>
                          <input
                            id="firstName"
                            className={inputClassName}
                            value={detailsForm.firstName}
                            onChange={(event) =>
                              setDetailsForm((current) => ({
                                ...current,
                                firstName: event.target.value,
                              }))
                            }
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className={labelClassName}>
                            Second name
                          </label>
                          <input
                            id="lastName"
                            className={inputClassName}
                            value={detailsForm.lastName}
                            onChange={(event) =>
                              setDetailsForm((current) => ({
                                ...current,
                                lastName: event.target.value,
                              }))
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="phone" className={labelClassName}>
                          Phone number
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          className={inputClassName}
                          value={detailsForm.phone}
                          onChange={(event) =>
                            setDetailsForm((current) => ({
                              ...current,
                              phone: event.target.value,
                            }))
                          }
                          placeholder="+447700900123"
                        />
                        <p className="mt-1.5 text-xs text-title/50">
                          Use your UK mobile with country code, no spaces if possible.
                        </p>
                      </div>
                      <Button type="submit" loading={detailsSaving} className="!rounded-md !px-8">
                        Save
                      </Button>
                    </div>
                  </form>
                </div>

                <div>
                  <SectionHeading title="E-mail address" />
                  <div className="grid gap-8 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]">
                    <p className="text-sm leading-relaxed text-title/60">
                      Your email is set when you create your account and cannot be changed. Contact
                      us if you need help with this address.
                    </p>
                    <div>
                      <label htmlFor="email" className={labelClassName}>
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className={`${inputClassName} cursor-not-allowed bg-[#f0f0f0] text-title/70`}
                        value={profile.email}
                        readOnly
                        disabled
                      />
                      <p className="mt-1.5 text-xs text-title/50">
                        Need a different email?{" "}
                        <Link href="/contact-us" className="font-semibold text-primary hover:underline">
                          Contact us
                        </Link>
                        .
                      </p>
                    </div>
                  </div>
                </div>

                {(detailsError || detailsMessage) && (
                  <Message tone={detailsError ? "error" : "success"}>
                    {detailsError || detailsMessage}
                  </Message>
                )}
              </div>
            )}

            {section === "addresses" && (
              <div className="space-y-8">
                <SectionHeading title="Saved addresses" />
                {profile.addresses.length === 0 ? (
                  <p className="text-sm text-title/60">No saved addresses yet.</p>
                ) : (
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {profile.addresses.map((address) => (
                      <li
                        key={address.id}
                        className="rounded-xl border border-[#ececec] bg-[#fafafa] p-4"
                      >
                        <div className="mb-2 flex items-start justify-between gap-3">
                          <p className="font-semibold text-title">
                            {address.label}
                            {address.isDefault ? (
                              <span className="ml-2 text-xs font-medium text-secondary">Default</span>
                            ) : null}
                          </p>
                          <button
                            type="button"
                            onClick={() => void removeAddress(address.id)}
                            className="text-xs font-semibold text-title/50 hover:text-accent-red"
                          >
                            Remove
                          </button>
                        </div>
                        <p className="text-sm text-title/75">{address.fullName}</p>
                        <p className="mt-1 text-sm text-title/65">
                          {[address.addressLine1, address.addressLine2, address.city, address.postcode]
                            .filter(Boolean)
                            .join(", ")}
                        </p>
                        {address.phone ? (
                          <p className="mt-1 text-sm text-title/55">{address.phone}</p>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                )}

                <SectionHeading title="Add address" />
                <form onSubmit={saveAddress} className="grid max-w-xl gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="addressLabel" className={labelClassName}>
                        Label
                      </label>
                      <input
                        id="addressLabel"
                        className={inputClassName}
                        value={addressForm.label}
                        onChange={(event) =>
                          setAddressForm((current) => ({ ...current, label: event.target.value }))
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="addressFullName" className={labelClassName}>
                        Full name
                      </label>
                      <input
                        id="addressFullName"
                        className={inputClassName}
                        value={addressForm.fullName}
                        onChange={(event) =>
                          setAddressForm((current) => ({
                            ...current,
                            fullName: event.target.value,
                          }))
                        }
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="addressLine1" className={labelClassName}>
                      Address line 1
                    </label>
                    <input
                      id="addressLine1"
                      className={inputClassName}
                      value={addressForm.addressLine1}
                      onChange={(event) =>
                        setAddressForm((current) => ({
                          ...current,
                          addressLine1: event.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="addressLine2" className={labelClassName}>
                      Address line 2
                    </label>
                    <input
                      id="addressLine2"
                      className={inputClassName}
                      value={addressForm.addressLine2}
                      onChange={(event) =>
                        setAddressForm((current) => ({
                          ...current,
                          addressLine2: event.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="city" className={labelClassName}>
                        City
                      </label>
                      <input
                        id="city"
                        className={inputClassName}
                        value={addressForm.city}
                        onChange={(event) =>
                          setAddressForm((current) => ({ ...current, city: event.target.value }))
                        }
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="postcode" className={labelClassName}>
                        Postcode
                      </label>
                      <input
                        id="postcode"
                        className={inputClassName}
                        value={addressForm.postcode}
                        onChange={(event) =>
                          setAddressForm((current) => ({
                            ...current,
                            postcode: event.target.value,
                          }))
                        }
                        required
                      />
                    </div>
                  </div>
                  <label className="flex items-center gap-2 text-sm text-title/70">
                    <input
                      type="checkbox"
                      checked={addressForm.isDefault}
                      onChange={(event) =>
                        setAddressForm((current) => ({
                          ...current,
                          isDefault: event.target.checked,
                        }))
                      }
                      className="accent-primary"
                    />
                    Set as default delivery address
                  </label>
                  <Button type="submit" loading={addressSaving} className="!rounded-md !px-8 sm:w-auto">
                    Save address
                  </Button>
                </form>
                {(addressError || addressMessage) && (
                  <Message tone={addressError ? "error" : "success"}>
                    {addressError || addressMessage}
                  </Message>
                )}
              </div>
            )}

            {section === "orders" && (
              <div className="space-y-6">
                <SectionHeading title="Order history" />
                {orders.length === 0 ? (
                  <div className="rounded-xl border border-[#ececec] bg-[#fafafa] p-8 text-center">
                    <ShoppingBag className="mx-auto mb-3 h-8 w-8 text-primary/60" />
                    <p className="mb-4 text-sm text-title/65">You have not placed an order yet.</p>
                    <Button href="/ready-to-eat-soups" className="!rounded-md">
                      Shop Ready Soups
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {orders.map((order) => (
                      <OrderCard key={order.id} order={order} />
                    ))}
                  </div>
                )}
                <p className="text-sm text-title/55">
                  Prefer a dedicated orders page?{" "}
                  <Link href="/orders" className="font-semibold text-primary hover:underline">
                    Open My Orders
                  </Link>
                  .
                </p>
              </div>
            )}

            {section === "newsletters" && (
              <div className="space-y-6">
                <SectionHeading title="Email preferences" />
                <form onSubmit={saveNewsletter} className="grid gap-8 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]">
                  <p className="text-sm leading-relaxed text-title/60">
                    Choose what you would like to hear about from Dotch Flavour. You can change this
                    anytime.
                  </p>
                  <div className="space-y-4">
                    {(
                      [
                        {
                          key: "offers" as const,
                          label: "Offers & promotions",
                          description: "Bundle deals, seasonal pricing and Ready Soups launches.",
                        },
                        {
                          key: "recipes" as const,
                          label: "Recipes & serving ideas",
                          description: "How to heat, serve and pair our soups and trays.",
                        },
                        {
                          key: "events" as const,
                          label: "Events & catering",
                          description: "Experience evenings, pop-ups and corporate catering news.",
                        },
                      ] as const
                    ).map((item) => (
                      <label
                        key={item.key}
                        className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#ececec] p-4"
                      >
                        <input
                          type="checkbox"
                          className="mt-1 accent-primary"
                          checked={newsletterForm[item.key]}
                          onChange={(event) =>
                            setNewsletterForm((current) => ({
                              ...current,
                              [item.key]: event.target.checked,
                            }))
                          }
                        />
                        <span>
                          <span className="block text-sm font-semibold text-title">{item.label}</span>
                          <span className="mt-0.5 block text-xs text-title/55">{item.description}</span>
                        </span>
                      </label>
                    ))}
                    <Button type="submit" loading={newsletterSaving} className="!rounded-md !px-8">
                      Save
                    </Button>
                    <p className="text-xs text-title/45">
                      See our{" "}
                      <Link href="/email-newsletter-terms" className="underline hover:text-primary">
                        Email &amp; Newsletter Terms
                      </Link>
                      .
                    </p>
                  </div>
                </form>
                {(newsletterError || newsletterMessage) && (
                  <Message tone={newsletterError ? "error" : "success"}>
                    {newsletterError || newsletterMessage}
                  </Message>
                )}
              </div>
            )}

            {section === "settings" && (
              <div className="space-y-10">
                <div>
                  <SectionHeading title="Username" />
                  <form
                    onSubmit={saveUsername}
                    className="grid gap-8 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]"
                  >
                    <p className="text-sm leading-relaxed text-title/60">
                      Use your username or email to sign in. If you forget it, recover it from the
                      forgot username page.
                    </p>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="username" className={labelClassName}>
                          Username
                        </label>
                        <input
                          id="username"
                          className={inputClassName}
                          value={settingsForm.username}
                          onChange={(event) =>
                            setSettingsForm((current) => ({
                              ...current,
                              username: event.target.value,
                            }))
                          }
                          minLength={3}
                          maxLength={24}
                          required
                        />
                        <p className="mt-1.5 text-xs text-title/50">
                          3–24 characters. Letters, numbers, dots, underscores or hyphens.
                        </p>
                      </div>
                      <Button type="submit" loading={settingsSaving} className="!rounded-md !px-8">
                        Save username
                      </Button>
                      <p className="text-sm text-title/55">
                        Forgot your username?{" "}
                        <Link
                          href="/forgot-username"
                          className="font-semibold text-primary hover:underline"
                        >
                          Recover username
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>

                <div>
                  <SectionHeading title="Password" />
                  {profile.provider === "google" ? (
                    <p className="text-sm text-title/60">
                      You signed in with Google. Password changes are managed through your Google
                      account.
                    </p>
                  ) : (
                    <form
                      onSubmit={savePassword}
                      className="grid gap-8 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]"
                    >
                      <p className="text-sm leading-relaxed text-title/60">
                        Choose a strong password you do not reuse on other sites.
                      </p>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="currentPassword" className={labelClassName}>
                            Current password
                          </label>
                          <input
                            id="currentPassword"
                            type="password"
                            className={inputClassName}
                            value={settingsForm.currentPassword}
                            onChange={(event) =>
                              setSettingsForm((current) => ({
                                ...current,
                                currentPassword: event.target.value,
                              }))
                            }
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="newPassword" className={labelClassName}>
                            New password
                          </label>
                          <input
                            id="newPassword"
                            type="password"
                            className={inputClassName}
                            value={settingsForm.newPassword}
                            onChange={(event) =>
                              setSettingsForm((current) => ({
                                ...current,
                                newPassword: event.target.value,
                              }))
                            }
                            minLength={8}
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="confirmPassword" className={labelClassName}>
                            Confirm new password
                          </label>
                          <input
                            id="confirmPassword"
                            type="password"
                            className={inputClassName}
                            value={settingsForm.confirmPassword}
                            onChange={(event) =>
                              setSettingsForm((current) => ({
                                ...current,
                                confirmPassword: event.target.value,
                              }))
                            }
                            minLength={8}
                            required
                          />
                        </div>
                        <Button type="submit" loading={passwordSaving} className="!rounded-md !px-8">
                          Update password
                        </Button>
                      </div>
                    </form>
                  )}
                </div>

                {(settingsError || settingsMessage) && (
                  <Message tone={settingsError ? "error" : "success"}>
                    {settingsError || settingsMessage}
                  </Message>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
