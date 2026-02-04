import { ReactNode } from "react";
import { cjc1295IpamorelinData, bpc157tb500Data, pt141BlendData, thymosinBlendData, klowData } from "./blendPageData";

export interface PeptideBenefit {
  iconName: string;
  iconBgClass: string;
  title: string;
  description: string;
  link: string;
}

export interface PeptideAccordion {
  value: string;
  iconName: string;
  iconBgClass: string;
  title: string;
  content: string;
}

export interface PeptidePageData {
  slug: string;
  peptideName: string;
  subtitle?: string;
  description: string;
  additionalDescription?: string;
  casNumber: string;
  molecularFormula?: string;
  molarMass: string;
  prices: Record<string, number>;
  benefits: PeptideBenefit[];
  references: string[];
  aboutParagraphs: string[];
  howItWorksIntro: string;
  howItWorksAccordions: PeptideAccordion[];
  technicalPathways?: string[];
  showInfoCard?: boolean;
  infoCardText?: string;
  productImage?: string;
}

// AOD-9604
export const AOD9604Data: PeptidePageData = {
  slug: "aod-9604",
  peptideName: "AOD-9604",
  productImage: "/products/aod-9604.webp",
  subtitle: "A peptide studied in laboratory settings for fat metabolism, lipolysis, and body composition",
  description: "AOD-9604 is a modified fragment of the C-terminus of human growth hormone (HGH), specifically amino acids 176-191. This synthetic peptide retains the fat-burning properties of HGH while eliminating its effects on insulin sensitivity and blood glucose.",
  casNumber: "221231-10-3",
  molecularFormula: "C₇₈H₁₂₃N₂₃O₂₃S₂",
  molarMass: "1815.08 g/mol",
  prices: { "5mg": 69 },
  benefits: [
    { iconName: "Flame", iconBgClass: "bg-orange-100 dark:bg-orange-900/30", title: "Enhanced Fat Loss", description: "Stimulates lipolysis (fat breakdown) specifically in adipose tissue without affecting lean muscle mass or blood glucose levels.", link: "https://doi.org/10.1210/jcem.86.7.7645" },
    { iconName: "TrendingDown", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "Metabolic Optimization", description: "Increases metabolic rate and energy expenditure, promoting efficient fat oxidation and improved body composition.", link: "https://doi.org/10.1016/j.metabol.2008.11.017" },
    { iconName: "Droplets", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "Lipogenesis Inhibition", description: "Prevents new fat formation by inhibiting lipogenic pathways, reducing triglyceride accumulation in adipocytes.", link: "https://doi.org/10.1111/j.1365-2826.2009.01848.x" },
    { iconName: "Activity", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "No Insulin Disruption", description: "Promotes fat loss without affecting insulin sensitivity or glucose metabolism, unlike full-length growth hormone.", link: "https://doi.org/10.1210/endo.142.4.8082" },
    { iconName: "Zap", iconBgClass: "bg-yellow-100 dark:bg-yellow-900/30", title: "Energy Enhancement", description: "Increases cellular energy production through enhanced mitochondrial fatty acid oxidation and ATP synthesis.", link: "https://doi.org/10.1038/sj.ijo.0803408" },
    { iconName: "Heart", iconBgClass: "bg-red-100 dark:bg-red-900/30", title: "Cardiovascular Support", description: "Reduces visceral adiposity and improves lipid profiles, supporting cardiovascular health and metabolic function.", link: "https://doi.org/10.1007/s11695-011-0560-5" }
  ],
  references: [
    "Heffernan MA, et al. The effects of human GH and its lipolytic fragment (AOD9604) on lipid metabolism following chronic treatment in obese mice and β3-AR knock-out mice. Endocrinology. 2001;142(12):5182-5189.",
    "Ng FM, et al. Growth hormone treatment of hypophysectomized rats increases the secretion of insulin-like growth factor-I. Endocrinology. 2000;141(8):3098-3103.",
    "Munro S, et al. AOD9604, a synthetic lipolytic peptide with high receptor binding affinity and in vivo efficacy. International Journal of Obesity. 2006;30(8):1217-1224."
  ],
  aboutParagraphs: [
    "AOD-9604 got its start in the late 1990s at Monash University in Australia. Researchers there had a simple question: could they get the fat-burning benefits of growth hormone without the side effects? They knew that growth hormone could help with weight loss, but it also caused problems with blood sugar and other issues they wanted to avoid.",
    "The team discovered something interesting. They found that just a small piece of the growth hormone molecule—specifically amino acids 176 to 191—seemed to do exactly what they wanted. This tiny fragment could target fat cells without messing with insulin or causing unwanted growth effects. They called it AOD-9604, short for Anti-Obesity Drug.",
    "Since then, AOD-9604 has been through multiple research studies and even some clinical trials. It caught the attention of labs worldwide looking for new ways to study fat metabolism. Today, it remains one of the most well-documented peptide fragments used in metabolic research. This product is intended for research use only."
  ],
  howItWorksIntro: "AOD-9604 provides targeted fat loss by activating the same fat-burning pathways as growth hormone, but without affecting blood sugar, insulin sensitivity, or causing tissue growth. This makes it an exceptionally safe option for body composition optimization.",
  howItWorksAccordions: [
    { value: "receptor", iconName: "Target", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "Beta-3 Adrenergic Receptor Activation", content: "AOD-9604 selectively binds to and activates beta-3 adrenergic receptors located predominantly in adipose tissue. This activation triggers a cascade of intracellular signaling events that promote lipolysis through increased cAMP production and activation of hormone-sensitive lipase." },
    { value: "lipolysis", iconName: "Flame", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "Enhanced Lipolytic Activity", content: "The peptide significantly increases the rate of lipolysis by upregulating hormone-sensitive lipase and adipose triglyceride lipase activity. The released fatty acids are transported to mitochondria for beta-oxidation, generating ATP and promoting overall fat loss." },
    { value: "lipogenesis", iconName: "TrendingDown", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "Lipogenesis Inhibition", content: "AOD-9604 inhibits de novo lipogenesis by downregulating key lipogenic enzymes including fatty acid synthase and acetyl-CoA carboxylase. This dual action creates a powerful synergistic effect for body composition improvement." }
  ],
  technicalPathways: [
    "Beta-3 adrenergic receptor binding → Gs protein activation → adenylyl cyclase stimulation → increased cAMP levels",
    "Elevated cAMP → protein kinase A (PKA) activation → phosphorylation of hormone-sensitive lipase (HSL)",
    "Activated HSL → triglyceride hydrolysis → free fatty acid and glycerol release",
    "Free fatty acids → mitochondrial transport via CPT1 → beta-oxidation → acetyl-CoA production"
  ]
};

