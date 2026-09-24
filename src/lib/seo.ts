import { DELIVERY_FEE_UP_TO_20L } from "@/lib/cart-utils";
import { faqs } from "@/lib/faq";
import {
  readySoupBundles,
  readySoupProducts,
  type ReadySoupBundle,
  type ReadySoupProduct,
} from "@/lib/ready-soups";
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

function priceValidUntil() {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 1);
  return date.toISOString().slice(0, 10);
}

function merchantReturnPolicy() {
  return {
    "@type": "MerchantReturnPolicy",
    applicableCountry: "GB",
    returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: 14,
    returnMethod: "https://schema.org/ReturnByMail",
    returnFees: "https://schema.org/ReturnFeesCustomerResponsibility",
  };
}

function shippingDetails(freeDelivery = false) {
  return {
    "@type": "OfferShippingDetails",
    shippingRate: {
      "@type": "MonetaryAmount",
      value: freeDelivery ? "0" : DELIVERY_FEE_UP_TO_20L.toFixed(2),
      currency: siteConfig.currency,
    },
    shippingDestination: {
      "@type": "DefinedRegion",
      addressCountry: "GB",
    },
    deliveryTime: {
      "@type": "ShippingDeliveryTime",
      handlingTime: {
        "@type": "QuantitativeValue",
        minValue: 0,
        maxValue: 1,
        unitCode: "DAY",
      },
      transitTime: {
        "@type": "QuantitativeValue",
        minValue: 1,
        maxValue: 3,
        unitCode: "DAY",
      },
    },
  };
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

/** Full Product schema for a Ready Soup — used on product pages and ItemLists. */
export function productJsonLd(product: ReadySoupProduct, options?: { includeContext?: boolean }) {
  const url = absoluteUrl(`/ready-to-eat-soups/${product.slug}`);
  const includeContext = options?.includeContext !== false;

  const schema = {
    "@type": "Product",
    "@id": `${url}#product`,
    name: product.name,
    description: product.description || product.shortDescription,
    image: [absoluteAsset(product.image)],
    sku: product.id,
    mpn: product.id,
    url,
    brand: {
      "@type": "Brand",
      name: "Ready Soups by Dotch Flavour",
    },
    category: "Frozen Nigerian Soup",
    size: product.size,
    material: product.ingredients.slice(0, 8).join(", "),
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Net volume",
        value: product.size,
      },
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
      ...(product.mayContain?.length
        ? [
            {
              "@type": "PropertyValue",
              name: "May contain",
              value: product.mayContain.join(", "),
            },
          ]
        : []),
    ],
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: siteConfig.currency,
      price: product.price.toFixed(2),
      priceValidUntil: priceValidUntil(),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: siteConfig.name,
        url: getSiteUrl(),
      },
      shippingDetails: shippingDetails(false),
      hasMerchantReturnPolicy: merchantReturnPolicy(),
    },
  };

  if (!includeContext) return schema;
  return { "@context": "https://schema.org", ...schema };
}

export function bundleProductJsonLd(bundle: ReadySoupBundle, options?: { includeContext?: boolean }) {
  const catalogUrl = absoluteUrl("/ready-to-eat-soups");
  const includeContext = options?.includeContext !== false;

  const schema = {
    "@type": "Product",
    "@id": `${catalogUrl}#${bundle.id}`,
    name: bundle.name,
    description: bundle.description,
    image: [absoluteAsset(bundle.image)],
    sku: bundle.id,
    mpn: bundle.id,
    url: catalogUrl,
    brand: {
      "@type": "Brand",
      name: "Ready Soups by Dotch Flavour",
    },
    category: "Frozen Nigerian Soup Bundle",
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Soup count",
        value: String(bundle.soupCount),
      },
      ...(bundle.includesGift
        ? [
            {
              "@type": "PropertyValue",
              name: "Includes",
              value: bundle.includesGift,
            },
          ]
        : []),
    ],
    offers: {
      "@type": "Offer",
      url: catalogUrl,
      priceCurrency: siteConfig.currency,
      price: bundle.price.toFixed(2),
      priceValidUntil: priceValidUntil(),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: siteConfig.name,
        url: getSiteUrl(),
      },
      shippingDetails: shippingDetails(Boolean(bundle.freeDelivery)),
      hasMerchantReturnPolicy: merchantReturnPolicy(),
      ...(bundle.originalPrice
        ? {
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              priceType: "https://schema.org/StrikethroughPrice",
              price: bundle.originalPrice.toFixed(2),
              priceCurrency: siteConfig.currency,
            },
          }
        : {}),
    },
  };

  if (!includeContext) return schema;
  return { "@context": "https://schema.org", ...schema };
}

/** ItemList with full Product nodes so Google can surface products from the catalog page. */
export function productListJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ready Soups by Dotch Flavour",
    description:
      "Premium frozen Traditional Nigerian soups. Mix and match 2, 3, 4 or 5 tub bundles for UK delivery.",
    numberOfItems: readySoupProducts.length,
    itemListElement: readySoupProducts.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: productJsonLd(product, { includeContext: false }),
    })),
  };
}

export function bundleListJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ready Soups mix & match bundles",
    description: "Mix any Ready Soup flavours in 2, 3, 4 or 5 tub bundles.",
    numberOfItems: readySoupBundles.length,
    itemListElement: readySoupBundles.map((bundle, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: bundleProductJsonLd(bundle, { includeContext: false }),
    })),
  };
}

/** Homepage graph: all Ready Soup products for discovery. */
export function homeProductsJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": readySoupProducts.map((product) =>
      productJsonLd(product, { includeContext: false }),
    ),
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
