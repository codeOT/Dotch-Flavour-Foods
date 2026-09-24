import { HomePageContent } from "@/components/home/HomePageContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { homeProductsJsonLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeProductsJsonLd()} />
      <HomePageContent />
    </>
  );
}
