import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { ProductJsonLd } from "@/components/ProductJsonLd";
import { SemaxData } from "@/data/peptidePageData";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const Semax = () => {
  useDocumentMeta({
    title: "Semax | Peptide Foundry - Premium Research Peptides",
    description: "Buy high-purity Semax research peptide from Peptide Foundry. A peptide studied for neuroprotection and cognitive enhancement. Verified quality, fast shipping.",
    canonicalPath: "/semax",
    ogType: "product",
  });

  return (
  <>
  <ProductJsonLd
    name="Semax Research Peptide"
    description={SemaxData.description}
    slug="semax"
    price={50}
    casNumber={SemaxData.casNumber}
  />
  <PeptidePageTemplate
    {...SemaxData}
    productImage="/products/semax.webp"
    coaSlot={<img src="/coa/semax.png" alt="Semax COA" className="w-full h-auto" />}
  />
  </>
  );
};

export default Semax;
