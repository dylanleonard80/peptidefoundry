import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { IGF1LR3Data } from "@/data/peptidePageData";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const IGF1LR3 = () => {
  useDocumentMeta("IGF-1 LR3 | Peptide Foundry");
  return (
  <PeptidePageTemplate
    {...IGF1LR3Data}
    coaSlot={<img src="/coa/igf1-lr3.png" alt="IGF-1 LR3 COA" className="w-full h-auto" />}
  />
  );
};

export default IGF1LR3;
