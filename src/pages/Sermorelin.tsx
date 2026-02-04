import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { SermorelinData } from "@/data/peptidePageData";

const Sermorelin = () => (
  <PeptidePageTemplate
    slug="sermorelin"
    peptideName={SermorelinData.peptideName}
    productImage={SermorelinData.productImage}
    subtitle={SermorelinData.subtitle}
    description={SermorelinData.description}
    casNumber={SermorelinData.casNumber}
    molecularFormula={SermorelinData.molecularFormula}
    molarMass={SermorelinData.molarMass}
    prices={SermorelinData.prices}
    benefits={SermorelinData.benefits}
    references={SermorelinData.references}
    aboutParagraphs={SermorelinData.aboutParagraphs}
    howItWorksIntro={SermorelinData.howItWorksIntro}
    howItWorksAccordions={SermorelinData.howItWorksAccordions}
    technicalPathways={SermorelinData.technicalPathways}
    coaSlot={<img src="/coa/sermorelin.png" alt="Sermorelin COA" className="w-full h-auto" />}
  />
);

export default Sermorelin;
