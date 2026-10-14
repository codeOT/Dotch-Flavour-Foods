import { HomePageContent } from "@/components/home/HomePageContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPublishedReviews } from "@/lib/feedback";
import { homeProductsJsonLd } from "@/lib/seo";

export const revalidate = 120;

export default async function HomePage() {
  const reviews = await getPublishedReviews(3);
  return (
    <>
      <JsonLd data={homeProductsJsonLd()} />
      <HomePageContent reviews={reviews} />
    </>
  );
}
