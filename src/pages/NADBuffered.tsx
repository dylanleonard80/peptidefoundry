import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { ProductJsonLd } from "@/components/ProductJsonLd";
import { NADBufferedData } from "@/data/peptidePageData";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const NADBuffered = () => {
  useDocumentMeta({
    title: "NAD+ | Peptide Foundry - Premium Research Peptides",
    description: "Buy high-purity NAD+ research coenzyme from Peptide Foundry. A coenzyme studied for cellular energy metabolism and aging research. Verified quality, fast shipping.",
    canonicalPath: "/nad-buffered",
    ogType: "product",
  });

  return (
  <>
  <ProductJsonLd
    name="NAD+ Research Coenzyme"
    description={NADBufferedData.description}
    slug="nad-buffered"
    price={70}
    casNumber={NADBufferedData.casNumber}
  />
  <PeptidePageTemplate
    {...NADBufferedData}
    productImage="/products/nad-buffered.webp"
    coaSlot={<img src="/coa/nad-buffered.png" alt="NAD+ COA" className="w-full h-auto" />}
  />
  </>
  );
};

export default NADBuffered;
