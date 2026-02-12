import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { getPrices } from "@/data/priceData";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const Glutathione = () => {
  useDocumentMeta("Glutathione | Peptide Foundry");

  return (
  <PeptidePageTemplate
    slug="glutathione"
    peptideName="Glutathione"
    productImage="/products/glutathione.webp"
    coaSlot={<img src="/coa/glutathione.png" alt="Glutathione COA" className="w-full h-auto" />}
    subtitle="A tripeptide studied in laboratory settings for antioxidant activity and cellular redox signaling"
    description="Glutathione (GSH) is a naturally occurring tripeptide composed of glutamate, cysteine, and glycine. It serves as the body's master antioxidant and has been extensively studied for its role in cellular detoxification, redox balance, and protection against oxidative stress."
    casNumber="70-18-8"
    molecularFormula="C₁₀H₁₇N₃O₆S"
    molarMass="307.32 g/mol"
    prices={getPrices("glutathione")!}
    benefits={[
      { iconName: "Shield", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "Antioxidant Activity", description: "Functions as the primary intracellular antioxidant, neutralizing reactive oxygen species and protecting cellular components from oxidative damage.", link: "https://doi.org/10.1016/j.freeradbiomed.2014.12.024" },
      { iconName: "Recycle", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "Detoxification Pathways", description: "Conjugates with xenobiotics and toxins via glutathione S-transferases, facilitating their elimination from cells and tissues.", link: "https://doi.org/10.1016/j.pharmthera.2012.09.004" },
      { iconName: "Zap", iconBgClass: "bg-yellow-100 dark:bg-yellow-900/30", title: "Cellular Redox Balance", description: "Maintains the reduced state of protein thiols and regulates redox-sensitive signaling pathways critical for cellular function.", link: "https://doi.org/10.1016/j.bbagen.2013.06.007" },
      { iconName: "Activity", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "Immune Function Support", description: "Studied for its role in lymphocyte proliferation and optimal function of immune cells through maintenance of intracellular thiol status.", link: "https://doi.org/10.1016/j.nutres.2011.10.003" }
    ]}
    references={[
      "Forman HJ, et al. Glutathione: overview of its protective roles, measurement, and biosynthesis. Molecular Aspects of Medicine. 2009.",
      "Ballatori N, et al. The importance of glutathione in human disease. BioFactors. 2009.",
      "Dröge W, Breitkreutz R. Glutathione and immune function. Proceedings of the Nutrition Society. 2000.",
      "Richie JP Jr, et al. Randomized clinical trial of oral glutathione supplementation on body stores of glutathione. European Journal of Nutrition. 2015."
    ]}
    aboutParagraphs={[
      "Glutathione was first identified in 1888 by French researcher J. de Rey-Pailhade, who isolated the compound from yeast and called it 'philothion.' The name was later changed to glutathione in 1921 when Frederick Hopkins crystallized it and characterized its structure as a tripeptide containing a sulfhydryl group.",
      "The research community's interest in glutathione grew significantly through the mid-20th century as scientists began to understand its role as the body's primary antioxidant defense system. Studies revealed that nearly every cell in the body produces glutathione, with particularly high concentrations found in the liver.",
      "Today, glutathione continues to be a subject of extensive research across multiple fields including toxicology, immunology, and aging research. Its central role in maintaining cellular redox balance makes it a peptide of significant interest in understanding oxidative stress-related mechanisms. This product is intended for research use only."
    ]}
    howItWorksIntro="Glutathione functions as a tripeptide antioxidant that maintains cellular redox homeostasis through direct radical scavenging and enzymatic detoxification pathways. Its thiol group enables electron donation to neutralize reactive species."
    howItWorksAccordions={[
      { value: "antioxidant", iconName: "Shield", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "Direct Antioxidant Action", content: "The cysteine residue's thiol group directly neutralizes reactive oxygen species including superoxide, hydroxyl radicals, and hydrogen peroxide. Two glutathione molecules are oxidized to form glutathione disulfide (GSSG), which is then recycled back to GSH by glutathione reductase." },
      { value: "conjugation", iconName: "Recycle", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "Phase II Conjugation", content: "Glutathione S-transferases catalyze the conjugation of GSH to electrophilic xenobiotics, drugs, and toxins. These water-soluble conjugates are then exported from cells via multidrug resistance-associated proteins for elimination." },
      { value: "signaling", iconName: "Activity", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "Redox Signaling", content: "The GSH/GSSG ratio serves as a cellular redox sensor that influences protein function through reversible S-glutathionylation. This post-translational modification regulates enzymes, transcription factors, and signaling proteins." }
    ]}
  />
  );
};

export default Glutathione;
