import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { cjc1295IpamorelinData } from "@/data/blendPageData";

const CJC1295Ipamorelin = () => {
  return (
    <PeptidePageTemplate 
      {...cjc1295IpamorelinData} 
      coaSlot={<img src="/coa/cjc1295-ipamorelin.png" alt="CJC-1295 + Ipamorelin COA" className="w-full h-auto" />}
    />
  );
};

export default CJC1295Ipamorelin;
