import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { SelankData } from "@/data/peptidePageData";

const Selank = () => (
  <PeptidePageTemplate
    slug="selank"
    peptideName={SelankData.peptideName}
    productImage="/products/selank.webp"
    subtitle={SelankData.subtitle}
    description={SelankData.description}
    casNumber={SelankData.casNumber}
    molecularFormula={SelankData.molecularFormula}
    molarMass={SelankData.molarMass}
    prices={SelankData.prices}
    benefits={SelankData.benefits}
    references={SelankData.references}
    aboutParagraphs={SelankData.aboutParagraphs}
    howItWorksIntro={SelankData.howItWorksIntro}
    howItWorksAccordions={SelankData.howItWorksAccordions}
    technicalPathways={SelankData.technicalPathways}
    coaSlot={<img src="/coa/selank.png" alt="Selank COA" className="w-full h-auto" />}
  />
);

export default Selank;
