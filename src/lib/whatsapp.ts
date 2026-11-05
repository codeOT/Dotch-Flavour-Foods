import type { MenuItem } from "@/lib/navigation";
import { formatLitrePrice, getDefaultLitreSize, type LitreSize } from "@/lib/litre-sizes";
import { formatPrice, siteConfig } from "@/lib/site";

export function whatsappHref(message: string) {
  const number = siteConfig.contact.phone.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function freshMenuCustomiseWhatsAppHref() {
  return whatsappHref(
    "Hi Dotch Flavour Foods, I'd like to customise a Fresh Food order. Please share available options.",
  );
}

export function freshMenuOrderWhatsAppHref(item: MenuItem, litres?: LitreSize) {
  const isUnit = item.pricingMode === "unit";
  const size = isUnit
    ? (item.unitLabel ?? "per wrap")
    : `${litres ?? getDefaultLitreSize(item.litreSizes, item.pricesByLitre)}L`;
  const price = isUnit
    ? `${formatPrice(item.priceValue)} ${item.unitLabel ?? ""}`.trim()
    : formatLitrePrice(
        item.priceValue,
        litres ?? getDefaultLitreSize(item.litreSizes, item.pricesByLitre),
        item.litreSizes,
        item.pricesByLitre,
      );

  return whatsappHref(
    `Hi Dotch Flavour Foods, I'd like to order Fresh Food:\n- ${item.name} (${size}) — ${price}\nPlease confirm availability and next steps.`,
  );
}
