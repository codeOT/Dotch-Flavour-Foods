import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { Order } from "@/models/Order";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json({ error: "Missing session_id." }, { status: 400 });
    }

    await connectDB();

    let order = await Order.findOne({ stripeSessionId: sessionId }).lean();

    // If webhook hasn't run yet, confirm with Stripe and mark paid.
    if (!order || order.status !== "paid") {
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      if (session.payment_status === "paid") {
        const update =
          (session.metadata?.orderId
            ? await Order.findById(session.metadata.orderId)
            : null) || (await Order.findOne({ stripeSessionId: sessionId }));

        if (update) {
          update.status = "paid";
          update.stripeSessionId = session.id;
          if (typeof session.payment_intent === "string") {
            update.stripePaymentIntentId = session.payment_intent;
          }
          await update.save();
          order = update.toObject();
        }
      }
    }

    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    return NextResponse.json({
      orderNumber: order.orderNumber,
      email: order.email,
      total: order.total,
      status: order.status,
      fullName: order.fullName,
    });
  } catch (error) {
    console.error("Order lookup error:", error);
    return NextResponse.json({ error: "Unable to load order." }, { status: 500 });
  }
}
