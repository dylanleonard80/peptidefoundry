import { getStartingPrice, getPrices } from "./priceData";
import { getProductImageBySlug } from "./peptidePageData";

export interface PeptideCard {
  name: string;
  benefit: string;
  tags: string[];
  slug: string;
  composition?: string;
  useCases?: string[];
  sizes?: string[];
  startingPrice?: number;
  prices?: Record<string, number>;
  image?: string;
  cardStyle?: 'default' | 'glass';
}

export interface PeptideSection {
  title: string;
  subtitle: string;
  cards: PeptideCard[];
  link?: string;
}

// Helper to create a card with auto-populated prices and images from centralized data
function createCard(
  name: string,
  benefit: string,
  tags: string[],
  slug: string,
  useCases: string[],
  sizes: string[],
  composition?: string
): PeptideCard {
  const prices = getPrices(slug);
  const productImage = getProductImageBySlug(slug);
  return {
    name,
    benefit,
    tags,
    slug,
    composition,
    useCases,
    sizes,
    startingPrice: getStartingPrice(slug),
    ...(prices && Object.keys(prices).length > 1 ? { prices } : {}),
    ...(productImage ? { image: productImage } : {}),
    cardStyle: 'glass',
  };
}

export const peptideSections: PeptideSection[] = [
  {
    title: "Best Sellers",
    subtitle: "Our most popular research peptides",
    cards: [
      {
        ...createCard(
          "BPC-157",
          "Studied for tissue repair and GI pathway modulation",
          ["Research"],
          "bpc-157",
          ["Tissue Research", "GI Studies"],
          ["10mg"]
        ),
        cardStyle: 'glass' as const,
      },
      createCard(
        "CJC-1295 + Ipamorelin",
        "Researched for GH secretagogue activity",
        ["Research", "Blend"],
        "cjc-1295-ipamorelin",
        ["GH Research", "Metabolic Studies"],
        ["5mg/5mg"]
      ),
      createCard(
        "Melanotan 2",
        "Studied for melanocortin receptor activity",
        ["Research"],
        "melanotan-2",
        ["MC Receptor", "Pigmentation"],
        ["10mg"]
      ),
      createCard(
        "BPC-157 + TB-500",
        "Combined peptides for tissue regeneration studies",
        ["Research", "Blend"],
        "bpc-157-tb-500",
        ["Tissue Research", "Regeneration"],
        ["10mg/10mg"]
      ),
      createCard(
        "GLOW",
        "Multi-peptide blend for dermal research applications",
        ["Research", "Blend"],
        "glow",
        ["Dermal Studies", "Cellular Research"],
        ["50mg/10mg/10mg"],
        "GHK-Cu + BPC-157 + TB-500"
      ),
      createCard(
        "KLOW",
        "Research blend for GI and immune pathway studies",
        ["Research", "Blend"],
        "klow",
        ["GI Research", "Immune Studies"],
        ["50mg/10mg/10mg/10mg"],
        "GHK-Cu + BPC-157 + TB-500 + KPV"
      ),
      createCard(
        "GHK-CU",
        "Copper peptide studied for tissue remodeling",
        ["Research"],
        "ghk-cu",
        ["Tissue Studies", "Copper Peptide"],
        ["100mg"]
      ),
      createCard(
        "GLP-3RT",
        "Triple agonist researched for metabolic pathways",
        ["Research"],
        "retatrutide",
        ["Metabolic Research", "GLP Studies"],
        ["12mg", "24mg"]
      ),
      createCard(
        "NAD+ (Buffered)",
        "Coenzyme studied for cellular energy metabolism",
        ["Research"],
        "nad-buffered",
        ["Cellular Research", "NAD+ Studies"],
        ["500mg"]
      ),
    ],
  },
  {
    title: "Tissue Repair Research",
    subtitle: "Peptides studied for tissue regeneration and inflammatory pathway modulation.",
    link: "/recovery",
    cards: [
      {
        ...createCard(
          "BPC-157",
          "Studied for tissue repair and GI pathway modulation",
          ["Research"],
          "bpc-157",
          ["Tissue Research", "GI Studies"],
          ["10mg"]
        ),
        cardStyle: 'glass' as const,
      },
      createCard(
        "TB-500",
        "Thymosin beta-4 fragment for regeneration research",
        ["Research"],
        "tb-500",
        ["Regeneration", "Actin Studies"],
        ["10mg"]
      ),
      createCard(
        "BPC-157 + TB-500",
        "Combined peptides for tissue regeneration studies",
        ["Research", "Blend"],
        "bpc-157-tb-500",
        ["Tissue Research", "Regeneration"],
        ["10mg/10mg"]
      ),
      createCard(
        "GLOW",
        "Multi-peptide blend for dermal research applications",
        ["Research", "Blend"],
        "glow",
        ["Dermal Studies", "Cellular Research"],
        ["50mg/10mg/10mg"],
        "GHK-Cu + BPC-157 + TB-500"
      ),
      createCard(
        "KLOW",
        "Research blend for GI and immune pathway studies",
        ["Research", "Blend"],
        "klow",
        ["GI Research", "Immune Studies"],
        ["50mg/10mg/10mg/10mg"],
        "GHK-Cu + BPC-157 + TB-500 + KPV"
      ),
    ],
  },
  {
    title: "Muscle & Performance Research",
    subtitle: "Peptides studied for growth factor signaling and myogenic pathways.",
    link: "/build-muscle",
    cards: [
      createCard(
        "CJC-1295 + Ipamorelin",
        "Researched for GH secretagogue activity",
        ["Research", "Blend"],
        "cjc-1295-ipamorelin",
        ["GH Research", "GHRH Studies"],
        ["5mg/5mg"]
      ),
      createCard(
        "Ipamorelin",
        "Ghrelin mimetic studied for GH release pathways",
        ["Research"],
        "ipamorelin",
        ["GHRP Research", "GH Studies"],
        ["10mg"]
      ),
      createCard(
        "IGF-1 LR3",
        "Extended half-life IGF-1 for growth factor research",
        ["Research"],
        "igf-1-lr3",
        ["IGF Research", "Growth Factors"],
        ["1mg"]
      ),
      createCard(
        "Tesamorelin",
        "GHRH analog studied for somatotropin release",
        ["Research"],
        "tesamorelin",
        ["GHRH Research", "Metabolic Studies"],
        ["10mg"]
      ),
      createCard(
        "Sermorelin",
        "GHRH fragment for growth hormone research",
        ["Research"],
        "sermorelin",
        ["GHRH Research", "GH Studies"],
        ["5mg"]
      ),
      createCard(
        "Tesamorelin / Ipamorelin",
        "Dual peptide blend for GH pathway research",
        ["Research", "Blend"],
        "tesamorelin-ipamorelin",
        ["GH Research", "Metabolic Studies"],
        ["12mg/2mg"]
      ),
    ],
  },
  {
    title: "Metabolic Research",
    subtitle: "Peptides investigated for metabolic signaling and energy homeostasis.",
    link: "/lose-fat",
    cards: [
      createCard(
        "AOD-9604",
        "HGH fragment studied for lipolytic activity",
        ["Research"],
        "aod-9604",
        ["Lipolysis Research", "HGH Fragment"],
        ["5mg"]
      ),
      createCard(
        "Cagrilintide",
        "Amylin analog for appetite pathway research",
        ["Research"],
        "cagrilintide",
        ["Amylin Research", "Satiety Studies"],
        ["10mg"]
      ),
      createCard(
        "GLP-3RT",
        "Triple agonist researched for metabolic pathways",
        ["Research"],
        "retatrutide",
        ["GLP Research", "Metabolic Studies"],
        ["12mg", "24mg"]
      ),
      createCard(
        "GLP-1SG",
        "GLP-1 agonist for incretin pathway research",
        ["Research"],
        "glp-1sg",
        ["GLP-1 Research", "Incretin Studies"],
        ["10mg"]
      ),
      createCard(
        "GLP-1 2TZ",
        "Dual GIP/GLP-1 agonist for receptor research",
        ["Research"],
        "glp-1tz",
        ["Dual Agonist", "Incretin Research"],
        ["10mg", "15mg", "20mg"]
      ),
      createCard(
        "MOTS-C",
        "Mitochondrial peptide for metabolic research",
        ["Research"],
        "mots-c",
        ["Mitochondrial", "Metabolic Studies"],
        ["10mg"]
      ),
    ],
  },
  {
    title: "Cellular Health Research",
    subtitle: "Peptides studied for cellular senescence and neuroprotective mechanisms.",
    link: "/anti-aging",
    cards: [
      createCard(
        "DSIP",
        "Studied for sleep regulation and circadian pathways",
        ["Research"],
        "dsip",
        ["Sleep Research", "Circadian Studies"],
        ["5mg"]
      ),
      createCard(
        "Epithalon",
        "Researched for telomerase activation pathways",
        ["Research"],
        "epithalon",
        ["Telomere Research", "Cellular Studies"],
        ["10mg"]
      ),
      createCard(
        "GHK-CU",
        "Copper peptide studied for tissue remodeling",
        ["Research"],
        "ghk-cu",
        ["Tissue Studies", "Copper Peptide"],
        ["100mg"]
      ),
      createCard(
        "Selank",
        "Studied for anxiolytic and neuroprotective mechanisms",
        ["Research"],
        "selank",
        ["Anxiolytic Research", "Neuroprotection"],
        ["10mg"]
      ),
      createCard(
        "Semax",
        "Researched for cognitive and neurotrophic pathways",
        ["Research"],
        "semax",
        ["Cognitive Research", "BDNF Studies"],
        ["10mg"]
      ),
      createCard(
        "NAD+ (Buffered)",
        "Coenzyme studied for cellular energy metabolism",
        ["Research"],
        "nad-buffered",
        ["Cellular Research", "NAD+ Studies"],
        ["500mg"]
      ),
      createCard(
        "Glutathione",
        "Studied for antioxidant and redox signaling pathways",
        ["Research"],
        "glutathione",
        ["Antioxidant Research", "Redox Studies"],
        ["1500mg"]
      ),
    ],
  },
  {
    title: "Cognition & Mood Research",
    subtitle: "Peptides investigated for cognitive function and mood regulation pathways.",
    link: "/libido",
    cards: [
      createCard(
        "PT-141",
        "Studied for melanocortin receptor-mediated pathways",
        ["Research"],
        "pt-141",
        ["MC Receptor Research", "Behavioral Studies"],
        ["10mg"]
      ),
      createCard(
        "Melanotan 2",
        "Studied for melanocortin receptor activity",
        ["Research"],
        "melanotan-2",
        ["MC Receptor", "Pigmentation Research"],
        ["10mg"]
      ),
    ],
  },
  {
    title: "Research Supplies",
    subtitle: "Essential supplies for peptide research.",
    cards: [
      {
        ...createCard(
          "Bacteriostatic Water",
          "Sterile water with 0.9% benzyl alcohol",
          ["Supply"],
          "bacteriostatic-water",
          ["Reconstitution", "Storage"],
          ["30ml"]
        ),
        image: "/lovable-uploads/bacteriostatic-water.webp",
      },
    ],
  },
];

