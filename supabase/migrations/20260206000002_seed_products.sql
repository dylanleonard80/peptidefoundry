-- ============================================================================
-- Peptide Foundry: Seed Product Data
-- Inserts all 28 products, 33+ variants, 7 categories, and blend components
-- Data sourced from priceData.ts, peptides.ts, peptidePageData.ts, blendPageData.ts
-- ============================================================================

BEGIN;

-- ============================================================================
-- CATEGORIES (7)
-- ============================================================================

INSERT INTO public.categories (id, name, slug, description, sort_order) VALUES
  ('c0000000-0000-0000-0000-000000000001', 'Best Sellers',                 'best-sellers',          'Our most popular research peptides',                                                          1),
  ('c0000000-0000-0000-0000-000000000002', 'Tissue Repair Research',       'tissue-repair',         'Peptides studied for tissue regeneration and inflammatory pathway modulation.',                2),
  ('c0000000-0000-0000-0000-000000000003', 'Muscle & Performance Research','muscle-performance',    'Peptides studied for growth factor signaling and myogenic pathways.',                          3),
  ('c0000000-0000-0000-0000-000000000004', 'Metabolic Research',           'metabolic',             'Peptides investigated for metabolic signaling and energy homeostasis.',                        4),
  ('c0000000-0000-0000-0000-000000000005', 'Cellular Health Research',     'cellular-health',       'Peptides studied for cellular senescence and neuroprotective mechanisms.',                     5),
  ('c0000000-0000-0000-0000-000000000006', 'Cognition & Mood Research',    'cognition-mood',        'Peptides investigated for cognitive function and mood regulation pathways.',                   6),
  ('c0000000-0000-0000-0000-000000000007', 'Research Supplies',            'research-supplies',     'Essential supplies for peptide research.',                                                     7);

-- ============================================================================
-- PRODUCTS (28 total: 18 individual peptides, 9 blends, 1 supply)
-- ============================================================================

-- ---------- Individual Peptides (18) ----------

INSERT INTO public.products (id, name, slug, type, status, subtitle, description, additional_description, cas_number, molecular_formula, molar_mass, image_url, in_stock, sort_order, rich_content) VALUES

