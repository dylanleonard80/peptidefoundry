/**
 * Single source of truth for all peptide prices.
 * All individual peptide pages and the peptides.ts cards reference these prices.
 * When updating prices, only update them here.
 */

export const peptidePrices: Record<string, Record<string, number>> = {
  // Individual peptides
  "aod-9604": { "5mg": 82 },
  "bpc-157": { "10mg": 55 },
  "igf-1-lr3": { "1mg": 185 },
  "tesamorelin": { "10mg": 164 },
  "sermorelin": { "5mg": 61 },

  "retatrutide": { "10mg": 105, "20mg": 150 },
  "mots-c": { "10mg": 56 },
  "selank": { "10mg": 48 },
  "semax": { "10mg": 50 },
  "nad-buffered": { "500mg": 70 },
  "glow": { "50mg/10mg/10mg": 155 },
  "ipamorelin": { "10mg": 65 },
  "tb-500": { "10mg": 140 },
  "melanotan-2": { "10mg": 49 },
  "dsip": { "5mg": 40 },
  "ghk-cu": { "50mg": 55 },
  "pt-141": { "10mg": 55 },
  "epithalon": { "10mg": 55 },
  "glutathione": { "1500mg": 92 },

  // Blends
  "cjc-1295-ipamorelin": { "5mg/5mg": 90 },
  "bpc-157-tb-500": { "10mg/10mg": 150 },


  // Supplies
  "bacteriostatic-water": { "30ml": 25 },
};

/**
 * Foundry Club member prices - specific fixed prices for members
 */
export const memberPrices: Record<string, Record<string, number>> = {
  // Individual peptides
  "aod-9604": { "5mg": 56 },
  "bpc-157": { "10mg": 45 },
  "igf-1-lr3": { "1mg": 110 },
  "tesamorelin": { "10mg": 98 },
  "sermorelin": { "5mg": 48 },

  "retatrutide": { "10mg": 70, "20mg": 90 },
  "mots-c": { "10mg": 46 },
  "selank": { "10mg": 38 },
  "semax": { "10mg": 40 },
  "nad-buffered": { "500mg": 50 },
  "glow": { "50mg/10mg/10mg": 110 },
  "ipamorelin": { "10mg": 49 },
  "tb-500": { "10mg": 85 },
  "melanotan-2": { "10mg": 39 },
  "dsip": { "5mg": 25 },
  "ghk-cu": { "50mg": 40 },
  "pt-141": { "10mg": 40 },
  "epithalon": { "10mg": 40 },
  "glutathione": { "1500mg": 65 },

  // Blends
  "cjc-1295-ipamorelin": { "5mg/5mg": 60 },
  "bpc-157-tb-500": { "10mg/10mg": 100 },

  // Supplies
  "bacteriostatic-water": { "30ml": 0 },
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
