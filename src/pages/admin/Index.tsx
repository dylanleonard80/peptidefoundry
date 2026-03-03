import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminGuard } from "@/hooks/useAdminGuard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { AdminOrder } from "@/types/admin";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  CheckCircle,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";
import { format } from "date-fns";

const statusConfig: Record<string, { dot: string; label: string }> = {
  pending: { dot: "bg-amber-400", label: "Pending" },
  processing: { dot: "bg-blue-400", label: "Processing" },
  shipped: { dot: "bg-violet-400", label: "Shipped" },
  delivered: { dot: "bg-emerald-400", label: "Delivered" },
  cancelled: { dot: "bg-red-400", label: "Cancelled" },
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
    .reduce((sum, o) => sum + Number(o.total), 0);

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
              <Skeleton key={i} className="h-28 w-full rounded-xl" />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Skeleton className="h-72 w-full rounded-xl" />
            <Skeleton className="h-72 w-full rounded-xl" />
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!isAdmin) return null;

  const metricCards = [
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: DollarSign,
      accent: "text-emerald-600",
      accentBg: "bg-emerald-50",
      border: "border-l-emerald-500",
    },
    {
      label: "Total Orders",
      value: totalOrders.toString(),
      icon: ShoppingCart,
      accent: "text-blue-600",
      accentBg: "bg-blue-50",
      border: "border-l-blue-500",
    },
    {
      label: "Products In Stock",
      value: `${inStockCount}/${totalProducts}`,
      icon: Package,
      accent: "text-primary",
      accentBg: "bg-orange-50",
      border: "border-l-primary",
    },
    {
      label: "Active Members",
      value: memberCount.toString(),
      icon: Users,
      accent: "text-violet-600",
      accentBg: "bg-violet-50",
      border: "border-l-violet-500",
    },
  ];

  return (
    <AdminLayout title="Dashboard">
      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {metricCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.label} className={`border-l-[3px] ${card.border} overflow-hidden`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[22px] font-bold tracking-tight leading-none mb-1.5">
                      {card.value}
                    </p>
                    <p className="text-xs text-muted-foreground font-medium">{card.label}</p>
                  </div>
                  <div className={`p-2 rounded-lg ${card.accentBg}`}>
                    <Icon className={`h-4 w-4 ${card.accent}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Orders + Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Orders — takes 2 columns */}
        <Card className="lg:col-span-2 overflow-hidden">
          <div className="flex items-center justify-between px-5 pt-5 pb-3">
            <h3 className="text-sm font-semibold tracking-tight">Recent Orders</h3>
            <Link
              to="/admin/orders"
              className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-medium transition-colors"
            >
              View All
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <CardContent className="p-0">
            {recentOrders.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground text-sm">No orders yet</div>
            ) : (
              <div className="divide-y divide-border/50">
                {recentOrders.map((order) => {
                  const status = statusConfig[order.status || "pending"];
                  return (
                    <div key={order.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-muted/30 transition-colors">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-sm font-medium">{order.order_number}</span>
                          <div className="flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                            <span className="text-xs text-muted-foreground">{status.label}</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {order.created_at ? format(new Date(order.created_at), "MMM d, yyyy") : "\u2014"}
                        </p>
                      </div>
                      <span className="font-mono text-sm font-semibold tabular-nums">${order.total.toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stock Alerts */}
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between px-5 pt-5 pb-3">
            <h3 className="text-sm font-semibold tracking-tight">Stock Alerts</h3>
            <Link
              to="/admin/inventory"
              className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Inventory
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <CardContent className="p-0">
            {outOfStockProducts.length === 0 ? (
              <div className="py-12 text-center flex flex-col items-center gap-2">
                <div className="p-2.5 rounded-full bg-emerald-50">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                </div>
                <span className="text-sm text-muted-foreground">All products in stock</span>
              </div>
            ) : (
              <div className="divide-y divide-border/50">
                {outOfStockProducts.map((product) => (
                  <div key={product.slug} className="flex items-center gap-3 px-5 py-3 hover:bg-muted/30 transition-colors">
                    <AlertTriangle className="h-3.5 w-3.5 text-red-400 shrink-0" />
                    <span className="text-sm font-medium truncate flex-1">{product.name}</span>
                    <Badge variant="secondary" className="bg-red-50 text-red-600 border-0 text-[10px] font-semibold shrink-0">
                      Out of Stock
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { to: "/admin/orders", label: "Orders", icon: ShoppingCart },
          { to: "/admin/inventory", label: "Inventory", icon: Package },
          { to: "/admin/memberships", label: "Memberships", icon: Users },
          { to: "/admin/sales", label: "Sales", icon: DollarSign },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border/60 bg-card hover:bg-muted/40 hover:border-primary/20 transition-all duration-200 group"
            >
              <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium">{item.label}</span>
              <ArrowRight className="h-3 w-3 text-muted-foreground/50 ml-auto group-hover:text-primary/50 transition-colors" />
            </Link>
          );
        })}
      </div>
    </AdminLayout>
  );
};

export default AdminIndex;