-- 1. AOD-9604
('a0000000-0000-0000-0000-000000000001', 'AOD-9604', 'aod-9604', 'peptide', 'active',
 'A peptide studied in laboratory settings for fat metabolism, lipolysis, and body composition',
 'AOD-9604 is a modified fragment of the C-terminus of human growth hormone (HGH), specifically amino acids 176-191. This synthetic peptide retains the fat-burning properties of HGH while eliminating its effects on insulin sensitivity and blood glucose.',
 NULL, '221231-10-3', 'C₇₈H₁₂₃N₂₃O₂₃S₂', '1815.08 g/mol', '/products/aod-9604.webp', true, 10,
 '{"benefits":[{"iconName":"Flame","iconBgClass":"bg-orange-100 dark:bg-orange-900/30","title":"Enhanced Fat Loss","description":"Stimulates lipolysis (fat breakdown) specifically in adipose tissue without affecting lean muscle mass or blood glucose levels.","link":"https://doi.org/10.1210/jcem.86.7.7645"},{"iconName":"TrendingDown","iconBgClass":"bg-green-100 dark:bg-green-900/30","title":"Metabolic Optimization","description":"Increases metabolic rate and energy expenditure, promoting efficient fat oxidation and improved body composition.","link":"https://doi.org/10.1016/j.metabol.2008.11.017"},{"iconName":"Droplets","iconBgClass":"bg-blue-100 dark:bg-blue-900/30","title":"Lipogenesis Inhibition","description":"Prevents new fat formation by inhibiting lipogenic pathways, reducing triglyceride accumulation in adipocytes.","link":"https://doi.org/10.1111/j.1365-2826.2009.01848.x"},{"iconName":"Activity","iconBgClass":"bg-purple-100 dark:bg-purple-900/30","title":"No Insulin Disruption","description":"Promotes fat loss without affecting insulin sensitivity or glucose metabolism, unlike full-length growth hormone.","link":"https://doi.org/10.1210/endo.142.4.8082"},{"iconName":"Zap","iconBgClass":"bg-yellow-100 dark:bg-yellow-900/30","title":"Energy Enhancement","description":"Increases cellular energy production through enhanced mitochondrial fatty acid oxidation and ATP synthesis.","link":"https://doi.org/10.1038/sj.ijo.0803408"},{"iconName":"Heart","iconBgClass":"bg-red-100 dark:bg-red-900/30","title":"Cardiovascular Support","description":"Reduces visceral adiposity and improves lipid profiles, supporting cardiovascular health and metabolic function.","link":"https://doi.org/10.1007/s11695-011-0560-5"}],"references":["Heffernan MA, et al. The effects of human GH and its lipolytic fragment (AOD9604) on lipid metabolism following chronic treatment in obese mice and β3-AR knock-out mice. Endocrinology. 2001;142(12):5182-5189.","Ng FM, et al. Growth hormone treatment of hypophysectomized rats increases the secretion of insulin-like growth factor-I. Endocrinology. 2000;141(8):3098-3103.","Munro S, et al. AOD9604, a synthetic lipolytic peptide with high receptor binding affinity and in vivo efficacy. International Journal of Obesity. 2006;30(8):1217-1224."],"aboutParagraphs":["AOD-9604 got its start in the late 1990s at Monash University in Australia. Researchers there had a simple question: could they get the fat-burning benefits of growth hormone without the side effects?","The team discovered something interesting. They found that just a small piece of the growth hormone molecule—specifically amino acids 176 to 191—seemed to do exactly what they wanted.","Since then, AOD-9604 has been through multiple research studies and even some clinical trials. This product is intended for research use only."],"howItWorksIntro":"AOD-9604 provides targeted fat loss by activating the same fat-burning pathways as growth hormone, but without affecting blood sugar, insulin sensitivity, or causing tissue growth.","howItWorksAccordions":[{"value":"receptor","iconName":"Target","iconBgClass":"bg-blue-100 dark:bg-blue-900/30","title":"Beta-3 Adrenergic Receptor Activation","content":"AOD-9604 selectively binds to and activates beta-3 adrenergic receptors located predominantly in adipose tissue."},{"value":"lipolysis","iconName":"Flame","iconBgClass":"bg-purple-100 dark:bg-purple-900/30","title":"Enhanced Lipolytic Activity","content":"The peptide significantly increases the rate of lipolysis by upregulating hormone-sensitive lipase and adipose triglyceride lipase activity."},{"value":"lipogenesis","iconName":"TrendingDown","iconBgClass":"bg-green-100 dark:bg-green-900/30","title":"Lipogenesis Inhibition","content":"AOD-9604 inhibits de novo lipogenesis by downregulating key lipogenic enzymes including fatty acid synthase and acetyl-CoA carboxylase."}],"technicalPathways":["Beta-3 adrenergic receptor binding → Gs protein activation → adenylyl cyclase stimulation → increased cAMP levels","Elevated cAMP → protein kinase A (PKA) activation → phosphorylation of hormone-sensitive lipase (HSL)","Activated HSL → triglyceride hydrolysis → free fatty acid and glycerol release","Free fatty acids → mitochondrial transport via CPT1 → beta-oxidation → acetyl-CoA production"]}'::jsonb),

-- 2. BPC-157
('a0000000-0000-0000-0000-000000000002', 'BPC-157', 'bpc-157', 'peptide', 'active',
 'A peptide studied in laboratory settings for tissue regeneration and healing mechanisms',
 'BPC-157 is a short chain of amino acids, a peptide naturally found in gastric juice. It''s often called a ''body protection compound'' due to its wide-ranging potential benefits, particularly in tissue repair and inflammation modulation.',
 NULL, '137525-51-0', 'C₆₂H₉₈N₁₆O₂₂', '1419.55 g/mol', '/products/bpc-157.webp', true, 20,
 '{}'::jsonb),

-- 3. IGF-1 LR3
('a0000000-0000-0000-0000-000000000003', 'IGF-1 LR3', 'igf-1-lr3', 'peptide', 'active',
 'A peptide studied in laboratory settings for cellular growth, proliferation, and tissue development',
 'IGF-1 LR3 (Insulin-like Growth Factor-1 Long R3) is a modified version of human IGF-1 with an extended half-life.',
 NULL, '946870-92-4', 'C₄₀₀H₆₂₅N₁₁₁O₁₁₅S₉', '9111.3 g/mol', '/products/igf-1-lr3.webp', true, 30,
 '{}'::jsonb),

-- 4. Tesamorelin
('a0000000-0000-0000-0000-000000000004', 'Tesamorelin', 'tesamorelin', 'peptide', 'active',
 'A peptide studied in laboratory settings for growth hormone releasing activity and body composition',
 'Tesamorelin is a synthetic peptide analog of growth hormone-releasing hormone (GHRH), consisting of 44 amino acids.',
 NULL, '218949-48-5', 'C₂₂₁H₃₆₆N₇₂O₆₇S₁', '5135.9 g/mol', '/products/tesamorelin.webp', true, 40,
 '{}'::jsonb),

