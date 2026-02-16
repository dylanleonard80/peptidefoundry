import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { NADBufferedData } from "@/data/peptidePageData";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const NADBuffered = () => {
  useDocumentMeta("NAD+ Buffered | Peptide Foundry");

  return (
  <PeptidePageTemplate
    {...NADBufferedData}
    productImage="/products/nad-buffered.webp"
    coaSlot={<img src="/coa/nad-buffered.png" alt="NAD+ Buffered COA" className="w-full h-auto" />}
  />
  );
};

export default NADBuffered;
