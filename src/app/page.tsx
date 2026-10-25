import type { Metadata } from "next";
import { HomePageContent } from "@/components/home/HomePageContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPublishedReviews } from "@/lib/feedback";
import { absoluteTitle, defaultSeo, homeProductsJsonLd } from "@/lib/seo";

export const revalidate = 120;

export const metadata: Metadata = {
  title: absoluteTitle(defaultSeo.title),
  description: defaultSeo.description,
  openGraph: {
    title: defaultSeo.title,
    description: defaultSeo.description,
    url: "/",
  },
};

export default async function HomePage() {
  const reviews = await getPublishedReviews(3);
  return (
    <>
      <JsonLd data={homeProductsJsonLd()} />
      <HomePageContent reviews={reviews} />
    </>
  );
}
