export type LegalTable = {
  headers: string[];
  rows: string[][];
};

export type LegalSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  table?: LegalTable;
};

export type LegalDocument = {
  title: string;
  description: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
};

const legalEmail = "hello@dutchflavourfoods.com";

export const websiteTerms: LegalDocument = {
  title: "Website Terms and Conditions",
  description:
    "Terms governing use of the Dotch Flavour website and purchases made through it.",
  lastUpdated: "24 July 2026",
  intro:
    "These terms govern use of the Dotch Flavour website and purchases made through it.",
  sections: [
    {
      title: "1.1 About us",
      paragraphs: [
        `The website is operated by Dutch Flavour Foods Limited, trading as Dotch Flavour. Registered company number: [INSERT]. Registered office: [INSERT]. Customer service email: ${legalEmail}. Telephone/WhatsApp: [INSERT].`,
      ],
    },
    {
      title: "1.2 Agreement to these terms",
      paragraphs: [
        "By using the website, creating an account, submitting an enquiry, registering for an experience or placing an order, you agree to these Terms and Conditions and the policies linked from them. If you do not agree, please do not use the website or place an order.",
      ],
    },
    {
      title: "1.3 Who may order",
      paragraphs: [
        "You must be at least 18 years old and legally capable of entering into a contract. You are responsible for ensuring that the details you provide are complete and accurate.",
      ],
    },
    {
      title: "1.4 Products and services",
      paragraphs: [
        "Dotch Flavour sells frozen Ready Soups, freshly prepared food, catering services, event or experience tickets and selected merchandise. Product images are illustrative. Handmade food may vary slightly in colour, texture, ingredient distribution and presentation without affecting its quality.",
      ],
    },
    {
      title: "1.5 Product information, ingredients and allergens",
      paragraphs: [
        "We aim to keep product descriptions, ingredients, portion guidance, storage instructions and allergen information accurate. Recipes may change. Customers must read the information shown on the product page and packaging each time they order. If you or the intended recipient has an allergy or intolerance, contact us before ordering and do not rely only on previous purchases.",
      ],
    },
    {
      title: "1.6 Prices",
      paragraphs: [
        "Prices are shown in pounds sterling and include VAT where applicable. Delivery charges are added at checkout. We may change prices, bundles and promotional offers at any time, but changes will not affect an order already accepted.",
        "Current Ready Soups prices at the date of this policy are £22.99 for Efo Riro, Efo Egusi and Ila Asepo, and £24.99 for Ayamase and Buka Stew. These prices remain subject to the live website at checkout.",
      ],
    },
    {
      title: "1.7 Minimum orders and bundles",
      paragraphs: [
        "The minimum online order for Ready Soups is three tubs. Customers seeking a smaller local or exceptional order may contact us by WhatsApp, but acceptance is at our discretion. Catering orders have a minimum order value of £200.",
      ],
    },
    {
      title: "1.8 Placing an order",
      paragraphs: [
        "Your order is an offer to buy. An automated acknowledgement confirms receipt, not acceptance. A contract is formed when we send an order confirmation or begin preparing or dispatching the order, whichever occurs first. We may decline an order where a product is unavailable, payment fails, delivery is not reasonably possible, information is incomplete or we suspect fraud or misuse.",
      ],
    },
    {
      title: "1.9 Payments",
      paragraphs: [
        "Online payments may be processed through Stripe and PayPal. Payment providers process card or account data under their own terms and privacy notices. We do not store full payment-card details. Catering bookings require full payment to confirm the booking unless we expressly agree otherwise in writing.",
      ],
    },
    {
      title: "1.10 Customer accounts and guest checkout",
      paragraphs: [
        "Customers may create an account or check out as a guest. Account holders are responsible for keeping login details confidential and for activity carried out through their account. Notify us promptly if you believe your account has been used without permission.",
      ],
    },
    {
      title: "1.11 Delivery",
      paragraphs: [
        "We deliver within the United Kingdom to eligible addresses. Ready Soups are intended for next-day delivery after dispatch, but courier timings are estimates and are not guaranteed. Delivery charges and available services are displayed at checkout. Our Delivery Policy forms part of these terms.",
      ],
    },
    {
      title: "1.12 Risk and responsibility after delivery",
      paragraphs: [
        "Risk in the goods passes to you when they are delivered to the address provided or collected by you. Frozen and chilled items must be transferred to appropriate storage promptly. We are not responsible for deterioration caused by an incorrect address, missed delivery, delayed unpacking, improper storage or failure to follow heating and storage instructions.",
      ],
    },
    {
      title: "1.13 Cancellations and perishable goods",
      paragraphs: [
        "Many food products are perishable or liable to deteriorate rapidly. The statutory 14-day change-of-mind cancellation right may not apply to such products, customised goods or catering prepared for a specific date. This does not affect your rights where goods are faulty, not as described or not of satisfactory quality. Our Refund, Returns and Cancellation Policy provides further details.",
      ],
    },
    {
      title: "1.14 Catering and bespoke orders",
      paragraphs: [
        "Catering and bespoke orders are governed by the Catering Booking Policy and any written quotation or event specification. Where there is a conflict, the signed or accepted quotation takes priority for that booking.",
      ],
    },
    {
      title: "1.15 Experiences, events and tickets",
      paragraphs: [
        "Event details, admission conditions, cancellation terms and age restrictions will be stated on the event page or ticket confirmation. We may make reasonable changes to speakers, programme, timings or suppliers. If an event is cancelled by us, the remedy stated in the event terms will apply.",
      ],
    },
    {
      title: "1.16 Merchandise",
      paragraphs: [
        "Merchandise, including tote bags and wooden spoons, may be sold or offered as promotional gifts. Product colours and dimensions may vary slightly. Standard consumer rights apply to faulty merchandise.",
      ],
    },
    {
      title: "1.17 Promotions and discount codes",
      paragraphs: [
        "Promotions are subject to availability, stated dates and any specific conditions. Unless stated otherwise, codes cannot be exchanged for cash, combined or applied retrospectively. We may withdraw a promotion where there is an error, misuse or suspected fraud.",
      ],
    },
    {
      title: "1.18 Intellectual property",
      paragraphs: [
        "The website, logos, brand assets, packaging, photography, videos, recipes, written content and designs are owned by or licensed to Dutch Flavour Foods Limited. They may not be copied, reproduced, adapted or used commercially without written permission.",
      ],
    },
    {
      title: "1.19 Acceptable website use",
      paragraphs: ["You must not:"],
      bullets: [
        "Interfere with the website, introduce malware or attempt unauthorised access.",
        "Use false identities, payment information or addresses.",
        "Scrape, reproduce or commercially exploit website content without permission.",
        "Submit unlawful, abusive, defamatory or misleading material.",
      ],
    },
    {
      title: "1.20 Liability",
      paragraphs: [
        "Nothing in these terms excludes liability that cannot legally be excluded, including liability for death or personal injury caused by negligence, fraud, or breach of statutory consumer rights. Subject to that, we are not liable for indirect or unforeseeable loss, business loss suffered by consumers, or loss caused by circumstances beyond our reasonable control. If you are purchasing wholly or mainly for business purposes, additional limitations may be agreed in writing.",
      ],
    },
    {
      title: "1.21 Events outside our control",
      paragraphs: [
        "We are not responsible for delay or failure caused by events beyond our reasonable control, including severe weather, courier disruption, power failure, supply interruption, public-health restrictions or transport disruption. We will take reasonable steps to minimise the impact and contact affected customers where practical.",
      ],
    },
    {
      title: "1.22 Changes to these terms",
      paragraphs: [
        "We may update these terms. The version published when an order is placed will normally apply to that order. Material changes will be dated at the top of the page.",
      ],
    },
    {
      title: "1.23 Governing law",
      paragraphs: [
        "These terms are governed by the law of England and Wales. Consumers may also have rights to bring proceedings in the part of the United Kingdom where they live.",
      ],
    },
    {
      title: "1.24 Contact",
      paragraphs: [`Questions about these terms should be sent to ${legalEmail}.`],
    },
  ],
};

