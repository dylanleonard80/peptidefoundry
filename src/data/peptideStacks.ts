/**
 * Curated peptide stack recommendations.
 * Each peptide maps to its commonly paired products for research stacks.
 */

export interface StackRecommendation {
  slug: string;
  label: string;
  priority: number;
}

export const peptideStacks: Record<string, StackRecommendation[]> = {
  // Recovery & Healing
  "bpc-157": [
    { slug: "tb-500", label: "Wolverine Stack (core pairing)", priority: 1 },
    { slug: "bpc-157-tb-500", label: "Pre-made blend", priority: 2 },
    { slug: "glow", label: "Skin & recovery support", priority: 3 },
  ],
  "tb-500": [
    { slug: "bpc-157", label: "Wolverine Stack (core pairing)", priority: 1 },
    { slug: "bpc-157-tb-500", label: "Pre-made blend", priority: 2 },
    { slug: "ghk-cu", label: "Tissue regeneration support", priority: 3 },
  ],
  "bpc-157-tb-500": [
    { slug: "ghk-cu", label: "Enhanced tissue repair", priority: 1 },
    { slug: "glow", label: "Skin rejuvenation stack", priority: 2 },
    { slug: "nad-buffered", label: "Cellular energy support", priority: 3 },
  ],
  "ghk-cu": [
    { slug: "bpc-157-tb-500", label: "Complete healing stack", priority: 1 },
    { slug: "glow", label: "Skin health blend", priority: 2 },
    { slug: "epithalon", label: "Longevity support", priority: 3 },
  ],
  "glow": [
    { slug: "ghk-cu", label: "Skin restoration stack", priority: 1 },
    { slug: "bpc-157-tb-500", label: "Recovery support", priority: 2 },
    { slug: "glutathione", label: "Antioxidant boost", priority: 3 },
  ],

  // Weight Loss & Metabolism
  "retatrutide": [
    { slug: "cagrilintide", label: "Advanced appetite stack", priority: 1 },
    { slug: "aod-9604", label: "Fat metabolism support", priority: 2 },
    { slug: "mots-c", label: "Metabolic optimization", priority: 3 },
  ],
  "cagrilintide": [
    { slug: "retatrutide", label: "GLP-3RT triple agonist combo", priority: 1 },
    { slug: "glp-1tz", label: "GLP-1 support", priority: 2 },
    { slug: "aod-9604", label: "Fat metabolism support", priority: 3 },
  ],
  "aod-9604": [
    { slug: "cjc-1295-ipamorelin", label: "GH secretagogue stack", priority: 1 },
    { slug: "tesamorelin", label: "Visceral fat research", priority: 2 },
    { slug: "mots-c", label: "Metabolic support", priority: 3 },
  ],
  "glp-1sg": [
    { slug: "cagrilintide", label: "Appetite control stack", priority: 1 },
    { slug: "mots-c", label: "Metabolic research", priority: 2 },
    { slug: "aod-9604", label: "Fat metabolism", priority: 3 },
  ],
  "glp-1tz": [
    { slug: "cagrilintide", label: "Appetite control stack", priority: 1 },
    { slug: "mots-c", label: "Metabolic research", priority: 2 },
    { slug: "aod-9604", label: "Fat metabolism", priority: 3 },
  ],

  // Growth Hormone & Performance
  "cjc-1295-ipamorelin": [
    { slug: "tesamorelin", label: "Enhanced GH release", priority: 1 },
    { slug: "igf-1-lr3", label: "Growth factor support", priority: 2 },
    { slug: "sermorelin", label: "GH secretagogue stack", priority: 3 },
  ],
  "tesamorelin": [
    { slug: "ipamorelin", label: "Synergistic GH release", priority: 1 },
    { slug: "tesamorelin-ipamorelin", label: "Pre-made blend", priority: 2 },
    { slug: "cjc-1295-ipamorelin", label: "GH secretagogue stack", priority: 3 },
  ],
  "tesamorelin-ipamorelin": [
    { slug: "igf-1-lr3", label: "Growth factor research", priority: 1 },
    { slug: "sermorelin", label: "Additional GH support", priority: 2 },
    { slug: "mots-c", label: "Metabolic optimization", priority: 3 },
  ],
  "ipamorelin": [
    { slug: "tesamorelin", label: "Synergistic GH release", priority: 1 },
    { slug: "cjc-1295-ipamorelin", label: "Pre-made blend", priority: 2 },
    { slug: "sermorelin", label: "GH secretagogue stack", priority: 3 },
  ],
  "sermorelin": [
    { slug: "ipamorelin", label: "GHRP pairing", priority: 1 },
    { slug: "cjc-1295-ipamorelin", label: "GH combo blend", priority: 2 },
    { slug: "igf-1-lr3", label: "Growth factor support", priority: 3 },
  ],
  "igf-1-lr3": [
    { slug: "cjc-1295-ipamorelin", label: "GH secretagogue stack", priority: 1 },
    { slug: "bpc-157-tb-500", label: "Recovery support", priority: 2 },
    { slug: "mots-c", label: "Metabolic synergy", priority: 3 },
  ],

  // Longevity & Brain Health
  "epithalon": [
    { slug: "nad-buffered", label: "Cellular longevity stack", priority: 1 },
    { slug: "mots-c", label: "Mitochondrial support", priority: 2 },
    { slug: "semax", label: "Neuroprotection", priority: 3 },
  ],
  "mots-c": [
    { slug: "epithalon", label: "Longevity research", priority: 1 },
    { slug: "nad-buffered", label: "Cellular energy stack", priority: 2 },
    { slug: "aod-9604", label: "Metabolic support", priority: 3 },
  ],
  "nad-buffered": [
    { slug: "epithalon", label: "Anti-aging stack", priority: 1 },
    { slug: "mots-c", label: "Mitochondrial support", priority: 2 },
    { slug: "glutathione", label: "Antioxidant synergy", priority: 3 },
  ],
  "glutathione": [
    { slug: "nad-buffered", label: "Cellular health stack", priority: 1 },
    { slug: "glow", label: "Skin & detox support", priority: 2 },
    { slug: "epithalon", label: "Longevity research", priority: 3 },
  ],

  // Cognitive & Neurological
  "semax": [
    { slug: "selank", label: "Cognitive stack", priority: 1 },
    { slug: "epithalon", label: "Neuroprotection", priority: 2 },
    { slug: "dsip", label: "Sleep & recovery", priority: 3 },
  ],
  "selank": [
    { slug: "semax", label: "Cognitive stack", priority: 1 },
    { slug: "dsip", label: "Anxiolytic support", priority: 2 },
    { slug: "epithalon", label: "Neuroprotection", priority: 3 },
  ],
  "dsip": [
    { slug: "selank", label: "Sleep & relaxation", priority: 1 },
    { slug: "semax", label: "Cognitive support", priority: 2 },
    { slug: "epithalon", label: "Recovery stack", priority: 3 },
  ],

  // Hormonal & Libido
  "pt-141": [
    { slug: "melanotan-2", label: "Melanocortin stack", priority: 1 },
    { slug: "klow", label: "Libido blend", priority: 2 },
    { slug: "cjc-1295-ipamorelin", label: "Hormonal support", priority: 3 },
  ],
  "melanotan-2": [
    { slug: "pt-141", label: "Melanocortin research", priority: 1 },
    { slug: "bpc-157", label: "Skin health support", priority: 2 },
    { slug: "ghk-cu", label: "Skin stack", priority: 3 },
  ],
  "klow": [
    { slug: "pt-141", label: "Libido research stack", priority: 1 },
    { slug: "cjc-1295-ipamorelin", label: "Hormonal support", priority: 2 },
    { slug: "nad-buffered", label: "Energy & vitality", priority: 3 },
  ],
};

/**
 * Get stack recommendations for a peptide by slug.
 * Returns sorted by priority, limited to top 3.
 */
export function getStackRecommendations(slug: string): StackRecommendation[] {
  const stacks = peptideStacks[slug];
  if (!stacks) return [];
  return [...stacks].sort((a, b) => a.priority - b.priority).slice(0, 3);
}
