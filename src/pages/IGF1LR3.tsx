import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { ProductJsonLd } from "@/components/ProductJsonLd";
import { IGF1LR3Data } from "@/data/peptidePageData";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const IGF1LR3 = () => {
  useDocumentMeta({
    title: "IGF-1 LR3 | Peptide Foundry - Premium Research Peptides",
    description: "Buy high-purity IGF-1 LR3 research peptide from Peptide Foundry. A peptide studied for cellular growth, proliferation, and tissue development. Verified quality, fast shipping.",
    canonicalPath: "/igf-1-lr3",
    ogType: "product",
  });
  return (
  <>
  <ProductJsonLd
    name="IGF-1 LR3 Research Peptide"
    description={IGF1LR3Data.description}
    slug="igf-1-lr3"
    price={185}
    casNumber={IGF1LR3Data.casNumber}
  />
  <PeptidePageTemplate
    {...IGF1LR3Data}
    coaSlot={<img src="/coa/igf1-lr3.png" alt="IGF-1 LR3 COA" className="w-full h-auto" />}
  />
  </>
  );
};

export default IGF1LR3;
