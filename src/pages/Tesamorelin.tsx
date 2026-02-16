import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { TesamorelinData } from "@/data/peptidePageData";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const Tesamorelin = () => {
  useDocumentMeta("Tesamorelin | Peptide Foundry");
  return (
  <PeptidePageTemplate
    {...TesamorelinData}
    coaSlot={<img src="/coa/tesamorelin.png" alt="Tesamorelin COA" className="w-full h-auto" />}
  />
  );
};

export default Tesamorelin;
