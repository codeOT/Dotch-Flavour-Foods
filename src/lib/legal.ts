import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD } from "@/lib/cart-utils";
import { siteConfig } from "@/lib/site";

export type LegalSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type LegalDocument = {
  title: string;
  description: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
};

const companyName = siteConfig.name;
const contactEmail = siteConfig.contact.email;
const contactPhone = siteConfig.contact.phone;

export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  description: `How ${companyName} collects, uses, and protects your personal information.`,
  lastUpdated: "8 July 2026",
  intro: `${companyName} ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and share your personal data when you visit our website, create an account, place an order, or contact us. We process personal data in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.`,
  sections: [
    {
      title: "1. Who we are",
      paragraphs: [
        `${companyName} is a UK-based food business offering ready-to-eat soups, fresh meals, sauces, and related products for delivery and collection.`,
        `If you have any questions about this policy or how we handle your data, please contact us at ${contactEmail} or ${contactPhone}.`,
      ],
    },
    {
      title: "2. Information we collect",
      paragraphs: ["We may collect and process the following types of personal information:"],
      bullets: [
        "Identity and contact details: name, email address, phone number, and delivery address.",
        "Account information: login credentials and profile details if you register with us.",
        "Order information: items purchased, order history, payment status, delivery preferences, and special instructions.",
        "Payment information: card or payment details are processed securely by our payment provider. We do not store full card numbers on our servers.",
        "Communication data: messages you send us via email, contact forms, or customer support.",
        "Technical data: IP address, browser type, device information, and cookies used to operate and improve our website.",
        "Marketing preferences: whether you have opted in to receive promotional emails or updates.",
      ],
    },
    {
      title: "3. How we use your information",
      paragraphs: ["We use your personal data for the following purposes:"],
      bullets: [
        "To process and fulfil your orders, including delivery or collection arrangements.",
        "To manage your account and provide customer support.",
        "To send order confirmations, delivery updates, and service-related communications.",
        "To improve our website, products, and customer experience.",
        "To prevent fraud, protect our business, and comply with legal obligations.",
        "To send marketing communications where you have given consent. You may unsubscribe at any time.",
      ],
    },
    {
      title: "4. Legal basis for processing",
      paragraphs: ["We process your personal data on one or more of the following legal bases:"],
      bullets: [
        "Contract: where processing is necessary to fulfil an order or provide a service you have requested.",
        "Consent: where you have agreed to receive marketing or optional communications.",
        "Legitimate interests: to operate and improve our business, provided your rights are not overridden.",
        "Legal obligation: where we are required to retain or disclose information by law.",
      ],
    },
    {
      title: "5. Sharing your information",
      paragraphs: [
        "We do not sell your personal data. We may share your information with trusted third parties only where necessary, including:",
      ],
      bullets: [
        "Payment processors to complete transactions securely.",
        "Delivery and logistics partners to deliver your order.",
        "IT and hosting providers that support our website and systems.",
        "Professional advisers or regulators where required by law.",
      ],
    },
    {
      title: "6. Data retention",
      paragraphs: [
        "We keep your personal data only for as long as necessary to fulfil the purposes described in this policy, including satisfying legal, accounting, or reporting requirements.",
        "Order records are typically retained for up to 6 years for tax and compliance purposes. Marketing data is retained until you withdraw consent or unsubscribe.",
      ],
    },
    {
      title: "7. Your rights",
      paragraphs: ["Under UK data protection law, you have the right to:"],
      bullets: [
        "Request access to the personal data we hold about you.",
        "Request correction of inaccurate or incomplete data.",
        "Request erasure of your data in certain circumstances.",
        "Object to or restrict certain types of processing.",
        "Request data portability where applicable.",
        "Withdraw consent at any time where processing is based on consent.",
        "Lodge a complaint with the Information Commissioner's Office (ICO) at ico.org.uk.",
      ],
    },
    {
      title: "8. Cookies",
      paragraphs: [
        "Our website uses cookies and similar technologies to enable core functionality, remember preferences, and understand how visitors use our site.",
        "You can control cookies through your browser settings. Disabling certain cookies may affect how parts of the website work.",
      ],
    },
    {
      title: "9. Security",
      paragraphs: [
        "We take appropriate technical and organisational measures to protect your personal data against unauthorised access, loss, misuse, or alteration.",
        "However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.",
      ],
    },
    {
      title: "10. Changes to this policy",
      paragraphs: [
        "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.",
        "Where changes are significant, we will take reasonable steps to notify you, for example by email or a notice on our website.",
      ],
    },
  ],
};

