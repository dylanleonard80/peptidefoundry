import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { getPrices } from "@/data/priceData";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const TB500 = () => {
  useDocumentMeta("TB-500 | Peptide Foundry");
  return (
  <PeptidePageTemplate
    slug="tb-500"
    peptideName="TB-500"
    productImage="/products/tb-500.webp"
    coaSlot={<img src="/coa/tb-500.png" alt="TB-500 COA" className="w-full h-auto" />}
    subtitle="A peptide studied in laboratory settings for cellular migration and tissue repair mechanisms"
    description="TB-500 is a synthetic version of a naturally occurring peptide present in virtually all human cells called Thymosin Beta 4 (Tβ4). It has been extensively studied in preclinical models for its effects on tissue repair, wound healing, and cellular migration."
    casNumber="77591-33-4"
    molecularFormula="C₂₁₂H₃₅₀N₅₆O₇₈S"
    molarMass="4963.5 g/mol"
    prices={getPrices("tb-500")!}
    benefits={[
      {
        iconName: "Activity",
        iconBgClass: "bg-blue-100 dark:bg-blue-900/30",
        title: "Tissue Repair & Wound Healing Research",
        description:
          "Investigated in preclinical models for roles in cell migration and tissue repair mechanisms",
        link: "(Preclinical Study)",
      },
      {
        iconName: "Target",
        iconBgClass: "bg-green-100 dark:bg-green-900/30",
        title: "Cell Migration & Cytoskeletal Function",
        description:
          "Studied for its role in actin regulation and directional cell movement critical to regenerative processes",
        link: "(Preclinical Study)",
      },
      {
        iconName: "Heart",
        iconBgClass: "bg-red-100 dark:bg-red-900/30",
        title: "Cardiac Regenerative Research",
        description:
          "Examined in animal models for effects on epicardial progenitor activation and neovascularization following cardiac injury",
        link: "(Preclinical Study)",
      },
      {
        iconName: "Sparkles",
        iconBgClass: "bg-purple-100 dark:bg-purple-900/30",
        title: "Skin & Hair Follicle Research",
        description:
          "Investigated for its role in dermal biology and hair follicle growth signaling pathways",
        link: "(Preclinical Study)",
      },
    ]}
    references={[
      "Philp D, et al. Thymosin beta4 promotes dermal healing. Journal of Investigative Dermatology. 2003.",
      "Bock-Marquette I, et al. Thymosin beta4 activates integrin-linked kinase and promotes cardiac cell migration, survival and cardiac repair. Nature. 2004.",
      "Smart N, et al. Thymosin beta4 induces adult epicardial progenitor mobilization and neovascularization. Nature. 2007.",
      "Xiong Y, et al. Thymosin beta4 treatment exerts neuroprotective effects on experimental models of traumatic brain injury. Journal of Neurosurgery. 2012.",
      "Sosne G, et al. Anti-inflammatory effects of thymosin beta4. Annals of the New York Academy of Sciences. 2007."
    ]}
    aboutParagraphs={[
      "TB-500 is the synthetic version of a naturally occurring peptide called Thymosin Beta-4. The original compound was discovered in the 1960s by Dr. Allan Goldstein and his team at the National Institutes of Health. They were studying the thymus gland—a small organ near the heart that plays a role in the immune system—when they found this peptide present in nearly every cell in the body.",
      "What made Thymosin Beta-4 interesting wasn't its connection to the thymus, but what it seemed to do for cells. Scientists discovered it helped with something called actin regulation—basically, it affected how cells move around and change shape. This turned out to be important for wound healing and tissue repair, since repair cells need to travel to damaged areas.",
      "Over the years, TB-500 became popular in research labs studying tissue repair, wound healing, and related biological processes. It's been studied in everything from eye injuries to heart tissue to skin wounds. Today, it's one of the most widely used peptides for cellular migration and repair research. This product is intended for research use only.",
    ]}
    howItWorksIntro="TB-500 works primarily by sequestering G-actin, which promotes cellular migration and differentiation. This enables repair cells to reach damaged tissues more effectively, while also promoting angiogenesis and reducing inflammation."
    howItWorksAccordions={[
      {
        value: "actin",
        iconName: "Workflow",
        iconBgClass: "bg-blue-100 dark:bg-blue-900/30",
        title: "Actin Sequestration",
        content:
          "TB-500 binds G-actin monomers, preventing their polymerization into F-actin filaments. This promotes cellular plasticity and motility, allowing cells to change shape and migrate more effectively to sites of injury.",
      },
      {
        value: "migration",
        iconName: "Target",
        iconBgClass: "bg-green-100 dark:bg-green-900/30",
        title: "Enhanced Cell Migration",
        content:
          "By modulating the actin cytoskeleton, TB-500 enables stem cells, endothelial cells, and keratinocytes to migrate efficiently. This accelerates wound closure and tissue repair across multiple tissue types.",
      },
      {
        value: "angiogenesis",
        iconName: "Heart",
        iconBgClass: "bg-red-100 dark:bg-red-900/30",
        title: "Angiogenesis Promotion",
        content:
          "TB-500 promotes new blood vessel formation by enhancing endothelial cell migration and tube formation. This improves blood supply to damaged tissues, supporting nutrient delivery and waste removal during repair.",
      },
    ]}
  />
  );
};

export default TB500;
