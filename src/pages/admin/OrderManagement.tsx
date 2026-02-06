import { useEffect, useState, useCallback, useMemo } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminGuard } from "@/hooks/useAdminGuard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { AdminOrder, OrderItem, OrderStatus } from "@/types/admin";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Truck, Package, Eye } from "lucide-react";
import { format, differenceInHours } from "date-fns";

const ORDER_STATUSES: OrderStatus[] = ["pending", "processing", "shipped", "delivered", "cancelled"];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

type StatusTab = "all" | OrderStatus;

const AdminOrderManagement = () => {
  const { isAdmin, loading: guardLoading } = useAdminGuard();
  const { toast } = useToast();
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusTab>("all");
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkUpdating, setBulkUpdating] = useState(false);

  // Inline tracking/notes state
  const [trackingInputs, setTrackingInputs] = useState<Record<string, string>>({});
  const [notesInputs, setNotesInputs] = useState<Record<string, string>>({});

  const fetchOrders = useCallback(async () => {
    // Fetch orders (no join — no direct FK to profiles)
    const { data: ordersRaw, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error loading orders", description: error.message, variant: "destructive" });
      return;
    }

    const ordersData = (ordersRaw as unknown as AdminOrder[]) || [];

    // Fetch profiles for all user_ids in a single query
    const userIds = [...new Set(ordersData.map((o) => o.user_id).filter(Boolean))] as string[];
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

    // Merge profiles into orders
    const merged = ordersData.map((o) => ({
      ...o,
      profiles: o.user_id ? profileMap[o.user_id] || null : null,
    }));

    setOrders(merged);

    // Pre-fill tracking/notes inputs
    const tracking: Record<string, string> = {};
    const notes: Record<string, string> = {};
    merged.forEach((o) => {
      tracking[o.id] = o.tracking_number || "";
      notes[o.id] = o.internal_notes || "";
    });
    setTrackingInputs(tracking);
    setNotesInputs(notes);
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    if (isAdmin) fetchOrders();
  }, [isAdmin, fetchOrders]);

  // Compute status counts from the full (unfiltered) orders list
  const statusCounts = useMemo(() => {
    const counts: Record<StatusTab, number> = {
      all: orders.length,
      pending: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0,
    };
    orders.forEach((o) => {
      const s = o.status || "pending";
      if (s in counts) counts[s as OrderStatus]++;
    });
    return counts;
  }, [orders]);

  const handleStatusChange = async (order: AdminOrder, newStatus: OrderStatus) => {
    const updateData: Record<string, any> = { status: newStatus };
    if (newStatus === "shipped") updateData.shipped_at = new Date().toISOString();
    if (newStatus === "delivered") updateData.delivered_at = new Date().toISOString();

    const { error } = await supabase
      .from("orders")
      .update(updateData)
      .eq("id", order.id);

    if (error) {
      toast({ title: "Error updating status", description: error.message, variant: "destructive" });
      return;
    }

    setOrders((prev) =>
      prev.map((o) => (o.id === order.id ? { ...o, status: newStatus, ...updateData } : o))
    );
    if (selectedOrder?.id === order.id) {
      setSelectedOrder((prev) => prev ? { ...prev, status: newStatus, ...updateData } : null);
    }
    toast({ title: `Order ${order.order_number} -> ${newStatus}` });
  };

  const handleBulkStatusChange = async (newStatus: OrderStatus) => {
    if (selectedIds.size === 0) return;
    setBulkUpdating(true);

    const updateData: Record<string, any> = { status: newStatus };
    if (newStatus === "shipped") updateData.shipped_at = new Date().toISOString();
    if (newStatus === "delivered") updateData.delivered_at = new Date().toISOString();

    const ids = Array.from(selectedIds);
    const { error } = await supabase
      .from("orders")
      .update(updateData)
      .in("id", ids);

    setBulkUpdating(false);

    if (error) {
      toast({ title: "Bulk update failed", description: error.message, variant: "destructive" });
      return;
    }

    setOrders((prev) =>
      prev.map((o) =>
        selectedIds.has(o.id) ? { ...o, status: newStatus, ...updateData } : o
      )
    );

    // If the detail dialog is open for a selected order, update it too
    if (selectedOrder && selectedIds.has(selectedOrder.id)) {
      setSelectedOrder((prev) => prev ? { ...prev, status: newStatus, ...updateData } : null);
    }

    toast({ title: `${ids.length} order(s) updated to ${newStatus}` });
    setSelectedIds(new Set());
  };

  const saveTracking = async (orderId: string) => {
    const trackingNumber = trackingInputs[orderId]?.trim() || null;
    const { error } = await supabase
      .from("orders")
      .update({ tracking_number: trackingNumber } as any)
      .eq("id", orderId);

    if (error) {
      toast({ title: "Error saving tracking", description: error.message, variant: "destructive" });
      return;
    }

    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, tracking_number: trackingNumber } : o))
    );
    toast({ title: "Tracking number saved" });
  };

  const saveNotes = async (orderId: string) => {
    const notes = notesInputs[orderId]?.trim() || null;
    const { error } = await supabase
      .from("orders")
      .update({ internal_notes: notes } as any)
      .eq("id", orderId);

    if (error) {
      toast({ title: "Error saving notes", description: error.message, variant: "destructive" });
      return;
    }

    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, internal_notes: notes } : o))
    );
    toast({ title: "Notes saved" });
  };

  const getCustomerName = (order: AdminOrder) => {
    if (order.profiles) {
      return `${order.profiles.first_name} ${order.profiles.last_name}`.trim() || order.profiles.email || "\u2014";
    }
    return order.guest_email || "Guest";
  };

  /** Returns a warning badge for stale/delayed orders, or null */
  const getTimeWarning = (order: AdminOrder) => {
    if (!order.created_at) return null;
    const now = new Date();
    const status = order.status || "pending";

    if (status === "pending") {
      const hours = differenceInHours(now, new Date(order.created_at));
      if (hours >= 24) {
        return (
          <Badge className="bg-orange-100 text-orange-800 border-orange-300 ml-1.5 text-[10px] px-1.5 py-0" variant="outline">
            Stale
          </Badge>
        );
      }
    }

    if (status === "processing") {
      // Use the time when it entered processing (updated_at) or fallback to created_at
      const referenceDate = order.updated_at ? new Date(order.updated_at) : new Date(order.created_at);
      const hours = differenceInHours(now, referenceDate);
      if (hours >= 48) {
        return (
          <Badge className="bg-red-100 text-red-800 border-red-300 ml-1.5 text-[10px] px-1.5 py-0" variant="outline">
            Delayed
          </Badge>
        );
      }
    }

    return null;
  };

  // Filtering
  const filtered = orders.filter((o) => {
    if (statusFilter !== "all" && o.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      const name = getCustomerName(o).toLowerCase();
      if (
        !o.order_number.toLowerCase().includes(q) &&
        !name.includes(q)
      )
        return false;
    }
    return true;
  });

  // Selection helpers
  const allFilteredSelected = filtered.length > 0 && filtered.every((o) => selectedIds.has(o.id));
  const someFilteredSelected = filtered.some((o) => selectedIds.has(o.id));

  const toggleSelectAll = () => {
    if (allFilteredSelected) {
      // Deselect all filtered
      setSelectedIds((prev) => {
        const next = new Set(prev);
        filtered.forEach((o) => next.delete(o.id));
        return next;
      });
    } else {
      // Select all filtered
      setSelectedIds((prev) => {
        const next = new Set(prev);
        filtered.forEach((o) => next.add(o.id));
        return next;
      });
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  if (guardLoading || loading) {
    return (
      <AdminLayout title="Orders">
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </AdminLayout>
    );
  }

  if (!isAdmin) return null;

  const tabs: { key: StatusTab; label: string }[] = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "processing", label: "Processing" },
    { key: "shipped", label: "Shipped" },
    { key: "delivered", label: "Delivered" },
    { key: "cancelled", label: "Cancelled" },
  ];

  return (
    <AdminLayout title="Order Management">
      {/* Bulk action bar */}
      {selectedIds.size > 0 && (
        <div className="flex items-center gap-3 mb-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
          <span className="text-sm font-medium">
            {selectedIds.size} order{selectedIds.size !== 1 ? "s" : ""} selected
          </span>
          <div className="flex gap-2 ml-auto">
            <Button
              size="sm"
              variant="outline"
              disabled={bulkUpdating}
              onClick={() => handleBulkStatusChange("processing")}
            >
              Mark as Processing
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={bulkUpdating}
              onClick={() => handleBulkStatusChange("shipped")}
            >
              Mark as Shipped
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={bulkUpdating}
              onClick={() => handleBulkStatusChange("delivered")}
            >
              Mark as Delivered
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setSelectedIds(new Set())}
            >
              Clear
            </Button>
          </div>
        </div>
      )}

      {/* Search bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by order # or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Status tab bar */}
      <div className="flex flex-wrap gap-1 mb-4 border-b pb-3">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setStatusFilter(tab.key);
              setSelectedIds(new Set());
            }}
            className={
              "px-3 py-1.5 rounded-md text-sm font-medium transition-colors " +
              (statusFilter === tab.key
                ? "bg-primary text-white"
                : "text-muted-foreground hover:bg-muted hover:text-foreground")
            }
          >
            {tab.label} ({statusCounts[tab.key]})
          </button>
        ))}
      </div>

      {/* Orders table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10 pl-4">
                  <Checkbox
                    checked={allFilteredSelected}
                    ref={undefined}
                    onCheckedChange={toggleSelectAll}
                    aria-label="Select all orders"
                    {...(someFilteredSelected && !allFilteredSelected
                      ? { "data-state": "indeterminate" as const }
                      : {})}
                  />
                </TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Tracking</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((order) => (
                <TableRow
                  key={order.id}
                  className={selectedIds.has(order.id) ? "bg-primary/5" : undefined}
                >
                  <TableCell className="pl-4">
                    <Checkbox
                      checked={selectedIds.has(order.id)}
                      onCheckedChange={() => toggleSelect(order.id)}
                      aria-label={`Select order ${order.order_number}`}
                    />
                  </TableCell>
                  <TableCell className="font-mono text-sm">{order.order_number}</TableCell>
                  <TableCell className="max-w-[160px] truncate">{getCustomerName(order)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                    {order.created_at ? format(new Date(order.created_at), "MMM d, yyyy") : "\u2014"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Select
                        value={order.status || "pending"}
                        onValueChange={(val) => handleStatusChange(order, val as OrderStatus)}
                      >
                        <SelectTrigger className="h-8 w-[130px]">
                          <Badge className={statusColors[order.status || "pending"]} variant="secondary">
                            {order.status?.charAt(0).toUpperCase()}{order.status?.slice(1)}
                          </Badge>
                        </SelectTrigger>
                        <SelectContent>
                          {ORDER_STATUSES.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s.charAt(0).toUpperCase() + s.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {getTimeWarning(order)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    ${order.total.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Input
                        className="h-8 w-[140px] text-xs"
                        placeholder="Tracking #"
                        value={trackingInputs[order.id] || ""}
                        onChange={(e) =>
                          setTrackingInputs((prev) => ({ ...prev, [order.id]: e.target.value }))
                        }
                        onBlur={() => {
                          if (trackingInputs[order.id] !== (order.tracking_number || "")) {
                            saveTracking(order.id);
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveTracking(order.id);
                        }}
                      />
                      {order.tracking_number && (
                        <Truck className="h-4 w-4 text-green-600 shrink-0" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    No orders found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Order Detail Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  Order {selectedOrder.order_number}
                  <Badge className={statusColors[selectedOrder.status || "pending"]} variant="secondary">
                    {selectedOrder.status?.charAt(0).toUpperCase()}{selectedOrder.status?.slice(1)}
                  </Badge>
                  {getTimeWarning(selectedOrder)}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Meta */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Customer</p>
                    <p className="font-medium">{getCustomerName(selectedOrder)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Date</p>
                    <p className="font-medium">
                      {selectedOrder.created_at
                        ? format(new Date(selectedOrder.created_at), "MMMM d, yyyy h:mm a")
                        : "\u2014"}
                    </p>
                  </div>
                </div>

                {/* Status update */}
                <div>
                  <Label>Status</Label>
                  <Select
                    value={selectedOrder.status || "pending"}
                    onValueChange={(val) => handleStatusChange(selectedOrder, val as OrderStatus)}
                  >
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ORDER_STATUSES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Tracking */}
                <div>
                  <Label>Tracking Number</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      value={trackingInputs[selectedOrder.id] || ""}
                      onChange={(e) =>
                        setTrackingInputs((prev) => ({ ...prev, [selectedOrder.id]: e.target.value }))
                      }
                      placeholder="Enter tracking number"
                    />
                    <Button
                      variant="outline"
                      onClick={() => saveTracking(selectedOrder.id)}
                    >
                      Save
                    </Button>
                  </div>
                </div>

                {/* Internal Notes */}
                <div>
                  <Label>Internal Notes</Label>
                  <Textarea
                    className="mt-1"
                    rows={3}
                    value={notesInputs[selectedOrder.id] || ""}
                    onChange={(e) =>
                      setNotesInputs((prev) => ({ ...prev, [selectedOrder.id]: e.target.value }))
                    }
                    placeholder="Add internal notes..."
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => saveNotes(selectedOrder.id)}
                  >
                    Save Notes
                  </Button>
                </div>

                {/* Line items */}
                <div>
                  <h4 className="font-semibold mb-3">Items</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead className="text-right">Qty</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {((selectedOrder.items as unknown as OrderItem[]) || []).map((item, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium">{item.peptide_name || item.name}</TableCell>
                          <TableCell>{item.size}</TableCell>
                          <TableCell className="text-right">{item.quantity}</TableCell>
                          <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Totals */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${selectedOrder.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>${selectedOrder.shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Shipping address */}
                {selectedOrder.shipping_address && (
                  <div>
                    <h4 className="font-semibold mb-2">Shipping Address</h4>
                    <p className="text-sm text-muted-foreground">
                      {(selectedOrder.shipping_address as any).firstName}{" "}
                      {(selectedOrder.shipping_address as any).lastName}
                      <br />
                      {(selectedOrder.shipping_address as any).address}
                      <br />
                      {(selectedOrder.shipping_address as any).city},{" "}
                      {(selectedOrder.shipping_address as any).state}{" "}
                      {(selectedOrder.shipping_address as any).zipCode}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminOrderManagement;
