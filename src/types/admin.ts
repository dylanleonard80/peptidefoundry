import type { Json } from "@/integrations/supabase/types";

export type ProductType = "peptide" | "blend" | "supply";
export type ProductStatus = "active" | "draft" | "archived";
export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export interface Product {
  id: string;
  name: string;
  slug: string;
  type: ProductType;
  status: ProductStatus;
  subtitle: string | null;
  description: string | null;
  image_url: string | null;
  in_stock: boolean;
  sort_order: number;
  created_at: string | null;
  updated_at: string | null;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  size_label: string;
  price: number;
  member_price: number | null;
  sku: string | null;
  in_stock: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string | null;
  updated_at: string | null;
}

export interface ProductWithVariants extends Product {
  product_variants: ProductVariant[];
}

export interface OrderItem {
  name?: string;
  peptide_name?: string;
  size: string;
  price: number;
  quantity: number;
}

export interface AdminOrder {
  id: string;
  order_number: string;
  user_id: string | null;
  items: Json;
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus | null;
  tracking_number: string | null;
  carrier: string | null;
  internal_notes: string | null;
  guest_email: string | null;
  shipping_address: Json;
  created_at: string | null;
  updated_at: string | null;
  shipped_at: string | null;
  delivered_at: string | null;
  // Joined profile data
  profiles?: {
    first_name: string;
    last_name: string;
    email: string | null;
  } | null;
}

export interface SalesMetrics {
  totalRevenue: number;
  orderCount: number;
  avgOrderValue: number;
  activeMemberCount: number;
}

export interface DailyRevenue {
  date: string;
  revenue: number;
  orders: number;
}
