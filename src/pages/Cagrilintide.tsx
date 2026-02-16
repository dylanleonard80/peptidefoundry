import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { CagrilintideData } from "@/data/peptidePageData";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const Cagrilintide = () => {
  useDocumentMeta("Cagrilintide | Peptide Foundry");
  return (
  <PeptidePageTemplate
    {...CagrilintideData}
    productImage="/products/cagrilintide.webp"
    coaSlot={<img src="/coa/cagrilintide.png" alt="Cagrilintide COA" className="w-full h-auto" />}
  />
  );
};

export default Cagrilintide;
