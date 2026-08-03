import { NextResponse } from "next/server";
import type Stripe from "stripe";
import mongoose from "mongoose";
import { auth } from "@/auth";
import { connectDB } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import {
  exceedsReadySoupOnlineLimit,
  generateOrderId,
  getCartReadySoupLiters,
  getDeliveryFee,
  getOrderTotal,
  getReadySoupUnitCount,
  meetsReadySoupMinimum,
  READY_SOUP_MAX_ONLINE_LITERS,
  READY_SOUP_MIN_ORDER,
  type DeliveryMethod,
} from "@/lib/cart-utils";
import { Order } from "@/models/Order";

type CheckoutItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type CheckoutBody = {
  items?: CheckoutItem[];
  deliveryMethod?: DeliveryMethod;
  fullName?: string;
  email?: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  postcode?: string;
  notes?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function toStripeAmount(amount: number) {
  return Math.round(amount * 100);
}

export async function POST(request: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe is not configured. Add STRIPE_SECRET_KEY to your environment." },
        { status: 500 },
      );
    }

    const body = (await request.json()) as CheckoutBody;
    const items = Array.isArray(body.items) ? body.items : [];
    const deliveryMethod: DeliveryMethod =
      body.deliveryMethod === "pickup" ? "pickup" : "delivery";

    const fullName = body.fullName?.trim() ?? "";
    const email = body.email?.trim().toLowerCase() ?? "";
    const phone = body.phone?.trim() ?? "";
    const addressLine1 = body.addressLine1?.trim() ?? "";
    const addressLine2 = body.addressLine2?.trim() ?? "";
    const city = body.city?.trim() ?? "";
    const postcode = body.postcode?.trim() ?? "";
    const notes = body.notes?.trim() ?? "";

    if (items.length === 0) {
      return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
    }

    for (const item of items) {
      if (
        !item.id ||
        !item.name ||
        typeof item.price !== "number" ||
        item.price < 0 ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1
      ) {
        return NextResponse.json({ error: "Invalid cart items." }, { status: 400 });
      }
    }

    if (!meetsReadySoupMinimum(items)) {
      const count = getReadySoupUnitCount(items);
      return NextResponse.json(
        {
          error: `Ready Soups online orders require at least ${READY_SOUP_MIN_ORDER} soups. You currently have ${count}.`,
        },
        { status: 400 },
      );
    }

    if (exceedsReadySoupOnlineLimit(items)) {
      const liters = getCartReadySoupLiters(items);
      return NextResponse.json(
        {
          error: `Online Ready Soups delivery is available up to ${READY_SOUP_MAX_ONLINE_LITERS}kg. Your order is about ${liters}kg equivalent — please contact us for a custom quote.`,
        },
        { status: 400 },
      );
    }

    if (fullName.length < 2) {
      return NextResponse.json({ error: "Please enter your full name." }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (!phone) {
      return NextResponse.json({ error: "Please enter your phone number." }, { status: 400 });
    }

    if (deliveryMethod === "delivery" && (!addressLine1 || !city || !postcode)) {
      return NextResponse.json(
        { error: "Please complete your delivery address." },
        { status: 400 },
      );
    }

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = getDeliveryFee(deliveryMethod, items);
    const total = getOrderTotal(subtotal, deliveryMethod, items);
    const orderNumber = generateOrderId();

    const session = await auth();
    await connectDB();

    const userId =
      session?.user?.id && mongoose.isValidObjectId(session.user.id)
        ? session.user.id
        : undefined;

    const order = await Order.create({
      orderNumber,
      userId,
      fullName,
      email,
      phone,
      addressLine1: deliveryMethod === "delivery" ? addressLine1 : undefined,
      addressLine2: deliveryMethod === "delivery" ? addressLine2 || undefined : undefined,
      city: deliveryMethod === "delivery" ? city : undefined,
      postcode: deliveryMethod === "delivery" ? postcode : undefined,
      notes: notes || undefined,
      deliveryMethod,
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      subtotal,
      deliveryFee,
      total,
      currency: "gbp",
      status: "pending",
    });

    const origin = process.env.NEXTAUTH_URL || new URL(request.url).origin;

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "gbp",
        unit_amount: toStripeAmount(item.price),
        product_data: {
          name: item.name,
          images: item.image.startsWith("http") ? [item.image] : undefined,
        },
      },
    }));

    if (deliveryFee > 0) {
      lineItems.push({
        quantity: 1,
        price_data: {
          currency: "gbp",
          unit_amount: toStripeAmount(deliveryFee),
          product_data: {
            name: "Delivery fee",
          },
        },
      });
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: lineItems,
      success_url: `${origin}/shop/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/shop/checkout?cancelled=1`,
      metadata: {
        orderId: String(order._id),
        orderNumber: order.orderNumber,
      },
    });

    order.stripeSessionId = checkoutSession.id;
    await order.save();

    if (!checkoutSession.url) {
      return NextResponse.json(
        { error: "Unable to start Stripe Checkout. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ url: checkoutSession.url, orderNumber });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Unable to start checkout. Please try again." },
      { status: 500 },
    );
  }
}
