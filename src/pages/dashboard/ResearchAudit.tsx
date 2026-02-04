import { useState, useCallback } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  LinkIcon, 
  Play, 
  ExternalLink,
  FileSearch,
  Copy,
  Check,
  Wand2,
  Download,
  RefreshCw,
  Loader2
} from "lucide-react";
import { useResearchAudit, AuditResult } from "@/hooks/useResearchAudit";
import { pubmedUrl, ResolverCandidate } from "@/lib/pubmedUtils";
import { peptideResearchData } from "@/data/researchStudies";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ResolvedStudy extends AuditResult {
  suggestedPmid?: string;
  suggestedTitle?: string;
  suggestedSimilarity?: number;
  isResolving?: boolean;
  resolutionError?: string;
}

export default function ResearchAudit() {
  const { isAuditing, progress, results, summary, error, runAudit } = useResearchAudit();
  const [filter, setFilter] = useState<"all" | "match" | "mismatch" | "not_found" | "invalid_url">("all");
  const [copiedPmid, setCopiedPmid] = useState<string | null>(null);
  const [resolvedStudies, setResolvedStudies] = useState<Record<string, ResolvedStudy>>({});
  const [isResolvingAll, setIsResolvingAll] = useState(false);
  const [resolveProgress, setResolveProgress] = useState(0);
  const { toast } = useToast();

  const peptideList = Object.keys(peptideResearchData);

  // Merge audit results with resolved data
  const enrichedResults: ResolvedStudy[] = results.map(r => {
    const key = `${r.peptideSlug}-${r.storedStudy.title}`;
    return resolvedStudies[key] || r;
  });

  const filteredResults = enrichedResults.filter(r => filter === "all" || r.status === filter);
  
  // Get problematic results (need fixing)
  const problematicResults = enrichedResults.filter(r => 
    r.status === "mismatch" || r.status === "not_found" || r.status === "invalid_url"
  );

  const getStatusBadge = (status: AuditResult["status"]) => {
    switch (status) {
      case "match":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30"><CheckCircle2 className="w-3 h-3 mr-1" />Match</Badge>;
      case "mismatch":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30"><XCircle className="w-3 h-3 mr-1" />Mismatch</Badge>;
      case "not_found":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30"><AlertTriangle className="w-3 h-3 mr-1" />Not Found</Badge>;
      case "invalid_url":
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30"><LinkIcon className="w-3 h-3 mr-1" />Invalid URL</Badge>;
    }
  };

  const copyPmid = (pmid: string) => {
    navigator.clipboard.writeText(pmid);
    setCopiedPmid(pmid);
    toast({ title: "PMID copied", description: pmid });
    setTimeout(() => setCopiedPmid(null), 2000);
  };

  const resolveStudy = useCallback(async (result: AuditResult) => {
    const key = `${result.peptideSlug}-${result.storedStudy.title}`;
    
    setResolvedStudies(prev => ({
      ...prev,
      [key]: { ...result, isResolving: true }
    }));

    try {
      const { data, error } = await supabase.functions.invoke("resolve-pubmed-study", {
        body: {
          title: result.storedStudy.title,
          authors: result.storedStudy.authors,
          year: result.storedStudy.year
        }
      });

      if (error) throw error;

      const bestMatch = data?.bestMatch as ResolverCandidate | null;

      setResolvedStudies(prev => ({
        ...prev,
        [key]: {
          ...result,
          isResolving: false,
          suggestedPmid: bestMatch?.pmid,
          suggestedTitle: bestMatch?.title,
          suggestedSimilarity: bestMatch?.similarity,
          resolutionError: !bestMatch ? "No confident match found" : undefined
        }
      }));
    } catch (err) {
      setResolvedStudies(prev => ({
        ...prev,
        [key]: {
          ...result,
          isResolving: false,
          resolutionError: err instanceof Error ? err.message : "Failed to resolve"
        }
      }));
    }
  }, []);

  const resolveAllProblematic = useCallback(async () => {
    if (problematicResults.length === 0) return;

    setIsResolvingAll(true);
    setResolveProgress(0);

    for (let i = 0; i < problematicResults.length; i++) {
      const result = problematicResults[i];
      await resolveStudy(result);
      setResolveProgress(Math.round(((i + 1) / problematicResults.length) * 100));
      // Small delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 400));
    }

    setIsResolvingAll(false);
    toast({
      title: "Resolution complete",
      description: `Processed ${problematicResults.length} studies`
    });
  }, [problematicResults, resolveStudy, toast]);

  const generateFixReport = useCallback(() => {
    const fixes: string[] = [];
    const deletions: string[] = [];

    for (const result of enrichedResults) {
      if (result.status === "match") continue;
      
      const key = `${result.peptideSlug}-${result.storedStudy.title}`;
      const resolved = resolvedStudies[key];

      if (resolved?.suggestedPmid && resolved.suggestedSimilarity && resolved.suggestedSimilarity >= 0.4) {
        fixes.push(`// ${result.peptideSlug} - ${result.areaTitle}
// Stored: "${result.storedStudy.title}"
// Suggested: "${resolved.suggestedTitle}" (${(resolved.suggestedSimilarity * 100).toFixed(0)}% match)
{
  title: "${resolved.suggestedTitle}",
  pmid: "${resolved.suggestedPmid}",
  url: "https://pubmed.ncbi.nlm.nih.gov/${resolved.suggestedPmid}/",
  // Original URL: ${result.storedStudy.url}
}`);
      } else {
        deletions.push(`// DELETE - ${result.peptideSlug} - ${result.areaTitle}
// Title: "${result.storedStudy.title}"
// Reason: ${resolved?.resolutionError || "No confident match found in PubMed"}`);
      }
    }

    const report = `// Research Studies Fix Report
// Generated: ${new Date().toISOString()}
// Total problems: ${problematicResults.length}
// Suggested fixes: ${fixes.length}
// Suggested deletions: ${deletions.length}

// ============ FIXES ============
${fixes.join('\n\n')}

// ============ DELETIONS ============
${deletions.join('\n\n')}
`;

    navigator.clipboard.writeText(report);
    toast({
      title: "Report copied to clipboard",
      description: `${fixes.length} fixes, ${deletions.length} deletions`
    });
  }, [enrichedResults, resolvedStudies, problematicResults.length, toast]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Research Studies Audit</h1>
          <p className="text-muted-foreground mt-1">
            Verify and fix study titles to match their PubMed links
          </p>
        </div>

        {/* Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSearch className="w-5 h-5" />
              Audit Controls
            </CardTitle>
            <CardDescription>
              Compare {peptideList.length} peptides with {Object.values(peptideResearchData).reduce(
                (acc, p) => acc + p.researchAreas.reduce((a, area) => a + area.studies.length, 0), 0
              )} total studies against PubMed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 flex-wrap">
              <Button 
                onClick={() => runAudit()} 
                disabled={isAuditing || isResolvingAll}
                size="lg"
              >
                <Play className="w-4 h-4 mr-2" />
                {isAuditing ? "Auditing..." : "Run Full Audit"}
              </Button>
              
              {problematicResults.length > 0 && (
                <Button 
                  onClick={resolveAllProblematic}
                  disabled={isAuditing || isResolvingAll}
                  variant="secondary"
                  size="lg"
                >
                  <Wand2 className="w-4 h-4 mr-2" />
                  {isResolvingAll ? "Resolving..." : `Auto-Resolve ${problematicResults.length} Issues`}
                </Button>
              )}

              {Object.keys(resolvedStudies).length > 0 && (
                <Button 
                  onClick={generateFixReport}
                  variant="outline"
                  size="lg"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Fix Report
                </Button>
              )}
            </div>
            
            {(isAuditing || isResolvingAll) && (
              <div className="max-w-md">
                <Progress value={isAuditing ? progress : resolveProgress} className="h-2" />
                <p className="text-sm text-muted-foreground mt-1">
                  {isAuditing ? `Auditing: ${progress}%` : `Resolving: ${resolveProgress}%`}
                </p>
              </div>
            )}

            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive">
                {error}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Summary */}
        {summary && (
          <div className="grid gap-4 md:grid-cols-5">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{summary.total}</div>
                <p className="text-muted-foreground text-sm">Total Studies</p>
              </CardContent>
            </Card>
            <Card className="border-green-500/30">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-green-400">{summary.matches}</div>
                <p className="text-muted-foreground text-sm">Verified Matches</p>
              </CardContent>
            </Card>
            <Card className="border-red-500/30">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-red-400">{summary.mismatches}</div>
                <p className="text-muted-foreground text-sm">Title Mismatches</p>
              </CardContent>
            </Card>
            <Card className="border-yellow-500/30">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-yellow-400">{summary.notFound}</div>
                <p className="text-muted-foreground text-sm">PMID Not Found</p>
              </CardContent>
            </Card>
            <Card className="border-gray-500/30">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-gray-400">{summary.invalidUrls}</div>
                <p className="text-muted-foreground text-sm">Invalid URLs</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filter tabs */}
        {results.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {(["all", "mismatch", "not_found", "invalid_url", "match"] as const).map((f) => (
              <Button
                key={f}
                variant={filter === f ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(f)}
              >
                {f === "all" ? "All" : f.replace("_", " ").replace(/\b\w/g, c => c.toUpperCase())}
                {f !== "all" && (
                  <span className="ml-1 opacity-70">
                    ({results.filter(r => r.status === f).length})
                  </span>
                )}
              </Button>
            ))}
          </div>
        )}

        {/* Results */}
        {filteredResults.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Audit Results</CardTitle>
              <CardDescription>
                Showing {filteredResults.length} {filter === "all" ? "" : filter.replace("_", " ")} studies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-4">
                  {filteredResults.map((result, idx) => {
                    const key = `${result.peptideSlug}-${result.storedStudy.title}`;
                    const resolved = resolvedStudies[key];
                    
                    return (
                      <div 
                        key={`${result.peptideSlug}-${result.pmid || idx}`}
                        className="p-4 rounded-lg border border-border bg-card/50"
                      >
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="text-xs">
                                {result.peptideSlug}
                              </Badge>
                              <span className="text-muted-foreground text-xs">•</span>
                              <span className="text-muted-foreground text-xs">{result.areaTitle}</span>
                            </div>
                            {getStatusBadge(result.status)}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {result.status !== "match" && !resolved?.suggestedPmid && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => resolveStudy(result)}
                                disabled={resolved?.isResolving}
                              >
                                {resolved?.isResolving ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <RefreshCw className="w-4 h-4" />
                                )}
                                <span className="ml-1 text-xs">Resolve</span>
                              </Button>
                            )}
                            
                            {result.pmid && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyPmid(result.pmid!)}
                                >
                                  {copiedPmid === result.pmid ? (
                                    <Check className="w-4 h-4" />
                                  ) : (
                                    <Copy className="w-4 h-4" />
                                  )}
                                </Button>
                                <a
                                  href={pubmedUrl(result.pmid)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline text-sm flex items-center gap-1"
                                >
                                  PMID: {result.pmid}
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Stored Title:</p>
                            <p className="text-sm">{result.storedStudy.title}</p>
                          </div>
                          
                          {result.pubmedMetadata && (
                            <>
                              <Separator />
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">
                                  PubMed Title ({(result.similarity * 100).toFixed(0)}% match):
                                </p>
                                <p className="text-sm text-primary">{result.pubmedMetadata.title}</p>
                              </div>
                            </>
                          )}

                          {/* Suggested fix from resolver */}
                          {resolved?.suggestedPmid && (
                            <>
                              <Separator />
                              <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                                <p className="text-xs text-green-400 mb-1 font-medium flex items-center gap-1">
                                  <Wand2 className="w-3 h-3" />
                                  Suggested Fix ({(resolved.suggestedSimilarity! * 100).toFixed(0)}% match):
                                </p>
                                <p className="text-sm text-green-300">{resolved.suggestedTitle}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 text-xs"
                                    onClick={() => copyPmid(resolved.suggestedPmid!)}
                                  >
                                    {copiedPmid === resolved.suggestedPmid ? (
                                      <Check className="w-3 h-3 mr-1" />
                                    ) : (
                                      <Copy className="w-3 h-3 mr-1" />
                                    )}
                                    {resolved.suggestedPmid}
                                  </Button>
                                  <a
                                    href={pubmedUrl(resolved.suggestedPmid)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-green-400 hover:underline text-xs flex items-center gap-1"
                                  >
                                    View on PubMed
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                </div>
                              </div>
                            </>
                          )}

                          {resolved?.resolutionError && !resolved.suggestedPmid && (
                            <div className="p-2 bg-red-500/10 border border-red-500/30 rounded text-xs text-red-400">
                              ⚠️ {resolved.resolutionError} — Consider deleting this entry
                            </div>
                          )}

                          {result.status === "not_found" && !resolved && (
                            <p className="text-sm text-yellow-400">
                              PMID {result.pmid} was not found in PubMed. The study may have been retracted or the ID is incorrect.
                            </p>
                          )}

                          {result.status === "invalid_url" && !resolved && (
                            <p className="text-sm text-gray-400">
                              URL: {result.storedStudy.url}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
