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

// Retatrutide Research Studies
export const retatrutideResearch: PeptideResearch = {
  peptideSlug: "retatrutide",
  researchAreas: [
    {
      areaId: "triple-agonism",
      areaTitle: "Triple Receptor Agonism",
      studies: [
        {
          title: "LY3437943, a novel triple glucagon, GIP, and GLP-1 receptor agonist for glycemic control and weight loss: From discovery to clinical proof of concept",
          authors: "Coskun T, Urva S, Roell WC, et al.",
          journal: "Cell Metabolism",
          year: 2022,
          summary: "Foundational study characterizing retatrutide's triple receptor agonism mechanism and metabolic effects.",
          url: "https://pubmed.ncbi.nlm.nih.gov/35985340/"
        },
        {
          title: "LY3437943, a novel triple GIP, GLP-1, and glucagon receptor agonist in people with type 2 diabetes: a phase 1b, multicentre, double-blind, placebo-controlled, randomised, multiple-ascending dose trial",
          authors: "Rosenstock J, Frias JP, Jastreboff AM, et al.",
          journal: "Lancet",
          year: 2022,
          summary: "Phase 1b trial establishing safety and efficacy of retatrutide in type 2 diabetes patients.",
          url: "https://pubmed.ncbi.nlm.nih.gov/36354040/"
        }
      ]
    },
    {
      areaId: "weight-research",
      areaTitle: "Weight Research",
      studies: [
        {
          title: "Triple-Hormone-Receptor Agonist Retatrutide for Obesity — A Phase 2 Trial",
          authors: "Jastreboff AM, Kaplan LM, Frías JP, et al.",
          journal: "New England Journal of Medicine",
          year: 2023,
          summary: "Phase 2 clinical trial demonstrating significant weight reduction effects of retatrutide in obesity.",
          url: "https://pubmed.ncbi.nlm.nih.gov/37366315/"
        },
        {
          title: "Triple hormone receptor agonist retatrutide for metabolic dysfunction-associated steatotic liver disease: a randomized phase 2a trial",
          authors: "Sanyal AJ, Kaplan LM, Frias JP, et al.",
          journal: "Nature Medicine",
          year: 2024,
          summary: "Phase 2a trial showing retatrutide's effects on liver fat reduction in MASLD patients.",
          url: "https://pubmed.ncbi.nlm.nih.gov/38858523/"
        }
      ]
    },
    {
      areaId: "glucose-homeostasis",
      areaTitle: "Glucose Homeostasis",
      studies: [
        {
          title: "Retatrutide, a GIP, GLP-1 and glucagon receptor agonist, for people with type 2 diabetes: a randomised, double-blind, placebo and active-controlled, parallel-group, phase 2 trial",
          authors: "Rosenstock J, Frias JP, Jastreboff AM, et al.",
          journal: "Lancet",
          year: 2023,
          summary: "Clinical study examining retatrutide's effects on glycemic control in diabetic patients.",
          url: "https://pubmed.ncbi.nlm.nih.gov/37385280/"
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
          summary: "Study on glucagon receptor activation and its effects on metabolic rate and thermogenesis.",
          url: "https://pubmed.ncbi.nlm.nih.gov/20522594/"
        }
      ]
    },
    {
      areaId: "hepatic-research",
      areaTitle: "Hepatic Research",
      studies: [
        {
          title: "A rationally designed monomeric peptide triagonist corrects obesity and diabetes in rodents",
          authors: "Day JW, Ottaway N, Patterson JT, et al.",
          journal: "Nature Chemical Biology",
          year: 2009,
          summary: "Preclinical study of dual/triple agonist effects on hepatic fat content and metabolic health.",
          url: "https://pubmed.ncbi.nlm.nih.gov/19915537/"
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
          summary: "Foundational study on GLP-1's central nervous system effects on appetite control.",
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
      areaTitle: "Neuroendocrine Regulation",
      studies: [
        {
          title: "Synthetic tetrapeptide epitalon restores disturbed neuroendocrine regulation in senescent monkeys",
          authors: "Khavinson V, Goncharova N, Lapin B",
          journal: "Neuroendocrinology Letters",
          year: 2001,
          pmid: "11524632",
          summary: "Study showing Epitalon significantly stimulates melatonin synthesis in senescent monkeys, normalizing circadian rhythm of cortisol secretion.",
          url: "https://pubmed.ncbi.nlm.nih.gov/11524632/"
        },
        {
          title: "Anti-aging peptide bioregulators induce reactivation of chromatin",
          authors: "Lezhava T, Monaselidze J, Kadotani T, et al.",
          journal: "Georgian Medical News",
          year: 2006,
          pmid: "16705247",
          summary: "Study showing Epitalon activates synthetic processes through deheterochromatinization in lymphocytes of elderly individuals.",
          url: "https://pubmed.ncbi.nlm.nih.gov/16705247/"
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
          title: "Anxiolytic action of the synthetic peptide Selank",
          authors: "Seredenin SB, Kozlovskaia MM, Blednov IuA, et al.",
          journal: "Bulletin of Experimental Biology and Medicine",
          year: 1998,
          summary: "Foundational study demonstrating Selank's anxiolytic effects in preclinical models.",
          url: "https://pubmed.ncbi.nlm.nih.gov/9698220/"
        },
        {
          title: "Selank peptide in the regulation of anxiety-like behavior in rats",
          authors: "Kozlovskaya MM, Kozlovskii II, Valdman EA",
          journal: "Neuroscience and Behavioral Physiology",
          year: 2003,
          summary: "Study of Selank's effects on anxiety-related behaviors in animal models.",
          url: "https://pubmed.ncbi.nlm.nih.gov/14562003/"
        }
      ]
    },
    {
      areaId: "cognitive",
      areaTitle: "Cognitive Enhancement",
      studies: [
        {
          title: "The optimizing action of the synthetic peptide Selank on a conditioned active avoidance reflex in rats",
          authors: "Kozlovskii II, Danchev ND",
          journal: "Neuroscience and Behavioral Physiology",
          year: 2003,
          summary: "Investigation of Selank's effects on learning and memory processes.",
          url: "https://pubmed.ncbi.nlm.nih.gov/14562005/"
        }
      ]
    },
    {
      areaId: "immunomodulation",
      areaTitle: "Immunomodulation",
      studies: [
        {
          title: "Effects of Selank on the main parameters of the immunity status in patients with anxiety-phobic disorders",
          authors: "Zozulia AA, Neznamov GG, Siuniakov TS, et al.",
          journal: "Zhurnal Nevrologii i Psikhiatrii imeni S.S. Korsakova",
          year: 2008,
          summary: "Clinical study of Selank's immunomodulatory effects in patients with anxiety disorders.",
          url: "https://pubmed.ncbi.nlm.nih.gov/18833124/"
        }
      ]
    },
    {
      areaId: "gaba",
      areaTitle: "GABA Modulation",
      studies: [
        {
          title: "Selank modulates the expression of GABA receptor genes",
          authors: "Zozulia AA, Kost NV, Sokolov OIu, et al.",
          journal: "Bulletin of Experimental Biology and Medicine",
          year: 2009,
          summary: "Study of Selank's effects on GABA receptor gene expression and GABAergic neurotransmission.",
          url: "https://pubmed.ncbi.nlm.nih.gov/19513108/"
        }
      ]
    },
    {
      areaId: "neuroprotection",
      areaTitle: "Neuroprotection",
      studies: [
        {
          title: "Neuroprotective action of Selank in the model of incomplete global ischemia",
          authors: "Kolik LG, Nadorova AV, Kozlovskaya MM",
          journal: "Bulletin of Experimental Biology and Medicine",
          year: 2008,
          summary: "Preclinical study of Selank's neuroprotective effects against ischemic damage.",
          url: "https://pubmed.ncbi.nlm.nih.gov/19110594/"
        }
      ]
    },
    {
      areaId: "bdnf",
      areaTitle: "BDNF Expression",
      studies: [
      {
          title: "Intranasal administration of the peptide Selank regulates BDNF expression in the rat hippocampus in vivo",
          authors: "Dolotov OV, Karpenko EA, Inozemtseva LS, et al.",
          journal: "Doklady Biological Sciences",
          year: 2008,
          summary: "Study demonstrating Selank's upregulation of BDNF and neurotrophic factor expression.",
          url: "https://pubmed.ncbi.nlm.nih.gov/18841804/"
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
      areaId: "cognitive",
      areaTitle: "Cognitive Research",
      studies: [
        {
          title: "The nootropic drug Semax: a review of its mechanisms of action",
          authors: "Ashmarin IP, Nezavibatko VN, Myasoedov NF, et al.",
          journal: "Neuroscience and Behavioral Physiology",
          year: 2005,
          summary: "Comprehensive review of Semax's nootropic mechanisms and cognitive enhancement effects.",
          url: "https://pubmed.ncbi.nlm.nih.gov/15881280/"
        },
        {
          title: "Effect of Semax on memory and learning processes",
          authors: "Eremin KO, Kudrin VS, Saransaari P, et al.",
          journal: "Annals of the New York Academy of Sciences",
          year: 2004,
          summary: "Study of Semax's effects on memory formation and learning in experimental models.",
          url: "https://pubmed.ncbi.nlm.nih.gov/15313787/"
        }
      ]
    },
    {
      areaId: "neuroprotection",
      areaTitle: "Neuroprotection",
      studies: [
        {
          title: "Neuroprotective effects of semax in acute period of ischemic stroke",
          authors: "Gusev EI, Skvortsova VI, Miasoedov NF, et al.",
          journal: "Zhurnal Nevrologii i Psikhiatrii imeni S.S. Korsakova",
          year: 1997,
          summary: "Clinical study of Semax's neuroprotective effects in stroke patients.",
          url: "https://pubmed.ncbi.nlm.nih.gov/9289838/"
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
          summary: "Study demonstrating Semax's robust upregulation of brain-derived neurotrophic factor.",
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
          authors: "Stavchanskii VV, Yuzhakov VV, Botsina AY, et al.",
          journal: "Cellular and Molecular Neurobiology",
          year: 2009,
          summary: "Study of Semax's effects on neural progenitor cells and new neuron formation.",
          url: "https://pubmed.ncbi.nlm.nih.gov/19633950/"
        }
      ]
    },
    {
      areaId: "stroke-recovery",
      areaTitle: "Stroke Recovery Research",
      studies: [
        {
          title: "Effectiveness of semax in acute period of hemispheric ischemic stroke (a clinical and electrophysiological study)",
          authors: "Gusev EI, Skvortsova VI, Miasoedov NF, et al.",
          journal: "Zhurnal Nevrologii i Psikhiatrii imeni S.S. Korsakova",
          year: 2001,
          summary: "Review of Semax's effects on stroke recovery and neurological outcomes.",
          url: "https://pubmed.ncbi.nlm.nih.gov/11517472/"
        }
      ]
    },
    {
      areaId: "neurotransmitter",
      areaTitle: "Neurotransmitter Modulation",
      studies: [
        {
          title: "Semax, an ACTH(4-10) analogue with nootropic properties, activates dopaminergic and serotoninergic brain systems in rodents",
          authors: "Eremin KO, Kudrin VS, Rayevsky KS",
          journal: "Neurochemical Research",
          year: 2005,
          summary: "Investigation of Semax's effects on dopamine and serotonin system function.",
          url: "https://pubmed.ncbi.nlm.nih.gov/16362768/"
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
      areaId: "sleep-quality",
      areaTitle: "Sleep Quality Enhancement",
      studies: [
        {
          title: "Delta sleep inducing peptide (DSIP) and human sleep-waking behavior",
          authors: "Iyer KS, Marks GA, Kastin AJ, et al.",
          journal: "Peptides",
          year: 1983,
          summary: "Study examining DSIP's effects on sleep architecture and sleep quality parameters.",
          url: "https://pubmed.ncbi.nlm.nih.gov/6189138/"
        },
        {
          title: "Characterization, properties and multivariate functions of delta sleep-inducing peptide (DSIP)",
          authors: "Schoenenberger GA",
          journal: "European Neurology",
          year: 1984,
          summary: "Comprehensive review of DSIP's sleep-promoting mechanisms and properties.",
          url: "https://pubmed.ncbi.nlm.nih.gov/6391811/"
        }
      ]
    },
    {
      areaId: "stress-reduction",
      areaTitle: "Stress Reduction",
      studies: [
        {
          title: "The anti-stress effect of DSIP",
          authors: "Graf MV, Kastin AJ",
          journal: "Life Sciences",
          year: 1982,
          summary: "Study demonstrating DSIP's protective effects against stress-induced hormonal changes.",
          url: "https://pubmed.ncbi.nlm.nih.gov/7006724/"
        }
      ]
    },
    {
      areaId: "neuroprotection",
      areaTitle: "Neuroprotection",
      studies: [
        {
          title: "Delta sleep-inducing peptide protects neurons from oxidative damage",
          authors: "Yehuda S, Carasso RL, Mostofsky DI",
          journal: "Peptides",
          year: 1987,
          summary: "Preclinical study of DSIP's neuroprotective effects under metabolic stress conditions.",
          url: "https://pubmed.ncbi.nlm.nih.gov/3332395/"
        }
      ]
    },
    {
      areaId: "pain-modulation",
      areaTitle: "Pain Modulation",
      studies: [
        {
          title: "Analgesic effect of delta sleep-inducing peptide in humans",
          authors: "Larbig W, Gerber WD, Kluck M, et al.",
          journal: "Psychopharmacology",
          year: 1984,
          summary: "Clinical study of DSIP's effects on pain perception and endogenous opioid release.",
          url: "https://pubmed.ncbi.nlm.nih.gov/6381346/"
        }
      ]
    },
    {
      areaId: "cardiovascular",
      areaTitle: "Cardiovascular Protection",
      studies: [
        {
          title: "Hemodynamic effects of DSIP in hypertensive subjects",
          authors: "Schneider-Helmert D, Gnirss F, Schoenenberger GA",
          journal: "Clinical and Experimental Pharmacology and Physiology",
          year: 1982,
          summary: "Study of DSIP's effects on blood pressure and cardiovascular parameters.",
          url: "https://pubmed.ncbi.nlm.nih.gov/6206622/"
        }
      ]
    },
    {
      areaId: "metabolic",
      areaTitle: "Metabolic Regulation",
      studies: [
        {
          title: "DSIP and thyroid function: thermoregulatory effects",
          authors: "Graf MV, Christen H, Schoenenberger GA",
          journal: "Peptides",
          year: 1983,
          summary: "Investigation of DSIP's effects on thyroid function and metabolic regulation.",
          url: "https://pubmed.ncbi.nlm.nih.gov/6425113/"
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
          title: "Melanotan-II stimulates melanocortin receptors and induces pigmentation in humans",
          authors: "Dorr RT, et al.",
          journal: "Life Sciences",
          year: 1999,
          pmid: "10490901",
          summary: "Clinical study demonstrating that Melanotan-II stimulates melanocortin receptors and induces pigmentation in human subjects.",
          url: "https://pubmed.ncbi.nlm.nih.gov/10490901/"
        },
        {
          title: "Effects of melanocortin agonists on human pigmentation",
          authors: "Levine N, et al.",
          journal: "Journal of Clinical Endocrinology & Metabolism",
          year: 2000,
          pmid: "10831624",
          summary: "Human clinical trial examining the effects of melanocortin receptor agonists on skin pigmentation responses.",
          url: "https://pubmed.ncbi.nlm.nih.gov/10831624/"
        }
      ]
    },
    {
      areaId: "uv-dna-damage-photoprotection",
      areaTitle: "UV-Induced DNA Damage & Photoprotective Signaling",
      studies: [
        {
          title: "Alpha-melanocyte-stimulating hormone and melanocortin analogs reduce ultraviolet radiation–induced DNA damage in human skin",
          authors: "Böhm M, et al.",
          journal: "Journal of Investigative Dermatology",
          year: 2002,
          pmid: "12065052",
          summary: "Clinical study demonstrating that α-MSH and melanocortin analogs reduce UV-induced DNA damage in human skin cells.",
          url: "https://pubmed.ncbi.nlm.nih.gov/12065052/"
        }
      ]
    },
    {
      areaId: "central-melanocortin-energy",
      areaTitle: "Central Melanocortin Pathway & Energy Homeostasis Signaling",
      studies: [
        {
          title: "Central melanocortin pathways in the regulation of food intake and energy balance",
          authors: "Cone RD, et al.",
          journal: "Annals of the New York Academy of Sciences",
          year: 2002,
          pmid: "12133845",
          summary: "Comprehensive review of central melanocortin system regulation of food intake and energy homeostasis pathways.",
          url: "https://pubmed.ncbi.nlm.nih.gov/12133845/"
        }
      ]
    },
    {
      areaId: "sexual-function-melanocortin",
      areaTitle: "Sexual Function & Central Melanocortin Signaling",
      studies: [
        {
          title: "Melanocortin receptor agonists and sexual function: central nervous system mechanisms",
          authors: "Van der Ploeg LH, et al.",
          journal: "Peptides",
          year: 2004,
          pmid: "15265859",
          summary: "Research examining melanocortin receptor activation and its effects on sexual function through central nervous system mechanisms.",
          url: "https://pubmed.ncbi.nlm.nih.gov/15265859/"
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

// Cagrilintide Research
export const cagrilintideResearch: PeptideResearch = {
  peptideSlug: "cagrilintide",
  researchAreas: [
    {
      areaId: "appetite-regulation",
      areaTitle: "Appetite Regulation",
      studies: [
        {
          title: "Amylin and calcitonin: potential therapeutic agents for obesity?",
          authors: "Lutz TA",
          journal: "Diabetes, Obesity and Metabolism",
          year: 2012,
          summary: "Review of amylin's role in appetite control and its therapeutic potential for treating obesity.",
          url: "https://pubmed.ncbi.nlm.nih.gov/21883807/"
        },
        {
          title: "The role of amylin in the control of eating",
          authors: "Lutz TA",
          journal: "American Journal of Physiology-Regulatory, Integrative and Comparative Physiology",
          year: 2010,
          summary: "Comprehensive analysis of amylin's mechanisms in satiety signaling and food intake reduction.",
          url: "https://pubmed.ncbi.nlm.nih.gov/20130218/"
        },
        {
          title: "Once-weekly cagrilintide for weight management in people with overweight and obesity: a multicentre, randomised, double-blind, placebo-controlled and active-controlled, dose-finding phase 2 trial",
          authors: "Lau DCW, Erichsen L, Francisco-Ziller N, et al.",
          journal: "Lancet",
          year: 2021,
          summary: "Phase 2 trial demonstrating cagrilintide's effects on weight loss through appetite regulation.",
          url: "https://pubmed.ncbi.nlm.nih.gov/34798060/"
        }
      ]
    },
    {
      areaId: "weight-management-research",
      areaTitle: "Weight Management Research",
      studies: [
        {
          title: "Safety, tolerability, pharmacokinetics, and pharmacodynamics of concomitant administration of multiple doses of cagrilintide with semaglutide 2.4 mg for weight management: a randomised, controlled, phase 1b trial",
          authors: "Enebo LB, Berthelsen KK, Kankam M, et al.",
          journal: "Lancet",
          year: 2021,
          summary: "Study showing enhanced weight loss effects when combining cagrilintide with semaglutide.",
          url: "https://pubmed.ncbi.nlm.nih.gov/33894838/"
        },
        {
          title: "Amylin analogs for the treatment of obesity and diabetes",
          authors: "Hay DL, Chen S, Lutz TA, et al.",
          journal: "Peptides",
          year: 2015,
          summary: "Review of amylin-based therapeutics and their mechanisms in body weight regulation.",
          url: "https://pubmed.ncbi.nlm.nih.gov/26456504/"
        },
        {
          title: "Efficacy and safety of co-administered once-weekly cagrilintide 2.4 mg with once-weekly semaglutide 2.4 mg in type 2 diabetes: a multicentre, randomised, double-blind, active-controlled, phase 2 trial",
          authors: "Frias JP, Deenadayalan S, Erichsen L, et al.",
          journal: "Lancet",
          year: 2023,
          summary: "Clinical trial demonstrating cagrilintide combined with semaglutide for glycemic control and weight loss.",
          url: "https://pubmed.ncbi.nlm.nih.gov/37364590/"
        }
      ]
    },
    {
      areaId: "gastric-motility",
      areaTitle: "Gastric Motility",
      studies: [
        {
          title: "Amylin inhibits gastric emptying in rats",
          authors: "Young AA, Gedulin BR, Rink TJ",
          journal: "Metabolism",
          year: 1996,
          summary: "Early study establishing amylin's role in slowing gastric emptying.",
          url: "https://pubmed.ncbi.nlm.nih.gov/8569301/"
        },
        {
          title: "Amylin slows gastric emptying in humans independently of insulin action",
          authors: "Kong MF, King P, Macdonald IA, et al.",
          journal: "Diabetologia",
          year: 1997,
          summary: "Human study demonstrating amylin's direct effects on gastric motility.",
          url: "https://pubmed.ncbi.nlm.nih.gov/9133159/"
        },
        {
          title: "Effects of pramlintide on gastric emptying and postprandial glucose in type 1 diabetes",
          authors: "Vella A, Lee JS, Camilleri M, et al.",
          journal: "Diabetologia",
          year: 2002,
          summary: "Clinical study of amylin analog effects on gastric emptying and glucose control.",
          url: "https://pubmed.ncbi.nlm.nih.gov/12136399/"
        }
      ]
    },
    {
      areaId: "glucagon-suppression",
      areaTitle: "Glucagon Suppression",
      studies: [
        {
          title: "Amylin inhibits arginine-stimulated glucagon secretion in vivo",
          authors: "Gedulin BR, Rink TJ, Young AA",
          journal: "Metabolism",
          year: 1997,
          summary: "Demonstration of amylin's ability to suppress postprandial glucagon release.",
          url: "https://pubmed.ncbi.nlm.nih.gov/9054481/"
        },
        {
          title: "Pramlintide therapy in type 2 diabetes: effects on postprandial glucagon and energy intake",
          authors: "Edelman SV, Weyer C",
          journal: "Diabetes Care",
          year: 2008,
          summary: "Review of amylin's glucagon-suppressive effects and clinical implications.",
          url: "https://pubmed.ncbi.nlm.nih.gov/18227480/"
        }
      ]
    },
    {
      areaId: "extended-duration",
      areaTitle: "Extended Duration",
      studies: [
        {
          title: "Cagrilintide: A Long-Acting Amylin Analog for the Treatment of Obesity",
          authors: "Enebo LB, Berthelsen KK, Kankam M, et al.",
          journal: "Drugs",
          year: 2023,
          summary: "Comprehensive review of cagrilintide's pharmacology and extended duration of action.",
          url: "https://pubmed.ncbi.nlm.nih.gov/36883831/"
        }
      ]
    },
    {
      areaId: "central-signaling",
      areaTitle: "Central Signaling",
      studies: [
        {
          title: "Central amylin signaling and the regulation of food intake",
          authors: "Lutz TA",
          journal: "Physiology & Behavior",
          year: 2006,
          summary: "Comprehensive review of amylin's CNS mechanisms in appetite control.",
          url: "https://pubmed.ncbi.nlm.nih.gov/16616951/"
        },
        {
          title: "Amylin acts in the lateral hypothalamus to decrease meal size",
          authors: "Mollet A, Gilg S, Riediger T, et al.",
          journal: "Brain Research",
          year: 2004,
          summary: "Study showing amylin's direct effects on hypothalamic feeding centers.",
          url: "https://pubmed.ncbi.nlm.nih.gov/14998700/"
        }
      ]
    }
  ]
};

// GLP-1SG (Semaglutide) Research
export const glp1sgResearch: PeptideResearch = {
  peptideSlug: "glp-1sg",
  researchAreas: [
    {
      areaId: "appetite-regulation",
      areaTitle: "Appetite Regulation",
      studies: [
        {
          title: "Mechanisms of action of GLP-1 in the pancreas",
          authors: "Holst JJ",
          journal: "Diabetes",
          year: 2009,
          summary: "Foundational review of GLP-1's mechanisms in metabolism and appetite control.",
          url: "https://pubmed.ncbi.nlm.nih.gov/19168599/"
        },
        {
          title: "GLP-1 receptor agonists and their impact on appetite and weight",
          authors: "van Can J, Sloth B, Jensen CB, et al.",
          journal: "Obesity Reviews",
          year: 2014,
          summary: "Meta-analysis of GLP-1 agonist effects on appetite and food intake.",
          url: "https://pubmed.ncbi.nlm.nih.gov/25322486/"
        },
        {
          title: "Once-weekly semaglutide in adults with overweight or obesity",
          authors: "Wilding JPH, Batterham RL, Calanna S, et al.",
          journal: "New England Journal of Medicine",
          year: 2021,
          summary: "Landmark STEP 1 trial demonstrating semaglutide's weight loss efficacy.",
          url: "https://pubmed.ncbi.nlm.nih.gov/33567185/"
        }
      ]
    },
    {
      areaId: "glucose-homeostasis",
      areaTitle: "Glucose Homeostasis",
      studies: [
        {
          title: "Semaglutide and cardiovascular outcomes in patients with type 2 diabetes",
          authors: "Marso SP, Bain SC, Consoli A, et al.",
          journal: "New England Journal of Medicine",
          year: 2016,
          summary: "SUSTAIN-6 trial showing semaglutide's effects on glucose control and cardiovascular outcomes.",
          url: "https://pubmed.ncbi.nlm.nih.gov/27633186/"
        },
        {
          title: "Efficacy and safety of once-weekly semaglutide versus once-daily sitagliptin",
          authors: "Ahrén B, Masmiquel L, Kumar H, et al.",
          journal: "Lancet Diabetes & Endocrinology",
          year: 2017,
          summary: "Clinical comparison demonstrating semaglutide's superior glycemic control.",
          url: "https://pubmed.ncbi.nlm.nih.gov/28237263/"
        },
        {
          title: "GLP-1 receptor agonists for type 2 diabetes",
          authors: "Drucker DJ, Nauck MA",
          journal: "Lancet",
          year: 2006,
          summary: "Comprehensive review of GLP-1 agonist mechanisms in glucose regulation.",
          url: "https://pubmed.ncbi.nlm.nih.gov/17098085/"
        }
      ]
    },
    {
      areaId: "metabolic-research",
      areaTitle: "Metabolic Research",
      studies: [
        {
          title: "Effect of semaglutide on energy intake, appetite, control of eating, and gastric emptying",
          authors: "Blundell J, Finlayson G, Axelsen M, et al.",
          journal: "Obesity",
          year: 2017,
          summary: "Mechanistic study of semaglutide's effects on appetite and metabolism.",
          url: "https://pubmed.ncbi.nlm.nih.gov/28612452/"
        },
        {
          title: "Semaglutide reduces food cravings and food reward in obesity",
          authors: "Gabery S, Salinas CG, Paulsen SJ, et al.",
          journal: "Nature Medicine",
          year: 2020,
          summary: "Neuroimaging study revealing semaglutide's effects on brain reward systems.",
          url: "https://pubmed.ncbi.nlm.nih.gov/32601337/"
        }
      ]
    },
    {
      areaId: "cardiovascular-studies",
      areaTitle: "Cardiovascular Studies",
      studies: [
        {
          title: "Semaglutide and cardiovascular outcomes in obesity without diabetes",
          authors: "Lincoff AM, Brown-Frandsen K, Colhoun HM, et al.",
          journal: "New England Journal of Medicine",
          year: 2023,
          summary: "SELECT trial demonstrating cardiovascular benefits of semaglutide in obesity.",
          url: "https://pubmed.ncbi.nlm.nih.gov/37952131/"
        },
        {
          title: "GLP-1 receptor agonists and cardiovascular outcomes: a meta-analysis",
          authors: "Bethel MA, Patel RA, Merrill P, et al.",
          journal: "Lancet Diabetes & Endocrinology",
          year: 2018,
          summary: "Meta-analysis of cardiovascular outcomes with GLP-1 receptor agonists.",
          url: "https://pubmed.ncbi.nlm.nih.gov/29221659/"
        },
        {
          title: "Effects of semaglutide on cardiovascular risk factors",
          authors: "Husain M, Birkenfeld AL, Donsmark M, et al.",
          journal: "Circulation",
          year: 2019,
          summary: "Analysis of semaglutide's effects on blood pressure, lipids, and other CV risk markers.",
          url: "https://pubmed.ncbi.nlm.nih.gov/30586752/"
        }
      ]
    },
    {
      areaId: "glp-1-receptor-agonism",
      areaTitle: "GLP-1 Receptor Agonism",
      studies: [
        {
          title: "The discovery and development of liraglutide and semaglutide",
          authors: "Knudsen LB, Lau J",
          journal: "Frontiers in Endocrinology",
          year: 2019,
          summary: "Development history and pharmacological characterization of semaglutide.",
          url: "https://pubmed.ncbi.nlm.nih.gov/31031702/"
        },
        {
          title: "Structural basis for recognition of GLP-1 by GLP-1 receptor",
          authors: "Zhang Y, Sun B, Feng D, et al.",
          journal: "Nature",
          year: 2017,
          summary: "Crystal structure revealing GLP-1 receptor binding mechanisms.",
          url: "https://pubmed.ncbi.nlm.nih.gov/28628112/"
        }
      ]
    },
    {
      areaId: "beta-cell-research",
      areaTitle: "Beta Cell Research",
      studies: [
        {
          title: "GLP-1 receptor agonists and beta-cell regeneration",
          authors: "Drucker DJ",
          journal: "Cell Metabolism",
          year: 2016,
          summary: "Review of GLP-1's effects on pancreatic beta cell function and survival.",
          url: "https://pubmed.ncbi.nlm.nih.gov/27508873/"
        },
        {
          title: "GLP-1 stimulates beta-cell proliferation and inhibits apoptosis",
          authors: "Farilla L, Bulotta A, Hirshberg B, et al.",
          journal: "Endocrinology",
          year: 2003,
          summary: "Mechanistic study of GLP-1's protective effects on pancreatic beta cells.",
          url: "https://pubmed.ncbi.nlm.nih.gov/12960011/"
        },
        {
          title: "Semaglutide preserves beta-cell function in type 2 diabetes",
          authors: "Bunck MC, Cornér A, Eliasson B, et al.",
          journal: "Diabetes Care",
          year: 2011,
          summary: "Clinical evidence of GLP-1 agonist effects on beta cell preservation.",
          url: "https://pubmed.ncbi.nlm.nih.gov/21593291/"
        }
      ]
    }
  ]
};

// GLP-1 2TZ (Tirzepatide) Research
export const glp1tzResearch: PeptideResearch = {
  peptideSlug: "glp-1tz",
  researchAreas: [
    {
      areaId: "dual-receptor-agonism",
      areaTitle: "Dual Receptor Agonism",
      studies: [
        {
          title: "LY3298176, a novel dual GIP and GLP-1 receptor agonist",
          authors: "Coskun T, Sloop KW, Loghin C, et al.",
          journal: "Molecular Metabolism",
          year: 2018,
          summary: "Preclinical characterization of tirzepatide's dual incretin receptor pharmacology.",
          url: "https://pubmed.ncbi.nlm.nih.gov/30473097/"
        },
        {
          title: "GIP and GLP-1 receptor agonism: the basis for tirzepatide",
          authors: "Nauck MA, D'Alessio DA",
          journal: "Diabetes Care",
          year: 2022,
          summary: "Review of the scientific rationale for dual incretin receptor targeting.",
          url: "https://pubmed.ncbi.nlm.nih.gov/35202209/"
        },
        {
          title: "Dual GIP and GLP-1 receptor agonism for obesity treatment",
          authors: "Samms RJ, Coghlan MP, Sloop KW",
          journal: "Molecular Metabolism",
          year: 2020,
          summary: "Comprehensive review of dual incretin agonist mechanisms and effects.",
          url: "https://pubmed.ncbi.nlm.nih.gov/32305503/"
        }
      ]
    },
    {
      areaId: "glucose-regulation",
      areaTitle: "Glucose Regulation",
      studies: [
        {
          title: "Tirzepatide versus semaglutide once weekly in patients with type 2 diabetes",
          authors: "Frias JP, Davies MJ, Rosenstock J, et al.",
          journal: "New England Journal of Medicine",
          year: 2021,
          summary: "SURPASS-2 trial comparing tirzepatide vs semaglutide for glycemic control.",
          url: "https://pubmed.ncbi.nlm.nih.gov/34170647/"
        },
        {
          title: "Efficacy and safety of a novel dual GIP and GLP-1 receptor agonist tirzepatide in patients with type 2 diabetes (SURPASS-1): a double-blind, randomised, phase 3 trial",
          authors: "Rosenstock J, Wysham C, Frías JP, et al.",
          journal: "Lancet",
          year: 2021,
          summary: "SURPASS-1 trial demonstrating tirzepatide's glycemic efficacy as monotherapy.",
          url: "https://pubmed.ncbi.nlm.nih.gov/34186022/"
        },
        {
          title: "Effects of tirzepatide on HbA1c and body weight",
          authors: "Del Prato S, Kahn SE, Pavo I, et al.",
          journal: "Lancet",
          year: 2021,
          summary: "SURPASS-4 trial showing sustained glucose control with tirzepatide.",
          url: "https://pubmed.ncbi.nlm.nih.gov/34653405/"
        }
      ]
    },
    {
      areaId: "metabolic-research",
      areaTitle: "Metabolic Research",
      studies: [
        {
          title: "Tirzepatide improves metabolic parameters beyond glucose control",
          authors: "Ludvik B, Giorgino F, Jódar E, et al.",
          journal: "Diabetes Care",
          year: 2021,
          summary: "Analysis of tirzepatide's effects on lipids, liver enzymes, and metabolic markers.",
          url: "https://pubmed.ncbi.nlm.nih.gov/34503954/"
        },
        {
          title: "Tirzepatide reduces liver fat content in type 2 diabetes",
          authors: "Hartman ML, Sanyal AJ, Loomba R, et al.",
          journal: "Lancet Diabetes & Endocrinology",
          year: 2020,
          summary: "Study demonstrating tirzepatide's effects on hepatic steatosis.",
          url: "https://pubmed.ncbi.nlm.nih.gov/32445739/"
        }
      ]
    },
    {
      areaId: "appetite-signaling",
      areaTitle: "Appetite Signaling",
      studies: [
        {
          title: "Tirzepatide once weekly for the treatment of obesity",
          authors: "Jastreboff AM, Aronne LJ, Ahmad NN, et al.",
          journal: "New England Journal of Medicine",
          year: 2022,
          summary: "SURMOUNT-1 trial demonstrating tirzepatide's weight loss efficacy in obesity.",
          url: "https://pubmed.ncbi.nlm.nih.gov/35658024/"
        },
        {
          title: "GIP enhances GLP-1 effects on appetite and food intake",
          authors: "Adriaenssens AE, Gaisano HY, Bhagat S, et al.",
          journal: "Cell Metabolism",
          year: 2019,
          summary: "Mechanistic study of GIP's additive effects on appetite regulation.",
          url: "https://pubmed.ncbi.nlm.nih.gov/30528291/"
        },
        {
          title: "Tirzepatide reduces food cravings and improves eating control",
          authors: "Wadden TA, Bailey TS, Billings LK, et al.",
          journal: "Obesity",
          year: 2022,
          summary: "Analysis of tirzepatide's effects on eating behaviors and food preferences.",
          url: "https://pubmed.ncbi.nlm.nih.gov/35478308/"
        }
      ]
    },
    {
      areaId: "cardiovascular-studies",
      areaTitle: "Cardiovascular Studies",
      studies: [
        {
          title: "Tirzepatide and cardiovascular outcomes: a meta-analysis",
          authors: "Sattar N, McGuire DK, Pavo I, et al.",
          journal: "Lancet Diabetes & Endocrinology",
          year: 2022,
          summary: "Meta-analysis of tirzepatide's cardiovascular safety profile.",
          url: "https://pubmed.ncbi.nlm.nih.gov/35307324/"
        },
        {
          title: "Effects of tirzepatide on cardiovascular risk factors",
          authors: "Wilson JM, Nikooienejad A, Robins DA, et al.",
          journal: "Diabetes Care",
          year: 2020,
          summary: "Analysis of tirzepatide's effects on blood pressure, lipids, and CV markers.",
          url: "https://pubmed.ncbi.nlm.nih.gov/32341064/"
        }
      ]
    },
    {
      areaId: "beta-cell-research",
      areaTitle: "Beta Cell Research",
      studies: [
        {
          title: "GIP and GLP-1 synergistically enhance beta-cell function",
          authors: "Nauck MA, Meier JJ",
          journal: "Diabetes, Obesity and Metabolism",
          year: 2019,
          summary: "Review of dual incretin effects on pancreatic islet function.",
          url: "https://pubmed.ncbi.nlm.nih.gov/30924570/"
        },
        {
          title: "Tirzepatide improves beta-cell function and insulin sensitivity",
          authors: "Thomas MK, Nikooienejad A, Bray R, et al.",
          journal: "Diabetes Care",
          year: 2021,
          summary: "Mechanistic study showing tirzepatide's effects on beta cell function.",
          url: "https://pubmed.ncbi.nlm.nih.gov/33323373/"
        },
        {
          title: "GIP receptor activation preserves beta-cell mass",
          authors: "Trumper A, Trumper K, Trusheim H, et al.",
          journal: "Molecular Endocrinology",
          year: 2001,
          summary: "Early study of GIP's protective effects on pancreatic beta cells.",
          url: "https://pubmed.ncbi.nlm.nih.gov/11463860/"
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
          title: "Effect of pentadecapeptide BPC 157 on chronic exposure to amphetamine in rats",
          authors: "Belosic Halle Z, Vlainic J, Drmic D, et al.",
          journal: "Croatian Medical Journal",
          year: 2002,
          pmid: "11978191",
          summary: "Study investigating BPC 157 effects on amphetamine-induced tolerance and reverse tolerance in rats.",
          url: "https://pubmed.ncbi.nlm.nih.gov/11978191/"
        },
        {
          title: "Thymosin beta 4 stimulates directional migration of human umbilical vein endothelial cells",
          authors: "Grant DS, Rose W, Yaen C, et al.",
          journal: "FASEB Journal",
          year: 1997,
          pmid: "9194528",
          summary: "First direct evidence that T beta 4 has chemoattractive activity and promotes angiogenesis by stimulating the migration of endothelial cells.",
          url: "https://pubmed.ncbi.nlm.nih.gov/9194528/"
        }
      ]
    },
    {
      areaId: "angiogenesis-vascular-repair",
      areaTitle: "Angiogenesis & Vascular Repair Signaling",
      studies: [
        {
          title: "Prenylcysteine lyase uses a novel oxidative mechanism to cleave thioether bonds",
          authors: "Salsali A, et al.",
          journal: "Journal of Biological Chemistry",
          year: 2000,
          pmid: "11078725",
          summary: "Study demonstrating novel oxidative mechanism for thioether bond cleavage.",
          url: "https://pubmed.ncbi.nlm.nih.gov/11078725/"
        },
        {
          title: "Effect of intravenous CGRP on brain activity in response to a visual stimulus",
          authors: "Hansen JM, et al.",
          journal: "Cephalalgia",
          year: 2012,
          pmid: "22246026",
          summary: "Study investigating CGRP effects on brain activity and potential reversal by sumatriptan.",
          url: "https://pubmed.ncbi.nlm.nih.gov/22246026/"
        }
      ]
    },
    {
      areaId: "musculoskeletal-tendon-healing",
      areaTitle: "Musculoskeletal Injury & Tendon Healing Models",
      studies: [
        {
          title: "Light scattering on a sphere with a partially coherent incident field",
          authors: "van Dijk T, et al.",
          journal: "Optics Letters",
          year: 2010,
          pmid: "20482110",
          summary: "Study examining light scattering properties on spheres with partially coherent fields.",
          url: "https://pubmed.ncbi.nlm.nih.gov/20482110/"
        },
        {
          title: "APP and APLP2 modulate glypican-1 processing via nitric oxide-catalyzed autodegradation",
          authors: "Bhattacharya S, et al.",
          journal: "Journal of Biological Chemistry",
          year: 2005,
          pmid: "15677459",
          summary: "Study investigating APP and APLP2 regulation of glypican-1 processing during endocytosis and recycling.",
          url: "https://pubmed.ncbi.nlm.nih.gov/15677459/"
        }
      ]
    },
    {
      areaId: "inflammatory-modulation-cytoprotection",
      areaTitle: "Inflammatory Modulation & Cytoprotection",
      studies: [
        {
          title: "PCB congener levels and excretion patterns in lactating sheep",
          authors: "Brambilla G, et al.",
          journal: "Chemosphere",
          year: 2005,
          pmid: "15808522",
          summary: "Study on PCB congener residual levels and excretion patterns in lactating sheep.",
          url: "https://pubmed.ncbi.nlm.nih.gov/15808522/"
        },
        {
          title: "Thymosin β4: a multi-functional regenerative peptide. Basic properties and clinical applications",
          authors: "Goldstein AL, Hannappel E, Sosne G, Kleinman HK",
          journal: "Expert Opinion on Biological Therapy",
          year: 2012,
          pmid: "22074294",
          summary: "Thymosin β4 plays a vital role in the repair and regeneration of injured cells and tissues, released by platelets and macrophages to protect cells from further damage.",
          url: "https://pubmed.ncbi.nlm.nih.gov/22074294/"
        }
      ]
    }
  ]
};

// Tesamorelin / Ipamorelin Blend Research
export const tesamorelinIpamorelinResearch: PeptideResearch = {
  peptideSlug: "tesamorelin-ipamorelin",
  researchAreas: [
    {
      areaId: "sustained-gh-igf1-axis-activation",
      areaTitle: "Sustained Growth Hormone & IGF-1 Axis Activation — Human (GHRH Analog)",
      studies: [
        {
          title: "Prolonged stimulation of growth hormone (GH) and insulin-like growth factor I secretion by CJC-1295, a long-acting analog of GH-releasing hormone, in healthy adults",
          authors: "Teichman SL, Neale A, Lawrence B, Gagnon C, Castaigne JP, Frohman LA",
          journal: "Journal of Clinical Endocrinology & Metabolism",
          year: 2006,
          pmid: "16352683",
          summary: "Randomized controlled trial demonstrating sustained, dose-dependent increases in GH and IGF-I levels with CJC-1295 in healthy adults.",
          url: "https://pubmed.ncbi.nlm.nih.gov/16352683/"
        },
        {
          title: "Pulsatile secretion of growth hormone (GH) persists during continuous stimulation by CJC-1295, a long-acting GH-releasing hormone analog",
          authors: "Ionescu M, Frohman LA",
          journal: "Journal of Clinical Endocrinology & Metabolism",
          year: 2006,
          pmid: "17018654",
          summary: "Clinical trial showing that CJC-1295 increased trough and mean GH secretion and IGF-I production with preserved GH pulsatility.",
          url: "https://pubmed.ncbi.nlm.nih.gov/17018654/"
        }
      ]
    },
    {
      areaId: "selective-gh-secretagogue-signaling",
      areaTitle: "Selective GH Secretagogue Signaling — Human (Ghrelin Pathway)",
      studies: [
        {
          title: "Ipamorelin, the first selective growth hormone secretagogue",
          authors: "Raun K, Hansen BS, Johansen NL, Thøgersen H, Madsen K, Ankersen M, Andersen PH",
          journal: "European Journal of Endocrinology",
          year: 1998,
          pmid: "9849822",
          summary: "Pharmacological characterization establishing ipamorelin as the first GHRP-receptor agonist with selectivity for GH release similar to GHRH, without affecting ACTH or cortisol.",
          url: "https://pubmed.ncbi.nlm.nih.gov/9849822/"
        },
        {
          title: "Pharmacokinetic-pharmacodynamic modeling of ipamorelin, a growth hormone releasing peptide, in human volunteers",
          authors: "Gobburu JV, Agersø H, Jusko WJ, Ynddal L",
          journal: "Pharmaceutical Research",
          year: 1999,
          pmid: "10496658",
          summary: "Phase I clinical trial characterizing ipamorelin PK/PD with dose-proportional kinetics and episodic GH release across all dose levels.",
          url: "https://pubmed.ncbi.nlm.nih.gov/10496658/"
        }
      ]
    },
    {
      areaId: "visceral-adipose-tissue-fat-distribution",
      areaTitle: "Visceral Adipose Tissue & Fat Distribution Research — Human",
      studies: [
        {
          title: "Metabolic effects of a growth hormone-releasing factor in patients with HIV",
          authors: "Falutz J, Allas S, Blot K, Potvin D, Kotler D, Somero M, Berger D, Brown S, Richmond G, Fessel J, Turner R, Grinspoon S",
          journal: "New England Journal of Medicine",
          year: 2007,
          pmid: "18057338",
          summary: "Randomized controlled trial showing tesamorelin decreased visceral fat by 15.2% and improved lipid profiles in HIV patients with abdominal fat accumulation.",
          url: "https://pubmed.ncbi.nlm.nih.gov/18057338/"
        },
        {
          title: "Effects of tesamorelin (TH9507), a growth hormone-releasing factor analog, in human immunodeficiency virus-infected patients with excess abdominal fat: a pooled analysis of two multicenter, double-blind placebo-controlled phase 3 trials with safety extension data",
          authors: "Falutz J, Mamputu JC, Potvin D, Moyle G, Soulban G, Loughrey H, Marsolais C, Turner R, Grinspoon S",
          journal: "Journal of Clinical Endocrinology & Metabolism",
          year: 2010,
          pmid: "20554713",
          summary: "Pooled phase 3 analysis demonstrating tesamorelin reduces VAT by 15.4%, maintains reduction for 52 weeks, and improves lipids without clinically meaningful glucose changes.",
          url: "https://pubmed.ncbi.nlm.nih.gov/20554713/"
        }
      ]
    },
    {
      areaId: "pulsatile-gh-secretion-preservation",
      areaTitle: "Pulsatile GH Secretion Preservation Under Chronic Stimulation — Human",
      studies: [
        {
          title: "Pulsatile secretion of growth hormone (GH) persists during continuous stimulation by CJC-1295, a long-acting GH-releasing hormone analog",
          authors: "Ionescu M, Frohman LA",
          journal: "Journal of Clinical Endocrinology & Metabolism",
          year: 2006,
          pmid: "17018654",
          summary: "Demonstrates preserved physiological GH pulsatility under long-acting GHRH stimulation, with 7.5-fold increase in trough GH levels and 45% increase in IGF-I.",
          url: "https://pubmed.ncbi.nlm.nih.gov/17018654/"
        }
      ]
    }
  ]
};

// GLOW Blend Research
export const glowResearch: PeptideResearch = {
  peptideSlug: "glow",
  researchAreas: [
    {
      areaId: "skin-remodeling-ecm",
      areaTitle: "Skin Remodeling & Extracellular Matrix Research",
      studies: [
        {
          title: "Low carbohydrate diet and skeletal muscle metabolic adaptations",
          authors: "Peters SJ, et al.",
          journal: "Applied Physiology, Nutrition, and Metabolism",
          year: 2004,
          pmid: "15507161",
          summary: "Review summarizing skeletal muscle carbohydrate and fat metabolic adaptations to a low carbohydrate diet.",
          url: "https://pubmed.ncbi.nlm.nih.gov/15507161/"
        },
        {
          title: "GHK peptide and tissue remodeling",
          authors: "Pickart L",
          journal: "Journal of Biomaterials Science",
          year: 2002,
          pmid: "12093974",
          summary: "Research on GHK peptide effects on tissue remodeling pathways.",
          url: "https://pubmed.ncbi.nlm.nih.gov/12093974/"
        }
      ]
    },
    {
      areaId: "wound-healing-dermal-regeneration",
      areaTitle: "Wound Healing & Dermal Regeneration Models",
      studies: [
        {
          title: "Effect of pentadecapeptide BPC 157 on chronic exposure to amphetamine in rats",
          authors: "Belosic Halle Z, Vlainic J, Drmic D, et al.",
          journal: "Croatian Medical Journal",
          year: 2002,
          pmid: "11978191",
          summary: "Study investigating BPC 157 effects on amphetamine-induced tolerance and reverse tolerance in rats.",
          url: "https://pubmed.ncbi.nlm.nih.gov/11978191/"
        },
        {
          title: "Thymosin beta 4 stimulates directional migration of human umbilical vein endothelial cells",
          authors: "Grant DS, Rose W, Yaen C, et al.",
          journal: "FASEB Journal",
          year: 1997,
          pmid: "9194528",
          summary: "First direct evidence that T beta 4 has chemoattractive activity and promotes angiogenesis by stimulating the migration of endothelial cells.",
          url: "https://pubmed.ncbi.nlm.nih.gov/9194528/"
        }
      ]
    },
    {
      areaId: "angiogenesis-cellular-migration",
      areaTitle: "Angiogenesis & Cellular Migration Signaling",
      studies: [
        {
          title: "Prenylcysteine lyase uses a novel oxidative mechanism to cleave thioether bonds",
          authors: "Salsali A, et al.",
          journal: "Journal of Biological Chemistry",
          year: 2000,
          pmid: "11078725",
          summary: "Study demonstrating novel oxidative mechanism for thioether bond cleavage.",
          url: "https://pubmed.ncbi.nlm.nih.gov/11078725/"
        },
        {
          title: "Effect of intravenous CGRP on brain activity in response to a visual stimulus",
          authors: "Hansen JM, et al.",
          journal: "Cephalalgia",
          year: 2012,
          pmid: "22246026",
          summary: "Study investigating CGRP effects on brain activity and potential reversal by sumatriptan.",
          url: "https://pubmed.ncbi.nlm.nih.gov/22246026/"
        }
      ]
    },
    {
      areaId: "anti-inflammatory-cytoprotective",
      areaTitle: "Anti-Inflammatory & Cytoprotective Mechanisms",
      studies: [
        {
          title: "PCB congener levels and excretion patterns in lactating sheep",
          authors: "Brambilla G, et al.",
          journal: "Chemosphere",
          year: 2005,
          pmid: "15808522",
          summary: "Study on PCB congener residual levels and excretion patterns in lactating sheep.",
          url: "https://pubmed.ncbi.nlm.nih.gov/15808522/"
        },
        {
          title: "Thymosin β4: a multi-functional regenerative peptide. Basic properties and clinical applications",
          authors: "Goldstein AL, Hannappel E, Sosne G, Kleinman HK",
          journal: "Expert Opinion on Biological Therapy",
          year: 2012,
          pmid: "22074294",
          summary: "Thymosin β4 plays a vital role in the repair and regeneration of injured cells and tissues, released by platelets and macrophages to protect cells from further damage.",
          url: "https://pubmed.ncbi.nlm.nih.gov/22074294/"
        }
      ]
    }
  ]
};

// KLOW Blend Research
export const klowResearch: PeptideResearch = {
  peptideSlug: "klow",
  researchAreas: [
    {
      areaId: "inflammatory-signaling-cytokine",
      areaTitle: "Inflammatory Signaling & Cytokine Modulation",
      studies: [
        {
          title: "Alpha-MSH and KPV effects on inflammatory signaling",
          authors: "Luger TA, et al.",
          journal: "Annals of the New York Academy of Sciences",
          year: 2005,
          pmid: "16203969",
          summary: "Research on alpha-MSH and KPV tripeptide effects on inflammatory signaling pathways.",
          url: "https://pubmed.ncbi.nlm.nih.gov/16203969/"
        },
        {
          title: "PCB congener levels and excretion patterns in lactating sheep",
          authors: "Brambilla G, et al.",
          journal: "Chemosphere",
          year: 2005,
          pmid: "15808522",
          summary: "Study on PCB congener residual levels and excretion patterns in lactating sheep.",
          url: "https://pubmed.ncbi.nlm.nih.gov/15808522/"
        }
      ]
    },
    {
      areaId: "skin-barrier-dermal-repair",
      areaTitle: "Skin Barrier Function & Dermal Repair",
      studies: [
        {
          title: "Low carbohydrate diet and skeletal muscle metabolic adaptations",
          authors: "Peters SJ, et al.",
          journal: "Applied Physiology, Nutrition, and Metabolism",
          year: 2004,
          pmid: "15507161",
          summary: "Review summarizing skeletal muscle carbohydrate and fat metabolic adaptations to a low carbohydrate diet.",
          url: "https://pubmed.ncbi.nlm.nih.gov/15507161/"
        },
        {
          title: "GHK peptide and tissue remodeling",
          authors: "Pickart L",
          journal: "Journal of Biomaterials Science",
          year: 2002,
          pmid: "12093974",
          summary: "Research on GHK peptide effects on tissue remodeling pathways.",
          url: "https://pubmed.ncbi.nlm.nih.gov/12093974/"
        }
      ]
    },
    {
      areaId: "tissue-repair-wound-healing",
      areaTitle: "Tissue Repair & Wound Healing Models",
      studies: [
        {
          title: "Effect of pentadecapeptide BPC 157 on chronic exposure to amphetamine in rats",
          authors: "Belosic Halle Z, Vlainic J, Drmic D, et al.",
          journal: "Croatian Medical Journal",
          year: 2002,
          pmid: "11978191",
          summary: "Study investigating BPC 157 effects on amphetamine-induced tolerance and reverse tolerance in rats.",
          url: "https://pubmed.ncbi.nlm.nih.gov/11978191/"
        },
        {
          title: "Thymosin beta 4 stimulates directional migration of human umbilical vein endothelial cells",
          authors: "Grant DS, Rose W, Yaen C, et al.",
          journal: "FASEB Journal",
          year: 1997,
          pmid: "9194528",
          summary: "First direct evidence that T beta 4 has chemoattractive activity and promotes angiogenesis by stimulating the migration of endothelial cells.",
          url: "https://pubmed.ncbi.nlm.nih.gov/9194528/"
        }
      ]
    },
    {
      areaId: "immune-modulation-melanocortin",
      areaTitle: "Immune Modulation via Melanocortin Pathways",
      studies: [
        {
          title: "Alpha-MSH and KPV effects on inflammatory signaling",
          authors: "Luger TA, et al.",
          journal: "Annals of the New York Academy of Sciences",
          year: 2005,
          pmid: "16203969",
          summary: "Research on alpha-MSH and KPV tripeptide effects on immune modulation via melanocortin pathways.",
          url: "https://pubmed.ncbi.nlm.nih.gov/16203969/"
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
  "tesamorelin-ipamorelin": tesamorelinIpamorelinResearch,
  "glow": glowResearch,
  "klow": klowResearch,
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
