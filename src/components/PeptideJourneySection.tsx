import React, { useState } from "react";
import { Atom, FlaskConical, Radio, Microscope, TestTube2, BarChart3, Dna, Beaker } from "lucide-react";
import { Card } from "@/components/ui/card";
interface StageCardProps {
  number: number;
  title: string;
  description: string;
  active: boolean;
  onClick: () => void;
}
const StageCard = ({
  number,
  title,
  description,
  active,
  onClick
}: StageCardProps) => {
  return <Card onClick={onClick} className={`p-3 cursor-pointer transition-all duration-300 ${active ? "bg-primary text-primary-foreground shadow-lg scale-105" : "bg-card hover:bg-accent hover:shadow-md"}`}>
      <div className="flex items-start gap-2">
        <div className={`text-4xl font-bold ${active ? "text-primary-foreground" : "text-muted-foreground"}`}>
          {String(number).padStart(2, "0")}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className={active ? "text-primary-foreground/90" : "text-muted-foreground"}>
            {description}
          </p>
        </div>
      </div>
    </Card>;
};
const PeptideJourneySection = () => {
  const [activeStage, setActiveStage] = useState(0);
  const stages = [{
    title: "Discovery Era (1900s-1950s)",
    description: "Scientists first isolated and identified peptide hormones like insulin (1921) and oxytocin (1952). These discoveries revealed that small protein fragments could have profound biological effects.",
    icon: Microscope
  }, {
    title: "Synthesis Breakthroughs (1960s-1980s)",
    description: "Bruce Merrifield's solid-phase peptide synthesis (1963) revolutionized the field, earning him the Nobel Prize. For the first time, researchers could create custom peptides in the laboratory.",
    icon: FlaskConical
  }, {
    title: "Therapeutic Development (1990s-2010s)",
    description: "Peptide-based drugs entered mainstream medicine. Advances in delivery systems and stability allowed peptides to move from research tools to pharmaceutical applications.",
    icon: Beaker
  }, {
    title: "Modern Research Era (2010s-Present)",
    description: "Today, over 80 peptide drugs are FDA-approved, including semaglutide and tirzepatide. Many promising peptides remain in research stages—not because they lack potential, but simply because they haven't yet completed the lengthy approval process.",
    icon: Dna
  }];
  const currentStage = stages[activeStage];
  const Icon = currentStage.icon;
  return <section className="py-16 sm:py-24 px-4 bg-gradient-to-b from-background to-accent/20">
      
    </section>;
};
export default PeptideJourneySection;