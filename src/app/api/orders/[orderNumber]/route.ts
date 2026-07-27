import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { auth } from "@/auth";
import { connectDB } from "@/lib/db";
import { Order } from "@/models/Order";

type RouteContext = {
  params: Promise<{ orderNumber: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    const session = await auth();

    if (!session?.user?.id && !session?.user?.email) {
      return NextResponse.json({ error: "Sign in to view this order." }, { status: 401 });
    }

    const { orderNumber } = await context.params;
    if (!orderNumber) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    await connectDB();

    const filters: Record<string, unknown>[] = [];
    if (session.user.id && mongoose.isValidObjectId(session.user.id)) {
      filters.push({ userId: session.user.id });
    }
    if (session.user.email) {
      filters.push({ email: session.user.email.toLowerCase() });
    }

    const order = await Order.findOne({
      orderNumber: orderNumber.toUpperCase(),
      ...(filters.length > 1 ? { $or: filters } : filters[0]),
    }).lean();

    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    return NextResponse.json({
      order: {
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
      },
    });
  } catch (error) {
    console.error("Get order error:", error);
    return NextResponse.json({ error: "Unable to load order." }, { status: 500 });
  }
}