-- 5. Sermorelin
('a0000000-0000-0000-0000-000000000005', 'Sermorelin', 'sermorelin', 'peptide', 'active',
 'A peptide studied in laboratory settings for growth hormone releasing activity and pituitary function',
 'Sermorelin is a synthetic peptide corresponding to the first 29 amino acids of human growth hormone-releasing hormone (GHRH 1-29).',
 NULL, '86168-78-7', 'C₁₄₉H₂₄₆N₄₄O₄₂S', '3357.9 g/mol', '/products/sermorelin.webp', true, 50,
 '{}'::jsonb),

-- 6. Cagrilintide
('a0000000-0000-0000-0000-000000000006', 'Cagrilintide', 'cagrilintide', 'peptide', 'active',
 'A peptide studied in laboratory settings for amylin receptor agonism and metabolic regulation',
 'Cagrilintide is a long-acting acylated amylin analog designed for once-weekly administration.',
 NULL, '2170752-57-1', 'C₂₀₆H₃₀₆N₅₆O₆₄S₂', '4693.0 g/mol', '/products/cagrilintide.webp', true, 60,
 '{}'::jsonb),

-- 7. GLP-3RT (Retatrutide)
('a0000000-0000-0000-0000-000000000007', 'GLP-3RT', 'retatrutide', 'peptide', 'active',
 'A peptide studied in laboratory settings for triple incretin receptor agonism and metabolic regulation',
 'GLP-3RT (LY3437943) is a novel triple agonist peptide that activates GLP-1, GIP, and glucagon receptors simultaneously.',
 NULL, '2381089-83-2', 'C₂₂₅H₃₄₈N₆₀O₆₈S', '5104.6 g/mol', '/products/glp-3rt-12mg.webp', true, 70,
 '{}'::jsonb),

-- 8. MOTS-C
('a0000000-0000-0000-0000-000000000008', 'MOTS-C', 'mots-c', 'peptide', 'active',
 'A peptide studied in laboratory settings for mitochondrial function and metabolic homeostasis',
 'MOTS-C (Mitochondrial Open Reading Frame of the 12S rRNA-C) is a 16 amino acid peptide encoded within the mitochondrial genome.',
 NULL, '1627580-64-6', 'C₁₀₁H₁₅₂N₂₈O₂₃S₂', '2174.6 g/mol', '/products/mots-c.webp', true, 80,
 '{}'::jsonb),

-- 9. Selank
('a0000000-0000-0000-0000-000000000009', 'Selank', 'selank', 'peptide', 'active',
 'A peptide studied in laboratory settings for anxiolytic activity and cognitive function',
 'Selank is a synthetic heptapeptide derived from the endogenous tetrapeptide tuftsin with an additional Pro-Gly-Pro sequence.',
 NULL, '129954-34-3', 'C₃₃H₅₇N₁₁O₉', '751.9 g/mol', '/products/selank.webp', true, 90,
 '{}'::jsonb),

-- 10. Semax
('a0000000-0000-0000-0000-000000000010', 'Semax', 'semax', 'peptide', 'active',
 'A peptide studied in laboratory settings for neuroprotection and cognitive enhancement',
 'Semax is a synthetic heptapeptide derived from the ACTH (4-10) fragment with an added Pro-Gly-Pro C-terminal sequence.',
 NULL, '80714-61-0', 'C₃₉H₆₃N₁₁O₁₀', '846.0 g/mol', '/products/semax.webp', true, 100,
 '{}'::jsonb),

-- 11. NAD+ (Buffered)
('a0000000-0000-0000-0000-000000000011', 'NAD+ (Buffered)', 'nad-buffered', 'peptide', 'active',
 'A coenzyme studied in laboratory settings for cellular energy metabolism and aging research',
 'NAD+ (Nicotinamide Adenine Dinucleotide) is a critical coenzyme found in every living cell. This buffered formulation maintains stability for research applications.',
 NULL, '53-84-9', 'C₂₁H₂₇N₇O₁₄P₂', '663.4 g/mol', '/products/nad-buffered.webp', true, 110,
 '{}'::jsonb),

-- 12. Ipamorelin
('a0000000-0000-0000-0000-000000000012', 'Ipamorelin', 'ipamorelin', 'peptide', 'active',
 'A peptide studied in laboratory settings for selective growth hormone secretion',
 'Ipamorelin is the first truly selective growth hormone secretagogue. It stimulates GH release without affecting cortisol, prolactin, or other hormones.',
 NULL, '170851-70-4', 'C₃₈H₄₉N₉O₅', '711.9 g/mol', '/products/ipamorelin.webp', true, 120,
 '{}'::jsonb),