// Helper functions to get category-specific peptides
export const getHealingPeptides = () => peptideSections.find((s) => s.title === "Tissue Repair Research")?.cards || [];

export const getMusclePeptides = () => peptideSections.find((s) => s.title === "Muscle & Performance Research")?.cards || [];

export const getFatLossPeptides = () => peptideSections.find((s) => s.title === "Metabolic Research")?.cards || [];

export const getAntiAgingPeptides = () => peptideSections.find((s) => s.title === "Cellular Health Research")?.cards || [];

export const getLibidoPeptides = () => peptideSections.find((s) => s.title === "Cognition & Mood Research")?.cards || [];

// Helper function to get peptide slug from name
export const getPeptideSlug = (peptideName: string): string => {
  for (const section of peptideSections) {
    const peptide = section.cards.find((card) => card.name === peptideName);
    if (peptide) return peptide.slug;
  }
  // Fallback: convert name to slug format
  return peptideName.toLowerCase().replace(/\s+/g, "-").replace(/[()]/g, "");
};

// Helper function to get all unique peptides across all sections
export const getAllUniquePeptides = (): PeptideCard[] => {
  const seen = new Set<string>();
  const uniquePeptides: PeptideCard[] = [];
  
  for (const section of peptideSections) {
    for (const card of section.cards) {
      if (!seen.has(card.slug)) {
        seen.add(card.slug);
        uniquePeptides.push(card);
      }
    }
  }
  
  return uniquePeptides;
};
