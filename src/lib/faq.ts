export type FaqItem = {
  question: string;
  answer: string;
};

export const faqs: FaqItem[] = [
  {
    question: "What is Dotch Flavour?",
    answer:
      "Dotch Flavour is the trading brand of Dutch Flavour Foods Limited, offering fresh Nigerian food, catering, frozen Ready Soups, food experiences and selected branded merchandise.",
  },
  {
    question: "What is the difference between fresh food and Ready Soups?",
    answer:
      "Fresh food is prepared for weekly, bespoke or catering orders. Ready Soups are packaged frozen soups designed for convenient freezer storage and reheating.",
  },
  {
    question: "Which Ready Soups are available?",
    answer:
      "The launch range is Efo Riro, Efo Egusi, Ila Asepo, Ayamase and Buka Stew.",
  },
  {
    question: "How much are the Ready Soups?",
    answer:
      "Current prices are £22.99 for Efo Riro, Efo Egusi and Ila Asepo, and £24.99 for Ayamase and Buka Stew. The price shown at checkout is the current price.",
  },
  {
    question: "What is the minimum Ready Soups order?",
    answer:
      "The minimum online order is three tubs. Customers seeking a different local arrangement may contact us by WhatsApp.",
  },
  {
    question: "What bundles are available?",
    answer:
      "Planned bundle sizes are 3, 5, 10 and 18 tubs. Customers will be able to mix flavours subject to availability.",
  },
  {
    question: "Where do you deliver?",
    answer:
      "We deliver to eligible addresses across the United Kingdom. Some remote or restricted postcodes may have different availability or charges.",
  },
  {
    question: "How much is delivery?",
    answer:
      "Delivery is charged at a flat rate shown at checkout. The current working rate is £9.99 per eligible parcel, subject to final courier confirmation.",
  },
  {
    question: "Is delivery still the same price if I order more?",
    answer:
      "The flat parcel rate is expected to apply within the courier’s weight limit. This is why bundle ordering gives better delivery value. Final parcel limits will be confirmed after packed-weight testing.",
  },
  {
    question: "When will my Ready Soups arrive?",
    answer:
      "Ready Soups are intended for next-day delivery after dispatch. Processing time, order cut-offs, weekends, public holidays, postcode and courier conditions apply.",
  },
  {
    question: "How are frozen products packed?",
    answer:
      "Orders may use insulated wrapping, protective material, ice packs, strong boxes, branded tape or stickers and “Keep Frozen” handling labels, depending on order size and destination.",
  },
  {
    question: "Can I order one soup?",
    answer:
      "The website minimum is three soups. Contact us directly if you need to discuss a local or exceptional order.",
  },
  {
    question: "How do I store Ready Soups?",
    answer:
      "Place them in the freezer promptly and keep at -18°C or below where stated. Do not refreeze once fully thawed.",
  },
  {
    question: "How do I heat the soup?",
    answer:
      "Defrost safely, then heat in a saucepan for approximately 8 to 10 minutes while stirring, or follow suitable microwave instructions. Ensure it is piping hot throughout.",
  },
  {
    question: "How long does it last after thawing?",
    answer:
      "Keep refrigerated and consume within 2 to 3 days unless the product label gives a shorter period.",
  },
  {
    question: "Where can I find allergen information?",
    answer:
      "Allergen information should appear on every product page before checkout and on the product packaging. Contact us before ordering if you have an allergy or intolerance.",
  },
  {
    question: "Can you guarantee allergen-free food?",
    answer:
      "No. All products are prepared in the same kitchen, which handles multiple allergens, so cross-contact may occur.",
  },
  {
    question: "Can I pay online?",
    answer: "Yes. The website is intended to accept Stripe and PayPal payments.",
  },
  {
    question: "Do I need an account?",
    answer: "No. You may create an account or check out as a guest.",
  },
  {
    question: "Do you offer free delivery?",
    answer: "No. A delivery charge applies to orders.",
  },
  {
    question: "Do you offer gift cards?",
    answer: "Digital gift cards are not planned for launch.",
  },
  {
    question: "Will you sell merchandise?",
    answer:
      "Tote bags and wooden spoons may be sold or used as promotional incentives, subject to availability.",
  },
  {
    question: "Do you cater for events?",
    answer:
      "Yes. Use the Request a Quote form for birthdays, private gatherings, corporate events and other occasions.",
  },
  {
    question: "What is the minimum catering order?",
    answer: "The minimum catering order value is £200.",
  },
  {
    question: "How do I confirm a catering booking?",
    answer:
      "Full payment is required unless a different arrangement is agreed in writing. The booking is not confirmed until payment and written acceptance are received.",
  },
  {
    question: "Can I change a catering order?",
    answer:
      "Changes may be requested up to 48 hours before the event and are subject to availability and any additional cost.",
  },
  {
    question: "What happens if I cancel catering?",
    answer:
      "A tiered cancellation policy applies. Any retained amount must be reasonable and reflect non-recoverable costs and losses. Please read the Catering Booking Policy.",
  },
  {
    question: "Do you work with corporate customers and stockists?",
    answer:
      "Yes. Corporate, retail and wholesale customers can submit a dedicated enquiry for a tailored setup and trade discussion.",
  },
  {
    question: "How quickly will you reply to a quote request?",
    answer: "We aim to respond within one business day.",
  },
  {
    question: "What should I do if my order arrives damaged or warm?",
    answer:
      "Do not consume food you believe is unsafe. Contact us promptly, preferably within two hours, with photographs of the product, packaging and delivery label.",
  },
  {
    question: "What is your food hygiene rating?",
    answer:
      "The inspection is pending. We will publish the official rating only after it has been issued.",
  },
  {
    question: "How can I contact you?",
    answer:
      "Email hello@dutchflavourfoods.com. Telephone and WhatsApp details will be added before launch.",
  },
];

/** Featured FAQs shown on the homepage */
export const homepageFaqs: FaqItem[] = [
  faqs[0],
  faqs[1],
  faqs[4],
  faqs[7],
  faqs[12],
  faqs[22],
];
