import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { klowData } from "@/data/blendPageData";

const KLOW = () => {
  return (
    <PeptidePageTemplate 
      {...klowData} 
      coaSlot={<img src="/coa/klow.png" alt="KLOW COA" className="w-full h-auto" />}
    />
  );
};

export default KLOW;
