import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { ProductJsonLd } from "@/components/ProductJsonLd";
import { RetatrutideData } from "@/data/peptidePageData";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const GLP3RT = () => {
  useDocumentMeta({
    title: "GLP-3RT | Peptide Foundry - Premium Research Peptides",
    description: "Buy high-purity GLP-3RT research peptide from Peptide Foundry. A peptide studied for triple incretin receptor agonism and metabolic regulation. Verified quality, fast shipping.",
    canonicalPath: "/retatrutide",
    ogType: "product",
  });
  return (
  <>
  <ProductJsonLd
    name="GLP-3RT Research Peptide"
    description={RetatrutideData.description}
    slug="retatrutide"
    casNumber={RetatrutideData.casNumber}
  />
  <PeptidePageTemplate
    {...RetatrutideData}
    productImages={{
      "10mg": "/products/glp-3rt-10mg.webp",
      "20mg": "/products/glp-3rt-20mg.webp"
    }}
  />
  </>
  );
};

export default GLP3RT;
