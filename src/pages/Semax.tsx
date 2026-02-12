import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { SemaxData } from "@/data/peptidePageData";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const Semax = () => {
  useDocumentMeta("Semax | Peptide Foundry");

  return (
  <PeptidePageTemplate
    slug="semax"
    peptideName={SemaxData.peptideName}
    productImage="/products/semax.webp"
    subtitle={SemaxData.subtitle}
    description={SemaxData.description}
    casNumber={SemaxData.casNumber}
    molecularFormula={SemaxData.molecularFormula}
    molarMass={SemaxData.molarMass}
    prices={SemaxData.prices}
    benefits={SemaxData.benefits}
    references={SemaxData.references}
    aboutParagraphs={SemaxData.aboutParagraphs}
    howItWorksIntro={SemaxData.howItWorksIntro}
    howItWorksAccordions={SemaxData.howItWorksAccordions}
    technicalPathways={SemaxData.technicalPathways}
    coaSlot={<img src="/coa/semax.png" alt="Semax COA" className="w-full h-auto" />}
  />
  );
};

export default Semax;
