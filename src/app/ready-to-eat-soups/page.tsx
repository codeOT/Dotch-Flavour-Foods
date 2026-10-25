import type { Metadata } from "next";
import { ReadySoupsPageContent } from "@/components/ready-soups/ReadySoupsPageContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPublishedReviews } from "@/lib/feedback";
import { absoluteTitle, breadcrumbJsonLd, bundleListJsonLd, productListJsonLd } from "@/lib/seo";

export const revalidate = 120;

const readySoupsTitle = "Buy Frozen Nigerian Soups Online UK (1L Tubs) | Dotch Flavour";
const readySoupsDescription =
  "Shop ready-to-eat frozen Nigerian soups in 1L tubs. Delivered across London & UK. Heat and serve Efo Riro, Egusi, Ayamase & Ila Asepo in minutes.";

export const metadata: Metadata = {
  title: absoluteTitle(readySoupsTitle),
  description: readySoupsDescription,
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
    title: readySoupsTitle,
    description: readySoupsDescription,
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
