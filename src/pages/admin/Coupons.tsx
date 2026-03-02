import { useEffect, useState, useCallback, useMemo } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminGuard } from "@/hooks/useAdminGuard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Ticket, Plus, Pencil, Copy, Trash2, Search } from "lucide-react";
import { format } from "date-fns";
import type { CouponType, CouponWithProducts } from "@/types/admin";

interface ProductOption {
  id: string;
  name: string;
}

const emptyCouponForm = {
  code: "",
  type: "percentage" as CouponType,
  value: "",
  is_active: true,
  expires_at: "",
  min_order_amount: "",
  max_uses: "",
  max_uses_per_user: "1",
  product_ids: [] as string[],
};

const AdminCoupons = () => {
  const { isAdmin, loading: guardLoading } = useAdminGuard();
  const { toast } = useToast();
  const [coupons, setCoupons] = useState<CouponWithProducts[]>([]);
  const [products, setProducts] = useState<ProductOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyCouponForm);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [togglingIds, setTogglingIds] = useState<Set<string>>(new Set());

  const fetchData = useCallback(async () => {
    const [couponsRes, productsRes] = await Promise.all([
      supabase
        .from("coupons")
        .select("*, coupon_products(id, coupon_id, product_id)")
        .order("created_at", { ascending: false }),
      supabase
        .from("products")
        .select("id, name")
        .eq("status", "active")
        .order("name"),
    ]);

    if (couponsRes.error) {
      toast({ title: "Error loading coupons", description: couponsRes.error.message, variant: "destructive" });
      setLoading(false);
      return;
    }

    setCoupons((couponsRes.data || []) as unknown as CouponWithProducts[]);
    setProducts((productsRes.data || []) as ProductOption[]);
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    if (isAdmin) fetchData();
  }, [isAdmin, fetchData]);

  const filtered = useMemo(() => {
    if (!search) return coupons;
    const q = search.toLowerCase();
    return coupons.filter((c) => c.code.toLowerCase().includes(q));
  }, [coupons, search]);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyCouponForm);
    setDialogOpen(true);
  };

  const openEdit = (coupon: CouponWithProducts) => {
    setEditingId(coupon.id);
    setForm({
      code: coupon.code,
      type: coupon.type,
      value: String(coupon.value),
      is_active: coupon.is_active,
      expires_at: coupon.expires_at ? coupon.expires_at.slice(0, 10) : "",
      min_order_amount: coupon.min_order_amount != null ? String(coupon.min_order_amount) : "",
      max_uses: coupon.max_uses != null ? String(coupon.max_uses) : "",
      max_uses_per_user: String(coupon.max_uses_per_user),
      product_ids: coupon.coupon_products.map((cp) => cp.product_id),
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.code.trim()) {
      toast({ title: "Code required", variant: "destructive" });
      return;
    }
    if (!form.value || Number(form.value) <= 0) {
      toast({ title: "Value must be greater than 0", variant: "destructive" });
      return;
    }
    if (form.type === "percentage" && Number(form.value) > 100) {
      toast({ title: "Percentage cannot exceed 100", variant: "destructive" });
      return;
    }

    setSaving(true);

    const couponData = {
      code: form.code.toUpperCase().trim(),
      type: form.type,
      value: Number(form.value),
      is_active: form.is_active,
      expires_at: form.expires_at ? new Date(form.expires_at + "T23:59:59Z").toISOString() : null,
      min_order_amount: form.min_order_amount ? Number(form.min_order_amount) : null,
      max_uses: form.max_uses ? Number(form.max_uses) : null,
      max_uses_per_user: Number(form.max_uses_per_user) || 1,
    };

    let couponId = editingId;

    if (editingId) {
      const { error } = await supabase
        .from("coupons")
        .update(couponData)
        .eq("id", editingId);

      if (error) {
        toast({ title: "Error updating coupon", description: error.message, variant: "destructive" });
        setSaving(false);
        return;
      }
    } else {
      const { data, error } = await supabase
        .from("coupons")
        .insert(couponData)
        .select("id")
        .single();

      if (error) {
        const msg = error.message.includes("coupons_code_unique")
          ? "A coupon with this code already exists"
          : error.message;
        toast({ title: "Error creating coupon", description: msg, variant: "destructive" });
        setSaving(false);
        return;
      }
      couponId = data.id;
    }

    // Sync coupon_products
    if (couponId) {
      await supabase.from("coupon_products").delete().eq("coupon_id", couponId);

      if (form.product_ids.length > 0) {
        const rows = form.product_ids.map((pid) => ({
          coupon_id: couponId!,
          product_id: pid,
        }));
        await supabase.from("coupon_products").insert(rows);
      }
    }

    toast({ title: editingId ? "Coupon updated" : "Coupon created" });
    setSaving(false);
    setDialogOpen(false);
    fetchData();
  };

  const handleToggle = async (coupon: CouponWithProducts) => {
    setTogglingIds((prev) => new Set(prev).add(coupon.id));
    const { error } = await supabase
      .from("coupons")
      .update({ is_active: !coupon.is_active })
      .eq("id", coupon.id);

    if (error) {
      toast({ title: "Error toggling coupon", description: error.message, variant: "destructive" });
    } else {
      setCoupons((prev) =>
        prev.map((c) => (c.id === coupon.id ? { ...c, is_active: !c.is_active } : c))
      );
    }
    setTogglingIds((prev) => {
      const next = new Set(prev);
      next.delete(coupon.id);
      return next;
    });
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({ title: "Copied!", description: `${code} copied to clipboard` });
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const { error } = await supabase.from("coupons").delete().eq("id", deleteId);
    if (error) {
      toast({ title: "Error deleting coupon", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Coupon deleted" });
      setCoupons((prev) => prev.filter((c) => c.id !== deleteId));
    }
    setDeleteId(null);
  };

  const toggleProduct = (productId: string) => {
    setForm((prev) => ({
      ...prev,
      product_ids: prev.product_ids.includes(productId)
        ? prev.product_ids.filter((id) => id !== productId)
        : [...prev.product_ids, productId],
    }));
  };

  if (guardLoading || loading) {
    return (
      <AdminLayout title="Coupons">
        <div className="space-y-4">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-64 w-full" />
        </div>
      </AdminLayout>
    );
  }

  if (!isAdmin) return null;

  return (
    <AdminLayout title="Coupons">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search codes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Badge variant="secondary" className="text-xs">
            {coupons.length} coupon{coupons.length !== 1 ? "s" : ""}
          </Badge>
        </div>
        <Button onClick={openCreate} size="sm">
          <Plus className="h-4 w-4 mr-1" />
          New Coupon
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead className="text-center">Active</TableHead>
                <TableHead>Uses</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>Scope</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((coupon) => {
                const isExpired = coupon.expires_at && new Date(coupon.expires_at) < new Date();
                const scope = coupon.coupon_products.length > 0
                  ? `${coupon.coupon_products.length} product${coupon.coupon_products.length > 1 ? "s" : ""}`
                  : "Order-wide";

                return (
                  <TableRow key={coupon.id}>
                    <TableCell>
                      <span className="font-mono font-medium">{coupon.code}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {coupon.type === "percentage" ? "%" : "$"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {coupon.type === "percentage"
                        ? `${coupon.value}%`
                        : `$${Number(coupon.value).toFixed(2)}`}
                    </TableCell>
                    <TableCell className="text-center">
                      <Switch
                        checked={coupon.is_active}
                        disabled={togglingIds.has(coupon.id)}
                        onCheckedChange={() => handleToggle(coupon)}
                      />
                    </TableCell>
                    <TableCell className="text-sm">
                      {coupon.current_uses}
                      {coupon.max_uses != null ? ` / ${coupon.max_uses}` : ""}
                    </TableCell>
                    <TableCell className="text-sm">
                      {coupon.expires_at ? (
                        <span className={isExpired ? "text-red-500" : ""}>
                          {format(new Date(coupon.expires_at), "MMM d, yyyy")}
                          {isExpired && " (expired)"}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">Never</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{scope}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(coupon)}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleCopy(coupon.code)}>
                          <Copy className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600" onClick={() => setDeleteId(coupon.id)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    {search ? "No coupons match your search" : "No coupons yet"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Coupon" : "Create Coupon"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Code</Label>
              <Input
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                placeholder="e.g. SAVE10"
                className="font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Type</Label>
                <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v as CouponType })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage (%)</SelectItem>
                    <SelectItem value="fixed">Fixed ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>{form.type === "percentage" ? "Percentage" : "Amount ($)"}</Label>
                <Input
                  type="number"
                  min="0"
                  max={form.type === "percentage" ? "100" : undefined}
                  step={form.type === "percentage" ? "1" : "0.01"}
                  value={form.value}
                  onChange={(e) => setForm({ ...form, value: e.target.value })}
                  placeholder={form.type === "percentage" ? "10" : "15.00"}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={form.is_active}
                onCheckedChange={(checked) => setForm({ ...form, is_active: checked })}
              />
              <Label>Active</Label>
            </div>

            <div>
              <Label>Expiration Date <span className="text-muted-foreground font-normal">(optional)</span></Label>
              <Input
                type="date"
                value={form.expires_at}
                onChange={(e) => setForm({ ...form, expires_at: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Min Order Amount <span className="text-muted-foreground font-normal">(optional)</span></Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.min_order_amount}
                  onChange={(e) => setForm({ ...form, min_order_amount: e.target.value })}
                  placeholder="No minimum"
                />
              </div>
              <div>
                <Label>Max Total Uses <span className="text-muted-foreground font-normal">(optional)</span></Label>
                <Input
                  type="number"
                  min="1"
                  value={form.max_uses}
                  onChange={(e) => setForm({ ...form, max_uses: e.target.value })}
                  placeholder="Unlimited"
                />
              </div>
            </div>

            <div>
              <Label>Max Uses Per User</Label>
              <Input
                type="number"
                min="1"
                value={form.max_uses_per_user}
                onChange={(e) => setForm({ ...form, max_uses_per_user: e.target.value })}
              />
            </div>

            <div>
              <Label>Product Scope <span className="text-muted-foreground font-normal">(empty = order-wide)</span></Label>
              <div className="mt-2 border rounded-md max-h-48 overflow-y-auto overscroll-contain p-2 space-y-1">
                {products.map((product) => (
                  <label key={product.id} className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-muted/50 cursor-pointer">
                    <Checkbox
                      checked={form.product_ids.includes(product.id)}
                      onCheckedChange={() => toggleProduct(product.id)}
                    />
                    <span className="text-sm">{product.name}</span>
                  </label>
                ))}
              </div>
              {form.product_ids.length > 0 && (
                <p className="text-xs text-muted-foreground mt-1">
                  {form.product_ids.length} product{form.product_ids.length > 1 ? "s" : ""} selected
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : editingId ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Coupon</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this coupon. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminCoupons;