export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  description:
    "How Dutch Flavour Foods Limited uses personal information in accordance with UK data-protection law.",
  lastUpdated: "24 July 2026",
  intro:
    "This policy explains how Dutch Flavour Foods Limited uses personal information in accordance with UK data-protection law. It must be updated after the final systems and providers are confirmed.",
  sections: [
    {
      title: "2.1 Data controller",
      paragraphs: [
        `Dutch Flavour Foods Limited, trading as Dotch Flavour, is the controller of personal information collected through the website and direct customer relationships. Registered office: [INSERT]. Company number: [INSERT]. Privacy contact: ${legalEmail}.`,
      ],
    },
    {
      title: "2.2 Information we may collect",
      paragraphs: ["We may collect:"],
      bullets: [
        "Identity and contact details, including name, email, telephone number, delivery address and billing address.",
        "Account details, login information and preferences.",
        "Order, payment-status, refund and transaction information. Full card details are handled by payment providers.",
        "Catering and event-enquiry information, including event date, venue, guest numbers, budget, menu preferences and dietary information.",
        "Allergy or dietary information you choose to provide. This may reveal health-related information and will be used only to respond to your request and support food safety.",
        "Customer-service messages, complaints, reviews, testimonials and survey responses.",
        "Marketing preferences and interaction with emails.",
        "Website and device information, including IP address, browser, pages viewed and cookie identifiers.",
        "Corporate, retailer, stockist and supplier contact information.",
        "Photographs or video captured at events where appropriate notices or consent arrangements are in place.",
      ],
    },
    {
      title: "2.3 How we collect information",
      paragraphs: [
        "We collect information directly from you when you order, create an account, submit a form, contact us, attend an event, join a mailing list or communicate through WhatsApp or social media. We may receive information from payment providers, couriers, event platforms, analytics providers and business partners. If an existing customer list is imported into an email platform, we will ensure that the intended use is lawful and transparent.",
      ],
    },
    {
      title: "2.4 Why we use information and lawful bases",
      paragraphs: ["We use personal information for the purposes set out below."],
      table: {
        headers: ["Purpose", "Typical information", "Lawful basis"],
        rows: [
          [
            "Process orders, deliver products and manage accounts",
            "Contact, address, order and transaction data",
            "Contract",
          ],
          [
            "Respond to catering, wholesale and corporate enquiries",
            "Contact and enquiry details",
            "Pre-contract steps and legitimate interests",
          ],
          [
            "Food safety and dietary requests",
            "Allergy/dietary information voluntarily provided",
            "Explicit consent where required; vital interests in an emergency; contract/legitimate interests as applicable",
          ],
          [
            "Customer service, complaints and refunds",
            "Order and communication records",
            "Contract, legal obligation and legitimate interests",
          ],
          [
            "Fraud prevention, accounting and legal compliance",
            "Transaction and technical data",
            "Legal obligation and legitimate interests",
          ],
          [
            "Marketing to customers and subscribers",
            "Contact details and marketing preferences",
            "Consent or legitimate interests where permitted; electronic marketing rules apply",
          ],
          [
            "Website operation and analytics",
            "Device, usage and cookie data",
            "Consent for non-essential cookies; legitimate interests for strictly necessary security and service operation",
          ],
          [
            "Events, testimonials and content",
            "Registration details, image/video or testimonial",
            "Contract, legitimate interests or consent depending on use",
          ],
        ],
      },
    },
    {
      title: "2.5 Marketing",
      paragraphs: [
        "We may send product, menu, launch, experience and offer updates where you have consented or where permitted for existing customers. Every electronic marketing message will provide an unsubscribe method. Service messages about orders, deliveries, bookings and safety are not marketing and may still be sent where necessary.",
      ],
    },
    {
      title: "2.6 Sharing information",
      paragraphs: [
        "We may share relevant information with service providers that help us operate, including website hosting and development providers, Stripe, PayPal, delivery couriers, email-marketing platforms, analytics and cookie providers, accountants, professional advisers, event-registration services and event suppliers. We require providers to protect information and use it only for authorised purposes. We may disclose information where required by law, regulators, insurers or law-enforcement authorities.",
      ],
    },
    {
      title: "2.7 International transfers",
      paragraphs: [
        "Some service providers may process information outside the United Kingdom. Where this occurs, we will use an approved transfer mechanism or rely on another lawful safeguard. The final policy should list or link to the relevant providers once confirmed.",
      ],
    },
    {
      title: "2.8 Retention",
      paragraphs: [
        "We retain information only for as long as reasonably necessary. Indicative periods are: order and accounting records for up to seven years; customer-service and complaint records for up to six years after resolution; unsuccessful catering enquiries for up to two years; account data while the account remains active and for a reasonable period afterwards; and marketing data until consent is withdrawn or the contact is inactive under our retention process. These periods may change where law, insurance or a dispute requires longer retention.",
      ],
    },
    {
      title: "2.9 Security",
      paragraphs: [
        "We use reasonable technical and organisational measures to protect personal information. No internet service is completely secure. Customers should use strong passwords and avoid sharing account credentials.",
      ],
    },
    {
      title: "2.10 Your rights",
      paragraphs: ["You may:"],
      bullets: [
        "Ask for access to your personal information.",
        "Ask us to correct inaccurate or incomplete information.",
        "Ask us to erase information in certain circumstances.",
        "Ask us to restrict processing in certain circumstances.",
        "Object to processing based on legitimate interests or to direct marketing.",
        "Ask for portability of information you supplied where applicable.",
        "Withdraw consent at any time where processing relies on consent.",
        "Complain to the Information Commissioner's Office.",
      ],
    },
    {
      title: "Exercising your rights",
      paragraphs: [
        `To exercise a right, email ${legalEmail}. We may need to verify your identity. You may also contact the Information Commissioner's Office through its official website.`,
      ],
    },
    {
      title: "2.11 Children",
      paragraphs: [
        "The website is not intended for children to make purchases independently. We do not knowingly collect personal information from children without appropriate authority.",
      ],
    },
    {
      title: "2.12 Changes",
      paragraphs: [
        "We may update this policy to reflect changes in law, technology or our services. The latest version will appear on the website with an updated date.",
      ],
    },
  ],
};

