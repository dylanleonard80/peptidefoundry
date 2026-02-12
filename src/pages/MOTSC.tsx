import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { MOTSCData } from "@/data/peptidePageData";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const MOTSC = () => {
  useDocumentMeta("MOTS-C | Peptide Foundry");

  return (
  <PeptidePageTemplate
    slug="mots-c"
    peptideName={MOTSCData.peptideName}
    productImage="/products/mots-c.webp"
    subtitle={MOTSCData.subtitle}
    description={MOTSCData.description}
    casNumber={MOTSCData.casNumber}
    molecularFormula={MOTSCData.molecularFormula}
    molarMass={MOTSCData.molarMass}
    prices={MOTSCData.prices}
    benefits={MOTSCData.benefits}
    references={MOTSCData.references}
    aboutParagraphs={MOTSCData.aboutParagraphs}
    howItWorksIntro={MOTSCData.howItWorksIntro}
    howItWorksAccordions={MOTSCData.howItWorksAccordions}
    technicalPathways={MOTSCData.technicalPathways}
    coaSlot={<img src="/coa/mots-c.png" alt="MOTS-C COA" className="w-full h-auto" />}
  />
  );
};

export default MOTSC;
