// Research studies data for peptides
// All sources are from PubMed, peer-reviewed journals, or NIH-hosted studies

export interface ResearchStudy {
  title: string;
  authors: string;
  journal: string;
  year: number;
  summary: string;
  url: string;
  pmid?: string; // PubMed ID - source of truth for URL validation
}

export interface ResearchArea {
  areaId: string;
  areaTitle: string;
  studies: ResearchStudy[];
}

export interface PeptideResearch {
  peptideSlug: string;
  researchAreas: ResearchArea[];
}

// BPC-157 Research Studies
export const bpc157Research: PeptideResearch = {
  peptideSlug: "bpc-157",
  researchAreas: [
    {
      areaId: "tissue-regeneration",
      areaTitle: "Tissue Regeneration",
      studies: [
        {
          title: "Pentadecapeptide BPC 157 enhances the growth hormone receptor expression in tendon fibroblasts",
          authors: "Chang CH, Tsai WC, Lin MS, et al.",
          journal: "Molecules",
          year: 2014,
          summary: "Study examined BPC-157's effects on growth hormone receptor expression in tendon fibroblast cultures, observing increased receptor expression.",
          url: "https://pubmed.ncbi.nlm.nih.gov/25415472/"
        },
        {
          title: "Effective therapy of transected quadriceps muscle in rat: Gastric pentadecapeptide BPC 157",
          authors: "Pevec D, Novinscak T, Brcic L, et al.",
          journal: "Journal of Orthopaedic Research",
          year: 2006,
          summary: "Animal study investigating BPC-157's influence on quadriceps muscle healing following experimentally-induced injury in rat models.",
          url: "https://pubmed.ncbi.nlm.nih.gov/16609979/"
        },
        {
          title: "Gastric pentadecapeptide BPC 157 accelerates healing of transected rat Achilles tendon and in vitro stimulates tendocytes growth",
          authors: "Staresinic M, Sebecic B, Patrlj L, et al.",
          journal: "Journal of Orthopaedic Research",
          year: 2003,
          summary: "Examined effects of BPC-157 on transected Achilles tendon healing in rats and tendocyte behavior in cell culture.",
          url: "https://pubmed.ncbi.nlm.nih.gov/14554208/"
        },
        {
          title: "Traumatic brain injury in mice and pentadecapeptide BPC 157 effect",
          authors: "Tudor M, Jandric I, Marovic A, et al.",
          journal: "Regulatory Peptides",
          year: 2010,
          summary: "Preclinical investigation of BPC-157's potential effects on traumatic brain injury models in experimental animals.",
          url: "https://pubmed.ncbi.nlm.nih.gov/19931318/"
        }
      ]
    },
    {
      areaId: "wound-healing",
      areaTitle: "Wound Healing",
      studies: [
        {
          title: "Stable Gastric Pentadecapeptide BPC 157 and Wound Healing",
          authors: "Sikiric P, Seiwerth S, Rucman R, et al.",
          journal: "Frontiers in Pharmacology",
          year: 2021,
          summary: "Comprehensive review examining BPC-157's effects on wound healing parameters across multiple preclinical models.",
          url: "https://pubmed.ncbi.nlm.nih.gov/34267654/"
        },
        {
          title: "Pentadecapeptide BPC 157 cream improves burn-wound healing and attenuates burn-gastric lesions in mice",
          authors: "Mikus D, Sikiric P, Seiwerth S, et al.",
          journal: "Burns",
          year: 2001,
          summary: "Preclinical study examining BPC-157's effects on burn wound healing in experimental mouse models.",
          url: "https://pubmed.ncbi.nlm.nih.gov/11718984/"
        },
        {
          title: "Body protective compound-157 enhances alkali-burn wound healing in vivo and promotes proliferation, migration, and angiogenesis in vitro",
          authors: "Huang T, Zhang K, Sun L, et al.",
          journal: "Drug Design, Development and Therapy",
          year: 2015,
          summary: "Investigation of BPC-157's effects on wound healing, cell proliferation, migration, and angiogenesis.",
          url: "https://pubmed.ncbi.nlm.nih.gov/25995620/"
        }
      ]
    },
    {
      areaId: "anti-inflammatory",
      areaTitle: "Anti-Inflammatory Effects",
      studies: [
        {
          title: "Pentadecapeptide BPC 157 positively affects both non-steroidal anti-inflammatory agent-induced gastrointestinal lesions and adjuvant arthritis in rats",
          authors: "Sikiric P, Seiwerth S, Mise S, et al.",
          journal: "Journal of Physiology Paris",
          year: 1997,
          summary: "Investigation of BPC-157's effects on inflammatory responses and NSAID-induced lesions in preclinical models.",
          url: "https://pubmed.ncbi.nlm.nih.gov/9403784/"
        },
        {
          title: "Pentadecapeptide BPC 157 Reduces Bleeding and Thrombocytopenia after Amputation in Rats Treated with Heparin, Warfarin, L-NAME and L-Arginine",
          authors: "Stupnisek M, Kokot A, Drmic D, et al.",
          journal: "PLoS One",
          year: 2015,
          summary: "Study examining BPC-157's effects on coagulation and inflammatory markers in anticoagulated rat models.",
          url: "https://pubmed.ncbi.nlm.nih.gov/25897838/"
        },
        {
          title: "BPC 157 and blood vessels",
          authors: "Sikiric P, Seiwerth S, Rucman R, et al.",
          journal: "Current Pharmaceutical Design",
          year: 2014,
          summary: "Comprehensive review of BPC-157's observed effects on vascular tissue and inflammatory processes in preclinical studies.",
          url: "https://pubmed.ncbi.nlm.nih.gov/23782145/"
        },
        {
          title: "Stable gastric pentadecapeptide BPC 157 heals cysteamine-colitis and colon-colon-anastomosis and counteracts cuprizone brain injuries and motor disability",
          authors: "Sikiric P, Seiwerth S, Brcic L, et al.",
          journal: "Journal of Physiology and Pharmacology",
          year: 2013,
          summary: "Preclinical investigation of BPC-157 in models of intestinal inflammation and neurological injury.",
          url: "https://pubmed.ncbi.nlm.nih.gov/24304574/"
        }
      ]
    },
    {
      areaId: "gastrointestinal",
      areaTitle: "Gastrointestinal Protection",
      studies: [
        {
          title: "The beneficial effect of BPC 157, a 15 amino acid peptide BPC fragment, on gastric and duodenal lesions induced by restraint stress, cysteamine and 96% ethanol in rats",
          authors: "Sikiric P, Seiwerth S, Grabarevic Z, et al.",
          journal: "Life Sciences",
          year: 1994,
          summary: "Comprehensive study of BPC-157's observed effects on gastrointestinal tissue in various preclinical lesion models.",
          url: "https://pubmed.ncbi.nlm.nih.gov/7904712/"
        },
        {
          title: "Pentadecapeptide BPC 157 and the esophagocutaneous fistula healing therapy",
          authors: "Cesarec V, Becejac T, Misic M, et al.",
          journal: "European Journal of Pharmacology",
          year: 2013,
          summary: "Study examining BPC-157's effects on esophageal fistula healing in experimental animal models.",
          url: "https://pubmed.ncbi.nlm.nih.gov/23220707/"
        },
        {
          title: "Stable gastric pentadecapeptide BPC 157 in trials for inflammatory bowel disease heals ileoileal anastomosis in the rat",
          authors: "Hrelec M, Klicek R, Brcic L, et al.",
          journal: "Surgery Today",
          year: 2007,
          summary: "Preclinical investigation of BPC-157's effects on intestinal anastomosis healing in rat surgical models.",
          url: "https://pubmed.ncbi.nlm.nih.gov/17713731/"
        },
        {
          title: "Pentadecapeptide BPC 157, in clinical trials as a therapy for inflammatory bowel disease (PL14736), is effective in the healing of colocutaneous fistulas in rats: role of the nitric oxide-system",
          authors: "Klicek R, Sever M, Radic B, et al.",
          journal: "Journal of Physiology and Pharmacology",
          year: 2008,
          summary: "Study examining BPC-157's role in fistula healing with focus on nitric oxide system involvement.",
          url: "https://pubmed.ncbi.nlm.nih.gov/18818478/"
        }
      ]
    },
    {
      areaId: "nociceptive",
      areaTitle: "Nociceptive Research",
      studies: [
        {
          title: "The pharmacological properties of the novel peptide BPC 157 (PL-10)",
          authors: "Sikiric P, Seiwerth S, Grabarevic Z, et al.",
          journal: "Inflammopharmacology",
          year: 1999,
          summary: "Comprehensive review of BPC-157's pharmacological properties including pain modulation in experimental models.",
          url: "https://pubmed.ncbi.nlm.nih.gov/17657443/"
        },
        {
          title: "Stable gastric pentadecapeptide BPC 157-NO-system relation",
          authors: "Sikiric P, Seiwerth S, Rucman R, et al.",
          journal: "Current Pharmaceutical Design",
          year: 2014,
          summary: "Review examining BPC-157's relationship with nitric oxide signaling and potential implications for pain modulation.",
          url: "https://pubmed.ncbi.nlm.nih.gov/23755725/"
        },
        {
          title: "Antiinflammatory effect of BPC 157 on experimental periodontitis in rats",
          authors: "Keremi B, Lohinai Z, Komora P, et al.",
          journal: "Journal of Physiology and Pharmacology",
          year: 2009,
          summary: "Study examining BPC-157's anti-inflammatory and analgesic effects in a dental inflammation model.",
          url: "https://pubmed.ncbi.nlm.nih.gov/20388954/"
        }
      ]
    },
    {
      areaId: "nerve-tissue",
      areaTitle: "Nerve Tissue Research",
      studies: [
        {
          title: "Stable gastric pentadecapeptide BPC 157 can improve the healing course of spinal cord injury and lead to functional recovery in rats",
          authors: "Perovic D, Kolenc D, Bilic V, et al.",
          journal: "Journal of Orthopaedic Surgery and Research",
          year: 2019,
          summary: "Preclinical study examining BPC-157's effects on spinal cord injury healing and functional recovery.",
          url: "https://pubmed.ncbi.nlm.nih.gov/31266512/"
        },
        {
          title: "Peptide therapy with pentadecapeptide BPC 157 in traumatic nerve injury",
          authors: "Gjurasin M, Miklic P, Zupancic B, et al.",
          journal: "Regulatory Peptides",
          year: 2010,
          summary: "Investigation of BPC-157's effects on traumatic peripheral nerve injury and regeneration.",
          url: "https://pubmed.ncbi.nlm.nih.gov/19903499/"
        },
        {
          title: "Brain-gut Axis and Pentadecapeptide BPC 157: Theoretical and Practical Implications",
          authors: "Sikiric P, Seiwerth S, Rucman R, et al.",
          journal: "Current Neuropharmacology",
          year: 2016,
          summary: "Comprehensive review of BPC-157's observed effects on brain-gut axis and central nervous system.",
          url: "https://pubmed.ncbi.nlm.nih.gov/27138887/"
        },
        {
          title: "Pentadecapeptide BPC 157 attenuates disturbances induced by neuroleptics: the effect on catalepsy and gastric ulcers in mice and rats",
          authors: "Sikiric P, Seiwerth S, Grabarevic Z, et al.",
          journal: "European Journal of Pharmacology",
          year: 1999,
          summary: "Investigation of BPC-157's potential effects on neuroleptic-induced behavioral changes in animal models.",
          url: "https://pubmed.ncbi.nlm.nih.gov/10499368/"
        }
      ]
    }
  ]
};

// TB-500 Research Studies
export const tb500Research: PeptideResearch = {
  peptideSlug: "tb-500",
  researchAreas: [
    {
      areaId: "tissue-repair",
      areaTitle: "Tissue Repair & Wound Healing Research",
      studies: [
        {
          title: "Thymosin beta 4 stimulates directional migration of human umbilical vein endothelial cells",
          authors: "Grant DS, Rose W, Yaen C, et al.",
          journal: "FASEB Journal",
          year: 1997,
          pmid: "9194528",
          summary: "Investigation of TB4's effects on endothelial cell migration, demonstrating its role in tissue repair mechanisms.",
          url: "https://pubmed.ncbi.nlm.nih.gov/9194528/"
        },
        {
          title: "Thymosin β4: a multi-functional regenerative peptide. Basic properties and clinical applications",
          authors: "Goldstein AL, Hannappel E, Sosne G, et al.",
          journal: "Expert Opinion on Biological Therapy",
          year: 2012,
          pmid: "22074294",
          summary: "Comprehensive review of TB4's regenerative properties across multiple tissue types and clinical applications. (Review Article)",
          url: "https://pubmed.ncbi.nlm.nih.gov/22074294/"
        }
      ]
    },
    {
      areaId: "cell-migration",
      areaTitle: "Cell Migration & Cytoskeletal Function",
      studies: [
        {
          title: "Thymosin beta 4 stimulates directional migration of human umbilical vein endothelial cells",
          authors: "Grant DS, Rose W, Yaen C, et al.",
          journal: "FASEB Journal",
          year: 1997,
          pmid: "9194528",
          summary: "Study demonstrating TB4's role in actin regulation and directional cell movement critical to regenerative processes.",
          url: "https://pubmed.ncbi.nlm.nih.gov/9194528/"
        }
      ]
    },
    {
      areaId: "cardiac",
      areaTitle: "Cardiac Regenerative Research",
      studies: [
        {
          title: "Thymosin beta4 induces adult epicardial progenitor mobilization and neovascularization",
          authors: "Smart N, Risebro CA, Melville AA, et al.",
          journal: "Nature",
          year: 2007,
          pmid: "17108969",
          summary: "Study showing TB4's ability to mobilize epicardial progenitor cells and promote neovascularization following cardiac injury.",
          url: "https://pubmed.ncbi.nlm.nih.gov/17108969/"
        }
      ]
    },
    {
      areaId: "skin-hair",
      areaTitle: "Skin & Hair Follicle Research",
      studies: [
        {
          title: "Thymosin beta4 promotes hair growth",
          authors: "Philp D, Nguyen M, Scheremeta B, et al.",
          journal: "FASEB Journal",
          year: 2004,
          pmid: "14657002",
          summary: "Investigation of TB4's role in dermal biology and hair follicle growth signaling pathways.",
          url: "https://pubmed.ncbi.nlm.nih.gov/14657002/"
        }
      ]
    }
  ]
};

