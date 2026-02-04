import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { getPrices } from "@/data/priceData";

const DSIP = () => (
  <PeptidePageTemplate
    slug="dsip"
    peptideName="DSIP"
    productImage="/products/dsip.webp"
    coaSlot={<img src="/coa/dsip.png" alt="DSIP COA" className="w-full h-auto" />}
    subtitle="A peptide studied in laboratory settings for sleep architecture and neuroendocrine modulation"
    description="A naturally occurring neuromodulatory peptide that regulates sleep architecture, stress response, and neuroendocrine function. DSIP promotes physiological sleep patterns, reduces stress-induced hormonal imbalances, and protects the nervous system from metabolic and oxidative damage."
    casNumber="62568-57-4"
    molecularFormula="C₃₅H₄₈N₁₀O₁₅S"
    molarMass="848.87 g/mol"
    prices={getPrices("dsip")!}
    benefits={[
      { iconName: "Moon", iconBgClass: "bg-indigo-100 dark:bg-indigo-900/30", title: "Sleep Quality Enhancement", description: "Improves sleep architecture, increases slow-wave sleep, and reduces sleep latency without addiction or tolerance development.", link: "https://pubmed.ncbi.nlm.nih.gov/6189138/" },
      { iconName: "Brain", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "Stress Reduction", description: "Reduces stress-induced cortisol elevation, normalizes stress response, and protects against chronic stress damage.", link: "https://pubmed.ncbi.nlm.nih.gov/7006724/" },
      { iconName: "Shield", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "Neuroprotection", description: "Protects neurons from oxidative stress, reduces excitotoxicity, and supports brain cell survival during metabolic challenges.", link: "https://pubmed.ncbi.nlm.nih.gov/3332395/" },
      { iconName: "Activity", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "Pain Modulation", description: "Enhances endogenous opioid release, increases pain threshold, and reduces chronic pain perception without analgesic tolerance.", link: "https://pubmed.ncbi.nlm.nih.gov/6381346/" },
      { iconName: "Heart", iconBgClass: "bg-red-100 dark:bg-red-900/30", title: "Cardiovascular Protection", description: "Reduces blood pressure in hypertensive subjects, improves heart rate variability, and protects against stress-induced cardiac damage.", link: "https://pubmed.ncbi.nlm.nih.gov/6206622/" },
      { iconName: "Sparkles", iconBgClass: "bg-yellow-100 dark:bg-yellow-900/30", title: "Metabolic Regulation", description: "Normalizes thyroid function, regulates body temperature, and improves metabolic efficiency under stress conditions.", link: "https://pubmed.ncbi.nlm.nih.gov/6425113/" }
    ]}
    references={[
      "Schoenenberger GA, et al. Characterization and isolation of the delta-sleep-inducing peptide. Proceedings of the National Academy of Sciences. 1977.",
      "Graf MV, Kastin AJ. Delta-sleep-inducing peptide (DSIP): a review. Neuroscience & Biobehavioral Reviews. 1984.",
      "Iyer KS, et al. Delta sleep inducing peptide (DSIP) and human sleep-waking behavior. Peptides. 1988.",
      "Schoenenberger GA. Characterization, properties and multivariate functions of delta sleep-inducing peptide (DSIP). European Neurology. 1984."
    ]}
    aboutParagraphs={[
      "DSIP has one of the more unusual discovery stories in peptide research. In 1977, a team of Swiss scientists was studying rabbit brain tissue, trying to understand what chemicals the brain produces during sleep. They isolated a small peptide from the cerebral venous blood of sleeping rabbits and named it Delta Sleep-Inducing Peptide—DSIP for short.",
      "The name turned out to be a bit misleading. While DSIP was found during sleep research, scientists soon discovered it didn't work like a sleeping pill at all. Instead, it seemed to help normalize sleep patterns rather than force sleep. It also showed up in other research areas—stress response, pain perception, and hormone regulation.",
      "Over the following decades, DSIP became a popular research compound in European labs, particularly in Russia and Germany. Scientists used it to study everything from sleep architecture to the body's stress response systems. Today, it remains an active area of investigation for researchers interested in how the brain regulates rest and recovery. This product is intended for research use only."
    ]}
    howItWorksIntro="DSIP acts as a natural sleep regulator and stress modulator by fine-tuning brain activity patterns and hormonal responses. It enhances deep sleep quality, reduces the body's overreaction to stress, lowers pain sensitivity, and protects brain cells from damage—all without causing sedation or addiction."
    howItWorksAccordions={[
      { value: "sleep-regulation", iconName: "Moon", iconBgClass: "bg-indigo-100 dark:bg-indigo-900/30", title: "Sleep Architecture Normalization", content: "DSIP modulates GABAergic and serotonergic neurotransmission in the sleep-wake centers of the hypothalamus and brainstem. It promotes physiological slow-wave sleep (SWS) by enhancing delta wave activity (0.5-4 Hz) and reducing sleep fragmentation." },
      { value: "hpa-axis", iconName: "Signal", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "HPA Axis Modulation", content: "DSIP regulates the hypothalamic-pituitary-adrenal (HPA) axis by modulating corticotropin-releasing hormone (CRH) secretion from the paraventricular nucleus of the hypothalamus. This results in normalized cortisol secretion patterns during both acute and chronic stress." },
      { value: "opioid-system", iconName: "Workflow", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "Endogenous Opioid Potentiation", content: "DSIP enhances the activity of endogenous opioid peptides (enkephalins, endorphins) by increasing their release and receptor binding efficiency. This mechanism underlies DSIP's analgesic properties and contributes to its stress-protective effects." },
      { value: "neuroprotection", iconName: "Shield", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "Neuroprotective Mechanisms", content: "DSIP activates cellular antioxidant defenses, including superoxide dismutase (SOD) and glutathione peroxidase, protecting neurons from oxidative damage. It also modulates glutamate neurotransmission to prevent excitotoxicity during metabolic stress." }
    ]}
  />
);

export default DSIP;