// BPC-157
export const BPC157Data: PeptidePageData = {
  slug: "bpc-157",
  peptideName: "BPC-157",
  productImage: "/products/bpc-157.webp",
  subtitle: "A peptide studied in laboratory settings for tissue regeneration and healing mechanisms",
  description: "BPC-157 is a short chain of amino acids, a peptide naturally found in gastric juice. It's often called a 'body protection compound' due to its wide-ranging potential benefits, particularly in tissue repair and inflammation modulation.",
  casNumber: "137525-51-0",
  molecularFormula: "C₆₂H₉₈N₁₆O₂₂",
  molarMass: "1419.55 g/mol",
  prices: { "10mg": 104 },
  showInfoCard: true,
  infoCardText: "All products are shipped in lyophilized or powder form and must be reconstituted to a liquid for research and testing. We are unable to provide any dosing instructions, however all products should be considered pharmaceutical grade.",
  benefits: [
    { iconName: "Zap", iconBgClass: "bg-yellow-100 dark:bg-yellow-900/30", title: "Tissue Regeneration", description: "Investigated in preclinical models for its effects on muscle, tendon, and ligament tissue repair mechanisms", link: "(Preclinical Study)" },
    { iconName: "Heart", iconBgClass: "bg-red-100 dark:bg-red-900/30", title: "Wound Healing", description: "Examined in animal wound models for observations related to tissue closure and ulcer repair pathways", link: "(Preclinical Study)" },
    { iconName: "Shield", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "Anti-inflammatory Effects", description: "Studied in laboratory research for interactions with inflammation-related signaling pathways across various tissue types", link: "(Preclinical Study)" },
    { iconName: "Activity", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "Gastrointestinal Protection", description: "Evaluated in preclinical GI tissue models for observations related to gastric and intestinal mucosal integrity", link: "(Preclinical Study)" },
    { iconName: "TrendingDown", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "Nociceptive Research", description: "Investigated in animal studies examining nociceptive pathways and pain-related behavioral models", link: "(Preclinical Study)" },
    { iconName: "Brain", iconBgClass: "bg-pink-100 dark:bg-pink-900/30", title: "Nerve Tissue Research", description: "Studied in preclinical models examining nerve tissue regeneration and neuronal repair mechanisms", link: "(Preclinical Study)" }
  ],
  references: [
    "Chang CH, et al. Pentadecapeptide BPC 157 enhances the growth hormone receptor expression in tendon fibroblasts. Molecules. 2014.",
    "Staresinic M, et al. BPC 157 accelerates healing of transected rat Achilles tendon and in vitro stimulates tendocyte growth and VEGF secretion. Journal of Orthopaedic Research. 2003.",
    "Sikiric P, et al. Stable gastric pentadecapeptide BPC 157: novel therapy in gastrointestinal tract. Current Pharmaceutical Design. 2011.",
    "Sikiric P. The effect of pentadecapeptide BPC 157 on gastrointestinal tract. Journal of Physiology and Pharmacology. 2013."
  ],
  aboutParagraphs: [
    "BPC-157, short for \"Body Protection Compound-157,\" was first identified during research on human gastric juice in the early 1990s. Croatian researchers at the University of Zagreb, led by Dr. Predrag Sikirić, originally isolated this sequence from a larger protective protein found naturally in the stomach—which is where the \"Body Protection Compound\" name originated.",
    "Over the past three decades, BPC-157 has become one of the more extensively studied peptides in preclinical research. Hundreds of peer-reviewed publications have examined its interactions with various biological systems, including nitric oxide pathways, growth factor signaling, and angiogenic processes.",
    "Research interest has spanned multiple biological systems—from gastrointestinal and musculoskeletal models to neurological and vascular studies. While preclinical data has accumulated over 30+ years, it's worth noting that human clinical trials remain limited, and most published findings come from animal or in vitro studies."
  ],
  howItWorksIntro: "Preclinical studies have examined BPC-157's interactions with several molecular pathways in cell culture and animal models. Published investigations suggest involvement in angiogenesis-related signaling, vascular function, cellular migration processes, and inflammatory response modulation.",
  howItWorksAccordions: [
    { value: "vegfr2", iconName: "Activity", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "VEGFR2 Activation & Angiogenesis", content: "In preclinical models, BPC-157 has been observed to bind to VEGFR2 on endothelial cells, initiating a phosphorylation cascade that activates MAPK/ERK and PI3K/Akt pathways. Studies suggest this may stimulate endothelial cell proliferation, migration, and tube formation." },
    { value: "nitric-oxide", iconName: "Zap", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "Nitric Oxide System Modulation", content: "Preclinical research indicates BPC-157 has been associated with upregulation of endothelial nitric oxide synthase (eNOS) expression in laboratory models. Published studies suggest this may increase nitric oxide (NO) bioavailability." },
    { value: "fak-signaling", iconName: "Workflow", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "FAK Signaling & Cell Migration", content: "Laboratory studies have observed that BPC-157 may activate Focal Adhesion Kinase (FAK) through phosphorylation at Tyr397, potentially triggering recruitment of Src family kinases and downstream effectors." },
    { value: "growth-factors", iconName: "Signal", iconBgClass: "bg-orange-100 dark:bg-orange-900/30", title: "Growth Factor Interactions", content: "Research has investigated BPC-157's interactions with various growth factors including EGF, FGF, and TGF-β pathways. These studies have examined potential effects on cellular proliferation and tissue remodeling." }
  ]
};

// IGF-1 LR3
export const IGF1LR3Data: PeptidePageData = {
  slug: "igf-1-lr3",
  peptideName: "IGF-1 LR3",
  productImage: "/products/igf-1-lr3.webp",
  subtitle: "A peptide studied in laboratory settings for cellular growth, proliferation, and tissue development",
  description: "IGF-1 LR3 (Insulin-like Growth Factor-1 Long R3) is a modified version of human IGF-1 with an extended half-life. The 'Long' refers to a 13 amino acid extension at the N-terminus, and 'R3' indicates an arginine substitution at position 3, which reduces binding to IGF binding proteins.",
  casNumber: "946870-92-4",
  molecularFormula: "C₄₀₀H₆₂₅N₁₁₁O₁₁₅S₉",
  molarMass: "9111.3 g/mol",
  prices: { "1mg": 90 },
  showInfoCard: true,
  infoCardText: "All products are shipped in lyophilized or powder form and must be reconstituted to a liquid for research and testing. We are unable to provide any dosing instructions, however all products should be considered pharmaceutical grade.",
  benefits: [
    { iconName: "TrendingUp", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "Growth & Organ Effects (Preclinical)", description: "Preclinical study demonstrating LR3 IGF-I infusion stimulates organ growth (adrenals, gut, kidneys, spleen) in guinea pig models", link: "(Preclinical Study)" },
    { iconName: "Heart", iconBgClass: "bg-red-100 dark:bg-red-900/30", title: "Cardiac Cell Signaling / Proliferation Pathways (Preclinical)", description: "Investigation of LR3 IGF-1's stimulation of cardiomyocyte proliferation through ERK and PI3K signaling cascades in fetal sheep", link: "(Preclinical Study)" },
    { iconName: "Activity", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "Mammary Gland Signaling / Lactation Biology (Preclinical)", description: "Study of LR3-IGF-I effects on mammary phospho-Akt signaling, SOCS3 gene expression, and lactation capacity in mice", link: "(Preclinical Study)" },
    { iconName: "Brain", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "CNS Delivery / Neurodegeneration Model (Preclinical)", description: "Investigation of intranasal LR3-IGF-1 treatment on amyloid plaque remodeling in Alzheimer's disease mouse model", link: "(Preclinical Study)" }
  ],
  references: [
    "Francis GL, et al. Novel recombinant fusion protein analogues of insulin-like growth factor (IGF)-I indicate the relative importance of IGF-binding protein and receptor binding for enhanced biological potency. Journal of Molecular Endocrinology. 1992;8(3):213-223.",
    "Tomas FM, et al. Insulin-like growth factor-I (IGF-I) and especially IGF-I variants are anabolic in dexamethasone-treated rats. Biochemical Journal. 1992;282(Pt 1):91-97.",
    "Ballard FJ, et al. Does IGF-I ever act through the insulin receptor? Cytokine & Growth Factor Reviews. 2007;18(1-2):7-12."
  ],
  aboutParagraphs: [
    "IGF-1 LR3 emerged from research efforts in the late 1980s and early 1990s to create more potent versions of insulin-like growth factor. Scientists at GroPep in Adelaide, Australia, were among the first to develop this modified peptide, seeking to overcome the limitations of native IGF-1, which is rapidly bound by circulating proteins and cleared from circulation.",
    "The key innovation was twofold: adding 13 extra amino acids to the beginning of the peptide sequence and swapping out glutamic acid for arginine at position 3. These changes dramatically reduced binding to IGF binding proteins (IGFBPs), which normally sequester and inactivate IGF-1. The result was a peptide with significantly enhanced potency and duration of action in research applications.",
    "Since its development, IGF-1 LR3 has become widely used in cell culture research and animal studies examining growth factor biology. Its extended bioavailability makes it particularly valuable for studying IGF-1 signaling pathways without the confounding effects of binding protein interactions. This product is intended for research use only."
  ],
  howItWorksIntro: "Preclinical studies have examined IGF-1 LR3's interactions with the IGF-1 receptor and downstream signaling cascades. Published investigations suggest potent activation of cellular growth pathways with reduced binding protein sequestration compared to native IGF-1.",
  howItWorksAccordions: [
    { value: "receptor", iconName: "Target", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "IGF-1 Receptor Binding", content: "IGF-1 LR3 binds to the IGF-1 receptor (IGF-1R), a receptor tyrosine kinase present on most cell types. Upon binding, the receptor undergoes autophosphorylation, initiating intracellular signaling cascades that regulate cell growth, survival, and metabolism." },
    { value: "pi3k-akt", iconName: "Workflow", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "PI3K/Akt Pathway Activation", content: "Receptor activation triggers phosphorylation of insulin receptor substrates (IRS-1/2), which recruit and activate phosphoinositide 3-kinase (PI3K). This generates PIP3, leading to Akt activation and downstream effects on protein synthesis, glucose uptake, and cell survival." },
    { value: "mapk", iconName: "Signal", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "MAPK/ERK Signaling", content: "Parallel to PI3K signaling, IGF-1R activation stimulates the Ras-Raf-MEK-ERK cascade through Grb2/SOS recruitment. This MAPK pathway primarily drives cellular proliferation and differentiation responses in target tissues." },
    { value: "protein-synthesis", iconName: "Zap", iconBgClass: "bg-orange-100 dark:bg-orange-900/30", title: "mTOR and Protein Synthesis", content: "Akt activation leads to mTORC1 stimulation, which phosphorylates S6K1 and 4E-BP1. These downstream effectors enhance ribosomal biogenesis, cap-dependent translation initiation, and overall protein synthesis capacity." }
  ],
  technicalPathways: [
    "IGF-1R binding → receptor autophosphorylation → IRS-1/2 recruitment and phosphorylation",
    "IRS phosphorylation → PI3K activation → PIP2 to PIP3 conversion → PDK1 and Akt activation",
    "Akt → TSC1/2 inhibition → Rheb activation → mTORC1 stimulation → S6K1/4E-BP1 phosphorylation",
    "Grb2/SOS → Ras-GTP → Raf → MEK → ERK → nuclear translocation → gene transcription"
  ]
};

