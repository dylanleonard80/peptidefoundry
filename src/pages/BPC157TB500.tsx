import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { ProductJsonLd } from "@/components/ProductJsonLd";
import { bpc157tb500Data } from "@/data/blendPageData";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const BPC157TB500 = () => {
  useDocumentMeta({
    title: "BPC-157 / TB-500 | Peptide Foundry - Premium Research Peptides",
    description: "Buy high-purity BPC-157 + TB-500 research peptide blend from Peptide Foundry. A peptide blend studied for tissue repair and recovery mechanisms. Verified quality, fast shipping.",
    canonicalPath: "/bpc-157-tb-500",
    ogType: "product",
  });
  return (
  <>
  <ProductJsonLd
    name="BPC-157 + TB-500 Research Peptide Blend"
    description="This synergistic blend combines BPC-157's angiogenic and gastroprotective properties with TB-500's actin regulation and cellular migration capabilities, creating a comprehensive healing formula for accelerated recovery from musculoskeletal injuries, surgical wounds, and chronic inflammatory conditions."
    slug="bpc-157-tb-500"
    casNumber="137525-51-0"
  />
  <PeptidePageTemplate {...bpc157tb500Data} />
  </>
  );
};

export default BPC157TB500;
