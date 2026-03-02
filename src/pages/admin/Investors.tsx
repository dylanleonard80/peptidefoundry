import { useEffect, useState, useMemo, useCallback } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminGuard } from "@/hooks/useAdminGuard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type {
  Investor,
  InvestorTransaction,
  InvestorTransactionType,
  InvestorWithBalance,
} from "@/types/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
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
import {
  Landmark,
  Plus,
  Loader2,
  ChevronDown,
  ChevronRight,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  TrendingUp,
  Wallet,
  Pencil,
  Trash2,
} from "lucide-react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { format } from "date-fns";

const AdminInvestors = () => {
  const { isAdmin, loading: guardLoading } = useAdminGuard();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  const [investors, setInvestors] = useState<Investor[]>([]);
  const [transactions, setTransactions] = useState<InvestorTransaction[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Add investor dialog
  const [investorDialogOpen, setInvestorDialogOpen] = useState(false);
  const [investorSubmitting, setInvestorSubmitting] = useState(false);
  const [investorName, setInvestorName] = useState("");
  const [investorEmail, setInvestorEmail] = useState("");
  const [investorNotes, setInvestorNotes] = useState("");

  // Transaction dialog
  const [txDialogOpen, setTxDialogOpen] = useState(false);
  const [txSubmitting, setTxSubmitting] = useState(false);
  const [editingTxId, setEditingTxId] = useState<string | null>(null);
  const [txInvestorId, setTxInvestorId] = useState("");
  const [txType, setTxType] = useState<InvestorTransactionType>("investment");
  const [txAmount, setTxAmount] = useState<number>(0);
  const [txDate, setTxDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [txNotes, setTxNotes] = useState("");

  const fetchData = useCallback(async () => {
    const [invRes, txRes] = await Promise.all([
      supabase.from("investors" as any).select("*").order("created_at", { ascending: true }),
      supabase.from("investor_transactions" as any).select("*").order("transaction_date", { ascending: false }),
    ]);

    if (invRes.data) setInvestors(invRes.data as unknown as Investor[]);
    if (txRes.data) setTransactions(txRes.data as unknown as InvestorTransaction[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isAdmin) fetchData();
  }, [isAdmin, fetchData]);

  // Compute balances
  const investorsWithBalance: InvestorWithBalance[] = useMemo(() => {
    return investors.map((inv) => {
      const invTxs = transactions.filter((t) => t.investor_id === inv.id);
      const totalInvested = invTxs
        .filter((t) => t.type === "investment")
        .reduce((sum, t) => sum + Number(t.amount), 0);
      const totalDistributed = invTxs
        .filter((t) => t.type === "distribution")
        .reduce((sum, t) => sum + Number(t.amount), 0);

      return {
        ...inv,
        totalInvested,
        totalDistributed,
        balance: totalInvested - totalDistributed,
        transactions: invTxs,
      };
    });
  }, [investors, transactions]);

  const totals = useMemo(() => {
    const totalInvested = investorsWithBalance.reduce((sum, i) => sum + i.totalInvested, 0);
    const totalDistributed = investorsWithBalance.reduce((sum, i) => sum + i.totalDistributed, 0);
    return {
      totalInvested,
      totalDistributed,
      outstanding: totalInvested - totalDistributed,
    };
  }, [investorsWithBalance]);

  const PIE_COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ef4444", "#06b6d4", "#ec4899"];

  const ownershipPieData = useMemo(() => {
    return investorsWithBalance
      .filter((inv) => inv.totalInvested > 0)
      .map((inv, idx) => ({
        name: inv.name,
        value: inv.totalInvested,
        color: PIE_COLORS[idx % PIE_COLORS.length],
      }));
  }, [investorsWithBalance]);

  // --- Investor handlers ---
  const resetInvestorForm = () => {
    setInvestorName("");
    setInvestorEmail("");
    setInvestorNotes("");
  };

  const handleAddInvestor = async () => {
    if (!investorName.trim()) {
      toast({ title: "Investor name is required", variant: "destructive" });
      return;
    }
    setInvestorSubmitting(true);

    const { error } = await supabase.from("investors" as any).insert({
      name: investorName,
      email: investorEmail || null,
      notes: investorNotes || null,
    });

    setInvestorSubmitting(false);

    if (error) {
      toast({ title: "Error adding investor", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: `Investor "${investorName}" added` });
    setInvestorDialogOpen(false);
    resetInvestorForm();
    fetchData();
  };

  // --- Transaction handlers ---
  const resetTxForm = () => {
    setEditingTxId(null);
    setTxInvestorId("");
    setTxType("investment");
    setTxAmount(0);
    setTxDate(new Date().toISOString().split("T")[0]);
    setTxNotes("");
  };

  const openRecordTx = (investorId: string, type: InvestorTransactionType) => {
    setEditingTxId(null);
    setTxInvestorId(investorId);
    setTxType(type);
    setTxAmount(0);
    setTxDate(new Date().toISOString().split("T")[0]);
    setTxNotes("");
    setTxDialogOpen(true);
  };

  const openEditTx = (tx: InvestorTransaction) => {
    setEditingTxId(tx.id);
    setTxInvestorId(tx.investor_id);
    setTxType(tx.type);
    setTxAmount(Number(tx.amount));
    setTxDate(tx.transaction_date);
    setTxNotes(tx.notes || "");
    setTxDialogOpen(true);
  };

  const handleSaveTx = async () => {
    if (!txInvestorId) {
      toast({ title: "Select an investor", variant: "destructive" });
      return;
    }
    if (txAmount <= 0) {
      toast({ title: "Amount must be greater than 0", variant: "destructive" });
      return;
    }
    setTxSubmitting(true);

    const row = {
      investor_id: txInvestorId,
      type: txType,
      amount: txAmount,
      transaction_date: txDate,
      notes: txNotes || null,
    };

    let error;
    if (editingTxId) {
      ({ error } = await supabase
        .from("investor_transactions" as any)
        .update(row)
        .eq("id", editingTxId));
    } else {
      ({ error } = await supabase.from("investor_transactions" as any).insert(row));
    }

    setTxSubmitting(false);

    if (error) {
      toast({ title: "Error saving transaction", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: editingTxId ? "Transaction updated" : `${txType === "investment" ? "Investment" : "Distribution"} recorded` });
    setTxDialogOpen(false);
    resetTxForm();
    fetchData();
  };

  const handleDeleteTx = async (txId: string) => {
    const { error } = await supabase
      .from("investor_transactions" as any)
      .delete()
      .eq("id", txId);

    if (error) {
      toast({ title: "Error deleting transaction", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: "Transaction deleted" });
    fetchData();
  };

  if (guardLoading || loading) {
    return (
      <AdminLayout title="Investors">
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
          <Skeleton className="h-48 w-full" />
        </div>
      </AdminLayout>
    );
  }

  if (!isAdmin) return null;

  return (
    <AdminLayout title="Investors">
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="border-l-[3px] border-l-emerald-500">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[22px] font-bold tracking-tight leading-none mb-1.5">
                  ${totals.totalInvested.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-muted-foreground font-medium">Total Invested</p>
              </div>
              <div className="p-2 rounded-lg bg-emerald-50">
                <DollarSign className="h-4 w-4 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-[3px] border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[22px] font-bold tracking-tight leading-none mb-1.5">
                  ${totals.totalDistributed.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-muted-foreground font-medium">Total Distributed</p>
              </div>
              <div className="p-2 rounded-lg bg-blue-50">
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-[3px] border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[22px] font-bold tracking-tight leading-none mb-1.5">
                  ${totals.outstanding.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-muted-foreground font-medium">Outstanding Balance</p>
              </div>
              <div className="p-2 rounded-lg bg-orange-50">
                <Wallet className="h-4 w-4 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ownership pie chart */}
      {ownershipPieData.length > 1 && (
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Investment Contributions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center gap-8">
              <PieChart width={200} height={200}>
                <Pie
                  data={ownershipPieData}
                  cx={100}
                  cy={100}
                  innerRadius={50}
                  outerRadius={85}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {ownershipPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [
                    `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                    "",
                  ]}
                />
              </PieChart>
              <div className="space-y-2.5">
                {ownershipPieData.map((entry) => {
                  const pct = totals.totalInvested > 0
                    ? ((entry.value / totals.totalInvested) * 100).toFixed(1)
                    : "0";
                  return (
                    <div key={entry.name} className="flex items-center gap-2.5">
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="text-sm font-medium">{entry.name}</span>
                      <span className="text-xs text-muted-foreground ml-auto font-mono">{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add investor button */}
      <div className="flex justify-end mb-4">
        <Button onClick={() => { resetInvestorForm(); setInvestorDialogOpen(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Investor
        </Button>
      </div>

      {/* Investor list */}
      <div className="space-y-3">
        {investorsWithBalance.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              <Landmark className="h-8 w-8 mx-auto mb-2 opacity-50" />
              No investors yet
            </CardContent>
          </Card>
        )}
        {investorsWithBalance.map((inv) => {
          const isExpanded = expandedId === inv.id;

          return (
            <Card key={inv.id} className="overflow-hidden">
              <CardContent className="p-0">
                {/* Investor row */}
                <button
                  className="w-full flex items-center gap-4 px-5 py-4 hover:bg-muted/30 transition-colors text-left"
                  onClick={() => setExpandedId(isExpanded ? null : inv.id)}
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{inv.name}</p>
                    {inv.email && <p className="text-xs text-muted-foreground">{inv.email}</p>}
                  </div>
                  <div className="grid grid-cols-3 gap-6 text-right shrink-0">
                    <div>
                      <p className="font-mono text-sm font-semibold text-emerald-600">
                        ${inv.totalInvested.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                      <p className="text-[10px] text-muted-foreground">Invested</p>
                    </div>
                    <div>
                      <p className="font-mono text-sm font-semibold text-blue-600">
                        ${inv.totalDistributed.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                      <p className="text-[10px] text-muted-foreground">Distributed</p>
                    </div>
                    <div>
                      <p className="font-mono text-sm font-semibold">
                        ${inv.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                      <p className="text-[10px] text-muted-foreground">Balance</p>
                    </div>
                  </div>
                </button>

                {/* Expanded: transaction history + action buttons */}
                {isExpanded && (
                  <div className="border-t bg-muted/20 px-5 py-4">
                    <div className="flex gap-2 mb-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => { e.stopPropagation(); openRecordTx(inv.id, "investment"); }}
                      >
                        <ArrowDownLeft className="h-3.5 w-3.5 mr-1.5 text-emerald-600" />
                        Record Investment
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => { e.stopPropagation(); openRecordTx(inv.id, "distribution"); }}
                      >
                        <ArrowUpRight className="h-3.5 w-3.5 mr-1.5 text-blue-600" />
                        Record Distribution
                      </Button>
                    </div>

                    {inv.notes && (
                      <p className="text-xs text-muted-foreground mb-3 italic">{inv.notes}</p>
                    )}

                    {inv.transactions.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No transactions recorded</p>
                    ) : (
                      <div className="space-y-1.5">
                        {inv.transactions.map((tx) => (
                          <div key={tx.id} className="group flex items-center gap-3 text-sm">
                            <span className="text-xs text-muted-foreground w-24 shrink-0">
                              {format(new Date(tx.transaction_date + "T00:00:00"), "MMM d, yyyy")}
                            </span>
                            <Badge
                              className={
                                tx.type === "investment"
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                  : "bg-blue-50 text-blue-700 border-blue-200"
                              }
                              variant="outline"
                            >
                              {tx.type === "investment" ? "Investment" : "Distribution"}
                            </Badge>
                            <span className={`font-mono font-medium ${tx.type === "investment" ? "text-emerald-600" : "text-blue-600"}`}>
                              {tx.type === "investment" ? "+" : "-"}${Number(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                            {tx.notes && (
                              <span className="text-muted-foreground truncate flex-1">{tx.notes}</span>
                            )}
                            <span className="ml-auto flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={(e) => { e.stopPropagation(); openEditTx(tx); }}
                                title="Edit transaction"
                              >
                                <Pencil className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-muted-foreground hover:text-red-500"
                                onClick={(e) => { e.stopPropagation(); handleDeleteTx(tx.id); }}
                                title="Delete transaction"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Add Investor Dialog */}
      <Dialog open={investorDialogOpen} onOpenChange={(open) => { if (!open) { setInvestorDialogOpen(false); resetInvestorForm(); } }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Investor</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <div>
              <Label>Name *</Label>
              <Input className="mt-1" value={investorName} onChange={(e) => setInvestorName(e.target.value)} placeholder="Jane Smith" />
            </div>
            <div>
              <Label>Email (optional)</Label>
              <Input className="mt-1" value={investorEmail} onChange={(e) => setInvestorEmail(e.target.value)} placeholder="jane@example.com" />
            </div>
            <div>
              <Label>Notes (optional)</Label>
              <Textarea className="mt-1" rows={2} value={investorNotes} onChange={(e) => setInvestorNotes(e.target.value)} />
            </div>
            <div className="flex justify-end pt-2 border-t">
              <Button onClick={handleAddInvestor} disabled={investorSubmitting}>
                {investorSubmitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                Add Investor
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Transaction Dialog (create or edit) */}
      <Dialog open={txDialogOpen} onOpenChange={(open) => { if (!open) { setTxDialogOpen(false); resetTxForm(); } }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingTxId
                ? "Edit Transaction"
                : txType === "investment"
                  ? "Record Investment"
                  : "Record Distribution"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <div>
              <Label>Investor</Label>
              <Select value={txInvestorId} onValueChange={setTxInvestorId}>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Select investor" /></SelectTrigger>
                <SelectContent>
                  {investors.map((inv) => (
                    <SelectItem key={inv.id} value={inv.id}>{inv.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Type</Label>
              <Select value={txType} onValueChange={(v) => setTxType(v as InvestorTransactionType)}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="investment">Investment</SelectItem>
                  <SelectItem value="distribution">Distribution</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Amount *</Label>
                <Input
                  type="number"
                  className="mt-1"
                  min={0}
                  step={0.01}
                  value={txAmount || ""}
                  onChange={(e) => setTxAmount(parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label>Date</Label>
                <Input type="date" className="mt-1" value={txDate} onChange={(e) => setTxDate(e.target.value)} />
              </div>
            </div>
            <div>
              <Label>Notes (optional)</Label>
              <Textarea className="mt-1" rows={2} value={txNotes} onChange={(e) => setTxNotes(e.target.value)} />
            </div>
            <div className="flex justify-end pt-2 border-t">
              <Button onClick={handleSaveTx} disabled={txSubmitting}>
                {txSubmitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                {editingTxId ? "Update" : `Record ${txType === "investment" ? "Investment" : "Distribution"}`}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminInvestors;
