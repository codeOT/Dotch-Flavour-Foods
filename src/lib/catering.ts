import { DELIVERY_FEE } from "@/lib/cart-utils";
import { formatPrice } from "@/lib/site";

export const cateringPage = {
  eyebrow: "Catering",
  title: "Catering by Dotch Flavour",
  intro:
    "Authentic Nigerian flavours for private celebrations, office lunches, and branded tasting moments — planned with the same care as every Ready Soup we ship.",
  serviceTypes: [
    {
      title: "Private celebrations",
      description: "Birthdays, family gatherings, and intimate dinners with tray options or Ready Soup bundles.",
    },
    {
      title: "Office & meetings",
      description: "Working lunches and team events with clear portion planning and delivery windows.",
    },
    {
      title: "Tastings & brand experiences",
      description: "Curated menus for launches, community events, and Dotch Flavour Experience moments.",
    },
  ],
  details: [
    {
      title: "Minimum order",
      text: "The minimum catering order value is £200.",
    },
    {
      title: "Lead times",
      text: "Please allow at least 5–7 working days for standard catering. Larger events may need longer notice.",
    },
    {
      title: "Payment terms",
      text: "Full payment is required to confirm the booking unless otherwise agreed in writing. See our Catering Booking Policy for cancellations and amendments.",
    },
    {
      title: "Delivery",
      text: `Where delivery applies, fees are confirmed in your quote. Online Ready Soups shop orders use a flat ${formatPrice(DELIVERY_FEE)} delivery charge.`,
    },
  ],
} as const;

export const quoteEnquiryTypes = [
  { value: "catering", label: "Private catering / celebration" },
  { value: "corporate", label: "Corporate / office catering" },
  { value: "experience", label: "Dotch Flavour Experience / tasting" },
  { value: "wholesale", label: "Wholesale / stockist enquiry" },
  { value: "other", label: "Other enquiry" },
] as const;

export type QuoteEnquiryType = (typeof quoteEnquiryTypes)[number]["value"];
