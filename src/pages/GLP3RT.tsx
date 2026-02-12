import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { RetatrutideData } from "@/data/peptidePageData";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const GLP3RT = () => {
  useDocumentMeta("Retatrutide | Peptide Foundry");
  return (
  <PeptidePageTemplate
    slug="retatrutide"
    peptideName={RetatrutideData.peptideName}
    productImage={RetatrutideData.productImage}
    productImages={{
      "12mg": "/products/glp-3rt-12mg.webp",
      "24mg": "/products/glp-3rt-24mg.webp"
    }}
    subtitle={RetatrutideData.subtitle}
    description={RetatrutideData.description}
    casNumber={RetatrutideData.casNumber}
    molecularFormula={RetatrutideData.molecularFormula}
    molarMass={RetatrutideData.molarMass}
    prices={RetatrutideData.prices}
    benefits={RetatrutideData.benefits}
    references={RetatrutideData.references}
    aboutParagraphs={RetatrutideData.aboutParagraphs}
    howItWorksIntro={RetatrutideData.howItWorksIntro}
    howItWorksAccordions={RetatrutideData.howItWorksAccordions}
    technicalPathways={RetatrutideData.technicalPathways}
  />
  );
};

export default GLP3RT;
