import type { Metadata } from "next";
import { ReadySoupsPageContent } from "@/components/ready-soups/ReadySoupsPageContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPublishedReviews } from "@/lib/feedback";
import { readySoupsBrand } from "@/lib/ready-soups";
import { breadcrumbJsonLd, bundleListJsonLd, productListJsonLd } from "@/lib/seo";

export const revalidate = 120;

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

export default async function ReadyToEatSoupsPage() {
  const reviews = await getPublishedReviews(8);
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
      <ReadySoupsPageContent reviews={reviews} />
    </>
  );
}
