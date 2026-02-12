import CategoryPageTemplate from "@/components/CategoryPageTemplate";
import { getAntiAgingPeptides } from "@/data/peptides";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const AntiAging = () => {
  useDocumentMeta("Anti-Aging Peptides | Peptide Foundry");
  return (
  <CategoryPageTemplate
    title="Cellular Aging Peptide Research"
    subtitle="Access peptide sequences studied in laboratory models for cellular senescence, neuroprotective mechanisms, and age-related pathway research."
    getPeptides={getAntiAgingPeptides}
  />
  );
};

export default AntiAging;
