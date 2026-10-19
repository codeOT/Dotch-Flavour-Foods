import type { Metadata } from "next";
import { PromoContent } from "@/components/pages/PromoContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { halfTermPromo } from "@/lib/promo";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: `${halfTermPromo.title} — Half-term offers`,
  description: halfTermPromo.intro,
  keywords: [
    "half-term food UK",
    "jollof combo",
    "Nigerian catering",
    "Ready Soups",
    "Dotch Flavour offer",
  ],
  alternates: { canonical: halfTermPromo.path },
  openGraph: {
    title: `${halfTermPromo.title} | Dotch Flavour Foods`,
    description: halfTermPromo.intro,
    url: halfTermPromo.path,
    images: [{ url: "/assets/images/promo/half-term-family.jpg", alt: halfTermPromo.title }],
  },
};

export default function PromoPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: halfTermPromo.title, path: halfTermPromo.path },
        ])}
      />
      <PromoContent />
    </>
  );
}
