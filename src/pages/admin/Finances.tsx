import { useEffect, useState, useMemo, useCallback } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminGuard } from "@/hooks/useAdminGuard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type {
  AdminOrder,
  PurchaseOrder,
  PurchaseOrderItem,
  PurchaseOrderStatus,
  Expense,
  ExpenseCategory,
  FinancialSummary,
} from "@/types/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Receipt,
  Plus,
  Trash2,
  Loader2,
  PackageCheck,
  Pencil,
} from "lucide-react";
import { format, subDays, parseISO } from "date-fns";

type Period = "7" | "30" | "90" | "all";

const categoryColors: Record<ExpenseCategory, string> = {
  cogs: "bg-blue-50 text-blue-700 border-blue-200",
  operating: "bg-amber-50 text-amber-700 border-amber-200",
  startup: "bg-violet-50 text-violet-700 border-violet-200",
};

const categoryLabels: Record<ExpenseCategory, string> = {
  cogs: "COGS",
  operating: "Operating",
  startup: "Startup",
};

const poStatusColors: Record<PurchaseOrderStatus, string> = {
  ordered: "bg-amber-50 text-amber-700 border-amber-200",
  received: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const AdminFinances = () => {
  const { isAdmin, loading: guardLoading } = useAdminGuard();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<Period>("all");

  // Data
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // PO Dialog
  const [poDialogOpen, setPoDialogOpen] = useState(false);
  const [poSubmitting, setPoSubmitting] = useState(false);
  const [editingPo, setEditingPo] = useState<PurchaseOrder | null>(null);
  const [poSupplier, setPoSupplier] = useState("");
  const [poDate, setPoDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [poStatus, setPoStatus] = useState<PurchaseOrderStatus>("ordered");
  const [poNotes, setPoNotes] = useState("");
  const [poItems, setPoItems] = useState<PurchaseOrderItem[]>([
    { description: "", quantity: 1, unit_cost: 0, subtotal: 0 },
  ]);

  // Expense Dialog
  const [expDialogOpen, setExpDialogOpen] = useState(false);
  const [expSubmitting, setExpSubmitting] = useState(false);
  const [editingExp, setEditingExp] = useState<Expense | null>(null);
  const [expCategory, setExpCategory] = useState<ExpenseCategory>("operating");
  const [expDescription, setExpDescription] = useState("");
  const [expAmount, setExpAmount] = useState<number>(0);
  const [expDate, setExpDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [expNotes, setExpNotes] = useState("");

  // Expense category filter
  const [expCategoryFilter, setExpCategoryFilter] = useState<"all" | ExpenseCategory>("all");

  const poTotal = poItems.reduce((sum, i) => sum + i.quantity * i.unit_cost, 0);

  const fetchData = useCallback(async () => {
    const [ordersRes, poRes, expRes] = await Promise.all([
      supabase.from("orders").select("*").order("created_at", { ascending: false }),
      supabase.from("purchase_orders" as any).select("*").order("order_date", { ascending: false }),
      supabase.from("expenses" as any).select("*").order("expense_date", { ascending: false }),
    ]);

    if (ordersRes.data) setOrders(ordersRes.data as unknown as AdminOrder[]);
    if (poRes.data) setPurchaseOrders(poRes.data as unknown as PurchaseOrder[]);
    if (expRes.data) setExpenses(expRes.data as unknown as Expense[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isAdmin) fetchData();
  }, [isAdmin, fetchData]);

  // P&L calculations
  const cutoffDate = useMemo(
    () => (period === "all" ? new Date(0) : subDays(new Date(), parseInt(period))),
    [period]
  );

  const summary: FinancialSummary = useMemo(() => {
    const periodOrders = orders.filter(
      (o) => o.created_at && new Date(o.created_at) >= cutoffDate && o.status !== "cancelled"
    );
    const periodExpenses = expenses.filter(
      (e) => e.expense_date && new Date(e.expense_date) >= cutoffDate
    );

    const websiteRevenue = periodOrders
      .filter((o) => (o as any).source !== "manual")
      .reduce((sum, o) => sum + Number(o.total), 0);
    const manualRevenue = periodOrders
      .filter((o) => (o as any).source === "manual")
      .reduce((sum, o) => sum + Number(o.total), 0);
    const totalRevenue = websiteRevenue + manualRevenue;

    const cogsExpenses = periodExpenses
      .filter((e) => e.category === "cogs")
      .reduce((sum, e) => sum + Number(e.amount), 0);
    const operatingExpenses = periodExpenses
      .filter((e) => e.category === "operating")
      .reduce((sum, e) => sum + Number(e.amount), 0);
    const startupExpenses = periodExpenses
      .filter((e) => e.category === "startup")
      .reduce((sum, e) => sum + Number(e.amount), 0);
    const totalExpenses = cogsExpenses + operatingExpenses + startupExpenses;

    return {
      totalRevenue,
      websiteRevenue,
      manualRevenue,
      totalExpenses,
      cogsExpenses,
      operatingExpenses,
      startupExpenses,
      grossProfit: totalRevenue - cogsExpenses,
      netProfit: totalRevenue - totalExpenses,
    };
  }, [orders, expenses, cutoffDate]);

  // Revenue vs Expenses chart data (weekly buckets)
  const revenueVsExpenseData = useMemo(() => {
    // For "all", compute days from earliest data to now
    const days = period === "all"
      ? Math.max(
          ...orders.filter((o) => o.created_at).map((o) => Math.ceil((Date.now() - new Date(o.created_at!).getTime()) / 86400000)),
          ...expenses.filter((e) => e.expense_date).map((e) => Math.ceil((Date.now() - new Date(e.expense_date).getTime()) / 86400000)),
          30,
        )
      : parseInt(period);
    // Use weekly buckets for 30+ day periods, daily for 7
    const bucketDays = days <= 7 ? 1 : 7;
    const bucketCount = Math.ceil(days / bucketDays);
    const buckets: { label: string; revenue: number; expenses: number }[] = [];

    for (let i = bucketCount - 1; i >= 0; i--) {
      const bucketEnd = subDays(new Date(), i * bucketDays);
      const bucketStart = subDays(bucketEnd, bucketDays);
      const label = bucketDays === 1
        ? format(bucketEnd, "MMM d")
        : `${format(bucketStart, "MMM d")}`;

      const revenue = orders
        .filter((o) => {
          if (!o.created_at || o.status === "cancelled") return false;
          const d = new Date(o.created_at);
          return d > bucketStart && d <= bucketEnd;
        })
        .reduce((sum, o) => sum + Number(o.total), 0);

      const expenseTotal = expenses
        .filter((e) => {
          if (!e.expense_date) return false;
          const d = new Date(e.expense_date);
          return d > bucketStart && d <= bucketEnd;
        })
        .reduce((sum, e) => sum + Number(e.amount), 0);

      buckets.push({ label, revenue, expenses: expenseTotal });
    }

    return buckets;
  }, [orders, expenses, period]);

  // Expense breakdown pie chart data
  const expensePieData = useMemo(() => {
    const data = [
      { name: "COGS", value: summary.cogsExpenses, color: "#3b82f6" },
      { name: "Operating", value: summary.operatingExpenses, color: "#f59e0b" },
      { name: "Startup", value: summary.startupExpenses, color: "#8b5cf6" },
    ].filter((d) => d.value > 0);
    return data;
  }, [summary]);

  const pnlChartConfig = {
    revenue: { label: "Revenue", color: "#10b981" },
    expenses: { label: "Expenses", color: "#ef4444" },
  };

  // --- PO handlers ---
  const resetPoForm = () => {
    setEditingPo(null);
    setPoSupplier("");
    setPoDate(new Date().toISOString().split("T")[0]);
    setPoStatus("ordered");
    setPoNotes("");
    setPoItems([{ description: "", quantity: 1, unit_cost: 0, subtotal: 0 }]);
  };

  const openEditPo = (po: PurchaseOrder) => {
    setEditingPo(po);
    setPoSupplier(po.supplier_name);
    setPoDate(po.order_date);
    setPoStatus(po.status);
    setPoNotes(po.notes || "");
    setPoItems(
      po.items.length > 0
        ? po.items.map((i) => ({ ...i }))
        : [{ description: "", quantity: 1, unit_cost: 0, subtotal: 0 }]
    );
    setPoDialogOpen(true);
  };

  const handleSavePo = async () => {
    if (!poSupplier.trim()) {
      toast({ title: "Supplier name is required", variant: "destructive" });
      return;
    }
    setPoSubmitting(true);

    const itemsWithSubtotals = poItems
      .filter((i) => i.description.trim())
      .map((i) => ({ ...i, subtotal: i.quantity * i.unit_cost }));

    const total = itemsWithSubtotals.reduce((sum, i) => sum + i.subtotal, 0);

    const row = {
      supplier_name: poSupplier,
      order_date: poDate,
      status: poStatus,
      items: itemsWithSubtotals,
      total,
      notes: poNotes || null,
    };

    let error;
    if (editingPo) {
      ({ error } = await supabase
        .from("purchase_orders" as any)
        .update(row)
        .eq("id", editingPo.id));
    } else {
      ({ error } = await supabase.from("purchase_orders" as any).insert(row));
    }

    setPoSubmitting(false);

    if (error) {
      toast({ title: "Error saving purchase order", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: editingPo ? "Purchase order updated" : "Purchase order created" });
    setPoDialogOpen(false);
    resetPoForm();
    fetchData();
  };

  const handleMarkReceived = async (po: PurchaseOrder) => {
    // Update PO status
    const { error: poError } = await supabase
      .from("purchase_orders" as any)
      .update({ status: "received" })
      .eq("id", po.id);

    if (poError) {
      toast({ title: "Error updating PO", description: poError.message, variant: "destructive" });
      return;
    }

    // Auto-create linked COGS expense
    const { error: expError } = await supabase.from("expenses" as any).insert({
      category: "cogs",
      description: `PO from ${po.supplier_name}`,
      amount: po.total,
      expense_date: new Date().toISOString().split("T")[0],
      purchase_order_id: po.id,
      notes: `Auto-created from purchase order received`,
    });

    if (expError) {
      toast({ title: "PO marked received but expense creation failed", description: expError.message, variant: "destructive" });
    } else {
      toast({ title: `PO marked received — $${po.total.toFixed(2)} COGS expense created` });
    }

    fetchData();
  };

  const handleDeletePo = async (id: string) => {
    const { error } = await supabase.from("purchase_orders" as any).delete().eq("id", id);
    if (error) {
      toast({ title: "Error deleting PO", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Purchase order deleted" });
    fetchData();
  };

  // --- Expense handlers ---
  const resetExpForm = () => {
    setEditingExp(null);
    setExpCategory("operating");
    setExpDescription("");
    setExpAmount(0);
    setExpDate(new Date().toISOString().split("T")[0]);
    setExpNotes("");
  };

  const openEditExp = (exp: Expense) => {
    setEditingExp(exp);
    setExpCategory(exp.category);
    setExpDescription(exp.description);
    setExpAmount(exp.amount);
    setExpDate(exp.expense_date);
    setExpNotes(exp.notes || "");
    setExpDialogOpen(true);
  };

  const handleSaveExp = async () => {
    if (!expDescription.trim()) {
      toast({ title: "Description is required", variant: "destructive" });
      return;
    }
    if (expAmount <= 0) {
      toast({ title: "Amount must be greater than 0", variant: "destructive" });
      return;
    }
    setExpSubmitting(true);

    const row = {
      category: expCategory,
      description: expDescription,
      amount: expAmount,
      expense_date: expDate,
      notes: expNotes || null,
    };

    let error;
    if (editingExp) {
      ({ error } = await supabase.from("expenses" as any).update(row).eq("id", editingExp.id));
    } else {
      ({ error } = await supabase.from("expenses" as any).insert(row));
    }

    setExpSubmitting(false);

    if (error) {
      toast({ title: "Error saving expense", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: editingExp ? "Expense updated" : "Expense added" });
    setExpDialogOpen(false);
    resetExpForm();
    fetchData();
  };

  const handleDeleteExp = async (id: string) => {
    const { error } = await supabase.from("expenses" as any).delete().eq("id", id);
    if (error) {
      toast({ title: "Error deleting expense", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Expense deleted" });
    fetchData();
  };

  const filteredExpenses = expCategoryFilter === "all"
    ? expenses
    : expenses.filter((e) => e.category === expCategoryFilter);

  if (guardLoading || loading) {
    return (
      <AdminLayout title="Finances">
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

  return (
    <AdminLayout title="Finances">
      <Tabs defaultValue="pnl" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pnl">P&L Overview</TabsTrigger>
          <TabsTrigger value="purchase-orders">Purchase Orders</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
        </TabsList>

        {/* ===== P&L TAB ===== */}
        <TabsContent value="pnl" className="space-y-6">
          {/* Period selector */}
          <div className="flex justify-end">
            <Select value={period} onValueChange={(v) => setPeriod(v as Period)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Metric cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-l-[3px] border-l-emerald-500">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[22px] font-bold tracking-tight leading-none mb-1.5">
                      ${summary.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <p className="text-xs text-muted-foreground font-medium">Total Revenue</p>
                  </div>
                  <div className="p-2 rounded-lg bg-emerald-50">
                    <DollarSign className="h-4 w-4 text-emerald-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-l-[3px] border-l-red-400">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[22px] font-bold tracking-tight leading-none mb-1.5">
                      ${summary.totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <p className="text-xs text-muted-foreground font-medium">Total Expenses</p>
                  </div>
                  <div className="p-2 rounded-lg bg-red-50">
                    <Receipt className="h-4 w-4 text-red-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-l-[3px] border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[22px] font-bold tracking-tight leading-none mb-1.5">
                      ${summary.grossProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <p className="text-xs text-muted-foreground font-medium">Gross Profit</p>
                  </div>
                  <div className="p-2 rounded-lg bg-blue-50">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className={`border-l-[3px] ${summary.netProfit >= 0 ? "border-l-emerald-500" : "border-l-red-500"}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[22px] font-bold tracking-tight leading-none mb-1.5">
                      ${summary.netProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <p className="text-xs text-muted-foreground font-medium">Net Profit</p>
                  </div>
                  <div className={`p-2 rounded-lg ${summary.netProfit >= 0 ? "bg-emerald-50" : "bg-red-50"}`}>
                    {summary.netProfit >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue vs Expenses chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Revenue vs Expenses{period !== "all" ? ` — Last ${period} Days` : ""}</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={pnlChartConfig} className="h-[280px] w-full">
                <BarChart data={revenueVsExpenseData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="label"
                    tickLine={false}
                    axisLine={false}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(val) => `$${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value, name) => [
                          `$${Number(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                          name === "revenue" ? "Revenue" : "Expenses",
                        ]}
                      />
                    }
                  />
                  <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Revenue + Expense breakdowns side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Revenue breakdown */}
            <Card>
              <CardContent className="p-5">
                <h3 className="text-sm font-semibold mb-4">Revenue Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-sm">Website Sales</span>
                    </div>
                    <span className="font-mono text-sm font-medium">
                      ${summary.websiteRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-500" />
                      <span className="text-sm">Off-Platform Sales</span>
                    </div>
                    <span className="font-mono text-sm font-medium">
                      ${summary.manualRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Expense breakdown with pie chart */}
            <Card>
              <CardContent className="p-5">
                <h3 className="text-sm font-semibold mb-4">Expense Breakdown</h3>
                {expensePieData.length > 0 ? (
                  <div className="flex items-center gap-4">
                    <div className="w-[120px] h-[120px] shrink-0">
                      <PieChart width={120} height={120}>
                        <Pie
                          data={expensePieData}
                          cx={60}
                          cy={60}
                          innerRadius={30}
                          outerRadius={55}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {expensePieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value: number) => [`$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, ""]}
                        />
                      </PieChart>
                    </div>
                    <div className="space-y-3 flex-1">
                      {([
                        { key: "cogs" as const, label: "COGS", color: "bg-blue-500", amount: summary.cogsExpenses },
                        { key: "operating" as const, label: "Operating", color: "bg-amber-500", amount: summary.operatingExpenses },
                        { key: "startup" as const, label: "Startup", color: "bg-violet-500", amount: summary.startupExpenses },
                      ]).map((item) => (
                        <div key={item.key} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${item.color}`} />
                            <span className="text-sm">{item.label}</span>
                          </div>
                          <span className="font-mono text-sm font-medium">
                            ${item.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No expenses in this period</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ===== PURCHASE ORDERS TAB ===== */}
        <TabsContent value="purchase-orders" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => { resetPoForm(); setPoDialogOpen(true); }}>
              <Plus className="h-4 w-4 mr-2" />
              New Purchase Order
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-32" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {purchaseOrders.map((po) => (
                    <TableRow key={po.id}>
                      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                        {format(new Date(po.order_date + "T00:00:00"), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell className="font-medium">{po.supplier_name}</TableCell>
                      <TableCell>{po.items.length} item{po.items.length !== 1 ? "s" : ""}</TableCell>
                      <TableCell className="text-right font-mono">${Number(po.total).toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge className={poStatusColors[po.status]} variant="outline">
                          {po.status.charAt(0).toUpperCase() + po.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {po.status === "ordered" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 text-xs text-emerald-600 hover:text-emerald-700"
                              onClick={() => handleMarkReceived(po)}
                              title="Mark as received & create COGS expense"
                            >
                              <PackageCheck className="h-3.5 w-3.5 mr-1" />
                              Receive
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => openEditPo(po)}
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-red-500"
                            onClick={() => handleDeletePo(po.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {purchaseOrders.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No purchase orders yet
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===== EXPENSES TAB ===== */}
        <TabsContent value="expenses" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {(["all", "cogs", "operating", "startup"] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setExpCategoryFilter(cat)}
                  className={
                    "px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 " +
                    (expCategoryFilter === cat
                      ? "bg-[hsl(25,20%,8%)] text-white"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground")
                  }
                >
                  {cat === "all" ? "All" : categoryLabels[cat]}
                </button>
              ))}
            </div>
            <Button onClick={() => { resetExpForm(); setExpDialogOpen(true); }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Expense
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="w-20" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExpenses.map((exp) => (
                    <TableRow key={exp.id}>
                      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                        {format(new Date(exp.expense_date + "T00:00:00"), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>
                        <Badge className={categoryColors[exp.category]} variant="outline">
                          {categoryLabels[exp.category]}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[300px] truncate">{exp.description}</TableCell>
                      <TableCell className="text-right font-mono">${Number(exp.amount).toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => openEditExp(exp)}
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-red-500"
                            onClick={() => handleDeleteExp(exp.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredExpenses.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No expenses recorded
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Purchase Order Dialog */}
      <Dialog open={poDialogOpen} onOpenChange={(open) => { if (!open) { setPoDialogOpen(false); resetPoForm(); } }}>
        <DialogContent className="max-w-lg p-0">
          <div
            className="max-h-[85vh] overflow-y-auto p-6"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            <DialogHeader>
              <DialogTitle>{editingPo ? "Edit Purchase Order" : "New Purchase Order"}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <div>
                <Label>Supplier Name *</Label>
                <Input className="mt-1" value={poSupplier} onChange={(e) => setPoSupplier(e.target.value)} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Order Date</Label>
                  <Input type="date" className="mt-1" value={poDate} onChange={(e) => setPoDate(e.target.value)} />
                </div>
                <div>
                  <Label>Status</Label>
                  <Select value={poStatus} onValueChange={(v) => setPoStatus(v as PurchaseOrderStatus)}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ordered">Ordered</SelectItem>
                      <SelectItem value="received">Received</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Line Items */}
              <div>
                <Label>Line Items</Label>
                <div className="space-y-2 mt-1">
                  {poItems.map((item, idx) => (
                    <div key={idx} className="flex gap-2 items-start">
                      <Input
                        placeholder="Description"
                        className="flex-1"
                        value={item.description}
                        onChange={(e) => {
                          const next = [...poItems];
                          next[idx] = { ...next[idx], description: e.target.value };
                          setPoItems(next);
                        }}
                      />
                      <Input
                        type="number"
                        placeholder="Qty"
                        className="w-16"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => {
                          const next = [...poItems];
                          next[idx] = { ...next[idx], quantity: parseInt(e.target.value) || 1 };
                          setPoItems(next);
                        }}
                      />
                      <Input
                        type="number"
                        placeholder="Unit $"
                        className="w-24"
                        min={0}
                        step={0.01}
                        value={item.unit_cost || ""}
                        onChange={(e) => {
                          const next = [...poItems];
                          next[idx] = { ...next[idx], unit_cost: parseFloat(e.target.value) || 0 };
                          setPoItems(next);
                        }}
                      />
                      {poItems.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 shrink-0 text-muted-foreground hover:text-red-500"
                          onClick={() => setPoItems(poItems.filter((_, i) => i !== idx))}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPoItems([...poItems, { description: "", quantity: 1, unit_cost: 0, subtotal: 0 }])}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add Item
                  </Button>
                </div>
              </div>

              <div>
                <Label>Notes (optional)</Label>
                <Textarea className="mt-1" rows={2} value={poNotes} onChange={(e) => setPoNotes(e.target.value)} />
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="text-lg font-semibold">
                  Total: <span className="font-mono">${poTotal.toFixed(2)}</span>
                </div>
                <Button onClick={handleSavePo} disabled={poSubmitting}>
                  {poSubmitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                  {editingPo ? "Update" : "Create"}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Expense Dialog */}
      <Dialog open={expDialogOpen} onOpenChange={(open) => { if (!open) { setExpDialogOpen(false); resetExpForm(); } }}>
        <DialogContent className="max-w-md p-0">
          <div
            className="max-h-[85vh] overflow-y-auto p-6"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            <DialogHeader>
              <DialogTitle>{editingExp ? "Edit Expense" : "Add Expense"}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <div>
                <Label>Category</Label>
                <Select value={expCategory} onValueChange={(v) => setExpCategory(v as ExpenseCategory)}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cogs">Cost of Goods Sold</SelectItem>
                    <SelectItem value="operating">Operating</SelectItem>
                    <SelectItem value="startup">Startup</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Description *</Label>
                <Input className="mt-1" value={expDescription} onChange={(e) => setExpDescription(e.target.value)} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Amount *</Label>
                  <Input
                    type="number"
                    className="mt-1"
                    min={0}
                    step={0.01}
                    value={expAmount || ""}
                    onChange={(e) => setExpAmount(parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <Label>Date</Label>
                  <Input type="date" className="mt-1" value={expDate} onChange={(e) => setExpDate(e.target.value)} />
                </div>
              </div>

              <div>
                <Label>Notes (optional)</Label>
                <Textarea className="mt-1" rows={2} value={expNotes} onChange={(e) => setExpNotes(e.target.value)} />
              </div>

              <div className="flex justify-end pt-2 border-t">
                <Button onClick={handleSaveExp} disabled={expSubmitting}>
                  {expSubmitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                  {editingExp ? "Update" : "Add Expense"}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminFinances;
