import { PeptidePageTemplate } from "@/components/PeptidePageTemplate";

const BPC157 = () => (
  <PeptidePageTemplate
    slug="bpc-157"
    peptideName="BPC-157"
    productImageSlot={
      <img
        alt="BPC-157 vial product photo"
        className="w-full h-auto rounded-md object-contain drop-shadow-[0_0_40px_rgba(255,107,0,0.3)] transition-all duration-300 hover:scale-105"
        src="/products/bpc-157.webp"
      />
    }
    coaSlot={
      <img
        alt="BPC-157 COA"
        className="w-full h-auto"
        src="/lovable-uploads/3546858e-7fa0-4165-ae0d-fbcc785e8c3b.png"
      />
    }
    subtitle="A peptide studied in laboratory settings for tissue regeneration and healing mechanisms"
    description="BPC-157 is a short chain of amino acids, a peptide naturally found in gastric juice. It's often called a 'body protection compound' due to its wide-ranging potential benefits, particularly in tissue repair and inflammation modulation."
    casNumber="137525-51-0"
    molecularFormula="C₆₂H₉₈N₁₆O₂₂"
    molarMass="1419.55 g/mol"
    prices={{
      "10mg": 104,
    }}
    benefits={[
      {
        iconName: "Zap",
        iconBgClass: "bg-yellow-100 dark:bg-yellow-900/30",
        title: "Tissue Regeneration",
        description:
          "Investigated in preclinical models for its effects on muscle, tendon, and ligament tissue repair mechanisms",
        link: "(Preclinical Study)",
      },
      {
        iconName: "Heart",
        iconBgClass: "bg-red-100 dark:bg-red-900/30",
        title: "Wound Healing",
        description:
          "Examined in animal wound models for observations related to tissue closure and ulcer repair pathways",
        link: "(Preclinical Study)",
      },
      {
        iconName: "Shield",
        iconBgClass: "bg-blue-100 dark:bg-blue-900/30",
        title: "Anti-inflammatory Effects",
        description:
          "Studied in laboratory research for interactions with inflammation-related signaling pathways across various tissue types",
        link: "(Preclinical Study)",
      },
      {
        iconName: "Activity",
        iconBgClass: "bg-purple-100 dark:bg-purple-900/30",
        title: "Gastrointestinal Protection",
        description:
          "Evaluated in preclinical GI tissue models for observations related to gastric and intestinal mucosal integrity",
        link: "(Preclinical Study)",
      },
      {
        iconName: "TrendingDown",
        iconBgClass: "bg-green-100 dark:bg-green-900/30",
        title: "Nociceptive Research",
        description:
          "Investigated in animal studies examining nociceptive pathways and pain-related behavioral models",
        link: "(Preclinical Study)",
      },
      {
        iconName: "Brain",
        iconBgClass: "bg-pink-100 dark:bg-pink-900/30",
        title: "Nerve Tissue Research",
        description:
          "Studied in preclinical models examining nerve tissue regeneration and neuronal repair mechanisms",
        link: "(Preclinical Study)",
      },
    ]}
    references={[
      "Seiwerth S, Rucman R, Turkovic B, et al. (2018). Pentadecapeptide BPC 157 and the central nervous system. Frontiers in Neuroscience.",
      "Sikiric P. (2013). The effect of pentadecapeptide BPC 157 on gastrointestinal tract. Journal of Physiology and Pharmacology, 64(4).",
      "Chang CH, Tsai WC, Hsu YH, Pang JH. (2011). The effect of pentadecapeptide BPC 157 on the healing of the injured quadriceps muscle. Journal of Applied Physiology.",
      "Staresinic M, Sebecic B, Patrlj L, et al. (2003). BPC 157 accelerates healing of transected rat Achilles tendon. Journal of Orthopaedic Research.",
      "Sikiric P, Seiwerth S, Rucman R, et al. (2014). BPC 157 and blood vessels. Current Pharmaceutical Design.",
      "Mikus D, Sikiric P, Seiwerth S, et al. (2001). BPC 157 heals burned skin in rats. Burns.",
    ]}
    aboutParagraphs={[
      'BPC-157, short for "Body Protection Compound-157," was first identified during research on human gastric juice in the early 1990s. Croatian researchers at the University of Zagreb, led by Dr. Predrag Sikirić, originally isolated this sequence from a larger protective protein found naturally in the stomach—which is where the "Body Protection Compound" name originated.',
      "Over the past three decades, BPC-157 has become one of the more extensively studied peptides in preclinical research. Hundreds of peer-reviewed publications have examined its interactions with various biological systems, including nitric oxide pathways, growth factor signaling, and angiogenic processes.",
      "Research interest has spanned multiple biological systems—from gastrointestinal and musculoskeletal models to neurological and vascular studies. While preclinical data has accumulated over 30+ years, it's worth noting that human clinical trials remain limited, and most published findings come from animal or in vitro studies.",
    ]}
    howItWorksIntro="Preclinical studies have examined BPC-157's interactions with several molecular pathways in cell culture and animal models. Published investigations suggest involvement in angiogenesis-related signaling, vascular function, cellular migration processes, and inflammatory response modulation."
    howItWorksAccordions={[
      {
        value: "vegfr2",
        iconName: "Activity",
        iconBgClass: "bg-blue-100 dark:bg-blue-900/30",
        title: "VEGFR2 Activation & Angiogenesis",
        content:
          "In preclinical models, BPC-157 has been observed to bind to VEGFR2 on endothelial cells, initiating a phosphorylation cascade that activates MAPK/ERK and PI3K/Akt pathways. Studies suggest this may stimulate endothelial cell proliferation, migration, and tube formation.",
      },
      {
        value: "nitric-oxide",
        iconName: "Zap",
        iconBgClass: "bg-purple-100 dark:bg-purple-900/30",
        title: "Nitric Oxide System Modulation",
        content:
          "Preclinical research indicates BPC-157 has been associated with upregulation of endothelial nitric oxide synthase (eNOS) expression in laboratory models. Published studies suggest this may increase nitric oxide (NO) bioavailability.",
      },
      {
        value: "fak-signaling",
        iconName: "Workflow",
        iconBgClass: "bg-green-100 dark:bg-green-900/30",
        title: "FAK Signaling & Cell Migration",
        content:
          "Laboratory studies have observed that BPC-157 may activate Focal Adhesion Kinase (FAK) through phosphorylation at Tyr397, potentially triggering recruitment of Src family kinases and downstream effectors.",
      },
      {
        value: "growth-factors",
        iconName: "Signal",
        iconBgClass: "bg-orange-100 dark:bg-orange-900/30",
        title: "Growth Factor Interactions",
        content:
          "Research has investigated BPC-157's interactions with various growth factors including EGF, FGF, and TGF-β pathways. These studies have examined potential effects on cellular proliferation and tissue remodeling.",
      },
    ]}
  />
);

export default BPC157;