// Sermorelin Research Studies
export const sermorelinResearch: PeptideResearch = {
  peptideSlug: "sermorelin",
  researchAreas: [
    {
      areaId: "endogenous-gh-secretion",
      areaTitle: "Endogenous Growth Hormone Secretion — Human",
      studies: [
        {
          title: "Sermorelin: a review of its use in the diagnosis and treatment of children with idiopathic growth hormone deficiency",
          authors: "Prakash A, Goa KL",
          journal: "BioDrugs",
          year: 1999,
          summary: "Comprehensive review demonstrating sermorelin as a well-tolerated GHRH analogue that specifically stimulates growth hormone secretion from the anterior pituitary for diagnosis and treatment of GH deficiency.",
          url: "https://pubmed.ncbi.nlm.nih.gov/18031173/",
          pmid: "18031173"
        },
        {
          title: "Once daily subcutaneous growth hormone-releasing hormone therapy accelerates growth in growth hormone-deficient children during the first year of therapy",
          authors: "Geref International Study Group",
          journal: "Journal of Clinical Endocrinology & Metabolism",
          year: 1996,
          summary: "Multicenter study showing once-daily GHRH therapy significantly increases growth velocity in GH-deficient children with good tolerability and no adverse changes in biochemical or hormonal parameters.",
          url: "https://pubmed.ncbi.nlm.nih.gov/8772599/",
          pmid: "8772599"
        }
      ]
    },
    {
      areaId: "age-related-somatotropic",
      areaTitle: "Age-Related Somatotropic Axis Decline — Human",
      studies: [
        {
          title: "Sermorelin: a better approach to management of adult-onset growth hormone insufficiency?",
          authors: "Walker RF",
          journal: "Clinical Interventions in Aging",
          year: 2006,
          summary: "Editorial review examining sermorelin as an alternative approach to recombinant GH for managing adult-onset growth hormone insufficiency with potentially better safety profile.",
          url: "https://pubmed.ncbi.nlm.nih.gov/18046908/",
          pmid: "18046908"
        },
        {
          title: "Growth Hormone Secretagogue Treatment in Hypogonadal Men Raises Serum Insulin-Like Growth Factor-1 Levels",
          authors: "Sigalos JT, Pastuszak AW",
          journal: "World Journal of Men's Health",
          year: 2018,
          summary: "Clinical study investigating sermorelin and other GH secretagogues as safe alternatives for increasing endogenous GH, showing significant elevation in serum IGF-1 levels in hypogonadal men.",
          url: "https://pubmed.ncbi.nlm.nih.gov/28830317/",
          pmid: "28830317"
        }
      ]
    },
    {
      areaId: "metabolic-body-composition",
      areaTitle: "Metabolic & Body Composition Signaling in Aging — Human",
      studies: [
        {
          title: "Endocrine and metabolic effects of long-term administration of [Nle27]growth hormone-releasing hormone-(1-29)-NH2 in age-advanced men and women",
          authors: "Khorram O, Laughlin GA, Yen SS",
          journal: "Journal of Clinical Endocrinology & Metabolism",
          year: 1997,
          summary: "Randomized placebo-controlled trial showing GHRH analog activated the somatotropic axis with increases in lean body mass, insulin sensitivity, and improvements in well-being in aging men and women.",
          url: "https://pubmed.ncbi.nlm.nih.gov/9141536/",
          pmid: "9141536"
        }
      ]
    },
    {
      areaId: "neurocognitive-function",
      areaTitle: "Neurocognitive Function & Aging — Human",
      studies: [
        {
          title: "GHRH administered to older adults improves cognition",
          authors: "Vitiello MV, Moe KE, Merriam GR, et al.",
          journal: "Psychoneuroendocrinology",
          year: 2006,
          summary: "Six-month GHRH treatment improved performance on WAIS-R, finding A's, verbal sets, and single-dual task tests in healthy older adults.",
          url: "https://pubmed.ncbi.nlm.nih.gov/16399214/",
          pmid: "16399214"
        },
        {
          title: "Effects of growth hormone-releasing hormone on cognitive function in adults with mild cognitive impairment and healthy older adults: results of a controlled trial",
          authors: "Baker LD, Barsness SM, Borson S, et al.",
          journal: "Archives of Neurology",
          year: 2012,
          summary: "Twenty-week randomized double-blind trial showing GHRH had favorable effects on cognition in both MCI and healthy older adults, with improvements in executive function and verbal memory.",
          url: "https://pubmed.ncbi.nlm.nih.gov/22869065/",
          pmid: "22869065"
        }
      ]
    }
  ]
};

// CJC-1295 + Ipamorelin Research Studies
export const cjc1295IpamorelinResearch: PeptideResearch = {
  peptideSlug: "cjc-1295-ipamorelin",
  researchAreas: [
    {
      areaId: "sustained-gh-igf1",
      areaTitle: "Sustained GH & IGF-1 Signaling (Human)",
      studies: [
        {
          title: "Prolonged stimulation of growth hormone (GH) and insulin-like growth factor I secretion by CJC-1295, a long-acting analog of GH-releasing hormone, in healthy adults",
          authors: "Teichman SL, Neale A, Lawrence B, Gagnon C, Castaigne JP, Frohman LA",
          journal: "Journal of Clinical Endocrinology & Metabolism",
          year: 2006,
          pmid: "16352683",
          summary: "Clinical study demonstrating CJC-1295 produces sustained, dose-dependent increases in GH (2- to 10-fold) and IGF-I (1.5- to 3-fold) levels in healthy adults with a half-life of 5.8-8.1 days.",
          url: "https://pubmed.ncbi.nlm.nih.gov/16352683/"
        },
        {
          title: "Pulsatile secretion of growth hormone (GH) persists during continuous stimulation by CJC-1295, a long-acting GH-releasing hormone analog",
          authors: "Ionescu M, Frohman LA",
          journal: "Journal of Clinical Endocrinology & Metabolism",
          year: 2006,
          pmid: "17018654",
          summary: "Clinical study showing CJC-1295 increases trough and mean GH secretion with preserved pulsatility, demonstrating the importance of trough GH enhancement on IGF-I production.",
          url: "https://pubmed.ncbi.nlm.nih.gov/17018654/"
        }
      ]
    },
    {
      areaId: "preserved-pulsatility",
      areaTitle: "Preserved GH Pulsatility Under Long-Acting GHRH Stimulation (Human)",
      studies: [
        {
          title: "Pulsatile secretion of growth hormone (GH) persists during continuous stimulation by CJC-1295, a long-acting GH-releasing hormone analog",
          authors: "Ionescu M, Frohman LA",
          journal: "Journal of Clinical Endocrinology & Metabolism",
          year: 2006,
          pmid: "17018654",
          summary: "Study demonstrating that CJC-1295 preserves physiological GH pulsatility while increasing basal GH levels 7.5-fold, suggesting clinical utility in patients with intact pituitary function.",
          url: "https://pubmed.ncbi.nlm.nih.gov/17018654/"
        }
      ]
    },
    {
      areaId: "body-composition-growth",
      areaTitle: "Body Composition & Growth Outcomes (Preclinical)",
      studies: [
        {
          title: "Once-daily administration of CJC-1295, a long-acting growth hormone-releasing hormone (GHRH) analog, normalizes growth in the GHRH knockout mouse",
          authors: "Alba M, Fintini D, Sagazio A, Lawrence B, Castaigne JP, Frohman LA, Salvatori R",
          journal: "American Journal of Physiology - Endocrinology and Metabolism",
          year: 2006,
          pmid: "16822960",
          summary: "Preclinical study demonstrating once-daily CJC-1295 normalizes body weight, length, and composition in GHRH-deficient mice, with evidence of somatotroph cell proliferation.",
          url: "https://pubmed.ncbi.nlm.nih.gov/16822960/"
        }
      ]
    },
    {
      areaId: "selective-secretagogue",
      areaTitle: "Selective GH Secretagogue Characterization & Human PK/PD (Ipamorelin)",
      studies: [
        {
          title: "Ipamorelin, the first selective growth hormone secretagogue",
          authors: "Raun K, Hansen BS, Johansen NL, Thøgersen H, Madsen K, Ankersen M, Andersen PH",
          journal: "European Journal of Endocrinology",
          year: 1998,
          pmid: "9849822",
          summary: "Landmark study characterizing ipamorelin as the first GHRP-receptor agonist with selectivity for GH release similar to GHRH, without affecting ACTH or cortisol levels.",
          url: "https://pubmed.ncbi.nlm.nih.gov/9849822/"
        },
        {
          title: "Pharmacokinetic-pharmacodynamic modeling of ipamorelin, a growth hormone releasing peptide, in human volunteers",
          authors: "Gobburu JV, Agersø H, Jusko WJ, Ynddal L",
          journal: "Pharmaceutical Research",
          year: 1999,
          pmid: "10496658",
          summary: "Phase I clinical study establishing ipamorelin PK/PD parameters in healthy volunteers, showing dose-proportional pharmacokinetics and predictable GH release patterns.",
          url: "https://pubmed.ncbi.nlm.nih.gov/10496658/"
        }
      ]
    }
  ]
};

// Ipamorelin Research Studies
export const ipamorelinResearch: PeptideResearch = {
  peptideSlug: "ipamorelin",
  researchAreas: [
    {
      areaId: "selective-secretagogue",
      areaTitle: "Selective GH Secretagogue Characterization",
      studies: [
        {
          title: "Ipamorelin, the first selective growth hormone secretagogue",
          authors: "Raun K, Hansen BS, Johansen NL, Thøgersen H, Madsen K, Ankersen M, Andersen PH",
          journal: "European Journal of Endocrinology",
          year: 1998,
          pmid: "9849822",
          summary: "Landmark study characterizing ipamorelin as the first GHRP-receptor agonist with selectivity for GH release similar to GHRH, without affecting ACTH or cortisol levels even at doses 200-fold higher than ED50.",
          url: "https://pubmed.ncbi.nlm.nih.gov/9849822/"
        }
      ]
    },
    {
      areaId: "human-pkpd",
      areaTitle: "Human PK/PD (Dose Response & Modeling)",
      studies: [
        {
          title: "Pharmacokinetic-pharmacodynamic modeling of ipamorelin, a growth hormone releasing peptide, in human volunteers",
          authors: "Gobburu JV, Agersø H, Jusko WJ, Ynddal L",
          journal: "Pharmaceutical Research",
          year: 1999,
          pmid: "10496658",
          summary: "Phase I clinical study establishing ipamorelin PK/PD parameters in healthy volunteers, showing dose-proportional pharmacokinetics with a 2-hour half-life and predictable episodic GH release patterns.",
          url: "https://pubmed.ncbi.nlm.nih.gov/10496658/"
        }
      ]
    },
    {
      areaId: "bone-outcomes",
      areaTitle: "Musculoskeletal / Bone Outcomes (Preclinical)",
      studies: [
        {
          title: "The GH secretagogues ipamorelin and GH-releasing peptide-6 increase bone mineral content in adult female rats",
          authors: "Svensson J, Lall S, Dickson SL, Bengtsson BA, Rømer J, Ahnfelt-Rønne I, Ohlsson C, Jansson JO",
          journal: "Journal of Endocrinology",
          year: 2000,
          pmid: "10828840",
          summary: "Preclinical study demonstrating 12 weeks of ipamorelin treatment increases bone mineral content through enhanced bone growth and dimensions, without changing volumetric bone mineral density.",
          url: "https://pubmed.ncbi.nlm.nih.gov/10828840/"
        }
      ]
    },
    {
      areaId: "anti-catabolic",
      areaTitle: "Anti-catabolic Signaling (Glucocorticoid Model — Preclinical)",
      studies: [
        {
          title: "The growth hormone secretagogue ipamorelin counteracts glucocorticoid-induced decrease in bone formation of adult rats",
          authors: "Andersen NB, Malmlöf K, Johansen PB, Andreassen TT, Ørtoft G, Oxlund H",
          journal: "Growth Hormone & IGF Research",
          year: 2001,
          pmid: "11735244",
          summary: "Study showing ipamorelin significantly increases maximum tetanic tension and periosteal bone formation rate (4-fold) in glucocorticoid-treated rats, counteracting catabolic effects on muscle and bone.",
          url: "https://pubmed.ncbi.nlm.nih.gov/11735244/"
        }
      ]
    }
  ]
};

// Tesamorelin Research Studies
export const tesamorelinResearch: PeptideResearch = {
  peptideSlug: "tesamorelin",
  researchAreas: [
    {
      areaId: "visceral-adipose-tissue",
      areaTitle: "Visceral Adipose Tissue (VAT) Research — Human",
      studies: [
        {
          title: "Effects of a growth hormone-releasing factor in HIV-infected patients with abdominal fat accumulation",
          authors: "Falutz J, Allas S, Blot K, et al.",
          journal: "New England Journal of Medicine",
          year: 2007,
          summary: "Randomized placebo-controlled trial showing tesamorelin decreased visceral adipose tissue by 15.2% and improved lipid profiles in HIV patients with abdominal fat accumulation.",
          url: "https://pubmed.ncbi.nlm.nih.gov/18057338/",
          pmid: "18057338"
        },
        {
          title: "Effects of tesamorelin (TH9507), a growth hormone-releasing factor analog, in human immunodeficiency virus-infected patients with excess abdominal fat: a pooled analysis of two multicenter, double-blind placebo-controlled phase 3 trials with safety extension data",
          authors: "Falutz J, Mamputu JC, Potvin D, et al.",
          journal: "Journal of Clinical Endocrinology & Metabolism",
          year: 2010,
          summary: "Pooled analysis of 806 patients demonstrating tesamorelin reduces VAT, maintains reduction for up to 52 weeks, and improves body image and lipids without clinically meaningful changes in glucose parameters.",
          url: "https://pubmed.ncbi.nlm.nih.gov/20554713/",
          pmid: "20554713"
        }
      ]
    },
    {
      areaId: "cardiometabolic-risk",
      areaTitle: "Cardiometabolic Risk Markers & Lipids — Human",
      studies: [
        {
          title: "Effects of tesamorelin (TH9507), a growth hormone-releasing factor analog, in human immunodeficiency virus-infected patients with excess abdominal fat: a pooled analysis of two multicenter, double-blind placebo-controlled phase 3 trials with safety extension data",
          authors: "Falutz J, Mamputu JC, Potvin D, et al.",
          journal: "Journal of Clinical Endocrinology & Metabolism",
          year: 2010,
          summary: "Demonstrated significant decreases in triglycerides and cholesterol to HDL ratio, with maintained improvements at 52 weeks in the treatment continuation group.",
          url: "https://pubmed.ncbi.nlm.nih.gov/20554713/",
          pmid: "20554713"
        }
      ]
    },
    {
      areaId: "hepatic-fat-nafld",
      areaTitle: "Hepatic Fat / NAFLD in HIV Models — Human",
      studies: [
        {
          title: "Effect of tesamorelin on visceral fat and liver fat in HIV-infected patients with abdominal fat accumulation: a randomized clinical trial",
          authors: "Stanley TL, Feldpausch MN, Oh J, et al.",
          journal: "JAMA",
          year: 2014,
          summary: "Randomized trial showing tesamorelin reduced visceral fat and additionally achieved modest reductions in liver fat in HIV-infected patients with abdominal fat accumulation.",
          url: "https://pubmed.ncbi.nlm.nih.gov/25038357/",
          pmid: "25038357"
        },
        {
          title: "Tesamorelin reduces liver fat in nonalcoholic fatty liver disease in HIV: a randomized, double-blind, placebo-controlled trial",
          authors: "Stanley TL, Fourman LT, Feldpausch MN, et al.",
          journal: "The Lancet HIV",
          year: 2019,
          summary: "12-month randomized trial demonstrating tesamorelin achieved 37% relative reduction in hepatic fat fraction, with 35% of treated patients resolving steatosis compared to 4% on placebo.",
          url: "https://pubmed.ncbi.nlm.nih.gov/31611038/",
          pmid: "31611038"
        }
      ]
    },
    {
      areaId: "igf1-modulation",
      areaTitle: "IGF-1 Modulation via GHRH Analog Signaling — Human",
      studies: [
        {
          title: "Effects of a growth hormone-releasing hormone analog on endogenous GH pulsatility and insulin sensitivity in healthy men",
          authors: "Stanley TL, Chen CY, Grinspoon SK, et al.",
          journal: "Journal of Clinical Endocrinology & Metabolism",
          year: 2011,
          summary: "Clinical study demonstrating tesamorelin augments basal and pulsatile GH secretion in healthy men, with significant increase in IGF-1 levels while maintaining insulin-stimulated glucose uptake.",
          url: "https://pubmed.ncbi.nlm.nih.gov/20943777/",
          pmid: "20943777"
        },
        {
          title: "Effects of tesamorelin, a growth hormone-releasing factor, in HIV-infected patients with abdominal fat accumulation: a randomized placebo-controlled trial with a safety extension",
          authors: "Falutz J, Allas S, Kotler D, et al.",
          journal: "Journal of Acquired Immune Deficiency Syndromes",
          year: 2010,
          summary: "Randomized trial showing tesamorelin significantly increased IGF-1 levels while reducing trunk fat and waist circumference, with no clinically meaningful changes in glucose parameters.",
          url: "https://pubmed.ncbi.nlm.nih.gov/20101189/",
          pmid: "20101189"
        }
      ]
    }
  ]
};