export const cookiePolicy: LegalDocument = {
  title: "Cookie Policy",
  description:
    "How Dotch Flavour uses cookies and similar technologies, and how you can manage consent.",
  lastUpdated: "24 July 2026",
  intro:
    "This policy should be implemented alongside a consent-management banner that blocks non-essential cookies until consent is given.",
  sections: [
    {
      title: "3.1 What cookies are",
      paragraphs: [
        "Cookies and similar technologies are small files or identifiers stored on or accessed from a device. They help websites function, remember preferences, measure use and support advertising.",
      ],
    },
    {
      title: "3.2 Categories we may use",
      paragraphs: [],
      bullets: [
        "Strictly necessary cookies: required for security, baskets, checkout, account login, consent settings and core website operation. These generally do not require consent.",
        "Functional cookies: remember choices such as region, account preferences or display settings.",
        "Analytics cookies: help us understand visits, pages, conversions and technical performance.",
        "Marketing cookies: may measure campaigns, build audiences or personalise advertising on third-party platforms.",
      ],
    },
    {
      title: "3.3 Third-party cookies",
      paragraphs: [
        "Third parties such as payment providers, analytics services, embedded social-media tools, video platforms and advertising partners may set cookies. The final cookie table should be generated from the live website and name each cookie, provider, purpose and duration.",
      ],
    },
    {
      title: "3.4 Consent",
      paragraphs: [
        "When you first visit, the cookie banner should allow you to accept or reject non-essential cookies and manage categories. Rejecting non-essential cookies must be as easy as accepting them. Strictly necessary cookies remain active because the service cannot operate properly without them.",
      ],
    },
    {
      title: "3.5 Changing preferences",
      paragraphs: [
        'You can change your choices through the "Cookie Settings" link in the website footer and through browser settings. Blocking some cookies may affect functionality.',
      ],
    },
    {
      title: "3.6 Example cookie register to complete before launch",
      paragraphs: [
        "The following register is a template and must be completed from the live website before launch.",
      ],
      table: {
        headers: ["Cookie/provider", "Category", "Purpose", "Duration", "Consent required?"],
        rows: [
          [
            "[INSERT checkout/session cookie]",
            "Necessary",
            "Basket, checkout or security",
            "[INSERT]",
            "No",
          ],
          ["[INSERT analytics provider]", "Analytics", "Measure website use", "[INSERT]", "Yes"],
          [
            "[INSERT Meta/TikTok pixel if used]",
            "Marketing",
            "Campaign measurement and audiences",
            "[INSERT]",
            "Yes",
          ],
          [
            "[INSERT preference cookie]",
            "Functional",
            "Remember preferences",
            "[INSERT]",
            "Usually yes",
          ],
        ],
      },
    },
  ],
};

