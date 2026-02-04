import CategoryPageTemplate from "@/components/CategoryPageTemplate";
import { getHealingPeptides } from "@/data/peptides";

const Recovery = () => (
  <CategoryPageTemplate
    title="Tissue Repair Peptide Research"
    subtitle="Explore peptide sequences investigated in preclinical models for tissue regeneration, wound repair mechanisms, and inflammatory pathway modulation."
    getPeptides={getHealingPeptides}
  />
);

export default Recovery;