export const deliveryTerms: LegalDocument = {
  title: "Delivery Terms",
  description: `Delivery and collection terms for orders placed with ${companyName}.`,
  lastUpdated: "8 July 2026",
  intro: `These Delivery Terms apply to all orders placed with ${companyName} through our website, including fresh meals, ready-to-eat soups, and related products. By placing an order, you agree to the terms set out below. Please read them carefully before checkout.`,
  sections: [
    {
      title: "1. Delivery areas",
      paragraphs: [
        "We deliver across London and surrounding areas within the United Kingdom. Ready-to-eat frozen soups are available for UK-wide frozen delivery, subject to courier coverage.",
        "If your postcode is outside our standard delivery area, we will contact you to confirm whether delivery is possible or to arrange an alternative such as collection.",
      ],
    },
    {
      title: "2. Delivery fees",
      paragraphs: [
        `For standard fresh food and shop orders, delivery is free on orders of £${FREE_DELIVERY_THRESHOLD} or more. Orders below £${FREE_DELIVERY_THRESHOLD} are subject to a delivery fee of £${DELIVERY_FEE.toFixed(2)}.`,
        "For Ready-to-Eat Soups (frozen range), complimentary delivery applies to orders over £45. Delivery fees for smaller frozen orders will be shown at checkout.",
        "Any applicable delivery charge will be displayed clearly before you complete your purchase.",
      ],
    },
    {
      title: "3. Order processing",
      paragraphs: [
        "Orders are processed on working days (Monday to Saturday, excluding public holidays). Order confirmation will be sent to the email address provided at checkout.",
        "We aim to prepare and dispatch orders promptly. Preparation and dispatch times may vary depending on product availability, order volume, and delivery method.",
        "If an item is unavailable, we will contact you to offer a suitable substitute or a refund for the affected item.",
      ],
    },
    {
      title: "4. Delivery times",
      paragraphs: [
        "Estimated delivery times are provided at checkout and in your order confirmation. These are estimates only and are not guaranteed.",
        "Fresh meal orders are typically delivered within our stated local delivery window. Frozen soup orders are shipped in insulated packaging to maintain product temperature in transit.",
        "We are not liable for delays caused by circumstances outside our reasonable control, including severe weather, traffic disruption, or courier delays.",
      ],
    },
    {
      title: "5. Frozen product delivery",
      paragraphs: [
        "Ready-to-eat soups are delivered frozen and must be transferred to a freezer at −18°C or below as soon as possible after receipt.",
        "Products are packed in insulated packaging designed to maintain frozen conditions during transit. If your order arrives damaged, thawed, or otherwise unfit for consumption, please contact us within 24 hours with photos where possible.",
        "Best consumed within 3 months of delivery. Do not refreeze once fully defrosted.",
      ],
    },
    {
      title: "6. Collection (pickup)",
      paragraphs: [
        "Collection may be available as an alternative to delivery. If offered at checkout, you will receive confirmation when your order is ready for pickup.",
        "Collection is free of charge. Please bring your order confirmation and valid identification if requested.",
        "Uncollected orders may be disposed of after a reasonable period, and refunds may not be available where food safety cannot be assured.",
      ],
    },
    {
      title: "7. Delivery instructions and access",
      paragraphs: [
        "Please provide accurate delivery details, including flat or building number, postcode, contact phone number, and any access instructions.",
        "If a delivery cannot be completed due to incorrect address details, unavailable recipient, or restricted access, additional delivery charges may apply for re-delivery.",
        "By placing an order, you confirm that someone aged 18 or over will be available to receive the delivery where required.",
      ],
    },
    {
      title: "8. Failed or missed deliveries",
      paragraphs: [
        "If you are not available to receive your order, our courier or delivery team may leave the parcel in a safe place where agreed, or attempt re-delivery in line with their policy.",
        "Perishable and frozen items cannot always be re-delivered if food safety may be compromised. In such cases, we may not be able to offer a refund or replacement.",
        "Please contact us as soon as possible if you experience a missed delivery so we can assist.",
      ],
    },
    {
      title: "9. Refunds and replacements",
      paragraphs: [
        "If your order arrives incorrect, incomplete, damaged, or unfit for consumption, please notify us within 24 hours of delivery at " +
          contactEmail +
          ".",
        "We may request supporting information such as photographs. Where a valid issue is confirmed, we will offer a replacement or refund at our discretion.",
        "Refunds are processed to the original payment method and may take 5–10 working days to appear, depending on your bank or card provider.",
      ],
    },
    {
      title: "10. Contact us",
      paragraphs: [
        `For delivery enquiries, order tracking, or issues with your delivery, please contact us:`,
      ],
      bullets: [
        `Email: ${contactEmail}`,
        `Phone: ${contactPhone}`,
        "Please include your order number and a brief description of your enquiry so we can help you quickly.",
      ],
    },
  ],
};