export const deliveryTerms: LegalDocument = {
  title: "Delivery Policy",
  description:
    "Delivery terms for Ready Soups, fresh food and eligible merchandise ordered through the Dotch Flavour website.",
  lastUpdated: "24 July 2026",
  intro:
    "Applies to Ready Soups, fresh food and eligible merchandise ordered through the website. Event catering may have separate delivery arrangements in the quotation.",
  sections: [
    {
      title: "4.1 Delivery area",
      paragraphs: [
        "We offer delivery to eligible addresses within the United Kingdom. Certain remote, island or restricted postcodes may require a different service, additional charge or may not be available for temperature-controlled products. Eligibility is confirmed at checkout or by us before acceptance.",
      ],
    },
    {
      title: "4.2 Courier and timing",
      paragraphs: [
        'Ready Soups are dispatched frozen using a next-day courier service. We currently plan to use a DHL business service, but may use another suitable courier. "Next-day delivery" means the next eligible delivery day after dispatch, not necessarily the day after the order is placed. Processing time, cut-off times, weekends and public holidays apply.',
      ],
    },
    {
      title: "4.3 Flat-rate charge",
      paragraphs: [
        "A flat-rate delivery charge is added at checkout. The working charge is £9.99 per eligible parcel, but the live checkout price applies and may be updated when the courier account and packaging weights are finalised. Delivery is not free.",
      ],
    },
    {
      title: "4.4 Weight and parcel limits",
      paragraphs: [
        "The flat rate applies only within the courier's applicable parcel limits, currently expected to be up to 25 kg. Ready Soup bundles are structured as 3, 5, 10 and 18 tubs, subject to final packed-weight testing. We may split, adjust or contact you about an order that exceeds the safe or contractual parcel limit.",
      ],
    },
    {
      title: "4.5 Packaging",
      paragraphs: [
        'Frozen orders may be packed in strong outer boxes with insulated material, protective wrapping, ice packs, sealing tape and "Keep Frozen" or handling labels. The packaging method may vary according to order size, season, destination and courier requirements.',
      ],
    },
    {
      title: "4.6 Dispatch notification",
      paragraphs: [
        "We will send confirmation when an order is processed or dispatched, where contact details permit. Tracking availability depends on the courier service. Customers are responsible for monitoring tracking and ensuring someone can receive the parcel.",
      ],
    },
    {
      title: "4.7 Delivery address",
      paragraphs: [
        "Check the address, postcode, telephone number and access instructions carefully. We are not responsible for delay, loss or deterioration caused by incorrect or incomplete information supplied by the customer.",
      ],
    },
    {
      title: "4.8 Missed or failed delivery",
      paragraphs: [
        "Because frozen food is time and temperature sensitive, customers should arrange receipt at the first delivery attempt. If delivery fails because no one is available, access is restricted or instructions are inadequate, the courier may follow its own redelivery or collection process. Additional courier or replacement costs may be charged where legally permitted and reasonably incurred.",
      ],
    },
    {
      title: "4.9 On receipt",
      paragraphs: ["When your parcel arrives:"],
      bullets: [
        "Open the parcel promptly.",
        "Check that the products remain frozen or safely chilled.",
        "Place Ready Soups in a freezer immediately unless they will be safely thawed and used in accordance with the instructions.",
        "Do not refreeze a product that has fully thawed.",
        "Report damage, leakage, missing items or temperature concerns promptly and preferably within two hours of delivery, with photographs.",
      ],
    },
    {
      title: "4.10 Delays",
      paragraphs: [
        "Courier delivery times are estimates. If a delay occurs, contact us. Do not consume food that appears unsafe, has been warm for an extended period, has damaged packaging or has an unusual smell. We will assess the circumstances and your statutory rights.",
      ],
    },
    {
      title: "4.11 Fresh food and local orders",
      paragraphs: [
        "Fresh food may have specific delivery dates, cut-offs and local arrangements shown on the menu or confirmed directly. Current weekly promotion may ask customers to order by Wednesday for Saturday delivery. Bespoke arrangements remain subject to written confirmation.",
      ],
    },
  ],
};

