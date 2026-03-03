import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { ProductJsonLd } from "@/components/ProductJsonLd";
import { TesamorelinData } from "@/data/peptidePageData";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const Tesamorelin = () => {
  useDocumentMeta({
    title: "Tesamorelin | Peptide Foundry - Premium Research Peptides",
    description: "Buy high-purity Tesamorelin research peptide from Peptide Foundry. A synthetic growth hormone-releasing hormone analog for growth hormone releasing activity. Verified quality, fast shipping.",
    canonicalPath: "/tesamorelin",
    ogType: "product",
  });
  return (
  <>
  <ProductJsonLd
    name="Tesamorelin Research Peptide"
    description={TesamorelinData.description}
    slug="tesamorelin"
    casNumber={TesamorelinData.casNumber}
  />
  <PeptidePageTemplate
    {...TesamorelinData}
    coaSlot={<img src="/coa/tesamorelin.png" alt="Tesamorelin COA" className="w-full h-auto" />}
  />
  </>
  );
};

export default Tesamorelin;
