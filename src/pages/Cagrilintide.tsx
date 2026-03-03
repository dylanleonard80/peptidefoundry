import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { ProductJsonLd } from "@/components/ProductJsonLd";
import { CagrilintideData } from "@/data/peptidePageData";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const Cagrilintide = () => {
  useDocumentMeta({
    title: "Cagrilintide | Peptide Foundry - Premium Research Peptides",
    description: "Buy high-purity Cagrilintide research peptide from Peptide Foundry. A peptide studied for appetite regulation and weight management. Verified quality, fast shipping.",
    canonicalPath: "/cagrilintide",
    ogType: "product",
  });
  return (
  <>
  <ProductJsonLd
    name="Cagrilintide Research Peptide"
    description={CagrilintideData.description}
    slug="cagrilintide"
    price={139}
    casNumber={CagrilintideData.casNumber}
  />
  <PeptidePageTemplate
    {...CagrilintideData}
    productImage="/products/cagrilintide.webp"
    coaSlot={<img src="/coa/cagrilintide.png" alt="Cagrilintide COA" className="w-full h-auto" />}
  />
  </>
  );
};

export default Cagrilintide;
