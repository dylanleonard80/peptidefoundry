import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { getPrices } from "@/data/priceData";

const PT141 = () => (
  <PeptidePageTemplate
    slug="pt-141"
    peptideName="PT-141"
    productImage="/products/pt-141.webp"
    coaSlot={<img src="/coa/pt-141.png" alt="PT-141 COA" className="w-full h-auto" />}
    subtitle="A peptide studied in laboratory settings for melanocortin receptor activation and sexual function"
    description="PT-141 (Bremelanotide) is a synthetic melanocortin receptor agonist that works through central nervous system pathways. It has been studied extensively for its effects on sexual function and arousal through melanocortin-4 receptor activation in the hypothalamus."
    casNumber="189691-06-3"
    molecularFormula="C₅₀H₆₈N₁₄O₁₀"
    molarMass="1025.2 g/mol"
    prices={getPrices("pt-141")!}
    benefits={[
      { iconName: "Heart", iconBgClass: "bg-red-100 dark:bg-red-900/30", title: "Sexual Function Enhancement", description: "Activates melanocortin receptors in the hypothalamus to naturally enhance sexual desire and arousal through central nervous system pathways.", link: "https://doi.org/10.2174/156802607780906681" },
      { iconName: "Brain", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "CNS-Mediated Arousal", description: "Works via central nervous system mechanisms rather than vascular pathways, providing unique approach to sexual health independent of blood flow.", link: "https://doi.org/10.1016/j.eururo.2009.02.028" },
      { iconName: "Zap", iconBgClass: "bg-yellow-100 dark:bg-yellow-900/30", title: "Rapid Onset Response", description: "Clinical studies demonstrate measurable effects within 30-45 minutes of administration with peak activity at 2-3 hours post-dose.", link: "https://doi.org/10.1111/j.1743-6109.2007.00672.x" },
      { iconName: "Activity", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "Enhanced Libido", description: "Increases spontaneous sexual desire and responsiveness through melanocortin receptor activation in brain regions controlling sexual behavior.", link: "https://doi.org/10.1210/jc.2007-2332" }
    ]}
    references={[
      "Hallam TJ, et al. Melanocortins in the treatment of male and female sexual dysfunction. Current Topics in Medicinal Chemistry. 2007.",
      "Clayton AH, et al. Bremelanotide for the treatment of hypoactive sexual desire disorder. Obstetrics & Gynecology. 2019.",
      "Diamond LE, et al. An effect on the subjective sexual response in premenopausal women with sexual arousal disorder by bremelanotide. Journal of Sexual Medicine. 2006.",
      "Pfaus JG, et al. Selective facilitation of sexual solicitation in the female rat by a melanocortin receptor agonist. Proceedings of the National Academy of Sciences. 2004."
    ]}
    aboutParagraphs={[
      "PT-141, also called Bremelanotide, has an interesting origin story. It actually came from Melanotan 2 research at the University of Arizona. Scientists there were developing a tanning peptide when they noticed unexpected side effects during their studies—subjects were reporting increased arousal. This led them down a completely different research path.",
      "The researchers modified Melanotan 2 to remove its tanning effects while keeping the properties that seemed to affect arousal. The result was PT-141. What made it unique was its mechanism—unlike other compounds in this area that work on blood flow, PT-141 appeared to act directly on the brain's arousal centers.",
      "Clinical trials eventually led to regulatory approval for a related condition in 2019, under the brand name Vyleesi. But in research settings, PT-141 continues to be studied for its effects on melanocortin-4 receptors in the central nervous system. This product is intended for research use only."
    ]}
    howItWorksIntro="PT-141 activates melanocortin-4 receptors in the hypothalamus and other brain regions involved in sexual behavior. Unlike vascular-targeting compounds, it works through central nervous system pathways to enhance sexual desire and arousal."
    howItWorksAccordions={[
      { value: "mc4r", iconName: "Brain", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "MC4R Activation", content: "PT-141 binds to melanocortin-4 receptors in the hypothalamus, particularly in the paraventricular nucleus and medial preoptic area. These regions integrate hormonal and sensory signals to regulate sexual behavior." },
      { value: "signaling", iconName: "Signal", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "Dopaminergic Signaling", content: "MC4R activation triggers downstream dopamine release in reward and motivation circuits. This neurochemical cascade enhances sexual desire and responsiveness through established arousal pathways." },
      { value: "response", iconName: "Zap", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "Central vs Peripheral Action", content: "Unlike PDE5 inhibitors that act on blood vessels, PT-141's central mechanism means it can enhance desire and arousal independent of vascular function. Effects begin within 30-45 minutes and peak at 2-3 hours." }
    ]}
  />
);

export default PT141;
