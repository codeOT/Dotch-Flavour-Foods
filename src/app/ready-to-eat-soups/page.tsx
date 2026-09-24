import type { Metadata } from "next";
import { ReadySoupsPageContent } from "@/components/ready-soups/ReadySoupsPageContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { readySoupsBrand } from "@/lib/ready-soups";
import { breadcrumbJsonLd, bundleListJsonLd, productListJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Ready Soups by Dotch Flavour",
  description: readySoupsBrand.intro,
  keywords: [
    "Ready Soups",
    "Nigerian soup UK",
    "frozen Efo Riro",
    "Egusi",
    "Ayamase",
    "Buka Stew",
    "Ila Asepo",
  ],
  alternates: { canonical: "/ready-to-eat-soups" },
  openGraph: {
    title: "Ready Soups by Dotch Flavour",
    description: readySoupsBrand.intro,
    url: "/ready-to-eat-soups",
  },
};

export default function ReadyToEatSoupsPage() {
  return (
    <>
      <JsonLd
        data={[
          productListJsonLd(),
          bundleListJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Ready Soups", path: "/ready-to-eat-soups" },
          ]),
        ]}
      />
      <ReadySoupsPageContent />
    </>
  );
}
