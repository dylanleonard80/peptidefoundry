export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
}

export type FAQCategory =
  | "all"
  | "ordering"
  | "shipping"
  | "products"
  | "safety"
  | "payment";

export interface FAQCategoryInfo {
  id: FAQCategory;
  label: string;
  description: string;
}

export const faqCategories: FAQCategoryInfo[] = [
  { id: "all", label: "All", description: "View all frequently asked questions" },
  { id: "ordering", label: "Ordering & Account", description: "Questions about placing orders and managing your account" },
  { id: "shipping", label: "Shipping & Delivery", description: "Information about shipping times and delivery" },
  { id: "products", label: "Products & Peptides", description: "Learn about our research peptides" },
  { id: "safety", label: "Medical & Safety", description: "Safety information and research guidelines" },
  { id: "payment", label: "Payment & Billing", description: "Payment methods and billing questions" },
];

export const faqItems: FAQItem[] = [
  // Ordering & Account
  {
    id: "order-1",
    question: "How do I place an order?",
    answer: "Browse our catalog of research peptides, select the products and quantities you need, and add them to your cart. When you're ready, proceed to checkout where you'll enter your shipping information and complete payment. You'll receive an order confirmation email with tracking information once your order ships.",
    category: "ordering",
  },
  {
    id: "order-2",
    question: "Do I need an account to order?",
    answer: "While you can browse our products without an account, creating an account allows you to track orders, save shipping addresses, view order history, and access member-only pricing through The Foundry Club. Account creation is quick and free.",
    category: "ordering",
  },
  {
    id: "order-3",
    question: "What is The Foundry Club membership?",
    answer: "The Foundry Club is our premium membership program that offers exclusive benefits including discounted pricing on all peptides, priority shipping, early access to new products, and a community of fellow researchers. Members typically save 15-20% on every order.",
    category: "ordering",
  },
  {
    id: "order-4",
    question: "Can I modify or cancel my order after placing it?",
    answer: "Orders can be modified or cancelled within 2 hours of placement by contacting our support team at support@peptidefoundry.com or 1-800-PEPTIDE. Once an order has been shipped, it cannot be cancelled, but you may initiate a return after receiving it.",
    category: "ordering",
  },
  {
    id: "order-5",
    question: "How do I track my order?",
    answer: "Once your order ships, you'll receive an email with tracking information. You can also log into your account and view your order status in the Orders section of your dashboard. Tracking updates typically appear within 24 hours of shipment.",
    category: "ordering",
  },

  // Shipping & Delivery
  {
    id: "ship-1",
    question: "How long does shipping take?",
    answer: "Standard shipping within the continental United States typically takes 3-5 business days. Expedited shipping options are available at checkout for 1-2 business day delivery. Orders placed before 2 PM EST on business days ship same day.",
    category: "shipping",
  },
  {
    id: "ship-2",
    question: "Do you ship internationally?",
    answer: "Currently, we only ship within the United States. We are working on expanding our shipping capabilities and hope to offer international shipping in the future. Sign up for our newsletter to be notified when international shipping becomes available.",
    category: "shipping",
  },
  {
    id: "ship-3",
    question: "How are peptides shipped to ensure stability?",
    answer: "All peptides are shipped in temperature-controlled packaging with cold packs during warmer months. Our peptides are lyophilized (freeze-dried), which provides excellent stability during transit. Each shipment includes handling instructions to ensure product integrity upon arrival.",
    category: "shipping",
  },
  {
    id: "ship-4",
    question: "What if my package is lost or damaged?",
    answer: "If your package is lost or arrives damaged, contact us immediately at support@peptidefoundry.com with your order number and photos of any damage. We will work with the carrier to resolve the issue and either reship your order or provide a full refund.",
    category: "shipping",
  },
  {
    id: "ship-5",
    question: "Is discreet packaging available?",
    answer: "Yes, all orders ship in plain, unmarked boxes with no external indication of contents. Your privacy is important to us, and we ensure that packaging is professional and discreet for all research supply shipments.",
    category: "shipping",
  },

  // Products & Peptides
  {
    id: "prod-1",
    question: "What are research peptides?",
    answer: "Peptides are short chains of amino acids that serve as building blocks for proteins. Research peptides are synthesized for laboratory use to study biological processes, cellular mechanisms, and potential therapeutic pathways. Our peptides are manufactured to high purity standards for reliable research results.",
    category: "products",
  },
  {
    id: "prod-2",
    question: "What purity level are your peptides?",
    answer: "All of our peptides are manufactured to a minimum purity of 98%, with most products exceeding 99% purity. Each product ships with a Certificate of Analysis (COA) from independent third-party testing that verifies the exact purity, identity, and composition.",
    category: "products",
  },
  {
    id: "prod-3",
    question: "How should I store my peptides?",
    answer: "Lyophilized (powder form) peptides should be stored in a freezer at -20°C for long-term storage or refrigerated at 2-8°C for short-term storage. Keep peptides away from light and moisture. Once reconstituted, peptides should be refrigerated and used within the timeframe specified in the product documentation.",
    category: "products",
  },
  {
    id: "prod-4",
    question: "What is a Certificate of Analysis (COA)?",
    answer: "A Certificate of Analysis is a document provided by an independent testing laboratory that verifies the identity, purity, and composition of each peptide batch. Our COAs include HPLC purity data, mass spectrometry confirmation, and amino acid sequence verification. COAs can be viewed on each product page.",
    category: "products",
  },
  {
    id: "prod-5",
    question: "What is bacteriostatic water and why do I need it?",
    answer: "Bacteriostatic water is sterile water containing 0.9% benzyl alcohol, which inhibits bacterial growth. It's used to reconstitute lyophilized peptides for research use. The preservative allows reconstituted peptides to remain stable for longer periods when properly refrigerated.",
    category: "products",
  },
  {
    id: "prod-6",
    question: "What's the difference between peptide blends and single peptides?",
    answer: "Single peptides contain one specific peptide compound, allowing researchers to study its effects in isolation. Peptide blends combine two or more peptides in a single vial, designed for research into synergistic effects. Both options have specific research applications depending on your study objectives.",
    category: "products",
  },

  // Medical & Safety
  {
    id: "safe-1",
    question: "Are your peptides for human consumption?",
    answer: "No. All peptides sold by Peptide Foundry are strictly for in-vitro research and laboratory use only. They are not intended for human or animal consumption, therapeutic use, or any diagnostic purposes. By purchasing, you confirm that products will be used in accordance with applicable laws and regulations.",
    category: "safety",
  },
  {
    id: "safe-2",
    question: "Who can purchase research peptides?",
    answer: "Our products are available to qualified researchers, academic institutions, and research facilities. By placing an order, you confirm that you are a qualified researcher or represent a research institution and that all products will be used for legitimate research purposes in compliance with applicable regulations.",
    category: "safety",
  },
  {
    id: "safe-3",
    question: "What safety precautions should researchers take?",
    answer: "Researchers should follow standard laboratory safety protocols including wearing appropriate PPE (gloves, lab coat, eye protection), working in a clean environment, proper handling of biological materials, and following institutional biosafety guidelines. Always refer to the product's Safety Data Sheet (SDS) for specific handling requirements.",
    category: "safety",
  },
  {
    id: "safe-4",
    question: "Are your peptides manufactured in the USA?",
    answer: "Yes, all of our peptides are manufactured in the United States by facilities that follow strict cGMP (current Good Manufacturing Practice) guidelines. This ensures consistent quality, purity, and reliability across all batches.",
    category: "safety",
  },
  {
    id: "safe-5",
    question: "How do you verify peptide quality?",
    answer: "Every peptide batch undergoes rigorous testing including High-Performance Liquid Chromatography (HPLC) for purity analysis, Mass Spectrometry for molecular weight confirmation, and amino acid analysis for sequence verification. Results are documented in each product's Certificate of Analysis.",
    category: "safety",
  },

  // Payment & Billing
  {
    id: "pay-1",
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and bank transfers for qualifying orders. All payment processing is secured with industry-standard encryption to protect your financial information.",
    category: "payment",
  },
  {
    id: "pay-2",
    question: "Is my payment information secure?",
    answer: "Yes, we use industry-standard SSL encryption and PCI-compliant payment processing to protect your financial information. We do not store complete credit card numbers on our servers. Your security is our priority.",
    category: "payment",
  },
  {
    id: "pay-3",
    question: "Do you offer purchase orders for institutions?",
    answer: "Yes, we accept purchase orders from qualified academic and research institutions. Contact our support team at support@peptidefoundry.com with your institutional information and PO requirements to set up an account for purchase order billing.",
    category: "payment",
  },
  {
    id: "pay-4",
    question: "What is your return policy?",
    answer: "Unopened products in original packaging may be returned within 30 days of delivery for a full refund, minus shipping costs. Due to the nature of research materials, opened or reconstituted products cannot be returned. Contact support@peptidefoundry.com to initiate a return.",
    category: "payment",
  },
  {
    id: "pay-5",
    question: "Will I receive a receipt or invoice?",
    answer: "Yes, you'll receive an email confirmation with a detailed invoice immediately after placing your order. Additional invoices or receipts can be downloaded from your account dashboard or requested by contacting our support team.",
    category: "payment",
  },
  {
    id: "pay-6",
    question: "Do you offer discounts for bulk orders?",
    answer: "Yes, we offer tiered pricing for larger research orders. The Foundry Club membership provides automatic discounts on all orders. For institutional or large-volume purchases, contact our support team to discuss custom pricing arrangements.",
    category: "payment",
  },
];

// Helper function to filter FAQs by category
export const getFAQsByCategory = (category: FAQCategory): FAQItem[] => {
  if (category === "all") {
    return faqItems;
  }
  return faqItems.filter((item) => item.category === category);
};

// Helper function to search FAQs
export const searchFAQs = (query: string, category: FAQCategory = "all"): FAQItem[] => {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) {
    return getFAQsByCategory(category);
  }

  const categoryItems = getFAQsByCategory(category);
  return categoryItems.filter(
    (item) =>
      item.question.toLowerCase().includes(normalizedQuery) ||
      item.answer.toLowerCase().includes(normalizedQuery)
  );
};

// Generate JSON-LD structured data for FAQ schema
export const generateFAQSchema = (items: FAQItem[]): object => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
};
