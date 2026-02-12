import CategoryPageTemplate from "@/components/CategoryPageTemplate";
import { getHealingPeptides } from "@/data/peptides";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const Recovery = () => {
  useDocumentMeta("Recovery Peptides | Peptide Foundry");
  return (
  <CategoryPageTemplate
    title="Tissue Repair Peptide Research"
    subtitle="Explore peptide sequences investigated in preclinical models for tissue regeneration, wound repair mechanisms, and inflammatory pathway modulation."
    getPeptides={getHealingPeptides}
  />
  );
};

export default Recovery;
