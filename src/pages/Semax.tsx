import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { SemaxData } from "@/data/peptidePageData";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const Semax = () => {
  useDocumentMeta("Semax | Peptide Foundry");

  return (
  <PeptidePageTemplate
    {...SemaxData}
    productImage="/products/semax.webp"
    coaSlot={<img src="/coa/semax.png" alt="Semax COA" className="w-full h-auto" />}
  />
  );
};

export default Semax;
