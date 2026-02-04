import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { getPrices } from "@/data/priceData";

const GLOW = () => (
  <PeptidePageTemplate
    slug="glow"
    peptideName="GLOW"
    productImage="/products/glow.webp"
    subtitle="A peptide blend studied in laboratory settings for tissue repair and collagen synthesis"
    description="GLOW is a synergistic triple-peptide blend combining BPC-157's tissue repair, TB-500's cellular migration, and GHK-Cu's collagen synthesis for comprehensive anti-aging, wound healing, and skin rejuvenation. This formula addresses multiple pathways simultaneously for optimal regenerative effects."
    components={[
      { name: "BPC-157", casNumber: "137525-51-0", molecularFormula: "C₆₂H₉₈N₁₆O₂₂", molarMass: "1419.53 g/mol" },
      { name: "TB-500", casNumber: "77591-33-4", molecularFormula: "C₂₁₂H₃₅₀N₅₆O₇₈S", molarMass: "4963.44 g/mol" },
      { name: "GHK-Cu", casNumber: "49557-75-7", molecularFormula: "C₁₄H₂₂CuN₆O₄", molarMass: "403.92 g/mol" }
    ]}
    prices={getPrices("glow")!}
    benefits={[
      { iconName: "Sparkles", iconBgClass: "bg-yellow-100 dark:bg-yellow-900/30", title: "Skin Remodeling & Extracellular Matrix Research", description: "Research investigating GHK-Cu, BPC-157, and TB-500 effects on skin remodeling and extracellular matrix components", link: "(Preclinical Study)" },
      { iconName: "Activity", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "Wound Healing & Dermal Regeneration Models", description: "Preclinical studies examining peptide blend effects on wound healing and dermal tissue regeneration", link: "(Preclinical Study)" },
      { iconName: "Heart", iconBgClass: "bg-red-100 dark:bg-red-900/30", title: "Angiogenesis & Cellular Migration Signaling", description: "Research on new blood vessel formation and cell migration pathways relevant to tissue repair", link: "(Preclinical Study)" },
      { iconName: "Shield", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "Anti-Inflammatory & Cytoprotective Mechanisms", description: "Studies investigating anti-inflammatory and cell-protective properties of blend components", link: "(Preclinical Study)" }
    ]}
    references={[
      "Pickart L, Margolina A. Regenerative and Protective Actions of the GHK-Cu Peptide in the Light of the New Gene Data. Int J Mol Sci. 2018;19(7):1987.",
      "Pickart L. The human tri-peptide GHK and tissue remodeling. J Biomater Sci Polym Ed. 2008;19(8):969-988.",
      "Dorr RT, Lines R, Levine N, et al. Evaluation of melanotan-II, a superpotent cyclic melanotropic peptide in a pilot phase-I clinical study. Life Sci. 1996;58(20):1777-1784.",
      "Abdel-Malek Z, Scott MC, Suzuki I, et al. The melanocortin-1 receptor is a key regulator of human cutaneous pigmentation. Pigment Cell Res. 2000;13 Suppl 8:156-162."
    ]}
    aboutParagraphs={[
      "GLOW is a blend that brings together three peptides that were each discovered through completely different research paths. BPC-157 came from Croatian gastric juice studies in the 1990s. TB-500 traces back to 1960s thymus gland research by Dr. Allan Goldstein. And GHK-Cu was found by Dr. Loren Pickart in 1973 while studying human blood plasma.",
      "Each peptide had built its own research base before anyone thought to combine them. BPC-157 showed effects related to blood vessel formation. TB-500 appeared to help cells move around more easily. GHK-Cu seemed to influence thousands of genes related to tissue repair and aging.",
      "The idea behind GLOW was to see what would happen when these three different mechanisms worked together on skin and tissue health. Labs use this blend to study complex regenerative processes that might benefit from multiple approaches at once. This product is intended for research use only."
    ]}
    howItWorksIntro="GLOW works through three complementary mechanisms: BPC-157's vascular support, TB-500's cellular mobility enhancement, and GHK-Cu's gene expression modulation. Together, these create a comprehensive regenerative environment for optimal skin health."
    howItWorksAccordions={[
      { value: "bpc157", iconName: "Activity", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "BPC-157 Angiogenesis", content: "BPC-157 promotes new blood vessel formation through VEGFR2 activation and nitric oxide system modulation. This improves nutrient and oxygen delivery to skin tissues, supporting repair and regeneration." },
      { value: "tb500", iconName: "Workflow", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "TB-500 Cellular Migration", content: "Thymosin Beta-4 sequesters G-actin, promoting cellular motility and enabling repair cells, fibroblasts, and keratinocytes to migrate efficiently to damaged areas. This accelerates wound closure and tissue remodeling." },
      { value: "ghkcu", iconName: "Sparkles", iconBgClass: "bg-yellow-100 dark:bg-yellow-900/30", title: "GHK-Cu Gene Modulation", content: "GHK-Cu modulates expression of 4,000+ genes, upregulating collagen, elastin, and glycosaminoglycan synthesis while downregulating inflammatory and senescence-associated genes. This resets skin to more youthful patterns." }
    ]}
  />
);

export default GLOW;
