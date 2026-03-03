import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { ProductJsonLd } from "@/components/ProductJsonLd";
import { SelankData } from "@/data/peptidePageData";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const Selank = () => {
  useDocumentMeta({
    title: "Selank | Peptide Foundry - Premium Research Peptides",
    description: "Buy high-purity Selank research peptide from Peptide Foundry. A peptide studied for anxiolytic activity and cognitive function. Verified quality, fast shipping.",
    canonicalPath: "/selank",
    ogType: "product",
  });

  return (
  <>
  <ProductJsonLd
    name="Selank Research Peptide"
    description={SelankData.description}
    slug="selank"
    casNumber={SelankData.casNumber}
  />
  <PeptidePageTemplate
    {...SelankData}
    coaSlot={<img src="/coa/selank.png" alt="Selank COA" className="w-full h-auto" />}
  />
  </>
  );
};

export default Selank;
