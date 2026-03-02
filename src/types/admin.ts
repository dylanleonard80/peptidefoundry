import type { Json } from "@/integrations/supabase/types";

export type ProductType = "peptide" | "blend" | "supply";
export type ProductStatus = "active" | "draft" | "archived";
export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

// Coupons
export type CouponType = "percentage" | "fixed";

export interface Coupon {
  id: string;
  code: string;
  type: CouponType;
  value: number;
  is_active: boolean;
  expires_at: string | null;
  min_order_amount: number | null;
  max_uses: number | null;
  max_uses_per_user: number;
  current_uses: number;
  created_at: string | null;
  updated_at: string | null;
}

export interface CouponProduct {
  id: string;
  coupon_id: string;
  product_id: string;
}

export interface CouponWithProducts extends Coupon {
  coupon_products: CouponProduct[];
}

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

export type OrderSource = "website" | "manual";

export interface AdminOrder {
  id: string;
  order_number: string;
  user_id: string | null;
  items: Json;
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus | null;
  source: OrderSource;
  payment_method: string | null;
  tracking_number: string | null;
  carrier: string | null;
  shipping_label_url: string | null;
  shippo_transaction_id: string | null;
  coupon_code: string | null;
  discount: number;
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

// Purchase Orders
export type PurchaseOrderStatus = "ordered" | "received";

export interface PurchaseOrderItem {
  description: string;
  quantity: number;
  unit_cost: number;
  subtotal: number;
}

export interface PurchaseOrder {
  id: string;
  supplier_name: string;
  order_date: string;
  status: PurchaseOrderStatus;
  items: PurchaseOrderItem[];
  total: number;
  notes: string | null;
  created_at: string | null;
  updated_at: string | null;
}

// Expenses
export type ExpenseCategory = "cogs" | "operating" | "startup";

export interface Expense {
  id: string;
  category: ExpenseCategory;
  description: string;
  amount: number;
  expense_date: string;
  purchase_order_id: string | null;
  notes: string | null;
  created_at: string | null;
  updated_at: string | null;
}

// Investors
export type InvestorTransactionType = "investment" | "distribution";

export interface Investor {
  id: string;
  name: string;
  email: string | null;
  notes: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface InvestorTransaction {
  id: string;
  investor_id: string;
  type: InvestorTransactionType;
  amount: number;
  transaction_date: string;
  notes: string | null;
  created_at: string | null;
}

export interface InvestorWithBalance extends Investor {
  totalInvested: number;
  totalDistributed: number;
  balance: number;
  transactions: InvestorTransaction[];
}

export interface FinancialSummary {
  totalRevenue: number;
  websiteRevenue: number;
  manualRevenue: number;
  totalExpenses: number;
  cogsExpenses: number;
  operatingExpenses: number;
  startupExpenses: number;
  grossProfit: number;
  netProfit: number;
}