export const refundReturnsPolicy: LegalDocument = {
  title: "Refund, Returns and Cancellation Policy",
  description:
    "How Dotch Flavour handles cancellations, refunds and issues with perishable and made-to-order products.",
  lastUpdated: "24 July 2026",
  intro:
    "This policy balances food safety, customer rights and the non-recoverable costs associated with perishable and made-to-order products.",
  sections: [
    {
      title: "5.1 Your statutory rights",
      paragraphs: [
        "Nothing in this policy limits rights under consumer law. Goods must be as described, of satisfactory quality and fit for purpose. Contact us if an order is faulty, unsafe, damaged, incomplete or incorrect.",
      ],
    },
    {
      title: "5.2 Change of mind for food",
      paragraphs: [
        "The usual 14-day online cancellation right does not generally apply to goods that are liable to deteriorate or expire rapidly, or to goods made or prepared to a customer's specification. For hygiene and food-safety reasons, we cannot accept returns of food merely because you change your mind.",
      ],
    },
    {
      title: "5.3 Ready Soups and fresh food cancellations",
      paragraphs: [
        `You may request cancellation before the order enters preparation, packing or dispatch. If we can stop the order without incurring costs, we will refund it. Once production, packing or dispatch has begun, cancellation may not be possible. Contact ${legalEmail} immediately; sending a message does not guarantee cancellation.`,
      ],
    },
    {
      title: "5.4 Damaged, missing, incorrect or temperature-affected orders",
      paragraphs: [
        "Notify us as soon as reasonably possible and preferably within two hours of delivery. Provide the order number, description of the issue, photographs of the product, packaging and courier label, and information about when the parcel was received and opened. Keep the product and packaging until we advise whether they are needed for investigation.",
        "After review, we may offer a replacement, partial refund, full refund or another appropriate remedy. Do not consume a product you believe is unsafe.",
      ],
    },
    {
      title: "5.5 Delivery fees",
      paragraphs: [
        "Where the entire order is rejected because of our breach or a confirmed delivery failure attributable to us or our courier, the appropriate delivery charge will be refunded. Delivery fees are not normally refunded where delivery was successfully completed or the issue was caused by incorrect customer information or missed receipt.",
      ],
    },
    {
      title: "5.6 Merchandise returns",
      paragraphs: [
        "For non-perishable merchandise purchased online, statutory cancellation rights may apply. Contact us within 14 days of receiving the item and return it within the further legal period, unused and in suitable condition, unless it is faulty. Personalised or hygiene-sensitive goods may be exempt. Customers normally pay return postage for change-of-mind returns where clearly stated before purchase.",
      ],
    },
    {
      title: "5.7 Catering cancellations",
      paragraphs: [
        "Catering cancellations are governed by the Catering Booking Policy. Any amount retained must be fair and reflect reasonable non-recoverable costs and losses arising from the cancellation.",
      ],
    },
    {
      title: "5.8 Refund timing",
      paragraphs: [
        "Approved refunds are issued to the original payment method. Processing times depend on Stripe, PayPal and the customer's bank. We aim to initiate approved refunds promptly and within any period required by law.",
      ],
    },
  ],
};

