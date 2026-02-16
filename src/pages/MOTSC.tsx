import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { MOTSCData } from "@/data/peptidePageData";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const MOTSC = () => {
  useDocumentMeta("MOTS-C | Peptide Foundry");

  return (
  <PeptidePageTemplate
    {...MOTSCData}
    productImage="/products/mots-c.webp"
    coaSlot={<img src="/coa/mots-c.png" alt="MOTS-C COA" className="w-full h-auto" />}
  />
  );
};

export default MOTSC;