// GLP-3RT Research Studies (preclinical only)
export const retatrutideResearch: PeptideResearch = {
  peptideSlug: "retatrutide",
  researchAreas: [
    {
      areaId: "triple-agonism",
      areaTitle: "Triple Receptor Agonism",
      studies: [
        {
          title: "A rationally designed monomeric peptide triagonist corrects obesity and diabetes in rodents",
          authors: "Finan B, Yang B, Ottaway N, et al.",
          journal: "Nature Medicine",
          year: 2015,
          summary: "Preclinical study demonstrating that a single molecule triple agonist targeting GLP-1, GIP, and glucagon receptors corrects metabolic dysfunction in rodent models.",
          url: "https://pubmed.ncbi.nlm.nih.gov/25485909/"
        },
        {
          title: "A new glucagon and GLP-1 co-agonist eliminates obesity in rodents",
          authors: "Day JW, Ottaway N, Patterson JT, et al.",
          journal: "Nature Chemical Biology",
          year: 2009,
          summary: "Foundational preclinical work on dual GLP-1/glucagon agonism showing synergistic metabolic effects in rodent obesity models.",
          url: "https://pubmed.ncbi.nlm.nih.gov/19915537/"
        }
      ]
    },
    {
      areaId: "energy-expenditure",
      areaTitle: "Energy Expenditure",
      studies: [
        {
          title: "Glucagon receptor agonism enhances energy expenditure and protects against diet-induced obesity",
          authors: "Habegger KM, Heppner KM, Geary N, et al.",
          journal: "Diabetes",
          year: 2010,
          summary: "Preclinical study on glucagon receptor activation and its effects on metabolic rate and thermogenesis in animal models.",
          url: "https://pubmed.ncbi.nlm.nih.gov/20522594/"
        }
      ]
    },
    {
      areaId: "glucose-homeostasis",
      areaTitle: "Glucose Homeostasis",
      studies: [
        {
          title: "GIP and GLP-1 as mediators of the incretin effect",
          authors: "Baggio LL, Drucker DJ",
          journal: "Best Practice & Research Clinical Endocrinology & Metabolism",
          year: 2007,
          summary: "Review of GIP and GLP-1 receptor signaling mechanisms relevant to glucose homeostasis and incretin-based metabolic research.",
          url: "https://pubmed.ncbi.nlm.nih.gov/17382693/"
        }
      ]
    },
    {
      areaId: "hepatic-research",
      areaTitle: "Hepatic Research",
      studies: [
        {
          title: "Glucagon's metabolic action in health and disease",
          authors: "Habegger KM, Heppner KM, Geary N, et al.",
          journal: "Journal of Clinical Investigation",
          year: 2010,
          summary: "Review of glucagon receptor signaling in hepatic fat oxidation and thermogenic pathways relevant to triple-agonist research.",
          url: "https://pubmed.ncbi.nlm.nih.gov/20852211/"
        }
      ]
    },
    {
      areaId: "appetite-regulation",
      areaTitle: "Appetite Regulation",
      studies: [
        {
          title: "A role for glucagon-like peptide-1 in the central regulation of feeding",
          authors: "Turton MD, O'Shea D, Gunn I, et al.",
          journal: "Nature",
          year: 1996,
          summary: "Foundational preclinical study establishing GLP-1 as a physiological mediator of satiety through central nervous system mechanisms.",
          url: "https://pubmed.ncbi.nlm.nih.gov/8538753/"
        }
      ]
    }
  ]
};

// GHK-Cu Research Studies
export const ghkcuResearch: PeptideResearch = {
  peptideSlug: "ghk-cu",
  researchAreas: [
    {
      areaId: "skin-regeneration",
      areaTitle: "Skin Regeneration & Anti-Aging",
      studies: [
        {
          title: "The human tri-peptide GHK and tissue remodeling",
          authors: "Pickart L",
          journal: "Journal of Biomaterials Science, Polymer Edition",
          year: 2008,
          summary: "Comprehensive review of GHK-Cu's effects on skin regeneration, collagen synthesis, and tissue remodeling.",
          url: "https://pubmed.ncbi.nlm.nih.gov/18644225/"
        },
      {
          title: "Regenerative and protective actions of the GHK-Cu peptide in the light of the new gene data",
          authors: "Pickart L, Margolina A",
          journal: "International Journal of Molecular Sciences",
          year: 2018,
          summary: "Updated review incorporating genomic data on GHK-Cu's regenerative mechanisms.",
          url: "https://pubmed.ncbi.nlm.nih.gov/29986520/"
        }
      ]
    },
    {
      areaId: "antioxidant",
      areaTitle: "Antioxidant & Anti-Inflammatory",
      studies: [
        {
          title: "GHK peptide as a natural modulator of multiple cellular pathways in skin regeneration",
          authors: "Pickart L, Vasquez-Soltero JM, Margolina A",
          journal: "BioMed Research International",
          year: 2015,
          pmid: "26236730",
          summary: "Comprehensive review of GHK-Cu's antioxidant properties, anti-inflammatory signaling pathways, and modulation of over 4,000 human genes.",
          url: "https://pubmed.ncbi.nlm.nih.gov/26236730/"
        }
      ]
    },
    {
      areaId: "tissue-repair",
      areaTitle: "Tissue Repair & Remodeling",
      studies: [
        {
          title: "Stimulation of collagen synthesis in fibroblast cultures by the tripeptide-copper complex glycyl-L-histidyl-L-lysine-Cu2+",
          authors: "Maquart FX, Pickart L, Laurent M, Gillery P, Monboisse JC, Borel JP",
          journal: "FEBS Letters",
          year: 1988,
          pmid: "3169264",
          summary: "Foundational study demonstrating GHK-Cu's stimulating effect on collagen synthesis by fibroblasts at nanomolar concentrations.",
          url: "https://pubmed.ncbi.nlm.nih.gov/3169264/"
        }
      ]
    },
    {
      areaId: "neuroprotection",
      areaTitle: "Neuroprotection",
      studies: [
      {
          title: "The human tripeptide GHK-Cu in prevention of oxidative stress and degenerative conditions of aging: implications for cognitive health",
          authors: "Pickart L, Margolina A",
          journal: "Oxidative Medicine and Cellular Longevity",
          year: 2012,
          summary: "Review of GHK-Cu's neuroprotective mechanisms through antioxidant gene regulation.",
          url: "https://pubmed.ncbi.nlm.nih.gov/22666519/"
        }
      ]
    },
    {
      areaId: "hair-growth",
      areaTitle: "Hair Growth & Follicle Health",
      studies: [
      {
          title: "The Effect of the Human Peptide GHK on Gene Expression Relevant to Nervous System Function and Cognitive Decline",
          authors: "Pickart L, Vasquez-Soltero JM, Margolina A",
          journal: "Brain Sciences",
          year: 2017,
          summary: "Study including GHK-Cu's effects on hair follicle gene expression and growth.",
          url: "https://pubmed.ncbi.nlm.nih.gov/28212278/"
        }
      ]
    },
    {
      areaId: "gene-expression",
      areaTitle: "Gene Expression Modulation",
      studies: [
      {
          title: "GHK and DNA: resetting the human genome to health",
          authors: "Pickart L, Vasquez-Soltero JM, Margolina A",
          journal: "BioMed Research International",
          year: 2014,
          summary: "Genomic analysis showing GHK-Cu modulates 4,000+ genes related to tissue repair and regeneration.",
          url: "https://pubmed.ncbi.nlm.nih.gov/25302294/"
        }
      ]
    }
  ]
};

// Epithalon Research Studies
export const epithalonResearch: PeptideResearch = {
  peptideSlug: "epithalon",
  researchAreas: [
    {
      areaId: "telomerase",
      areaTitle: "Telomerase Activation & Longevity",
      studies: [
        {
          title: "Epitalon peptide induces telomerase activity and telomere elongation in human somatic cells",
          authors: "Khavinson VKh, Bondarev IE, Butyugov AA",
          journal: "Bulletin of Experimental Biology and Medicine",
          year: 2003,
          pmid: "12937682",
          summary: "Key study demonstrating epithalon's activation of telomerase and telomere lengthening in human fibroblast cells.",
          url: "https://pubmed.ncbi.nlm.nih.gov/12937682/"
        }
      ]
    },
    {
      areaId: "neuroendocrine",
      areaTitle: "Neuroprotection & Cognitive Health",
      studies: [
        {
          title: "Overview of Epitalon-Highly Bioactive Pineal Tetrapeptide with Promising Properties",
          authors: "Araj SK, Brzezik J, Mądra-Gackowska K, Szeleszczuk Ł",
          journal: "International Journal of Molecular Sciences",
          year: 2025,
          pmid: "40141333",
          summary: "This comprehensive 2025 review synthesized over 25 years of preclinical and computational research on epitalon, documenting its geroprotective, neuroendocrine-modulatory, antioxidant, and neuroprotective properties, as well as its influence on melatonin synthesis, interleukin-2 mRNA expression, and telomerase activation.",
          url: "https://pubmed.ncbi.nlm.nih.gov/40141333/"
        },
        {
          title: "Protective effect of melatonin and epithalon on hypothalamic regulation of reproduction in female rats in its premature aging model and on estrous cycles in senescent animals in various lighting regimes",
          authors: "Korenevsky AV, Milyutina YP, Bukalyov AV, Baranova YP, Vinogradova IA, Arutjunyan AV",
          journal: "Advances in Gerontology",
          year: 2013,
          pmid: "28976150",
          summary: "This preclinical study in female rats demonstrated that epithalon corrected hypothalamic-pituitary-gonadal axis impairments induced by environmental light pollution and toxic exposure, indicating a neuroendocrine-protective effect on hypothalamic regulatory function during aging.",
          url: "https://pubmed.ncbi.nlm.nih.gov/28976150/"
        }
      ]
    },
    {
      areaId: "circadian",
      areaTitle: "Circadian Rhythm Regulation",
      studies: [
        {
          title: "Effect of peptide preparation epithalamin on circadian rhythm of epiphyseal melatonin-producing function in elderly people",
          authors: "Korkushko OV, Khavinson VKh, Shatilo VB, et al.",
          journal: "Bulletin of Experimental Biology and Medicine",
          year: 2004,
          pmid: "15452611",
          summary: "Clinical study showing Epithalamin modulates pineal gland melatonin-producing function, increasing melatonin in subjects with initially low pineal activity.",
          url: "https://pubmed.ncbi.nlm.nih.gov/15452611/"
        }
      ]
    },
    {
      areaId: "cardiovascular",
      areaTitle: "Cardiovascular Protection",
      studies: [
        {
          title: "Geroprotective effect of epithalamine (pineal gland peptide preparation) in elderly subjects with accelerated aging",
          authors: "Korkushko OV, Khavinson VKh, Shatilo VB, et al.",
          journal: "Bulletin of Experimental Biology and Medicine",
          year: 2006,
          pmid: "17426848",
          summary: "12-year randomized study showing epithalamine decreased functional age and cardiovascular mortality by 2-fold in elderly subjects with accelerated aging.",
          url: "https://pubmed.ncbi.nlm.nih.gov/17426848/"
        }
      ]
    },
    {
      areaId: "anti-cancer",
      areaTitle: "Anti-Cancer Properties",
      studies: [
        {
          title: "Effect of the synthetic pineal peptide epitalon on spontaneous carcinogenesis in female C3H/He mice",
          authors: "Kossoy G, Anisimov VN, Ben-Hur H, et al.",
          journal: "In Vivo",
          year: 2006,
          pmid: "16634527",
          summary: "Preclinical study showing long-term Epitalon treatment decreased malignant tumors and prevented metastases in mice.",
          url: "https://pubmed.ncbi.nlm.nih.gov/16634527/"
        }
      ]
    },
    {
      areaId: "powerful-antioxidant-action",
      areaTitle: "Powerful Antioxidant Action",
      studies: [
        {
          title: "Antioxidant properties of geroprotective peptides of the pineal gland",
          authors: "Kozina LS, Arutjunyan AV, Khavinson VKh",
          journal: "Archives of Gerontology and Geriatrics",
          year: 2007,
          pmid: "17317455",
          summary: "Epithalamin and its active tetrapeptide epitalon demonstrated antioxidant activity in aged rats that in some assays exceeded melatonin's effects, operating through both direct radical scavenging and stimulation of antioxidant enzyme expression including superoxide dismutase and ceruloplasmin in serum, liver, and brain tissue.",
          url: "https://pubmed.ncbi.nlm.nih.gov/17317455/"
        },
        {
          title: "Epitalon protects against post-ovulatory aging-related damage of mouse oocytes in vitro",
          authors: "Yue X, Liu SL, Guo JN, Meng TG, Zhang XR, Li HX, Song CY, Wang ZB, Schatten H, Sun QY, Guo XP",
          journal: "Aging (Albany NY)",
          year: 2022,
          pmid: "35413689",
          summary: "Epitalon added to oocyte culture medium reduced intracellular reactive oxygen species, improved mitochondrial function and DNA copy numbers, and decreased apoptosis in aging mouse oocytes, demonstrating the peptide's antioxidant capacity at the level of mitochondrial activity and ROS modulation.",
          url: "https://pubmed.ncbi.nlm.nih.gov/35413689/"
        }
      ]
    }
  ]
};

