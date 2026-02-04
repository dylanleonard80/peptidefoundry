/**
 * Single source of truth for all peptide prices.
 * All individual peptide pages and the peptides.ts cards reference these prices.
 * When updating prices, only update them here.
 */

export const peptidePrices: Record<string, Record<string, number>> = {
  // Individual peptides
  "aod-9604": { "5mg": 65 },
  "bpc-157": { "10mg": 83 },
  "igf-1-lr3": { "1mg": 77 },
  "tesamorelin": { "10mg": 88 },
  "sermorelin": { "5mg": 53 },
  "cagrilintide": { "10mg": 139 },
  "retatrutide": { "12mg": 134, "24mg": 340 },
  "mots-c": { "10mg": 62 },
  "selank": { "10mg": 70 },
  "semax": { "10mg": 70 },
  "nad-buffered": { "500mg": 95 },
  "glow": { "50mg/10mg/10mg": 144 },
  "ipamorelin": { "10mg": 76 },
  "tb-500": { "10mg": 83 },
  "melanotan-2": { "10mg": 62 },
  "dsip": { "5mg": 54 },
  "ghk-cu": { "100mg": 74 },
  "pt-141": { "10mg": 65 },
  "epithalon": { "10mg": 56 },
  "glutathione": { "1500mg": 92 },
  
  // Blends
  "cjc-1295-ipamorelin": { "5mg/5mg": 75 },
  "bpc-157-tb-500": { "10mg/10mg": 116 },
  "pt-141-kisspeptin-pinealon": { "5mg x 2mg x 3mg": 249 },
  "thymosin-thymulin": { "10mg x 6mg": 199 },
  "klow": { "50mg/10mg/10mg/10mg": 144 },
  "tesamorelin-ipamorelin": { "12mg/2mg": 124 },
  "glp-1sg": { "10mg": 98 },
  "glp-1tz": { "10mg": 98, "15mg": 139, "20mg": 179 },
  
  // Supplies
  "bacteriostatic-water": { "30ml": 15 },
};

/**
 * Foundry Club member prices - specific fixed prices for members
 */
export const memberPrices: Record<string, Record<string, number>> = {
  // Individual peptides
  "aod-9604": { "5mg": 46 },
  "bpc-157": { "10mg": 60 },
  "igf-1-lr3": { "1mg": 56 },
  "tesamorelin": { "10mg": 65 },
  "sermorelin": { "5mg": 38 },
  "cagrilintide": { "10mg": 99 },
  "retatrutide": { "12mg": 97 },
  "mots-c": { "10mg": 44 },
  "selank": { "10mg": 49 },
  "semax": { "10mg": 49 },
  "nad-buffered": { "500mg": 69 },
  "glow": { "50mg/10mg/10mg": 103 },
  "ipamorelin": { "10mg": 55 },
  "tb-500": { "10mg": 60 },
  "melanotan-2": { "10mg": 44 },
  "dsip": { "5mg": 39 },
  "ghk-cu": { "100mg": 53 },
  "pt-141": { "10mg": 46 },
  "epithalon": { "10mg": 40 },
  "glutathione": { "1500mg": 65 },
  
  // Blends
  "cjc-1295-ipamorelin": { "5mg/5mg": 54 },
  "bpc-157-tb-500": { "10mg/10mg": 84 },
  "klow": { "50mg/10mg/10mg/10mg": 103 },
  "tesamorelin-ipamorelin": { "12mg/2mg": 92 },
  "glp-1sg": { "10mg": 70 },
  "glp-1tz": { "10mg": 70 },
  
  // Supplies
  "bacteriostatic-water": { "30ml": 12 },
};

/**
 * Gets the starting price (lowest price) from a peptide's price object
 */
export function getStartingPrice(slug: string): number {
  const prices = peptidePrices[slug];
  if (!prices) {
    console.warn(`No prices found for slug: ${slug}`);
    return 0;
  }
  return Math.min(...Object.values(prices));
}

/**
 * Gets all prices for a peptide by slug
 */
export function getPrices(slug: string): Record<string, number> | undefined {
  return peptidePrices[slug];
}

/**
 * Gets the specific member price for a peptide by slug and size
 * Returns undefined if no specific member price exists
 */
export function getMemberPriceBySlug(slug: string, size: string): number | undefined {
  return memberPrices[slug]?.[size];
}

/**
 * Gets the savings amount for a specific peptide size (regular - member price)
 */
export function getSavingsBySlug(slug: string, size: string): number {
  const regularPrice = peptidePrices[slug]?.[size];
  const memberPrice = memberPrices[slug]?.[size];
  if (regularPrice && memberPrice) {
    return regularPrice - memberPrice;
  }
  // Fallback to ~23% discount calculation if no specific member price
  if (regularPrice) {
    return Math.round(regularPrice * 0.23);
  }
  return 0;
}
