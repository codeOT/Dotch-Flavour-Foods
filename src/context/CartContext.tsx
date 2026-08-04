"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/lib/products";
import { getPriceForLitres, type LitreSize } from "@/lib/litre-sizes";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartItemInput = Omit<CartItem, "quantity">;

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isHydrated: boolean;
  isOpen: boolean;
  addItem: (item: CartItemInput, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
};

const STORAGE_KEY = "dotch-cart";

const CartContext = createContext<CartContextValue | null>(null);

function normalizeCartItem(item: CartItem): CartItem | null {
  if (!item?.id || !item.name || !(item.quantity > 0)) return null;
  const price = typeof item.price === "number" && Number.isFinite(item.price) ? item.price : null;
  if (price == null || price < 0) return null;
  return {
    id: String(item.id),
    name: String(item.name),
    price,
    image: typeof item.image === "string" ? item.image : "",
    quantity: Math.floor(item.quantity),
  };
}

function readStoredCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((item) => normalizeCartItem(item))
      .filter((item): item is CartItem => item != null);
  } catch {
    return [];
  }
}

export function productToCartItem(product: Product, litres?: LitreSize | 1): CartItemInput {
  const basePrice =
    typeof product.price === "number" && Number.isFinite(product.price) ? product.price : 0;

  // Homepage Our Soups are Ready Soup tubs (fixed 1 Litre) — use the same cart id
  // prefix so min-order, weight, and delivery bands apply.
  if (litres === 1 || product.category === "soups-and-stews") {
    return {
      id: `ready-soup-${product.id}`,
      name: `${product.name} (1 Litre)`,
      price: basePrice,
      image: product.image,
    };
  }

  const price = litres ? getPriceForLitres(basePrice, litres) : basePrice;
  return {
    id: litres ? `${product.id}-${litres}l` : product.id,
    name: litres ? `${product.name} (${litres}L)` : product.name,
    price,
    image: product.image,
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setItems(readStoredCart());
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, isHydrated]);

  const addItem = useCallback((item: CartItemInput, quantity = 1) => {
    if (quantity < 1) return;
    const normalized = normalizeCartItem({ ...item, quantity });
    if (!normalized) return;

    setItems((current) => {
      const existing = current.find((entry) => entry.id === normalized.id);
      if (existing) {
        return current.map((entry) =>
          entry.id === normalized.id
            ? { ...entry, quantity: entry.quantity + quantity }
            : entry,
        );
      }
      return [...current, normalized];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((current) => current.filter((entry) => entry.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) {
      setItems((current) => current.filter((entry) => entry.id !== id));
      return;
    }
    setItems((current) =>
      current.map((entry) => (entry.id === id ? { ...entry, quantity } : entry)),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((open) => !open), []);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    if (isOpen) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeCart]);

  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      isHydrated,
      isOpen,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
      toggleCart,
    }),
    [
      items,
      itemCount,
      subtotal,
      isHydrated,
      isOpen,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
      toggleCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}