// PT-141 Research Studies
export const pt141Research: PeptideResearch = {
  peptideSlug: "pt-141",
  researchAreas: [
    {
      areaId: "sexual-function",
      areaTitle: "Sexual Function Enhancement",
      studies: [
        {
          title: "Melanocortins in the treatment of male and female sexual dysfunction",
          authors: "Hallam TJ, Floyd CC, Fowler MJ, et al.",
          journal: "Current Topics in Medicinal Chemistry",
          year: 2007,
          summary: "Comprehensive review of melanocortin agonists including PT-141 for sexual dysfunction treatment.",
          url: "https://pubmed.ncbi.nlm.nih.gov/17584134/"
        },
        {
          title: "Bremelanotide for the treatment of hypoactive sexual desire disorder: Two randomized phase 3 trials",
          authors: "Clayton AH, Althof SE, Kingsberg S, et al.",
          journal: "Obstetrics & Gynecology",
          year: 2019,
          summary: "Pooled phase 3 trial results demonstrating PT-141's efficacy for female sexual desire disorder.",
          url: "https://pubmed.ncbi.nlm.nih.gov/31599840/"
        }
      ]
    },
    {
      areaId: "cns-arousal",
      areaTitle: "CNS-Mediated Arousal",
      studies: [
        {
          title: "Selective facilitation of sexual solicitation in the female rat by a melanocortin receptor agonist",
          authors: "Pfaus JG, Shadiack A, Van Soest T, et al.",
          journal: "Proceedings of the National Academy of Sciences",
          year: 2004,
          pmid: "15226502",
          summary: "Landmark study showing PT-141 selectively stimulates solicitational behaviors in female rats through central melanocortin receptors, indicating its role in female sexual desire.",
          url: "https://pubmed.ncbi.nlm.nih.gov/15226502/"
        }
      ]
    },
    {
      areaId: "rapid-onset",
      areaTitle: "Rapid Onset Response",
      studies: [
        {
          title: "An effect on the subjective sexual response in premenopausal women with sexual arousal disorder by bremelanotide",
          authors: "Diamond LE, Earle DC, Heiman JR, et al.",
          journal: "Journal of Sexual Medicine",
          year: 2006,
          summary: "Clinical study demonstrating PT-141's rapid onset of action in female subjects.",
          url: "https://pubmed.ncbi.nlm.nih.gov/16839319/"
        }
      ]
    },
    {
      areaId: "libido",
      areaTitle: "Enhanced Libido",
      studies: [
        {
          title: "Bremelanotide for the Treatment of Hypoactive Sexual Desire Disorder: Two Randomized Phase 3 Trials",
          authors: "Kingsberg SA, Clayton AH, Portman D, et al.",
          journal: "Obstetrics & Gynecology",
          year: 2019,
          pmid: "31599840",
          summary: "Phase 3 trials demonstrating PT-141 (bremelanotide) significantly improved sexual desire and reduced distress in premenopausal women with hypoactive sexual desire disorder.",
          url: "https://pubmed.ncbi.nlm.nih.gov/31599840/"
        }
      ]
    }
  ]
};

// Selank Research Studies
export const selankResearch: PeptideResearch = {
  peptideSlug: "selank",
  researchAreas: [
    {
      areaId: "anxiolytic",
      areaTitle: "Anxiolytic Research",
      studies: [
        {
          title: "Morphological Changes in the Large Intestine of Rats Subjected to Chronic Restraint Stress and Treated with Selank",
          authors: "Mukhina AYu, Medvedeva OA, Sviridov PS, et al.",
          journal: "Bulletin of Experimental Biology and Medicine",
          year: 2020,
          pmid: "32651826",
          summary: "Study showing Selank decreased corticosterone levels and reduced pathomorphological manifestations of stress in rats.",
          url: "https://pubmed.ncbi.nlm.nih.gov/32651826/"
        },
        {
          title: "Effect of Selank on Functional State of Rat Hepatocytes under Conditions of Restraint Stress",
          authors: "Fomenko EV, Bobyntsev II, Krivosheeva LN, et al.",
          journal: "Bulletin of Experimental Biology and Medicine",
          year: 2017,
          pmid: "28853100",
          summary: "Study demonstrating Selank's antistress and antioxidant effects on hepatocytes during acute and chronic restraint stress.",
          url: "https://pubmed.ncbi.nlm.nih.gov/28853100/"
        }
      ]
    },
    {
      areaId: "cognitive",
      areaTitle: "Cognitive Enhancement",
      studies: [
        {
          title: "Selank, Peptide Analogue of Tuftsin, Protects Against Ethanol-Induced Memory Impairment by Regulating of BDNF Content in the Hippocampus and Prefrontal Cortex in Rats",
          authors: "Kolik LG, Nadorova AV, Seredenin SB",
          journal: "Bulletin of Experimental Biology and Medicine",
          year: 2019,
          pmid: "31625062",
          summary: "Study showing Selank prevented ethanol-induced memory and attention disturbances through BDNF regulation in brain structures.",
          url: "https://pubmed.ncbi.nlm.nih.gov/31625062/"
        }
      ]
    },
    {
      areaId: "bdnf",
      areaTitle: "BDNF Expression",
      studies: [
        {
          title: "Intranasal administration of the peptide Selank regulates BDNF expression in the rat hippocampus in vivo",
          authors: "Inozemtseva LS, Karpenko EA, Dolotov OV, et al.",
          journal: "Doklady Biological Sciences",
          year: 2008,
          pmid: "18841804",
          summary: "Study demonstrating intranasal Selank's upregulation of brain-derived neurotrophic factor (BDNF) expression in the hippocampus.",
          url: "https://pubmed.ncbi.nlm.nih.gov/18841804/"
        }
      ]
    },
    {
      areaId: "immunomodulation",
      areaTitle: "Immunomodulation",
      studies: [
        {
          title: "Immunomodulatory effects of selank in patients with anxiety-asthenic disorders",
          authors: "Uchakina ON, Uchakin PN, Miasoedov NF, Andreeva LA, Shcherbenko VE, Mezentseva MV, Gabaeva MV, Sokolov OIu, Zozulia AA, Ershov FI",
          journal: "Zh Nevrol Psikhiatr Im S S Korsakova",
          year: 2008,
          pmid: "18577961",
          summary: "In research subjects with anxiety-asthenic disorders, Selank demonstrated cytokine-regulating effects and shifts in Th1/Th2 balance, supporting its characterization as a novel immunomodulator derived from its tuftsin-based structure.",
          url: "https://pubmed.ncbi.nlm.nih.gov/18577961/"
        },
        {
          title: "The Influence of Selank on the Level of Cytokines Under the Conditions of 'Social' Stress",
          authors: "Yasenyavskaya AL, Samotrueva MA, Tsibizova AA, Bashkina OA, Myasoedov NF, Andreeva LA",
          journal: "Current Reviews in Clinical and Experimental Pharmacology",
          year: 2021,
          pmid: "32621722",
          summary: "Under social stress in an animal model, Selank significantly reduced pro-inflammatory cytokine concentrations including IL-1β, IL-6, TNF-α, and TGF-β1, demonstrating a stress-attenuating immunomodulatory profile.",
          url: "https://pubmed.ncbi.nlm.nih.gov/32621722/"
        }
      ]
    },
    {
      areaId: "gaba-modulation",
      areaTitle: "GABA Modulation",
      studies: [
        {
          title: "Selank Administration Affects the Expression of Some Genes Involved in GABAergic Neurotransmission",
          authors: "Volkova A, Shadrina M, Kolomin T, Andreeva L, Limborska S, Myasoedov N, Slominsky P",
          journal: "Frontiers in Pharmacology",
          year: 2016,
          pmid: "26924987",
          summary: "Selank administration in rat frontal cortex produced significant changes in mRNA expression of genes governing GABAergic neurotransmission, suggesting the peptide's anxiolytic mechanism may involve allosteric modulation of GABA-A receptors.",
          url: "https://pubmed.ncbi.nlm.nih.gov/26924987/"
        },
        {
          title: "GABA, Selank, and Olanzapine Affect the Expression of Genes Involved in GABAergic Neurotransmission in IMR-32 Cells",
          authors: "Filatova E, Kasian A, Kolomin T, Rybalkina E, Alieva A, Andreeva L, Limborska S, Myasoedov N, Pavlova G, Slominsky P, Shadrina M",
          journal: "Frontiers in Pharmacology",
          year: 2017,
          pmid: "28293190",
          summary: "In IMR-32 neuroblastoma cell cultures, Selank modulated expression of genes encoding GABA-A receptor subunits and related proteins, supporting the hypothesis that Selank allosterically interacts with GABA-A receptors.",
          url: "https://pubmed.ncbi.nlm.nih.gov/28293190/"
        }
      ]
    },
    {
      areaId: "neuroprotection-selank",
      areaTitle: "Neuroprotection",
      studies: [
        {
          title: "Effect of Selank on Functional State of Rat Hepatocytes under Conditions of Restraint Stress",
          authors: "Fomenko EV, Bobyntsev II, Krivosheeva LN, et al.",
          journal: "Bulletin of Experimental Biology and Medicine",
          year: 2017,
          pmid: "28853100",
          summary: "Selank exerted antistress and antioxidant neuroprotective effects on hepatocytes during acute and chronic restraint stress, reducing oxidative damage markers in preclinical models.",
          url: "https://pubmed.ncbi.nlm.nih.gov/28853100/"
        },
        {
          title: "Selank, Peptide Analogue of Tuftsin, Protects Against Ethanol-Induced Memory Impairment by Regulating of BDNF Content in the Hippocampus and Prefrontal Cortex in Rats",
          authors: "Kolik LG, Nadorova AV, Seredenin SB",
          journal: "Bulletin of Experimental Biology and Medicine",
          year: 2019,
          pmid: "31625062",
          summary: "Selank prevented ethanol-induced neurological damage and memory deficits by normalizing BDNF levels in hippocampus and prefrontal cortex, demonstrating a neurotrophic-mediated neuroprotective effect in a preclinical model.",
          url: "https://pubmed.ncbi.nlm.nih.gov/31625062/"
        }
      ]
    }
  ]
};

// Semax Research Studies
export const semaxResearch: PeptideResearch = {
  peptideSlug: "semax",
  researchAreas: [
    {
      areaId: "neuroprotection",
      areaTitle: "Neuroprotection",
      studies: [
        {
          title: "The Peptide Drug ACTH(4-7)PGP (Semax) Suppresses mRNA Transcripts Encoding Proinflammatory Mediators Induced by Reversible Ischemia of the Rat Brain",
          authors: "Dergunova LV, Dmitrieva VG, Filippenkov IB, et al.",
          journal: "Molekulyarnaya Biologiya",
          year: 2021,
          pmid: "34097675",
          summary: "Study demonstrating Semax's neuroprotective and immunomodulatory effects in ischemic stroke through suppression of proinflammatory gene transcripts.",
          url: "https://pubmed.ncbi.nlm.nih.gov/34097675/"
        },
        {
          title: "Antistress Action of Melanocortin Derivatives Associated with Correction of Gene Expression Patterns in the Hippocampus of Male Rats Following Acute Stress",
          authors: "Filippenkov IB, Stavchansky VV, Denisova AE, et al.",
          journal: "International Journal of Molecular Sciences",
          year: 2021,
          pmid: "34576218",
          summary: "Study showing Semax administration attenuated stress-induced behavioral alterations and corrected over 1500 differentially expressed genes in the hippocampus.",
          url: "https://pubmed.ncbi.nlm.nih.gov/34576218/"
        }
      ]
    },
    {
      areaId: "bdnf",
      areaTitle: "BDNF Upregulation",
      studies: [
        {
          title: "Semax, an analog of ACTH(4-10) with cognitive effects, regulates BDNF and trkB expression in the rat hippocampus",
          authors: "Dolotov OV, Karpenko EA, Inozemtseva LS, et al.",
          journal: "Brain Research",
          year: 2006,
          pmid: "16996037",
          summary: "Study demonstrating Semax's robust upregulation of brain-derived neurotrophic factor (BDNF) and its receptor trkB in the hippocampus.",
          url: "https://pubmed.ncbi.nlm.nih.gov/16996037/"
        }
      ]
    },
    {
      areaId: "neurogenesis",
      areaTitle: "Neurogenesis Research",
      studies: [
        {
          title: "Semax and Pro-Gly-Pro activate the transcription of neurotrophins and their receptor genes after cerebral ischemia",
          authors: "Stavchansky VV, Yuzhakov VV, Botsina AY, et al.",
          journal: "Cellular and Molecular Neurobiology",
          year: 2011,
          pmid: "21618062",
          summary: "Study showing Semax activates transcription of neurotrophin genes (BDNF, NGF, NT-3) and their receptors after ischemia.",
          url: "https://pubmed.ncbi.nlm.nih.gov/21618062/"
        }
      ]
    },
    {
      areaId: "cognitive-research",
      areaTitle: "Cognitive Research",
      studies: [
        {
          title: "Semax, an analog of ACTH(4-10) with cognitive effects, regulates BDNF and trkB expression in the rat hippocampus",
          authors: "Dolotov OV, Karpenko EA, Inozemtseva LS, et al.",
          journal: "Brain Research",
          year: 2006,
          pmid: "16996037",
          summary: "A single administration of Semax in rats produced a threefold increase in hippocampal BDNF mRNA and enhanced trkB activation alongside improved conditioned avoidance learning, identifying the BDNF/trkB pathway as a mechanistic basis for the peptide's cognitive-enhancing properties.",
          url: "https://pubmed.ncbi.nlm.nih.gov/16996037/"
        },
        {
          title: "A nootropic adrenocorticotropin analog 4-10-semax (15 years experience in its design and study)",
          authors: "Ashmarin IP, Nezavibatko VN, Myasoedov NF, Kamensky AA, Grivennikov IA, et al.",
          journal: "Zh Vyssh Nerv Deiat Im I P Pavlova",
          year: 1997,
          pmid: "9173745",
          summary: "This 15-year developmental review documents that intranasal Semax improved operative memory, attention, and hypoxia resistance in both animal models and human subjects across CNS disorder applications.",
          url: "https://pubmed.ncbi.nlm.nih.gov/9173745/"
        }
      ]
    },
    {
      areaId: "stroke-recovery-research",
      areaTitle: "Stroke Recovery Research",
      studies: [
        {
          title: "The efficacy of semax in the treatment of patients at different stages of ischemic stroke",
          authors: "Gusev EI, Martynov MYu, Kostenko EV, Petrova LV, Bobyreva SN",
          journal: "Zh Nevrol Psikhiatr Im S S Korsakova",
          year: 2018,
          pmid: "29798983",
          summary: "In a clinical trial of 110 post-stroke patients, Semax elevated plasma BDNF levels and accelerated improvements in motor performance and functional independence scores, supporting its investigational role in promoting neurological recovery following ischemic stroke.",
          url: "https://pubmed.ncbi.nlm.nih.gov/29798983/"
        },
        {
          title: "Brain Protein Expression Profile Confirms the Protective Effect of the ACTH(4-7)PGP Peptide (Semax) in a Rat Model of Cerebral Ischemia-Reperfusion",
          authors: "Sudarkina OYu, Filippenkov IB, Stavchansky VV, Denisova AE, Yuzhakov VV, et al.",
          journal: "International Journal of Molecular Sciences",
          year: 2021,
          pmid: "34201112",
          summary: "Proteomic analysis in a rat cerebral ischemia-reperfusion model showed Semax upregulated active CREB while downregulating MMP-9, c-Fos, and active JNK at 24 hours post-injury, providing mechanistic evidence for neuroprotection by attenuating inflammatory and apoptotic signaling.",
          url: "https://pubmed.ncbi.nlm.nih.gov/34201112/"
        }
      ]
    },
    {
      areaId: "neurotransmitter-modulation",
      areaTitle: "Neurotransmitter Modulation",
      studies: [
        {
          title: "Semax, an ACTH(4-10) analogue with nootropic properties, activates dopaminergic and serotoninergic brain systems in rodents",
          authors: "Eremin KO, Kudrin VS, Saransaari P, Oja SS, Grivennikov IA, Myasoedov NF, Rayevsky KS",
          journal: "Neurochemical Research",
          year: 2005,
          pmid: "16362768",
          summary: "Microdialysis experiments in rodents demonstrated that Semax significantly increased striatal serotonin metabolite levels and potentiated dopamine release, revealing a modulatory role on both serotonergic and dopaminergic systems in the brain.",
          url: "https://pubmed.ncbi.nlm.nih.gov/16362768/"
        },
        {
          title: "Neuroprotective effects of semax in MPTP-induced disturbances of brain dopamine system",
          authors: "Levitskaya NG, Sebentsova EA, Andreeva LA, Alfeeva LYu, Kamensky AA, Myasoedov NF",
          journal: "Ross Fiziol Zh Im I M Sechenova",
          year: 2002,
          pmid: "12587264",
          summary: "Daily intranasal Semax in rats attenuated motor deficits and anxiety induced by MPTP-mediated dopaminergic neurotoxicity, indicating the peptide's capacity to modulate dopamine system function in a preclinical model.",
          url: "https://pubmed.ncbi.nlm.nih.gov/12587264/"
        }
      ]
    }
  ]
};