// Tesamorelin
export const TesamorelinData: PeptidePageData = {
  slug: "tesamorelin",
  peptideName: "Tesamorelin",
  productImage: "/products/tesamorelin.webp",
  subtitle: "A peptide studied in laboratory settings for growth hormone releasing activity and body composition",
  description: "Tesamorelin is a synthetic peptide analog of growth hormone-releasing hormone (GHRH), consisting of 44 amino acids. It stimulates the pituitary gland to produce and release growth hormone through specific receptor binding.",
  casNumber: "218949-48-5",
  molecularFormula: "C₂₂₁H₃₆₆N₇₂O₆₇S₁",
  molarMass: "5135.9 g/mol",
  prices: { "10mg": 105 },
  benefits: [
    { iconName: "Flame", iconBgClass: "bg-orange-100 dark:bg-orange-900/30", title: "Visceral Adipose Tissue (VAT) Research — Human", description: "Investigated in clinical trials for effects on visceral fat reduction in HIV-associated lipodystrophy", link: "https://pubmed.ncbi.nlm.nih.gov/18057338/" },
    { iconName: "Heart", iconBgClass: "bg-red-100 dark:bg-red-900/30", title: "Cardiometabolic Risk Markers & Lipids — Human", description: "Examined in human studies for effects on triglycerides, cholesterol ratios, and metabolic markers", link: "https://pubmed.ncbi.nlm.nih.gov/20554713/" },
    { iconName: "Activity", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "Hepatic Fat / NAFLD in HIV Models — Human", description: "Studied in clinical trials for effects on liver fat and hepatic steatosis in HIV populations", link: "https://pubmed.ncbi.nlm.nih.gov/25038357/" },
    { iconName: "TrendingUp", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "IGF-1 Modulation via GHRH Analog Signaling — Human", description: "Investigated for effects on IGF-1 axis through growth hormone-releasing hormone receptor activation", link: "https://pubmed.ncbi.nlm.nih.gov/21715524/" }
  ],
  references: [
    "Falutz J, et al. Metabolic effects of a growth hormone-releasing factor in patients with HIV. New England Journal of Medicine. 2007.",
    "Stanley TL, et al. Effect of tesamorelin on visceral fat and liver fat in HIV-infected patients. JAMA. 2014.",
    "Falutz J, et al. Tesamorelin reduces trunk fat in HIV-infected patients. Journal of Clinical Endocrinology & Metabolism. 2007.",
    "Makimura H, et al. The effects of tesamorelin on hepatic triglyceride content. Journal of Clinical Endocrinology & Metabolism. 2015."
  ],
  aboutParagraphs: [
    "Tesamorelin was developed in the early 2000s by Theratechnologies, a Canadian pharmaceutical company based in Montreal. The research team was looking for a stable, effective way to stimulate natural growth hormone release, building on decades of earlier work with growth hormone-releasing hormone (GHRH) analogs.",
    "What made Tesamorelin unique was its enhanced stability compared to native GHRH. By adding a trans-3-hexenoic acid group to the tyrosine at position 1, scientists created a peptide that resisted enzymatic breakdown while maintaining full biological activity. This modification allowed for once-daily administration in research protocols.",
    "Tesamorelin gained particular attention in the late 2000s through studies examining its effects on body composition. It became the first GHRH analog to receive FDA approval for a specific indication in 2010, marking a significant milestone in peptide therapeutics research. Today it remains an important tool in growth hormone axis research. This product is intended for research use only."
  ],
  howItWorksIntro: "Preclinical studies have examined Tesamorelin's mechanism as a GHRH analog that binds to specific pituitary receptors to stimulate endogenous growth hormone synthesis and release in a pulsatile manner.",
  howItWorksAccordions: [
    { value: "receptor", iconName: "Target", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "GHRH Receptor Binding", content: "Tesamorelin binds with high affinity to the GHRH receptor (GHRHR) on somatotroph cells in the anterior pituitary. This G protein-coupled receptor activation initiates intracellular signaling cascades that stimulate growth hormone gene transcription and release." },
    { value: "camp", iconName: "Zap", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "cAMP-PKA Pathway", content: "GHRHR activation stimulates adenylyl cyclase via Gs protein coupling, increasing intracellular cAMP levels. Elevated cAMP activates protein kinase A (PKA), which phosphorylates CREB transcription factor to enhance GH gene expression." },
    { value: "pulsatile", iconName: "Activity", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "Pulsatile GH Release", content: "Unlike exogenous GH administration, Tesamorelin stimulates natural pulsatile GH secretion patterns. This preserves the physiological feedback mechanisms and maintains normal GH/IGF-1 axis regulation." },
    { value: "igf1", iconName: "TrendingUp", iconBgClass: "bg-orange-100 dark:bg-orange-900/30", title: "IGF-1 Axis Stimulation", content: "Increased GH release stimulates hepatic IGF-1 production. IGF-1 mediates many of the anabolic and metabolic effects attributed to growth hormone, including effects on lipid metabolism and body composition." }
  ],
  technicalPathways: [
    "Tesamorelin binding → GHRHR activation → Gs protein coupling → adenylyl cyclase stimulation",
    "cAMP elevation → PKA activation → CREB phosphorylation → GH gene transcription",
    "GH release → hepatic GH receptor binding → JAK2/STAT5 activation → IGF-1 gene expression",
    "IGF-1 secretion → IGF-1R activation → PI3K/Akt and MAPK pathway engagement"
  ]
};

// Sermorelin
export const SermorelinData: PeptidePageData = {
  slug: "sermorelin",
  peptideName: "Sermorelin",
  productImage: "/products/sermorelin.webp",
  subtitle: "A peptide studied in laboratory settings for growth hormone releasing activity and pituitary function",
  description: "Sermorelin is a synthetic peptide corresponding to the first 29 amino acids of human growth hormone-releasing hormone (GHRH 1-29). It represents the shortest fully functional fragment of GHRH that retains full biological activity.",
  casNumber: "86168-78-7",
  molecularFormula: "C₁₄₉H₂₄₆N₄₄O₄₂S",
  molarMass: "3357.9 g/mol",
  prices: { "5mg": 37 },
  benefits: [
    { iconName: "TrendingUp", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "Endogenous Growth Hormone Secretion — Human", description: "Investigated in clinical studies for effects on stimulating natural GH release from the pituitary gland", link: "https://pubmed.ncbi.nlm.nih.gov/2984445/" },
    { iconName: "Clock", iconBgClass: "bg-indigo-100 dark:bg-indigo-900/30", title: "Age-Related Somatotropic Axis Decline — Human", description: "Examined in human studies for observations on restoring GH axis function during aging", link: "https://pubmed.ncbi.nlm.nih.gov/1900401/" },
    { iconName: "Activity", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "Metabolic & Body Composition Signaling in Aging — Human", description: "Studied in clinical trials for effects on lean mass, insulin sensitivity, and metabolic parameters in aging adults", link: "https://pubmed.ncbi.nlm.nih.gov/9141536/" },
    { iconName: "Brain", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "Neurocognitive Function & Aging — Human", description: "Evaluated in randomized controlled trials for effects on cognitive function in healthy older adults and those with MCI", link: "https://pubmed.ncbi.nlm.nih.gov/16399214/" }
  ],
  references: [
    "Corpas E, et al. Growth hormone-releasing hormone and growth hormone secretagogues in clinical and experimental therapeutics. Hormone Research. 1993.",
    "Vittone J, et al. Effects of single nightly injections of growth hormone-releasing hormone (GHRH 1-29) in healthy elderly men. Metabolism. 1997.",
    "Steiger A, et al. Growth hormone-releasing hormone improves the quality of sleep. Experimental and Clinical Endocrinology & Diabetes. 1995.",
    "Walker RF. Sermorelin: A better approach to management of adult-onset growth hormone insufficiency? Clinical Interventions in Aging. 2006."
  ],
  aboutParagraphs: [
    "Sermorelin emerged from groundbreaking research in the late 1970s and early 1980s when scientists were racing to understand how the brain controls growth hormone release. The pivotal discovery came in 1982 when Roger Guillemin's team at the Salk Institute in California isolated and characterized the structure of growth hormone-releasing hormone from pancreatic tumors.",
    "Researchers quickly determined that the first 29 amino acids of the 44-amino acid GHRH molecule were sufficient for full biological activity. This truncated version, named Sermorelin (or GHRH 1-29), became the standard for research because it was easier and more economical to synthesize while maintaining identical receptor binding and signaling properties.",
    "Sermorelin became one of the first GHRH analogs to be extensively studied in clinical settings during the 1990s. Its relatively short half-life made it valuable for research into pulsatile GH release patterns. Today, it remains one of the most widely used peptides in growth hormone axis research due to its well-characterized pharmacology. This product is intended for research use only."
  ],
  howItWorksIntro: "Preclinical studies have examined Sermorelin's mechanism as the minimal active fragment of GHRH that binds to pituitary GHRH receptors to stimulate endogenous growth hormone synthesis and pulsatile release.",
  howItWorksAccordions: [
    { value: "receptor", iconName: "Target", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "GHRH Receptor Activation", content: "Sermorelin binds to GHRH receptors (GHRHR) on pituitary somatotroph cells with affinity equivalent to full-length GHRH. The receptor is a G protein-coupled receptor that initiates intracellular signaling upon ligand binding." },
    { value: "camp", iconName: "Zap", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "cAMP Signaling Cascade", content: "GHRHR activation couples to Gs proteins, stimulating adenylyl cyclase and elevating intracellular cAMP. This activates protein kinase A (PKA), leading to CREB phosphorylation and enhanced GH gene transcription." },
    { value: "calcium", iconName: "Activity", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "Calcium-Dependent Release", content: "cAMP signaling also opens voltage-gated calcium channels, increasing intracellular calcium concentrations. This calcium influx triggers exocytosis of stored GH-containing secretory granules from somatotrophs." },
    { value: "feedback", iconName: "RefreshCw", iconBgClass: "bg-orange-100 dark:bg-orange-900/30", title: "Preserved Feedback Regulation", content: "Unlike exogenous GH, Sermorelin preserves natural negative feedback mechanisms. Elevated GH and IGF-1 levels appropriately suppress further GHRH responsiveness, maintaining physiological regulation." }
  ],
  technicalPathways: [
    "Sermorelin binding → GHRHR conformational change → Gs protein activation → adenylyl cyclase stimulation",
    "cAMP elevation → PKA activation → CREB phosphorylation → Pit-1 activation → GH gene transcription",
    "cAMP → L-type calcium channel opening → Ca²⁺ influx → secretory granule exocytosis → GH release",
    "GH → hepatic JAK2/STAT5 → IGF-1 synthesis → negative feedback on hypothalamus and pituitary"
  ]
};

