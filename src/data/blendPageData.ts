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
  prices: { "5mg/5mg": 70 },
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
  prices: { "10mg/10mg": 108 },
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

// PT-141 / Kisspeptin / Pinealon Data
export const pt141BlendData = {
  peptideName: "PT-141 / Kisspeptin / Pinealon",
  slug: "pt-141-kisspeptin-pinealon",
  subtitle: "A peptide blend studied in laboratory settings for libido and reproductive function",
  description: "A synergistic blend combining PT-141's melanocortin pathway activation with Kisspeptin's reproductive hormone stimulation and Pinealon's neurological support for comprehensive sexual health, hormonal balance, and overall vitality.",
  components: [
    { name: "PT-141", casNumber: "189691-06-3", molecularFormula: "C₅₀H₆₈N₁₄O₁₀", molarMass: "1025.16 g/mol" },
    { name: "Kisspeptin", casNumber: "374675-21-5", molecularFormula: "C₆₃H₈₃N₁₇O₁₄", molarMass: "1302.49 g/mol" },
    { name: "Pinealon", casNumber: "161729-47-3", molecularFormula: "C₁₃H₂₂N₄O₄", molarMass: "302.33 g/mol" }
  ],
  prices: { "5mg x 2mg x 3mg": 249 },
  benefits: [
    { iconName: "Flame", iconBgClass: "", title: "Enhanced Libido & Sexual Desire (M/F)", description: "Activates melanocortin receptors in the brain to increase sexual arousal and desire in both men and women, bypassing vascular limitations of other treatments.", link: "https://pubmed.ncbi.nlm.nih.gov/30888242/" },
    { iconName: "Target", iconBgClass: "", title: "Improved Erectile Function (Men)", description: "Enhances erectile response through central nervous system activation rather than vascular mechanisms, effective even in cases resistant to traditional ED medications.", link: "https://pubmed.ncbi.nlm.nih.gov/31763738/" },
    { iconName: "Heart", iconBgClass: "", title: "Increased Arousal & Sensitivity (Women)", description: "Significantly improves sexual arousal, orgasmic function, and overall satisfaction in women with hypoactive sexual desire disorder (HSDD).", link: "https://pubmed.ncbi.nlm.nih.gov/31473021/" },
    { iconName: "Activity", iconBgClass: "", title: "Hormonal Balance Optimization", description: "Kisspeptin stimulates the hypothalamic-pituitary-gonadal (HPG) axis, increasing natural production of LH, FSH, and sex hormones (testosterone, estrogen).", link: "https://pubmed.ncbi.nlm.nih.gov/28165406/" },
    { iconName: "Brain", iconBgClass: "", title: "Neuroprotection & Cognitive Enhancement", description: "Pinealon protects neurons from oxidative stress, improves memory formation, and enhances cognitive processing speed in aging brains.", link: "https://pubmed.ncbi.nlm.nih.gov/26750156/" },
    { iconName: "Moon", iconBgClass: "", title: "Circadian Rhythm Regulation", description: "Pinealon supports pineal gland function and melatonin production, improving sleep quality, hormonal timing, and overall metabolic health.", link: "https://pubmed.ncbi.nlm.nih.gov/25411026/" },
    { iconName: "Shield", iconBgClass: "", title: "Stress Response Improvement", description: "Modulates cortisol levels and enhances stress resilience through hypothalamic regulation, improving mood, energy, and sexual function under stress.", link: "https://pubmed.ncbi.nlm.nih.gov/29470825/" },
  ] as PeptideBenefit[],
  references: [
    "Kingsberg, S.A., et al. (2019). Bremelanotide for the Treatment of Hypoactive Sexual Desire Disorder: Two Randomized Phase 3 Trials. Obstetrics & Gynecology, 134(5), 899-908.",
    "Clayton, A.H., et al. (2016). Validation of the Decreased Sexual Desire Screener (DSDS). The Journal of Sexual Medicine, 13(9), 1385-1394.",
    "Dhillo, W.S., et al. (2005). Kisspeptin-54 stimulates the hypothalamic-pituitary gonadal axis in human males. The Journal of Clinical Endocrinology & Metabolism, 90(12), 6609-6615.",
    "George, J.T., et al. (2011). Kisspeptin-10 is a potent stimulator of LH and increases pulse frequency in men. The Journal of Clinical Endocrinology & Metabolism, 96(8), E1228-E1236.",
    "Khavinson, V., et al. (2011). Neuroprotective effects of short peptides in Alzheimer's disease model. Neuroendocrinology Letters, 32(5), 579-584.",
    "Anisimov, V.N., et al. (2015). Pinealon increases the lifespan of Drosophila melanogaster. Rejuvenation Research, 18(3), 214-222.",
    "Molinoff, H.B., et al. (2015). Safety of bremelanotide in patients with hypoactive sexual desire disorder. The Journal of Sexual Medicine, 12(11), 2263-2271.",
  ],
  aboutParagraphs: [
    "PT-141 has one of the more interesting origin stories in peptide research. It actually started as an accidental discovery. In the 1980s, researchers at the University of Arizona were developing Melanotan II as a potential sunless tanning agent. During their studies, they noticed an unexpected side effect—subjects were reporting increased sexual arousal. This led scientists down a completely different path.",
    "The researchers isolated the part of Melanotan II responsible for this effect and modified it to create PT-141, also called Bremelanotide. Unlike other compounds that worked on blood flow, PT-141 appeared to work directly on the brain's arousal centers. This was something new, and it caught the attention of pharmaceutical companies.",
    "Kisspeptin and Pinealon were added to this blend to address related systems. Kisspeptin was discovered in the early 2000s when researchers found it played a key role in puberty and hormone regulation. Pinealon came from Russian scientist Vladimir Khavinson's work on organ-specific peptides. Together, the three peptides target different aspects of the same system.",
    "Today, this blend is used in research exploring the connections between brain signaling, hormones, and related biological processes. This product is intended for research use only."
  ],
  howItWorksIntro: "This blend enhances sexual health and vitality from three complementary angles: PT-141 activates brain pathways for sexual arousal and desire, Kisspeptin stimulates your body's natural production of sex hormones (testosterone, estrogen), and Pinealon supports the neurological and circadian systems that underpin overall vitality. Together, they create a holistic approach to libido, performance, and hormonal balance.",
  howItWorksAccordions: [
    { value: "melanocortin", iconName: "Flame", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "Melanocortin Receptor Activation (PT-141)", content: "PT-141 binds to MC4R receptors in the hypothalamus, triggering dopamine release in the nucleus accumbens and preoptic area—regions critical for sexual motivation and arousal. This central mechanism bypasses vascular limitations, making it effective even when blood-flow-based treatments fail." },
    { value: "hpg-axis", iconName: "Activity", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "HPG Axis Stimulation (Kisspeptin)", content: "Kisspeptin activates GPR54 receptors on GnRH neurons in the hypothalamus, triggering pulsatile GnRH release. This stimulates LH and FSH secretion from the pituitary, which increases testosterone production in men and estrogen/progesterone in women, restoring hormonal balance naturally." },
    { value: "pineal", iconName: "Moon", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "Pineal Gland Support (Pinealon)", content: "Pinealon penetrates cell membranes and interacts with DNA in pinealocytes, optimizing melatonin synthesis and circadian rhythm regulation. This improves sleep quality, hormonal timing, and stress resilience—all critical factors in sexual function and vitality." },
    { value: "neuroendocrine", iconName: "Brain", iconBgClass: "bg-orange-100 dark:bg-orange-900/30", title: "Neuroendocrine Integration", content: "The three peptides work synergistically to optimize the neuroendocrine system: PT-141 activates desire circuits, Kisspeptin restores hormone production, and Pinealon ensures proper circadian signaling. This comprehensive approach addresses libido, arousal, and overall vitality simultaneously." },
  ] as PeptideAccordion[],
  technicalPathways: [
    "PT-141 → MC4R → Gαs → ↑cAMP → PKA → dopamine release → sexual arousal",
    "Kisspeptin → GPR54 → Gq/11 → PLC → IP3/DAG → GnRH release → LH/FSH → sex hormones",
    "Pinealon → DNA binding → ↑melatonin synthesis → circadian optimization",
    "Integration: Dopamine ↔ GnRH ↔ Melatonin → coordinated sexual function + vitality",
  ],
};

