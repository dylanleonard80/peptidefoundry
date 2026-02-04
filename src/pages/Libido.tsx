import CategoryPageTemplate from "@/components/CategoryPageTemplate";
import { getLibidoPeptides } from "@/data/peptides";

const Libido = () => (
  <CategoryPageTemplate
    title="Endocrine Peptide Research"
    subtitle="Source peptide sequences investigated in preclinical models for hormone signaling, reproductive physiology, and endocrine pathway research."
    getPeptides={getLibidoPeptides}
  />
);

export default Libido;
