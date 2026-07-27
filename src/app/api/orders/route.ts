import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { auth } from "@/auth";
import { connectDB } from "@/lib/db";
import { Order } from "@/models/Order";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id && !session?.user?.email) {
      return NextResponse.json({ error: "Sign in to view your orders." }, { status: 401 });
    }

    await connectDB();

    const filters: Record<string, unknown>[] = [];

    if (session.user.id && mongoose.isValidObjectId(session.user.id)) {
      filters.push({ userId: session.user.id });
    }

    if (session.user.email) {
      filters.push({ email: session.user.email.toLowerCase() });
    }

    const orders = await Order.find(filters.length > 1 ? { $or: filters } : filters[0])
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
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
      })),
    });
  } catch (error) {
    console.error("List orders error:", error);
    return NextResponse.json({ error: "Unable to load orders." }, { status: 500 });
  }
}
