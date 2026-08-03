export type SiteContact = {
  phone: string;
  email: string;
  address: string;
  companyNumber?: string;
};

export const siteConfig = {
  name: "Dotch Flavour Foods",
  locale: "en-GB",
  currency: "GBP",
  currencySymbol: "£",
  contact: {
    phone: "+447889490189",
    email: "hello@dotchflavours.com",
    address: "5 The Grazings, Hemel Hempstead, United Kingdom, HP2 5JN",
    companyNumber: "17246871",
  } satisfies SiteContact,
} as const;

export function formatPrice(amount: number): string {
  return `${siteConfig.currencySymbol}${amount.toFixed(2)}`;
}