// Cagrilintide
export const CagrilintideData: PeptidePageData = {
  slug: "cagrilintide",
  peptideName: "Cagrilintide",
  productImage: "/products/cagrilintide.webp",
  subtitle: "A peptide studied in laboratory settings for amylin receptor agonism and metabolic regulation",
  description: "Cagrilintide is a long-acting acylated amylin analog designed for once-weekly administration. It activates amylin receptors to modulate appetite, gastric emptying, and glucose homeostasis through mechanisms distinct from GLP-1 receptor agonists.",
  casNumber: "2170752-57-1",
  molecularFormula: "C₂₀₆H₃₀₆N₅₆O₆₄S₂",
  molarMass: "4693.0 g/mol",
  prices: { "10mg": 212 },
  benefits: [
    { iconName: "TrendingDown", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "Appetite Regulation", description: "Investigated in preclinical models for its effects on satiety signaling and food intake reduction", link: "(Preclinical Study)" },
    { iconName: "Flame", iconBgClass: "bg-orange-100 dark:bg-orange-900/30", title: "Weight Management Research", description: "Examined in laboratory studies for observations related to body weight and adipose tissue changes", link: "(Preclinical Study)" },
    { iconName: "Activity", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "Gastric Motility", description: "Studied for effects on gastric emptying rate and post-meal glucose excursions", link: "(Preclinical Study)" },
    { iconName: "Zap", iconBgClass: "bg-yellow-100 dark:bg-yellow-900/30", title: "Glucagon Suppression", description: "Evaluated in research models examining post-prandial glucagon secretion inhibition", link: "(Preclinical Study)" },
    { iconName: "Clock", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "Extended Duration", description: "Engineered with acylation for prolonged half-life enabling once-weekly research dosing protocols", link: "(Preclinical Study)" },
    { iconName: "Brain", iconBgClass: "bg-pink-100 dark:bg-pink-900/30", title: "Central Signaling", description: "Investigated for CNS-mediated effects on energy balance through area postrema activation", link: "(Preclinical Study)" }
  ],
  references: [
    "Lau DCW, et al. Once-weekly cagrilintide for weight management in people with overweight and obesity. Lancet. 2021.",
    "Enebo LB, et al. Safety, tolerability, pharmacokinetics of cagrilintide with semaglutide. Lancet. 2021.",
    "Hay DL, et al. Amylin: Pharmacology, Physiology, and Clinical Potential. Pharmacological Reviews. 2015.",
    "Lutz TA. Amylinergic control of food intake. Physiology & Behavior. 2006."
  ],
  aboutParagraphs: [
    "Cagrilintide was developed by Novo Nordisk in the late 2010s as part of their research into next-generation metabolic therapies. Scientists were looking to harness the appetite-suppressing effects of amylin, a hormone co-secreted with insulin from pancreatic beta cells, which had long been recognized for its role in satiety but was limited by its very short half-life.",
    "The breakthrough came through strategic acylation—attaching a fatty acid chain to the peptide backbone. This modification dramatically extended the molecule's duration of action by promoting albumin binding in circulation, allowing for once-weekly administration rather than multiple daily injections required by native amylin.",
    "Cagrilintide has garnered significant research interest both as a standalone compound and in combination studies with GLP-1 receptor agonists. The rationale for combination research is that amylin and GLP-1 pathways are complementary, potentially offering enhanced effects through dual receptor engagement. This product is intended for research use only."
  ],
  howItWorksIntro: "Preclinical studies have examined Cagrilintide's mechanism as a long-acting amylin receptor agonist that activates calcitonin receptor/RAMP complexes in the brain to reduce appetite and slow gastric emptying.",
  howItWorksAccordions: [
    { value: "receptor", iconName: "Target", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "Amylin Receptor Activation", content: "Cagrilintide binds to amylin receptors (AMY1, AMY2, AMY3), which are heterodimers of the calcitonin receptor (CTR) with receptor activity-modifying proteins (RAMPs). These receptors are highly expressed in the area postrema and other hindbrain regions." },
    { value: "satiety", iconName: "Brain", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "Central Satiety Signaling", content: "Activation of amylin receptors in the area postrema, a circumventricular organ outside the blood-brain barrier, triggers neuronal signaling to hypothalamic appetite centers. This reduces meal size and overall food intake through enhanced satiation." },
    { value: "gastric", iconName: "Activity", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "Gastric Emptying Modulation", content: "Amylin receptor activation slows gastric emptying through vagal efferent pathways. This delays nutrient absorption, reducing post-meal glucose spikes and prolonging feelings of fullness after eating." },
    { value: "glucagon", iconName: "TrendingDown", iconBgClass: "bg-orange-100 dark:bg-orange-900/30", title: "Glucagon Suppression", content: "Cagrilintide suppresses post-prandial glucagon secretion from pancreatic alpha cells. This reduces hepatic glucose output after meals, contributing to improved glycemic control in metabolic research models." }
  ],
  technicalPathways: [
    "Cagrilintide binding → CTR/RAMP complex activation → Gs protein coupling → cAMP elevation",
    "Area postrema activation → nucleus tractus solitarius signaling → hypothalamic integration → reduced appetite",
    "Vagal efferent activation → pyloric contraction → delayed gastric emptying → prolonged satiety",
    "Pancreatic alpha cell receptor activation → reduced glucagon secretion → decreased hepatic glucose output"
  ]
};

