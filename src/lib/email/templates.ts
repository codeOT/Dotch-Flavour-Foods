import { formatPrice, siteConfig } from "@/lib/site";
import { getSiteUrl } from "@/lib/sitemap-data";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function layout(title: string, body: string) {
  const siteUrl = getSiteUrl();
  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:#f5f1ea;font-family:Arial,Helvetica,sans-serif;color:#192e22;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f1ea;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e8dccf;">
          <tr>
            <td style="background:#192e22;padding:20px 24px;">
              <p style="margin:0;font-size:18px;font-weight:700;color:#ffffff;">${escapeHtml(siteConfig.name)}</p>
              <p style="margin:6px 0 0;font-size:12px;color:#d6b898;">Authentic Nigerian Ready Soups</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 24px;">
              ${body}
            </td>
          </tr>
          <tr>
            <td style="padding:16px 24px 24px;border-top:1px solid #f0e6db;font-size:12px;line-height:1.5;color:#6b6358;">
              <p style="margin:0;">Questions? Reply to this email or contact
                <a href="mailto:${escapeHtml(siteConfig.contact.email)}" style="color:#cf5c0b;">${escapeHtml(siteConfig.contact.email)}</a>
              </p>
              <p style="margin:10px 0 0;">
                <a href="${escapeHtml(siteUrl)}" style="color:#574821;">${escapeHtml(siteUrl.replace(/^https?:\/\//, ""))}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function welcomeEmailHtml(name: string) {
  const first = escapeHtml(name.split(" ")[0] || "there");
  const siteUrl = getSiteUrl();
  return layout(
    "Welcome to Dotch Flavour Foods",
    `
      <h1 style="margin:0 0 12px;font-size:22px;line-height:1.3;">Welcome, ${first}</h1>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#3d463f;">
        Your account is ready. Sign in anytime to track orders, save addresses, and checkout faster.
      </p>
      <p style="margin:0 0 20px;">
        <a href="${escapeHtml(siteUrl)}/ready-to-eat-soups" style="display:inline-block;background:#cf5c0b;color:#ffffff;text-decoration:none;padding:12px 18px;border-radius:8px;font-weight:700;font-size:14px;">
          Shop Ready Soups
        </a>
      </p>
      <p style="margin:0;font-size:14px;line-height:1.6;color:#6b6358;">
        You can manage newsletter preferences from your account settings.
      </p>
    `,
  );
}

export function newsletterConfirmHtml(email: string) {
  const siteUrl = getSiteUrl();
  return layout(
    "You're on the Dotch Flavour list",
    `
      <h1 style="margin:0 0 12px;font-size:22px;line-height:1.3;">You're subscribed</h1>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#3d463f;">
        Thanks for joining our list at <strong>${escapeHtml(email)}</strong>. We'll share launch updates,
        Ready Soups drops, and offers you've opted into — no spam.
      </p>
      <p style="margin:0;font-size:14px;line-height:1.6;color:#6b6358;">
        Read our
        <a href="${escapeHtml(siteUrl)}/email-newsletter-terms" style="color:#cf5c0b;">email terms</a>
        or
        <a href="${escapeHtml(siteUrl)}/privacy-policy" style="color:#cf5c0b;">privacy policy</a>.
      </p>
    `,
  );
}

type OrderEmailItem = {
  name: string;
  quantity: number;
  price: number;
};

export function orderConfirmationHtml(order: {
  orderNumber: string;
  fullName: string;
  email: string;
  deliveryMethod: "delivery" | "pickup";
  items: OrderEmailItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  addressLine1?: string | null;
  addressLine2?: string | null;
  city?: string | null;
  postcode?: string | null;
}) {
  const siteUrl = getSiteUrl();
  const first = escapeHtml(order.fullName.split(" ")[0] || "there");
  const rows = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid #f0e6db;font-size:14px;">${escapeHtml(item.name)} × ${item.quantity}</td>
        <td style="padding:8px 0;border-bottom:1px solid #f0e6db;font-size:14px;text-align:right;font-weight:600;">${escapeHtml(formatPrice(item.price * item.quantity))}</td>
      </tr>`,
    )
    .join("");

  const address =
    order.deliveryMethod === "delivery"
      ? [order.addressLine1, order.addressLine2, order.city, order.postcode]
          .filter(Boolean)
          .map((part) => escapeHtml(String(part)))
          .join(", ")
      : "Collection";

  return layout(
    `Order confirmed — ${order.orderNumber}`,
    `
      <h1 style="margin:0 0 12px;font-size:22px;line-height:1.3;">Thanks, ${first}</h1>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#3d463f;">
        We've received your payment. Your order <strong>${escapeHtml(order.orderNumber)}</strong> is confirmed.
      </p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 16px;">
        ${rows}
        <tr>
          <td style="padding:10px 0 4px;font-size:14px;color:#6b6358;">Subtotal</td>
          <td style="padding:10px 0 4px;font-size:14px;text-align:right;">${escapeHtml(formatPrice(order.subtotal))}</td>
        </tr>
        <tr>
          <td style="padding:4px 0;font-size:14px;color:#6b6358;">Delivery</td>
          <td style="padding:4px 0;font-size:14px;text-align:right;">${order.deliveryFee === 0 ? "Free" : escapeHtml(formatPrice(order.deliveryFee))}</td>
        </tr>
        <tr>
          <td style="padding:8px 0 0;font-size:15px;font-weight:700;">Total</td>
          <td style="padding:8px 0 0;font-size:15px;font-weight:700;text-align:right;color:#cf5c0b;">${escapeHtml(formatPrice(order.total))}</td>
        </tr>
      </table>
      <p style="margin:0 0 8px;font-size:14px;"><strong>Fulfilment:</strong> ${order.deliveryMethod === "delivery" ? "Home delivery" : "Collection"}</p>
      <p style="margin:0 0 20px;font-size:14px;line-height:1.5;color:#3d463f;">${address}</p>
      <p style="margin:0;">
        <a href="${escapeHtml(siteUrl)}/orders" style="display:inline-block;background:#574821;color:#ffffff;text-decoration:none;padding:12px 18px;border-radius:8px;font-weight:700;font-size:14px;">
          View your orders
        </a>
      </p>
    `,
  );
}

export function contactNotificationHtml(input: {
  name: string;
  email: string;
  message: string;
}) {
  return layout(
    "New website message",
    `
      <h1 style="margin:0 0 12px;font-size:22px;line-height:1.3;">New contact message</h1>
      <p style="margin:0 0 8px;font-size:14px;"><strong>Name:</strong> ${escapeHtml(input.name)}</p>
      <p style="margin:0 0 16px;font-size:14px;"><strong>Email:</strong> ${escapeHtml(input.email)}</p>
      <p style="margin:0;font-size:15px;line-height:1.6;white-space:pre-wrap;color:#3d463f;">${escapeHtml(input.message)}</p>
    `,
  );
}

export function contactAutoReplyHtml(name: string) {
  const first = escapeHtml(name.split(" ")[0] || "there");
  return layout(
    "We received your message",
    `
      <h1 style="margin:0 0 12px;font-size:22px;line-height:1.3;">Thanks, ${first}</h1>
      <p style="margin:0;font-size:15px;line-height:1.6;color:#3d463f;">
        We've received your message and typically reply within 1–2 working days.
        For Ready Soups orders, checkout on the website is fastest. For catering, WhatsApp is often quicker.
      </p>
    `,
  );
}

export function passwordResetHtml(input: { name: string; resetUrl: string }) {
  const first = escapeHtml(input.name.split(" ")[0] || "there");
  return layout(
    "Reset your password",
    `
      <h1 style="margin:0 0 12px;font-size:22px;line-height:1.3;">Reset your password, ${first}</h1>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#3d463f;">
        We received a request to reset the password for your ${escapeHtml(siteConfig.name)} account.
        This link expires in 1 hour.
      </p>
      <p style="margin:0 0 20px;">
        <a href="${escapeHtml(input.resetUrl)}" style="display:inline-block;background:#cf5c0b;color:#ffffff;text-decoration:none;padding:12px 18px;border-radius:8px;font-weight:700;font-size:14px;">
          Choose a new password
        </a>
      </p>
      <p style="margin:0;font-size:13px;line-height:1.6;color:#6b6358;">
        If you did not request this, you can ignore this email. Your password will stay the same.
      </p>
    `,
  );
}

function quoteRow(label: string, value?: string | null) {
  const text = (value || "").trim();
  if (!text) return "";
  return `<p style="margin:0 0 8px;font-size:14px;line-height:1.5;"><strong>${escapeHtml(label)}:</strong> ${escapeHtml(text)}</p>`;
}

export function quoteNotificationHtml(input: {
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
  attachmentName?: string;
}) {
  return layout(
    "New quote request",
    `
      <h1 style="margin:0 0 12px;font-size:22px;line-height:1.3;">New quote request</h1>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#3d463f;">
        A customer submitted a quote enquiry on the website.
      </p>
      ${quoteRow("Name", input.fullName)}
      ${quoteRow("Organisation", input.organisation)}
      ${quoteRow("Email", input.email)}
      ${quoteRow("Phone", input.phone)}
      ${quoteRow("Enquiry type", input.eventTypeLabel)}
      ${quoteRow("Event date", input.eventDate)}
      ${quoteRow("Start time", input.startTime)}
      ${quoteRow("Guests", input.guestCount)}
      ${quoteRow("Location", input.location)}
      ${quoteRow("Preferred menu", input.preferredMenu)}
      ${quoteRow("Service style", input.serviceStyle)}
      ${quoteRow("Dietary / allergens", input.dietaryRequirements)}
      ${quoteRow("Budget", input.budgetRange)}
      ${quoteRow("Logistics", input.logisticsNeeds)}
      ${quoteRow("Additional info", input.additionalInfo)}
      ${quoteRow("Attachment", input.attachmentName)}
    `,
  );
}

export function quoteAutoReplyHtml(name: string) {
  const first = escapeHtml(name.split(" ")[0] || "there");
  return layout(
    "We received your quote request",
    `
      <h1 style="margin:0 0 12px;font-size:22px;line-height:1.3;">Thanks, ${first}</h1>
      <p style="margin:0;font-size:15px;line-height:1.6;color:#3d463f;">
        We've received your quote request and aim to respond within one business day.
        For urgent catering questions, WhatsApp is often quickest.
      </p>
    `,
  );
}

const statusCopy: Record<
  "processing" | "shipped" | "delivered" | "cancelled",
  { headline: string; body: string }
> = {
  processing: {
    headline: "We're preparing your order",
    body: "Your order is now being prepared in our kitchen. We'll email you again when it ships.",
  },
  shipped: {
    headline: "Your order is on the way",
    body: "Great news — your order has been shipped. Keep an eye out for delivery updates from the courier.",
  },
  delivered: {
    headline: "Your order has been delivered",
    body: "Your order is marked as delivered. We hope you enjoy every bite — store Ready Soups frozen until you're ready to heat and serve.",
  },
  cancelled: {
    headline: "Your order was cancelled",
    body: "This order has been cancelled. If you didn't expect this, reply to this email and we'll help.",
  },
};

export function orderStatusUpdateHtml(input: {
  orderNumber: string;
  fullName: string;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  statusLabel: string;
  deliveryMethod: "delivery" | "pickup";
}) {
  const first = escapeHtml(input.fullName.split(" ")[0] || "there");
  const siteUrl = getSiteUrl();
  const copy = statusCopy[input.status];

  return layout(
    `${input.statusLabel} — ${input.orderNumber}`,
    `
      <h1 style="margin:0 0 12px;font-size:22px;line-height:1.3;">${escapeHtml(copy.headline)}, ${first}</h1>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#3d463f;">
        ${escapeHtml(copy.body)}
      </p>
      <p style="margin:0 0 8px;font-size:14px;"><strong>Order:</strong> ${escapeHtml(input.orderNumber)}</p>
      <p style="margin:0 0 8px;font-size:14px;"><strong>Status:</strong> ${escapeHtml(input.statusLabel)}</p>
      <p style="margin:0 0 20px;font-size:14px;"><strong>Fulfilment:</strong> ${
        input.deliveryMethod === "delivery" ? "Home delivery" : "Collection"
      }</p>
      <p style="margin:0;">
        <a href="${escapeHtml(siteUrl)}/account?section=orders" style="display:inline-block;background:#574821;color:#ffffff;text-decoration:none;padding:12px 18px;border-radius:8px;font-weight:700;font-size:14px;">
          Track your order
        </a>
      </p>
    `,
  );
}

