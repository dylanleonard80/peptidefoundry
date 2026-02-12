import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { NADBufferedData } from "@/data/peptidePageData";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const NADBuffered = () => {
  useDocumentMeta("NAD+ Buffered | Peptide Foundry");

  return (
  <PeptidePageTemplate
    slug="nad-buffered"
    peptideName={NADBufferedData.peptideName}
    productImage="/products/nad-buffered.webp"
    subtitle={NADBufferedData.subtitle}
    description={NADBufferedData.description}
    casNumber={NADBufferedData.casNumber}
    molecularFormula={NADBufferedData.molecularFormula}
    molarMass={NADBufferedData.molarMass}
    prices={NADBufferedData.prices}
    benefits={NADBufferedData.benefits}
    references={NADBufferedData.references}
    aboutParagraphs={NADBufferedData.aboutParagraphs}
    howItWorksIntro={NADBufferedData.howItWorksIntro}
    howItWorksAccordions={NADBufferedData.howItWorksAccordions}
    technicalPathways={NADBufferedData.technicalPathways}
    coaSlot={<img src="/coa/nad-buffered.png" alt="NAD+ Buffered COA" className="w-full h-auto" />}
  />
  );
};

export default NADBuffered;
