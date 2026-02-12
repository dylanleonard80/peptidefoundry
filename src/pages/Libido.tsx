import CategoryPageTemplate from "@/components/CategoryPageTemplate";
import { getLibidoPeptides } from "@/data/peptides";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const Libido = () => {
  useDocumentMeta("Sexual Health Peptides | Peptide Foundry");
  return (
  <CategoryPageTemplate
    title="Endocrine Peptide Research"
    subtitle="Source peptide sequences investigated in preclinical models for hormone signaling, reproductive physiology, and endocrine pathway research."
    getPeptides={getLibidoPeptides}
  />
  );
};

export default Libido;
