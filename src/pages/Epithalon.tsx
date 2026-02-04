import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { getPrices } from "@/data/priceData";

const Epithalon = () => (
  <PeptidePageTemplate
    slug="epithalon"
    peptideName="Epithalon"
    productImage="/products/epithalon.png"
    coaSlot={<img src="/coa/epithalon.png" alt="Epithalon COA" className="w-full h-auto" />}
    subtitle="A peptide studied in laboratory settings for telomerase activation and cellular senescence"
    description="Epithalon is a synthetic tetrapeptide (Ala-Glu-Asp-Gly) derived from epithalamin, a pineal gland extract. It is a powerful telomerase activator that lengthens telomeres, regulates circadian rhythms, and exhibits profound anti-aging, neuroprotective, and longevity-promoting effects."
    casNumber="307297-39-8"
    molecularFormula="C₁₄H₂₂N₄O₉"
    molarMass="390.35 g/mol"
    prices={getPrices("epithalon")!}
    benefits={[
      { iconName: "Clock", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "Telomerase Activation & Longevity", description: "Activates telomerase enzyme, lengthening telomeres and potentially extending cellular lifespan. Studies show increased telomere length in human cells.", link: "https://pubmed.ncbi.nlm.nih.gov/12374349/" },
      { iconName: "Brain", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "Neuroprotection & Cognitive Health", description: "Protects neurons from oxidative stress, improves synaptic plasticity, and supports cognitive function in aging brains.", link: "https://pubmed.ncbi.nlm.nih.gov/40141333/" },
      { iconName: "Shield", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "Powerful Antioxidant Action", description: "Reduces oxidative damage by 40-50%, scavenges free radicals, and protects cells from age-related deterioration.", link: "https://link.springer.com/article/10.1007/s12015-025-10911-x" },
      { iconName: "Activity", iconBgClass: "bg-indigo-100 dark:bg-indigo-900/30", title: "Circadian Rhythm Regulation", description: "Normalizes melatonin secretion from the pineal gland, improving sleep quality and hormonal balance in aging individuals.", link: "https://pubmed.ncbi.nlm.nih.gov/12558979/" },
      { iconName: "Heart", iconBgClass: "bg-red-100 dark:bg-red-900/30", title: "Cardiovascular Protection", description: "Improves heart function, reduces arterial stiffness, and protects against age-related cardiovascular decline.", link: "https://pubmed.ncbi.nlm.nih.gov/16329675/" },
      { iconName: "Target", iconBgClass: "bg-orange-100 dark:bg-orange-900/30", title: "Anti-Cancer Properties", description: "Inhibits spontaneous tumor development, normalizes oncogene expression, and demonstrates tumor-suppressive effects in preclinical models.", link: "https://pubmed.ncbi.nlm.nih.gov/16909207/" }
    ]}
    references={[
      "Khavinson VKh, et al. Epitalon peptide induces telomerase activity and telomere elongation in human somatic cells. Bulletin of Experimental Biology and Medicine. 2003.",
      "Anisimov VN, et al. Effect of Epithalon on biomarkers of aging, life span and spontaneous tumor incidence in female mice. Biogerontology. 2002.",
      "Korkushko OV, et al. Peptide preparation Epithalamin increases the lifespan and inhibits spontaneous tumor development in female rats. Biogerontology. 2006.",
      "Khavinson VKh, et al. Effect of epithalon on the lifespan increase in Drosophila melanogaster. Mechanisms of Ageing and Development. 2000."
    ]}
    aboutParagraphs={[
      "Epithalon's story begins in the former Soviet Union during the 1980s, when a Russian scientist named Professor Vladimir Khavinson was researching the pineal gland—a tiny organ deep in the brain that produces melatonin and helps regulate sleep cycles. Khavinson was interested in how this gland changed with age and whether anything could be done about it.",
      "During his research, Khavinson isolated a compound from pineal gland extracts called epithalamin. It showed some interesting properties in his studies, but it was complex to work with. So his team created a simpler, synthetic version using just four amino acids that seemed to produce similar effects. They called this new compound Epithalon.",
      "The peptide caught the attention of aging researchers because of its connection to telomeres—the protective caps on chromosomes that shorten as we get older. Studies suggested Epithalon might activate telomerase, the enzyme that helps maintain these caps. Today, it's one of the most studied peptides in longevity and aging research. This product is intended for research use only."
    ]}
    howItWorksIntro="Epithalon activates telomerase, the enzyme that rebuilds telomeres—the protective caps on your chromosomes that naturally shorten with age. By lengthening telomeres, it extends cellular lifespan, regulates sleep hormones, and protects against age-related decline."
    howItWorksAccordions={[
      { value: "telomerase", iconName: "Signal", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "Telomerase Activation", content: "Epithalon directly activates the telomerase enzyme (TERT), which adds hexameric TTAGGG repeats to chromosome ends. This prevents the Hayflick limit—the point at which cells can no longer divide—and extends cellular replicative capacity." },
      { value: "pineal", iconName: "Clock", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "Pineal Gland Regulation", content: "Normalizes melatonin secretion from the pineal gland, restoring circadian rhythms disrupted by aging. This improves sleep architecture, enhances immune function, and optimizes cortisol/growth hormone release patterns." },
      { value: "antioxidant", iconName: "Shield", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "Antioxidant Protection", content: "Epithalon upregulates endogenous antioxidant enzymes including superoxide dismutase (SOD), catalase, and glutathione peroxidase. Studies show 40-50% reduction in lipid peroxidation products and oxidized proteins in treated tissues." },
      { value: "gene-expression", iconName: "Dna", iconBgClass: "bg-orange-100 dark:bg-orange-900/30", title: "Gene Expression Modulation", content: "Epithalon influences the expression of numerous genes involved in aging, including those regulating cell cycle, apoptosis, and tumor suppression. It normalizes oncogene expression and enhances tumor suppressor gene activity." }
    ]}
  />
);

export default Epithalon;
