import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { ProductJsonLd } from "@/components/ProductJsonLd";
import { SermorelinData } from "@/data/peptidePageData";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const Sermorelin = () => {
  useDocumentMeta({
    title: "Sermorelin | Peptide Foundry - Premium Research Peptides",
    description: "Buy high-purity Sermorelin research peptide from Peptide Foundry. A peptide studied for growth hormone releasing activity and pituitary function. Verified quality, fast shipping.",
    canonicalPath: "/sermorelin",
    ogType: "product",
  });
  return (
  <>
  <ProductJsonLd
    name="Sermorelin Research Peptide"
    description={SermorelinData.description}
    slug="sermorelin"
    casNumber={SermorelinData.casNumber}
  />
  <PeptidePageTemplate
    {...SermorelinData}
    coaSlot={<img src="/coa/sermorelin.png" alt="Sermorelin COA" className="w-full h-auto" />}
  />
  </>
  );
};

export default Sermorelin;