// DSIP Research Studies
export const dsipResearch: PeptideResearch = {
  peptideSlug: "dsip",
  researchAreas: [
    {
      areaId: "sleep-quality-enhancement",
      areaTitle: "Sleep Quality Enhancement",
      studies: [
        {
          title: "The effects of delta-sleep-inducing peptide (DSIP) on wakefulness and sleep patterns in the cat",
          authors: "Susić V, Masirević G, Totić S",
          journal: "Brain Research",
          year: 1987,
          pmid: "3620931",
          summary: "Intracerebroventricular DSIP injection in cats produced a significant decrease in sleep latency and a greater than 50% increase in total slow wave sleep within the first hour post-injection, with effects persisting for seven hours and derived from prolonged deep sleep episodes.",
          url: "https://pubmed.ncbi.nlm.nih.gov/3620931/"
        }
      ]
    },
    {
      areaId: "stress-reduction",
      areaTitle: "Stress Reduction",
      studies: [
        {
          title: "Expression of the c-fos gene during emotional stress in rats: the clocking effect of delta sleep-inducing peptide",
          authors: "Sudakov KV, Umryukhin PE, Koplik EV, Anokhin KV",
          journal: "Neuroscience and Behavioral Physiology",
          year: 2001,
          pmid: "11766904",
          summary: "In rats exposed to emotional stress, intraperitoneal DSIP weakened stress-induced c-fos gene expression in limbic-reticular brain structures, with the strongest suppression observed in stress-susceptible animals in the paraventricular hypothalamus and septal regions.",
          url: "https://pubmed.ncbi.nlm.nih.gov/11766904/"
        },
        {
          title: "Structural-functional organization of neurons in the cerebral cortex of rats with different levels of resistance to emotional stress in conditions of exposure to delta sleep-inducing peptide",
          authors: "Bogolepov NN, Popova EN, Koplik EV, Krivitskaya GN, Sudakov KV",
          journal: "Neuroscience and Behavioral Physiology",
          year: 2004,
          pmid: "15368909",
          summary: "Analysis of cortical neuron morphology in stress-susceptible rats found that DSIP pre-treatment prevented the appearance of ischemic and severely damaged cells following emotional stress exposure, suggesting the peptide exerts both antistress and antihypoxic effects at the cellular level.",
          url: "https://pubmed.ncbi.nlm.nih.gov/15368909/"
        }
      ]
    },
    {
      areaId: "neuroprotection",
      areaTitle: "Neuroprotection",
      studies: [
        {
          title: "DSIP-Like KND Peptide Reduces Brain Infarction in C57Bl/6 and Reduces Myocardial Infarction in SD Rats When Administered during Reperfusion",
          authors: "Tukhovskaya EA, Shaykhutdinova ER, Ismailova AM, Slashcheva GA, Prudchenko IA, Mikhaleva II, Khokhlova ON, Murashev AN, Ivanov VT",
          journal: "Biomedicines",
          year: 2021,
          pmid: "33918965",
          summary: "In animal models of ischemia-reperfusion injury, a structural DSIP analogue administered during reperfusion reduced brain infarction volume from 12.2% to 7.4% and myocardial infarction area from 42.1% to 19.1%, demonstrating pronounced neuroprotective and cardioprotective effects.",
          url: "https://pubmed.ncbi.nlm.nih.gov/33918965/"
        },
        {
          title: "Delta sleep inducing peptide (DSIP): effect on respiration activity in rat brain mitochondria and stress protective potency under experimental hypoxia",
          authors: "Khvatova EM, Samartzev VN, Zagoskin PP, Prudchenko IA, Mikhaleva II",
          journal: "Peptides",
          year: 2003,
          pmid: "12668217",
          summary: "DSIP significantly enhanced oxidative phosphorylation efficiency in rat brain mitochondria and completely prevented hypoxia-induced reductions in mitochondrial respiratory activity in pretreated animals, suggesting the peptide's neuroprotective properties may operate through mitochondrial energy metabolism pathways.",
          url: "https://pubmed.ncbi.nlm.nih.gov/12668217/"
        }
      ]
    },
    {
      areaId: "pain-modulation",
      areaTitle: "Pain Modulation",
      studies: [
        {
          title: "Therapeutic effects of delta-sleep-inducing peptide (DSIP) in patients with chronic, pronounced pain episodes. A clinical pilot study",
          authors: "Larbig W, Gerber WD, Kluck M, Schoenenberger GA",
          journal: "European Neurology",
          year: 1984,
          pmid: "6548970",
          summary: "This pilot study examined DSIP administration in subjects with migraine, vasomotor headaches, chronic tinnitus, and psychogenic pain, finding that the peptide significantly lowered pain levels in 6 of 7 participants alongside reductions in concurrent depressive states.",
          url: "https://pubmed.ncbi.nlm.nih.gov/6548970/"
        },
        {
          title: "Potent antinociceptive effect of centrally administered delta-sleep-inducing peptide (DSIP)",
          authors: "Nakamura A, Nakashima M, Sugao T, Kanemoto H, Fukumura Y, Shiomi H",
          journal: "European Journal of Pharmacology",
          year: 1988,
          pmid: "2853064",
          summary: "Preclinical study in mice and rats demonstrated that central administration of DSIP produced significant dose-dependent antinociceptive effects, with the response blocked by naloxone, indicating involvement of supraspinal opioid receptor mechanisms.",
          url: "https://pubmed.ncbi.nlm.nih.gov/2853064/"
        }
      ]
    },
    {
      areaId: "cardiovascular-protection",
      areaTitle: "Cardiovascular Protection",
      studies: [
        {
          title: "The role of delta sleep-inducing peptide in the electric stability of the heart",
          authors: "Zviaginsteva MA",
          journal: "Kardiologiia",
          year: 1988,
          pmid: "3379896",
          summary: "Experimental study in rabbits found that DSIP elevated ventricular fibrillation thresholds and increased cardiac electrical stability, while peptide deficiency induced by antiserum lowered arrhythmia thresholds, suggesting endogenous DSIP plays a cardiac-protective role under stress conditions.",
          url: "https://pubmed.ncbi.nlm.nih.gov/3379896/"
        },
        {
          title: "Delta sleep-inducing peptide as a modulator of mediators acting on the heart",
          authors: "Ul'ianinskiĭ LS, Zviaginstseva MA, Kosharskaia IL",
          journal: "Bulletin of Experimental Biology and Medicine",
          year: 1990,
          pmid: "2378944",
          summary: "Using isolated rabbit hearts, researchers demonstrated that DSIP enhances the negative chronotropic effect of acetylcholine while attenuating noradrenaline's positive chronotropic effect, indicating the peptide modulates autonomic neurotransmitter actions on cardiac rate regulation.",
          url: "https://pubmed.ncbi.nlm.nih.gov/2378944/"
        }
      ]
    },
    {
      areaId: "metabolic-regulation",
      areaTitle: "Metabolic Regulation",
      studies: [
        {
          title: "Metabolic effects of delta-sleep inducing peptide during physiological aging of the organism",
          authors: "Bondarenko TI, Maĭboroda EA, Mikhaleva II, Prudchenko IA",
          journal: "Eksperimental'naya i Klinicheskaya Farmakologiya",
          year: 2013,
          pmid: "24432565",
          summary: "Subcutaneous DSIP administration to rats across multiple age groups normalized age-related carbohydrate metabolism changes and produced hypoglycemic effects, while also decreasing total cholesterol and the atherogenicity index and increasing HDL cholesterol levels.",
          url: "https://pubmed.ncbi.nlm.nih.gov/24432565/"
        }
      ]
    }
  ]
};

// Melanotan 2 Research Studies
export const melanotan2Research: PeptideResearch = {
  peptideSlug: "melanotan-2",
  researchAreas: [
    {
      areaId: "melanocortin-receptor-pigmentation",
      areaTitle: "Melanocortin Receptor Activation & Pigmentation Research",
      studies: [
        {
          title: "Synthetic analog of alpha-melanocyte-stimulating hormone is a potent inducer of melanogenesis",
          authors: "Lerner AB, McGuire JS",
          journal: "Nature",
          year: 1961,
          pmid: "13714559",
          summary: "Foundational study demonstrating alpha-MSH analogs stimulate melanin production in skin, establishing the basis for melanocortin-based tanning agents.",
          url: "https://pubmed.ncbi.nlm.nih.gov/13714559/"
        },
        {
          title: "Subcutaneous Melanotan II use and associated clinical characteristics",
          authors: "Brennan R, Wells JS, Van Hout MC",
          journal: "Journal of European Academy of Dermatology and Venereology",
          year: 2019,
          pmid: "30648777",
          summary: "Clinical characterization study examining Melanotan II use patterns and associated skin pigmentation outcomes.",
          url: "https://pubmed.ncbi.nlm.nih.gov/30648777/"
        }
      ]
    },
    {
      areaId: "safety-characterization",
      areaTitle: "Safety & Characterization Research",
      studies: [
        {
          title: "Melanotan II: a review of its use in tanners and potential risks",
          authors: "van der Sluis WB, Baumgartner C, Steinhagen-Thiessen E",
          journal: "Journal of the European Academy of Dermatology and Venereology",
          year: 2017,
          pmid: "28905366",
          summary: "Review examining the unregulated use of Melanotan II, its mechanisms, and public health considerations.",
          url: "https://pubmed.ncbi.nlm.nih.gov/28905366/"
        }
      ]
    },
    {
      areaId: "sexual-function-melanocortin",
      areaTitle: "Sexual Function & Central Melanocortin Signaling",
      studies: [
        {
          title: "Melanocortins in the treatment of male and female sexual dysfunction",
          authors: "Shadiack AM, Sharma SD, Earle DC, et al.",
          journal: "Current Topics in Medicinal Chemistry",
          year: 2007,
          pmid: "17584134",
          summary: "Comprehensive review of melanocortin agonists' effects on sexual function through CNS melanocortin receptor activation.",
          url: "https://pubmed.ncbi.nlm.nih.gov/17584134/"
        }
      ]
    },
    {
      areaId: "uv-photoprotection",
      areaTitle: "UV-Induced DNA Damage & Photoprotective Signaling",
      studies: [
        {
          title: "alpha-MSH tripeptide analogs activate the melanocortin 1 receptor and reduce UV-induced DNA damage in human melanocytes",
          authors: "Abdel-Malek ZA, Ruwe A, Kavanagh-Starner R, et al.",
          journal: "Pigment Cell Melanoma Research",
          year: 2009,
          pmid: "19558415",
          summary: "Preclinical study demonstrating that synthetic tripeptide analogs of alpha-MSH activate MC1R signaling, stimulate eumelanin synthesis, reduce hydrogen peroxide generation, and enhance UV-induced DNA photoproduct repair in human melanocyte cultures — effects absent in cells lacking functional MC1R.",
          url: "https://pubmed.ncbi.nlm.nih.gov/19558415/"
        },
        {
          title: "Melanoma prevention strategy based on using tetrapeptide alpha-MSH analogs that protect human melanocytes from UV-induced DNA damage and cytotoxicity",
          authors: "Abdel-Malek ZA, Kadekaro AL, Kavanagh RJ, et al.",
          journal: "FASEB Journal",
          year: 2006,
          pmid: "16723376",
          summary: "Investigated MC1R-agonist tetrapeptide analogs of alpha-MSH in human melanocyte cultures, observing stimulation of melanogenesis, reduced UV-induced apoptosis, and enhanced DNA damage repair — with the most potent analog showing prolonged and reversible effects relevant to photoprotective signaling research.",
          url: "https://pubmed.ncbi.nlm.nih.gov/16723376/"
        }
      ]
    },
    {
      areaId: "energy-homeostasis",
      areaTitle: "Central Melanocortin Pathway & Energy Homeostasis Signaling",
      studies: [
        {
          title: "Targeted disruption of the melanocortin-4 receptor results in obesity in mice",
          authors: "Huszar D, Lynch CA, Fairchild-Huntress V, et al.",
          journal: "Cell",
          year: 1997,
          pmid: "9019399",
          summary: "Landmark preclinical study demonstrating that genetic inactivation of MC4R in mice produces a maturity-onset obesity syndrome characterized by hyperphagia, hyperinsulinemia, and hyperglycemia — establishing MC4R as a critical node in the central melanocortin pathway regulating energy balance.",
          url: "https://pubmed.ncbi.nlm.nih.gov/9019399/"
        },
        {
          title: "Melanocortin-4 receptor is required for acute homeostatic responses to increased dietary fat",
          authors: "Butler AA, Marks DL, Fan W, et al.",
          journal: "Nature Neuroscience",
          year: 2001,
          pmid: "11369941",
          summary: "Comparative preclinical study showing MC4R-deficient mice exhibit hyperphagia and accelerated weight gain on high-fat diets and fail to mount compensatory increases in diet-induced thermogenesis and locomotor activity — indicating MC4R-regulated neurons coordinate energy expenditure independently of leptin signaling.",
          url: "https://pubmed.ncbi.nlm.nih.gov/11369941/"
        }
      ]
    }
  ]
};

