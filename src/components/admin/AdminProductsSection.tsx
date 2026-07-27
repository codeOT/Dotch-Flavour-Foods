"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { Loader2, Plus, Trash2, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/site";

type ProductCategory = "fresh-food" | "ready-soup";

type AdminProduct = {
  id: string;
  category: ProductCategory;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  tagline: string;
  price: number;
  size: string;
  image: string;
  ingredients: string[];
  allergens: string[];
  mayContain: string[];
  servingSuggestions: string[];
  storageInstructions: string;
  heatingInstructions: string;
  isActive: boolean;
  createdAt?: string;
};

type FormState = {
  category: ProductCategory;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  tagline: string;
  price: string;
  size: string;
  image: string;
  ingredients: string;
  allergens: string;
  mayContain: string;
  servingSuggestions: string;
  storageInstructions: string;
  heatingInstructions: string;
};

const initialForm: FormState = {
  category: "fresh-food",
  name: "",
  slug: "",
  description: "",
  shortDescription: "",
  tagline: "",
  price: "",
  size: "1000ml",
  image: "",
  ingredients: "",
  allergens: "",
  mayContain: "",
  servingSuggestions: "",
  storageInstructions: "",
  heatingInstructions: "",
};

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      {children}
      {hint ? <span className="block text-xs text-slate-500">{hint}</span> : null}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/15";

