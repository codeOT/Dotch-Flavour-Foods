export type SiteContact = {
  phone: string;
  email: string;
  address: string;
};

export const siteConfig = {
  name: "Dotch Flavour Foods",
  locale: "en-GB",
  currency: "GBP",
  currencySymbol: "£",
  contact: {
    phone: "+447889490189",
    email: "hello@dotchflavourfoods.com",
    address: "United Kingdom",
  } satisfies SiteContact,
} as const;

export function formatPrice(amount: number): string {
  return `${siteConfig.currencySymbol}${amount.toFixed(2)}`;
}
