import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { RetatrutideData } from "@/data/peptidePageData";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const GLP3RT = () => {
  useDocumentMeta("Retatrutide | Peptide Foundry");
  return (
  <PeptidePageTemplate
    {...RetatrutideData}
    productImages={{
      "10mg": "/products/glp-3rt-10mg.webp",
      "20mg": "/products/glp-3rt-20mg.webp"
    }}
  />
  );
};

export default GLP3RT;
