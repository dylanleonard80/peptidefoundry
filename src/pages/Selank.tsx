import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { SelankData } from "@/data/peptidePageData";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const Selank = () => {
  useDocumentMeta("Selank | Peptide Foundry");

  return (
  <PeptidePageTemplate
    {...SelankData}
    coaSlot={<img src="/coa/selank.png" alt="Selank COA" className="w-full h-auto" />}
  />
  );
};

export default Selank;
