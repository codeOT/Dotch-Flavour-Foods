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
    address: "Hemel Hempstead, United Kingdom, HP2 5JN",
    companyNumber: "17246871",
  } satisfies SiteContact,
} as const;

export function formatPrice(amount: number | null | undefined): string {
  const value = typeof amount === "number" && Number.isFinite(amount) ? amount : 0;
  return `${siteConfig.currencySymbol}${value.toFixed(2)}`;
}