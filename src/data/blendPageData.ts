import type { PeptideBenefit, PeptideAccordion } from "./peptidePageData";

// CJC-1295 + Ipamorelin Data
export const cjc1295IpamorelinData = {
  peptideName: "CJC-1295 + Ipamorelin",
  slug: "cjc-1295-ipamorelin",
  productImage: "/products/cjc-1295-ipamorelin.webp",
  subtitle: "A peptide blend studied in laboratory settings for growth hormone secretion and body composition",
  description: "CJC-1295 with Ipamorelin is a synergistic peptide combination that optimizes natural growth hormone secretion without receptor desensitization. CJC-1295 (a long-acting GHRH analog) amplifies GH pulse amplitude, while Ipamorelin (a selective ghrelin mimetic) increases pulse frequency, resulting in sustained, physiological GH elevation that supports body composition, metabolic health, and tissue regeneration.",
  components: [
    { name: "CJC-1295", casNumber: "863288-34-0", molecularFormula: "C₁₆₅H₂₇₁N₄₇O₄₆", molarMass: "3647.28 g/mol" },
    { name: "Ipamorelin", casNumber: "170851-70-4", molecularFormula: "C₃₈H₄₉N₉O₅", molarMass: "711.85 g/mol" }
  ],
  benefits: [
    { iconName: "TrendingUp", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "Sustained GH & IGF-1 Signaling (Human)", description: "Clinical studies demonstrate CJC-1295 produces sustained, dose-dependent increases in GH and IGF-1 levels in healthy adults.", link: "(Clinical Trial)" },
    { iconName: "Activity", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "Preserved GH Pulsatility Under Long-Acting GHRH Stimulation (Human)", description: "Research shows CJC-1295 increases trough and mean GH secretion while preserving natural pulsatile GH release patterns.", link: "(Clinical Trial)" },
    { iconName: "Zap", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "Body Composition & Growth Outcomes (Preclinical)", description: "Preclinical studies demonstrate CJC-1295 normalizes body composition and growth in GHRH-deficient animal models.", link: "(Preclinical Study)" },
    { iconName: "Target", iconBgClass: "bg-orange-100 dark:bg-orange-900/30", title: "Selective GH Secretagogue Characterization & Human PK/PD (Ipamorelin)", description: "Ipamorelin is characterized as the first selective GH secretagogue with well-defined pharmacokinetic properties in humans.", link: "(Clinical Trial)" },
  ] as PeptideBenefit[],
  references: [
    "Ionescu M, Frohman LA. Pulsatile secretion of growth hormone (GH) persists during continuous stimulation by CJC-1295, a long-acting GH-releasing hormone analog. J Clin Endocrinol Metab. 2006;91(12):4792-4797.",
    "Teichman SL, Neale A, Lawrence B, et al. Prolonged stimulation of growth hormone (GH) and insulin-like growth factor I secretion by CJC-1295, a long-acting analog of GH-releasing hormone, in healthy adults. J Clin Endocrinol Metab. 2006;91(3):799-805.",
    "Sinha DK, Balasubramanian A, Tatem AJ, et al. Beyond the androgen receptor: the role of growth hormone secretagogues in the modern management of body composition in hypogonadal males. Transl Androl Urol. 2020;9(Suppl 2):S149-S159.",
    "Raun K, Hansen BS, Johansen NL, et al. Ipamorelin, the first selective growth hormone secretagogue. Eur J Endocrinol. 1998;139(5):552-561.",
    "Gobburu JV, Agersø H, Jusko WJ, Ynddal L. Pharmacokinetic-pharmacodynamic modeling of ipamorelin, a growth hormone releasing peptide, in human volunteers. Pharm Res. 1999;16(9):1412-1416.",
  ],
  aboutParagraphs: [
    "This blend brings together two peptides with very different origin stories. CJC-1295 was developed by a Canadian biotech company called ConjuChem Biotechnologies in the early 2000s. They were trying to create a longer-lasting version of the body's natural growth hormone-releasing hormone—something researchers could use without needing constant dosing.",
    "Ipamorelin came from a different direction entirely. Scientists at Novo Nordisk in Denmark created it in the late 1990s while looking for a cleaner way to stimulate growth hormone release. What made Ipamorelin special was its selectivity—it could trigger GH release without affecting other hormones like cortisol, which had been a problem with earlier compounds.",
    "Researchers eventually started combining these two peptides to see if they would work better together. The idea made sense: CJC-1295 could amplify how much growth hormone gets released, while Ipamorelin could increase how often those releases happen. This 'push-pull' approach became popular in research settings.",
    "Today, the CJC-1295 + Ipamorelin combination is one of the most studied peptide blends for growth hormone research. Labs around the world use it to explore questions about metabolism, aging, and body composition. This product is intended for research use only."
  ],
  howItWorksIntro: "CJC-1295 amplifies your pituitary's GH response, while Ipamorelin increases how often GH is released. Together, they optimize natural GH secretion—boosting muscle growth, fat loss, recovery, and sleep—without the risks of synthetic GH or cortisol spikes.",
  howItWorksAccordions: [
    { value: "ghrh-amplification", iconName: "Signal", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "GHRH Receptor Amplification", content: "CJC-1295 binds to GHRH receptors on pituitary somatotroph cells, activating adenylyl cyclase and increasing intracellular cAMP. This amplifies the magnitude of GH pulses by 200-300% while preserving the body's natural pulsatile rhythm. The DAC modification extends half-life to 6-8 days, providing sustained GH elevation without requiring daily dosing." },
    { value: "ghrelin-mimetic", iconName: "Zap", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "Selective Ghrelin Mimetic Action", content: "Ipamorelin selectively activates GHS-R1a receptors on pituitary cells without triggering cortisol or prolactin release. This increases GH pulse frequency while maintaining physiological hormone balance. The selectivity makes Ipamorelin ideal for long-term use without the side effects associated with other ghrelin mimetics." },
    { value: "igf1-cascade", iconName: "Activity", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "IGF-1 Signaling Cascade", content: "Elevated GH stimulates hepatic production of IGF-1, which activates the PI3K/Akt and MAPK pathways in muscle, bone, and connective tissue. This drives protein synthesis, cellular proliferation, and tissue repair while inhibiting protein degradation and promoting fat oxidation." },
    { value: "metabolic", iconName: "Flame", iconBgClass: "bg-orange-100 dark:bg-orange-900/30", title: "Metabolic Optimization", content: "The sustained GH elevation increases lipolysis by activating hormone-sensitive lipase in adipose tissue, particularly visceral fat. Simultaneously, it enhances glucose uptake in muscle tissue and shifts fuel utilization toward fatty acid oxidation, improving body composition and metabolic health." },
  ] as PeptideAccordion[],
  technicalPathways: [
    "CJC-1295 → GHRH-R → Gs → AC → ↑cAMP → PKA → CREB → GH gene transcription",
    "Ipamorelin → GHS-R1a → Gq → PLC → IP3/DAG → ↑Ca²⁺ → GH vesicle exocytosis",
    "GH → GH-R (liver) → JAK2/STAT5 → IGF-1 synthesis → IGF-1R → PI3K/Akt + MAPK",
    "IGF-1 → mTORC1 → S6K1/4E-BP1 → ↑protein synthesis + ↓autophagy",
  ],
};