// Thymosin α1 + Thymulin Data
export const thymosinBlendData = {
  peptideName: "Thymosin α1 + Thymulin",
  slug: "thymosin-a1-thymulin",
  subtitle: "A peptide blend studied in laboratory settings for thymic function and immune modulation",
  description: "A synergistic blend combining Thymosin Alpha-1's potent immune-enhancing properties with Thymulin's thymic rejuvenation capabilities for comprehensive immune system support and enhanced resilience against infection, disease, and aging.",
  components: [
    { name: "Thymosin α1", casNumber: "62304-98-7", molecularFormula: "C₁₂₉H₂₁₅N₃₃O₅₅", molarMass: "3108.29 g/mol" },
    { name: "Thymulin", casNumber: "63958-90-7", molecularFormula: "C₄₀H₆₂N₁₂O₁₆", molarMass: "946.99 g/mol" }
  ],
  prices: { "10mg x 6mg": 199 },
  benefits: [
    { iconName: "Users", iconBgClass: "", title: "Thymic Rejuvenation & T-Cell Production", description: "Restores thymic function and enhances T-cell maturation, improving the body's ability to produce new immune cells even in aging individuals.", link: "https://pubmed.ncbi.nlm.nih.gov/29679868/" },
    { iconName: "Shield", iconBgClass: "", title: "Enhanced Immune Cell Function", description: "Activates dendritic cells, macrophages, and natural killer cells, creating a comprehensive defense network against pathogens and cancer cells.", link: "https://pubmed.ncbi.nlm.nih.gov/26595046/" },
    { iconName: "Ban", iconBgClass: "", title: "Anti-Viral & Anti-Bacterial Defense", description: "Demonstrates powerful activity against viral infections including hepatitis B, hepatitis C, and influenza by enhancing interferon production and T-cell responses.", link: "https://pubmed.ncbi.nlm.nih.gov/23256445/" },
    { iconName: "Activity", iconBgClass: "", title: "Reduction of Chronic Inflammation", description: "Modulates inflammatory cytokines, reducing chronic inflammation that contributes to aging and age-related diseases while maintaining healthy immune responses.", link: "https://pubmed.ncbi.nlm.nih.gov/30936547/" },
    { iconName: "Target", iconBgClass: "", title: "Autoimmune Regulation", description: "Helps balance immune system activity, reducing autoimmune reactions while preserving the ability to fight infections and disease.", link: "https://pubmed.ncbi.nlm.nih.gov/28836542/" },
    { iconName: "Zap", iconBgClass: "", title: "Increased Vaccine Response", description: "Enhances antibody production and cellular immunity following vaccination, particularly beneficial for elderly individuals with weakened immune responses.", link: "https://pubmed.ncbi.nlm.nih.gov/25881058/" },
    { iconName: "Sparkles", iconBgClass: "", title: "Healthy Aging & Longevity Support", description: "Supports immunosenescence reversal, maintaining youthful immune function and reducing susceptibility to infections, cancer, and autoimmune conditions with age.", link: "https://pubmed.ncbi.nlm.nih.gov/31582922/" },
  ] as PeptideBenefit[],
  references: [
    "Goldstein, A.L., et al. (2016). Thymosin Alpha 1: A Clinically Active Biological Response Modifier. Annals of the New York Academy of Sciences, 1270(1), 26-33.",
    "Garaci, E., et al. (2012). Thymosin α1: from bench to bedside. Annals of the New York Academy of Sciences, 1269(1), 79-85.",
    "Dardenne, M., et al. (1982). Studies on the thymus products. VI. Thymulin activity in blood. European Journal of Immunology, 12(12), 1098-1100.",
    "Savino, W., & Dardenne, M. (2010). Nutritional imbalances and infections affect the thymus. Proceedings of the Nutrition Society, 69(4), 636-643.",
    "Reggiani, P.C., et al. (2009). The thymus-neuroendocrine axis. Annals of the New York Academy of Sciences, 1153, 98-106.",
    "King, R., & Tuthill, C. (2016). Immune modulation with thymosin alpha 1 treatment. Vitamins and Hormones, 102, 151-178.",
  ],
  aboutParagraphs: [
    "The story of thymosin peptides begins in the 1960s when Dr. Allan Goldstein at the National Institutes of Health started investigating the thymus gland. Scientists had known about this small organ near the heart for a long time, but they didn't fully understand what it did. Dr. Goldstein's team discovered that the thymus produced special peptides that helped immune cells mature and function properly.",
    "Thymosin Alpha-1 became one of the most studied peptides to come out of this research. Labs around the world began exploring its effects on the immune system. Separately, researchers discovered Thymulin—another thymus-related peptide that seemed to support the organ's overall function rather than just activating specific immune cells.",
    "Eventually, researchers started asking whether combining these two peptides might give better results than using either one alone. The thinking was straightforward: Thymosin Alpha-1 could activate existing immune cells while Thymulin might help the thymus gland itself stay healthy. This combination became popular in immune system research. This product is intended for research use only."
  ],
  howItWorksIntro: "This blend combines two powerful thymic peptides to optimize your immune system from two angles: Thymosin Alpha-1 activates and enhances existing immune cells to fight infections and cancer, while Thymulin rejuvenates the thymus gland itself—the organ that produces new T-cells. Together, they create a comprehensive immune defense system that combats disease while reversing age-related immune decline.",
  howItWorksAccordions: [
    { value: "tcell", iconName: "Users", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "T-Cell Maturation & Activation", content: "Thymosin Alpha-1 enhances T-cell differentiation from naive to effector cells, increasing CD4+ helper T-cells and CD8+ cytotoxic T-cells. Thymulin supports this process by promoting thymic epithelial cell function and T-cell receptor (TCR) expression on developing thymocytes." },
    { value: "dendritic", iconName: "Signal", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "Dendritic Cell Modulation", content: "Thymosin Alpha-1 activates dendritic cells—the 'sentinels' of the immune system—increasing their antigen presentation capacity and ability to stimulate T-cell responses. This enhances immune surveillance against pathogens and cancer cells." },
    { value: "interferon", iconName: "Shield", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "Interferon & Cytokine Regulation", content: "Thymosin Alpha-1 increases type I interferon production (IFN-α, IFN-β), enhancing antiviral defenses. Simultaneously, it modulates inflammatory cytokines (IL-2, IL-10, TNF-α) to maintain immune balance without excessive inflammation." },
    { value: "thymic", iconName: "Sparkles", iconBgClass: "bg-orange-100 dark:bg-orange-900/30", title: "Thymic Regeneration", content: "Thymulin promotes thymic epithelial cell proliferation and function, reversing age-related thymic involution. This restores the thymus's capacity to produce naive T-cells, maintaining immune diversity and responsiveness throughout life." },
  ] as PeptideAccordion[],
  technicalPathways: [
    "Tα1 → TLR2/TLR9 → MyD88 → NF-κB → ↑IFN-α/β + immune gene expression",
    "Tα1 → DC activation → ↑MHC-II + CD80/86 → enhanced T-cell priming",
    "Thymulin + Zn²⁺ → thymic epithelial cells → ↑T-cell receptor expression",
    "Combined → T-cell maturation + activation + thymic regeneration → immune optimization",
  ],
};

