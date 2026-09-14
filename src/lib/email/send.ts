import { sendEmail } from "@/lib/email/client";
import {
  contactAutoReplyHtml,
  contactNotificationHtml,
  newsletterConfirmHtml,
  orderConfirmationHtml,
  orderStatusUpdateHtml,
  passwordResetHtml,
  quoteAutoReplyHtml,
  quoteNotificationHtml,
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

export async function sendPasswordResetEmail(input: {
  to: string;
  name: string;
  resetUrl: string;
}) {
  return sendEmail({
    to: input.to,
    subject: `Reset your ${siteConfig.name} password`,
    html: passwordResetHtml({ name: input.name, resetUrl: input.resetUrl }),
    text: `Reset your password: ${input.resetUrl}\n\nThis link expires in 1 hour. If you did not request this, ignore this email.`,
  });
}

export type QuoteEmailInput = {
  fullName: string;
  organisation?: string;
  email: string;
  phone: string;
  eventTypeLabel: string;
  eventDate?: string;
  startTime?: string;
  location?: string;
  guestCount?: string;
  preferredMenu?: string;
  serviceStyle?: string;
  dietaryRequirements?: string;
  budgetRange?: string;
  logisticsNeeds?: string;
  additionalInfo?: string;
  attachment?: {
    filename: string;
    content: Buffer;
    contentType?: string;
  };
};

export async function sendQuoteEmails(input: QuoteEmailInput) {
  const textLines = [
    `Name: ${input.fullName}`,
    input.organisation ? `Organisation: ${input.organisation}` : null,
    `Email: ${input.email}`,
    `Phone: ${input.phone}`,
    `Enquiry type: ${input.eventTypeLabel}`,
    input.eventDate ? `Event date: ${input.eventDate}` : null,
    input.startTime ? `Start time: ${input.startTime}` : null,
    input.guestCount ? `Guests: ${input.guestCount}` : null,
    input.location ? `Location: ${input.location}` : null,
    input.preferredMenu ? `Preferred menu: ${input.preferredMenu}` : null,
    input.serviceStyle ? `Service style: ${input.serviceStyle}` : null,
    input.dietaryRequirements ? `Dietary: ${input.dietaryRequirements}` : null,
    input.budgetRange ? `Budget: ${input.budgetRange}` : null,
    input.logisticsNeeds ? `Logistics: ${input.logisticsNeeds}` : null,
    input.additionalInfo ? `Additional: ${input.additionalInfo}` : null,
    input.attachment ? `Attachment: ${input.attachment.filename}` : null,
  ].filter(Boolean);

  const notifyTeam = await sendEmail({
    to: siteConfig.contact.email,
    subject: `Quote request — ${input.eventTypeLabel} — ${input.fullName}`,
    html: quoteNotificationHtml({
      ...input,
      attachmentName: input.attachment?.filename,
    }),
    text: textLines.join("\n"),
    replyTo: input.email,
    attachments: input.attachment
      ? [
          {
            filename: input.attachment.filename,
            content: input.attachment.content,
            contentType: input.attachment.contentType,
          },
        ]
      : undefined,
  });

  const autoReply = await sendEmail({
    to: input.email,
    subject: `We received your quote request — ${siteConfig.name}`,
    html: quoteAutoReplyHtml(input.fullName),
    text: `Thanks ${input.fullName}, we've received your quote request and aim to respond within one business day.`,
  });

  return { notifyTeam, autoReply };
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
