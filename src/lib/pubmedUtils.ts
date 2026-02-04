// PubMed PMID utilities for research study validation

/**
 * Extract PMID from a PubMed URL
 * Handles formats like:
 * - https://pubmed.ncbi.nlm.nih.gov/12345678/
 * - https://www.ncbi.nlm.nih.gov/pubmed/12345678
 * - https://ncbi.nlm.nih.gov/pubmed/?term=12345678
 * - https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1234567/ (extracts nothing - PMC != PMID)
 * - https://pubmed.ncbi.nlm.nih.gov/12345678/?from_term=xyz
 */
export function extractPmidFromUrl(url: string): string | null {
  if (!url) return null;
  
  // Match PMID patterns in PubMed URLs (expanded patterns)
  const patterns = [
    /pubmed\.ncbi\.nlm\.nih\.gov\/(\d+)/,           // Modern PubMed URLs
    /ncbi\.nlm\.nih\.gov\/pubmed\/(\d+)/,           // Legacy PubMed URLs
    /ncbi\.nlm\.nih\.gov\/pubmed\/?\?term=(\d+)/,   // Query format
    /ncbi\.nlm\.nih\.gov\/pubmed[^\/]*\/(\d+)/,     // Variations with subpaths
    /\/(\d{6,9})(?:\/|\?|$)/,                       // Generic PMID in path (6-9 digits)
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1] && isValidPmid(match[1])) {
      return match[1];
    }
  }
  
  return null;
}

/**
 * Get PMID from a study, preferring explicit pmid field over URL extraction
 */
export function getPmidFromStudy(study: { pmid?: string; url: string }): string | null {
  // Prefer explicit PMID if set
  if (study.pmid && isValidPmid(study.pmid)) {
    return study.pmid;
  }
  // Fall back to URL extraction
  return extractPmidFromUrl(study.url);
}

/**
 * Generate a canonical PubMed URL from a PMID
 */
export function pubmedUrl(pmid: string): string {
  return `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`;
}

/**
 * Validate that a PMID looks correct (6-9 digits)
 */
export function isValidPmid(pmid: string): boolean {
  return /^\d{6,9}$/.test(pmid);
}

/**
 * Check if a URL is a valid PubMed URL
 */
export function isPubMedUrl(url: string): boolean {
  return /pubmed\.ncbi\.nlm\.nih\.gov|ncbi\.nlm\.nih\.gov\/pubmed/.test(url);
}

/**
 * Normalize a title for comparison (lowercase, remove punctuation, extra spaces)
 */
export function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/g, '') // Remove punctuation
    .replace(/\s+/g, ' ')    // Normalize whitespace
    .trim();
}

/**
 * Calculate similarity between two titles (0-1 scale)
 * Uses a simple word overlap approach
 */
export function calculateTitleSimilarity(title1: string, title2: string): number {
  const norm1 = normalizeTitle(title1);
  const norm2 = normalizeTitle(title2);
  
  // Exact match
  if (norm1 === norm2) return 1;
  
  const words1 = new Set(norm1.split(' ').filter(w => w.length > 2));
  const words2 = new Set(norm2.split(' ').filter(w => w.length > 2));
  
  if (words1.size === 0 || words2.size === 0) return 0;
  
  // Calculate Jaccard similarity
  const intersection = new Set([...words1].filter(w => words2.has(w)));
  const union = new Set([...words1, ...words2]);
  
  return intersection.size / union.size;
}

export interface PubMedStudyMetadata {
  pmid: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  abstract?: string;
}

export interface StudyVerificationResult {
  pmid: string;
  storedTitle: string;
  pubmedTitle: string;
  similarity: number;
  isMatch: boolean;
  metadata?: PubMedStudyMetadata;
}

export interface ResolverCandidate {
  pmid: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  similarity: number;
}
