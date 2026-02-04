import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Search, Download, ExternalLink } from "lucide-react";

interface PurchasedPeptide {
  name: string;
  orderNumber: string;
  orderDate: string;
}

const DashboardDocuments = () => {
  const { user } = useAuth();
  const [peptides, setPeptides] = useState<PurchasedPeptide[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPurchasedPeptides = async () => {
      if (!user) return;

      const { data: orders, error } = await supabase
        .from("orders")
        .select("order_number, created_at, items")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error && orders) {
        const allPeptides: PurchasedPeptide[] = [];
        const seenPeptides = new Set<string>();

        orders.forEach((order) => {
          const items = order.items as any[];
          items.forEach((item) => {
            if (!seenPeptides.has(item.name)) {
              seenPeptides.add(item.name);
              allPeptides.push({
                name: item.name,
                orderNumber: order.order_number,
                orderDate: order.created_at,
              });
            }
          });
        });

        setPeptides(allPeptides);
      }
      setLoading(false);
    };

    fetchPurchasedPeptides();
  }, [user]);

  const filteredPeptides = peptides.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <DashboardLayout title="Documents">
        <div className="space-y-4">
          <Skeleton className="h-10 w-full max-w-sm" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Documents">
      <div className="space-y-6">
        {/* Info Card */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Access Certificates of Analysis (COAs) for your purchased peptides.
              Each COA includes purity analysis, HPLC results, and mass spectrometry data.
            </p>
          </CardContent>
        </Card>

        {peptides.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No documents yet</h3>
              <p className="text-muted-foreground text-center">
                Your COAs will appear here once you've made a purchase.
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Search */}
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search peptides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Peptide List */}
            <div className="grid gap-4 md:grid-cols-2">
              {filteredPeptides.map((peptide, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{peptide.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Order: {peptide.orderNumber}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" disabled>
                        <Download className="h-4 w-4 mr-1" />
                        COA
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      COA documents are being processed and will be available soon.
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPeptides.length === 0 && searchQuery && (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No peptides matching "{searchQuery}"
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardDocuments;
