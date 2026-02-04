import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { getPrices } from "@/data/priceData";

const GLP1SG = () => {
  return (
    <PeptidePageTemplate
      slug="glp-1sg"
      peptideName="GLP-1SG"
      productImage="/products/glp-1sg.webp"
      coaSlot={<img src="/coa/glp-1sg.png" alt="GLP-1SG COA" className="w-full h-auto" />}
      subtitle="A peptide studied in laboratory settings for metabolic regulation, glucose homeostasis, and appetite signaling"
      description="GLP-1SG is a glucagon-like peptide-1 (GLP-1) receptor agonist that shares 94% structural homology with native human GLP-1. This synthetic peptide has become one of the most extensively studied compounds in metabolic and weight management research."
      casNumber="910463-68-2"
      molecularFormula="C₁₈₇H₂₉₁N₄₅O₅₉"
      molarMass="4113.58 g/mol"
      prices={getPrices("glp-1sg")!}
      benefits={[
        { iconName: "TrendingDown", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "Appetite Regulation", description: "Investigated in preclinical models for its effects on central appetite signaling and satiety pathways", link: "(Preclinical Study)" },
        { iconName: "Activity", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "Glucose Homeostasis", description: "Studied in laboratory settings for observations related to insulin secretion and blood glucose regulation", link: "(Preclinical Study)" },
        { iconName: "Flame", iconBgClass: "bg-orange-100 dark:bg-orange-900/30", title: "Metabolic Research", description: "Examined for its interactions with metabolic pathways and energy expenditure mechanisms", link: "(Preclinical Study)" },
        { iconName: "Heart", iconBgClass: "bg-red-100 dark:bg-red-900/30", title: "Cardiovascular Studies", description: "Evaluated in preclinical research examining cardiovascular markers and lipid metabolism", link: "(Preclinical Study)" },
        { iconName: "Zap", iconBgClass: "bg-yellow-100 dark:bg-yellow-900/30", title: "GLP-1 Receptor Agonism", description: "Investigated for its high-affinity binding to GLP-1 receptors and downstream signaling effects", link: "(Preclinical Study)" },
        { iconName: "Shield", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "Beta Cell Research", description: "Studied in laboratory models for observations related to pancreatic beta cell function and preservation", link: "(Preclinical Study)" }
      ]}
      references={[
        "Wilding JPH, et al. Once-weekly semaglutide in adults with overweight or obesity. New England Journal of Medicine. 2021.",
        "Marso SP, et al. Semaglutide and cardiovascular outcomes in patients with type 2 diabetes. New England Journal of Medicine. 2016.",
        "Holst JJ. Mechanisms of action of GLP-1 in the pancreas. Diabetes. 2009.",
        "Blundell J, et al. Effect of semaglutide on energy intake, appetite, and gastric emptying. Obesity. 2017."
      ]}
      aboutParagraphs={[
        "Semaglutide was developed by Novo Nordisk, a Danish pharmaceutical company with a long history in diabetes research. The peptide emerged from decades of work on incretin hormones, particularly GLP-1, which was first characterized in the 1980s by researchers studying gut hormones and their role in glucose regulation.",
        "The development team, led by Dr. Lotte Bjerre Knudsen, spent years optimizing the GLP-1 molecule to extend its half-life from just a few minutes to approximately one week. They achieved this through strategic amino acid substitutions and the addition of a fatty acid chain that binds to albumin, protecting the peptide from enzymatic degradation.",
        "Semaglutide has become one of the most extensively studied peptides in metabolic research, with numerous publications examining its mechanisms and effects. Research continues to explore its interactions with GLP-1 receptors in various tissues, including the brain, pancreas, and cardiovascular system. This product is intended for research use only."
      ]}
      howItWorksIntro="Preclinical studies have examined semaglutide's role as a GLP-1 receptor agonist. Published investigations suggest involvement in glucose-dependent insulin secretion, appetite regulation, and metabolic pathway modulation."
      howItWorksAccordions={[
        { value: "receptor", iconName: "Target", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "GLP-1 Receptor Activation", content: "Semaglutide binds to GLP-1 receptors with high affinity, triggering intracellular cAMP production through Gs protein coupling. This activation cascade affects multiple downstream pathways including insulin gene transcription and beta cell proliferation in preclinical models." },
        { value: "appetite", iconName: "Brain", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "Central Appetite Signaling", content: "GLP-1 receptors in the hypothalamus and brainstem are activated by semaglutide, influencing satiety signaling and food intake behavior. Studies suggest effects on reward pathways and food preference in laboratory settings." },
        { value: "metabolism", iconName: "Flame", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "Metabolic Pathway Modulation", content: "Research indicates semaglutide may influence hepatic glucose production, gastric emptying, and lipid metabolism through both direct receptor activation and indirect hormonal effects." }
      ]}
    />
  );
};

export default GLP1SG;
