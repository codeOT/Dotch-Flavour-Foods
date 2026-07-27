import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { connectDB } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { Order } from "@/models/Order";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature." }, { status: 400 });
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Webhook secret not configured." }, { status: 500 });
  }

  const payload = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    console.error("Stripe webhook signature error:", error);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      await connectDB();

      const order =
        (session.metadata?.orderId
          ? await Order.findById(session.metadata.orderId)
          : null) ||
        (session.id ? await Order.findOne({ stripeSessionId: session.id }) : null);

      if (order) {
        order.status = "paid";
        order.stripeSessionId = session.id;
        if (typeof session.payment_intent === "string") {
          order.stripePaymentIntentId = session.payment_intent;
        } else if (session.payment_intent && "id" in session.payment_intent) {
          order.stripePaymentIntentId = session.payment_intent.id;
        }
        await order.save();
      }
    }

    if (event.type === "checkout.session.expired") {
      const session = event.data.object as Stripe.Checkout.Session;
      await connectDB();
      const order = await Order.findOne({ stripeSessionId: session.id });
      if (order && order.status === "pending") {
        order.status = "cancelled";
        await order.save();
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook handler error:", error);
    return NextResponse.json({ error: "Webhook handler failed." }, { status: 500 });
  }
}