// GLP-3RT (formerly Retatrutide)
export const RetatrutideData: PeptidePageData = {
  slug: "retatrutide",
  peptideName: "GLP-3RT",
  productImage: "/products/glp-3rt-12mg.webp",
  subtitle: "A peptide studied in laboratory settings for triple incretin receptor agonism and metabolic regulation",
  description: "GLP-3RT (LY3437943) is a novel triple agonist peptide that activates GLP-1, GIP, and glucagon receptors simultaneously. This unique mechanism engages three complementary metabolic pathways for enhanced effects on energy balance and glucose homeostasis.",
  casNumber: "2381089-83-2",
  molecularFormula: "C₂₂₅H₃₄₈N₆₀O₆₈S",
  molarMass: "5104.6 g/mol",
  prices: { "12mg": 170, "24mg": 340 },
  benefits: [
    { iconName: "Flame", iconBgClass: "bg-orange-100 dark:bg-orange-900/30", title: "Triple Receptor Agonism", description: "Investigated for simultaneous activation of GLP-1, GIP, and glucagon receptors in preclinical models", link: "(Preclinical Study)" },
    { iconName: "TrendingDown", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "Weight Research", description: "Examined in laboratory studies for observations related to significant body weight changes", link: "(Preclinical Study)" },
    { iconName: "Activity", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "Glucose Homeostasis", description: "Studied for effects on insulin secretion, glucose uptake, and glycemic control mechanisms", link: "(Preclinical Study)" },
    { iconName: "Zap", iconBgClass: "bg-yellow-100 dark:bg-yellow-900/30", title: "Energy Expenditure", description: "Evaluated in research models examining metabolic rate and thermogenic pathways via glucagon signaling", link: "(Preclinical Study)" },
    { iconName: "Heart", iconBgClass: "bg-red-100 dark:bg-red-900/30", title: "Hepatic Research", description: "Investigated for effects on liver fat content and hepatic metabolic parameters", link: "(Preclinical Study)" },
    { iconName: "Brain", iconBgClass: "bg-pink-100 dark:bg-pink-900/30", title: "Appetite Regulation", description: "Examined for CNS-mediated effects on satiety and food intake through incretin pathways", link: "(Preclinical Study)" }
  ],
  references: [
    "Jastreboff AM, et al. Triple-hormone-receptor agonist retatrutide for obesity — A phase 2 trial. New England Journal of Medicine. 2023;389(6):514-526.",
    "Rosenstock J, et al. Retatrutide, a GIP, GLP-1 and glucagon receptor agonist, for people with type 2 diabetes. Lancet. 2023;402(10401):529-544.",
    "Coskun T, et al. LY3437943, a novel triple glucagon, GIP, GLP-1 receptor agonist for glycemic control and weight loss. Cell Metabolism. 2022;34(8):1234-1247."
  ],
  aboutParagraphs: [
    "GLP-3RT was developed by Eli Lilly and Company, emerging from their extensive research into incretin-based therapies. Building on the success of dual agonists like tirzepatide, Lilly scientists hypothesized that adding glucagon receptor activation could further enhance metabolic effects by increasing energy expenditure—something the other incretin hormones don't directly address.",
    "The key innovation was engineering a single molecule capable of activating three distinct but related receptors with carefully balanced potency. Glucagon, while traditionally viewed as a hormone that raises blood sugar, also powerfully stimulates hepatic fat oxidation and thermogenesis. By combining this with the appetite-suppressing and insulin-sensitizing effects of GLP-1 and GIP agonism, researchers created a comprehensive approach to metabolic modulation.",
    "Early clinical data published in 2023 generated significant scientific interest, with phase 2 trials demonstrating unprecedented effects on body weight. GLP-3RT represents the cutting edge of incretin pharmacology research and continues to be studied in ongoing clinical programs. This product is intended for research use only."
  ],
  howItWorksIntro: "Preclinical studies have examined GLP-3RT's unique mechanism as the first triple agonist engaging GLP-1, GIP, and glucagon receptors simultaneously for synergistic metabolic effects.",
  howItWorksAccordions: [
    { value: "glp1", iconName: "Target", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "GLP-1 Receptor Activation", content: "GLP-3RT activates GLP-1 receptors on pancreatic beta cells and in the CNS. This stimulates glucose-dependent insulin secretion, suppresses appetite through hypothalamic signaling, and slows gastric emptying to reduce post-meal glucose excursions." },
    { value: "gip", iconName: "Zap", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "GIP Receptor Agonism", content: "GIP receptor activation enhances insulin secretion and promotes adipocyte lipid storage efficiency. In combination with GLP-1 agonism, GIP signaling may improve beta cell function and contribute to improved glucose tolerance and metabolic flexibility." },
    { value: "glucagon", iconName: "Flame", iconBgClass: "bg-orange-100 dark:bg-orange-900/30", title: "Glucagon Receptor Engagement", content: "Unlike other incretins, glucagon receptor activation increases hepatic fatty acid oxidation, stimulates thermogenesis, and elevates energy expenditure. This provides an additional mechanism for reducing body fat beyond appetite suppression alone." },
    { value: "synergy", iconName: "Workflow", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "Triple Synergy", content: "The three receptor systems work synergistically: GLP-1 and GIP enhance insulin secretion while GLP-1 suppresses glucagon's hyperglycemic effects. Meanwhile, glucagon's thermogenic actions complement the appetite-suppressing effects of GLP-1 for comprehensive metabolic modulation." }
  ],
  technicalPathways: [
    "GLP-1R activation → pancreatic beta cell cAMP → insulin secretion; hypothalamic signaling → reduced appetite",
    "GIPR activation → enhanced beta cell function → improved glucose-stimulated insulin secretion",
    "Glucagon receptor activation → hepatic cAMP → increased fatty acid oxidation → thermogenesis",
    "Combined signaling → improved glycemic control + increased energy expenditure + reduced food intake"
  ]
};

// MOTS-C
export const MOTSCData: PeptidePageData = {
  slug: "mots-c",
  peptideName: "MOTS-C",
  productImage: "/products/mots-c.webp",
  subtitle: "A peptide studied in laboratory settings for mitochondrial function and metabolic homeostasis",
  description: "MOTS-C (Mitochondrial Open Reading Frame of the 12S rRNA-C) is a 16 amino acid peptide encoded within the mitochondrial genome. It represents a novel class of mitochondrial-derived peptides (MDPs) that act as signaling molecules affecting cellular metabolism.",
  casNumber: "1627580-64-6",
  molecularFormula: "C₁₀₁H₁₅₂N₂₈O₂₃S₂",
  molarMass: "2174.6 g/mol",
  prices: { "10mg": 65 },
  benefits: [
    { iconName: "Battery", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "Mitochondrial Signaling", description: "Investigated in preclinical models as a mitochondrial-derived peptide affecting cellular energy metabolism", link: "(Preclinical Study)" },
    { iconName: "Activity", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "Metabolic Regulation", description: "Examined in laboratory studies for observations related to glucose uptake and insulin sensitivity", link: "(Preclinical Study)" },
    { iconName: "Dumbbell", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "Exercise Mimetic", description: "Studied for AMPK activation and metabolic adaptations similar to physical exercise", link: "(Preclinical Study)" },
    { iconName: "Clock", iconBgClass: "bg-yellow-100 dark:bg-yellow-900/30", title: "Longevity Research", description: "Evaluated in aging research models examining healthspan and metabolic decline", link: "(Preclinical Study)" },
    { iconName: "Flame", iconBgClass: "bg-orange-100 dark:bg-orange-900/30", title: "Fat Metabolism", description: "Investigated for effects on lipid oxidation and adipose tissue metabolism", link: "(Preclinical Study)" },
    { iconName: "Shield", iconBgClass: "bg-red-100 dark:bg-red-900/30", title: "Cellular Stress Response", description: "Examined for protective effects against metabolic stress and cellular dysfunction", link: "(Preclinical Study)" }
  ],
  references: [
    "Lee C, et al. The mitochondrial-derived peptide MOTS-c promotes metabolic homeostasis and reduces obesity and insulin resistance. Cell Metabolism. 2015;21(3):443-454.",
    "Kim KH, et al. MOTS-c: A mitochondrial-encoded regulator of the nucleus during metabolic stress. Journal of the American Society of Nephrology. 2018;29(10):2367-2369.",
    "Reynolds JC, et al. MOTS-c is an exercise-induced mitochondrial-encoded regulator of age-dependent physical decline and muscle homeostasis. Nature Communications. 2021;12(1):470."
  ],
  aboutParagraphs: [
    "MOTS-C was discovered in 2015 by Dr. Pinchas Cohen and his research team at the University of Southern California's Leonard Davis School of Gerontology. The discovery was groundbreaking because it revealed that mitochondria—long thought to be mere cellular power plants—actually encode signaling peptides that communicate with the rest of the cell and body.",
    "The peptide's name reflects its origin: MOTS-C stands for Mitochondrial Open Reading Frame of the 12S rRNA type-C. It's a 16 amino acid sequence hidden within what was previously considered non-coding mitochondrial DNA. This discovery opened an entirely new field of research into mitochondrial-derived peptides (MDPs) and their roles in metabolism and aging.",
    "Research has shown that MOTS-C levels decline with age and that the peptide can activate AMPK, a master metabolic regulator often called the 'exercise enzyme.' Studies in mice have demonstrated effects on insulin sensitivity, fat metabolism, and exercise capacity, making it a subject of intense interest in aging and metabolic research. This product is intended for research use only."
  ],
  howItWorksIntro: "Preclinical studies have examined MOTS-C's mechanism as a mitochondrial-derived signaling peptide that translocates to the nucleus during metabolic stress to regulate gene expression and activate AMPK-dependent metabolic pathways.",
  howItWorksAccordions: [
    { value: "ampk", iconName: "Zap", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "AMPK Activation", content: "MOTS-C activates AMP-activated protein kinase (AMPK), a central metabolic sensor. AMPK activation promotes glucose uptake, fatty acid oxidation, and mitochondrial biogenesis while inhibiting anabolic processes that consume ATP." },
    { value: "nuclear", iconName: "Target", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "Nuclear Translocation", content: "Under metabolic stress conditions, MOTS-C translocates from cytoplasm to nucleus where it regulates gene expression. This retrograde signaling represents a novel communication pathway between mitochondria and nuclear genome." },
    { value: "folate", iconName: "Activity", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "Folate-Methionine Cycle", content: "MOTS-C influences the folate cycle and de novo purine biosynthesis. By modulating one-carbon metabolism, it affects cellular methylation patterns and nucleotide availability, with downstream effects on metabolism and gene expression." },
    { value: "insulin", iconName: "TrendingUp", iconBgClass: "bg-orange-100 dark:bg-orange-900/30", title: "Insulin Sensitivity", content: "Through AMPK activation and metabolic reprogramming, MOTS-C enhances skeletal muscle glucose uptake and whole-body insulin sensitivity. This occurs partly through increased GLUT4 translocation to the cell membrane." }
  ],
  technicalPathways: [
    "MOTS-C expression → cytoplasmic accumulation → AMPK activation → metabolic gene regulation",
    "Metabolic stress → MOTS-C nuclear translocation → chromatin binding → adaptive gene expression",
    "AMPK activation → ACC inhibition → increased fatty acid oxidation → enhanced energy production",
    "AMPK → GLUT4 translocation → increased glucose uptake → improved insulin sensitivity"
  ]
};

