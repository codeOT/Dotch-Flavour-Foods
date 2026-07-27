export type SiteContact = {
  phone: string;
  email: string;
  address: string;
};

export const siteConfig = {
  name: "Dotch Flavours Foods",
  locale: "en-GB",
  currency: "GBP",
  currencySymbol: "£",
  contact: {
    phone: "+447889490189",
    email: "dotchflavourfoods@gmail.com",
    address: "United Kingdom",
  } satisfies SiteContact,
} as const;

export function formatPrice(amount: number): string {
  return `${siteConfig.currencySymbol}${amount.toFixed(2)}`;
}
