import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { ProductJsonLd } from "@/components/ProductJsonLd";
import { klowData } from "@/data/blendPageData";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const KLOW = () => {
  useDocumentMeta({
    title: "KLOW | Peptide Foundry - Premium Research Peptides",
    description: "Buy high-purity KLOW research peptide blend from Peptide Foundry. A peptide blend studied for gastrointestinal healing and tissue repair. Verified quality, fast shipping.",
    canonicalPath: "/klow",
    ogType: "product",
  });
  return (
  <>
  <ProductJsonLd
    name="KLOW Research Peptide Blend"
    description={klowData.description}
    slug="klow"
    casNumber="137525-51-0"
  />
    <PeptidePageTemplate
      {...klowData}
      coaSlot={<img src="/coa/klow.png" alt="KLOW COA" className="w-full h-auto" />}
    />
  </>
  );
};

export default KLOW;
