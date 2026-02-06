import { useEffect, useState, useCallback, useMemo } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminGuard } from "@/hooks/useAdminGuard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Product, ProductVariant, ProductWithVariants, ProductType, ProductStatus, OrderItem, AdminOrder } from "@/types/admin";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ChevronDown,
  ChevronRight,
  Search,
  Pencil,
  Package,
  AlertCircle,
  ArrowUpDown,
  Info,
} from "lucide-react";

const typeColors: Record<ProductType, string> = {
  peptide: "bg-blue-100 text-blue-800",
  blend: "bg-purple-100 text-purple-800",
  supply: "bg-gray-100 text-gray-800",
};

const statusColors: Record<ProductStatus, string> = {
  active: "bg-green-100 text-green-800",
  draft: "bg-yellow-100 text-yellow-800",
  archived: "bg-gray-100 text-gray-500",
};

const AdminInventory = () => {
  const { isAdmin, loading: guardLoading } = useAdminGuard();
  const { toast } = useToast();
  const [products, setProducts] = useState<ProductWithVariants[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Sales velocity state
  const [salesVelocity, setSalesVelocity] = useState<Record<string, number>>({});
  const [sortByVelocity, setSortByVelocity] = useState(false);

  // Price edit dialog state
  const [editingVariant, setEditingVariant] = useState<ProductVariant | null>(null);
  const [editPrice, setEditPrice] = useState("");
  const [editMemberPrice, setEditMemberPrice] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchProducts = useCallback(async () => {
    const { data, error } = await supabase
      .from("products" as any)
      .select("*, product_variants(*)")
      .order("sort_order", { ascending: true });

    if (error) {
      toast({ title: "Error loading products", description: error.message, variant: "destructive" });
      return;
    }

    setProducts((data as any as ProductWithVariants[]) || []);
    setLoading(false);
  }, [toast]);

  const fetchSalesVelocity = useCallback(async () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .gte("created_at", thirtyDaysAgo.toISOString());

    if (error) {
      console.error("Error fetching orders for velocity:", error.message);
      return;
    }

    const orders = (data as unknown as AdminOrder[]) || [];
    const velocity: Record<string, number> = {};

    for (const order of orders) {
      const items = (order.items as unknown as OrderItem[]) || [];
      for (const item of items) {
        const itemName = (item.name || item.peptide_name || "").toLowerCase().trim();
        if (!itemName) continue;
        const qty = item.quantity || 1;
        // Accumulate by the raw item name; we'll match to products below
        velocity[itemName] = (velocity[itemName] || 0) + qty;
      }
    }

    setSalesVelocity(velocity);
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchProducts();
      fetchSalesVelocity();
    }
  }, [isAdmin, fetchProducts, fetchSalesVelocity]);

  /** Match a product name to aggregated order-item sales using case-insensitive partial matching */
  const getProductVelocity = useCallback(
    (productName: string): number => {
      const pName = productName.toLowerCase().trim();
      let total = 0;
      for (const [itemName, qty] of Object.entries(salesVelocity)) {
        // Match if either string contains the other (handles slight naming differences)
        if (itemName.includes(pName) || pName.includes(itemName)) {
          total += qty;
        }
      }
      return total;
    },
    [salesVelocity]
  );

  const toggleExpand = (productId: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });
  };

  const handleProductStockToggle = async (product: Product) => {
    const newVal = !product.in_stock;
    const { error } = await supabase
      .from("products" as any)
      .update({ in_stock: newVal } as any)
      .eq("id", product.id);

    if (error) {
      toast({ title: "Error updating stock", description: error.message, variant: "destructive" });
      return;
    }

    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, in_stock: newVal } : p))
    );
    toast({ title: `${product.name} marked ${newVal ? "in stock" : "out of stock"}` });
  };

  const handleVariantStockToggle = async (variant: ProductVariant) => {
    const newVal = !variant.in_stock;
    const { error } = await supabase
      .from("product_variants" as any)
      .update({ in_stock: newVal } as any)
      .eq("id", variant.id);

    if (error) {
      toast({ title: "Error updating variant stock", description: error.message, variant: "destructive" });
      return;
    }

    setProducts((prev) =>
      prev.map((p) => ({
        ...p,
        product_variants: p.product_variants.map((v) =>
          v.id === variant.id ? { ...v, in_stock: newVal } : v
        ),
      }))
    );
  };

  const openPriceEdit = (variant: ProductVariant) => {
    setEditingVariant(variant);
    setEditPrice(variant.price.toString());
    setEditMemberPrice(variant.member_price?.toString() || "");
  };

  const savePriceEdit = async () => {
    if (!editingVariant) return;
    setSaving(true);

    const price = parseFloat(editPrice);
    const memberPrice = editMemberPrice ? parseFloat(editMemberPrice) : null;

    if (isNaN(price) || price < 0) {
      toast({ title: "Invalid price", variant: "destructive" });
      setSaving(false);
      return;
    }
    if (memberPrice !== null && (isNaN(memberPrice) || memberPrice < 0)) {
      toast({ title: "Invalid member price", variant: "destructive" });
      setSaving(false);
      return;
    }

    const { error } = await supabase
      .from("product_variants" as any)
      .update({ price, member_price: memberPrice } as any)
      .eq("id", editingVariant.id);

    if (error) {
      toast({ title: "Error updating price", description: error.message, variant: "destructive" });
      setSaving(false);
      return;
    }

    setProducts((prev) =>
      prev.map((p) => ({
        ...p,
        product_variants: p.product_variants.map((v) =>
          v.id === editingVariant.id ? { ...v, price, member_price: memberPrice } : v
        ),
      }))
    );

    toast({ title: "Price updated" });
    setEditingVariant(null);
    setSaving(false);
  };

  // Filtering
  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (typeFilter !== "all" && p.type !== typeFilter) return false;
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      return true;
    });

    if (sortByVelocity) {
      result = [...result].sort((a, b) => getProductVelocity(b.name) - getProductVelocity(a.name));
    }

    return result;
  }, [products, search, typeFilter, statusFilter, sortByVelocity, getProductVelocity]);

  const stockSummary = {
    total: products.length,
    inStock: products.filter((p) => p.in_stock).length,
    outOfStock: products.filter((p) => !p.in_stock).length,
  };

  if (guardLoading || loading) {
    return (
      <AdminLayout title="Inventory">
        <div className="space-y-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </AdminLayout>
    );
  }

  if (!isAdmin) return null;

  return (
    <AdminLayout title="Inventory">
      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-3">
              <Package className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{stockSummary.total}</p>
                <p className="text-xs text-muted-foreground">Total Products</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <div>
                <p className="text-2xl font-bold">{stockSummary.inStock}</p>
                <p className="text-xs text-muted-foreground">In Stock</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-2xl font-bold">{stockSummary.outOfStock}</p>
                <p className="text-xs text-muted-foreground">Out of Stock</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="peptide">Peptide</SelectItem>
            <SelectItem value="blend">Blend</SelectItem>
            <SelectItem value="supply">Supply</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Products table */}
      <TooltipProvider>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-8" />
                  <TableHead>Product</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">In Stock</TableHead>
                  <TableHead className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span>Sold (30d)</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-6 w-6 ${sortByVelocity ? "text-primary" : "text-muted-foreground"}`}
                        onClick={() => setSortByVelocity((v) => !v)}
                      >
                        <ArrowUpDown className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Variants</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((product) => {
                  const isExpanded = expandedRows.has(product.id);
                  const variants = product.product_variants || [];
                  const velocity = getProductVelocity(product.name);
                  const isBlend = product.type === "blend";
                  return (
                    <>
                      <TableRow
                        key={product.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => toggleExpand(product.id)}
                      >
                        <TableCell className="w-8 pr-0">
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          )}
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {product.name}
                            {isBlend && product.in_stock && (
                              <Tooltip>
                                <TooltipTrigger asChild onClick={(e) => e.stopPropagation()}>
                                  <Info className="h-3.5 w-3.5 text-purple-400 flex-shrink-0" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Blend — verify component availability</p>
                                </TooltipContent>
                              </Tooltip>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={typeColors[product.type]}>
                            {product.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={statusColors[product.status]}>
                            {product.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center" onClick={(e) => e.stopPropagation()}>
                          <Switch
                            checked={product.in_stock}
                            onCheckedChange={() => handleProductStockToggle(product)}
                          />
                        </TableCell>
                        <TableCell className="text-center tabular-nums">
                          {velocity > 0 ? velocity : <span className="text-muted-foreground">0</span>}
                        </TableCell>
                        <TableCell className="text-right">{variants.length}</TableCell>
                      </TableRow>
                      {isExpanded && variants.length > 0 && (
                        <TableRow key={`${product.id}-variants`}>
                          <TableCell colSpan={7} className="bg-muted/30 p-0">
                            <div className="px-6 py-3">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Size</TableHead>
                                    <TableHead className="text-right">Price</TableHead>
                                    <TableHead className="text-right">Member Price</TableHead>
                                    <TableHead className="text-center">In Stock</TableHead>
                                    <TableHead className="w-10" />
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {variants
                                    .sort((a, b) => a.sort_order - b.sort_order)
                                    .map((variant) => (
                                      <TableRow key={variant.id}>
                                        <TableCell>{variant.size_label}</TableCell>
                                        <TableCell className="text-right font-mono">
                                          ${variant.price.toFixed(2)}
                                        </TableCell>
                                        <TableCell className="text-right font-mono">
                                          {variant.member_price != null
                                            ? `$${variant.member_price.toFixed(2)}`
                                            : <span className="text-muted-foreground">—</span>}
                                        </TableCell>
                                        <TableCell className="text-center">
                                          <Switch
                                            checked={variant.in_stock}
                                            onCheckedChange={() => handleVariantStockToggle(variant)}
                                          />
                                        </TableCell>
                                        <TableCell>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={() => openPriceEdit(variant)}
                                          >
                                            <Pencil className="h-3.5 w-3.5" />
                                          </Button>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                </TableBody>
                              </Table>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  );
                })}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No products found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TooltipProvider>

      {/* Price Edit Dialog */}
      <Dialog open={!!editingVariant} onOpenChange={() => setEditingVariant(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Price — {editingVariant?.size_label}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="memberPrice">Member Price ($)</Label>
              <Input
                id="memberPrice"
                type="number"
                step="0.01"
                min="0"
                value={editMemberPrice}
                onChange={(e) => setEditMemberPrice(e.target.value)}
                placeholder="Leave empty for no member price"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingVariant(null)}>
              Cancel
            </Button>
            <Button onClick={savePriceEdit} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminInventory;
