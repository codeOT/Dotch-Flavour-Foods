import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getAdminFromRequest } from "@/lib/admin";
import { sendOrderStatusEmail } from "@/lib/email/send";
import { applyFulfilmentTimestamps } from "@/lib/order-progress";
import {
  ADMIN_SETTABLE_STATUSES,
  isOrderStatus,
  orderStatusLabels,
  type OrderStatus,
} from "@/lib/order-status";
import { cacheDeletePrefix } from "@/lib/request-cache";
import { Order } from "@/models/Order";

type StatusBody = {
  status?: string;
};

export async function PATCH(
  request: Request,
  context: { params: Promise<{ orderNumber: string }> },
) {
  try {
    const admin = getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: "Admin access required." }, { status: 403 });
    }

    const { orderNumber: rawOrderNumber } = await context.params;
    const orderNumber = decodeURIComponent(rawOrderNumber || "").trim();
    if (!orderNumber) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    const body = (await request.json()) as StatusBody;
    const nextStatus = body.status?.trim();

    if (!isOrderStatus(nextStatus) || !ADMIN_SETTABLE_STATUSES.includes(nextStatus)) {
      return NextResponse.json(
        {
          error: `Invalid status. Use one of: ${ADMIN_SETTABLE_STATUSES.join(", ")}.`,
        },
        { status: 400 },
      );
    }

    await connectDB();
    const order = await Order.findOne({ orderNumber });
    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    if (order.status === "pending" && nextStatus !== "cancelled") {
      return NextResponse.json(
        { error: "Unpaid orders can only be cancelled until payment is confirmed." },
        { status: 400 },
      );
    }

    if (order.status === "failed") {
      return NextResponse.json(
        { error: "Failed payment orders cannot be updated from here." },
        { status: 400 },
      );
    }

    const previousStatus = order.status as OrderStatus;
    order.status = nextStatus as OrderStatus;
    applyFulfilmentTimestamps(order, nextStatus);
    await order.save();
    cacheDeletePrefix("orders:");

    let emailSent = false;
    if (previousStatus !== nextStatus) {
      const emailResult = await sendOrderStatusEmail({
        orderNumber: order.orderNumber,
        fullName: order.fullName,
        email: order.email,
        status: nextStatus,
        deliveryMethod: order.deliveryMethod,
      });

      emailSent = emailResult.ok && !("skipped" in emailResult && emailResult.skipped);

      if (!emailResult.ok && !("skipped" in emailResult && emailResult.skipped)) {
        console.error("Order status email failed:", emailResult.error, {
          orderNumber: order.orderNumber,
          status: nextStatus,
        });
      }
    }

    return NextResponse.json({
      order: {
        id: String(order._id),
        orderNumber: order.orderNumber,
        status: order.status,
        statusLabel: orderStatusLabels[order.status as OrderStatus],
        fullName: order.fullName,
        email: order.email,
        total: order.total,
        deliveryMethod: order.deliveryMethod,
        updatedAt: order.updatedAt,
      },
      emailSent,
    });
  } catch (error) {
    console.error("Admin order status update error:", error);
    return NextResponse.json({ error: "Unable to update order status." }, { status: 500 });
  }
}
