/**
 * Post-build script: generates individual HTML files for each public route.
 *
 * Why this matters:
 * React SPAs serve a single index.html with <div id="root"></div>.
 * When Googlebot crawls /bpc-157, it gets that empty shell. Even though
 * Google *can* execute JS, it deprioritizes pages that look empty on first
 * load. By generating /bpc-157/index.html with the correct <title>,
 * <meta description>, canonical URL, OG tags, and JSON-LD, Googlebot sees
 * real content immediately. React still hydrates on top.
 *
 * Usage: node scripts/generate-static-pages.mjs
 * Run after `vite build` (the "build" npm script does this automatically).
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "../dist");
const BASE_URL = "https://peptidefoundry.com";

// Read the built index.html as our template
const template = readFileSync(resolve(DIST, "index.html"), "utf-8");

/**
 * Route definitions with SEO metadata.
 * Only public, crawlable pages go here (not dashboard, admin, auth, checkout).
 */
const routes = [
  {
    path: "/shop",
    title: "Shop All Peptides | Peptide Foundry",
    description:
      "Browse our full catalog of high-purity research peptides. BPC-157, TB-500, Ipamorelin, and more. Verified quality, fast shipping from Peptide Foundry.",
  },
  {
    path: "/about",
    title: "About Peptide Foundry | Our Mission & Quality Standards",
    description:
      "Learn about Peptide Foundry's commitment to quality, purity, and research excellence. Trusted source for premium research peptides.",
  },
  {
    path: "/contact",
    title: "Contact Peptide Foundry | Customer Support",
    description:
      "Get in touch with Peptide Foundry for questions about research peptides, orders, or membership. Fast, friendly customer support.",
  },
  {
    path: "/foundry-club",
    title: "Foundry Club Membership | Peptide Foundry",
    description:
      "Join the Foundry Club for exclusive member pricing on premium research peptides. Save up to 23% on every order with verified quality.",
  },

  // ── Peptide product pages ──────────────────────────────────────────
  {
    path: "/bpc-157",
    title: "BPC-157 | Peptide Foundry - Premium Research Peptides",
    description:
      "Buy high-purity BPC-157 research peptide from Peptide Foundry. Studied for tissue regeneration and healing mechanisms. Verified quality, fast shipping.",
    ogType: "product",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "BPC-157 Research Peptide",
      url: `${BASE_URL}/bpc-157`,
      image: `${BASE_URL}/products/bpc-157.webp`,
      brand: { "@type": "Brand", name: "Peptide Foundry" },
      description:
        "BPC-157 is a short chain of amino acids originally isolated from gastric juice, studied in preclinical models for tissue regeneration.",
    },
  },
  {
    path: "/tb-500",
    title: "TB-500 | Peptide Foundry - Premium Research Peptides",
    description:
      "Buy high-purity TB-500 (Thymosin Beta-4) from Peptide Foundry. Studied for tissue repair and cell migration. Verified quality, fast shipping.",
    ogType: "product",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "TB-500 Research Peptide",
      url: `${BASE_URL}/tb-500`,
      image: `${BASE_URL}/products/tb-500.webp`,
      brand: { "@type": "Brand", name: "Peptide Foundry" },
    },
  },
  {
    path: "/cjc-1295-ipamorelin",
    title: "CJC-1295 / Ipamorelin Blend | Peptide Foundry",
    description:
      "Buy high-purity CJC-1295/Ipamorelin blend from Peptide Foundry. Growth hormone secretagogue blend studied for GH release. Verified quality.",
    ogType: "product",
  },
  {
    path: "/ipamorelin",
    title: "Ipamorelin | Peptide Foundry - Premium Research Peptides",
    description:
      "Buy high-purity Ipamorelin from Peptide Foundry. A selective growth hormone secretagogue studied for GH release without cortisol elevation. Fast shipping.",
    ogType: "product",
  },
  {
    path: "/igf-1-lr3",
    title: "IGF-1 LR3 | Peptide Foundry - Premium Research Peptides",
    description:
      "Buy high-purity IGF-1 LR3 from Peptide Foundry. A long-acting IGF-1 analog studied for cell growth and metabolic activity. Verified quality.",
    ogType: "product",
  },
  {
    path: "/tesamorelin",
    title: "Tesamorelin | Peptide Foundry - Premium Research Peptides",
    description:
      "Buy high-purity Tesamorelin from Peptide Foundry. A growth hormone-releasing hormone analog studied for body composition. Verified quality, fast shipping.",
    ogType: "product",
  },
  {
    path: "/sermorelin",
    title: "Sermorelin | Peptide Foundry - Premium Research Peptides",
    description:
      "Buy high-purity Sermorelin from Peptide Foundry. A GHRH analog studied for growth hormone stimulation in research settings. Verified quality.",
    ogType: "product",
  },
  {
    path: "/aod-9604",
    title: "AOD-9604 | Peptide Foundry - Premium Research Peptides",
    description:
      "Buy high-purity AOD-9604 from Peptide Foundry. A modified GH fragment studied for fat metabolism research. Verified quality, fast shipping.",
    ogType: "product",
  },
  {
    path: "/retatrutide",
    title: "Retatrutide | Peptide Foundry - Premium Research Peptides",
    description:
      "Buy high-purity Retatrutide from Peptide Foundry. A triple agonist peptide studied for metabolic and weight management research. Verified quality.",
    ogType: "product",
  },
  {
    path: "/mots-c",
    title: "MOTS-c | Peptide Foundry - Premium Research Peptides",
    description:
      "Buy high-purity MOTS-c from Peptide Foundry. A mitochondrial-derived peptide studied for metabolic regulation and exercise mimetic effects. Fast shipping.",
    ogType: "product",
  },
  {
    path: "/dsip",
    title: "DSIP | Peptide Foundry - Premium Research Peptides",
    description:
      "Buy high-purity DSIP (Delta Sleep-Inducing Peptide) from Peptide Foundry. Studied for sleep regulation and stress response. Verified quality.",
    ogType: "product",
  },
  {
    path: "/ghk-cu",
    title: "GHK-Cu | Peptide Foundry - Premium Research Peptides",
    description:
      "Buy high-purity GHK-Cu copper peptide from Peptide Foundry. Studied for skin regeneration, wound healing, and collagen synthesis. Fast shipping.",
    ogType: "product",
  },
  {
    path: "/selank",
    title: "Selank | Peptide Foundry - Premium Research Peptides",
    description:
      "Buy high-purity Selank from Peptide Foundry. A synthetic tuftsin analog studied for anxiolytic and nootropic properties. Verified quality.",
    ogType: "product",
  },
  {
    path: "/semax",
    title: "Semax | Peptide Foundry - Premium Research Peptides",
    description:
      "Buy high-purity Semax from Peptide Foundry. A synthetic ACTH analog studied for cognitive enhancement and neuroprotection. Fast shipping.",
    ogType: "product",
  },
  {
    path: "/nad-buffered",
    title: "NAD+ Buffered | Peptide Foundry - Premium Research Peptides",
    description:
      "Buy high-purity buffered NAD+ from Peptide Foundry. Essential coenzyme studied for cellular energy and aging research. Verified quality.",
    ogType: "product",
  },
  {
    path: "/glutathione",
    title: "Glutathione | Peptide Foundry - Premium Research Peptides",
    description:
      "Buy high-purity Glutathione from Peptide Foundry. A powerful antioxidant tripeptide studied for detoxification and cellular protection. Fast shipping.",
    ogType: "product",
  },
  {
    path: "/pt-141",
    title: "PT-141 | Peptide Foundry - Premium Research Peptides",
    description:
      "Buy high-purity PT-141 (Bremelanotide) from Peptide Foundry. A melanocortin receptor agonist studied for sexual function research. Verified quality.",
    ogType: "product",
  },
  {
    path: "/melanotan-2",
    title: "Melanotan 2 | Peptide Foundry - Premium Research Peptides",
    description:
      "Buy high-purity Melanotan 2 from Peptide Foundry. A synthetic melanocortin peptide studied for melanogenesis and tanning research. Fast shipping.",
    ogType: "product",
  },
  {
    path: "/epithalon",
    title: "Epithalon | Peptide Foundry - Premium Research Peptides",
    description:
      "Buy high-purity Epithalon from Peptide Foundry. A tetrapeptide studied for telomerase activation and longevity research. Verified quality.",
    ogType: "product",
  },
  {
    path: "/bpc-157-tb-500",
    title: "BPC-157 / TB-500 Blend | Peptide Foundry",
    description:
      "Buy high-purity BPC-157/TB-500 blend from Peptide Foundry. A synergistic blend studied for enhanced tissue repair and recovery. Verified quality.",
    ogType: "product",
  },
  {
    path: "/glow",
    title: "GLOW Blend | Peptide Foundry - Premium Research Peptides",
    description:
      "Buy the GLOW peptide blend from Peptide Foundry. A curated blend studied for skin health and rejuvenation research. Verified quality, fast shipping.",
    ogType: "product",
  },
  {
    path: "/bacteriostatic-water",
    title: "Bacteriostatic Water | Peptide Foundry",
    description:
      "Buy sterile bacteriostatic water from Peptide Foundry. Essential for reconstituting research peptides. Pharmaceutical grade, fast shipping.",
    ogType: "product",
  },

  // ── Legal pages ────────────────────────────────────────────────────
  {
    path: "/privacy-policy",
    title: "Privacy Policy | Peptide Foundry",
    description:
      "Peptide Foundry's privacy policy. Learn how we collect, use, and protect your personal information.",
  },
  {
    path: "/terms-of-service",
    title: "Terms of Service | Peptide Foundry",
    description:
      "Peptide Foundry's terms of service. Read our terms and conditions for using our website and purchasing research peptides.",
  },
  {
    path: "/refund-policy",
    title: "Refund Policy | Peptide Foundry",
    description:
      "Peptide Foundry's refund and return policy. Learn about our satisfaction guarantee for research peptide orders.",
  },
  {
    path: "/shipping-policy",
    title: "Shipping Policy | Peptide Foundry",
    description:
      "Peptide Foundry's shipping policy. Fast, discreet shipping on all research peptide orders. Free shipping available.",
  },
];

