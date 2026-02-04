import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PubMedArticle {
  pmid: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
}

interface VerifyRequest {
  pmids: string[];
}

/**
 * Fetch study metadata from PubMed E-utilities API
 * Documentation: https://www.ncbi.nlm.nih.gov/books/NBK25500/
 */
async function fetchPubMedMetadata(pmids: string[]): Promise<Map<string, PubMedArticle>> {
  const results = new Map<string, PubMedArticle>();
  
  if (pmids.length === 0) return results;
  
  // Batch PMIDs (max 200 per request per NCBI guidelines)
  const batchSize = 200;
  const batches: string[][] = [];
  
  for (let i = 0; i < pmids.length; i += batchSize) {
    batches.push(pmids.slice(i, i + batchSize));
  }
  
  for (const batch of batches) {
    try {
      // Use efetch to get detailed article info in XML format
      const ids = batch.join(",");
      const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${ids}&rettype=abstract&retmode=xml`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        console.error(`PubMed API error: ${response.status}`);
        continue;
      }
      
      const xml = await response.text();
      
      // Parse each article from XML
      const articleMatches = xml.matchAll(/<PubmedArticle>([\s\S]*?)<\/PubmedArticle>/g);
      
      for (const match of articleMatches) {
        const articleXml = match[1];
        
        // Extract PMID
        const pmidMatch = articleXml.match(/<PMID[^>]*>(\d+)<\/PMID>/);
        if (!pmidMatch) continue;
        const pmid = pmidMatch[1];
        
        // Extract title
        const titleMatch = articleXml.match(/<ArticleTitle>([^<]+)<\/ArticleTitle>/);
        const title = titleMatch ? decodeXmlEntities(titleMatch[1]) : "";
        
        // Extract authors (first 3 + et al.)
        const authorMatches = [...articleXml.matchAll(/<LastName>([^<]+)<\/LastName>/g)];
        const authorNames = authorMatches.slice(0, 3).map(m => m[1]);
        let authors = authorNames.join(", ");
        if (authorMatches.length > 3) {
          authors += ", et al.";
        }
        
        // Extract journal
        const journalMatch = articleXml.match(/<Title>([^<]+)<\/Title>/);
        const journal = journalMatch ? decodeXmlEntities(journalMatch[1]) : "";
        
        // Extract year
        const yearMatch = articleXml.match(/<PubDate>[\s\S]*?<Year>(\d{4})<\/Year>/);
        const year = yearMatch ? parseInt(yearMatch[1]) : 0;
        
        results.set(pmid, {
          pmid,
          title,
          authors,
          journal,
          year
        });
      }
      
      // Be nice to NCBI - add small delay between batches
      if (batches.length > 1) {
        await new Promise(resolve => setTimeout(resolve, 350));
      }
      
    } catch (error) {
      console.error(`Error fetching batch:`, error);
    }
  }
  
  return results;
}

function decodeXmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { pmids }: VerifyRequest = await req.json();
    
    if (!pmids || !Array.isArray(pmids)) {
      return new Response(
        JSON.stringify({ error: "pmids array is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Filter valid PMIDs
    const validPmids = pmids.filter(p => /^\d{6,9}$/.test(p));
    
    if (validPmids.length === 0) {
      return new Response(
        JSON.stringify({ studies: {} }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    console.log(`Verifying ${validPmids.length} PMIDs`);
    
    const metadata = await fetchPubMedMetadata(validPmids);
    
    // Convert Map to object for JSON response
    const studies: Record<string, PubMedArticle> = {};
    for (const [pmid, article] of metadata) {
      studies[pmid] = article;
    }
    
    return new Response(
      JSON.stringify({ studies }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error("Error in verify-pubmed-studies:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
