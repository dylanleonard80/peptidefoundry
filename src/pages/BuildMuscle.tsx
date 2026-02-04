import CategoryPageTemplate from "@/components/CategoryPageTemplate";
import { getMusclePeptides } from "@/data/peptides";

const BuildMuscle = () => (
  <CategoryPageTemplate
    title="Musculoskeletal Peptide Research"
    subtitle="Access peptide sequences studied in laboratory settings for growth factor signaling, myogenic pathways, and skeletal muscle physiology research."
    getPeptides={getMusclePeptides}
  />
);

export default BuildMuscle;
