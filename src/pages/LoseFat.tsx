import CategoryPageTemplate from "@/components/CategoryPageTemplate";
import { getFatLossPeptides } from "@/data/peptides";

const LoseFat = () => (
  <CategoryPageTemplate
    title="Metabolic Peptide Research"
    subtitle="Source peptide sequences investigated in preclinical studies for metabolic signaling, lipid metabolism, and energy homeostasis research."
    getPeptides={getFatLossPeptides}
  />
);

export default LoseFat;
