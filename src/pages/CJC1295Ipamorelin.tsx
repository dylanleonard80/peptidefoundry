import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { ProductJsonLd } from "@/components/ProductJsonLd";
import { cjc1295IpamorelinData } from "@/data/blendPageData";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const CJC1295Ipamorelin = () => {
  useDocumentMeta({
    title: "CJC-1295 / Ipamorelin | Peptide Foundry - Premium Research Peptides",
    description: "Buy high-purity CJC-1295 + Ipamorelin research peptide blend from Peptide Foundry. A peptide blend studied for growth hormone secretion and body composition. Verified quality, fast shipping.",
    canonicalPath: "/cjc-1295-ipamorelin",
    ogType: "product",
  });
  return (
  <>
  <ProductJsonLd
    name="CJC-1295 + Ipamorelin Research Peptide Blend"
    description="CJC-1295 with Ipamorelin is a synergistic peptide combination that optimizes natural growth hormone secretion without receptor desensitization. CJC-1295 (a long-acting GHRH analog) amplifies GH pulse amplitude, while Ipamorelin (a selective ghrelin mimetic) increases pulse frequency, resulting in sustained, physiological GH elevation."
    slug="cjc-1295-ipamorelin"
    price={90}
    casNumber="863288-34-0"
  />
  <PeptidePageTemplate
      {...cjc1295IpamorelinData}
      coaSlot={<img src="/coa/cjc1295-ipamorelin.png" alt="CJC-1295 + Ipamorelin COA" className="w-full h-auto" />}
    />
  </>
  );
};

export default CJC1295Ipamorelin;