// Selank
export const SelankData: PeptidePageData = {
  slug: "selank",
  peptideName: "Selank",
  productImage: "/products/selank.webp",
  subtitle: "A peptide studied in laboratory settings for anxiolytic activity and cognitive function",
  description: "Selank is a synthetic heptapeptide derived from the endogenous tetrapeptide tuftsin with an additional Pro-Gly-Pro sequence. Developed in Russia, it has been extensively studied for its effects on anxiety-related behaviors and cognitive processes.",
  casNumber: "129954-34-3",
  molecularFormula: "C₃₃H₅₇N₁₁O₉",
  molarMass: "751.9 g/mol",
  prices: { "10mg": 75 },
  benefits: [
    { iconName: "Brain", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "Anxiolytic Research", description: "Investigated in preclinical models for effects on anxiety-related behaviors and stress responses", link: "(Preclinical Study)" },
    { iconName: "Lightbulb", iconBgClass: "bg-yellow-100 dark:bg-yellow-900/30", title: "Cognitive Enhancement", description: "Examined in laboratory studies for observations related to memory formation and learning processes", link: "(Preclinical Study)" },
    { iconName: "Shield", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "Immunomodulation", description: "Studied for effects on immune function through its tuftsin-derived structure", link: "(Preclinical Study)" },
    { iconName: "Activity", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "GABA Modulation", description: "Evaluated in research models examining GABAergic neurotransmission and receptor interactions", link: "(Preclinical Study)" },
    { iconName: "Heart", iconBgClass: "bg-red-100 dark:bg-red-900/30", title: "Neuroprotection", description: "Investigated for potential protective effects on neuronal cells under stress conditions", link: "(Preclinical Study)" },
    { iconName: "Zap", iconBgClass: "bg-orange-100 dark:bg-orange-900/30", title: "BDNF Expression", description: "Examined for effects on brain-derived neurotrophic factor and neurotrophic signaling", link: "(Preclinical Study)" }
  ],
  references: [
    "Seredenin SB, et al. Anxiolytic action of the synthetic peptide Selank. Bulletin of Experimental Biology and Medicine. 1998.",
    "Kozlovskii II, et al. The optimizing action of the synthetic peptide Selank on a conditioned active avoidance reflex in rats. Neuroscience and Behavioral Physiology. 2003.",
    "Zozulia AA, et al. Effects of Selank on the immunity status in patients with generalized anxiety disorder. Zhurnal Nevrologii i Psikhiatrii. 2008."
  ],
  aboutParagraphs: [
    "Selank was developed in the late 1990s at the Institute of Molecular Genetics of the Russian Academy of Sciences, under the direction of Nikolai Myasoedov. The research team was exploring derivatives of tuftsin, an immunomodulatory tetrapeptide naturally found in the body as part of the immunoglobulin G heavy chain.",
    "The scientists added a Pro-Gly-Pro sequence to tuftsin, creating a more stable heptapeptide that could cross biological barriers more effectively. This modification not only preserved the immune-modulating properties of the parent compound but also revealed unexpected effects on the central nervous system, particularly on anxiety-related behaviors.",
    "Selank became one of the first 'nootropic' peptides developed in Russia and was eventually approved there for clinical use. It has been the subject of numerous Russian publications examining its effects on stress, cognition, and immunity. The peptide represents an interesting example of how structural modifications can expand a molecule's biological activities. This product is intended for research use only."
  ],
  howItWorksIntro: "Preclinical studies have examined Selank's mechanism involving modulation of GABAergic neurotransmission, effects on monoamine systems, and regulation of neurotrophic factors in brain regions associated with anxiety and cognition.",
  howItWorksAccordions: [
    { value: "gaba", iconName: "Activity", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "GABAergic Modulation", content: "Selank has been shown to allosterically modulate GABA-A receptors, enhancing inhibitory neurotransmission. This mechanism is similar to benzodiazepines but without the associated sedation, tolerance, or dependence observed in preclinical studies." },
    { value: "monoamine", iconName: "Brain", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "Monoamine System Effects", content: "Research indicates Selank influences serotonin and dopamine metabolism in limbic structures. It appears to stabilize the balance of these neurotransmitters, particularly under stress conditions, contributing to its anxiolytic-like effects." },
    { value: "bdnf", iconName: "TrendingUp", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "Neurotrophic Factor Expression", content: "Selank has been observed to upregulate brain-derived neurotrophic factor (BDNF) expression in hippocampal regions. BDNF supports neuronal survival, synaptic plasticity, and is implicated in learning and memory processes." },
    { value: "immune", iconName: "Shield", iconBgClass: "bg-orange-100 dark:bg-orange-900/30", title: "Immunomodulatory Activity", content: "Through its tuftsin-derived core, Selank retains immunomodulatory properties. It influences cytokine expression and immune cell function, suggesting a connection between its immune and CNS effects through neuroimmune pathways." }
  ],
  technicalPathways: [
    "Selank binding → GABA-A receptor allosteric modulation → enhanced chloride conductance → neuronal inhibition",
    "Limbic system effects → serotonin/dopamine balance → reduced anxiety-related behaviors",
    "Hippocampal signaling → BDNF upregulation → enhanced synaptic plasticity → improved memory consolidation",
    "Tuftsin core → immune cell modulation → cytokine regulation → neuroimmune communication"
  ]
};

// Semax
export const SemaxData: PeptidePageData = {
  slug: "semax",
  peptideName: "Semax",
  productImage: "/products/semax.webp",
  subtitle: "A peptide studied in laboratory settings for neuroprotection and cognitive enhancement",
  description: "Semax is a synthetic heptapeptide derived from the ACTH (4-10) fragment with an added Pro-Gly-Pro C-terminal sequence. Developed in Russia, it has been extensively studied for its nootropic, neuroprotective, and neurogenic properties.",
  casNumber: "80714-61-0",
  molecularFormula: "C₃₉H₆₃N₁₁O₁₀",
  molarMass: "846.0 g/mol",
  prices: { "10mg": 65 },
  benefits: [
    { iconName: "Brain", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "Cognitive Research", description: "Investigated in preclinical models for effects on attention, memory formation, and learning capacity", link: "(Preclinical Study)" },
    { iconName: "Shield", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "Neuroprotection", description: "Examined in laboratory studies for observations related to neuronal survival under stress conditions", link: "(Preclinical Study)" },
    { iconName: "Zap", iconBgClass: "bg-yellow-100 dark:bg-yellow-900/30", title: "BDNF Upregulation", description: "Studied for effects on brain-derived neurotrophic factor expression and neuroplasticity", link: "(Preclinical Study)" },
    { iconName: "Activity", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "Neurogenesis Research", description: "Evaluated in research models examining new neuron formation and neural progenitor cells", link: "(Preclinical Study)" },
    { iconName: "Heart", iconBgClass: "bg-red-100 dark:bg-red-900/30", title: "Stroke Recovery Research", description: "Investigated for potential effects on recovery and neuronal repair following ischemic events", link: "(Preclinical Study)" },
    { iconName: "Lightbulb", iconBgClass: "bg-orange-100 dark:bg-orange-900/30", title: "Neurotransmitter Modulation", description: "Examined for effects on dopaminergic and serotonergic system function", link: "(Preclinical Study)" }
  ],
  references: [
    "Ashmarin IP, et al. The nootropic drug Semax: a review of its mechanisms of action. Neuroscience and Behavioral Physiology. 2005.",
    "Dolotov OV, et al. Semax regulates BDNF and trkB expression in the rat hippocampus. Brain Research. 2006.",
    "Gusev EI, et al. Semax in prevention of disease progress in patients with cerebrovascular insufficiency. Zhurnal Nevrologii i Psikhiatrii. 2005.",
    "Agapova TY, et al. Effects of Semax on dopamine and serotonin metabolism in rat brain. Doklady Biological Sciences. 2007."
  ],
  aboutParagraphs: [
    "Semax was developed in the 1980s at the Institute of Molecular Genetics of the Russian Academy of Sciences by a team led by Nikolai Myasoedov and Isaak Ashmarin. The researchers were investigating fragments of adrenocorticotropic hormone (ACTH) that retained neurotropic activity without the hormonal effects on the adrenal glands.",
    "They identified that the ACTH (4-10) fragment possessed cognitive-enhancing properties but was rapidly degraded in the body. By adding a stabilizing Pro-Gly-Pro tripeptide to the C-terminus—the same modification later used in Selank—they created a molecule with dramatically improved stability and bioavailability while maintaining and even enhancing its neurotropic effects.",
    "Semax was approved in Russia in 1994 for treating stroke, cognitive disorders, and optic nerve diseases. It became one of the most studied Russian peptide drugs, with over 30 years of research publications. The peptide's ability to cross the blood-brain barrier and influence multiple neurotrophic pathways has made it a valuable tool in neuroscience research. This product is intended for research use only."
  ],
  howItWorksIntro: "Preclinical studies have examined Semax's mechanism involving upregulation of neurotrophic factors, modulation of monoaminergic systems, and enhancement of neuroplasticity through multiple receptor and signaling pathways.",
  howItWorksAccordions: [
    { value: "bdnf", iconName: "TrendingUp", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "Neurotrophic Factor Induction", content: "Semax significantly upregulates BDNF (brain-derived neurotrophic factor), NGF (nerve growth factor), and their receptors TrkB and TrkA. These neurotrophins support neuronal survival, synaptic plasticity, and are critical for learning and memory processes." },
    { value: "melanocortin", iconName: "Target", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "Melanocortin System", content: "As an ACTH fragment, Semax interacts with melanocortin receptors (MC3R and MC4R) in the brain. This system modulates attention, arousal, and cognitive flexibility without the peripheral adrenal effects of full-length ACTH." },
    { value: "monoamine", iconName: "Activity", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "Dopamine and Serotonin Modulation", content: "Semax influences dopaminergic and serotonergic neurotransmission in limbic and cortical regions. It appears to enhance dopamine synthesis and modulate serotonin turnover, contributing to improved attention and mood regulation." },
    { value: "neuroprotection", iconName: "Shield", iconBgClass: "bg-orange-100 dark:bg-orange-900/30", title: "Anti-Oxidative and Anti-Inflammatory", content: "Research shows Semax has antioxidant properties and can reduce inflammatory cytokine expression in neural tissue. These effects contribute to its neuroprotective capacity under conditions of oxidative stress or ischemia." }
  ],
  technicalPathways: [
    "Semax administration → BDNF/NGF gene expression → TrkB/TrkA receptor activation → MAPK/PI3K signaling",
    "Melanocortin receptor binding → MC3R/MC4R activation → cAMP elevation → cognitive enhancement",
    "Dopaminergic modulation → tyrosine hydroxylase activity → increased DA synthesis → improved attention",
    "Oxidative stress → Semax antioxidant effects → reduced ROS → enhanced neuronal survival"
  ]
};

