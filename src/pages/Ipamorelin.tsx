import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { getPrices } from "@/data/priceData";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const Ipamorelin = () => {
  useDocumentMeta("Ipamorelin | Peptide Foundry");
  return (
  <PeptidePageTemplate
    slug="ipamorelin"
    peptideName="Ipamorelin"
    productImage="/products/ipamorelin.webp"
    coaSlot={<img src="/coa/ipamorelin.png" alt="Ipamorelin COA" className="w-full h-auto" />}
    subtitle="A peptide studied in laboratory settings for selective growth hormone secretion"
    description="Ipamorelin is the first truly selective growth hormone secretagogue. It stimulates GH release without affecting cortisol, prolactin, or other hormones, making it one of the safest and most targeted GHRPs available."
    casNumber="170851-70-4"
    molecularFormula="C₃₈H₄₉N₉O₅"
    molarMass="711.9 g/mol"
    prices={getPrices("ipamorelin")!}
    benefits={[
      { iconName: "Target", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "Selective GH Secretagogue Characterization", description: "Landmark study characterizing ipamorelin as the first GHRP-receptor agonist with selectivity for GH release similar to GHRH, without affecting ACTH or cortisol", link: "(Clinical Study)" },
      { iconName: "Activity", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "Human PK/PD (Dose Response & Modeling)", description: "Phase I clinical study establishing ipamorelin pharmacokinetics and pharmacodynamics with dose-proportional GH release patterns in healthy volunteers", link: "(Clinical Trial)" },
      { iconName: "Bone", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "Musculoskeletal / Bone Outcomes (Preclinical)", description: "Preclinical study demonstrating ipamorelin increases bone mineral content through enhanced growth and bone dimensions in adult female rats", link: "(Preclinical Study)" },
      { iconName: "Shield", iconBgClass: "bg-orange-100 dark:bg-orange-900/30", title: "Anti-catabolic Signaling (Glucocorticoid Model — Preclinical)", description: "Study showing ipamorelin counteracts glucocorticoid-induced decreases in muscle strength and bone formation in adult rats", link: "(Preclinical Study)" }
    ]}
    references={[
      "Raun K, et al. Ipamorelin, the first selective growth hormone secretagogue. European Journal of Endocrinology. 1998.",
      "Gobburu JV, et al. Pharmacokinetic-pharmacodynamic modeling of ipamorelin, a growth hormone releasing peptide. Pharmaceutical Research. 1999.",
      "Svensson J, et al. The GH secretagogues ipamorelin and GH-releasing peptide-6 increase bone mineral content in adult female rats. Journal of Endocrinology. 2000.",
      "Ghigo E, et al. Growth hormone secretagogues: clinical applications. Journal of Endocrinological Investigation. 1997."
    ]}
    aboutParagraphs={[
      "Ipamorelin was developed by scientists at Novo Nordisk in Denmark during the late 1990s. At the time, researchers were looking for better ways to stimulate growth hormone release without the side effects that came with earlier compounds. The existing peptides like GHRP-6 worked, but they also raised cortisol levels and stimulated appetite—effects that weren't always wanted.",
      "The Novo Nordisk team created Ipamorelin specifically to avoid these problems. They designed it to be highly selective, targeting the ghrelin receptor in a way that triggered growth hormone release without significantly affecting other hormones. When they tested it, the results were encouraging—strong GH release with minimal impact on cortisol or prolactin.",
      "This selectivity made Ipamorelin stand out from other growth hormone releasing peptides. Labs began using it when they wanted clean GH stimulation for research without the confounding effects of hormonal changes elsewhere in the body. Today, it remains one of the most popular peptides for growth hormone pathway research. This product is intended for research use only."
    ]}
    howItWorksIntro="Ipamorelin selectively activates ghrelin receptors to stimulate growth hormone release without affecting cortisol, prolactin, or other hormones. This clean mechanism makes it one of the safest GHRPs for research applications."
    howItWorksAccordions={[
      { value: "selectivity", iconName: "Target", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "Selective GHS-R1a Binding", content: "Ipamorelin binds to ghrelin receptors with high selectivity, producing GH release without stimulating ACTH (which would raise cortisol) or affecting prolactin levels. This selectivity is unique among GHRPs." },
      { value: "gh-release", iconName: "Activity", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "Pulsatile GH Release", content: "Ipamorelin produces dose-dependent, pulsatile GH secretion that mimics natural physiological patterns. Peak GH levels occur 30-60 minutes post-administration and return to baseline within 2-3 hours." },
      { value: "safety", iconName: "Shield", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "Favorable Safety Profile", content: "Unlike GHRP-2 and GHRP-6, ipamorelin does not significantly stimulate appetite or cause cortisol spikes. This clean pharmacological profile makes it well-suited for long-term research applications." }
    ]}
  />
  );
};

export default Ipamorelin;