// KLOW Data
export const klowData = {
  peptideName: "KLOW",
  slug: "klow",
  productImage: "/products/klow.webp",
  subtitle: "A peptide blend studied in laboratory settings for gastrointestinal healing and tissue repair",
  description: "KLOW is an advanced quad-peptide blend combining BPC-157, TB-500, KPV, and GHK-Cu for comprehensive gastrointestinal healing, systemic anti-inflammatory effects, and tissue regeneration. This formula addresses mucosal repair, barrier integrity, inflammation suppression, and cellular regeneration simultaneously.",
  components: [
    { name: "BPC-157", casNumber: "137525-51-0", molecularFormula: "C₆₂H₉₈N₁₆O₂₂", molarMass: "1419.53 g/mol" },
    { name: "TB-500", casNumber: "77591-33-4", molecularFormula: "C₂₁₂H₃₅₀N₅₆O₇₈S", molarMass: "4963.44 g/mol" },
    { name: "KPV", casNumber: "67727-97-3", molecularFormula: "C₁₆H₃₀N₆O₄", molarMass: "357.40 g/mol" },
    { name: "GHK-Cu", casNumber: "49557-75-7", molecularFormula: "C₁₄H₂₂CuN₆O₄", molarMass: "403.92 g/mol" }
  ],
  prices: { "50mg/10mg/10mg/10mg": 133 },
  benefits: [
    { iconName: "Shield", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "Inflammatory Signaling & Cytokine Modulation", description: "Research on KPV and BPC-157 effects on inflammatory signaling pathways and cytokine modulation", link: "(Preclinical Study)" },
    { iconName: "Sparkles", iconBgClass: "bg-yellow-100 dark:bg-yellow-900/30", title: "Skin Barrier Function & Dermal Repair", description: "Studies investigating GHK-Cu effects on skin barrier integrity and dermal repair mechanisms", link: "(Preclinical Study)" },
    { iconName: "Heart", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "Tissue Repair & Wound Healing Models", description: "Preclinical research examining BPC-157 and TB-500 effects on tissue repair and wound healing", link: "(Preclinical Study)" },
    { iconName: "Activity", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "Immune Modulation via Melanocortin Pathways", description: "Research on KPV melanocortin pathway activation and immune modulatory effects", link: "(Preclinical Study)" },
  ] as PeptideBenefit[],
  references: [
    "Sikiric P, Seiwerth S, Rucman R, et al. Stable gastric pentadecapeptide BPC 157: novel therapy in gastrointestinal tract. Curr Pharm Des. 2011;17(16):1612-1632.",
    "Gwyer D, Wragg NM, Wilson SL. Gastric pentadecapeptide body protection compound BPC 157 and its role in accelerating musculoskeletal soft tissue healing. Cell Tissue Res. 2019;377(2):153-159.",
    "Chang CH, Tsai WC, Lin MS, Hsu YH, Pang JH. The promoting effect of pentadecapeptide BPC 157 on tendon healing involves tendon outgrowth, cell survival, and cell migration. J Appl Physiol. 2011;110(3):774-780.",
    "Grgic T, Grgic D, Drmic D, et al. Stable gastric pentadecapeptide BPC 157 in trials for inflammatory bowel disease. Inflammopharmacology. 2016;24(2-3):77-90.",
    "Kang EA, Han YM, Piao JY, et al. Restitution of the skin injury by the KPV tripeptide via activation of integrin alpha-5, beta-1 and TGF-beta. Inflammopharmacology. 2018;26(4):997-1008.",
    "Brzoska T, Luger TA, Maaser C, Abels C, Böhm M. Alpha-melanocyte-stimulating hormone and related tripeptides: biochemistry, antiinflammatory and protective effects. Endocr Rev. 2008;29(5):581-602.",
  ],
  aboutParagraphs: [
    "KLOW brings together four peptides that each took their own path to the research spotlight. BPC-157 came from Croatian gastric juice research in the 1990s. TB-500 traces back to 1960s thymus gland studies. KPV is a fragment of the alpha-MSH hormone that researchers isolated while studying inflammation. And GHK-Cu was discovered in 1973 by Dr. Loren Pickart while he was looking at human blood plasma.",
    "Each of these peptides had been studied on its own for years before anyone thought to combine them. BPC-157 showed promise in gut-related research. TB-500 appeared to help cells move around more easily. KPV seemed to calm down inflammatory responses. GHK-Cu had effects on gene expression and tissue remodeling.",
    "The idea behind KLOW was to see what would happen when these four different approaches worked together. The blend targets gut health from multiple angles—repair, cell movement, inflammation, and tissue rebuilding. Labs use it to study complex healing processes that might benefit from more than one mechanism at once. This product is intended for research use only."
  ],
  howItWorksIntro: "KLOW combines four complementary mechanisms for comprehensive gut healing: BPC-157 repairs damaged intestinal tissue by building new blood vessels and directing repair cells to injury sites, TB-500 organizes proper tissue remodeling and cellular migration, KPV stops inflammatory gene expression at its source by blocking NF-κB, and GHK-Cu rebuilds tissue architecture while modulating 4,000+ genes for optimal healing.",
  howItWorksAccordions: [
    { value: "mucosal", iconName: "Heart", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "Accelerated Mucosal Healing", content: "BPC-157 activates VEGFR2 to stimulate angiogenesis and FAK for enterocyte migration, TB-500 orchestrates actin-mediated cellular migration to injury sites, KPV reduces inflammatory damage to mucosa, and GHK-Cu upregulates collagen synthesis for structural repair. This quad-peptide action heals gastric ulcers, intestinal lesions, and NSAID-induced damage 70-85% faster than controls." },
    { value: "inflammation", iconName: "Ban", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "Dual Anti-Inflammatory Suppression", content: "KPV enters cells directly and inhibits NF-κB nuclear translocation, preventing transcription of inflammatory genes. This suppresses production of TNF-α, IL-6, IL-1β, IL-8, and COX-2 at the source. BPC-157 complements this by modulating prostaglandin pathways and inhibiting NLRP3 inflammasome activation." },
    { value: "barrier", iconName: "Shield", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "Intestinal Barrier Restoration", content: "The quad-peptide blend upregulates tight junction proteins (occludin, claudin-1, ZO-1), reducing intestinal permeability by 40-50%. This prevents bacterial translocation and endotoxemia while restoring proper barrier function. GHK-Cu's gene-modulating effects enhance structural protein synthesis for long-term barrier integrity." },
    { value: "remodeling", iconName: "Workflow", iconBgClass: "bg-orange-100 dark:bg-orange-900/30", title: "Tissue Architecture Remodeling", content: "GHK-Cu modulates over 4,000 genes involved in tissue repair, shifting expression patterns toward regeneration. It enhances collagen synthesis, increases antioxidant enzyme production, and promotes proper matrix organization. Combined with TB-500's actin regulation, this ensures healing produces functional tissue rather than scar tissue." },
  ] as PeptideAccordion[],
  technicalPathways: [
    "BPC-157 → VEGFR2 → angiogenesis + FAK → enterocyte migration → mucosal healing",
    "TB-500 → G-actin sequestration → cytoskeletal remodeling → cell migration → tissue repair",
    "KPV → cell membrane penetration → IκBα stabilization → NF-κB nuclear exclusion → ↓inflammation",
    "GHK-Cu → DNA binding → 4,000+ gene modulation → ↑collagen + ↑antioxidants + tissue reset",
  ],
};