-- 13. TB-500
('a0000000-0000-0000-0000-000000000013', 'TB-500', 'tb-500', 'peptide', 'active',
 'A peptide studied in laboratory settings for cellular migration and tissue repair mechanisms',
 'TB-500 is a synthetic version of a naturally occurring peptide present in virtually all human cells called Thymosin Beta 4 (Tβ4).',
 NULL, '77591-33-4', 'C₂₁₂H₃₅₀N₅₆O₇₈S', '4963.5 g/mol', '/products/tb-500.webp', true, 130,
 '{}'::jsonb),

-- 14. Melanotan 2
('a0000000-0000-0000-0000-000000000014', 'Melanotan 2', 'melanotan-2', 'peptide', 'active',
 'A peptide studied in laboratory settings for melanogenesis and melanocortin signaling',
 'Melanotan 2 (MT-2) is a synthetic analog of alpha-melanocyte-stimulating hormone (α-MSH) that activates melanocortin receptors.',
 NULL, '121062-08-6', 'C₅₀H₆₉N₁₅O₉', '1024.2 g/mol', '/products/melanotan-2.webp', true, 140,
 '{}'::jsonb),

-- 15. DSIP
('a0000000-0000-0000-0000-000000000015', 'DSIP', 'dsip', 'peptide', 'active',
 'A peptide studied in laboratory settings for sleep architecture and neuroendocrine modulation',
 'A naturally occurring neuromodulatory peptide that regulates sleep architecture, stress response, and neuroendocrine function.',
 NULL, '62568-57-4', 'C₃₅H₄₈N₁₀O₁₅S', '848.87 g/mol', '/products/dsip.webp', true, 150,
 '{}'::jsonb),

-- 16. GHK-Cu
('a0000000-0000-0000-0000-000000000016', 'GHK-Cu', 'ghk-cu', 'peptide', 'active',
 'A peptide studied in laboratory settings for tissue remodeling and gene expression modulation',
 'A naturally occurring copper-binding tripeptide with profound regenerative, anti-aging, and wound-healing properties.',
 NULL, '49557-75-7', 'C₁₄H₂₂CuN₆O₄', '404.93 g/mol', '/products/ghk-cu.webp', true, 160,
 '{}'::jsonb),

-- 17. PT-141
('a0000000-0000-0000-0000-000000000017', 'PT-141', 'pt-141', 'peptide', 'active',
 'A peptide studied in laboratory settings for melanocortin receptor activation and sexual function',
 'PT-141 (Bremelanotide) is a synthetic melanocortin receptor agonist that works through central nervous system pathways.',
 NULL, '189691-06-3', 'C₅₀H₆₈N₁₄O₁₀', '1025.2 g/mol', '/products/pt-141.webp', true, 170,
 '{}'::jsonb),

-- 18. Epithalon
('a0000000-0000-0000-0000-000000000018', 'Epithalon', 'epithalon', 'peptide', 'active',
 'A peptide studied in laboratory settings for telomerase activation and cellular senescence',
 'Epithalon is a synthetic tetrapeptide (Ala-Glu-Asp-Gly) derived from epithalamin, a pineal gland extract.',
 NULL, '307297-39-8', 'C₁₄H₂₂N₄O₉', '390.35 g/mol', '/products/epithalon.webp', true, 180,
 '{}'::jsonb),

-- 19. Glutathione
('a0000000-0000-0000-0000-000000000019', 'Glutathione', 'glutathione', 'peptide', 'active',
 'A tripeptide studied in laboratory settings for antioxidant activity and cellular redox signaling',
 'Glutathione (GSH) is a naturally occurring tripeptide composed of glutamate, cysteine, and glycine. It serves as the body''s master antioxidant.',
 NULL, '70-18-8', 'C₁₀H₁₇N₃O₆S', '307.32 g/mol', '/products/glutathione.webp', true, 190,
 '{}'::jsonb),

-- ---------- Blend Products (9) ----------

-- 20. CJC-1295 + Ipamorelin
('a0000000-0000-0000-0000-000000000020', 'CJC-1295 + Ipamorelin', 'cjc-1295-ipamorelin', 'blend', 'active',
 'A peptide blend studied in laboratory settings for growth hormone secretion and body composition',
 'CJC-1295 with Ipamorelin is a synergistic peptide combination that optimizes natural growth hormone secretion without receptor desensitization.',
 NULL, NULL, NULL, NULL, '/products/cjc-1295-ipamorelin.webp', true, 200,
 '{}'::jsonb),

