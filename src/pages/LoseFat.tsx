import CategoryPageTemplate from "@/components/CategoryPageTemplate";
import { getFatLossPeptides } from "@/data/peptides";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const LoseFat = () => {
  useDocumentMeta("Fat Loss Peptides | Peptide Foundry");
  return (
  <CategoryPageTemplate
    title="Metabolic Peptide Research"
    subtitle="Source peptide sequences investigated in preclinical studies for metabolic signaling, lipid metabolism, and energy homeostasis research."
    getPeptides={getFatLossPeptides}
  />
  );
};

export default LoseFat;
