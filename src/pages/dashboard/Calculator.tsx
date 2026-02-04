import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import PeptideCalculator from "@/components/PeptideCalculator";

const Calculator = () => {
  return (
    <DashboardLayout title="Peptide Calculator">
      <PeptideCalculator />
    </DashboardLayout>
  );
};

export default Calculator;