export const cateringBookingPolicy: LegalDocument = {
  title: "Catering Booking Policy",
  description:
    "Terms for Dotch Flavour fresh-food catering, event food and bespoke catering orders.",
  lastUpdated: "24 July 2026",
  intro:
    "Applies to fresh-food catering, event food and bespoke orders. The accepted quotation and event specification should be attached to or referenced in the booking confirmation.",
  sections: [
    {
      title: "6.1 Enquiries and quotations",
      paragraphs: [
        "Customers should use the \"Request a Quote\" form and provide the event date, location, guest count, service style, menu preferences, dietary requirements, budget and contact information. Quotations are valid for the period stated and remain subject to availability until payment is received and acceptance is confirmed.",
      ],
    },
    {
      title: "6.2 Minimum order and payment",
      paragraphs: [
        "The minimum catering order value is £200. Full payment is required to confirm the booking unless Dotch Flavour agrees otherwise in writing. A date is not secured by an enquiry, draft quotation or verbal discussion.",
      ],
    },
    {
      title: "6.3 Amendments",
      paragraphs: [
        "Customers may request changes up to 48 hours before the agreed event or delivery time. Changes are subject to ingredient availability, production capacity and any additional charge. Reductions requested within 48 hours may not result in a refund because costs may already have been committed.",
      ],
    },
    {
      title: "6.4 Recommended cancellation schedule",
      paragraphs: [
        "The following schedule is intended as a fair guide. Any deduction will be limited to a reasonable amount reflecting actual non-recoverable costs, work completed, commitments made and losses directly caused by cancellation:",
      ],
      bullets: [
        "More than 14 days before the event: refund of sums paid, less a 10% administration and planning charge, provided that this does not exceed reasonable losses.",
        "Between 7 and 14 days before the event: up to 50% of the booking value may be retained where reasonably required to cover costs and lost capacity.",
        "Less than 7 days before the event: no refund may be available where ingredients, staffing and production have been committed, subject always to fairness and statutory rights.",
      ],
    },
    {
      title: "Fairness and discretion",
      paragraphs: [
        "Where our actual recoverable loss is lower than the amount indicated, the lower reasonable amount should be retained. Where exceptional circumstances arise, management may offer a transfer, credit or different arrangement at its discretion, without creating an obligation in other cases.",
      ],
    },
    {
      title: "6.5 Cancellation by Dotch Flavour",
      paragraphs: [
        "If we cancel and cannot provide a reasonable alternative, we will refund amounts paid for services not supplied. We are not responsible for indirect costs unless required by law. Where an event outside our reasonable control affects delivery, we will discuss reasonable alternatives, rescheduling or refunds based on costs already incurred.",
      ],
    },
    {
      title: "6.6 Guest numbers and final details",
      paragraphs: [
        "Final guest numbers, venue details, access, timing, dietary information and service requirements must be supplied by the deadline in the quotation. We may be unable to accommodate late increases. The customer is responsible for securing venue permissions, kitchen access, parking and any licences not expressly included in our scope.",
      ],
    },
    {
      title: "6.7 Allergies and dietary requirements",
      paragraphs: [
        "Allergy and dietary information must be provided in writing as early as possible and no later than the final-details deadline. We will confirm what can reasonably be accommodated. Our kitchen handles multiple allergens, and we cannot promise an allergen-free environment.",
      ],
    },
    {
      title: "6.8 Delivery, setup and waiting time",
      paragraphs: [
        "Delivery, setup, service staff, equipment hire, collection and waiting time must be stated in the quotation. Additional charges may apply for access delays, parking, congestion, extended service, last-minute venue changes or requirements outside the agreed scope.",
      ],
    },
    {
      title: "6.9 Leftover food",
      paragraphs: [
        "Where food is left with the customer, responsibility for safe temperature control, storage, reheating and disposal passes to the customer once handed over. We may decline to leave food where doing so would present a safety risk.",
      ],
    },
    {
      title: "6.10 Request a Quote form fields",
      paragraphs: ["Please include:"],
      bullets: [
        "Full name and organisation, if applicable.",
        "Email address and telephone number.",
        "Event type, date, start time and location.",
        "Estimated guest numbers.",
        "Preferred menu and service style.",
        "Dietary and allergen requirements.",
        "Budget range.",
        "Delivery, collection, staffing or setup needs.",
        "Additional information and optional inspiration/reference upload.",
      ],
    },
    {
      title: "Confirmation message",
      paragraphs: [
        "Suggested confirmation message: \"Thank you for contacting Dotch Flavour. We have received your enquiry and aim to respond within one business day.\"",
      ],
    },
  ],
};

export const allergensFoodSafety: LegalDocument = {
  title: "Allergens and Food Safety Policy",
  description:
    "Allergen and food-safety information for Dotch Flavour products. Product-specific declarations remain authoritative.",
  lastUpdated: "24 July 2026",
  intro:
    "Allergen information must be accurate for each product and be available before purchase and again when food is delivered. This policy does not replace product-specific allergen declarations.",
  sections: [
    {
      title: "7.1 Our kitchen",
      paragraphs: [
        "All Dotch Flavour products are prepared in the same kitchen, which handles multiple allergens. Although we use procedures intended to manage cross-contact, we cannot guarantee that any product is completely free from traces of an allergen.",
      ],
    },
    {
      title: "7.2 Regulated allergens",
      paragraphs: [
        "UK law recognises 14 regulated allergens: celery, cereals containing gluten, crustaceans, eggs, fish, lupin, milk, molluscs, mustard, nuts, peanuts, sesame, soya and sulphur dioxide/sulphites above the relevant level.",
      ],
    },
    {
      title: "7.3 Product-specific information",
      paragraphs: [
        "The five Ready Soups have individual ingredient and allergen declarations. Customers must review the live product page and final packaging. Current recipes may include fish, crustaceans and soya, with possible traces of nuts, gluten and milk, but this summary is not a substitute for the exact declaration on each product.",
      ],
    },
    {
      title: "7.4 Distance selling",
      paragraphs: [
        "When food is sold online or by telephone, allergen information should be made available before purchase is completed and again at delivery. The website team must therefore include clear allergen information on each product page and the packaging team must ensure the final label remains readable and accurate.",
      ],
    },
    {
      title: "7.5 Customer responsibilities",
      paragraphs: [],
      bullets: [
        "Tell us about allergies and intolerances before ordering catering or bespoke food.",
        "Read the ingredients and allergen statement each time you purchase.",
        "Do not rely on photographs, product names or previous recipes.",
        "Contact us before purchase if anything is unclear.",
        "Do not consume food where packaging is missing, damaged or the allergen information is unclear.",
      ],
    },
    {
      title: "7.6 Free-from, vegan and halal claims",
      paragraphs: [
        'We will not make a "free-from", vegan, gluten-free, nut-free or halal claim unless the recipe, sourcing, production controls and evidence support it. No halal claim should be added to the website unless separately confirmed and approved by the company.',
      ],
    },
    {
      title: "7.7 Food business registration and hygiene rating",
      paragraphs: [
        "The food hygiene inspection/rating is pending. The website must not display a rating until formally issued. Company and food-business registration information should be verified and inserted where required before launch.",
      ],
    },
    {
      title: "7.8 Reporting a reaction or safety concern",
      paragraphs: [
        `Stop eating the product and seek medical help where needed. In an emergency call 999. Contact us at ${legalEmail} with the order number, product, batch/use-by information and details of the concern. Keep the packaging and remaining product safely stored for investigation if advised.`,
      ],
    },
  ],
};

