import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { getPrices } from "@/data/priceData";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const Melanotan2 = () => {
  useDocumentMeta("Melanotan II | Peptide Foundry");
  return (
  <PeptidePageTemplate
    slug="melanotan-2"
    peptideName="Melanotan 2"
    productImage="/products/melanotan-2.webp"
    subtitle="A peptide studied in laboratory settings for melanogenesis and melanocortin signaling"
    description="Melanotan 2 (MT-2) is a synthetic analog of alpha-melanocyte-stimulating hormone (α-MSH) that activates melanocortin receptors. It has been extensively studied in laboratory settings for its effects on melanin production, UV protection, and melanocortin system activation."
    casNumber="121062-08-6"
    molecularFormula="C₅₀H₆₉N₁₅O₉"
    molarMass="1024.2 g/mol"
    prices={getPrices("melanotan-2")!}
    benefits={[
      { iconName: "Sun", iconBgClass: "bg-yellow-100 dark:bg-yellow-900/30", title: "Melanocortin Receptor Activation & Pigmentation Research", description: "Human clinical studies investigating MT-II effects on melanocortin receptor stimulation and induced pigmentation", link: "(Clinical Trial)" },
      { iconName: "Shield", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "UV-Induced DNA Damage & Photoprotective Signaling", description: "Research examining alpha-melanocyte-stimulating hormone and melanocortin analogs reducing ultraviolet radiation-induced DNA damage", link: "(Clinical Study)" },
      { iconName: "Flame", iconBgClass: "bg-orange-100 dark:bg-orange-900/30", title: "Central Melanocortin Pathway & Energy Homeostasis Signaling", description: "Studies investigating central melanocortin pathways in regulation of food intake and energy balance", link: "(Preclinical Study)" },
      { iconName: "Heart", iconBgClass: "bg-pink-100 dark:bg-pink-900/30", title: "Sexual Function & Central Melanocortin Signaling", description: "Research examining melanocortin receptor agonists and sexual function through central nervous system mechanisms", link: "(Clinical Study)" }
    ]}
    references={[
      "Dorr RT, et al. Evaluation of melanotan-II, a superpotent cyclic melanotropic peptide in a pilot phase-I clinical study. Life Sciences. 1996.",
      "Levine N, et al. Melanotan-II induces tanning in human subjects. Journal of Clinical Endocrinology & Metabolism. 1993.",
      "Van der Ploeg LH, et al. A role for the melanocortin 4 receptor in sexual function. Proceedings of the National Academy of Sciences. 2002.",
      "Getting SJ, et al. Activation of melanocortin type 3 receptor as a molecular mechanism for adrenocorticotropic hormone efficacy in gouty arthritis. Arthritis & Rheumatism. 2002."
    ]}
    aboutParagraphs={[
      "Melanotan 2 grew out of sun protection research at the University of Arizona in the 1980s. Scientists there were trying to develop a compound that could give people a natural tan without sun exposure—potentially reducing skin cancer risk. They created a synthetic version of alpha-MSH, a natural hormone that triggers melanin production in the skin.",
      "The original compound, Melanotan 1, showed promise but didn't last long in the body. So the researchers modified it, creating Melanotan 2—a more stable, cyclic version that could produce longer-lasting effects. During testing, they noticed the compound had effects beyond just tanning, which led to spin-off research in other directions.",
      "Over the years, Melanotan 2 became one of the most studied peptides for melanocortin receptor research. Labs use it to explore how the melanocortin system works throughout the body—not just in skin, but in the brain and other tissues where these receptors are found. This product is intended for research use only."
    ]}
    howItWorksIntro="Melanotan 2 activates melanocortin receptors throughout the body, with primary research interest focused on MC1R (melanogenesis) and MC4R (CNS effects). This broad receptor activation profile enables diverse research applications."
    howItWorksAccordions={[
      { value: "mc1r", iconName: "Sun", iconBgClass: "bg-yellow-100 dark:bg-yellow-900/30", title: "MC1R & Melanogenesis", content: "MT-2 activates melanocortin-1 receptors on melanocytes, triggering cAMP elevation and tyrosinase activation. This initiates eumelanin synthesis, the dark pigment responsible for tanning and UV protection." },
      { value: "mc4r", iconName: "Brain", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "MC4R & Central Effects", content: "MT-2's activation of MC4R in the hypothalamus has been associated with various CNS-mediated effects in preclinical studies, including appetite modulation and behavioral responses." },
      { value: "signaling", iconName: "Signal", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "Melanocortin Signaling", content: "All melanocortin receptors are G-protein coupled receptors that increase intracellular cAMP upon activation. This triggers downstream signaling cascades specific to each tissue type expressing the receptors." }
    ]}
  />
  );
};

export default Melanotan2;