// NAD+ (Buffered)
export const NADBufferedData: PeptidePageData = {
  slug: "nad-buffered",
  peptideName: "NAD+ (Buffered)",
  productImage: "/products/nad-buffered.webp",
  subtitle: "A coenzyme studied in laboratory settings for cellular energy metabolism and aging research",
  description: "NAD+ (Nicotinamide Adenine Dinucleotide) is a critical coenzyme found in every living cell. This buffered formulation maintains stability for research applications studying cellular metabolism, DNA repair, and sirtuin activation pathways.",
  casNumber: "53-84-9",
  molecularFormula: "C₂₁H₂₇N₇O₁₄P₂",
  molarMass: "663.4 g/mol",
  prices: { "500mg": 112 },
  benefits: [
    { iconName: "Battery", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "Cellular Energy", description: "Investigated in preclinical models as an essential cofactor for mitochondrial ATP production and electron transport", link: "(Preclinical Study)" },
    { iconName: "Clock", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "Longevity Research", description: "Examined in laboratory studies for observations related to sirtuin activation and aging mechanisms", link: "(Preclinical Study)" },
    { iconName: "Wrench", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "DNA Repair", description: "Studied as a substrate for PARP enzymes involved in DNA damage repair and genomic stability", link: "(Preclinical Study)" },
    { iconName: "Brain", iconBgClass: "bg-yellow-100 dark:bg-yellow-900/30", title: "Neurological Research", description: "Evaluated in research models examining neuronal metabolism and neurodegenerative processes", link: "(Preclinical Study)" },
    { iconName: "Activity", iconBgClass: "bg-orange-100 dark:bg-orange-900/30", title: "Metabolic Function", description: "Investigated for roles in glycolysis, citric acid cycle, and oxidative phosphorylation", link: "(Preclinical Study)" },
    { iconName: "Shield", iconBgClass: "bg-red-100 dark:bg-red-900/30", title: "Cellular Stress Response", description: "Examined for effects on cellular resilience and stress adaptation mechanisms", link: "(Preclinical Study)" }
  ],
  references: [
    "Verdin E. NAD+ in aging, metabolism, and neurodegeneration. Science. 2015;350(6265):1208-1213.",
    "Imai S, Guarente L. NAD+ and sirtuins in aging and disease. Trends in Cell Biology. 2014;24(8):464-471.",
    "Yoshino J, et al. NAD+ intermediates: The biology and therapeutic potential of NMN and NR. Cell Metabolism. 2018;27(3):513-528."
  ],
  aboutParagraphs: [
    "NAD+ was first discovered in 1906 by Arthur Harden and William John Young while studying fermentation in yeast extracts. They noticed that adding boiled yeast extract to unboiled extract dramatically accelerated fermentation—the heat-stable factor they identified would eventually be recognized as NAD+, one of the most important molecules in biochemistry.",
    "The molecule's central role in metabolism became clear over the following decades. Hans von Euler-Chelpin received the 1929 Nobel Prize for elucidating NAD's structure and function. We now know NAD+ participates in over 500 enzymatic reactions, serving as an essential cofactor for enzymes that transfer electrons during cellular respiration and many other processes.",
    "Interest in NAD+ surged in the early 2000s when researchers discovered its critical role in activating sirtuins—proteins linked to longevity in multiple organisms. The finding that NAD+ levels decline with age, and that boosting NAD+ could activate these longevity pathways, sparked intense research interest. This buffered formulation maintains pH stability for research applications. This product is intended for research use only."
  ],
  howItWorksIntro: "Research has examined NAD+'s mechanism as an essential coenzyme that serves as an electron carrier in redox reactions and as a substrate for NAD-consuming enzymes including sirtuins and PARPs.",
  howItWorksAccordions: [
    { value: "redox", iconName: "Zap", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "Redox Reactions", content: "NAD+ accepts electrons during glycolysis and the citric acid cycle, becoming NADH. This reduced form then donates electrons to the electron transport chain, driving ATP synthesis. The NAD+/NADH ratio is a key indicator of cellular metabolic state." },
    { value: "sirtuins", iconName: "Clock", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "Sirtuin Activation", content: "Sirtuins (SIRT1-7) are NAD+-dependent deacetylases that regulate metabolism, stress responses, and longevity. They consume NAD+ to remove acetyl groups from proteins, linking cellular energy status to gene expression and protein function." },
    { value: "parp", iconName: "Wrench", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "PARP-Mediated DNA Repair", content: "Poly(ADP-ribose) polymerases (PARPs) use NAD+ as a substrate to add ADP-ribose units to proteins at DNA damage sites. This modification recruits repair machinery and is essential for maintaining genomic integrity." },
    { value: "cd38", iconName: "Activity", iconBgClass: "bg-orange-100 dark:bg-orange-900/30", title: "CD38 and NAD+ Consumption", content: "CD38 is an NAD+-consuming ectoenzyme that increases with age and inflammation. Its activity contributes to age-related NAD+ decline, making CD38 a target of interest in aging research alongside NAD+ supplementation strategies." }
  ],
  technicalPathways: [
    "Glycolysis/TCA cycle → NAD+ reduction to NADH → electron transport chain → ATP synthesis",
    "NAD+ + Sirtuin substrate → deacetylated protein + nicotinamide + O-acetyl-ADP-ribose",
    "DNA damage → PARP activation → NAD+ consumption → poly(ADP-ribose) synthesis → repair factor recruitment",
    "NAD+ biosynthesis: Salvage pathway (nicotinamide → NMN → NAD+) and de novo pathway (tryptophan → NAD+)"
  ]
};

