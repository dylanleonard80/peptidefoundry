/**
 * Curated related research compound recommendations.
 * Each peptide maps to frequently purchased companion products.
 */

export interface StackRecommendation {
  slug: string;
  label: string;
  priority: number;
}

export const peptideStacks: Record<string, StackRecommendation[]> = {
  // Recovery & Tissue Research
  "bpc-157": [
    { slug: "tb-500", label: "Complementary signaling pathway research", priority: 1 },
    { slug: "bpc-157-tb-500", label: "Pre-made blend", priority: 2 },
    { slug: "glow", label: "Multi-pathway tissue research blend", priority: 3 },
  ],
  "tb-500": [
    { slug: "bpc-157", label: "Complementary signaling pathway research", priority: 1 },
    { slug: "bpc-157-tb-500", label: "Pre-made blend", priority: 2 },
    { slug: "ghk-cu", label: "Extracellular matrix research", priority: 3 },
  ],
  "bpc-157-tb-500": [
    { slug: "ghk-cu", label: "Extracellular matrix research", priority: 1 },
    { slug: "glow", label: "Multi-pathway tissue research blend", priority: 2 },
    { slug: "nad-buffered", label: "Cellular energetics research", priority: 3 },
  ],
  "ghk-cu": [
    { slug: "bpc-157-tb-500", label: "Complementary tissue pathway research", priority: 1 },
    { slug: "glow", label: "Multi-pathway tissue research blend", priority: 2 },
    { slug: "epithalon", label: "Telomere biology research", priority: 3 },
  ],
  "glow": [
    { slug: "ghk-cu", label: "Extracellular matrix research", priority: 1 },
    { slug: "bpc-157-tb-500", label: "Complementary tissue pathway research", priority: 2 },
    { slug: "glutathione", label: "Redox signaling research", priority: 3 },
  ],

  // Metabolic Research
  "retatrutide": [
    { slug: "aod-9604", label: "Lipolytic pathway research", priority: 1 },
    { slug: "mots-c", label: "Mitochondrial signaling research", priority: 2 },
    { slug: "cjc-1295-ipamorelin", label: "GH secretagogue pathway research", priority: 3 },
  ],
  "aod-9604": [
    { slug: "cjc-1295-ipamorelin", label: "GH secretagogue pathway research", priority: 1 },
    { slug: "tesamorelin", label: "GHRH receptor signaling research", priority: 2 },
    { slug: "mots-c", label: "Mitochondrial signaling research", priority: 3 },
  ],

  // Growth Hormone Secretagogue Research
  "cjc-1295-ipamorelin": [
    { slug: "tesamorelin", label: "GHRH receptor signaling research", priority: 1 },
    { slug: "igf-1-lr3", label: "Growth factor signaling research", priority: 2 },
    { slug: "sermorelin", label: "Complementary GHRH analog research", priority: 3 },
  ],
  "tesamorelin": [
    { slug: "ipamorelin", label: "GHRP receptor signaling research", priority: 1 },
    { slug: "cjc-1295-ipamorelin", label: "Complementary GHRH analog research", priority: 2 },
    { slug: "sermorelin", label: "Complementary GHRH analog research", priority: 3 },
  ],
  "ipamorelin": [
    { slug: "tesamorelin", label: "GHRH receptor signaling research", priority: 1 },
    { slug: "cjc-1295-ipamorelin", label: "Pre-made blend", priority: 2 },
    { slug: "sermorelin", label: "Complementary GHRH analog research", priority: 3 },
  ],
  "sermorelin": [
    { slug: "ipamorelin", label: "GHRP receptor signaling research", priority: 1 },
    { slug: "cjc-1295-ipamorelin", label: "Complementary GH secretagogue blend", priority: 2 },
    { slug: "igf-1-lr3", label: "Growth factor signaling research", priority: 3 },
  ],
  "igf-1-lr3": [
    { slug: "cjc-1295-ipamorelin", label: "GH secretagogue pathway research", priority: 1 },
    { slug: "bpc-157-tb-500", label: "Complementary tissue pathway research", priority: 2 },
    { slug: "mots-c", label: "Mitochondrial signaling research", priority: 3 },
  ],

  // Cellular & Longevity Research
  "epithalon": [
    { slug: "nad-buffered", label: "NAD+ pathway research", priority: 1 },
    { slug: "mots-c", label: "Mitochondrial signaling research", priority: 2 },
    { slug: "semax", label: "Neuropeptide signaling research", priority: 3 },
  ],
  "mots-c": [
    { slug: "epithalon", label: "Telomere biology research", priority: 1 },
    { slug: "nad-buffered", label: "NAD+ pathway research", priority: 2 },
    { slug: "aod-9604", label: "Lipolytic pathway research", priority: 3 },
  ],
  "nad-buffered": [
    { slug: "epithalon", label: "Telomere biology research", priority: 1 },
    { slug: "mots-c", label: "Mitochondrial signaling research", priority: 2 },
    { slug: "glutathione", label: "Redox signaling research", priority: 3 },
  ],
  "glutathione": [
    { slug: "nad-buffered", label: "NAD+ pathway research", priority: 1 },
    { slug: "glow", label: "Multi-pathway tissue research blend", priority: 2 },
    { slug: "epithalon", label: "Telomere biology research", priority: 3 },
  ],

  // Neuropeptide Research
  "semax": [
    { slug: "selank", label: "Complementary neuropeptide research", priority: 1 },
    { slug: "epithalon", label: "Telomere biology research", priority: 2 },
    { slug: "epithalon", label: "Cellular health research", priority: 3 },
  ],
  "selank": [
    { slug: "semax", label: "Complementary neuropeptide research", priority: 1 },
    { slug: "epithalon", label: "Cellular health research", priority: 2 },
    { slug: "epithalon", label: "Telomere biology research", priority: 3 },
  ],
  // Melanocortin & Neuroendocrine Research
  "pt-141": [
    { slug: "melanotan-2", label: "Melanocortin receptor research", priority: 1 },
    { slug: "bpc-157", label: "Complementary signaling pathway research", priority: 2 },
    { slug: "cjc-1295-ipamorelin", label: "GH secretagogue pathway research", priority: 3 },
  ],
  "melanotan-2": [
    { slug: "pt-141", label: "Melanocortin receptor research", priority: 1 },
    { slug: "bpc-157", label: "Complementary signaling pathway research", priority: 2 },
    { slug: "ghk-cu", label: "Extracellular matrix research", priority: 3 },
  ],
};

/**
 * Get related research compound recommendations for a peptide by slug.
 * Returns sorted by priority, limited to top 3.
 */
export function getStackRecommendations(slug: string): StackRecommendation[] {
  const stacks = peptideStacks[slug];
  if (!stacks) return [];
  return [...stacks].sort((a, b) => a.priority - b.priority).slice(0, 3);
}
