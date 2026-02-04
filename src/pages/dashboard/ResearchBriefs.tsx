import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useMembership } from "@/hooks/useMembership";
import { supabase } from "@/integrations/supabase/client";
import { 
  Newspaper, 
  FlaskConical, 
  TestTube, 
  Sparkles, 
  Calendar,
  ChevronRight,
  Lock,
  AlertCircle
} from "lucide-react";
import { Link } from "react-router-dom";

interface ResearchDigest {
  id: string;
  week_of: string;
  title: string;
  summary: string | null;
  peptide_news: any[];
  clinical_trials: any[];
  research_findings: any[];
  highlights: string[];
  created_at: string;
}

const ResearchBriefs = () => {
  const { isMember, loading: memberLoading } = useMembership();
  const [digests, setDigests] = useState<ResearchDigest[]>([]);
  const [selectedDigest, setSelectedDigest] = useState<ResearchDigest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDigests = async () => {
      if (!isMember) {
        setLoading(false);
        return;
      }

      try {
        const { data: session } = await supabase.auth.getSession();
        if (!session?.session?.access_token) {
          setError("Please sign in to view research briefs");
          setLoading(false);
          return;
        }

        const response = await supabase.functions.invoke('get-research-digest', {
          headers: {
            Authorization: `Bearer ${session.session.access_token}`
          }
        });

        if (response.error) {
          throw new Error(response.error.message || 'Failed to fetch digests');
        }

        const data = response.data;
        setDigests(data.digests || []);
        if (data.latest) {
          setSelectedDigest(data.latest);
        }
      } catch (err: any) {
        console.error('Error fetching research digests:', err);
        setError(err.message || 'Failed to load research briefs');
      } finally {
        setLoading(false);
      }
    };

    if (!memberLoading) {
      fetchDigests();
    }
  }, [isMember, memberLoading]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Non-member view
  if (!memberLoading && !isMember) {
    return (
      <DashboardLayout title="Research Briefs">
        <Card className="border-primary/20">
          <CardContent className="pt-8 pb-8">
            <div className="text-center max-w-md mx-auto">
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 blur-xl bg-primary/30 rounded-full" />
                <div className="relative p-4 rounded-2xl bg-primary/10 border border-primary/20">
                  <Lock className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h2 className="text-xl font-bold mb-2">Members-Only Content</h2>
              <p className="text-muted-foreground mb-6">
                Weekly Research Briefs are an exclusive benefit for Foundry Club members. 
                Get AI-curated peptide news, clinical trials, and research findings delivered weekly.
              </p>
              <Button asChild>
                <Link to="/foundry-club">Join The Foundry Club</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  // Loading state
  if (loading || memberLoading) {
    return (
      <DashboardLayout title="Research Briefs">
        <div className="space-y-6">
          <Skeleton className="h-48 w-full" />
          <div className="grid md:grid-cols-2 gap-4">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Error state
  if (error) {
    return (
      <DashboardLayout title="Research Briefs">
        <Card className="border-destructive/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 text-destructive">
              <AlertCircle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  // Empty state
  if (digests.length === 0) {
    return (
      <DashboardLayout title="Research Briefs">
        <Card>
          <CardContent className="pt-8 pb-8">
            <div className="text-center max-w-md mx-auto">
              <div className="relative inline-block mb-4">
                <div className="p-4 rounded-2xl bg-muted">
                  <Newspaper className="h-8 w-8 text-muted-foreground" />
                </div>
              </div>
              <h2 className="text-xl font-bold mb-2">Coming Soon</h2>
              <p className="text-muted-foreground">
                Your weekly research briefs are being prepared. Check back soon for AI-curated 
                peptide news, clinical trials, and the latest research findings.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <Badge variant="outline">Clinical Trials</Badge>
                <Badge variant="outline">Research News</Badge>
                <Badge variant="outline">Industry Updates</Badge>
                <Badge variant="outline">Expert Insights</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Research Briefs">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Archive Sidebar */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Archive
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {digests.map((digest) => (
                <button
                  key={digest.id}
                  onClick={() => setSelectedDigest(digest)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedDigest?.id === digest.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  <p className="font-medium">Week of {formatDate(digest.week_of)}</p>
                  <p className={`text-xs ${
                    selectedDigest?.id === digest.id 
                      ? 'text-primary-foreground/70' 
                      : 'text-muted-foreground'
                  }`}>
                    {digest.highlights?.length || 0} highlights
                  </p>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 order-1 lg:order-2 space-y-6">
          {selectedDigest ? (
            <>
              {/* Header */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-primary/20 text-primary border-primary/30">
                      Weekly Brief
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl">{selectedDigest.title}</CardTitle>
                  {selectedDigest.summary && (
                    <CardDescription className="text-base">
                      {selectedDigest.summary}
                    </CardDescription>
                  )}
                </CardHeader>
              </Card>

              {/* Highlights */}
              {selectedDigest.highlights && selectedDigest.highlights.length > 0 && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      Key Highlights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {selectedDigest.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span className="text-sm">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Peptide News */}
              {selectedDigest.peptide_news && selectedDigest.peptide_news.length > 0 && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Newspaper className="h-4 w-4 text-primary" />
                      Peptide News
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedDigest.peptide_news.map((news: any, idx: number) => (
                      <div key={idx} className="border-l-2 border-primary/30 pl-4">
                        <h4 className="font-medium">{news.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{news.summary}</p>
                        {news.source && (
                          <p className="text-xs text-muted-foreground mt-2">Source: {news.source}</p>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Clinical Trials */}
              {selectedDigest.clinical_trials && selectedDigest.clinical_trials.length > 0 && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FlaskConical className="h-4 w-4 text-primary" />
                      Clinical Trials
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedDigest.clinical_trials.map((trial: any, idx: number) => (
                      <div key={idx} className="border-l-2 border-primary/30 pl-4">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{trial.title}</h4>
                          {trial.phase && (
                            <Badge variant="outline" className="text-xs">{trial.phase}</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{trial.summary}</p>
                        {trial.peptide && (
                          <Badge className="mt-2 bg-primary/10 text-primary border-0 text-xs">
                            {trial.peptide}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Research Findings */}
              {selectedDigest.research_findings && selectedDigest.research_findings.length > 0 && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TestTube className="h-4 w-4 text-primary" />
                      Research Findings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedDigest.research_findings.map((finding: any, idx: number) => (
                      <div key={idx} className="border-l-2 border-primary/30 pl-4">
                        <h4 className="font-medium">{finding.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{finding.summary}</p>
                        {finding.journal && (
                          <p className="text-xs text-muted-foreground mt-2 italic">{finding.journal}</p>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground text-center">
                  Select a digest from the archive to view
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ResearchBriefs;
