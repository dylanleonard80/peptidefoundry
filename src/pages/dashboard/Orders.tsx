import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Package, ExternalLink, ShoppingCart, Truck, FileText } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
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
  subtotal: number;
  shipping: number;
  status: string | null;
  items: Json;
  shipping_address: Json;
  tracking_number: string | null;
  carrier: string | null;
  shipping_label_url: string | null;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const getTrackingUrl = (carrier: string | null, trackingNumber: string): string => {
  const trackingUrls: Record<string, string> = {
    USPS: `https://tools.usps.com/go/TrackConfirmAction?tLabels=${trackingNumber}`,
    UPS: `https://www.ups.com/track?tracknum=${trackingNumber}`,
    FedEx: `https://www.fedex.com/fedextrack/?trknbr=${trackingNumber}`,
    DHL: `https://www.dhl.com/en/express/tracking.html?AWB=${trackingNumber}`,
  };
  return trackingUrls[carrier || ""] || `https://www.google.com/search?q=${trackingNumber}+tracking`;
};

const DashboardOrders = () => {
  const { user } = useAuth();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setOrders(data as Order[]);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [user]);

  const handleReorderAll = (order: Order) => {
    const items = (order.items as unknown as OrderItem[]) || [];
    items.forEach((item) => {
      const peptideName = item.peptide_name || item.name || "Unknown";
      addItem({
        peptide_name: peptideName,
        price: item.price,
        size: item.size,
      });
    });
    toast({
      title: "Items added to cart",
      description: `${items.length} item(s) from order ${order.order_number} added to cart.`,
    });
    setSelectedOrder(null);
  };

  if (loading) {
    return (
      <DashboardLayout title="Orders">
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Orders">
      {orders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              When you place an order, it will appear here.
            </p>
            <Button asChild>
              <a href="/all-peptides">Browse Peptides</a>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <p className="font-semibold">{order.order_number}</p>
                      <Badge className={statusColors[order.status] || "bg-gray-100"}>
                        {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(order.created_at), "MMMM d, yyyy 'at' h:mm a")}
                    </p>
                    <p className="text-sm">
                      {((order.items as unknown as OrderItem[]) || []).length} item(s) • ${order.total.toFixed(2)}
                    </p>
                    {order.tracking_number && (
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Truck className="h-3 w-3" />
                        {order.carrier}: {order.tracking_number}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {order.tracking_number && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                      >
                        <a 
                          href={getTrackingUrl(order.carrier, order.tracking_number)} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <Truck className="h-4 w-4 mr-1" />
                          Track
                        </a>
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedOrder(order)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Order Detail Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  Order {selectedOrder.order_number}
                  <Badge className={statusColors[selectedOrder.status] || "bg-gray-100"}>
                    {selectedOrder.status?.charAt(0).toUpperCase() + selectedOrder.status?.slice(1)}
                  </Badge>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Order Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Order Date</p>
                    <p className="font-medium">
                      {format(new Date(selectedOrder.created_at), "MMMM d, yyyy")}
                    </p>
                  </div>
                  {selectedOrder.tracking_number && (
                    <div>
                      <p className="text-muted-foreground">Tracking ({selectedOrder.carrier || "Carrier"})</p>
                      <a
                        href={getTrackingUrl(selectedOrder.carrier, selectedOrder.tracking_number)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-primary hover:underline inline-flex items-center gap-1"
                      >
                        <Truck className="h-3 w-3" />
                        {selectedOrder.tracking_number}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}
                  {selectedOrder.shipping_label_url && (
                    <div>
                      <p className="text-muted-foreground">Shipping Label</p>
                      <a
                        href={selectedOrder.shipping_label_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-primary hover:underline inline-flex items-center gap-1"
                      >
                        <FileText className="h-3 w-3" />
                        Download PDF
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Items Table */}
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
                      {((selectedOrder.items as unknown as OrderItem[]) || []).map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{item.peptide_name || item.name}</TableCell>
                          <TableCell>{item.size}</TableCell>
                          <TableCell className="text-right">{item.quantity}</TableCell>
                          <TableCell className="text-right">
                            ${(item.price * item.quantity).toFixed(2)}
                          </TableCell>
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

                {/* Shipping Address */}
                {selectedOrder.shipping_address && (
                  <div>
                    <h4 className="font-semibold mb-2">Shipping Address</h4>
                    <p className="text-sm text-muted-foreground">
                      {(selectedOrder.shipping_address as any).firstName} {(selectedOrder.shipping_address as any).lastName}<br />
                      {(selectedOrder.shipping_address as any).address}<br />
                      {(selectedOrder.shipping_address as any).city}, {(selectedOrder.shipping_address as any).state} {(selectedOrder.shipping_address as any).zipCode}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    onClick={() => handleReorderAll(selectedOrder)}
                    className="flex-1"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Reorder All
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default DashboardOrders;