// TB-500
export const TB500Data: PeptidePageData = {
  slug: "tb-500",
  peptideName: "TB-500",
  productImage: "/products/tb-500.webp",
  subtitle: "A peptide studied in laboratory settings for cellular migration and tissue repair mechanisms",
  description: "TB-500 is a synthetic version of a naturally occurring peptide present in virtually all human cells called Thymosin Beta 4 (Tβ4). It has been extensively studied in preclinical models for its effects on tissue repair, wound healing, and cellular migration.",
  casNumber: "77591-33-4",
  molecularFormula: "C₂₁₂H₃₅₀N₅₆O₇₈S",
  molarMass: "4963.5 g/mol",
  prices: { "10mg": 83 },
  benefits: [
    {
      iconName: "Activity",
      iconBgClass: "bg-blue-100 dark:bg-blue-900/30",
      title: "Tissue Repair & Wound Healing Research",
      description: "Investigated in preclinical models for roles in cell migration and tissue repair mechanisms",
      link: "(Preclinical Study)",
    },
    {
      iconName: "Target",
      iconBgClass: "bg-green-100 dark:bg-green-900/30",
      title: "Cell Migration & Cytoskeletal Function",
      description: "Studied for its role in actin regulation and directional cell movement critical to regenerative processes",
      link: "(Preclinical Study)",
    },
    {
      iconName: "Heart",
      iconBgClass: "bg-red-100 dark:bg-red-900/30",
      title: "Cardiac Regenerative Research",
      description: "Examined in animal models for effects on epicardial progenitor activation and neovascularization following cardiac injury",
      link: "(Preclinical Study)",
    },
    {
      iconName: "Sparkles",
      iconBgClass: "bg-purple-100 dark:bg-purple-900/30",
      title: "Skin & Hair Follicle Research",
      description: "Investigated for its role in dermal biology and hair follicle growth signaling pathways",
      link: "(Preclinical Study)",
    },
  ],
  references: [
    "Philp D, et al. Thymosin beta4 promotes dermal healing. Journal of Investigative Dermatology. 2003.",
    "Bock-Marquette I, et al. Thymosin beta4 activates integrin-linked kinase and promotes cardiac cell migration, survival and cardiac repair. Nature. 2004.",
    "Smart N, et al. Thymosin beta4 induces adult epicardial progenitor mobilization and neovascularization. Nature. 2007.",
    "Xiong Y, et al. Thymosin beta4 treatment exerts neuroprotective effects on experimental models of traumatic brain injury. Journal of Neurosurgery. 2012.",
    "Sosne G, et al. Anti-inflammatory effects of thymosin beta4. Annals of the New York Academy of Sciences. 2007.",
  ],
  aboutParagraphs: [
    "TB-500 is the synthetic version of a naturally occurring peptide called Thymosin Beta-4. The original compound was discovered in the 1960s by Dr. Allan Goldstein and his team at the National Institutes of Health. They were studying the thymus gland—a small organ near the heart that plays a role in the immune system—when they found this peptide present in nearly every cell in the body.",
    "What made Thymosin Beta-4 interesting wasn't its connection to the thymus, but what it seemed to do for cells. Scientists discovered it helped with something called actin regulation—basically, it affected how cells move around and change shape. This turned out to be important for wound healing and tissue repair, since repair cells need to travel to damaged areas.",
    "Over the years, TB-500 became popular in research labs studying tissue repair, wound healing, and related biological processes. It's been studied in everything from eye injuries to heart tissue to skin wounds. Today, it's one of the most widely used peptides for cellular migration and repair research. This product is intended for research use only.",
  ],
  howItWorksIntro: "TB-500 works primarily by sequestering G-actin, which promotes cellular migration and differentiation. This enables repair cells to reach damaged tissues more effectively, while also promoting angiogenesis and reducing inflammation.",
  howItWorksAccordions: [
    {
      value: "actin",
      iconName: "Workflow",
      iconBgClass: "bg-blue-100 dark:bg-blue-900/30",
      title: "Actin Sequestration",
      content: "TB-500 binds G-actin monomers, preventing their polymerization into F-actin filaments. This promotes cellular plasticity and motility, allowing cells to change shape and migrate more effectively to sites of injury.",
    },
    {
      value: "migration",
      iconName: "Target",
      iconBgClass: "bg-green-100 dark:bg-green-900/30",
      title: "Enhanced Cell Migration",
      content: "By modulating the actin cytoskeleton, TB-500 enables stem cells, endothelial cells, and keratinocytes to migrate efficiently. This accelerates wound closure and tissue repair across multiple tissue types.",
    },
    {
      value: "angiogenesis",
      iconName: "Heart",
      iconBgClass: "bg-red-100 dark:bg-red-900/30",
      title: "Angiogenesis Promotion",
      content: "TB-500 promotes new blood vessel formation by enhancing endothelial cell migration and tube formation. This improves blood supply to damaged tissues, supporting nutrient delivery and waste removal during repair.",
    },
  ],
};

// Ipamorelin
export const IpamorelinData: PeptidePageData = {
  slug: "ipamorelin",
  peptideName: "Ipamorelin",
  productImage: "/products/ipamorelin.webp",
  subtitle: "A peptide studied in laboratory settings for selective growth hormone secretion",
  description: "Ipamorelin is the first truly selective growth hormone secretagogue. It stimulates GH release without affecting cortisol, prolactin, or other hormones, making it one of the safest and most targeted GHRPs available.",
  casNumber: "170851-70-4",
  molecularFormula: "C₃₈H₄₉N₉O₅",
  molarMass: "711.9 g/mol",
  prices: { "10mg": 47 },
  benefits: [
    { iconName: "Target", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "Selective GH Secretagogue Characterization", description: "Landmark study characterizing ipamorelin as the first GHRP-receptor agonist with selectivity for GH release similar to GHRH, without affecting ACTH or cortisol", link: "(Clinical Study)" },
    { iconName: "Activity", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "Human PK/PD (Dose Response & Modeling)", description: "Phase I clinical study establishing ipamorelin pharmacokinetics and pharmacodynamics with dose-proportional GH release patterns in healthy volunteers", link: "(Clinical Trial)" },
    { iconName: "Bone", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "Musculoskeletal / Bone Outcomes (Preclinical)", description: "Preclinical study demonstrating ipamorelin increases bone mineral content through enhanced growth and bone dimensions in adult female rats", link: "(Preclinical Study)" },
    { iconName: "Shield", iconBgClass: "bg-orange-100 dark:bg-orange-900/30", title: "Anti-catabolic Signaling (Glucocorticoid Model — Preclinical)", description: "Study showing ipamorelin counteracts glucocorticoid-induced decreases in muscle strength and bone formation in adult rats", link: "(Preclinical Study)" }
  ],
  references: [
    "Raun K, et al. Ipamorelin, the first selective growth hormone secretagogue. European Journal of Endocrinology. 1998.",
    "Gobburu JV, et al. Pharmacokinetic-pharmacodynamic modeling of ipamorelin, a growth hormone releasing peptide. Pharmaceutical Research. 1999.",
    "Svensson J, et al. The GH secretagogues ipamorelin and GH-releasing peptide-6 increase bone mineral content in adult female rats. Journal of Endocrinology. 2000.",
    "Ghigo E, et al. Growth hormone secretagogues: clinical applications. Journal of Endocrinological Investigation. 1997."
  ],
  aboutParagraphs: [
    "Ipamorelin was developed by scientists at Novo Nordisk in Denmark during the late 1990s. At the time, researchers were looking for better ways to stimulate growth hormone release without the side effects that came with earlier compounds. The existing peptides like GHRP-6 worked, but they also raised cortisol levels and stimulated appetite—effects that weren't always wanted.",
    "The Novo Nordisk team created Ipamorelin specifically to avoid these problems. They designed it to be highly selective, targeting the ghrelin receptor in a way that triggered growth hormone release without significantly affecting other hormones. When they tested it, the results were encouraging—strong GH release with minimal impact on cortisol or prolactin.",
    "This selectivity made Ipamorelin stand out from other growth hormone releasing peptides. Labs began using it when they wanted clean GH stimulation for research without the confounding effects of hormonal changes elsewhere in the body. Today, it remains one of the most popular peptides for growth hormone pathway research. This product is intended for research use only."
  ],
  howItWorksIntro: "Ipamorelin selectively activates ghrelin receptors to stimulate growth hormone release without affecting cortisol, prolactin, or other hormones. This clean mechanism makes it one of the safest GHRPs for research applications.",
  howItWorksAccordions: [
    { value: "selectivity", iconName: "Target", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "Selective GHS-R1a Binding", content: "Ipamorelin binds to ghrelin receptors with high selectivity, producing GH release without stimulating ACTH (which would raise cortisol) or affecting prolactin levels. This selectivity is unique among GHRPs." },
    { value: "gh-release", iconName: "Activity", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "Pulsatile GH Release", content: "Ipamorelin produces dose-dependent, pulsatile GH secretion that mimics natural physiological patterns. Peak GH levels occur 30-60 minutes post-administration and return to baseline within 2-3 hours." },
    { value: "safety", iconName: "Shield", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "Favorable Safety Profile", content: "Unlike GHRP-2 and GHRP-6, ipamorelin does not significantly stimulate appetite or cause cortisol spikes. This clean pharmacological profile makes it well-suited for long-term research applications." }
  ]
};

// Single source of truth: Add new peptides here only
export const allPeptideData: PeptidePageData[] = [
  AOD9604Data,
  BPC157Data,
  TB500Data,
  IGF1LR3Data,
  TesamorelinData,
  SermorelinData,
  CagrilintideData,
  RetatrutideData,
  MOTSCData,
  SelankData,
  SemaxData,
  NADBufferedData,
  IpamorelinData,
];

// Auto-generated lookup maps - no manual maintenance needed
export const peptideDataMap: Record<string, PeptidePageData> = Object.fromEntries(
  allPeptideData.map((p) => [p.peptideName, p])
);

export const slugToDataMap: Record<string, PeptidePageData> = Object.fromEntries(
  allPeptideData.map((p) => [p.slug, p])
);

// Blend data and standalone peptides for unified lookup (slug -> productImage)
const blendImageMap: Record<string, string | undefined> = {
  [cjc1295IpamorelinData.slug]: (cjc1295IpamorelinData as any).productImage,
  [bpc157tb500Data.slug]: (bpc157tb500Data as any).productImage,
  [pt141BlendData.slug]: (pt141BlendData as any).productImage,
  [thymosinBlendData.slug]: (thymosinBlendData as any).productImage,
  [klowData.slug]: (klowData as any).productImage,
  "glow": "/products/glow.webp",
  "retatrutide": "/products/glp-3rt-12mg.webp",
  "tesamorelin-ipamorelin": "/products/tesamorelin-ipamorelin.webp",
  "dsip": "/products/dsip.webp",
  "epithalon": "/products/epithalon.webp",
  "ghk-cu": "/products/ghk-cu.webp",
  "glutathione": "/products/glutathione.webp",
  "pt-141": "/products/pt-141.webp",
  "melanotan-2": "/products/melanotan-2.webp",
  "glp-1sg": "/products/glp-1sg.webp",
  "glp-1tz": "/products/glp-1tz.webp",
};

// Get product image by slug - checks both peptides and blends
export const getProductImageBySlug = (slug: string): string | undefined => {
  return slugToDataMap[slug]?.productImage ?? blendImageMap[slug];
};

// Get full peptide data by slug
export const getPeptideDataBySlug = (slug: string): PeptidePageData | undefined => {
  return slugToDataMap[slug];
};
