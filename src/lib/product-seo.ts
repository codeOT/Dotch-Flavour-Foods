export type ProductSeo = {
  title: string;
  description: string;
  imageAlt?: string;
};

const PRODUCT_SEO: Record<string, ProductSeo> = {
  "chicken-beef-stew": {
    title: "Buy Chicken & Beef in Peppered Stew Online UK | Dotch Flavour",
    description:
      "Tender, well-seasoned fried chicken and beef cooked in rich, spicy Nigerian pepper stew. Order online in 1L tubs or bulk trays for UK delivery.",
  },
  "buka-stew": {
    title: "Order Buka Stew 2L, 4L, 6L Trays & 1L Tubs UK | Dotch Flavour",
    description:
      "Rich, spicy peppered Nigerian Buka stew packed with assorted meats. Available in 1L tubs and 2L, 4L, 6L party trays. Fast London & UK home delivery!",
    imageAlt: "Peppered Nigerian Buka stew tub and tray by Dotch Flavour",
  },
  ayamase: {
    title: "Authentic Ayamase Stew Trays & 1L Tubs UK | Dotch Flavour",
    description:
      "Traditional green pepper Ayamase stew cooked with bleach palm oil, locust beans & assorted meats. Available in 1L tubs and 2L–6L food trays.",
    imageAlt: "Authentic green pepper Ayamase stew tray",
  },
  "ofada-sauce": {
    title: "Order Authentic Ofada Sauce Online UK | Dotch Flavour Foods",
    description:
      "Rich, spicy, authentic Nigerian Ofada sauce cooked with iru and assorted meats. Perfect paired with Ofada rice. Order 1L tubs or 2L–6L trays online.",
    imageAlt: "Rich Nigerian Ofada sauce with iru and assorted meat",
  },
  "efo-riro": {
    title: "Buy Frozen Efo Riro Soup Online UK (2L–6L Trays) | Dotch Flavour",
    description:
      "Authentic Nigerian spinach stew cooked with traditional spices, crayfish & rich proteins. Order 1L frozen Efo Riro tubs or 2L, 4L, 6L bulk trays.",
    imageAlt: "Authentic frozen Efo Riro spinach soup tub",
  },
  "efo-egusi": {
    title: "Buy Authentic Frozen Egusi Soup Online UK | Dotch Flavour",
    description:
      "Order ready-to-eat frozen Egusi soup (Efo Egusi) online. Made with ground melon seeds, vegetables & rich proteins in 1L tubs & 2L–6L food trays.",
    imageAlt: "Ready-to-eat Nigerian Egusi soup tub",
  },
  "ila-asepo": {
    title: "Buy Fresh Ila Asepo Okra Soup Online UK | Dotch Flavour",
    description:
      "Delicious, authentic Nigerian Ila Asepo (mixed okra soup) cooked with seafood, meat & palm oil. Order 1L ready tubs or 2L, 4L, 6L catering trays.",
    imageAlt: "Authentic mixed Ila Asepo okra soup tray",
  },
  "ila-alasepo": {
    title: "Buy Fresh Ila Asepo Okra Soup Online UK | Dotch Flavour",
    description:
      "Delicious, authentic Nigerian Ila Asepo (mixed okra soup) cooked with seafood, meat & palm oil. Order 1L ready tubs or 2L, 4L, 6L catering trays.",
    imageAlt: "Authentic mixed Ila Asepo okra soup tray",
  },
  ogbono: {
    title: "Order Authentic Nigerian Ogbono Soup Online UK | Dotch Flavour",
    description:
      "Rich, savoury Nigerian Ogbono (wild mango seed) soup cooked with traditional spices and assorted meats. Available in 1L tubs & 2L–6L trays.",
    imageAlt: "Traditional Nigerian Ogbono soup tray",
  },
  "pepper-fish": {
    title: "Order Fried Peppered Fish Trays (Hake) UK | Dotch Flavour",
    description:
      "Crispy, well-seasoned fried Hake fish tossed in spicy Nigerian pepper sauce. Perfect side dish for Jollof, fried rice & swallow. Order 2L–6L trays.",
    imageAlt: "Fried peppered Hake fish tray side dish",
  },
  "pepper-gizzard": {
    title: "Buy Spicy Peppered Gizzard Trays Online | Dotch Flavour UK",
    description:
      "Tender, chewy turkey/chicken gizzards cooked in rich pepper sauce. The ultimate Nigerian party side dish available in 2L, 4L, and 6L trays.",
    imageAlt: "Spicy Nigerian peppered gizzard tray",
  },
  "pepper-turkey": {
    title: "Order Spicy Peppered Turkey Trays Online | Dotch Flavour UK",
    description:
      "Succulent fried turkey pieces tossed in spicy pepper sauce. Perfect add-on for rice dishes, swallow, and party catering orders across the UK.",
    imageAlt: "Fried peppered turkey tray side dish",
  },
  gizdodo: {
    title: "Buy Authentic Nigerian Gizdodo Trays Online UK | Dotch Flavour",
    description:
      "Delicious combination of peppered gizzard and sweet fried plantain cubes (Gizdodo). Ideal side dish for parties and meal prep. Order 2L–6L trays.",
    imageAlt: "Nigerian Gizdodo peppered gizzard and plantain tray",
  },
  "ewa-riro": {
    title: "Buy Nigerian Porridge Beans (Ewa Riro) UK | Dotch Flavour",
    description:
      "Slow-cooked Nigerian porridge beans (Ewa Riro) rich in traditional spices and palm oil flavour. Order 2L, 4L, and 6L trays online for UK delivery.",
    imageAlt: "Rich Nigerian Ewa Riro porridge beans tray",
  },
  "ewa-agoyin": {
    title: "Order Ewa Agoyin & Dark Pepper Sauce Trays | Dotch Flavour",
    description:
      "Soft mashed beans served with authentic, spicy dark Agoyin pepper sauce. Order 2L, 4L, and 6L bulk trays online for London & UK delivery.",
    imageAlt: "Soft Ewa Agoyin with dark pepper sauce tray",
  },
  "moi-moi": {
    title: "Buy Fresh Nigerian MoiMoi Online UK | Dotch Flavour Foods",
    description:
      "Rich, savoury steamed Nigerian MoiMoi made with blended peeled beans and peppers. Perfect side dish for Smoky Jollof, Fried Rice, or Ogi/Pap.",
    imageAlt: "Steamed Nigerian MoiMoi bean cake side dish",
  },
  "asaro-sauce": {
    title: "Order Authentic Yam Porridge (Asaro with Sauce) | Dotch Flavour",
    description:
      "Delicious Nigerian Yam Porridge (Asaro) cooked in seasoned pepper sauce with dry fish & palm oil. Order 2L, 4L, 6L trays online for UK delivery.",
    imageAlt: "Authentic Nigerian Asaro Yam Porridge with sauce tray",
  },
  "abula-combo": {
    title: "Order Abula Combo Trays (Ewedu, Gbegiri & Buka Stew) | Dotch Flavour",
    description:
      "Authentic Buka-style Abula Combo: silky Ewedu, rich Gbegiri, and spicy Buka stew with assorted meat. Available in 4L and 6L party trays UK.",
    imageAlt: "Buka style Abula combo with Ewedu Gbegiri and Buka stew tray",
  },
};

export function getProductSeo(id: string): ProductSeo | undefined {
  return PRODUCT_SEO[id.trim().toLowerCase()];
}

export function productImageAlt(id: string, fallback: string): string {
  return getProductSeo(id)?.imageAlt ?? fallback;
}
