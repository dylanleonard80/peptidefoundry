import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { CagrilintideData } from "@/data/peptidePageData";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const Cagrilintide = () => {
  useDocumentMeta("Cagrilintide | Peptide Foundry");
  return (
  <PeptidePageTemplate
    slug="cagrilintide"
    peptideName={CagrilintideData.peptideName}
    productImage="/products/cagrilintide.webp"
    subtitle={CagrilintideData.subtitle}
    description={CagrilintideData.description}
    casNumber={CagrilintideData.casNumber}
    molecularFormula={CagrilintideData.molecularFormula}
    molarMass={CagrilintideData.molarMass}
    prices={CagrilintideData.prices}
    benefits={CagrilintideData.benefits}
    references={CagrilintideData.references}
    aboutParagraphs={CagrilintideData.aboutParagraphs}
    howItWorksIntro={CagrilintideData.howItWorksIntro}
    howItWorksAccordions={CagrilintideData.howItWorksAccordions}
    technicalPathways={CagrilintideData.technicalPathways}
    coaSlot={<img src="/coa/cagrilintide.png" alt="Cagrilintide COA" className="w-full h-auto" />}
  />
  );
};

export default Cagrilintide;
