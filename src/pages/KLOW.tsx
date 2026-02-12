import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { klowData } from "@/data/blendPageData";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const KLOW = () => {
  useDocumentMeta("KLOW Blend | Peptide Foundry");
  return (
    <PeptidePageTemplate 
      {...klowData} 
      coaSlot={<img src="/coa/klow.png" alt="KLOW COA" className="w-full h-auto" />}
    />
  );
};

export default KLOW;
