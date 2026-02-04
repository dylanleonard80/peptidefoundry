import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { getPrices } from "@/data/priceData";

const GLP1TZ = () => {
  return (
    <PeptidePageTemplate
      slug="glp-1tz"
      peptideName="GLP-1 2TZ"
      productImage="/products/glp-1tz.webp"
      productImages={{
        "10mg": "/products/glp-1tz.webp",
        "15mg": "/products/glp-1tz-15mg.webp",
        "20mg": "/products/glp-1tz-20mg.webp"
      }}
      coaSlot={<img src="/coa/glp-1tz.png" alt="GLP-1 2TZ COA" className="w-full h-auto" />}
      subtitle="A peptide studied in laboratory settings for dual incretin receptor activation and metabolic regulation"
      description="GLP-1 2TZ is a dual glucose-dependent insulinotropic polypeptide (GIP) and glucagon-like peptide-1 (GLP-1) receptor agonist. This synthetic peptide represents a novel approach to incretin-based research by targeting two key metabolic pathways simultaneously."
      casNumber="2023788-19-2"
      molecularFormula="C₂₂₅H₃₄₈N₄₈O₆₈"
      molarMass="4813.45 g/mol"
      prices={getPrices("glp-1tz")!}
      benefits={[
        { iconName: "TrendingDown", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "Dual Receptor Agonism", description: "Investigated in preclinical models for its simultaneous activation of GIP and GLP-1 receptors", link: "(Preclinical Study)" },
        { iconName: "Activity", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "Glucose Regulation", description: "Studied in laboratory settings for observations related to glucose-dependent insulin secretion pathways", link: "(Preclinical Study)" },
        { iconName: "Flame", iconBgClass: "bg-orange-100 dark:bg-orange-900/30", title: "Metabolic Research", description: "Examined for its effects on energy expenditure and metabolic rate in preclinical studies", link: "(Preclinical Study)" },
        { iconName: "Zap", iconBgClass: "bg-yellow-100 dark:bg-yellow-900/30", title: "Appetite Signaling", description: "Investigated for interactions with central appetite regulatory pathways and satiety mechanisms", link: "(Preclinical Study)" },
        { iconName: "Heart", iconBgClass: "bg-red-100 dark:bg-red-900/30", title: "Cardiovascular Studies", description: "Evaluated in preclinical research examining cardiovascular markers and lipid profiles", link: "(Preclinical Study)" },
        { iconName: "Shield", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "Beta Cell Research", description: "Studied in laboratory models for observations related to pancreatic islet function and preservation", link: "(Preclinical Study)" }
      ]}
      references={[
        "Coskun T, et al. LY3298176, a novel dual GIP and GLP-1 receptor agonist. Molecular Metabolism. 2018.",
        "Frias JP, et al. Tirzepatide versus semaglutide once weekly in patients with type 2 diabetes. New England Journal of Medicine. 2021.",
        "Jastreboff AM, et al. Tirzepatide once weekly for the treatment of obesity. New England Journal of Medicine. 2022.",
        "Nauck MA, D'Alessio DA. GIP and GLP-1 receptor agonism: the basis for tirzepatide. Diabetes Care. 2022."
      ]}
      aboutParagraphs={[
        "GLP-1 2TZ was developed by Eli Lilly and Company, emerging from research into dual incretin receptor agonism. Scientists recognized that targeting both GIP and GLP-1 receptors simultaneously might produce synergistic effects on glucose metabolism and body weight regulation, leading to the development of this novel dual agonist.",
        "The peptide was designed as a 39-amino acid linear molecule with modifications to extend its half-life. Researchers incorporated a C20 fatty diacid moiety attached via a linker to enable albumin binding, resulting in once-weekly dosing potential. This structural innovation built upon lessons learned from earlier GLP-1 receptor agonist development.",
        "GLP-1 2TZ has become a significant focus in metabolic research due to its unique dual mechanism. Studies continue to explore how the combined GIP and GLP-1 receptor activation affects various metabolic pathways, adipose tissue function, and central appetite regulation. This product is intended for research use only."
      ]}
      howItWorksIntro="Preclinical studies have examined GLP-1 2TZ's role as a dual incretin receptor agonist. Published investigations suggest involvement in glucose homeostasis, appetite regulation, and enhanced metabolic effects through simultaneous GIP and GLP-1 pathway activation."
      howItWorksAccordions={[
        { value: "gip", iconName: "Target", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "GIP Receptor Activation", content: "GLP-1TZ binds to GIP receptors primarily expressed in pancreatic beta cells and adipose tissue. This activation enhances glucose-dependent insulin secretion and may influence lipid metabolism and adipocyte function in preclinical models." },
        { value: "glp1", iconName: "Workflow", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "GLP-1 Receptor Signaling", content: "Simultaneous GLP-1 receptor activation triggers complementary pathways including delayed gastric emptying, enhanced satiety signaling, and additional insulin secretion. The dual mechanism is thought to produce synergistic metabolic effects." },
        { value: "synergy", iconName: "Signal", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "Dual Agonist Synergy", content: "Research suggests the combined activation of both incretin receptors may produce effects greater than either pathway alone. Studies examine how this synergy affects weight regulation, glucose control, and overall metabolic function." }
      ]}
    />
  );
};

export default GLP1TZ;
