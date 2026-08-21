import { sendOrderConfirmationEmail } from "@/lib/email/send";
import { Order } from "@/models/Order";

type OrderLike = {
  _id: unknown;
  orderNumber: string;
  fullName: string;
  email: string;
  deliveryMethod: "delivery" | "pickup";
  items: { name: string; quantity: number; price: number }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  addressLine1?: string | null;
  addressLine2?: string | null;
  city?: string | null;
  postcode?: string | null;
  confirmationEmailSentAt?: Date | null;
};

/**
 * Sends the paid-order confirmation once.
 * Safe to call from both Stripe webhook and checkout success page.
 */
export async function ensureOrderConfirmationEmail(order: OrderLike) {
  if (order.confirmationEmailSentAt) {
    return { ok: true as const, alreadySent: true };
  }

  const orderId = String(order._id);
  const doc = await Order.findById(orderId);
  if (!doc) {
    return { ok: false as const, error: "Order not found." };
  }

  if (doc.confirmationEmailSentAt) {
    return { ok: true as const, alreadySent: true };
  }

  doc.confirmationEmailSentAt = new Date();
  await doc.save();

  const result = await sendOrderConfirmationEmail({
    orderNumber: order.orderNumber,
    fullName: order.fullName,
    email: order.email,
    deliveryMethod: order.deliveryMethod,
    items: order.items.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    })),
    subtotal: order.subtotal,
    deliveryFee: order.deliveryFee,
    total: order.total,
    addressLine1: order.addressLine1,
    addressLine2: order.addressLine2,
    city: order.city,
    postcode: order.postcode,
  });

  if (!result.ok) {
    doc.confirmationEmailSentAt = undefined;
    await doc.save();
    console.error("Order confirmation email failed:", result.error, {
      orderNumber: order.orderNumber,
      skipped: result.skipped,
    });
  }

  return result;
}
