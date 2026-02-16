import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { SermorelinData } from "@/data/peptidePageData";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const Sermorelin = () => {
  useDocumentMeta("Sermorelin | Peptide Foundry");
  return (
  <PeptidePageTemplate
    {...SermorelinData}
    coaSlot={<img src="/coa/sermorelin.png" alt="Sermorelin COA" className="w-full h-auto" />}
  />
  );
};

export default Sermorelin;
