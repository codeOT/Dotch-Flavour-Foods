"use client";

import { useCallback, useEffect, useState } from "react";
import { ReviewStars } from "@/components/ready-soups/ReadySoupCards";

type AdminFeedback = {
  id: string;
  orderNumber: string;
  email: string;
  customerName: string;
  displayName: string;
  location: string;
  rating: number;
  comment: string;
  published: boolean;
  publishedAt: string | null;
  createdAt: string | null;
};

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function AdminFeedbackSection() {
  const [items, setItems] = useState<AdminFeedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/feedback");
      const payload = (await res.json()) as { feedback?: AdminFeedback[]; error?: string };
      if (!res.ok) {
        setError(payload.error ?? "Unable to load feedback.");
        return;
      }
      setItems(payload.feedback ?? []);
    } catch {
      setError("Unable to load feedback.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function setPublished(id: string, published: boolean) {
    setUpdatingId(id);
    setMessage("");
    try {
      const res = await fetch(`/api/admin/feedback/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published }),
      });
      const payload = (await res.json()) as { error?: string };
      if (!res.ok) {
        setMessage(payload.error ?? "Unable to update this review.");
        return;
      }
      setItems((current) =>
        current.map((item) =>
          item.id === id
            ? {
                ...item,
                published,
                publishedAt: published ? new Date().toISOString() : null,
              }
            : item,
        ),
      );
      setMessage(published ? "Review published on the website." : "Review unpublished.");
    } catch {
      setMessage("Unable to update this review.");
    } finally {
      setUpdatingId(null);
    }
  }

  if (loading) {
    return <div className="h-32 animate-pulse rounded-xl bg-neutral-100" />;
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-bold text-neutral-950">Customer feedback</h3>
        <p className="text-sm text-neutral-500">
          Reviews arrive about 10 days after a successful delivery. Publish only the ones you want on
          the website.
        </p>
      </div>

      {message ? (
        <p className="rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-700">
          {message}
        </p>
      ) : null}

      {items.length === 0 ? (
        <p className="rounded-xl border border-dashed border-neutral-200 px-4 py-8 text-center text-sm text-neutral-500">
          No customer feedback yet.
        </p>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <ReviewStars rating={item.rating} />
                  <p className="mt-3 text-sm leading-relaxed text-neutral-800">
                    &ldquo;{item.comment}&rdquo;
                  </p>
                  <p className="mt-3 text-sm font-semibold text-neutral-950">{item.displayName}</p>
                  {item.location ? (
                    <p className="text-xs text-neutral-500">{item.location}</p>
                  ) : null}
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    item.published ? "bg-emerald-100 text-emerald-800" : "bg-neutral-100 text-neutral-600"
                  }`}
                >
                  {item.published ? "Published" : "Hidden"}
                </span>
              </div>
              <dl className="mt-4 grid gap-1 text-xs text-neutral-500 sm:grid-cols-2">
                <div>
                  Order {item.orderNumber} · {item.customerName}
                </div>
                <div>{item.email}</div>
                <div>Received {formatDate(item.createdAt)}</div>
                <div>
                  {item.published ? `Live since ${formatDate(item.publishedAt)}` : "Not on the website"}
                </div>
              </dl>
              <div className="mt-4">
                <button
                  type="button"
                  disabled={updatingId === item.id}
                  onClick={() => void setPublished(item.id, !item.published)}
                  className="rounded-full bg-neutral-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#cf5c0b] disabled:opacity-50"
                >
                  {item.published ? "Unpublish" : "Publish on website"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