-- 21. BPC-157 + TB-500
('a0000000-0000-0000-0000-000000000021', 'BPC-157 + TB-500', 'bpc-157-tb-500', 'blend', 'active',
 'A peptide blend studied in laboratory settings for tissue repair and recovery mechanisms',
 'This synergistic blend combines BPC-157''s angiogenic and gastroprotective properties with TB-500''s actin regulation and cellular migration capabilities.',
 NULL, NULL, NULL, NULL, '/products/bpc-157-tb-500.webp', true, 210,
 '{}'::jsonb),

-- 22. PT-141 / Kisspeptin / Pinealon
('a0000000-0000-0000-0000-000000000022', 'PT-141 / Kisspeptin / Pinealon', 'pt-141-kisspeptin-pinealon', 'blend', 'active',
 'A peptide blend studied in laboratory settings for libido and reproductive function',
 'A synergistic blend combining PT-141''s melanocortin pathway activation with Kisspeptin''s reproductive hormone stimulation and Pinealon''s neurological support.',
 NULL, NULL, NULL, NULL, NULL, true, 220,
 '{}'::jsonb),

-- 23. Thymosin α1 + Thymulin
('a0000000-0000-0000-0000-000000000023', 'Thymosin α1 + Thymulin', 'thymosin-thymulin', 'blend', 'active',
 'A peptide blend studied in laboratory settings for thymic function and immune modulation',
 'A synergistic blend combining Thymosin Alpha-1''s potent immune-enhancing properties with Thymulin''s thymic rejuvenation capabilities.',
 NULL, NULL, NULL, NULL, NULL, true, 230,
 '{}'::jsonb),

-- 24. GLOW
('a0000000-0000-0000-0000-000000000024', 'GLOW', 'glow', 'blend', 'active',
 'A peptide blend studied in laboratory settings for tissue repair and collagen synthesis',
 'GLOW is a synergistic triple-peptide blend combining BPC-157''s tissue repair, TB-500''s cellular migration, and GHK-Cu''s collagen synthesis.',
 NULL, NULL, NULL, NULL, '/products/glow.webp', true, 240,
 '{}'::jsonb),

-- 25. KLOW
('a0000000-0000-0000-0000-000000000025', 'KLOW', 'klow', 'blend', 'active',
 'A peptide blend studied in laboratory settings for gastrointestinal healing and tissue repair',
 'KLOW is an advanced quad-peptide blend combining BPC-157, TB-500, KPV, and GHK-Cu for comprehensive gastrointestinal healing.',
 NULL, NULL, NULL, NULL, '/products/klow.webp', true, 250,
 '{}'::jsonb),

-- 26. Tesamorelin / Ipamorelin
('a0000000-0000-0000-0000-000000000026', 'Tesamorelin / Ipamorelin', 'tesamorelin-ipamorelin', 'blend', 'active',
 'A peptide blend studied in laboratory settings for growth hormone secretion and somatotroph pathway research',
 'This research blend combines Tesamorelin, a synthetic growth hormone-releasing hormone (GHRH) analog, with Ipamorelin, a selective GHSR agonist.',
 NULL, NULL, NULL, NULL, '/products/tesamorelin-ipamorelin.webp', true, 260,
 '{}'::jsonb),

-- 27. GLP-1SG
('a0000000-0000-0000-0000-000000000027', 'GLP-1SG', 'glp-1sg', 'peptide', 'active',
 'A peptide studied in laboratory settings for metabolic regulation, glucose homeostasis, and appetite signaling',
 'GLP-1SG is a glucagon-like peptide-1 (GLP-1) receptor agonist that shares 94% structural homology with native human GLP-1.',
 NULL, '910463-68-2', 'C₁₈₇H₂₉₁N₄₅O₅₉', '4113.58 g/mol', '/products/glp-1sg.webp', true, 270,
 '{}'::jsonb),

-- 28. GLP-1 2TZ
('a0000000-0000-0000-0000-000000000028', 'GLP-1 2TZ', 'glp-1tz', 'peptide', 'active',
 'A peptide studied in laboratory settings for dual incretin receptor activation and metabolic regulation',
 'GLP-1 2TZ is a dual glucose-dependent insulinotropic polypeptide (GIP) and glucagon-like peptide-1 (GLP-1) receptor agonist.',
 NULL, '2023788-19-2', 'C₂₂₅H₃₄₈N₄₈O₆₈', '4813.45 g/mol', '/products/glp-1tz.webp', true, 280,
 '{}'::jsonb);

-- ---------- Supply Products (1) ----------

INSERT INTO public.products (id, name, slug, type, status, subtitle, description, cas_number, image_url, in_stock, sort_order, rich_content) VALUES
('a0000000-0000-0000-0000-000000000029', 'Bacteriostatic Water', 'bacteriostatic-water', 'supply', 'active',
 'Sterile water with 0.9% benzyl alcohol',
 'Sterile water with 0.9% benzyl alcohol for reconstitution of lyophilized peptides.',
 NULL, '/lovable-uploads/bacteriostatic-water.webp', true, 900,
 '{}'::jsonb);

