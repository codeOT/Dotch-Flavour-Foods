import { faqs } from "@/lib/faq";
import { readySoupProducts, type ReadySoupProduct } from "@/lib/ready-soups";
import { siteConfig } from "@/lib/site";
import { getSiteUrl } from "@/lib/sitemap-data";

export const defaultSeo = {
  title: "Dotch Flavour Foods | Authentic Nigerian Ready Soups",
  description:
    "Authentic Nigerian Ready Soups, fresh catering trays, and traditional flavours from Dotch Flavour Foods. Frozen 1 Litre tubs — heat, serve, and enjoy across the UK.",
  keywords: [
    "Nigerian soup",
    "Ready Soups",
    "Efo Riro",
    "Egusi",
    "Ayamase",
    "Buka Stew",
    "Ila Asepo",
    "frozen Nigerian food UK",
    "Dotch Flavour",
    "Nigerian catering",
  ],
  ogImage: "/assets/images/hero-bg.png",
} as const;

export function absoluteUrl(path = "/") {
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function absoluteAsset(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return absoluteUrl(path);
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    name: siteConfig.name,
    url: getSiteUrl(),
    image: absoluteAsset("/assets/images/favicon.png"),
    logo: absoluteAsset("/assets/images/favicon.png"),
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hemel Hempstead",
      addressCountry: "GB",
    },
    servesCuisine: "Nigerian",
    priceRange: "££",
    sameAs: [],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: getSiteUrl(),
    inLanguage: "en-GB",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function productJsonLd(product: ReadySoupProduct) {
  const url = absoluteUrl(`/ready-to-eat-soups/${product.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: [absoluteAsset(product.image)],
    sku: product.id,
    url,
    brand: {
      "@type": "Brand",
      name: "Ready Soups by Dotch Flavour",
    },
    category: "Frozen Nigerian Soup",
    size: product.size,
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Ingredients",
        value: product.ingredients.join(", "),
      },
      {
        "@type": "PropertyValue",
        name: "Allergens",
        value: product.allergens.join(", "),
      },
    ],
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: siteConfig.currency,
      price: product.price.toFixed(2),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: siteConfig.name,
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "GB",
        },
      },
    },
  };
}

export function productListJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ready Soups by Dotch Flavour",
    itemListElement: readySoupProducts.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/ready-to-eat-soups/${product.slug}`),
      name: product.name,
    })),
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
