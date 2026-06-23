export const siteConfig = {
  name: "Dotch Flavours Foods",
  locale: "en-GB",
  currency: "GBP",
  currencySymbol: "£",
  contact: {
    phone: "+44 23 4567 8901",
    email: "hello@dotchflavoursfoods.com",
    address: "United Kingdom",
  },
} as const;

export function formatPrice(amount: number): string {
  return `${siteConfig.currencySymbol}${amount.toFixed(2)}`;
}