export const storageHeatingGuide: LegalDocument = {
  title: "Storage and Heating Guide",
  description: "How to store and reheat Dotch Flavour Ready Soups and fresh food safely.",
  lastUpdated: "24 July 2026",
  intro:
    "Product packaging takes priority over this general guide. Follow any different instructions shown on the label.",
  sections: [
    {
      title: "8.1 Frozen Ready Soups",
      paragraphs: [],
      bullets: [
        "Place in the freezer promptly after delivery.",
        "Keep frozen at -18°C or below where stated on the packaging.",
        "Do not refreeze after the product has fully thawed.",
        "Once thawed, keep refrigerated and consume within 2 to 3 days, unless the label states a shorter period.",
        "Check the lid and container before use. Do not use if damaged, leaking, swollen or otherwise unsafe.",
      ],
    },
    {
      title: "8.2 Defrosting",
      paragraphs: [
        "Defrost in the refrigerator overnight or use a microwave defrost setting suitable for the container and product. Never leave frozen food at room temperature for longer than necessary.",
      ],
    },
    {
      title: "8.3 Saucepan heating",
      paragraphs: [],
      bullets: [
        "Transfer the soup to a suitable saucepan.",
        "Heat over medium heat for approximately 8 to 10 minutes, stirring occasionally.",
        "Ensure the food is piping hot throughout before serving.",
        "Allow it to stand briefly and take care to avoid burns.",
      ],
    },
    {
      title: "8.4 Microwave heating",
      paragraphs: [],
      bullets: [
        "Transfer to a microwave-safe container unless the packaging expressly states it is microwave safe.",
        "Loosely cover and heat in intervals, stirring between intervals.",
        "Heating times vary by microwave power and quantity.",
        "Ensure the food is piping hot throughout before serving.",
      ],
    },
    {
      title: "8.5 Fresh food",
      paragraphs: [
        "Refrigerate fresh food promptly where it is not eaten immediately. Follow any use-by, refrigeration and reheating instructions supplied with the order. Reheat only once unless specific guidance says otherwise.",
      ],
    },
    {
      title: "8.6 Safe serving",
      paragraphs: [
        "Use clean utensils and avoid cross-contamination. Take extra care when serving children, older people, pregnant people or anyone with a weakened immune system. If in doubt about safety, do not consume the product.",
      ],
    },
  ],
};

export const websiteProductDisclaimer: LegalDocument = {
  title: "Website and Product Disclaimer",
  description:
    "Disclaimer for Dotch Flavour website information, images, menus and third-party services.",
  lastUpdated: "24 July 2026",
  intro:
    "This disclaimer supplements, but does not override, consumer rights or the other policies in this pack.",
  sections: [
    {
      title: "9.1 Website information",
      paragraphs: [
        "We aim to keep website information accurate and available, but we do not guarantee that every page will be error-free or continuously accessible. We may correct errors, update content, suspend features or change the website without notice.",
      ],
    },
    {
      title: "9.2 Images and presentation",
      paragraphs: [
        "Food and lifestyle images are illustrative. Actual food may differ in colour, texture, garnish, ingredient distribution and presentation. Packaging may be updated as the brand develops.",
      ],
    },
    {
      title: "9.3 Menus, recipes and availability",
      paragraphs: [
        "Menus, ingredients, portion guidance, prices and availability may change. Seasonal supply and recipe development may require substitutions. Material changes affecting allergens should be updated before sale and reflected on packaging.",
      ],
    },
    {
      title: "9.4 Nutrition and health",
      paragraphs: [
        "Unless expressly stated, website content is not medical, nutritional or dietary advice. Customers with health conditions, allergies or specific dietary needs should seek appropriate professional advice and contact us before ordering.",
      ],
    },
    {
      title: "9.5 Third-party links and services",
      paragraphs: [
        "Links to couriers, payment providers, social media, ticket platforms or other websites are provided for convenience. We do not control their content, availability or privacy practices.",
      ],
    },
    {
      title: "9.6 Testimonials and reviews",
      paragraphs: [
        "Testimonials reflect individual experiences and do not guarantee that every customer will have the same result. We may edit testimonials for length or clarity without changing their meaning and will obtain permission where required.",
      ],
    },
    {
      title: "9.7 No exclusion of legal rights",
      paragraphs: [
        "Nothing in this disclaimer excludes responsibility or consumer rights that cannot lawfully be excluded.",
      ],
    },
  ],
};

