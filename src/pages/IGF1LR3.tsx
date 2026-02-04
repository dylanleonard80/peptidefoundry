import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { IGF1LR3Data } from "@/data/peptidePageData";

const IGF1LR3 = () => (
  <PeptidePageTemplate
    slug="igf-1-lr3"
    peptideName={IGF1LR3Data.peptideName}
    productImage={IGF1LR3Data.productImage}
    subtitle={IGF1LR3Data.subtitle}
    description={IGF1LR3Data.description}
    additionalDescription={IGF1LR3Data.additionalDescription}
    casNumber={IGF1LR3Data.casNumber}
    molecularFormula={IGF1LR3Data.molecularFormula}
    molarMass={IGF1LR3Data.molarMass}
    prices={IGF1LR3Data.prices}
    benefits={IGF1LR3Data.benefits}
    references={IGF1LR3Data.references}
    aboutParagraphs={IGF1LR3Data.aboutParagraphs}
    howItWorksIntro={IGF1LR3Data.howItWorksIntro}
    howItWorksAccordions={IGF1LR3Data.howItWorksAccordions}
    technicalPathways={IGF1LR3Data.technicalPathways}
    coaSlot={<img src="/coa/igf1-lr3.png" alt="IGF-1 LR3 COA" className="w-full h-auto" />}
  />
);

export default IGF1LR3;
