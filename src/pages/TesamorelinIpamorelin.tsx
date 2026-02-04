import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";
import { getPrices } from "@/data/priceData";

const TesamorelinIpamorelin = () => {
  return (
    <PeptidePageTemplate
      slug="tesamorelin-ipamorelin"
      peptideName="Tesamorelin / Ipamorelin"
      productImage="/products/tesamorelin-ipamorelin.webp"
      coaSlot={<img src="/coa/tesamorelin-ipamorelin.png" alt="Tesamorelin / Ipamorelin COA" className="w-full h-auto" />}
      subtitle="A peptide blend studied in laboratory settings for growth hormone secretion and somatotroph pathway research."
      components={[
        { name: "Tesamorelin", casNumber: "218949-48-5", molecularFormula: "C₂₂₁H₃₆₆N₇₂O₆₇S", molarMass: "5135.83 g/mol" },
        { name: "Ipamorelin", casNumber: "170851-70-4", molecularFormula: "C₃₈H₄₉N₉O₅", molarMass: "711.85 g/mol" }
      ]}
      description="This research blend combines Tesamorelin, a synthetic growth hormone-releasing hormone (GHRH) analog, with Ipamorelin, a selective growth hormone secretagogue receptor (GHSR) agonist. Together, they represent a dual-pathway approach to studying growth hormone release mechanisms in preclinical models."
      benefits={[
        { iconName: "TrendingUp", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "Sustained Growth Hormone & IGF-1 Axis Activation — Human (GHRH Analog)", description: "Tesamorelin-class GHRH analog research demonstrating sustained GH/IGF-1 signaling and preserved pulsatility", link: "(Human Study)" },
        { iconName: "Target", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "Selective GH Secretagogue Signaling — Human (Ghrelin Pathway)", description: "Ipamorelin research characterizing selective GH release and human PK/PD", link: "(Human Study)" },
        { iconName: "Flame", iconBgClass: "bg-orange-100 dark:bg-orange-900/30", title: "Visceral Adipose Tissue & Fat Distribution Research — Human", description: "Tesamorelin research in HIV-associated central adiposity models", link: "(Human Study)" },
        { iconName: "Activity", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "Pulsatile GH Secretion Preservation Under Chronic Stimulation — Human", description: "Demonstrates preserved physiological GH pulsatility under long-acting GHRH stimulation", link: "(Human Study)" },
      ]}
      aboutParagraphs={[
        "Tesamorelin was developed by Theratechnologies and received FDA approval in 2010 for the reduction of excess abdominal fat in HIV-infected patients with lipodystrophy. It is a synthetic analog of growth hormone-releasing hormone (GHRH) with 44 amino acids, featuring a trans-3-hexenoic acid modification at the N-terminus.",
        "Ipamorelin was discovered in the 1990s through systematic screening of growth hormone secretagogue candidates. Unlike earlier secretagogues such as GHRP-6, Ipamorelin demonstrated high selectivity for growth hormone release without significantly affecting cortisol, prolactin, or aldosterone levels.",
        "The combination of these two peptides in a research blend allows investigators to study the potential synergistic effects of simultaneously activating both GHRH and ghrelin receptor pathways. All products supplied by Peptide Direct are intended strictly for research use only."
      ]}
      howItWorksIntro="This blend combines two complementary mechanisms: Tesamorelin's GHRH receptor activation and Ipamorelin's selective GHSR agonism, providing researchers with a tool to study synergistic growth hormone release pathways."
      howItWorksAccordions={[
        { value: "ghrh-pathway", iconName: "Waves", iconBgClass: "bg-blue-100 dark:bg-blue-900/30", title: "GHRH Receptor Activation (Tesamorelin)", content: "Tesamorelin binds to GHRH receptors on pituitary somatotrophs, stimulating the synthesis and pulsatile release of growth hormone through cAMP-mediated signaling pathways." },
        { value: "ghsr-pathway", iconName: "Target", iconBgClass: "bg-green-100 dark:bg-green-900/30", title: "GHSR Agonism (Ipamorelin)", content: "Ipamorelin selectively activates the growth hormone secretagogue receptor (GHSR/ghrelin receptor), amplifying GH release through a pathway that complements GHRH signaling without significant effects on other pituitary hormones." },
        { value: "synergistic-research", iconName: "Combine", iconBgClass: "bg-purple-100 dark:bg-purple-900/30", title: "Complementary Pathway Research", content: "By combining GHRH and ghrelin receptor activation, researchers can investigate the potential additive or synergistic effects on growth hormone pulse amplitude and frequency in preclinical models." }
      ]}
      prices={getPrices("tesamorelin-ipamorelin")!}
      references={[]}
    />
  );
};

export default TesamorelinIpamorelin;