-- ============================================================================
-- PRODUCT VARIANTS (sizes + pricing)
-- Data from priceData.ts (peptidePrices + memberPrices)
-- ============================================================================

INSERT INTO public.product_variants (product_id, size_label, price, member_price, sku, in_stock, sort_order) VALUES

-- Individual peptides
('a0000000-0000-0000-0000-000000000001', '5mg',      65.00,  46.00, 'AOD-9604-5MG',      true, 1),  -- aod-9604
('a0000000-0000-0000-0000-000000000002', '10mg',     83.00,  60.00, 'BPC-157-10MG',      true, 1),  -- bpc-157
('a0000000-0000-0000-0000-000000000003', '1mg',      77.00,  56.00, 'IGF1-LR3-1MG',      true, 1),  -- igf-1-lr3
('a0000000-0000-0000-0000-000000000004', '10mg',     88.00,  65.00, 'TESA-10MG',         true, 1),  -- tesamorelin
('a0000000-0000-0000-0000-000000000005', '5mg',      53.00,  38.00, 'SERM-5MG',          true, 1),  -- sermorelin
('a0000000-0000-0000-0000-000000000006', '10mg',    139.00,  99.00, 'CAGRI-10MG',        true, 1),  -- cagrilintide
('a0000000-0000-0000-0000-000000000007', '12mg',    134.00,  97.00, 'GLP3RT-12MG',       true, 1),  -- retatrutide 12mg
('a0000000-0000-0000-0000-000000000007', '24mg',    340.00,  NULL,  'GLP3RT-24MG',       true, 2),  -- retatrutide 24mg (no member price)
('a0000000-0000-0000-0000-000000000008', '10mg',     62.00,  44.00, 'MOTSC-10MG',        true, 1),  -- mots-c
('a0000000-0000-0000-0000-000000000009', '10mg',     70.00,  49.00, 'SELANK-10MG',       true, 1),  -- selank
('a0000000-0000-0000-0000-000000000010', '10mg',     70.00,  49.00, 'SEMAX-10MG',        true, 1),  -- semax
('a0000000-0000-0000-0000-000000000011', '500mg',    95.00,  69.00, 'NAD-500MG',         true, 1),  -- nad-buffered
('a0000000-0000-0000-0000-000000000012', '10mg',     76.00,  55.00, 'IPAM-10MG',         true, 1),  -- ipamorelin
('a0000000-0000-0000-0000-000000000013', '10mg',     83.00,  60.00, 'TB500-10MG',        true, 1),  -- tb-500
('a0000000-0000-0000-0000-000000000014', '10mg',     62.00,  44.00, 'MT2-10MG',          true, 1),  -- melanotan-2
('a0000000-0000-0000-0000-000000000015', '5mg',      54.00,  39.00, 'DSIP-5MG',          true, 1),  -- dsip
('a0000000-0000-0000-0000-000000000016', '100mg',    74.00,  53.00, 'GHKCU-100MG',       true, 1),  -- ghk-cu
('a0000000-0000-0000-0000-000000000017', '10mg',     65.00,  46.00, 'PT141-10MG',        true, 1),  -- pt-141
('a0000000-0000-0000-0000-000000000018', '10mg',     56.00,  40.00, 'EPITH-10MG',        true, 1),  -- epithalon
('a0000000-0000-0000-0000-000000000019', '1500mg',   92.00,  65.00, 'GLUT-1500MG',       true, 1),  -- glutathione