// BPC-157 + TB-500 Data
export const bpc157tb500Data = {
  peptideName: "BPC-157 + TB-500",
  slug: "bpc-157-tb-500",
  productImage: "/products/bpc-157-tb-500.webp",
  subtitle: "A peptide blend studied in laboratory settings for tissue repair and recovery mechanisms",
  description: "This synergistic blend combines BPC-157's angiogenic and gastroprotective properties with TB-500's actin regulation and cellular migration capabilities, creating a comprehensive healing formula for accelerated recovery from musculoskeletal injuries, surgical wounds, and chronic inflammatory conditions.",
  components: [
    { name: "BPC-157", casNumber: "137525-51-0", molecularFormula: "C₆₂H₉₈N₁₆O₂₂", molarMass: "1419.53 g/mol" },
    { name: "TB-500", casNumber: "77591-33-4", molecularFormula: "C₂₁₂H₃₅₀N₅₆O₇₈S", molarMass: "4963.44 g/mol" }
  ],
  benefits: [
    { iconName: "Zap", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "Tissue Repair & Wound Healing Research", description: "Preclinical studies investigating combined BPC-157 and TB-500 effects on tissue repair, wound healing, and cellular migration mechanisms", link: "(Preclinical Study)" },
    { iconName: "Activity", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "Angiogenesis & Vascular Repair Signaling", description: "Research examining peptide effects on new blood vessel formation and vascular repair pathways in preclinical models", link: "(Preclinical Study)" },
    { iconName: "Target", iconBgClass: "bg-orange-100 dark:bg-orange-900/30", title: "Musculoskeletal Injury & Tendon Healing Models", description: "Studies investigating BPC-157 and TB-500 effects on tendon, ligament, and musculoskeletal tissue repair", link: "(Preclinical Study)" },
    { iconName: "Shield", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "Inflammatory Modulation & Cytoprotection", description: "Research on anti-inflammatory and cytoprotective mechanisms of BPC-157 and TB-500 in preclinical models", link: "(Preclinical Study)" },
  ] as PeptideBenefit[],
  references: [
    "Brcic L, Brcic I, Staresinic M, et al. Modulatory effect of gastric pentadecapeptide BPC 157 on angiogenesis in muscle and tendon healing. J Physiol Pharmacol. 2009;60 Suppl 7:191-196.",
    "Staresinic M, Petrovic I, Novinscak T, et al. Effective therapy of transected quadriceps muscle in rat: Gastric pentadecapeptide BPC 157. J Orthop Res. 2006;24(5):1109-1117.",
    "Goldstein AL, Hannappel E, Sosne G, Kleinman HK. Thymosin beta4: a multi-functional regenerative peptide. Basic properties and clinical applications. Expert Opin Biol Ther. 2012;12(1):37-51.",
    "Bock-Marquette I, Saxena A, White MD, et al. Thymosin beta4 activates integrin-linked kinase and promotes cardiac cell migration, survival and cardiac repair. Nature. 2004;432(7016):466-472.",
    "Sikiric P, Seiwerth S, Rucman R, et al. Stable gastric pentadecapeptide BPC 157: novel therapy in gastrointestinal tract. Curr Pharm Des. 2011;17(16):1612-1632.",
    "Sosne G, Qiu P, Goldstein AL, Wheater M. Biological activities of thymosin beta4 defined by active sites in short peptide sequences. FASEB J. 2010;24(7):2144-2151.",
  ],
  aboutParagraphs: [
    "This blend combines two peptides that were discovered decades apart but ended up being natural partners in research. BPC-157 came from Croatian scientists in the early 1990s who were studying the protective properties of stomach fluid. TB-500, on the other hand, traces back to the 1960s when Dr. Allan Goldstein and his team at the National Institutes of Health were exploring the thymus gland and discovered a family of peptides called thymosins.",
    "Researchers noticed that these two peptides seemed to tackle tissue repair from different angles. BPC-157 appeared to help with building new blood vessels to bring nutrients to damaged areas. TB-500 worked differently—it helped cells move around and get to where they needed to go. Scientists started wondering: what if you used both at once?",
    "That question led to studies combining the two peptides, and the results caught attention in the research community. Labs began using the blend to study wound healing, tissue recovery, and related biological processes. Today, BPC-157 + TB-500 is one of the most popular peptide combinations for tissue repair research. This product is intended for research use only."
  ],
  howItWorksIntro: "BPC-157 + TB-500 creates a comprehensive healing system: BPC-157 builds new blood vessels to deliver oxygen and nutrients to injured tissue, while TB-500 directs repair cells to the damage site and organizes proper tissue reconstruction. Together, they accelerate healing, reduce inflammation, and restore function faster than either peptide alone—making this the gold standard for injury recovery.",
  howItWorksAccordions: [
    { value: "angiogenesis", iconName: "Activity", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "Enhanced Angiogenesis", content: "BPC-157 activates VEGFR2 signaling to initiate new blood vessel formation, while TB-500 promotes endothelial cell differentiation and migration. This dual action creates robust capillary networks that deliver oxygen, nutrients, and immune cells to injured tissue 40-60% faster than baseline." },
    { value: "migration", iconName: "Workflow", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "Cell Migration & Proliferation", content: "TB-500 upregulates actin polymerization, allowing cells to extend pseudopodia and migrate toward injury sites. BPC-157 activates FAK signaling, enhancing fibroblast, keratinocyte, and satellite cell migration. Together, they accelerate wound closure and tissue regeneration by 40-60%." },
    { value: "inflammation", iconName: "Shield", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "Anti-Inflammatory Synergy", content: "BPC-157 modulates prostaglandin pathways and inhibits NLRP3 inflammasome activation, while TB-500 suppresses NF-κB signaling and reduces pro-inflammatory cytokine production. This dual action creates profound anti-inflammatory effects that prevent chronic inflammation." },
    { value: "collagen", iconName: "Bone", iconBgClass: "bg-orange-100 dark:bg-orange-900/30", title: "Collagen & Matrix Remodeling", content: "Both peptides upregulate collagen synthesis (types I and III) and matrix metalloproteinase activity for optimal tissue remodeling. This ensures proper scar formation, tensile strength recovery, and restoration of tissue architecture rather than disorganized fibrosis." },
  ] as PeptideAccordion[],
  technicalPathways: [
    "BPC-157 → VEGFR2 → PI3K/Akt → eNOS → ↑NO → vasodilation + angiogenesis",
    "TB-500 → G-actin sequestration → ↑actin polymerization → cell migration",
    "BPC-157 → FAK → Src → Rac1/Cdc42 → lamellipodia formation → wound closure",
    "TB-500 → ILK activation → GSK-3β inhibition → β-catenin → cell survival + migration",
  ],
};


