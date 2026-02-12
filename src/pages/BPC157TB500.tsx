import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { bpc157tb500Data } from "@/data/blendPageData";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const BPC157TB500 = () => {
  useDocumentMeta("BPC-157 / TB-500 | Peptide Foundry");
  return <PeptidePageTemplate {...bpc157tb500Data} />;
};

export default BPC157TB500;