-- Blends
('a0000000-0000-0000-0000-000000000020', '5mg/5mg',              75.00,  54.00, 'CJC-IPAM-5-5',     true, 1),  -- cjc-1295-ipamorelin
('a0000000-0000-0000-0000-000000000021', '10mg/10mg',           116.00,  84.00, 'BPC-TB-10-10',     true, 1),  -- bpc-157-tb-500
('a0000000-0000-0000-0000-000000000022', '5mg x 2mg x 3mg',    249.00,  NULL,  'PT141-KISS-PIN',   true, 1),  -- pt-141-kisspeptin-pinealon (no member price)
('a0000000-0000-0000-0000-000000000023', '10mg x 6mg',         199.00,  NULL,  'THYMO-THYMU',      true, 1),  -- thymosin-thymulin (no member price)
('a0000000-0000-0000-0000-000000000024', '50mg/10mg/10mg',     144.00, 103.00, 'GLOW-BLEND',       true, 1),  -- glow
('a0000000-0000-0000-0000-000000000025', '50mg/10mg/10mg/10mg',144.00, 103.00, 'KLOW-BLEND',       true, 1),  -- klow
('a0000000-0000-0000-0000-000000000026', '12mg/2mg',           124.00,  92.00, 'TESA-IPAM-12-2',   true, 1),  -- tesamorelin-ipamorelin
('a0000000-0000-0000-0000-000000000027', '10mg',                98.00,  70.00, 'GLP1SG-10MG',      true, 1),  -- glp-1sg
('a0000000-0000-0000-0000-000000000028', '10mg',                98.00,  70.00, 'GLP1TZ-10MG',      true, 1),  -- glp-1tz 10mg
('a0000000-0000-0000-0000-000000000028', '15mg',               139.00,  NULL,  'GLP1TZ-15MG',      true, 2),  -- glp-1tz 15mg (no member price)
('a0000000-0000-0000-0000-000000000028', '20mg',               179.00,  NULL,  'GLP1TZ-20MG',      true, 3),  -- glp-1tz 20mg (no member price)

-- Supply
('a0000000-0000-0000-0000-000000000029', '30ml',                15.00,  12.00, 'BAC-WATER-30ML',   true, 1);  -- bacteriostatic-water


-- ============================================================================
-- PRODUCT CATEGORIES (many-to-many assignments)
-- Based on peptideSections in peptides.ts
-- ============================================================================

INSERT INTO public.product_categories (product_id, category_id, sort_order) VALUES

-- Best Sellers (c...001)
('a0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000001', 1),  -- BPC-157
('a0000000-0000-0000-0000-000000000020', 'c0000000-0000-0000-0000-000000000001', 2),  -- CJC-1295 + Ipamorelin
('a0000000-0000-0000-0000-000000000014', 'c0000000-0000-0000-0000-000000000001', 3),  -- Melanotan 2
('a0000000-0000-0000-0000-000000000021', 'c0000000-0000-0000-0000-000000000001', 4),  -- BPC-157 + TB-500
('a0000000-0000-0000-0000-000000000024', 'c0000000-0000-0000-0000-000000000001', 5),  -- GLOW
('a0000000-0000-0000-0000-000000000025', 'c0000000-0000-0000-0000-000000000001', 6),  -- KLOW
('a0000000-0000-0000-0000-000000000016', 'c0000000-0000-0000-0000-000000000001', 7),  -- GHK-Cu
('a0000000-0000-0000-0000-000000000007', 'c0000000-0000-0000-0000-000000000001', 8),  -- GLP-3RT
('a0000000-0000-0000-0000-000000000011', 'c0000000-0000-0000-0000-000000000001', 9),  -- NAD+ (Buffered)

-- Tissue Repair Research (c...002)
('a0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000002', 1),  -- BPC-157
('a0000000-0000-0000-0000-000000000013', 'c0000000-0000-0000-0000-000000000002', 2),  -- TB-500
('a0000000-0000-0000-0000-000000000021', 'c0000000-0000-0000-0000-000000000002', 3),  -- BPC-157 + TB-500
('a0000000-0000-0000-0000-000000000024', 'c0000000-0000-0000-0000-000000000002', 4),  -- GLOW
('a0000000-0000-0000-0000-000000000025', 'c0000000-0000-0000-0000-000000000002', 5),  -- KLOW

-- Muscle & Performance Research (c...003)
('a0000000-0000-0000-0000-000000000020', 'c0000000-0000-0000-0000-000000000003', 1),  -- CJC-1295 + Ipamorelin
('a0000000-0000-0000-0000-000000000012', 'c0000000-0000-0000-0000-000000000003', 2),  -- Ipamorelin
('a0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000003', 3),  -- IGF-1 LR3
('a0000000-0000-0000-0000-000000000004', 'c0000000-0000-0000-0000-000000000003', 4),  -- Tesamorelin
('a0000000-0000-0000-0000-000000000005', 'c0000000-0000-0000-0000-000000000003', 5),  -- Sermorelin
('a0000000-0000-0000-0000-000000000026', 'c0000000-0000-0000-0000-000000000003', 6),  -- Tesamorelin / Ipamorelin

-- Metabolic Research (c...004)
('a0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000004', 1),  -- AOD-9604
('a0000000-0000-0000-0000-000000000006', 'c0000000-0000-0000-0000-000000000004', 2),  -- Cagrilintide
('a0000000-0000-0000-0000-000000000007', 'c0000000-0000-0000-0000-000000000004', 3),  -- GLP-3RT
('a0000000-0000-0000-0000-000000000027', 'c0000000-0000-0000-0000-000000000004', 4),  -- GLP-1SG
('a0000000-0000-0000-0000-000000000028', 'c0000000-0000-0000-0000-000000000004', 5),  -- GLP-1 2TZ
('a0000000-0000-0000-0000-000000000008', 'c0000000-0000-0000-0000-000000000004', 6),  -- MOTS-C

