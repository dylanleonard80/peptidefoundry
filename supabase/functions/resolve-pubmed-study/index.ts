import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ResolveRequest {
  title: string;
  authors?: string;
  year?: number;
  maxResults?: number;
}

interface PubMedCandidate {
  pmid: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  similarity: number;
}

/**
 * Normalize a title for comparison
 */
function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Calculate Jaccard similarity between two titles
 */
function calculateSimilarity(title1: string, title2: string): number {
  const norm1 = normalizeTitle(title1);
  const norm2 = normalizeTitle(title2);
  
  if (norm1 === norm2) return 1;
  
  const words1 = new Set(norm1.split(' ').filter(w => w.length > 2));
  const words2 = new Set(norm2.split(' ').filter(w => w.length > 2));
  
  if (words1.size === 0 || words2.size === 0) return 0;
  
  const intersection = new Set([...words1].filter(w => words2.has(w)));
  const union = new Set([...words1, ...words2]);
  
  return intersection.size / union.size;
}

/**
 * Decode XML entities
 */
function decodeXmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

/**
 * Search PubMed for studies matching a title
 */
async function searchPubMed(query: string, maxResults: number = 10): Promise<string[]> {
  try {
    // Use ESearch to find PMIDs
    const encodedQuery = encodeURIComponent(query);
    const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodedQuery}&retmax=${maxResults}&retmode=json`;
    
    console.log("Searching PubMed:", query.substring(0, 100));
    
    const response = await fetch(searchUrl);
    if (!response.ok) {
      console.error(`PubMed search error: ${response.status}`);
      return [];
    }
    
    const data = await response.json();
    return data.esearchresult?.idlist || [];
  } catch (error) {
    console.error("Error searching PubMed:", error);
    return [];
  }
}

/**
 * Fetch detailed metadata for PMIDs
 */
async function fetchPubMedDetails(pmids: string[]): Promise<Map<string, Omit<PubMedCandidate, 'similarity'>>> {
  const results = new Map<string, Omit<PubMedCandidate, 'similarity'>>();
  
  if (pmids.length === 0) return results;
  
  try {
    const ids = pmids.join(",");
    const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${ids}&rettype=abstract&retmode=xml`;
    
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`PubMed fetch error: ${response.status}`);
      return results;
    }
    
    const xml = await response.text();
    const articleMatches = xml.matchAll(/<PubmedArticle>([\s\S]*?)<\/PubmedArticle>/g);
    
    for (const match of articleMatches) {
      const articleXml = match[1];
      
      const pmidMatch = articleXml.match(/<PMID[^>]*>(\d+)<\/PMID>/);
      if (!pmidMatch) continue;
      const pmid = pmidMatch[1];
      
      const titleMatch = articleXml.match(/<ArticleTitle>([^<]+)<\/ArticleTitle>/);
      const title = titleMatch ? decodeXmlEntities(titleMatch[1]) : "";
      
      const authorMatches = [...articleXml.matchAll(/<LastName>([^<]+)<\/LastName>/g)];
      const authorNames = authorMatches.slice(0, 3).map(m => m[1]);
      let authors = authorNames.join(", ");
      if (authorMatches.length > 3) {
        authors += ", et al.";
      }
      
      const journalMatch = articleXml.match(/<Title>([^<]+)<\/Title>/);
      const journal = journalMatch ? decodeXmlEntities(journalMatch[1]) : "";
      
      const yearMatch = articleXml.match(/<PubDate>[\s\S]*?<Year>(\d{4})<\/Year>/);
      const year = yearMatch ? parseInt(yearMatch[1]) : 0;
      
      results.set(pmid, { pmid, title, authors, journal, year });
    }
  } catch (error) {
    console.error("Error fetching PubMed details:", error);
  }
  
  return results;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { title, authors, year, maxResults = 15 }: ResolveRequest = await req.json();
    
    if (!title || typeof title !== "string") {
      return new Response(
        JSON.stringify({ error: "title is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    console.log(`Resolving study: "${title.substring(0, 80)}..."`);
    
    // Build search query - use title as primary search
    // Extract key words (skip common words)
    const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'this', 'that', 'these', 'those', 'it', 'its']);
    
    const words = title.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 3 && !stopWords.has(w))
      .slice(0, 8); // Use first 8 significant words
    
    let query = words.join(' ');
    
    // Add first author if available
    if (authors) {
      const firstAuthor = authors.split(/[,;]/)[0].trim().split(' ').pop();
      if (firstAuthor && firstAuthor.length > 2) {
        query += ` ${firstAuthor}[Author]`;
      }
    }
    
    // Add year filter if available
    if (year && year > 1900) {
      query += ` ${year}[pdat]`;
    }
    
    // Search PubMed
    const pmids = await searchPubMed(query, maxResults);
    
    if (pmids.length === 0) {
      // Try simpler search with just title words
      const simplePmids = await searchPubMed(words.slice(0, 5).join(' '), maxResults);
      if (simplePmids.length === 0) {
        return new Response(
          JSON.stringify({ 
            candidates: [], 
            bestMatch: null,
            message: "No candidates found in PubMed"
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      pmids.push(...simplePmids);
    }
    
    // Fetch details for found PMIDs
    const details = await fetchPubMedDetails(pmids);
    
    // Calculate similarity scores
    const candidates: PubMedCandidate[] = [];
    for (const [pmid, article] of details) {
      const similarity = calculateSimilarity(title, article.title);
      candidates.push({
        ...article,
        similarity
      });
    }
    
    // Sort by similarity descending
    candidates.sort((a, b) => b.similarity - a.similarity);
    
    // Find best match (must be > 0.4 similarity to be considered)
    const bestMatch = candidates.length > 0 && candidates[0].similarity >= 0.4 
      ? candidates[0] 
      : null;
    
    console.log(`Found ${candidates.length} candidates, best match: ${bestMatch?.pmid || 'none'} (${(bestMatch?.similarity || 0 * 100).toFixed(0)}%)`);
    
    return new Response(
      JSON.stringify({ 
        candidates: candidates.slice(0, 5), // Return top 5
        bestMatch,
        searchQuery: query
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error("Error in resolve-pubmed-study:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
