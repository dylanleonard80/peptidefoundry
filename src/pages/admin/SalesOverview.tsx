import { useEffect, useState, useMemo } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminGuard } from "@/hooks/useAdminGuard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { AdminOrder, SalesMetrics, DailyRevenue, OrderItem } from "@/types/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { DollarSign, ShoppingCart, TrendingUp, TrendingDown, Users, ArrowUp, ArrowDown, UserCheck, UserX } from "lucide-react";
import { format, subDays, parseISO, startOfDay } from "date-fns";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

type Period = "7" | "30" | "90";

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(24, 72%, 50%)",
  },
};

interface TopProduct {
  name: string;
  unitsSold: number;
  revenue: number;
}

interface UserSplit {
  registeredCount: number;
  registeredRevenue: number;
  guestCount: number;
  guestRevenue: number;
}

function parseOrderItems(order: AdminOrder): OrderItem[] {
  return (order.items as unknown as OrderItem[]) || [];
}

function getItemName(item: OrderItem): string {
  return item.peptide_name || item.name || "Unknown Product";
}

function pctChange(current: number, previous: number): number | null {
  if (previous === 0) return current > 0 ? 100 : null;
  return ((current - previous) / previous) * 100;
}

const AdminSalesOverview = () => {
  const { isAdmin, loading: guardLoading } = useAdminGuard();
  const { toast } = useToast();
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [memberCount, setMemberCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<Period>("30");

  useEffect(() => {
    if (!isAdmin) return;

    const fetchData = async () => {
      // Fetch all orders (no join — no direct FK to profiles)
      const { data: ordersRaw, error: ordersError } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (ordersError) {
        toast({ title: "Error loading orders", description: ordersError.message, variant: "destructive" });
      } else {
        const rawOrders = (ordersRaw as unknown as AdminOrder[]) || [];

        // Fetch profiles for user_ids
        const userIds = [...new Set(rawOrders.map((o) => o.user_id).filter(Boolean))] as string[];
        let profileMap: Record<string, { first_name: string; last_name: string; email: string | null }> = {};
        if (userIds.length > 0) {
          const { data: profiles } = await supabase
            .from("profiles")
            .select("id, first_name, last_name, email")
            .in("id", userIds);
          if (profiles) {
            (profiles as any[]).forEach((p) => {
              profileMap[p.id] = { first_name: p.first_name, last_name: p.last_name, email: p.email };
            });
          }
        }

        setOrders(rawOrders.map((o) => ({
          ...o,
          profiles: o.user_id ? profileMap[o.user_id] || null : null,
        })));
      }

      // Count active members
      const { count, error: membError } = await supabase
        .from("memberships")
        .select("id", { count: "exact", head: true })
        .eq("status", "active");

      if (!membError && count !== null) setMemberCount(count);

      setLoading(false);
    };

    fetchData();
  }, [isAdmin, toast]);

  const cutoffDate = useMemo(() => subDays(new Date(), parseInt(period)), [period]);

  // Previous period cutoff for comparison
  const prevCutoffDate = useMemo(() => subDays(new Date(), parseInt(period) * 2), [period]);

  const periodOrders = useMemo(
    () =>
      orders.filter(
        (o) =>
          o.created_at &&
          new Date(o.created_at) >= cutoffDate &&
          o.status !== "cancelled"
      ),
    [orders, cutoffDate]
  );

  const prevPeriodOrders = useMemo(
    () =>
      orders.filter(
        (o) =>
          o.created_at &&
          new Date(o.created_at) >= prevCutoffDate &&
          new Date(o.created_at) < cutoffDate &&
          o.status !== "cancelled"
      ),
    [orders, cutoffDate, prevCutoffDate]
  );

  const metrics: SalesMetrics = useMemo(() => {
    const totalRevenue = periodOrders.reduce((sum, o) => sum + o.total, 0);
    const orderCount = periodOrders.length;
    return {
      totalRevenue,
      orderCount,
      avgOrderValue: orderCount > 0 ? totalRevenue / orderCount : 0,
      activeMemberCount: memberCount,
    };
  }, [periodOrders, memberCount]);

  const prevMetrics: SalesMetrics = useMemo(() => {
    const totalRevenue = prevPeriodOrders.reduce((sum, o) => sum + o.total, 0);
    const orderCount = prevPeriodOrders.length;
    return {
      totalRevenue,
      orderCount,
      avgOrderValue: orderCount > 0 ? totalRevenue / orderCount : 0,
      activeMemberCount: memberCount,
    };
  }, [prevPeriodOrders, memberCount]);

  // Top products ranking
  const topProducts: TopProduct[] = useMemo(() => {
    const productMap: Record<string, TopProduct> = {};

    periodOrders.forEach((order) => {
      const items = parseOrderItems(order);
      items.forEach((item) => {
        const name = getItemName(item);
        if (!productMap[name]) {
          productMap[name] = { name, unitsSold: 0, revenue: 0 };
        }
        productMap[name].unitsSold += item.quantity || 1;
        productMap[name].revenue += (item.price || 0) * (item.quantity || 1);
      });
    });

    return Object.values(productMap)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10);
  }, [periodOrders]);

  // Member vs Guest split
  const userSplit: UserSplit = useMemo(() => {
    const result: UserSplit = {
      registeredCount: 0,
      registeredRevenue: 0,
      guestCount: 0,
      guestRevenue: 0,
    };

    periodOrders.forEach((order) => {
      if (order.user_id) {
        result.registeredCount++;
        result.registeredRevenue += order.total;
      } else {
        result.guestCount++;
        result.guestRevenue += order.total;
      }
    });

    return result;
  }, [periodOrders]);

  const chartData: DailyRevenue[] = useMemo(() => {
    const days = parseInt(period);
    const buckets: Record<string, DailyRevenue> = {};

    // Initialize all days
    for (let i = days - 1; i >= 0; i--) {
      const date = format(subDays(new Date(), i), "yyyy-MM-dd");
      buckets[date] = { date, revenue: 0, orders: 0 };
    }

    // Aggregate orders
    periodOrders.forEach((o) => {
      if (!o.created_at) return;
      const key = format(new Date(o.created_at), "yyyy-MM-dd");
      if (buckets[key]) {
        buckets[key].revenue += o.total;
        buckets[key].orders += 1;
      }
    });

    return Object.values(buckets);
  }, [periodOrders, period]);

  const recentOrders = orders.slice(0, 10);

  const getCustomerName = (order: AdminOrder) => {
    if (order.profiles) {
      return `${order.profiles.first_name} ${order.profiles.last_name}`.trim() || order.profiles.email || "—";
    }
    return order.guest_email || "Guest";
  };

  if (guardLoading || loading) {
    return (
      <AdminLayout title="Sales Overview">
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
          <Skeleton className="h-64 w-full" />
        </div>
      </AdminLayout>
    );
  }

  if (!isAdmin) return null;

  const revenueChange = pctChange(metrics.totalRevenue, prevMetrics.totalRevenue);
  const ordersChange = pctChange(metrics.orderCount, prevMetrics.orderCount);
  const aovChange = pctChange(metrics.avgOrderValue, prevMetrics.avgOrderValue);

  const totalSplitOrders = userSplit.registeredCount + userSplit.guestCount;
  const registeredPct = totalSplitOrders > 0 ? (userSplit.registeredCount / totalSplitOrders) * 100 : 0;
  const guestPct = totalSplitOrders > 0 ? (userSplit.guestCount / totalSplitOrders) * 100 : 0;

  const totalSplitRevenue = userSplit.registeredRevenue + userSplit.guestRevenue;
  const registeredRevPct = totalSplitRevenue > 0 ? (userSplit.registeredRevenue / totalSplitRevenue) * 100 : 0;
  const guestRevPct = totalSplitRevenue > 0 ? (userSplit.guestRevenue / totalSplitRevenue) * 100 : 0;

  return (
    <AdminLayout title="Sales Overview">
      {/* Period selector */}
      <div className="flex justify-end mb-4">
        <Select value={period} onValueChange={(v) => setPeriod(v as Period)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Metrics cards with period comparison */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100">
                <DollarSign className="h-5 w-5 text-green-700" />
              </div>
              <div className="min-w-0">
                <p className="text-2xl font-bold">${metrics.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <p className="text-xs text-muted-foreground">Total Revenue</p>
                <TrendIndicator change={revenueChange} />
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
              <div className="min-w-0">
                <p className="text-2xl font-bold">{metrics.orderCount}</p>
                <p className="text-xs text-muted-foreground">Orders</p>
                <TrendIndicator change={ordersChange} />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-100">
                <TrendingUp className="h-5 w-5 text-orange-700" />
              </div>
              <div className="min-w-0">
                <p className="text-2xl font-bold">${metrics.avgOrderValue.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">Avg Order Value</p>
                <TrendIndicator change={aovChange} />
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
              <div className="min-w-0">
                <p className="text-2xl font-bold">{metrics.activeMemberCount}</p>
                <p className="text-xs text-muted-foreground">Active Members</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue chart */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Revenue — Last {period} Days</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[280px] w-full">
            <BarChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => {
                  const d = parseISO(val);
                  return parseInt(period) <= 7
                    ? format(d, "EEE")
                    : format(d, "MMM d");
                }}
                interval={parseInt(period) <= 7 ? 0 : "preserveStartEnd"}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `$${val}`}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelFormatter={(label) => format(parseISO(label as string), "MMM d, yyyy")}
                    formatter={(value) => [`$${Number(value).toFixed(2)}`, "Revenue"]}
                  />
                }
              />
              <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Registered vs Guest split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardContent className="pt-5 pb-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-emerald-100">
                <UserCheck className="h-5 w-5 text-emerald-700" />
              </div>
              <div>
                <p className="text-sm font-medium">Registered Users</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <p className="text-2xl font-bold">{userSplit.registeredCount}</p>
                <p className="text-xs text-muted-foreground">Orders ({registeredPct.toFixed(0)}%)</p>
              </div>
              <div>
                <p className="text-2xl font-bold">${userSplit.registeredRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <p className="text-xs text-muted-foreground">Revenue ({registeredRevPct.toFixed(0)}%)</p>
              </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="bg-emerald-500 h-2 rounded-full transition-all"
                style={{ width: `${registeredRevPct}%` }}
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-slate-100">
                <UserX className="h-5 w-5 text-slate-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Guest Orders</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <p className="text-2xl font-bold">{userSplit.guestCount}</p>
                <p className="text-xs text-muted-foreground">Orders ({guestPct.toFixed(0)}%)</p>
              </div>
              <div>
                <p className="text-2xl font-bold">${userSplit.guestRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <p className="text-xs text-muted-foreground">Revenue ({guestRevPct.toFixed(0)}%)</p>
              </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="bg-slate-400 h-2 rounded-full transition-all"
                style={{ width: `${guestRevPct}%` }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Top Products — Last {period} Days</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {topProducts.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">No product data for this period</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="px-6 py-3 font-medium w-12">#</th>
                    <th className="px-6 py-3 font-medium">Product</th>
                    <th className="px-6 py-3 font-medium text-right">Units Sold</th>
                    <th className="px-6 py-3 font-medium text-right">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {topProducts.map((product, index) => (
                    <tr key={product.name} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-3 font-mono text-muted-foreground">{index + 1}</td>
                      <td className="px-6 py-3 font-medium">{product.name}</td>
                      <td className="px-6 py-3 text-right tabular-nums">{product.unitsSold}</td>
                      <td className="px-6 py-3 text-right font-mono tabular-nums">${product.revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent orders */}
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
                    <p className="text-sm text-muted-foreground truncate">
                      {getCustomerName(order)} &middot;{" "}
                      {order.created_at ? format(new Date(order.created_at), "MMM d, yyyy") : "—"}
                    </p>
                  </div>
                  <span className="font-mono font-medium ml-4">${order.total.toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

/** Small inline component for trend arrows with percentage change */
function TrendIndicator({ change }: { change: number | null }) {
  if (change === null) return null;

  const isPositive = change >= 0;
  const colorClass = isPositive ? "text-green-600" : "text-red-600";
  const Icon = isPositive ? ArrowUp : ArrowDown;

  return (
    <div className={`flex items-center gap-0.5 mt-0.5 ${colorClass}`}>
      <Icon className="h-3 w-3" />
      <span className="text-xs font-medium">{Math.abs(change).toFixed(1)}%</span>
      <span className="text-xs text-muted-foreground ml-0.5">vs prior</span>
    </div>
  );
}

export default AdminSalesOverview;