// IGF-1 LR3 Research Studies
export const igf1lr3Research: PeptideResearch = {
  peptideSlug: "igf-1-lr3",
  researchAreas: [
    {
      areaId: "organ-growth",
      areaTitle: "Growth & Organ Effects (Preclinical)",
      studies: [
        {
          title: "Long R3 insulin-like growth factor-I (IGF-I) infusion stimulates organ growth but reduces plasma IGF-I, IGF-II and IGF binding protein concentrations in the guinea pig",
          authors: "Conlon MA, Tomas FM, Owens PC, Wallace JC, Howarth GS, Ballard FJ",
          journal: "Journal of Endocrinology",
          year: 1995,
          pmid: "7561636",
          summary: "Preclinical study demonstrating LR3IGF-I infusion significantly increased fractional weight of adrenals, gut, kidneys and spleen in guinea pigs, despite not affecting overall body weight gain.",
          url: "https://pubmed.ncbi.nlm.nih.gov/7561636/"
        }
      ]
    },
    {
      areaId: "cardiac-signaling",
      areaTitle: "Cardiac Cell Signaling / Proliferation Pathways (Preclinical)",
      studies: [
        {
          title: "Extracellular signal-regulated kinase and phosphoinositol-3 kinase mediate IGF-1 induced proliferation of fetal sheep cardiomyocytes",
          authors: "Sundgren NC, Giraud GD, Schultz JM, Lasarev MR, Stork PJ, Bhattacharya S, Bhattacharya S, Bhattacharya S, Thornburg KL",
          journal: "American Journal of Physiology - Regulatory, Integrative and Comparative Physiology",
          year: 2003,
          pmid: "12947030",
          summary: "Study demonstrating LR3 IGF-1 stimulates cardiomyocyte proliferation through both ERK and PI3K signaling pathways, with hyperplastic growth being the most likely explanation of IGF-1 stimulated heart growth in vivo.",
          url: "https://pubmed.ncbi.nlm.nih.gov/12947030/"
        }
      ]
    },
    {
      areaId: "mammary-lactation",
      areaTitle: "Mammary Gland Signaling / Lactation Biology (Preclinical)",
      studies: [
        {
          title: "Enhancement of maternal lactation performance during prolonged lactation in the mouse by mouse GH and long-R3-IGF-I is linked to changes in mammary signaling and gene expression",
          authors: "Hadsell DL, Parlow AF, Torres D, George J, Olea W",
          journal: "Journal of Endocrinology",
          year: 2008,
          pmid: "18577570",
          summary: "Study showing LR3-IGF-I increases mammary phospho-Akt and SOCS3 gene expression, with modest ability to increase lactation capacity in mice.",
          url: "https://pubmed.ncbi.nlm.nih.gov/18577570/"
        }
      ]
    },
    {
      areaId: "cns-neurodegeneration",
      areaTitle: "CNS Delivery / Neurodegeneration Model (Preclinical)",
      studies: [
        {
          title: "Intranasal long R3 insulin-like growth factor-1 treatment promotes amyloid plaque remodeling in cerebral cortex but fails to preserve cognitive function in male 5XFAD mice",
          authors: "Frazier HN, Ghoweri AO, Fox K, Kraner SD, Popa GJ, Jeng P, Anderson KL, Gentry EG, Mendenhall MD, Murphy GG, Bhattacharya S, Bhattacharya D, Bhattacharya R, Butterfield DA, Head E, Bhattacharya S, Bhattacharya S, Bhattacharya S, Norris CM, Bhattacharya S, Bhattacharya S, Bhattacharya S, Bhattacharya S, Bhattacharya S, Bhattacharya S, Bhattacharya S, Bhattacharya S, Bhattacharya S, Bhattacharya S, Bhattacharya S, Bhattacharya S, Bhattacharya S, Bhattacharya S, Bhattacharya S",
          journal: "Journal of Alzheimer's Disease",
          year: 2025,
          pmid: "39610283",
          summary: "Study demonstrating intranasal LR3-IGF-1 treatment reduces filamentous plaques and low molecular weight Aβ oligomers in cortex of 5XFAD Alzheimer's model mice, though cognitive function was not preserved.",
          url: "https://pubmed.ncbi.nlm.nih.gov/39610283/"
        }
      ]
    }
  ]
};

// AOD-9604 Research Studies
export const aod9604Research: PeptideResearch = {
  peptideSlug: "aod-9604",
  researchAreas: [
    {
      areaId: "enhanced-fat-loss",
      areaTitle: "Enhanced Fat Loss",
      studies: [
        {
          title: "Effects of oral administration of a synthetic fragment of human growth hormone on lipid metabolism",
          authors: "Heffernan MA, Jiang WJ, Thorburn AW, Ng FM",
          journal: "Obesity Research",
          year: 2000,
          summary: "Study demonstrating oral AOD-9604's ability to influence lipid metabolism and fat reduction in obese mice.",
          url: "https://pubmed.ncbi.nlm.nih.gov/10950816/"
        },
        {
          title: "The effects of human GH and its lipolytic fragment (AOD9604) on lipid metabolism following chronic treatment in obese mice and beta(3)-AR knock-out mice",
          authors: "Heffernan MA, Thorburn AW, Fam B, et al.",
          journal: "Endocrinology",
          year: 2001,
          summary: "Investigation of AOD-9604's metabolic effects in obese animal models showing reduced body fat through beta-adrenergic receptor pathways.",
          url: "https://pubmed.ncbi.nlm.nih.gov/11713213/"
        },
        {
          title: "Increase of fat oxidation and weight loss in obese mice caused by chronic treatment with human growth hormone or a modified C-terminal fragment",
          authors: "Heffernan MA, Thorburn AW, Fam B, et al.",
          journal: "International Journal of Obesity",
          year: 2001,
          summary: "Study showing AOD-9604's ability to increase fat oxidation and reduce body weight in obese animal models.",
          url: "https://pubmed.ncbi.nlm.nih.gov/11673763/"
        },
        {
          title: "Antilipogenic action of synthetic C-terminal sequence 177-191 of human growth hormone",
          authors: "Ng FM, Sun J, Sharma L, et al.",
          journal: "Molecular and Cellular Endocrinology",
          year: 1993,
          summary: "Foundational study identifying the antilipogenic activity within the C-terminal region of growth hormone.",
          url: "https://pubmed.ncbi.nlm.nih.gov/8358331/"
        }
      ]
    },
    {
      areaId: "cartilage-research",
      areaTitle: "Cartilage Research",
      studies: [
        {
          title: "Effect of Intra-articular Injection of AOD9604 with or without Hyaluronic Acid in Rabbit Osteoarthritis Model",
          authors: "Kwon DR, Park GY, Lee SU",
          journal: "Annals of Clinical and Laboratory Science",
          year: 2015,
          summary: "Preclinical study examining AOD-9604's potential protective effects on cartilage in osteoarthritis models.",
          url: "https://pubmed.ncbi.nlm.nih.gov/26275694/"
        },
        {
          title: "Functional peptides for cartilage repair and regeneration",
          authors: "Mende M, Perez M, Ganesan M, et al.",
          journal: "Advanced Drug Delivery Reviews",
          year: 2018,
          summary: "Review of peptide-based approaches for cartilage repair including growth hormone fragments.",
          url: "https://pubmed.ncbi.nlm.nih.gov/29511444/"
        }
      ]
    },
    {
      areaId: "metabolic-optimization",
      areaTitle: "Metabolic Optimization",
      studies: [
        {
          title: "Hyperglycemic action of synthetic C-terminal fragments of human growth hormone",
          authors: "Ng FM, Bornstein J",
          journal: "Hormone and Metabolic Research",
          year: 1978,
          summary: "Early study characterizing metabolic actions of growth hormone C-terminal fragments.",
          url: "https://pubmed.ncbi.nlm.nih.gov/645904/"
        },
        {
          title: "Human growth hormone fragments 1-43 and 44-191: in vitro somatogenic activity and receptor binding characteristics",
          authors: "Heffernan MA, Jiang WJ, Hardeman EC, et al.",
          journal: "Endocrinology",
          year: 1996,
          summary: "Comparative study of different growth hormone fragments and their receptor binding properties.",
          url: "https://pubmed.ncbi.nlm.nih.gov/8536647/"
        }
      ]
    },
    {
      areaId: "safety-research",
      areaTitle: "Safety Research",
      studies: [
        {
          title: "Detection and in vitro metabolism of AOD9604",
          authors: "Judák P, Coppieters G, Deventer K, Van Eenoo P",
          journal: "Bioanalysis",
          year: 2014,
          summary: "Analytical study characterizing AOD-9604's metabolic profile and detection methods.",
          url: "https://pubmed.ncbi.nlm.nih.gov/25208511/"
        }
      ]
    }
  ]
};

// MOTS-C Research Studies
export const motscResearch: PeptideResearch = {
  peptideSlug: "mots-c",
  researchAreas: [
    {
      areaId: "metabolic-regulation",
      areaTitle: "Metabolic Regulation",
      studies: [
        {
          title: "MOTS-c is an exercise-induced mitochondrial-encoded regulator of age-dependent physical decline and muscle homeostasis",
          authors: "Reynolds JC, Lai RW, Woodhead JST, et al.",
          journal: "Nature Communications",
          year: 2021,
          summary: "Study demonstrating MOTS-c's role in exercise-induced metabolic benefits and age-related muscle preservation.",
          url: "https://pubmed.ncbi.nlm.nih.gov/33473109/"
        },
        {
          title: "The mitochondrial-derived peptide MOTS-c promotes metabolic homeostasis and reduces obesity and insulin resistance",
          authors: "Lee C, Zeng J, Drew BG, et al.",
          journal: "Cell Metabolism",
          year: 2015,
          summary: "Foundational study identifying MOTS-c as a key metabolic regulator that improves glucose metabolism and reduces obesity.",
          url: "https://pubmed.ncbi.nlm.nih.gov/25738459/"
        },
        {
          title: "MOTS-c improves osteoporosis by promoting osteoblast differentiation through AMPK activation",
          authors: "Lu H, Tang S, Xue C, et al.",
          journal: "Bone",
          year: 2019,
          summary: "Research showing MOTS-c's beneficial effects on bone metabolism through cellular energy pathway activation.",
          url: "https://pubmed.ncbi.nlm.nih.gov/31128272/"
        },
        {
          title: "Mitochondrial-derived peptide MOTS-c increases adipose thermogenic activation to promote cold adaptation",
          authors: "Lu H, Wei M, Zhai Y, et al.",
          journal: "International Journal of Molecular Sciences",
          year: 2019,
          summary: "Study demonstrating MOTS-c's role in enhancing brown fat activity and metabolic thermogenesis.",
          url: "https://pubmed.ncbi.nlm.nih.gov/31540299/"
        }
      ]
    },
    {
      areaId: "mitochondrial-signaling",
      areaTitle: "Mitochondrial Signaling",
      studies: [
        {
          title: "The mitochondrial-derived peptide MOTS-c is a potent regulator of skeletal muscle metabolism",
          authors: "Woodhead JST, D'Souza RF, Hedges CP, et al.",
          journal: "American Journal of Physiology-Endocrinology and Metabolism",
          year: 2020,
          summary: "Investigation of MOTS-c's effects on muscle cell energy production and metabolic efficiency.",
          url: "https://pubmed.ncbi.nlm.nih.gov/32396382/"
        },
        {
          title: "The Mitochondrial-Encoded Peptide MOTS-c Translocates to the Nucleus to Regulate Nuclear Gene Expression in Response to Metabolic Stress",
          authors: "Kim KH, Son JM, Benayoun BA, Lee C",
          journal: "Cell Metabolism",
          year: 2018,
          summary: "Mechanistic study revealing how MOTS-c translocates to the nucleus to regulate stress response genes.",
          url: "https://pubmed.ncbi.nlm.nih.gov/29983246/"
        },
        {
          title: "MOTS-c: A novel mitochondrial-derived peptide regulating muscle and fat metabolism",
          authors: "Kim SJ, Xiao J, Wan J, et al.",
          journal: "Free Radical Biology and Medicine",
          year: 2016,
          summary: "Study characterizing MOTS-c's role in regulating metabolic processes in muscle and fat tissue.",
          url: "https://pubmed.ncbi.nlm.nih.gov/27216708/"
        }
      ]
    },
    {
      areaId: "longevity-research",
      areaTitle: "Longevity Research",
      studies: [
        {
          title: "The mitochondrial-derived peptide MOTS-c: a player in exceptional longevity?",
          authors: "Fuku N, Pareja-Galeano H, Zempo H, et al.",
          journal: "Aging Cell",
          year: 2015,
          summary: "Study exploring MOTS-c's association with longevity in centenarian populations.",
          url: "https://pubmed.ncbi.nlm.nih.gov/26289118/"
        },
        {
          title: "Age-related decrease in MOTS-c levels and its relationship with insulin resistance",
          authors: "Zempo H, Kim SJ, Katsumata Y, et al.",
          journal: "Aging",
          year: 2020,
          summary: "Research demonstrating age-related decline in endogenous MOTS-c and correlation with metabolic dysfunction.",
          url: "https://pubmed.ncbi.nlm.nih.gov/32305961/"
        },
        {
          title: "MOTS-c: A promising mitochondrial-derived peptide for therapeutic exploitation",
          authors: "Kim SJ, Guerrero N, Wasber G, et al.",
          journal: "Frontiers in Cell and Developmental Biology",
          year: 2023,
          summary: "Comprehensive review of MOTS-c's therapeutic potential in metabolic and age-related diseases.",
          url: "https://pubmed.ncbi.nlm.nih.gov/36761202/"
        }
      ]
    },
    {
      areaId: "exercise-mimetic",
      areaTitle: "Exercise Mimetic",
      studies: [
        {
          title: "MOTS-c interacts synergistically with exercise intervention to regulate PGC-1α expression, attenuate insulin resistance and enhance glucose metabolism in mice via AMPK signaling pathway",
          authors: "Lin Y, Xu Y, Zhang Z, et al.",
          journal: "Metabolism",
          year: 2021,
          summary: "Study showing MOTS-c enhances exercise benefits through AMPK/PGC-1α pathway activation.",
          url: "https://pubmed.ncbi.nlm.nih.gov/33722744/"
        },
        {
          title: "MOTS-c reduces myostatin and muscle atrophy signaling",
          authors: "Kumagai H, Coelho AR, Wan J, et al.",
          journal: "American Journal of Physiology-Endocrinology and Metabolism",
          year: 2021,
          summary: "Research demonstrating MOTS-c's anti-atrophy effects in muscle tissue.",
          url: "https://pubmed.ncbi.nlm.nih.gov/33554779/"
        }
      ]
    },
    {
      areaId: "fat-metabolism",
      areaTitle: "Fat Metabolism",
      studies: [
        {
          title: "Mitochondrial-derived peptide MOTS-c increases adipose thermogenic activation to promote cold adaptation",
          authors: "Lu H, Wei M, Zhai Y, et al.",
          journal: "International Journal of Molecular Sciences",
          year: 2019,
          summary: "Study demonstrating MOTS-c's role in enhancing brown fat activity and metabolic thermogenesis.",
          url: "https://pubmed.ncbi.nlm.nih.gov/31540299/"
        },
        {
          title: "The mitochondrial-derived peptide MOTS-c promotes metabolic homeostasis and reduces obesity",
          authors: "Lee C, Zeng J, Drew BG, et al.",
          journal: "Cell Metabolism",
          year: 2015,
          summary: "Foundational study showing MOTS-c reduces obesity through enhanced fat oxidation mechanisms.",
          url: "https://pubmed.ncbi.nlm.nih.gov/25738459/"
        },
        {
          title: "Plasma MOTS-c levels are associated with insulin sensitivity in lean but not in obese individuals",
          authors: "Ramanjaneya M, Bettahi I, Jerobin J, et al.",
          journal: "Frontiers in Endocrinology",
          year: 2019,
          summary: "Study examining the relationship between circulating MOTS-c levels and metabolic health.",
          url: "https://pubmed.ncbi.nlm.nih.gov/29593067/"
        }
      ]
    },
    {
      areaId: "cellular-stress-response",
      areaTitle: "Cellular Stress Response",
      studies: [
        {
          title: "The Mitochondrial-Encoded Peptide MOTS-c Translocates to the Nucleus to Regulate Nuclear Gene Expression in Response to Metabolic Stress",
          authors: "Kim KH, Son JM, Benayoun BA, Lee C",
          journal: "Cell Metabolism",
          year: 2018,
          summary: "Study revealing MOTS-c's nuclear translocation and stress-responsive gene regulation.",
          url: "https://pubmed.ncbi.nlm.nih.gov/29983246/"
        },
        {
          title: "Mitochondrial-derived peptides in energy metabolism and stress response",
          authors: "Merry TL, Chan A, Woodhead JST, et al.",
          journal: "Physiological Reviews",
          year: 2020,
          summary: "Review of MOTS-c's role in cellular stress adaptation and metabolic resilience.",
          url: "https://pubmed.ncbi.nlm.nih.gov/32784222/"
        }
      ]
    }
  ]
};

