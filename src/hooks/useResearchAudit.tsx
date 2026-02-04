import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { peptideResearchData, ResearchStudy } from "@/data/researchStudies";
import { 
  getPmidFromStudy, 
  calculateTitleSimilarity,
  PubMedStudyMetadata 
} from "@/lib/pubmedUtils";

export interface AuditResult {
  peptideSlug: string;
  areaTitle: string;
  storedStudy: ResearchStudy;
  pmid: string | null;
  pubmedMetadata: PubMedStudyMetadata | null;
  similarity: number;
  status: "match" | "mismatch" | "not_found" | "invalid_url";
}

export interface AuditSummary {
  total: number;
  matches: number;
  mismatches: number;
  notFound: number;
  invalidUrls: number;
}

export function useResearchAudit() {
  const [isAuditing, setIsAuditing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<AuditResult[]>([]);
  const [summary, setSummary] = useState<AuditSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runAudit = useCallback(async (peptideSlugs?: string[]) => {
    setIsAuditing(true);
    setProgress(0);
    setResults([]);
    setSummary(null);
    setError(null);

    try {
      // Collect all studies with their PMIDs
      const studyEntries: {
        peptideSlug: string;
        areaTitle: string;
        study: ResearchStudy;
        pmid: string | null;
      }[] = [];

      const slugsToAudit = peptideSlugs || Object.keys(peptideResearchData);

      for (const slug of slugsToAudit) {
        const peptideData = peptideResearchData[slug];
        if (!peptideData) continue;

        for (const area of peptideData.researchAreas) {
          for (const study of area.studies) {
            // Use new helper that prioritizes study.pmid over URL extraction
            const pmid = getPmidFromStudy(study);
            studyEntries.push({
              peptideSlug: slug,
              areaTitle: area.areaTitle,
              study,
              pmid
            });
          }
        }
      }

      // Collect valid PMIDs for batch verification
      const validPmids = studyEntries
        .map(e => e.pmid)
        .filter((pmid): pmid is string => pmid !== null);

      // Fetch PubMed metadata in batches
      let pubmedData: Record<string, PubMedStudyMetadata> = {};
      
      if (validPmids.length > 0) {
        const batchSize = 50; // Smaller batches for progress updates
        const batches: string[][] = [];
        
        for (let i = 0; i < validPmids.length; i += batchSize) {
          batches.push(validPmids.slice(i, i + batchSize));
        }

        for (let i = 0; i < batches.length; i++) {
          const batch = batches[i];
          
          const { data, error: fetchError } = await supabase.functions.invoke(
            "verify-pubmed-studies",
            { body: { pmids: batch } }
          );

          if (fetchError) {
            console.error("Error fetching PubMed data:", fetchError);
          } else if (data?.studies) {
            pubmedData = { ...pubmedData, ...data.studies };
          }

          setProgress(Math.round(((i + 1) / batches.length) * 80));
        }
      }

      // Compare and generate results
      const auditResults: AuditResult[] = [];
      let matches = 0, mismatches = 0, notFound = 0, invalidUrls = 0;

      for (const entry of studyEntries) {
        let result: AuditResult;

        if (!entry.pmid) {
          result = {
            peptideSlug: entry.peptideSlug,
            areaTitle: entry.areaTitle,
            storedStudy: entry.study,
            pmid: null,
            pubmedMetadata: null,
            similarity: 0,
            status: "invalid_url"
          };
          invalidUrls++;
        } else {
          const metadata = pubmedData[entry.pmid];
          
          if (!metadata) {
            result = {
              peptideSlug: entry.peptideSlug,
              areaTitle: entry.areaTitle,
              storedStudy: entry.study,
              pmid: entry.pmid,
              pubmedMetadata: null,
              similarity: 0,
              status: "not_found"
            };
            notFound++;
          } else {
            const similarity = calculateTitleSimilarity(
              entry.study.title,
              metadata.title
            );
            
            const isMatch = similarity >= 0.5; // 50% word overlap threshold
            
            result = {
              peptideSlug: entry.peptideSlug,
              areaTitle: entry.areaTitle,
              storedStudy: entry.study,
              pmid: entry.pmid,
              pubmedMetadata: metadata,
              similarity,
              status: isMatch ? "match" : "mismatch"
            };
            
            if (isMatch) matches++;
            else mismatches++;
          }
        }

        auditResults.push(result);
      }

      setProgress(100);
      setResults(auditResults);
      setSummary({
        total: auditResults.length,
        matches,
        mismatches,
        notFound,
        invalidUrls
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error during audit");
    } finally {
      setIsAuditing(false);
    }
  }, []);

  return {
    isAuditing,
    progress,
    results,
    summary,
    error,
    runAudit
  };
}