// ── Helpers ────────────────────────────────────────────────────────────

function generateHtml(route) {
  let html = template;

  // Replace <title>
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${route.title}</title>`
  );

  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${route.description}">`
  );

  // Replace canonical
  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${BASE_URL}${route.path}" />`
  );

  // Replace OG tags
  html = html.replace(
    /<meta property="og:url" content="[^"]*">/,
    `<meta property="og:url" content="${BASE_URL}${route.path}">`
  );
  html = html.replace(
    /<meta property="og:title" content="[^"]*">/,
    `<meta property="og:title" content="${route.title}">`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*">/,
    `<meta property="og:description" content="${route.description}">`
  );
  if (route.ogType) {
    html = html.replace(
      /<meta property="og:type" content="[^"]*">/,
      `<meta property="og:type" content="${route.ogType}">`
    );
  }

  // Replace Twitter tags
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*">/,
    `<meta name="twitter:title" content="${route.title}">`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*">/,
    `<meta name="twitter:description" content="${route.description}">`
  );

  // Inject product JSON-LD if provided
  if (route.jsonLd) {
    html = html.replace(
      "</head>",
      `  <script type="application/ld+json">\n    ${JSON.stringify(route.jsonLd)}\n    </script>\n  </head>`
    );
  }

  return html;
}

// ── Main ───────────────────────────────────────────────────────────────

console.log(`\n🔧 Generating static HTML for ${routes.length} routes...\n`);

let created = 0;
for (const route of routes) {
  const dir = resolve(DIST, route.path.slice(1)); // remove leading /
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  const html = generateHtml(route);
  const outPath = resolve(dir, "index.html");
  writeFileSync(outPath, html, "utf-8");
  console.log(`  ✅ ${route.path}`);
  created++;
}

console.log(`\n✨ Done! Generated ${created} static HTML pages in dist/\n`);