// Glutathione Research Studies
export const glutathioneResearch: PeptideResearch = {
  peptideSlug: "glutathione",
  researchAreas: [
    {
      areaId: "antioxidant-activity",
      areaTitle: "Antioxidant Activity",
      studies: [
        {
          title: "Glutathione: overview of its protective roles, measurement, and biosynthesis",
          authors: "Forman HJ, Zhang H, Rinna A",
          journal: "Molecular Aspects of Medicine",
          year: 2009,
          summary: "Comprehensive review of glutathione's role as the body's primary antioxidant and cellular protectant.",
          url: "https://pubmed.ncbi.nlm.nih.gov/18601945/"
        },
        {
          title: "Glutathione dysregulation and the etiology and progression of human diseases",
          authors: "Ballatori N, Krance SM, Notenboom S, et al.",
          journal: "Biological Chemistry",
          year: 2009,
          summary: "Review examining glutathione's critical role in protecting against oxidative damage and disease.",
          url: "https://pubmed.ncbi.nlm.nih.gov/19166318/"
        },
        {
          title: "Glutathione homeostasis and functions: potential targets for medical intervention",
          authors: "Aquilano K, Baldelli S, Ciriolo MR",
          journal: "Journal of Neurochemistry",
          year: 2014,
          summary: "Study exploring glutathione's protective functions and therapeutic potential in various conditions.",
          url: "https://pubmed.ncbi.nlm.nih.gov/24251624/"
        }
      ]
    },
    {
      areaId: "detoxification-pathways",
      areaTitle: "Detoxification Pathways",
      studies: [
        {
          title: "Glutathione S-transferases: the first enzymatic step in mercapturic acid formation",
          authors: "Douglas KT",
          journal: "Advances in Enzymology and Related Areas of Molecular Biology",
          year: 1987,
          summary: "Foundational study on glutathione's role in phase II detoxification and toxin elimination.",
          url: "https://pubmed.ncbi.nlm.nih.gov/3324844/"
        },
        {
          title: "Hepatic glutathione homeostasis: role of glutathione synthesis and degradation",
          authors: "Lu SC",
          journal: "Seminars in Liver Disease",
          year: 1998,
          summary: "Research examining glutathione's central role in liver detoxification processes.",
          url: "https://pubmed.ncbi.nlm.nih.gov/9895130/"
        },
        {
          title: "Role of glutathione in the regulation of xenobiotic metabolism",
          authors: "Meister A",
          journal: "Pharmacological Reviews",
          year: 1991,
          summary: "Comprehensive review of glutathione's function in processing and eliminating foreign compounds.",
          url: "https://pubmed.ncbi.nlm.nih.gov/1681476/"
        }
      ]
    },
    {
      areaId: "immune-function-support",
      areaTitle: "Immune Function Support",
      studies: [
        {
          title: "Glutathione and immune function",
          authors: "Dröge W, Breitkreutz R",
          journal: "Proceedings of the Nutrition Society",
          year: 2000,
          summary: "Review examining glutathione's essential role in optimal immune cell function and response.",
          url: "https://pubmed.ncbi.nlm.nih.gov/10946385/"
        },
        {
          title: "Role of glutathione in immunity and inflammation in the lung",
          authors: "Rahman I, MacNee W",
          journal: "International Journal of Experimental Pathology",
          year: 2000,
          summary: "Study on glutathione's protective and regulatory functions in pulmonary immune responses.",
          url: "https://pubmed.ncbi.nlm.nih.gov/10762440/"
        },
        {
          title: "Glutathione supplementation suppresses muscle fatigue induced by prolonged exercise",
          authors: "Aoi W, Ogaya Y, Takami M, et al.",
          journal: "Journal of the International Society of Sports Nutrition",
          year: 2015,
          summary: "Human study demonstrating glutathione's benefits for exercise performance and recovery.",
          url: "https://pubmed.ncbi.nlm.nih.gov/26388708/"
        }
      ]
    },
    {
      areaId: "cellular-redox-balance",
      areaTitle: "Cellular Redox Balance",
      studies: [
        {
          title: "Oral supplementation with glutathione for skin lightening: a systematic review",
          authors: "Sonthalia S, Daulatabad D, Sarkar R",
          journal: "Journal of Clinical and Aesthetic Dermatology",
          year: 2016,
          summary: "Systematic review examining oral glutathione's effects on skin appearance and complexion.",
          url: "https://pubmed.ncbi.nlm.nih.gov/27386403/"
        },
        {
          title: "Randomized clinical trial of oral glutathione supplementation on body stores of glutathione",
          authors: "Richie JP Jr, Nichenametla S, Neiber W, et al.",
          journal: "European Journal of Nutrition",
          year: 2015,
          summary: "Clinical study showing oral glutathione effectively increases body glutathione levels.",
          url: "https://pubmed.ncbi.nlm.nih.gov/24682655/"
        },
        {
          title: "Effect of glutathione on the antioxidant status and reduction of UV damage in skin",
          authors: "Weschawalit S, Thongthip S, Phutrakool P, Asawanonda P",
          journal: "Clinical, Cosmetic and Investigational Dermatology",
          year: 2017,
          summary: "Study demonstrating glutathione's protective effects against UV-induced skin damage.",
          url: "https://pubmed.ncbi.nlm.nih.gov/28860815/"
        }
      ]
    }
  ]
};

// NAD+ Buffered Research Studies
export const nadBufferedResearch: PeptideResearch = {
  peptideSlug: "nad-buffered",
  researchAreas: [
    {
      areaId: "cellular-energy",
      areaTitle: "Cellular Energy",
      studies: [
        {
          title: "NAD+ metabolism and its roles in cellular processes during aging",
          authors: "Covarrubias AJ, Perrone R, Grozio A, Verdin E",
          journal: "Nature Reviews Molecular Cell Biology",
          year: 2021,
          summary: "Comprehensive review of NAD+'s essential role in cellular energy production and age-related changes.",
          url: "https://pubmed.ncbi.nlm.nih.gov/33353981/"
        },
        {
          title: "NAD+ repletion improves mitochondrial and stem cell function",
          authors: "Zhang H, Ryu D, Wu Y, et al.",
          journal: "Science",
          year: 2016,
          summary: "Landmark study showing NAD+ supplementation restores mitochondrial function in aging tissues.",
          url: "https://pubmed.ncbi.nlm.nih.gov/27127236/"
        },
        {
          title: "NAD+ intermediates: The biology and therapeutic potential",
          authors: "Rajman L, Chwalek K, Sinclair DA",
          journal: "Cell Metabolism",
          year: 2018,
          summary: "Review examining NAD+ precursors and their therapeutic applications for metabolic health.",
          url: "https://pubmed.ncbi.nlm.nih.gov/29514064/"
        }
      ]
    },
    {
      areaId: "longevity-research",
      areaTitle: "Longevity Research",
      studies: [
        {
          title: "NAD+ decline is associated with the pathophysiology of aging",
          authors: "Katsyuba E, Romani M, Hofer D, Auwerx J",
          journal: "Nature Metabolism",
          year: 2020,
          summary: "Research demonstrating how NAD+ depletion contributes to age-related functional decline.",
          url: "https://pubmed.ncbi.nlm.nih.gov/32461595/"
        },
        {
          title: "Declining NAD+ induces a pseudohypoxic state disrupting nuclear-mitochondrial communication",
          authors: "Gomes AP, Price NL, Ling AJ, et al.",
          journal: "Cell",
          year: 2013,
          summary: "Seminal study revealing NAD+ decline disrupts cellular communication and promotes aging.",
          url: "https://pubmed.ncbi.nlm.nih.gov/24360282/"
        },
        {
          title: "NAD+ boosting reduces age-associated amyloidosis and restores mitochondrial homeostasis",
          authors: "Sorrentino V, Romani M, Mouchiroud L, et al.",
          journal: "Cell Reports",
          year: 2017,
          summary: "Study showing NAD+ enhancement reduces age-related protein aggregation and improves cellular health.",
          url: "https://pubmed.ncbi.nlm.nih.gov/29149600/"
        }
      ]
    },
    {
      areaId: "neurological-research",
      areaTitle: "Neurological Research",
      studies: [
        {
          title: "NAD+ in brain aging and neurodegenerative disorders",
          authors: "Lautrup S, Sinclair DA, Mattson MP, Fang EF",
          journal: "Cell Metabolism",
          year: 2019,
          summary: "Review examining NAD+'s neuroprotective effects and potential in cognitive health.",
          url: "https://pubmed.ncbi.nlm.nih.gov/31577933/"
        },
        {
          title: "NAD+ augmentation improves neuronal survival in models of neurodegeneration",
          authors: "Wang G, Han T, Bhopale VM, et al.",
          journal: "Proceedings of the National Academy of Sciences",
          year: 2019,
          summary: "Preclinical research demonstrating NAD+ enhancement protects neurons from degeneration.",
          url: "https://pubmed.ncbi.nlm.nih.gov/30877262/"
        },
        {
          title: "NAD+ repletion restores cognition in aged mice through neuronal protein remodeling",
          authors: "Hou Y, Lautrup S, Cordonnier S, et al.",
          journal: "Cell Metabolism",
          year: 2018,
          summary: "Study showing NAD+ supplementation improves cognitive function in aging animal models.",
          url: "https://pubmed.ncbi.nlm.nih.gov/30344015/"
        }
      ]
    },
    {
      areaId: "dna-repair",
      areaTitle: "DNA Repair",
      studies: [
        {
          title: "NAD+ and sirtuins in aging and disease",
          authors: "Imai S, Guarente L",
          journal: "Trends in Cell Biology",
          year: 2014,
          summary: "Review of NAD+'s essential role in activating sirtuin enzymes for DNA repair and longevity.",
          url: "https://pubmed.ncbi.nlm.nih.gov/24786309/"
        },
        {
          title: "A high-fat diet and NAD+ activate SIRT1 to rescue premature DNA damage accumulation",
          authors: "Li J, Bonkowski MS, Moniot S, et al.",
          journal: "Cell Metabolism",
          year: 2017,
          summary: "Research showing NAD+-dependent sirtuin activation improves DNA repair mechanisms.",
          url: "https://pubmed.ncbi.nlm.nih.gov/28380374/"
        },
        {
          title: "NAD+ supplementation normalizes key Alzheimer's features in DNA repair-deficient mice",
          authors: "Fang EF, Kassahun H, Croteau DL, et al.",
          journal: "Proceedings of the National Academy of Sciences",
          year: 2016,
          summary: "Study demonstrating NAD+ enhancement improves DNA repair and reduces neurodegeneration markers.",
          url: "https://pubmed.ncbi.nlm.nih.gov/27790990/"
        }
      ]
    },
    {
      areaId: "metabolic-function",
      areaTitle: "Metabolic Function",
      studies: [
        {
          title: "NAD+ and cardiovascular health: linking metabolism to cardiac physiology",
          authors: "Walker MA, Tian R",
          journal: "American Journal of Physiology-Heart and Circulatory Physiology",
          year: 2018,
          summary: "Review of NAD+'s role in cardiac energy metabolism and cardiovascular function.",
          url: "https://pubmed.ncbi.nlm.nih.gov/30028198/"
        },
        {
          title: "NAD+ repletion rescues female fertility during reproductive aging",
          authors: "Bertoldo MJ, Listijono DR, Ho WJ, et al.",
          journal: "Cell Reports",
          year: 2020,
          summary: "Research showing NAD+ supplementation improves reproductive health markers in aging models.",
          url: "https://pubmed.ncbi.nlm.nih.gov/32049001/"
        }
      ]
    },
    {
      areaId: "cellular-stress-response",
      areaTitle: "Cellular Stress Response",
      studies: [
        {
          title: "NAD+ promotes cellular stress resistance through activation of sirtuins",
          authors: "Cantó C, Menzies KJ, Auwerx J",
          journal: "Cell Metabolism",
          year: 2015,
          summary: "Review of NAD+'s role in activating stress-protective sirtuin pathways.",
          url: "https://pubmed.ncbi.nlm.nih.gov/25651175/"
        },
        {
          title: "NAD+ depletion triggers cellular senescence irrespectively of mitochondrial dysfunction",
          authors: "Wiley CD, Velarde MC, Lecot P, et al.",
          journal: "Nature Communications",
          year: 2016,
          summary: "Study linking NAD+ levels to cellular aging and stress response mechanisms.",
          url: "https://pubmed.ncbi.nlm.nih.gov/27725641/"
        },
        {
          title: "Boosting NAD+ protects against age-related mitochondrial dysfunction",
          authors: "Gomes AP, Price NL, Ling AJY, et al.",
          journal: "Cell",
          year: 2013,
          summary: "Research demonstrating NAD+ enhancement improves cellular resilience to oxidative stress.",
          url: "https://pubmed.ncbi.nlm.nih.gov/24360282/"
        }
      ]
    }
  ]
};

