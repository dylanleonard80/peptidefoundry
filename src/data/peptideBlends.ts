import { LucideIcon, Activity, Brain, Heart, Shield, Sparkles, Zap, Clock, Users, Star, Droplet, Bone, Apple } from "lucide-react";

export interface BlendBenefit {
  icon: LucideIcon;
  text: string;
}

export interface PeptideBlend {
  id: string;
  name: string;
  tagline: string;
  peptides: string;
  problem: string;
  description: string;
  benefits: BlendBenefit[];
  whoItsFor: string[];
  timeline: string;
  clinicalStudies: number;
  category: "recovery" | "performance" | "beauty" | "brain" | "immunity" | "metabolism";
  slug?: string;
  featured?: boolean;
}

export const peptideBlends: PeptideBlend[] = [
  {
    id: "hair-growth",
    name: "Revive Hair Growth Stack",
    tagline: "Hair Restoration & Follicle Regeneration",
    peptides: "GHK-CU + TB-500 + Thymosin Beta-4",
    problem: "Struggling with hair thinning, receding hairline, or weak hair follicles?",
    description: "A scientifically-formulated combination that targets hair loss at the follicular level, promoting density, strength, and regrowth.",
    benefits: [
      { icon: Sparkles, text: "Increases hair density by up to 27%" },
      { icon: Activity, text: "Strengthens follicle anchoring by 67%" },
      { icon: Heart, text: "Improves scalp circulation and reduces inflammation" },
      { icon: Users, text: "Effective for both male and female pattern hair loss" }
    ],
    whoItsFor: [
      "Men and women experiencing hair thinning",
      "Post-partum hair loss recovery",
      "Aging-related hair changes",
      "Alopecia patients"
    ],
    timeline: "Visible improvement in 8-12 weeks",
    clinicalStudies: 12,
    category: "beauty",
    featured: true
  },
  {
    id: "performance",
    name: "Wolverine Stack",
    tagline: "The Gold Standard Recovery Stack",
    peptides: "BPC-157 + TB-500",
    problem: "Dealing with chronic injuries, overtraining, or slow recovery times?",
    description: "The most researched peptide combination for athletes. Accelerates healing, reduces inflammation, and optimizes athletic performance.",
    benefits: [
      { icon: Zap, text: "Accelerates tendon/ligament healing by 40-60%" },
      { icon: Shield, text: "Reduces systemic inflammation" },
      { icon: Activity, text: "Improves training capacity and reduces downtime" },
      { icon: Heart, text: "Supports cardiovascular and joint health" }
    ],
    whoItsFor: [
      "Athletes with injuries or overtraining",
      "Active individuals seeking faster recovery",
      "Post-surgical rehabilitation",
      "Chronic pain sufferers"
    ],
    timeline: "Initial relief in 1-2 weeks, full acceleration over 4-8 weeks",
    clinicalStudies: 18,
    category: "recovery",
    slug: "bpc-157-tb-500"
  },
  {
    id: "glow",
    name: "Skin Rejuvenation & Anti-Aging Stack",
    tagline: "Total Regeneration & Beauty Stack",
    peptides: "BPC-157 + TB-500 + GHK-CU",
    problem: "Looking for comprehensive tissue repair, skin rejuvenation, and anti-aging benefits?",
    description: "A complete regeneration formula combining powerful healing peptides with skin-rejuvenating copper peptides for total body restoration.",
    benefits: [
      { icon: Sparkles, text: "Complete tissue and skin regeneration" },
      { icon: Heart, text: "Accelerates wound healing and reduces scarring" },
      { icon: Shield, text: "Powerful anti-inflammatory and antioxidant effects" },
      { icon: Droplet, text: "Increases collagen production by 70%" }
    ],
    whoItsFor: [
      "Anti-aging and skin rejuvenation",
      "Post-injury or post-surgical recovery",
      "Chronic inflammation management",
      "Comprehensive wellness optimization"
    ],
    timeline: "Skin changes in 6-8 weeks, healing benefits within 2-4 weeks",
    clinicalStudies: 22,
    category: "beauty",
    slug: "glow",
    featured: true
  },
  {
    id: "klow",
    name: "Ultimate Restoration Stack",
    tagline: "Complete Wellness & Immunity Stack",
    peptides: "BPC-157 + TB-500 + KPV + GHK-CU",
    problem: "Need comprehensive support for gut health, inflammation, and immune function?",
    description: "The ultimate wellness formula combining healing, anti-inflammatory, and immune-supporting peptides for total body optimization.",
    benefits: [
      { icon: Shield, text: "Comprehensive immune system support" },
      { icon: Apple, text: "Heals gut lining and reduces inflammation" },
      { icon: Activity, text: "Accelerates recovery and tissue repair" },
      { icon: Heart, text: "Supports skin health and regeneration" }
    ],
    whoItsFor: [
      "Autoimmune conditions and gut issues",
      "Chronic inflammation management",
      "Athletes needing complete recovery",
      "Longevity and wellness optimization"
    ],
    timeline: "Gut improvements in 3-6 weeks, healing benefits within 2-4 weeks",
    clinicalStudies: 25,
    category: "immunity",
    slug: "klow",
    featured: true
  },
  {
    id: "cognitive",
    name: "Mental Clarity & Focus Stack",
    tagline: "Cognitive Performance Enhancement",
    peptides: "Semax + Selank",
    problem: "Experiencing brain fog, poor focus, memory issues, or mental fatigue?",
    description: "Powerful nootropic combination that enhances cognitive function, reduces anxiety, and supports neuroprotection.",
    benefits: [
      { icon: Brain, text: "Enhanced memory and learning capacity" },
      { icon: Zap, text: "Improved focus and mental clarity" },
      { icon: Shield, text: "Reduces anxiety and stress without sedation" },
      { icon: Activity, text: "Neuroprotective and anti-inflammatory" }
    ],
    whoItsFor: [
      "Professionals and entrepreneurs",
      "Students and academics",
      "Aging individuals with cognitive decline",
      "High-stress environments"
    ],
    timeline: "Effects felt within 1-2 weeks",
    clinicalStudies: 15,
    category: "brain"
  },
  {
    id: "gut-health",
    name: "Gut Repair & Immune Stack",
    tagline: "Digestive System Restoration",
    peptides: "BPC-157 + KPV + Thymosin Beta-4",
    problem: "Dealing with IBS, leaky gut, inflammatory bowel conditions, or food sensitivities?",
    description: "Comprehensive gut healing formula that repairs intestinal lining, reduces inflammation, and strengthens the gut-immune connection.",
    benefits: [
      { icon: Apple, text: "Heals gut lining and reduces permeability" },
      { icon: Shield, text: "Powerful anti-inflammatory for digestive tract" },
      { icon: Activity, text: "Supports healthy microbiome balance" },
      { icon: Heart, text: "Strengthens gut-immune system connection" }
    ],
    whoItsFor: [
      "IBS and IBD patients",
      "Leaky gut syndrome",
      "Food sensitivity issues",
      "Autoimmune conditions with gut involvement"
    ],
    timeline: "Improvement in 3-6 weeks",
    clinicalStudies: 14,
    category: "immunity"
  },
  {
    id: "fat-loss",
    name: "Fat Loss Stack",
    tagline: "Metabolic Optimization Stack",
    peptides: "AOD-9604 + CJC-1295",
    problem: "Struggling with stubborn fat, slow metabolism, or weight loss plateaus despite diet and exercise?",
    description: "Advanced metabolic formula that targets visceral fat, preserves muscle mass, and optimizes metabolic function.",
    benefits: [
      { icon: Zap, text: "Targets visceral and subcutaneous fat" },
      { icon: Activity, text: "Preserves lean muscle mass during fat loss" },
      { icon: Heart, text: "Improves metabolic rate and insulin sensitivity" },
      { icon: Sparkles, text: "Enhances natural growth hormone production" }
    ],
    whoItsFor: [
      "Weight loss plateau breakthrough",
      "Body recomposition goals",
      "Metabolic syndrome management",
      "Stubborn fat targeting"
    ],
    timeline: "Changes visible in 4-6 weeks",
    clinicalStudies: 11,
    category: "metabolism"
  },
  {
    id: "anti-aging",
    name: "Anti-Aging Formula",
    tagline: "Cellular Rejuvenation & Longevity Stack",
    peptides: "GHK-CU + Epithalon",
    problem: "Concerned about aging skin, cellular decline, reduced vitality, or age-related inflammation?",
    description: "Comprehensive anti-aging formula that activates longevity pathways, enhances cellular repair, and rejuvenates skin at the molecular level.",
    benefits: [
      { icon: Sparkles, text: "Activates telomerase for cellular longevity" },
      { icon: Droplet, text: "Increases collagen production by 70%" },
      { icon: Heart, text: "Reduces wrinkles and improves skin elasticity" },
      { icon: Shield, text: "Supports DNA repair mechanisms" }
    ],
    whoItsFor: [
      "Anti-aging protocols and longevity",
      "Skin rejuvenation and wrinkle reduction",
      "Cellular health optimization",
      "Age-related decline prevention"
    ],
    timeline: "Visible skin changes in 6-8 weeks",
    clinicalStudies: 19,
    category: "beauty"
  },
  {
    id: "sleep-recovery",
    name: "Sleep & Recovery Stack",
    tagline: "Deep Sleep & Growth Hormone Stack",
    peptides: "Delta Sleep-Inducing Peptide (DSIP) + CJC-1295",
    problem: "Struggling with poor sleep quality, inadequate recovery, low growth hormone, or chronic fatigue?",
    description: "Optimize sleep architecture and natural growth hormone production for maximum overnight recovery and restoration.",
    benefits: [
      { icon: Clock, text: "Deepens REM and slow-wave sleep" },
      { icon: Zap, text: "Optimizes natural GH production during sleep" },
      { icon: Activity, text: "Accelerates overnight tissue repair" },
      { icon: Shield, text: "Reduces cortisol and stress hormones" }
    ],
    whoItsFor: [
      "Insomnia and sleep disorders",
      "Athletes needing recovery optimization",
      "Shift workers with disrupted sleep",
      "High-stress professionals"
    ],
    timeline: "Sleep improvements within 3-7 days",
    clinicalStudies: 13,
    category: "recovery"
  },
  {
    id: "libido-mood",
    name: "Libido & Mood Stack",
    tagline: "Sexual Wellness & Hormonal Balance Stack",
    peptides: "PT-141 + Kisspeptin-10",
    problem: "Experiencing low libido, sexual dysfunction, hormonal imbalance, or low motivation?",
    description: "Comprehensive sexual wellness formula that activates central arousal pathways and supports natural hormonal balance.",
    benefits: [
      { icon: Heart, text: "Activates central arousal pathways" },
      { icon: Activity, text: "Supports natural hormone production" },
      { icon: Sparkles, text: "Improves mood and motivation" },
      { icon: Users, text: "Effective for both men and women" }
    ],
    whoItsFor: [
      "Low libido and sexual dysfunction",
      "Hormonal imbalances",
      "Relationship intimacy enhancement",
      "Age-related sexual decline"
    ],
    timeline: "Acute effects within 30-60 minutes, ongoing benefits with regular use",
    clinicalStudies: 10,
    category: "performance"
  }
];

export const getFeaturedBlends = () => peptideBlends.filter(blend => blend.featured);

export const getBlendsByCategory = (category: string) => 
  peptideBlends.filter(blend => blend.category === category);
