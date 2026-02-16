import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { RetatrutideData } from "@/data/peptidePageData";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const GLP3RT = () => {
  useDocumentMeta("Retatrutide | Peptide Foundry");
  return (
  <PeptidePageTemplate
    {...RetatrutideData}
    productImages={{
      "12mg": "/products/glp-3rt-12mg.webp",
      "24mg": "/products/glp-3rt-24mg.webp"
    }}
  />
  );
};

export default GLP3RT;