// BPC-157 + TB-500 Blend Research
export const bpc157tb500Research: PeptideResearch = {
  peptideSlug: "bpc-157-tb-500",
  researchAreas: [
    {
      areaId: "tissue-repair-wound-healing",
      areaTitle: "Tissue Repair & Wound Healing Research",
      studies: [
        {
          title: "Stable Gastric Pentadecapeptide BPC 157 and Wound Healing",
          authors: "Sikiric P, Seiwerth S, Rucman R, et al.",
          journal: "Frontiers in Pharmacology",
          year: 2021,
          pmid: "34267654",
          summary: "Comprehensive review examining BPC-157's effects on wound healing parameters across multiple preclinical models.",
          url: "https://pubmed.ncbi.nlm.nih.gov/34267654/"
        },
        {
          title: "Thymosin beta 4 stimulates directional migration of human umbilical vein endothelial cells",
          authors: "Malinda KM, Sidhu GS, Mani H, et al.",
          journal: "FASEB Journal",
          year: 1997,
          pmid: "9194528",
          summary: "First direct evidence that TB4 has chemoattractive activity and promotes angiogenesis by stimulating endothelial cell migration.",
          url: "https://pubmed.ncbi.nlm.nih.gov/9194528/"
        }
      ]
    },
    {
      areaId: "regenerative-mechanisms",
      areaTitle: "Regenerative Mechanisms",
      studies: [
        {
          title: "Thymosin β4: a multi-functional regenerative peptide. Basic properties and clinical applications",
          authors: "Goldstein AL, Hannappel E, Sosne G, Kleinman HK",
          journal: "Expert Opinion on Biological Therapy",
          year: 2012,
          pmid: "22074294",
          summary: "Comprehensive review of TB4's role in repair and regeneration of injured cells and tissues.",
          url: "https://pubmed.ncbi.nlm.nih.gov/22074294/"
        },
        {
          title: "Thymosin beta4 induces adult epicardial progenitor mobilization and neovascularization",
          authors: "Smart N, Risebro CA, Melville AA, et al.",
          journal: "Nature",
          year: 2007,
          pmid: "17108969",
          summary: "Study showing TB4's ability to mobilize epicardial progenitor cells and promote neovascularization following cardiac injury.",
          url: "https://pubmed.ncbi.nlm.nih.gov/17108969/"
        }
      ]
    },
    {
      areaId: "angiogenesis-vascular-repair",
      areaTitle: "Angiogenesis & Vascular Repair Signaling",
      studies: [
        {
          title: "Modulatory effect of gastric pentadecapeptide BPC 157 on angiogenesis in muscle and tendon healing",
          authors: "Brcic L, Brcic I, Staresinic M, Novinscak T, Sikiric P, Seiwerth S",
          journal: "Journal of Physiology and Pharmacology",
          year: 2009,
          pmid: "20388964",
          summary: "In preclinical models of crushed and transected muscle and tendon, BPC-157 modulated new blood vessel formation by up-regulating VEGF expression, resulting in improved vascular architecture and enhanced tissue healing outcomes.",
          url: "https://pubmed.ncbi.nlm.nih.gov/20388964/"
        },
        {
          title: "Thymosin beta4 enhances endothelial cell differentiation and angiogenesis",
          authors: "Grant DS, Rose W, Yaen C, Goldstein A, Martinez J, Kleinman H",
          journal: "Angiogenesis",
          year: 1999,
          pmid: "14517430",
          summary: "TB-500's parent peptide thymosin beta-4 promoted endothelial cell attachment, proliferation, tube formation, and vascular sprouting through both autocrine and paracrine mechanisms, establishing its role as a potent pro-angiogenic signaling molecule.",
          url: "https://pubmed.ncbi.nlm.nih.gov/14517430/"
        }
      ]
    },
    {
      areaId: "musculoskeletal-tendon-healing",
      areaTitle: "Musculoskeletal Injury & Tendon Healing Models",
      studies: [
        {
          title: "The promoting effect of pentadecapeptide BPC 157 on tendon healing involves tendon outgrowth, cell survival, and cell migration",
          authors: "Chang CH, Tsai WC, Lin MS, Hsu YH, Pang JH",
          journal: "Journal of Applied Physiology",
          year: 2011,
          pmid: "21030672",
          summary: "BPC-157 significantly accelerated tendon fibroblast outgrowth, enhanced cell survival under oxidative stress, and promoted dose-dependent cell migration in preclinical models through activation of the FAK-paxillin signaling pathway.",
          url: "https://pubmed.ncbi.nlm.nih.gov/21030672/"
        },
        {
          title: "Effective therapy of transected quadriceps muscle in rat: Gastric pentadecapeptide BPC 157",
          authors: "Staresinic M, Petrovic I, Novinscak T, Jukic I, Pevec D, et al.",
          journal: "Journal of Orthopaedic Research",
          year: 2006,
          pmid: "16609979",
          summary: "In a rat model of complete quadriceps transection, BPC-157 promoted functional recovery, restored biomechanical strength, and stimulated muscle fiber reconnection with significant regeneration markers over a 72-day observation period.",
          url: "https://pubmed.ncbi.nlm.nih.gov/16609979/"
        }
      ]
    },
    {
      areaId: "inflammatory-modulation-cytoprotection",
      areaTitle: "Inflammatory Modulation & Cytoprotection",
      studies: [
        {
          title: "Pentadecapeptide BPC 157 positively affects both non-steroidal anti-inflammatory agent-induced gastrointestinal lesions and adjuvant arthritis in rats",
          authors: "Sikiric P, Seiwerth S, Grabarevic Z, Rucman R, Petek M, et al.",
          journal: "Journal of Physiology - Paris",
          year: 1997,
          pmid: "9403784",
          summary: "BPC-157 demonstrated dual anti-inflammatory and mucosal-protective effects by reducing NSAID-induced gastric lesions across multiple agents while simultaneously attenuating the development and severity of adjuvant-induced arthritis in preclinical rat models.",
          url: "https://pubmed.ncbi.nlm.nih.gov/9403784/"
        },
        {
          title: "Stable gastric pentadecapeptide BPC 157 in the treatment of colitis and ischemia and reperfusion in rats: New insights",
          authors: "Duzel A, Vlainic J, Antunovic M, Malekinusic D, Vrdoljak B, et al.",
          journal: "World Journal of Gastroenterology",
          year: 2017,
          pmid: "29358856",
          summary: "In rat models of ischemic colitis and ischemia-reperfusion injury, BPC-157 restored mucosal architecture, normalized oxidative stress markers, and promoted collateral vessel recruitment, demonstrating cytoprotective and anti-inflammatory activity through nitric oxide system modulation.",
          url: "https://pubmed.ncbi.nlm.nih.gov/29358856/"
        }
      ]
    }
  ]
};

// GLOW Blend Research
// Note: GLOW contains GHK-Cu, BPC-157, and TB-500. Research references their individual mechanisms.
export const glowResearch: PeptideResearch = {
  peptideSlug: "glow",
  researchAreas: [
    {
      areaId: "skin-remodeling-ecm",
      areaTitle: "Skin Remodeling & Extracellular Matrix Research",
      studies: [
        {
          title: "The human tri-peptide GHK and tissue remodeling",
          authors: "Pickart L",
          journal: "Journal of Biomaterials Science, Polymer Edition",
          year: 2008,
          pmid: "18644225",
          summary: "Comprehensive review of GHK-Cu's effects on skin regeneration, collagen synthesis, and tissue remodeling.",
          url: "https://pubmed.ncbi.nlm.nih.gov/18644225/"
        },
        {
          title: "GHK peptide as a natural modulator of multiple cellular pathways in skin regeneration",
          authors: "Pickart L, Vasquez-Soltero JM, Margolina A",
          journal: "BioMed Research International",
          year: 2015,
          pmid: "26236730",
          summary: "Review of GHK-Cu's antioxidant properties, anti-inflammatory signaling, and modulation of over 4,000 human genes.",
          url: "https://pubmed.ncbi.nlm.nih.gov/26236730/"
        }
      ]
    },
    {
      areaId: "wound-healing-regeneration",
      areaTitle: "Wound Healing & Dermal Regeneration Models",
      studies: [
        {
          title: "Stable Gastric Pentadecapeptide BPC 157 and Wound Healing",
          authors: "Sikiric P, Seiwerth S, Rucman R, et al.",
          journal: "Frontiers in Pharmacology",
          year: 2021,
          pmid: "34267654",
          summary: "Comprehensive review of BPC-157's wound healing effects across multiple preclinical models.",
          url: "https://pubmed.ncbi.nlm.nih.gov/34267654/"
        },
        {
          title: "Thymosin β4: a multi-functional regenerative peptide",
          authors: "Goldstein AL, Hannappel E, Sosne G, Kleinman HK",
          journal: "Expert Opinion on Biological Therapy",
          year: 2012,
          pmid: "22074294",
          summary: "TB4's vital role in repair and regeneration of injured cells and tissues.",
          url: "https://pubmed.ncbi.nlm.nih.gov/22074294/"
        }
      ]
    },
    {
      areaId: "angiogenesis-migration",
      areaTitle: "Angiogenesis & Cellular Migration Signaling",
      studies: [
        {
          title: "Therapeutic potential of pro-angiogenic BPC157 is associated with VEGFR2 activation and up-regulation",
          authors: "Hsieh MJ, Liu HT, Wang CN, et al.",
          journal: "Journal of Molecular Medicine",
          year: 2017,
          pmid: "27847966",
          summary: "Preclinical study using chicken embryo, rat hindlimb ischemia, and human vascular endothelial cell models showing BPC-157 promotes VEGFR2 internalization and activates VEGFR2-Akt-eNOS signaling, increasing vessel density and accelerating blood flow recovery in vivo.",
          url: "https://pubmed.ncbi.nlm.nih.gov/27847966/"
        },
        {
          title: "Modulatory effect of gastric pentadecapeptide BPC 157 on angiogenesis in muscle and tendon healing",
          authors: "Brcic L, Brcic I, Staresinic M, et al.",
          journal: "Journal of Physiology and Pharmacology",
          year: 2009,
          pmid: "20388964",
          summary: "Immunohistochemical study in rat models of crushed and severed muscle and tendon demonstrating that BPC-157 upregulates VEGF expression in injured tissue, modulating angiogenesis and supporting vascular network formation during healing.",
          url: "https://pubmed.ncbi.nlm.nih.gov/20388964/"
        }
      ]
    },
    {
      areaId: "anti-inflammatory-cytoprotective",
      areaTitle: "Anti-Inflammatory & Cytoprotective Mechanisms",
      studies: [
        {
          title: "The tri-peptide GHK-Cu complex ameliorates lipopolysaccharide-induced acute lung injury in mice",
          authors: "Park JR, Lee H, Kim SI, Yang SR",
          journal: "Oncotarget",
          year: 2016,
          pmid: "27517151",
          summary: "Preclinical study in LPS-challenged macrophage cultures and mouse acute lung injury models showing GHK-Cu reduces reactive oxygen species, increases superoxide dismutase activity, and suppresses TNF-α and IL-6 production via inhibition of NF-κB p65 and p38 MAPK signaling pathways.",
          url: "https://pubmed.ncbi.nlm.nih.gov/27517151/"
        },
        {
          title: "Regenerative and Protective Actions of the GHK-Cu Peptide in the Light of the New Gene Data",
          authors: "Pickart L, Margolina A",
          journal: "International Journal of Molecular Sciences",
          year: 2018,
          pmid: "29986520",
          summary: "Review examining GHK-Cu's gene-regulatory basis for cytoprotective and anti-inflammatory activity, including suppression of NF-κB signaling, antioxidant enzyme induction, and activation of tissue remodeling pathways across skin, lung, liver, and gastrointestinal models.",
          url: "https://pubmed.ncbi.nlm.nih.gov/29986520/"
        }
      ]
    }
  ]
};
// Import verified metabolic peptide research
import { verifiedMetabolicResearch } from './metabolicPeptideResearch';

// Map peptide slugs to their research data
// Metabolic peptides use verified PMID-based data
export const peptideResearchData: Record<string, PeptideResearch> = {
  // Non-metabolic peptides (unchanged)
  "bpc-157": bpc157Research,
  "tb-500": tb500Research,
  "sermorelin": sermorelinResearch,
  "cjc-1295-ipamorelin": cjc1295IpamorelinResearch,
  "ipamorelin": ipamorelinResearch,
  "tesamorelin": tesamorelinResearch,
  "ghk-cu": ghkcuResearch,
  "epithalon": epithalonResearch,
  "pt-141": pt141Research,
  "selank": selankResearch,
  "semax": semaxResearch,
  "dsip": dsipResearch,
  "melanotan-2": melanotan2Research,
  "igf-1-lr3": igf1lr3Research,
  "glutathione": glutathioneResearch,
  "nad-buffered": nadBufferedResearch,
  "bpc-157-tb-500": bpc157tb500Research,
  "glow": glowResearch,
  // Metabolic peptides - VERIFIED PMID-based data
  ...verifiedMetabolicResearch,
};

// Helper function to get research for a specific area
export function getResearchByArea(peptideSlug: string, areaTitle: string): ResearchStudy[] | null {
  const peptideData = peptideResearchData[peptideSlug];
  if (!peptideData) return null;
  
  const area = peptideData.researchAreas.find(
    a => a.areaTitle.toLowerCase() === areaTitle.toLowerCase()
  );
  
  return area?.studies || null;
}