-- Cellular Health Research (c...005)
('a0000000-0000-0000-0000-000000000015', 'c0000000-0000-0000-0000-000000000005', 1),  -- DSIP
('a0000000-0000-0000-0000-000000000018', 'c0000000-0000-0000-0000-000000000005', 2),  -- Epithalon
('a0000000-0000-0000-0000-000000000016', 'c0000000-0000-0000-0000-000000000005', 3),  -- GHK-Cu
('a0000000-0000-0000-0000-000000000009', 'c0000000-0000-0000-0000-000000000005', 4),  -- Selank
('a0000000-0000-0000-0000-000000000010', 'c0000000-0000-0000-0000-000000000005', 5),  -- Semax
('a0000000-0000-0000-0000-000000000011', 'c0000000-0000-0000-0000-000000000005', 6),  -- NAD+ (Buffered)
('a0000000-0000-0000-0000-000000000019', 'c0000000-0000-0000-0000-000000000005', 7),  -- Glutathione

-- Cognition & Mood Research (c...006)
('a0000000-0000-0000-0000-000000000017', 'c0000000-0000-0000-0000-000000000006', 1),  -- PT-141
('a0000000-0000-0000-0000-000000000014', 'c0000000-0000-0000-0000-000000000006', 2),  -- Melanotan 2

-- Research Supplies (c...007)
('a0000000-0000-0000-0000-000000000029', 'c0000000-0000-0000-0000-000000000007', 1);  -- Bacteriostatic Water


-- ============================================================================
-- BLEND COMPONENTS
-- Links blend products to their component products with dosage info
-- ============================================================================

INSERT INTO public.blend_components (blend_product_id, component_product_id, dosage, sort_order) VALUES

-- CJC-1295 + Ipamorelin  (CJC-1295 is not sold standalone, so we reference ipamorelin only for the component we have)
-- Note: CJC-1295 does not exist as a standalone product, so we only link the ipamorelin component
('a0000000-0000-0000-0000-000000000020', 'a0000000-0000-0000-0000-000000000012', '5mg', 2),  -- Ipamorelin

-- BPC-157 + TB-500
('a0000000-0000-0000-0000-000000000021', 'a0000000-0000-0000-0000-000000000002', '10mg', 1), -- BPC-157
('a0000000-0000-0000-0000-000000000021', 'a0000000-0000-0000-0000-000000000013', '10mg', 2), -- TB-500

-- PT-141 / Kisspeptin / Pinealon
-- Note: Kisspeptin and Pinealon are not sold individually, so we only link PT-141
('a0000000-0000-0000-0000-000000000022', 'a0000000-0000-0000-0000-000000000017', '5mg', 1),  -- PT-141

-- Thymosin α1 + Thymulin
-- Note: Neither component is sold individually; no blend_components rows needed

-- GLOW (GHK-Cu + BPC-157 + TB-500)
('a0000000-0000-0000-0000-000000000024', 'a0000000-0000-0000-0000-000000000016', '50mg', 1), -- GHK-Cu
('a0000000-0000-0000-0000-000000000024', 'a0000000-0000-0000-0000-000000000002', '10mg', 2), -- BPC-157
('a0000000-0000-0000-0000-000000000024', 'a0000000-0000-0000-0000-000000000013', '10mg', 3), -- TB-500

-- KLOW (GHK-Cu + BPC-157 + TB-500 + KPV)
-- Note: KPV is not sold individually, so we link the 3 we have
('a0000000-0000-0000-0000-000000000025', 'a0000000-0000-0000-0000-000000000016', '50mg', 1), -- GHK-Cu
('a0000000-0000-0000-0000-000000000025', 'a0000000-0000-0000-0000-000000000002', '10mg', 2), -- BPC-157
('a0000000-0000-0000-0000-000000000025', 'a0000000-0000-0000-0000-000000000013', '10mg', 3), -- TB-500

-- Tesamorelin / Ipamorelin
('a0000000-0000-0000-0000-000000000026', 'a0000000-0000-0000-0000-000000000004', '12mg', 1), -- Tesamorelin
('a0000000-0000-0000-0000-000000000026', 'a0000000-0000-0000-0000-000000000012', '2mg',  2); -- Ipamorelin

-- GLP-1SG and GLP-1 2TZ are individual peptides, not blends of other products

COMMIT;
