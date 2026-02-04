import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { getPrices } from "@/data/priceData";

const GHKCu = () => (
  <PeptidePageTemplate
    slug="ghk-cu"
    peptideName="GHK-Cu"
    productImage="/products/ghk-cu.webp"
    subtitle="A peptide studied in laboratory settings for tissue remodeling and gene expression modulation"
    description="A naturally occurring copper-binding tripeptide with profound regenerative, anti-aging, and wound-healing properties. GHK-Cu remodels tissue architecture by stimulating collagen and glycosaminoglycan synthesis, modulating over 4,000+ human genes to promote healing, reduce inflammation, and restore youthful cellular function."
    casNumber="49557-75-7"
    molecularFormula="C₁₄H₂₂CuN₆O₄"
    molarMass="404.93 g/mol"
    prices={getPrices("ghk-cu")!}
    benefits={[
      { iconName: "Sparkles", iconBgClass: "bg-yellow-100 dark:bg-yellow-900/30", title: "Skin Regeneration & Anti-Aging", description: "Stimulates collagen synthesis, increases skin thickness by 18-20%, reduces wrinkle depth, and accelerates wound healing by 30-50%.", link: "https://pubmed.ncbi.nlm.nih.gov/22214254/" },
      { iconName: "Shield", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "Antioxidant & Anti-Inflammatory", description: "Scavenges free radicals, reduces oxidative DNA damage, suppresses inflammatory cytokines (TNF-α, IL-6), and protects against UV-induced damage.", link: "https://pubmed.ncbi.nlm.nih.gov/25813519/" },
      { iconName: "Activity", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "Tissue Repair & Remodeling", description: "Enhances wound closure rates, promotes angiogenesis, supports dermal matrix reconstruction, and accelerates healing in diabetic ulcers.", link: "https://pubmed.ncbi.nlm.nih.gov/23409911/" },
      { iconName: "Brain", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "Neuroprotection", description: "Protects neurons from oxidative stress and excitotoxicity, reduces neuroinflammation, and supports cognitive function during aging.", link: "https://pubmed.ncbi.nlm.nih.gov/26296373/" },
      { iconName: "Heart", iconBgClass: "bg-red-100 dark:bg-red-900/30", title: "Hair Growth & Follicle Health", description: "Increases hair follicle size by 58%, enlarges hair shaft diameter, prolongs anagen phase, and reduces inflammation-induced hair loss.", link: "https://pubmed.ncbi.nlm.nih.gov/26574057/" },
      { iconName: "TrendingDown", iconBgClass: "bg-orange-100 dark:bg-orange-900/30", title: "Gene Expression Modulation", description: "Resets aged gene expression patterns to more youthful profiles, activating over 4,000+ genes involved in repair and regeneration.", link: "https://pubmed.ncbi.nlm.nih.gov/26676026/" }
    ]}
    references={[
      "Pickart L. The human tri-peptide GHK and tissue remodeling. Journal of Biomaterials Science, Polymer Edition. 2008.",
      "Pickart L, Margolina A. Regenerative and protective actions of the GHK-Cu peptide in the light of the new gene data. International Journal of Molecular Sciences. 2018.",
      "Pickart L, et al. GHK peptide as a natural modulator of multiple cellular pathways in skin regeneration. BioMed Research International. 2015.",
      "Pollard JD, et al. Stimulation of collagen production in fibroblast cultures by the tripeptide-copper complex GHK-Cu. Archives of Facial Plastic Surgery. 2005."
    ]}
    aboutParagraphs={[
      "GHK-Cu was discovered by Dr. Loren Pickart in 1973 while he was studying human blood plasma at the University of Washington. He noticed that older blood plasma didn't work as well as younger plasma in certain laboratory tests. When he investigated why, he found a small copper-binding peptide that seemed to make the difference.",
      "The peptide was just three amino acids long—glycine, histidine, and lysine—bound to a copper ion. Dr. Pickart called it GHK-Cu. What made it interesting was that its concentration in blood appeared to decrease significantly with age, dropping from about 200 nanograms per milliliter at age 20 to around 80 by age 60.",
      "Over the following decades, research on GHK-Cu expanded dramatically. Scientists discovered it could affect the expression of thousands of genes—more than 4,000 by some counts. Labs around the world began studying its effects on tissue repair, collagen production, and aging-related processes. Today, it's one of the most-researched peptides for skin and wound healing studies. This product is intended for research use only."
    ]}
    howItWorksIntro="GHK-Cu acts as a master regulator of tissue repair and regeneration by signaling cells to produce more collagen, reduce inflammation, neutralize free radicals, and reset aging gene patterns. The copper component is essential—it activates enzymes needed for skin firmness, wound healing, and antioxidant protection."
    howItWorksAccordions={[
      { value: "collagen", iconName: "Workflow", iconBgClass: "bg-yellow-100 dark:bg-yellow-900/30", title: "Collagen & ECM Stimulation", content: "GHK-Cu directly stimulates fibroblast proliferation and collagen synthesis by activating transforming growth factor-β (TGF-β) signaling pathways. It increases mRNA expression of collagen types I, III, and IV, as well as elastin and glycosaminoglycans (GAGs)." },
      { value: "antioxidant", iconName: "Shield", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "Antioxidant Defense Activation", content: "The copper ion in GHK-Cu serves as a cofactor for copper-dependent antioxidant enzymes, particularly superoxide dismutase (Cu/Zn-SOD), which catalyzes the conversion of superoxide radicals into less harmful hydrogen peroxide and oxygen." },
      { value: "inflammation", iconName: "Activity", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "Anti-Inflammatory Signaling", content: "GHK-Cu suppresses inflammatory gene expression by inhibiting NF-κB activation and reducing the production of pro-inflammatory cytokines including TNF-α, IL-1β, and IL-6. It also promotes the M2 (anti-inflammatory) macrophage phenotype." },
      { value: "gene-expression", iconName: "Dna", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "Gene Expression Remodeling", content: "Genomic studies show GHK-Cu modulates 4,000+ genes, upregulating those involved in tissue repair, collagen synthesis, and antioxidant defense while downregulating genes associated with inflammation, fibrosis, and cellular senescence." }
    ]}
  />
);

export default GHKCu;