export function AdminProductsSection() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [filter, setFilter] = useState<"all" | ProductCategory>("all");

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/products");
      const payload = (await res.json()) as { products?: AdminProduct[]; error?: string };
      if (!res.ok) {
        setError(payload.error ?? "Unable to load products.");
        return;
      }
      setProducts(payload.products ?? []);
    } catch {
      setError("Unable to load products.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  const filteredProducts = useMemo(() => {
    if (filter === "all") return products;
    return products.filter((product) => product.category === filter);
  }, [filter, products]);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "name" && (!prev.slug || prev.slug === slugify(prev.name))) {
        next.slug = slugify(String(value));
      }
      return next;
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
        }),
      });
      const payload = (await res.json()) as { product?: AdminProduct; error?: string };
      if (!res.ok) {
        setError(payload.error ?? "Unable to create product.");
        return;
      }
      if (payload.product) {
        setProducts((prev) => [payload.product as AdminProduct, ...prev]);
      }
      setSuccess(
        form.category === "fresh-food"
          ? "Fresh food item created."
          : "Ready soup product created.",
      );
      setForm({
        ...initialForm,
        category: form.category,
        size: form.category === "ready-soup" ? "1000ml" : "",
      });
    } catch {
      setError("Unable to create product.");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(id: string) {
    setDeletingId(id);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      const payload = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(payload.error ?? "Unable to delete product.");
        return;
      }
      setProducts((prev) => prev.filter((product) => product.id !== id));
      setSuccess("Product deleted.");
    } catch {
      setError("Unable to delete product.");
    } finally {
      setDeletingId(null);
    }
  }

  const isReadySoup = form.category === "ready-soup";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Create products</h2>
          <p className="text-sm text-slate-500">
            Add fresh food menu items or ready soup products for the storefront.
          </p>
        </div>
        <div className="inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1">
          {(
            [
              { id: "fresh-food", label: "Fresh food" },
              { id: "ready-soup", label: "Ready soups" },
            ] as const
          ).map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() =>
                setForm((prev) => ({
                  ...prev,
                  category: option.id,
                  size: option.id === "ready-soup" ? prev.size || "1000ml" : "",
                }))
              }
              className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                form.category === option.id
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <form
        onSubmit={(event) => void onSubmit(event)}
        className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5"
      >
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-800">
          <Plus className="h-4 w-4 text-secondary" />
          New {isReadySoup ? "ready soup" : "fresh food"} item
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name">
            <input
              className={inputClass}
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder={isReadySoup ? "Efo Riro" : "Party Smokey Jollof"}
              required
            />
          </Field>
          <Field label="Slug" hint="Used in URLs / IDs. Auto-filled from name.">
            <input
              className={inputClass}
              value={form.slug}
              onChange={(e) => updateField("slug", slugify(e.target.value))}
              placeholder="efo-riro"
              required
            />
          </Field>
          <Field
            label="Base price (£)"
            hint={isReadySoup ? "Price for the listed size." : "Base price (typically 2L)."}
          >
            <input
              type="number"
              min="0"
              step="0.01"
              className={inputClass}
              value={form.price}
              onChange={(e) => updateField("price", e.target.value)}
              placeholder="14.50"
              required
            />
          </Field>
          <Field label="Image path / URL" hint="e.g. /assets/images/efo.png">
            <input
              className={inputClass}
              value={form.image}
              onChange={(e) => updateField("image", e.target.value)}
              placeholder="/assets/images/product.jpg"
              required
            />
          </Field>

          {isReadySoup ? (
            <>
              <Field label="Tagline">
                <input
                  className={inputClass}
                  value={form.tagline}
                  onChange={(e) => updateField("tagline", e.target.value)}
                  placeholder="Rich spinach stew, ready in minutes"
                  required
                />
              </Field>
              <Field label="Size">
                <input
                  className={inputClass}
                  value={form.size}
                  onChange={(e) => updateField("size", e.target.value)}
                  placeholder="1000ml"
                  required
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Short description">
                  <textarea
                    className={`${inputClass} min-h-20`}
                    value={form.shortDescription}
                    onChange={(e) => updateField("shortDescription", e.target.value)}
                    placeholder="Brief summary shown on cards"
                  />
                </Field>
              </div>
            </>
          ) : null}

          <div className="sm:col-span-2">
            <Field label="Description">
              <textarea
                className={`${inputClass} min-h-24`}
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder={
                  isReadySoup
                    ? "Full product description for the detail page"
                    : "Delicious and Spicy"
                }
                required
              />
            </Field>
          </div>

          {isReadySoup ? (
            <>
              <Field label="Ingredients" hint="Comma-separated">
                <input
                  className={inputClass}
                  value={form.ingredients}
                  onChange={(e) => updateField("ingredients", e.target.value)}
                  placeholder="Spinach, palm oil, peppers"
                />
              </Field>
              <Field label="Allergens" hint="Comma-separated">
                <input
                  className={inputClass}
                  value={form.allergens}
                  onChange={(e) => updateField("allergens", e.target.value)}
                  placeholder="Fish, Crustaceans"
                />
              </Field>
              <Field label="May contain" hint="Comma-separated, optional">
                <input
                  className={inputClass}
                  value={form.mayContain}
                  onChange={(e) => updateField("mayContain", e.target.value)}
                  placeholder="Sesame, Nuts"
                />
              </Field>
              <Field label="Serving suggestions" hint="Comma-separated">
                <input
                  className={inputClass}
                  value={form.servingSuggestions}
                  onChange={(e) => updateField("servingSuggestions", e.target.value)}
                  placeholder="With pounded yam, With rice"
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Storage instructions">
                  <textarea
                    className={`${inputClass} min-h-20`}
                    value={form.storageInstructions}
                    onChange={(e) => updateField("storageInstructions", e.target.value)}
                    placeholder="Store at −18°C or below..."
                    required
                  />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Heating instructions">
                  <textarea
                    className={`${inputClass} min-h-20`}
                    value={form.heatingInstructions}
                    onChange={(e) => updateField("heatingInstructions", e.target.value)}
                    placeholder="Defrost overnight, then heat gently..."
                    required
                  />
                </Field>
              </div>
            </>
          ) : null}
        </div>

        {error ? (
          <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
            {error}
          </p>
        ) : null}
        {success ? (
          <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
            {success}
          </p>
        ) : null}

        <div className="mt-5">
          <Button type="submit" loading={saving}>
            Create {isReadySoup ? "ready soup" : "fresh food"}
          </Button>
        </div>
      </form>

      <div>
        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600">
            Saved products ({filteredProducts.length})
          </h3>
          <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1">
            {(
              [
                { id: "all", label: "All" },
                { id: "fresh-food", label: "Fresh" },
                { id: "ready-soup", label: "Soups" },
              ] as const
            ).map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setFilter(option.id)}
                className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                  filter === option.id
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-6 text-sm text-slate-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading products…
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-8 text-center">
            <UtensilsCrossed className="mx-auto h-6 w-6 text-slate-400" />
            <p className="mt-2 text-sm text-slate-600">No products created yet for this filter.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-left text-slate-600">
                    <th className="px-4 py-3 font-medium">Product</th>
                    <th className="px-4 py-3 font-medium">Category</th>
                    <th className="px-4 py-3 font-medium">Price</th>
                    <th className="px-4 py-3 font-medium">Size</th>
                    <th className="px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b border-slate-100 last:border-none">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-slate-900">{product.name}</p>
                        <p className="text-xs text-slate-500">{product.slug}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                            product.category === "fresh-food"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {product.category === "fresh-food" ? "Fresh food" : "Ready soup"}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-primary">
                        {formatPrice(product.price)}
                      </td>
                      <td className="px-4 py-3 text-slate-600">{product.size || "—"}</td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => void onDelete(product.id)}
                          disabled={deletingId === product.id}
                          className="inline-flex items-center gap-1 rounded-md border border-red-200 px-2.5 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-50 disabled:opacity-60"
                        >
                          {deletingId === product.id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="h-3.5 w-3.5" />
                          )}
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