export const accessibilityStatement: LegalDocument = {
  title: "Accessibility Statement",
  description:
    "How Dotch Flavour aims to make its website and services reasonably accessible.",
  lastUpdated: "24 July 2026",
  intro:
    "Dotch Flavour is committed to making its website and services reasonably accessible to as many people as possible.",
  sections: [
    {
      title: "10.1 Our aim",
      paragraphs: [
        "We aim for the website to follow recognised accessibility good practice, including clear headings, readable contrast, keyboard access, descriptive link text, form labels, alternative text for meaningful images and captions or transcripts where practical.",
      ],
    },
    {
      title: "10.2 Using the website",
      paragraphs: [
        "Users should be able to zoom text, navigate key pages by keyboard, use common screen-reader technology and understand forms and error messages. The developer should test checkout, registration and quote forms on mobile and desktop and address material barriers before launch.",
      ],
    },
    {
      title: "10.3 Known limitations",
      paragraphs: [
        "Some third-party payment, social-media, map, ticketing or embedded content may not be fully controlled by us. Some historical or promotional images may not initially have complete alternative text. We will work to improve issues brought to our attention.",
      ],
    },
    {
      title: "10.4 Requesting assistance",
      paragraphs: [
        `If you cannot access information or complete an order because of a disability or access need, email ${legalEmail} or contact us by telephone/WhatsApp at [INSERT]. We will consider a reasonable alternative, such as taking an order or providing information in another accessible format.`,
      ],
    },
    {
      title: "10.5 Reporting a problem",
      paragraphs: [
        "Tell us the page, task, device and assistive technology involved. We aim to acknowledge accessibility enquiries within two business days and provide a substantive response as soon as reasonably practical.",
      ],
    },
    {
      title: "10.6 Review",
      paragraphs: [
        "This statement should be reviewed after the website is built and accessibility testing is completed. Insert the date of the last test, testing method and known issues before publication.",
      ],
    },
  ],
};

export const emailNewsletterTerms: LegalDocument = {
  title: "Email and Newsletter Terms",
  description:
    "Terms for Dotch Flavour marketing emails, launch updates, menu reminders, offers and event communications.",
  lastUpdated: "24 July 2026",
  intro:
    "Applies to marketing emails, launch updates, menu reminders, offers and event communications.",
  sections: [
    {
      title: "11.1 Signing up",
      paragraphs: [
        "You may subscribe through the website, checkout, event registration or another clear opt-in. We will tell you what type of communication to expect. Where required, marketing consent will be separate from acceptance of terms or completion of an order.",
      ],
    },
    {
      title: "11.2 What we may send",
      paragraphs: [],
      bullets: [
        "Fresh food menu and weekly-order reminders.",
        "Ready Soups launches, availability and bundle offers.",
        "Dotch Flavour Experience invitations and event updates.",
        "Seasonal campaigns, including Christmas, Easter, Father's Day and other relevant occasions.",
        "Founder stories, behind-the-scenes content, testimonials and recipes.",
        "Corporate, wholesale or stockist updates where relevant to the recipient.",
      ],
    },
    {
      title: "11.3 Frequency",
      paragraphs: [
        "Frequency may vary around launches and seasonal campaigns. We will aim not to send excessive or irrelevant messages.",
      ],
    },
    {
      title: "11.4 Existing customers",
      paragraphs: [
        "Where permitted by electronic-marketing law, we may send relevant offers to existing customers who purchased or negotiated for similar products and were given a clear opportunity to opt out. Other marketing will be sent with consent or another lawful basis.",
      ],
    },
    {
      title: "11.5 Unsubscribing",
      paragraphs: [
        `Use the unsubscribe link in any marketing email or contact ${legalEmail}. Unsubscribing from marketing does not prevent necessary service messages about orders, deliveries, accounts, bookings or safety.`,
      ],
    },
    {
      title: "11.6 Imported customer lists",
      paragraphs: [
        "Existing email addresses must not be added automatically without checking how they were obtained, what customers were told and whether marketing is permitted. The source, date and consent or customer relationship should be documented before import.",
      ],
    },
    {
      title: "11.7 Email content and offers",
      paragraphs: [
        "Offers may be subject to availability, exclusions and expiry dates. Marketing content must not be misleading, and promotional conditions should be stated clearly.",
      ],
    },
  ],
};
