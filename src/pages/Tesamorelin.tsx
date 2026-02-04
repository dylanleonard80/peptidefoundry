import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { TesamorelinData } from "@/data/peptidePageData";

const Tesamorelin = () => (
  <PeptidePageTemplate
    slug="tesamorelin"
    peptideName={TesamorelinData.peptideName}
    productImage={TesamorelinData.productImage}
    subtitle={TesamorelinData.subtitle}
    description={TesamorelinData.description}
    casNumber={TesamorelinData.casNumber}
    molecularFormula={TesamorelinData.molecularFormula}
    molarMass={TesamorelinData.molarMass}
    prices={TesamorelinData.prices}
    benefits={TesamorelinData.benefits}
    references={TesamorelinData.references}
    aboutParagraphs={TesamorelinData.aboutParagraphs}
    howItWorksIntro={TesamorelinData.howItWorksIntro}
    howItWorksAccordions={TesamorelinData.howItWorksAccordions}
    technicalPathways={TesamorelinData.technicalPathways}
    coaSlot={<img src="/coa/tesamorelin.png" alt="Tesamorelin COA" className="w-full h-auto" />}
  />
);

export default Tesamorelin;
