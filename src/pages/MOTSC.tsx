import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { ProductJsonLd } from "@/components/ProductJsonLd";
import { MOTSCData } from "@/data/peptidePageData";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const MOTSC = () => {
  useDocumentMeta({
    title: "MOTS-C | Peptide Foundry - Premium Research Peptides",
    description: "Buy high-purity MOTS-C research peptide from Peptide Foundry. A peptide studied for mitochondrial function and metabolic homeostasis. Verified quality, fast shipping.",
    canonicalPath: "/mots-c",
    ogType: "product",
  });

  return (
  <>
  <ProductJsonLd
    name="MOTS-C Research Peptide"
    description={MOTSCData.description}
    slug="mots-c"
    casNumber={MOTSCData.casNumber}
  />
  <PeptidePageTemplate
    {...MOTSCData}
    productImage="/products/mots-c.webp"
    coaSlot={<img src="/coa/mots-c.png" alt="MOTS-C COA" className="w-full h-auto" />}
  />
  </>
  );
};

export default MOTSC;
