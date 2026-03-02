import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMembership } from "@/hooks/useMembership";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import {
  Hexagon,
  Check,
  CreditCard,
  Calendar,
  Package,
  Sparkles,
  Crown,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import FoundryClubLink from "@/components/FoundryClubLink";

const benefits = [
  { icon: Crown, text: "Wholesale pricing on all peptides" },
  { icon: Sparkles, text: "Priority customer support" },
  { icon: Package, text: "Early access to new products" },
];

const DashboardMembership = () => {
  const { isMember, subscriptionEnd, canceled, loading, checkMembership } = useMembership();
  const { user } = useAuth();
  const [orderCount, setOrderCount] = useState(0);
  const [memberSince, setMemberSince] = useState<string | null>(null);
  const [isCanceling, setIsCanceling] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const handleCancelMembership = async () => {
    setIsCanceling(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Session expired. Please sign in and try again.");
        return;
      }

      const { data: result, error } = await supabase.functions.invoke("cancel-subscription", {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      if (error) {
        let message = "Failed to cancel membership. Please contact support.";
        try {
          const body = JSON.parse(error.message);
          message = body.error || message;
        } catch {}
        toast.error(message);
        return;
      }

      toast.success("Membership canceled", {
        description: result.accessUntil
          ? `You'll retain access until ${format(new Date(result.accessUntil), "MMMM d, yyyy")}.`
          : "Your access will continue until the end of your billing period.",
      });

      setShowCancelConfirm(false);
      localStorage.removeItem("membership_cache");
      checkMembership();
    } catch (err) {
      console.error("Error canceling membership:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsCanceling(false);
    }
  };
  useEffect(() => {
    const fetchMemberData = async () => {
      if (!user) return;

      // Fetch order count
      const { count } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);

      if (count !== null) {
        setOrderCount(count);
      }

      // Fetch membership start date
      const { data: membership } = await supabase
        .from("memberships")
        .select("created_at")
        .eq("user_id", user.id)
        .eq("status", "active")
        .maybeSingle();

      if (membership?.created_at) {
        setMemberSince(membership.created_at);
      }
    };

    fetchMemberData();
  }, [user]);

  if (loading) {
    return (
      <DashboardLayout title="Foundry Club">
        <Card>
          <CardContent className="py-12">
            <div className="flex items-center justify-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
            </div>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Foundry Club">
      <div className="space-y-6">
        {isMember ? (
          <>
            {/* Active Membership Card */}
            <Card className="border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-primary/20">
                    <Hexagon className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-primary">
                      Active Foundry Club Member
                    </CardTitle>
                    <CardDescription>
                      {canceled
                        ? "Your membership will not renew"
                        : "Your membership is active"}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {memberSince && (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Member Since</p>
                        <p className="font-medium">
                          {format(new Date(memberSince), "MMMM d, yyyy")}
                        </p>
                      </div>
                    </div>
                  )}
                  {subscriptionEnd && (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {canceled ? "Access Until" : "Next Billing"}
                        </p>
                        <p className="font-medium">
                          {format(new Date(subscriptionEnd), "MMMM d, yyyy")}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                    <Package className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Orders Placed</p>
                      <p className="font-medium">{orderCount}</p>
                    </div>
                  </div>
                </div>

                {/* Cancel Membership */}
                {!canceled && (
                  <div className="pt-4 border-t">
                    {!showCancelConfirm ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowCancelConfirm(true)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        Cancel Membership
                      </Button>
                    ) : (
                      <div className="space-y-3 p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                        <p className="text-sm text-muted-foreground">
                          Are you sure? You'll retain access until{" "}
                          <span className="font-medium text-foreground">
                            {subscriptionEnd
                              ? format(new Date(subscriptionEnd), "MMMM d, yyyy")
                              : "the end of your billing period"}
                          </span>.
                        </p>
                        <div className="flex gap-2">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={handleCancelMembership}
                            disabled={isCanceling}
                          >
                            {isCanceling ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                Canceling...
                              </>
                            ) : (
                              "Yes, Cancel"
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowCancelConfirm(false)}
                            disabled={isCanceling}
                          >
                            Keep Membership
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>Your Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  {benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 rounded-lg border bg-muted/30"
                    >
                      <div className="p-2 rounded-full bg-primary/10">
                        <benefit.icon className="h-5 w-5 text-primary" />
                      </div>
                      <p className="font-medium text-sm">{benefit.text}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          /* Non-member Upsell */
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-8 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Hexagon className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Join The Foundry Club</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Unlock wholesale pricing and save 30% on every peptide purchase.
              </p>
            </div>
            <CardContent className="p-6">
              <div className="space-y-4 mb-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="p-1 rounded-full bg-green-100">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <p>{benefit.text}</p>
                  </div>
                ))}
              </div>
              <FoundryClubLink>
                <Button className="w-full" size="lg">
                  Explore Foundry Club
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </FoundryClubLink>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardMembership;
