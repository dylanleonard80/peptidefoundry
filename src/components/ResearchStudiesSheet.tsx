import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, BookOpen, AlertCircle, AlertTriangle } from "lucide-react";
import { ResearchStudy } from "@/data/researchStudies";
import { pubmedUrl, getPmidFromStudy, isPubMedUrl } from "@/lib/pubmedUtils";

interface ResearchStudiesSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  areaTitle: string;
  studies: ResearchStudy[];
  peptideName: string;
}

export function ResearchStudiesSheet({
  open,
  onOpenChange,
  areaTitle,
  studies,
  peptideName,
}: ResearchStudiesSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto" data-lenis-prevent>
        <SheetHeader className="mb-6">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <SheetTitle className="text-xl">{areaTitle}</SheetTitle>
          </div>
          <SheetDescription>
            Published research studies related to {peptideName} and {areaTitle.toLowerCase()}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4">
          {studies.map((study, index) => {
            // Use PMID if available, otherwise extract from URL
            const pmid = getPmidFromStudy(study);
            const studyUrl = pmid ? pubmedUrl(pmid) : study.url;
            const hasValidPmid = !!pmid;
            const hasValidUrl = hasValidPmid || isPubMedUrl(study.url);
            
            return (
              <Card key={index} className="border-border/50">
                <CardContent className="p-4 space-y-3">
                  <div>
                    {hasValidUrl ? (
                      <a
                        href={studyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-foreground hover:text-primary transition-colors inline-flex items-start gap-2 group"
                      >
                        <span className="flex-1 leading-snug">{study.title}</span>
                        <ExternalLink className="h-4 w-4 flex-shrink-0 mt-0.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ) : (
                      <div className="font-medium text-foreground inline-flex items-start gap-2">
                        <span className="flex-1 leading-snug">{study.title}</span>
                        <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5 text-yellow-500/70" />
                      </div>
                    )}
                  </div>
                  
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p className="font-medium">{study.authors}</p>
                    <p className="italic">
                      {study.journal}, {study.year}
                    </p>
                  </div>
                  
                  <p className="text-sm text-muted-foreground border-l-2 border-primary/30 pl-3">
                    {study.summary}
                  </p>
                  
                  {hasValidUrl ? (
                    <a
                      href={studyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                    >
                      View on PubMed
                      {pmid && <span className="text-muted-foreground text-xs ml-1">(PMID: {pmid})</span>}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                      <AlertTriangle className="h-3 w-3 text-yellow-500/70" />
                      <span className="italic">Link being verified</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border/50">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              These studies are provided for educational and research-use reference only. 
              They do not constitute medical advice, and no claims are made regarding human use. 
              All referenced studies are from peer-reviewed journals and publicly accessible databases.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
