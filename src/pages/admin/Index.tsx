import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminGuard } from "@/hooks/useAdminGuard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { AdminOrder } from "@/types/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DollarSign, ShoppingCart, Package, Users, CheckCircle } from "lucide-react";
import { format } from "date-fns";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

interface StockProduct {
  name: string;
  slug: string;
  in_stock: boolean;
}

const AdminIndex = () => {
  const { isAdmin, loading: guardLoading } = useAdminGuard();
  const { toast } = useToast();
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [products, setProducts] = useState<StockProduct[]>([]);
  const [memberCount, setMemberCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) return;

    const fetchData = async () => {
      const [ordersRes, productsRes, membersRes] = await Promise.all([
        supabase
          .from("orders")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("products" as any)
          .select("name, slug, in_stock"),
        supabase
          .from("memberships")
          .select("id", { count: "exact", head: true })
          .eq("status", "active"),
      ]);

      if (ordersRes.error) {
        toast({ title: "Error loading orders", description: ordersRes.error.message, variant: "destructive" });
      } else {
        setOrders((ordersRes.data as unknown as AdminOrder[]) || []);
      }

      if (productsRes.error) {
        toast({ title: "Error loading products", description: productsRes.error.message, variant: "destructive" });
      } else {
        setProducts((productsRes.data as any as StockProduct[]) || []);
      }

      if (!membersRes.error && membersRes.count !== null) {
        setMemberCount(membersRes.count);
      }

      setLoading(false);
    };

    fetchData();
  }, [isAdmin, toast]);

  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.total, 0);

  const totalOrders = orders.length;
  const inStockCount = products.filter((p) => p.in_stock).length;
  const totalProducts = products.length;
  const outOfStockProducts = products.filter((p) => !p.in_stock);
  const recentOrders = orders.slice(0, 5);

  if (guardLoading || loading) {
    return (
      <AdminLayout title="Dashboard">
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!isAdmin) return null;

  return (
    <AdminLayout title="Dashboard">
      {/* Row 1 — Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100">
                <DollarSign className="h-5 w-5 text-green-700" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-muted-foreground">Total Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100">
                <ShoppingCart className="h-5 w-5 text-blue-700" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalOrders}</p>
                <p className="text-xs text-muted-foreground">Total Orders</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-100">
                <Package className="h-5 w-5 text-orange-700" />
              </div>
              <div>
                <p className="text-2xl font-bold">{inStockCount}/{totalProducts}</p>
                <p className="text-xs text-muted-foreground">Products In Stock</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-100">
                <Users className="h-5 w-5 text-purple-700" />
              </div>
              <div>
                <p className="text-2xl font-bold">{memberCount}</p>
                <p className="text-xs text-muted-foreground">Active Members</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 2 — Recent Orders + Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {recentOrders.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">No orders yet</div>
            ) : (
              <div className="divide-y">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between px-6 py-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm">{order.order_number}</span>
                        <Badge className={statusColors[order.status || "pending"]} variant="secondary">
                          {order.status?.charAt(0).toUpperCase()}{order.status?.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {order.created_at ? format(new Date(order.created_at), "MMM d, yyyy") : "—"}
                      </p>
                    </div>
                    <span className="font-mono font-medium ml-4">${order.total.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <div className="px-6 py-3 border-t">
            <Link to="/admin/orders" className="text-sm text-primary hover:underline">
              View All Orders &rarr;
            </Link>
          </div>
        </Card>

        {/* Stock Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Stock Alerts</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {outOfStockProducts.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground flex flex-col items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <span>All products in stock</span>
              </div>
            ) : (
              <div className="divide-y">
                {outOfStockProducts.map((product) => (
                  <div key={product.slug} className="flex items-center justify-between px-6 py-3">
                    <span className="text-sm font-medium">{product.name}</span>
                    <Badge variant="secondary" className="bg-red-100 text-red-800">
                      Out of Stock
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <div className="px-6 py-3 border-t">
            <Link to="/admin/inventory" className="text-sm text-primary hover:underline">
              Manage Inventory &rarr;
            </Link>
          </div>
        </Card>
      </div>

      {/* Row 3 — Quick Actions */}
      <div className="flex gap-3">
        <Button variant="outline" asChild>
          <Link to="/admin/orders">Manage Orders</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/admin/inventory">Manage Inventory</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/admin/sales">View Sales</Link>
        </Button>
      </div>
    </AdminLayout>
  );
};

export default AdminIndex;
