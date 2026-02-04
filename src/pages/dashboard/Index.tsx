import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useMembership } from "@/hooks/useMembership";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { Hexagon, Package, Calendar, ShoppingCart, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { Json } from "@/integrations/supabase/types";

interface OrderItem {
  name?: string;
  peptide_name?: string;
  size: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  order_number: string;
  created_at: string;
  total: number;
  status: string | null;
  items: Json;
}

const DashboardIndex = () => {
  const { profile, user } = useAuth();
  const { isMember, subscriptionEnd } = useMembership();
  const { addItem } = useCart();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5);

      if (!error && data) {
        setOrders(data as Order[]);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [user]);

  const totalOrders = orders.length;
  const lastOrderDate = orders[0]?.created_at;
  
  // Extract recent purchased peptides for reorder
  const recentPeptides = orders
    .flatMap(order => (order.items as unknown as OrderItem[]) || [])
    .slice(0, 6);

  const handleReorder = (item: OrderItem) => {
    const peptideName = item.peptide_name || item.name || "Unknown";
    addItem({
      peptide_name: peptideName,
      price: item.price,
      size: item.size,
    });
  };

  return (
    <DashboardLayout title="Overview">
      <div className="space-y-6">
        {/* Welcome & Membership Card */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
            <CardTitle className="text-xl">
              Welcome back, {profile?.first_name || "there"}!
            </CardTitle>
            <CardDescription>
              Here's what's happening with your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isMember ? (
              <div className="flex items-center gap-4 p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="p-3 rounded-full bg-primary/20">
                  <Hexagon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-primary">Foundry Club Member</p>
                  <p className="text-sm text-muted-foreground">
                    {subscriptionEnd
                      ? `Renews ${format(new Date(subscriptionEnd), "MMMM d, yyyy")}`
                      : "Active membership"}
                  </p>
                </div>
                <Link to="/dashboard/membership">
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted border">
                <div className="p-3 rounded-full bg-muted-foreground/10">
                  <Hexagon className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Not a member yet</p>
                  <p className="text-sm text-muted-foreground">
                    Join The Foundry Club for wholesale pricing
                  </p>
                </div>
                <Link to="/foundry-club">
                  <Button size="sm">
                    Explore
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Quick Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {loading ? (
                <>
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </>
              ) : (
                <>
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{totalOrders}</p>
                      <p className="text-sm text-muted-foreground">Total Orders</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold">
                        {lastOrderDate
                          ? format(new Date(lastOrderDate), "MMM d, yyyy")
                          : "No orders yet"}
                      </p>
                      <p className="text-sm text-muted-foreground">Last Order</p>
                    </div>
                  </div>
                </>
              )}
              <Link to="/dashboard/orders" className="block pt-2">
                <Button variant="outline" className="w-full">
                  View All Orders
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Quick Reorder Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Reorder</CardTitle>
              <CardDescription>Your recent purchases</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-2">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : recentPeptides.length > 0 ? (
                <div className="space-y-2">
                  {recentPeptides.slice(0, 4).map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div>
                        <p className="font-medium text-sm">{item.peptide_name || item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.size}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleReorder(item)}
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <p>No orders yet</p>
                  <Link to="/all-peptides">
                    <Button variant="link" className="mt-2">
                      Browse Catalog
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardIndex;
