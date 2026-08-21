import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { auth } from "@/auth";
import { connectDB } from "@/lib/db";
import {
  ORDERS_CACHE_TTL_MS,
  cacheGet,
  cacheSet,
  ordersCacheKey,
} from "@/lib/request-cache";
import { getRequestIp, rateLimit, tooManyRequests } from "@/lib/rate-limit";
import { Order } from "@/models/Order";

export async function GET(request: Request) {
  try {
    const ip = getRequestIp(request);
    const limited = rateLimit(`orders:list:${ip}`, 60, 60_000);
    if (!limited.allowed) {
      return tooManyRequests(limited.retryAfterSec);
    }

    const session = await auth();

    if (!session?.user?.id && !session?.user?.email) {
      return NextResponse.json({ error: "Sign in to view your orders." }, { status: 401 });
    }

    const userId = session.user.id || "anon";
    const email = session.user.email?.toLowerCase() ?? "";
    const cacheKey = ordersCacheKey(userId, email);
    const cached = cacheGet<{ orders: unknown[] }>(cacheKey);
    if (cached) {
      return NextResponse.json(cached, {
        headers: {
          "Cache-Control": "private, max-age=10, stale-while-revalidate=30",
          "X-Cache": "HIT",
        },
      });
    }

    await connectDB();

    const filters: Record<string, unknown>[] = [];

    if (session.user.id && mongoose.isValidObjectId(session.user.id)) {
      filters.push({ userId: session.user.id });
    }

    if (email) {
      filters.push({ email });
    }

    if (filters.length === 0) {
      return NextResponse.json({ orders: [] });
    }

    const orders = await Order.find(filters.length > 1 ? { $or: filters } : filters[0])
      .sort({ createdAt: -1 })
      .limit(50)
      .select(
        "orderNumber status deliveryMethod items subtotal deliveryFee total currency fullName email phone addressLine1 addressLine2 city postcode notes createdAt updatedAt paidAt shippedAt deliveredAt",
      )
      .lean();

    const payload = {
      orders: orders.map((order) => ({
        id: String(order._id),
        orderNumber: order.orderNumber,
        status: order.status,
        deliveryMethod: order.deliveryMethod,
        items: order.items,
        subtotal: order.subtotal,
        deliveryFee: order.deliveryFee,
        total: order.total,
        currency: order.currency,
        fullName: order.fullName,
        email: order.email,
        phone: order.phone,
        addressLine1: order.addressLine1,
        addressLine2: order.addressLine2,
        city: order.city,
        postcode: order.postcode,
        notes: order.notes,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        paidAt: order.paidAt,
        shippedAt: order.shippedAt,
        deliveredAt: order.deliveredAt,
      })),
    };

    cacheSet(cacheKey, payload, ORDERS_CACHE_TTL_MS);

    return NextResponse.json(payload, {
      headers: {
        "Cache-Control": "private, max-age=10, stale-while-revalidate=30",
        "X-Cache": "MISS",
      },
    });
  } catch (error) {
    console.error("List orders error:", error);
    return NextResponse.json({ error: "Unable to load orders." }, { status: 500 });
  }
}

