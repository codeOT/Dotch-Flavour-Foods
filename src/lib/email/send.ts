import { sendEmail } from "@/lib/email/client";
import {
  contactAutoReplyHtml,
  contactNotificationHtml,
  newsletterConfirmHtml,
  orderConfirmationHtml,
  orderStatusUpdateHtml,
  welcomeEmailHtml,
} from "@/lib/email/templates";
import { orderStatusLabels, type OrderStatus } from "@/lib/order-status";
import { siteConfig } from "@/lib/site";

export async function sendWelcomeEmail(input: { to: string; name: string }) {
  return sendEmail({
    to: input.to,
    subject: `Welcome to ${siteConfig.name}`,
    html: welcomeEmailHtml(input.name),
    text: `Welcome to ${siteConfig.name}. Your account is ready — sign in to track orders and checkout faster.`,
  });
}

export async function sendNewsletterConfirmation(input: { to: string }) {
  return sendEmail({
    to: input.to,
    subject: `You're on the ${siteConfig.name} list`,
    html: newsletterConfirmHtml(input.to),
    text: `Thanks for subscribing to ${siteConfig.name}. We'll send launch updates and offers you've opted into.`,
  });
}

export async function sendOrderConfirmationEmail(order: {
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
}) {
  return sendEmail({
    to: order.email,
    subject: `Order confirmed — ${order.orderNumber}`,
    html: orderConfirmationHtml(order),
    text: `Thanks for your order ${order.orderNumber}. Total ${siteConfig.currencySymbol}${order.total.toFixed(2)}. We'll prepare it shortly.`,
    idempotencyKey: `order-confirm-${order.orderNumber}`,
  });
}

const STATUS_EMAIL_STATUSES = ["processing", "shipped", "delivered", "cancelled"] as const;
type StatusEmailStatus = (typeof STATUS_EMAIL_STATUSES)[number];

function isStatusEmailStatus(value: OrderStatus): value is StatusEmailStatus {
  return (STATUS_EMAIL_STATUSES as readonly string[]).includes(value);
}

export async function sendOrderStatusEmail(order: {
  orderNumber: string;
  fullName: string;
  email: string;
  status: OrderStatus;
  deliveryMethod: "delivery" | "pickup";
}) {
  if (!isStatusEmailStatus(order.status)) {
    return { ok: false as const, skipped: true as const, error: "No email for this status." };
  }

  const statusLabel = orderStatusLabels[order.status];

  return sendEmail({
    to: order.email,
    subject: `${statusLabel} — ${order.orderNumber}`,
    html: orderStatusUpdateHtml({
      orderNumber: order.orderNumber,
      fullName: order.fullName,
      status: order.status,
      statusLabel,
      deliveryMethod: order.deliveryMethod,
    }),
    text: `Hi ${order.fullName.split(" ")[0] || "there"}, your order ${order.orderNumber} is now ${statusLabel}.`,
    idempotencyKey: `order-status-${order.orderNumber}-${order.status}`,
  });
}

export async function sendContactEmails(input: {
  name: string;
  email: string;
  message: string;
}) {
  const notifyTeam = await sendEmail({
    to: siteConfig.contact.email,
    subject: `Website message from ${input.name}`,
    html: contactNotificationHtml(input),
    text: `From: ${input.name} <${input.email}>\n\n${input.message}`,
    replyTo: input.email,
  });

  const autoReply = await sendEmail({
    to: input.email,
    subject: `We received your message — ${siteConfig.name}`,
    html: contactAutoReplyHtml(input.name),
    text: `Thanks ${input.name}, we've received your message and typically reply within 1–2 working days.`,
  });

  return { notifyTeam, autoReply };
}
